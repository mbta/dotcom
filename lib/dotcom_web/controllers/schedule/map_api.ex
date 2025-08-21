defmodule DotcomWeb.ScheduleController.MapApi do
  @moduledoc """
    API for retrieving Map data by route and variant
  """

  use DotcomWeb, :controller

  alias DotcomWeb.ControllerHelpers
  alias DotcomWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias DotcomWeb.ScheduleController.Line.Maps
  alias Leaflet.MapData
  alias Routes.Route

  @type direction_id :: 0 | 1

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

  defp get_map_data(route) do
    route_patterns = LineHelpers.get_map_route_patterns(route.id, route.type)
    {_map_img_src, dynamic_map_data} = Maps.map_data(route, route_patterns, [])
    dynamic_map_data
  end
end
