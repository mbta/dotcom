defmodule Site.Stream.Vehicles do
  use GenServer
  alias SiteWeb.Endpoint
  alias Vehicles.Vehicle

  def start_link(opts \\ []) do
    name = Keyword.get(opts, :name, __MODULE__)
    GenServer.start_link(__MODULE__, opts, name: name)
  end

  def init(opts) do
    subscribe_fn = Keyword.get(opts, :subscribe_fn, &Phoenix.PubSub.subscribe/2)
    subscribe_fn.(Vehicles.PubSub, "vehicles")
    {:ok, %{}}
  end

  def handle_info({:remove, ids}, state) do
    _ = broadcast_vehicles("vehicles:remove", :remove, ids)
    {:noreply, state}
  end

  def handle_info({event, vehicles}, state) when event in [:reset, :add, :update] do
    by_route =
      vehicles
      |> Enum.group_by(&{&1.route_id, &1.direction_id})
      |> Enum.reject(fn {route_id, _} -> route_id == nil end)
      |> Map.new()

    _ = send_green_line(by_route, event)

    _ = Enum.each(by_route, &send_vehicles(&1, event))

    {:noreply, state}
  end

  @type vehicle_map :: %{optional(Routes.Route.id_t()) => [Vehicle.t()]}

  @spec send_green_line(vehicle_map, atom) :: :ok
  defp send_green_line(by_route, event) do
    Enum.each([0, 1], fn direction_id ->
      GreenLine.branch_ids()
      |> Enum.flat_map(&Map.get(by_route, {&1, direction_id}, []))
      |> do_send_green_line(direction_id, event)
    end)
  end

  @spec do_send_green_line([Vehicle.t()], 0 | 1, atom) :: :ok
  defp do_send_green_line([], _direction_id, _event) do
    :ok
  end

  defp do_send_green_line(vehicles, direction_id, event) do
    send_vehicles({{"Green", direction_id}, vehicles}, event)
  end

  @spec send_vehicles({{Routes.Route.id_t(), 0 | 1}, [Vehicle.t()]}, atom) :: :ok
  defp send_vehicles(
         {
           {<<route_id::binary>>, direction_id},
           vehicles
         },
         event
       )
       when direction_id in [0, 1] do
    broadcast_vehicles(
      "vehicles:" <> route_id <> ":" <> Integer.to_string(direction_id),
      event,
      vehicles
    )
  end

  defp send_vehicles(_, _) do
    :ok
  end

  @spec broadcast_vehicles(String.t(), atom, any) :: :ok
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
        # aren't set up yet. we are still waiting for Siteweb.Endpoint to start.
        # fail gracefully here, ignore event
        :ok
    end
  end
end
