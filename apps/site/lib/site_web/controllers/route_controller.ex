defmodule SiteWeb.RouteController do
  @moduledoc """
  Endpoints for getting route data.
  """
  use SiteWeb, :controller
  alias Routes.Repo

  def get_by_stop_id(conn, %{"stop_id" => stop_id} = _params) do
    routesWithPolylines =
      stop_id
      |> Repo.by_stop()
      |> Enum.map(&[&1, route_polylines(&1)])

    json(conn, routesWithPolylines)
  end

  defp route_polylines(route) do
    route.id
    |> Routes.Repo.get_shapes([])
    |> Enum.map(fn %Routes.Shape{id: id, polyline: polyline} ->
      positions =
        polyline
        |> Polyline.decode()
        |> Enum.map(fn {lng, lat} -> [lat, lng] end)

      %Leaflet.MapData.Polyline{
        id: id,
        color: "#" <> route.color,
        dotted?: false,
        positions: positions,
        weight: 4
      }
    end)
  end
end
