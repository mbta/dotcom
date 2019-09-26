defmodule SiteWeb.ScheduleController.Line do
  @behaviour Plug
  import Plug.Conn, only: [assign: 3]

  alias Plug.Conn
  alias RoutePatterns.Repo, as: RoutePatternRepo
  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Schedules.Repo, as: SchedulesRepo
  alias Site.TransitNearMe
  alias SiteWeb.ScheduleController.Line.Dependencies, as: Dependencies
  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias SiteWeb.ScheduleController.Line.DiagramHelpers
  alias SiteWeb.ScheduleController.Line.Maps
  alias Stops.Repo, as: StopsRepo
  alias Stops.{RouteStops, RouteStop, Stop}

  defmodule Dependencies do
    defstruct stops_by_route_fn: &StopsRepo.by_route/3

    @type t :: %__MODULE__{stops_by_route_fn: StopsRepo.stop_by_route()}
  end

  @type query_param :: String.t() | nil
  @type direction_id :: 0 | 1

  @impl true
  def init([]), do: []

  @impl true
  def call(conn, opts) do
    Util.log_duration(__MODULE__, :do_call, [conn, opts])
  end

  def do_call(
        %Conn{assigns: %{route: %Route{} = route, direction_id: direction_id}} = conn,
        args
      ) do
    deps = Keyword.get(args, :deps, %Dependencies{})
    update_conn(conn, route, direction_id, deps)
  end

  @spec update_conn(Conn.t(), Route.t(), direction_id, Dependencies.t()) :: Conn.t()
  defp update_conn(conn, route, direction_id, deps) do
    variant = conn.query_params["variant"]
    expanded = conn.query_params["expanded"]
    route_shapes = LineHelpers.get_route_shapes(route.id, direction_id)
    route_stops = LineHelpers.get_route_stops(route.id, direction_id, deps.stops_by_route_fn)
    route_patterns = get_route_patterns(route.id)
    shape_map = get_route_shape_map(route.id)
    active_shapes = LineHelpers.get_active_shapes(route_shapes, route, variant)
    filtered_shapes = LineHelpers.filter_route_shapes(route_shapes, active_shapes, route)
    branches = LineHelpers.get_branches(filtered_shapes, route_stops, route, direction_id)
    map_stops = Maps.map_stops(branches, {route_shapes, active_shapes}, route.id)

    vehicles = conn.assigns[:vehicle_locations]
    vehicle_tooltips = conn.assigns[:vehicle_tooltips]
    vehicle_polylines = VehicleHelpers.get_vehicle_polylines(vehicles, route_shapes)

    time_data_by_stop =
      TransitNearMe.time_data_for_route_by_stop(route.id, direction_id,
        now: conn.assigns.date_time
      )

    {map_img_src, dynamic_map_data} =
      Maps.map_data(route, map_stops, vehicle_polylines, vehicle_tooltips)

    # For <ScheduleFinder />
    unfiltered_branches = LineHelpers.get_branches(route_shapes, route_stops, route, direction_id)
    reverse_direction_id = reverse_direction(direction_id)
    reverse_shapes = LineHelpers.get_route_shapes(route.id, reverse_direction_id)

    reverse_route_stops =
      LineHelpers.get_route_stops(route.id, reverse_direction_id, deps.stops_by_route_fn)

    reverse_branches =
      LineHelpers.get_branches(
        reverse_shapes,
        reverse_route_stops,
        route,
        reverse_direction_id
      )

    conn
    |> assign(:route_patterns, route_patterns)
    |> assign(:shape_map, shape_map)
    |> assign(:direction_id, direction_id)
    |> assign(:all_stops, DiagramHelpers.build_stop_list(branches, direction_id))
    |> assign(:branches, branches)
    |> assign(:route_shapes, route_shapes)
    |> assign(:active_shape, LineHelpers.active_shape(active_shapes, route.type))
    |> assign(:map_img_src, map_img_src)
    |> assign(:dynamic_map_data, dynamic_map_data)
    |> assign(:expanded, expanded)
    |> assign(
      :reverse_direction_all_stops,
      reverse_direction_all_stops(route.id, reverse_direction_id)
    )
    |> assign(
      :reverse_direction_all_stops_from_shapes,
      DiagramHelpers.build_stop_list(reverse_branches, reverse_direction_id)
    )
    |> assign(
      :all_stops_from_shapes,
      DiagramHelpers.build_stop_list(unfiltered_branches, direction_id)
    )
    |> assign(:connections, connections(branches))
    |> assign(:time_data_by_stop, time_data_by_stop)
  end

  @spec get_route_patterns(Route.id_t()) :: map
  defp get_route_patterns("Green") do
    GreenLine.branch_ids() |> Enum.join(",") |> get_route_patterns()
  end

  defp get_route_patterns(route_id) do
    route_id
    |> RoutePatternRepo.by_route_id()
    |> Enum.map(&Task.async(fn -> get_route_pattern_shape(&1) end))
    |> Enum.map(&Task.await/1)
    |> Enum.group_by(&(&1.direction_id |> Integer.to_string()))
  end

  @spec get_route_pattern_shape(RoutePattern.t()) :: map
  defp get_route_pattern_shape(route_pattern) do
    {shape_id, headsign} =
      route_pattern.representative_trip_id
      |> SchedulesRepo.trip()
      |> case do
        nil ->
          {nil, nil}

        %{shape_id: shape_id, headsign: headsign} ->
          {shape_id, headsign}
      end

    route_pattern
    |> Map.put(:shape_id, shape_id)
    |> Map.put(:headsign, headsign)
  end

  @spec get_route_shape_map(Route.id_t()) :: map
  def get_route_shape_map(route_id) do
    route_id
    |> LineHelpers.get_route_shapes(nil, false)
    |> Map.new(fn shape -> {shape.id, shape} end)
  end

  def reverse_direction(0), do: 1
  def reverse_direction(1), do: 0

  @doc """
  Calculates the list of stops for the reverse direction.

  Used by "Schedules from here" to determine whether we should link to the
  stop going in the opposite direction.

  """
  @spec reverse_direction_all_stops(Route.id_t(), 0 | 1) :: [Stop.t()]
  def reverse_direction_all_stops(route_id, reverse_direction_id) do
    all_stops_without_date(route_id, reverse_direction_id)
  end

  @doc """
  Calculates the list of stops regardless of date.

  """
  @spec all_stops_without_date(Route.id_t(), 0 | 1) :: [Stop.t()]
  def all_stops_without_date(route_id, direction_id) do
    case StopsRepo.by_route(route_id, direction_id) do
      {:error, _} -> []
      stops -> stops
    end
  end

  def connections(route_stops) do
    route_stops
    |> Enum.reduce(MapSet.new(), &get_connections/2)
    |> MapSet.to_list()
  end

  defp get_connections(%RouteStops{stops: stops}, acc) do
    Enum.reduce(stops, acc, &do_get_connections/2)
  end

  defp do_get_connections(%RouteStop{connections: connections}, acc) do
    Enum.reduce(connections, acc, &MapSet.put(&2, &1))
  end
end
