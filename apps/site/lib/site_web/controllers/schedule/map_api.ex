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
  alias Stops.Repo, as: StopsRepo
  alias Stops.Stop

  @type direction_id :: 0 | 1

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{
        "id" => route_id,
        "direction_id" => direction_id
      }) do
    map_data =
      get_map_data(conn, route_id, String.to_integer(direction_id), &StopsRepo.by_route/3)

    json(conn, map_data)
  end

  def show(conn, _) do
    ControllerHelpers.return_invalid_arguments_error(conn)
  end

  @type stops_by_route_fn :: (Route.id_t(), 0 | 1, Keyword.t() -> [Stop.t()] | {:error, any})
  @spec get_map_data(Plug.Conn.t(), Route.id_t(), direction_id(), stops_by_route_fn()) ::
          MapData.t()
  defp get_map_data(conn, route_id, direction_id, stops_by_route_fn) do
    route = LineHelpers.get_route(route_id)
    shape_id = conn.query_params["shape_id"]
    route_shapes = LineHelpers.get_route_shapes(route.id, direction_id)
    route_stops = LineHelpers.get_route_stops(route.id, direction_id, stops_by_route_fn)
    active_shapes = LineHelpers.get_active_shapes(route_shapes, route, shape_id)
    filtered_shapes = LineHelpers.filter_route_shapes(route_shapes, active_shapes, route)
    branches = LineHelpers.get_branches(filtered_shapes, route_stops, route, direction_id)
    map_stops = Maps.map_stops(branches, {route_shapes, active_shapes}, route.id)

    {_map_img_src, dynamic_map_data} = Maps.map_data(route, map_stops, [], [])
    dynamic_map_data
  end
end
