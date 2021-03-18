defmodule SiteWeb.ScheduleController.Line do
  @moduledoc """
  Actions to support rendering lines for a schedule
  """
  @behaviour Plug
  import Plug.Conn, only: [assign: 3, halt: 1]
  import UrlHelpers, only: [update_url: 2]
  import Phoenix.Controller, only: [redirect: 2]

  alias Plug.Conn
  alias RoutePatterns.Repo, as: RoutePatternRepo
  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Schedules.Repo, as: SchedulesRepo
  alias Site.TransitNearMe
  alias SiteWeb.ScheduleController.Line.Dependencies, as: Dependencies
  alias SiteWeb.ScheduleController.Line.DiagramHelpers
  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias SiteWeb.ScheduleController.Line.Maps
  alias Stops.Repo, as: StopsRepo
  alias Stops.{RouteStops, RouteStop, Stop}

  defmodule Dependencies do
    @moduledoc """
    Actions pulled in from elsewhere
    """
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

  @spec replace_map_key(map, String.t(), String.t()) :: map
  defp replace_map_key(input, from, to) do
    if Map.has_key?(input, from) do
      input
      |> Map.put(to, Map.get(input, from))
      |> Map.delete(from)
    else
      input
    end
  end

  @spec get_updated_format_for_url_params(map) :: map
  def get_updated_format_for_url_params(query_params) do
    new_params =
      query_params
      |> replace_map_key("direction_id", "schedule_direction[direction_id]")
      |> replace_map_key("origin", "schedule_direction[origin]")
      |> replace_map_key("destination", "schedule_direction[destination]")
      |> replace_map_key("variant", "schedule_direction[variant]")

    new_params
  end

  def do_call(
        %Conn{
          assigns: %{
            route: %Route{} = route,
            direction_id: direction_id
          }
        } = conn,
        args
      ) do
    # check if URL has parameters like direction_id, origin or variant
    # If so, they will get changed to:
    # e.g. /schedules/31/line?direction_id=1&origin=525 will be changed to
    # /schedules/31/line?schedule_direction%5Bdirection_id%5D=1&schedule_direction%5Borigin%5D=525

    new_params = get_updated_format_for_url_params(conn.query_params)

    if Map.equal?(new_params, conn.query_params) do
      # URL parameters have the correct format
      schedule_direction = Map.get(conn.query_params, "schedule_direction", %{})

      direction_id_value =
        case schedule_direction["direction_id"] do
          nil ->
            direction_id

          _ ->
            String.to_integer(schedule_direction["direction_id"])
        end

      deps = Keyword.get(args, :deps, %Dependencies{})
      update_conn(conn, route, direction_id_value, deps)
    else
      # overwrite query_params in `conn` with the correct format:
      conn = %{conn | query_params: new_params}
      url = update_url(conn, %{})

      conn
      |> redirect(to: url)
      |> halt()
    end
  end

  @spec update_conn(Conn.t(), Route.t(), direction_id, Dependencies.t()) :: Conn.t()
  defp update_conn(conn, route, direction_id, deps) do
    schedule_direction = Map.get(conn.query_params, "schedule_direction", %{})
    variant = schedule_direction["variant"]
    expanded = Map.get(conn.query_params, "expanded")
    reverse_direction_id = reverse_direction(direction_id)
    route_stops = LineHelpers.get_route_stops(route.id, direction_id, deps.stops_by_route_fn)
    # Both line.ex and helpers.ex have this function defined. Redundant?
    route_patterns = get_route_patterns(route.id)
    route_patterns_map = map_route_patterns_by_direction(route_patterns)
    # Both route_shapes and active_shapes are needed here to render the static map
    @tag todo:
           "Refactor get_route_shapes, get_shapes, etc so that we're not hitting shapes endpoint"
    route_shapes = LineHelpers.get_route_shapes(route.id, direction_id)
    active_shapes = LineHelpers.get_active_shapes(route_shapes, route)
    static_shapes = LineHelpers.filter_route_shapes(route_shapes, active_shapes, route)
    # Unsure how this differs from `get_branch_route_stops`, as called in map_api.ex
    static_branches = LineHelpers.get_branches(static_shapes, route_stops, route, direction_id)

    static_map_polylines =
      case route do
        %Route{type: 4} -> []
        %Route{id: "Green"} -> route_shapes
        _ -> active_shapes
      end

    static_map_stops = Maps.map_stops(static_branches)

    vehicles = conn.assigns[:vehicle_locations]
    vehicle_tooltips = conn.assigns[:vehicle_tooltips]

    # This line is unutilized. We want it for any reason?  It's passed in line 153, but goes nowhere
    vehicle_polylines = VehicleHelpers.get_vehicle_polylines(vehicles, route_shapes)

    time_data_by_stop =
      TransitNearMe.time_data_for_route_by_stop(route.id, direction_id,
        date: conn.assigns.date,
        now: conn.assigns.date_time
      )

    {map_img_src, dynamic_map_data} =
      Maps.map_data(
        route,
        static_map_stops,
        static_map_polylines,
        route_patterns,
        vehicle_polylines,
        vehicle_tooltips
      )

    reverse_route_stops =
      LineHelpers.get_route_stops(route.id, reverse_direction_id, deps.stops_by_route_fn)

    conn
    |> assign(:route_patterns, route_patterns_map)
    |> assign(:direction_id, direction_id)
    |> assign(
      :all_stops,
      DiagramHelpers.build_stop_list(static_branches, direction_id)
    )
    |> assign(:branches, static_branches)
    |> assign(:route_shapes, route_shapes)
    |> assign(:map_img_src, map_img_src)
    |> assign(:dynamic_map_data, dynamic_map_data)
    |> assign(:expanded, expanded)
    |> assign(
      :reverse_direction_all_stops,
      reverse_direction_all_stops(route.id, reverse_direction_id)
    )
    |> assign(:all_stops_from_route, flatten_route_stops(route_stops))
    |> assign(:reverse_direction_all_stops_from_route, flatten_route_stops(reverse_route_stops))
    |> assign(:connections, connections(static_branches))
    |> assign(:time_data_by_stop, time_data_by_stop)
    |> assign(:variant, variant)
  end

  defp flatten_route_stops(route_stops) do
    Enum.flat_map(route_stops, fn {_route_id, stops} -> stops end)
  end

  @spec get_route_patterns(Route.id_t()) :: map
  defp get_route_patterns("Green") do
    GreenLine.branch_ids() |> Enum.join(",") |> get_route_patterns()
  end

  defp get_route_patterns(route_id) do
    route_id
    |> RoutePatternRepo.by_route_id()
  end

  defp map_route_patterns_by_direction(route_patterns) do
    route_patterns
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
