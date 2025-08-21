defmodule Dotcom.Stream.Vehicles do
  use GenServer
  alias DotcomWeb.Endpoint
  alias Vehicles.Vehicle

  def start_link(opts \\ []) do
    name = Keyword.get(opts, :name, __MODULE__)
    GenServer.start_link(__MODULE__, opts, name: name)
  end

  def init(opts) do
    subscribe_fn = Keyword.get(opts, :subscribe_fn, &Phoenix.PubSub.subscribe/2)
    topic = Keyword.get(opts, :topic, "vehicles")
    subscribe_fn.(Vehicles.PubSub, "vehicles")
    {:ok, %{topic: topic}}
  end

  def handle_info({:remove, ids}, state) do
    _ = broadcast_vehicles("#{state.topic}:remove", :remove, ids)
    {:noreply, state}
  end

  def handle_info({event, vehicles}, state) when event in [:reset, :add, :update] do
    by_route =
      vehicles
      |> Enum.group_by(&{&1.route_id, &1.direction_id})
      |> Enum.reject(fn {route_id, _} -> route_id == nil end)
      |> Map.new()

    _ = send_green_line(by_route, event, state.topic)

    _ = Enum.each(by_route, &send_vehicles(&1, event, state.topic))

    {:noreply, state}
  end

  @type vehicle_map :: %{optional(Routes.Route.id_t()) => [Vehicle.t()]}

  defp send_green_line(by_route, event, topic) do
    Enum.each([0, 1], fn direction_id ->
      GreenLine.branch_ids()
      |> Enum.flat_map(&Map.get(by_route, {&1, direction_id}, []))
      |> do_send_green_line(direction_id, event, topic)
    end)
  end

  defp do_send_green_line([], _direction_id, _event, _topic) do
    :ok
  end

  defp do_send_green_line(vehicles, direction_id, event, topic) do
    send_vehicles({{"Green", direction_id}, vehicles}, event, topic)
  end

  defp send_vehicles(
         {
           {<<route_id::binary>>, direction_id},
           vehicles
         },
         event,
         topic
       )
       when direction_id in [0, 1] do
    broadcast_vehicles(
      "#{topic}:" <> route_id <> ":" <> Integer.to_string(direction_id),
      event,
      vehicles
    )
  end

  defp send_vehicles(_, _, _) do
    :ok
  end

  defp broadcast_vehicles(topic, event, data) do
    try do
      Endpoint.broadcast(
        topic,
        Atom.to_string(event),
        %{data: data}
      )
    rescue
      _ in [UndefinedFunctionError, ArgumentError] ->
        # the :ets.lookup failed, the ETS tables for working with Vehicles.Repo
        # aren't set up yet. we are still waiting for DotcomWeb.Endpoint to start.
        # fail gracefully here, ignore event
        :ok
    end
  end
end
