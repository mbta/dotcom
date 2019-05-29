defmodule SiteWeb.TransitNearMeView do
  use SiteWeb, :view
  alias GoogleMaps.Geocode.Address
  alias Phoenix.HTML
  alias Site.React

  @spec render_react(map) :: HTML.safe()
  def render_react(assigns) do
    Util.log_duration(__MODULE__, :do_render_react, [assigns])
  end

  @spec do_render_react(map) :: HTML.safe()
  def do_render_react(%{
        conn: %{query_params: %{} = query},
        routes_json: routes_json,
        stops_json: stops_json,
        map_data: map_data
      }) do
    React.render(
      "TransitNearMe",
      %{
        query: query,
        routeSidebarData: routes_json,
        stopSidebarData: stops_json,
        mapData: map_data,
        mapId: "js-tnm-map-dynamic-data"
      }
    )
  end

  defp input_value({:ok, [%Address{formatted: address}]}) do
    address
  end

  defp input_value(_) do
    ""
  end
end
