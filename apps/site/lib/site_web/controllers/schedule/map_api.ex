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

  @type direction_id :: 0 | 1

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{
        "id" => route_id
      }) do
    case LineHelpers.get_route(route_id) do
      {:ok, route} ->
        map_data = get_map_data(route)
        json(conn, map_data)

      :not_found ->
        ControllerHelpers.return_invalid_arguments_error(conn)
    end
  end

  def show(conn, _) do
    ControllerHelpers.return_invalid_arguments_error(conn)
  end

  @spec get_map_data(Route.t()) :: MapData.t()
  defp get_map_data(route) do
    route_patterns = LineHelpers.get_map_route_patterns(route.id, route.type)
    {_map_img_src, dynamic_map_data} = Maps.map_data(route, [], [], route_patterns, [])
    dynamic_map_data
  end
end
