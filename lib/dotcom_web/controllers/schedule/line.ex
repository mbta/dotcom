defmodule DotcomWeb.ScheduleController.Line do
  @moduledoc """
  Actions to support rendering lines for a schedule
  """
  @behaviour Plug
  import Plug.Conn, only: [assign: 3, halt: 1]
  import UrlHelpers, only: [update_url: 2]
  import Phoenix.Controller, only: [redirect: 2]

  alias Plug.Conn
  alias Routes.Route
  alias DotcomWeb.ScheduleController.Line.Dependencies, as: Dependencies
  alias DotcomWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias DotcomWeb.ScheduleController.Line.Maps
  alias Stops.{RouteStops, RouteStop}

  defmodule Dependencies do
    @moduledoc """
    Actions pulled in from elsewhere
    """
    defstruct [:stops_by_route_fn]

    @type t :: %__MODULE__{
            stops_by_route_fn:
              {Application.compile_env!(:dotcom, :repo_modules)[:stops], :by_route, 3}
          }
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
        if schedule_direction["direction_id"] do
          parsed = Integer.parse(schedule_direction["direction_id"])

          if parsed !== :error and (elem(parsed, 0) === 1 or elem(parsed, 0) === 0),
            do: elem(parsed, 0),
            else: direction_id
        else
          direction_id
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

  @spec get_updated_format_for_url_params(map) :: map
  defp get_updated_format_for_url_params(query_params) do
    new_params =
      query_params
      |> replace_map_key("direction_id", "schedule_direction[direction_id]")
      |> replace_map_key("origin", "schedule_direction[origin]")
      |> replace_map_key("destination", "schedule_direction[destination]")
      |> replace_map_key("variant", "schedule_direction[variant]")

    new_params
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

  @spec update_conn(Conn.t(), Route.t(), direction_id, Dependencies.t()) :: Conn.t()
  defp update_conn(conn, route, direction_id, deps) do
    schedule_direction = Map.get(conn.query_params, "schedule_direction", %{})
    variant = schedule_direction["variant"]
    expanded = Map.get(conn.query_params, "expanded")
    reverse_direction_id = reverse_direction(direction_id)
    route_stops = LineHelpers.get_route_stops(route.id, direction_id, deps.stops_by_route_fn)
    route_patterns = LineHelpers.get_map_route_patterns(route.id, route.type)
    route_patterns_map = map_route_patterns_by_direction(route_patterns)

    # This is for rendering static map, as well as the CR dynamic map
    basic_shapes = LineHelpers.get_shapes_by_direction(route.id, route.type, direction_id)

    static_branches = LineHelpers.get_branches(basic_shapes, route_stops, route, direction_id)

    vehicle_tooltips = conn.assigns[:vehicle_tooltips]

    {map_img_src, dynamic_map_data} =
      Maps.map_data(
        route,
        route_patterns,
        vehicle_tooltips
      )

    reverse_route_stops =
      LineHelpers.get_route_stops(route.id, reverse_direction_id, deps.stops_by_route_fn)

    branch_route_stops = LineHelpers.get_branch_route_stops(route, direction_id)

    {stop_tree, route_stop_lists} =
      LineHelpers.get_stop_tree_or_lists(branch_route_stops, route.type)

    conn
    |> assign(:route_patterns, route_patterns_map)
    |> assign(:direction_id, direction_id)
    |> assign(:stop_tree, stop_tree)
    |> assign(:route_stop_lists, route_stop_lists)
    |> assign(:branches, static_branches)
    |> assign(:map_img_src, map_img_src)
    |> assign(:dynamic_map_data, dynamic_map_data)
    |> assign(:expanded, expanded)
    |> assign(:all_stops_from_route, flatten_route_stops(route_stops))
    |> assign(:reverse_direction_all_stops_from_route, flatten_route_stops(reverse_route_stops))
    |> assign(:connections, connections(static_branches))
    |> assign(:variant, variant)
  end

  defp flatten_route_stops(route_stops) do
    Enum.flat_map(route_stops, fn {_route_id, stops} -> stops end)
  end

  defp map_route_patterns_by_direction(route_patterns) do
    route_patterns
    |> Enum.group_by(&(&1.direction_id |> Integer.to_string()))
  end

  def reverse_direction(0), do: 1
  def reverse_direction(1), do: 0

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
