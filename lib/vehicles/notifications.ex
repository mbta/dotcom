defmodule Vehicles.Notifications do
  @moduledoc """
  Local notifications for changes to vehicle cache scopes.

  Subscribe with `subscribe({:trip, trip_id})` or
  `subscribe({:route, route_id, direction_id})`. Subscribers receive
  `{:vehicles_changed, scope}` after Vehicles.Repo updates ETS and should
  reread that scope from the repo. Subscribe before reading the initial snapshot.

  Notifications are invalidations, not a durable event log: the cache may have
  advanced again by the time a subscriber reads it. Broadcasts stay on the local
  node because each node maintains its own cache.
  """

  alias Vehicles.Vehicle

  @type scope ::
          {:trip, String.t()}
          | {:route, String.t(), 0 | 1}

  @doc "Subscribes the calling process to changes in a trip or route/direction."
  @spec subscribe(scope()) :: :ok | {:error, term()}
  def subscribe(scope) do
    Phoenix.PubSub.subscribe(Vehicles.PubSub, topic(scope))
  end

  @doc "Unsubscribes the calling process from a trip or route/direction."
  @spec unsubscribe(scope()) :: :ok
  def unsubscribe(scope) do
    Phoenix.PubSub.unsubscribe(Vehicles.PubSub, topic(scope))
  end

  @doc """
  Notifies affected scopes by comparing previous and current vehicle rows.

  Called by Vehicles.Repo after the cache mutation. Pass the affected rows for
  an upsert or removal, or the complete old and new snapshots for a reset.
  Identical rows are ignored, and each affected scope is notified once.
  """
  @spec broadcast_changes([Vehicle.t()], [Vehicle.t()]) :: :ok
  def broadcast_changes(previous, current) do
    previous
    |> MapSet.new()
    |> MapSet.symmetric_difference(MapSet.new(current))
    |> Enum.flat_map(&scopes/1)
    |> MapSet.new()
    |> Enum.each(fn scope ->
      :ok =
        Phoenix.PubSub.local_broadcast(
          Vehicles.PubSub,
          topic(scope),
          {:vehicles_changed, scope}
        )
    end)
  end

  defp scopes(%Vehicle{trip_id: trip_id, route_id: route_id, direction_id: direction_id}) do
    trip_scopes =
      case trip_id do
        nil -> []
        trip_id when is_binary(trip_id) -> [{:trip, trip_id}]
      end

    route_scopes =
      case {route_id, direction_id} do
        {route_id, direction_id} when is_binary(route_id) and direction_id in [0, 1] ->
          [{:route, route_id, direction_id}]

        _ ->
          []
      end

    trip_scopes ++ route_scopes
  end

  defp topic({:trip, trip_id}) when is_binary(trip_id), do: "vehicles:trip:#{trip_id}"

  defp topic({:route, route_id, direction_id})
       when is_binary(route_id) and direction_id in [0, 1],
       do: "vehicles:route:#{route_id}:#{direction_id}"
end
