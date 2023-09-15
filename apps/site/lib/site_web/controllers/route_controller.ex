defmodule SiteWeb.RouteController do
  @moduledoc """
  Endpoints for getting route data.
  """
  use SiteWeb, :controller
  alias Leaflet.MapData.Polyline
  alias Routes.{Repo, Route}

  @spec get_by_stop_id(Plug.Conn.t(), map) :: Plug.Conn.t()
  def get_by_stop_id(conn, %{"stop_id" => stop_id} = _params) do
    routesWithPolylines =
      stop_id
      |> Repo.by_stop()
      |> Enum.map(fn route ->
        route
        |> Route.to_json_safe()
        |> Map.put(:polylines, route_polylines(route, stop_id))
      end)

    json(conn, routesWithPolylines)
  end

  @spec get_by_stop_id(Plug.Conn.t(), map) :: Plug.Conn.t()
  def get_route_pattern_by_stop_id(conn, %{"stop_id" => stop_id} = _params) do
    routePatterns =
      stop_id
      |> RoutePatterns.Repo.by_stop_id(stop: stop_id)

    json(conn, routePatterns)
  end

  defp route_polylines(route, stop_id) do
    route.id
    |> RoutePatterns.Repo.by_route_id(stop: stop_id)
    |> Enum.filter(&(!is_nil(&1.representative_trip_polyline)))
    |> Enum.map(&Polyline.new(&1, color: "#" <> route.color, weight: 4))
  end
end
