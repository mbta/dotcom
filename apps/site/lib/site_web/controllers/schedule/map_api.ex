defmodule SiteWeb.ScheduleController.MapApi do
  @moduledoc """
    API for retrieving Map data by route and variant
  """
  use SiteWeb, :controller

  alias Leaflet.MapData
  alias Routes.Route
  alias SiteWeb.ControllerHelpers
  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias SiteWeb.ScheduleController.Line.Maps
  alias RoutePatterns.Repo, as: RoutePatternRepo

  @type direction_id :: 0 | 1

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{
        "id" => route_id,
        "direction_id" => direction_id
      }) do
    case LineHelpers.get_route(route_id) do
      {:ok, route} ->
        map_data =
          # This is misleading. What is being called "shape_id" is actually the route_pattern variant
          get_map_data(route, String.to_integer(direction_id), conn.query_params["shape_id"])

        json(conn, map_data)

      :not_found ->
        ControllerHelpers.return_invalid_arguments_error(conn)
    end
  end

  def show(conn, _) do
    ControllerHelpers.return_invalid_arguments_error(conn)
  end

  @spec get_map_data(Route.t(), direction_id(), Route.branch_name()) :: MapData.t()
  defp get_map_data(route, direction_id, route_pattern_id) do
    route_patterns = RoutePatternRepo.by_route_id(route.id)
    route_shapes = LineHelpers.get_route_shapes(route.id, direction_id)
    active_shapes = LineHelpers.get_active_shapes(route_shapes, route, route_pattern_id)
    branches = LineHelpers.get_branch_route_stops(route, direction_id)
    map_stops = Maps.map_stops(branches, {route_shapes, active_shapes}, route.id)

    {_map_img_src, dynamic_map_data} = Maps.map_data(route, map_stops, route_patterns, [], [])
    dynamic_map_data
  end
end
