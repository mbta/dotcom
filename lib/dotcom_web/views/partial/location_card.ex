defmodule DotcomWeb.PartialView.LocationCard do
  @moduledoc """
    Module with functions for rendering the location card partial
  """
  use DotcomWeb, :view
  alias Phoenix.HTML
  alias Routes.Route
  alias Stops.Stop

  @spec render_routes(Route.gtfs_route_type() | Route.subway_lines_type(), [map], Stop.t()) ::
          HTML.Safe.t()
  def render_routes(:bus, routes, _stop) do
    content_tag(:span, [
      "Bus: ",
      route_links(routes)
    ])
  end

  def render_routes(:commuter_rail, _routes, stop) do
    [link("Commuter Rail", to: stop_path(stop))]
  end

  def render_routes(_, routes, _stop) do
    route_links(routes)
  end

  @spec route_path(Routes.Route.t(), any(), any()) :: any()
  def route_path(%Route{}, stop, :commuter_rail) do
    stop_path(DotcomWeb.Endpoint, :show, stop, tab: "schedule")
  end

  def route_path(%Route{} = route, stop, _route_group) do
    schedule_path(DotcomWeb.Endpoint, :show, route, origin: stop.id)
  end

  @spec route_path(Route.t()) :: any()
  def route_path(%Route{} = route) do
    schedule_path(DotcomWeb.Endpoint, :show, route)
  end

  def stop_path(%Stop{} = stop) do
    stop_path(DotcomWeb.Endpoint, :show, stop.id, tab: "schedule")
  end

  def stop_path(stop) do
    stop_path(DotcomWeb.Endpoint, :show, stop.id, tab: "schedule")
  end

  @spec route_links([map] | [Route.t()]) :: [HTML.Safe.t()]
  defp route_links(routes) do
    routes
    |> Enum.map(&link(&1.name, to: route_link(&1)))
    |> Enum.intersperse(content_tag(:span, ", "))
  end

  def route_link(%Route{} = route) do
    route_path(route)
  end

  def route_link(route) do
    route.href
  end
end
