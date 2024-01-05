defmodule DotcomWeb.TransitNearMeView do
  use DotcomWeb, :view
  alias LocationService.Address
  alias Phoenix.HTML
  alias Dotcom.React

  @spec render_react(map) :: HTML.safe()
  def render_react(assigns) do
    Util.log_duration(__MODULE__, :do_render_react, [assigns])
  end

  @spec do_render_react(map) :: HTML.safe()
  def do_render_react(%{
        conn: %{query_params: %{} = query},
        stops_json: stops_json,
        map_data: map_data
      }) do
    React.render(
      "TransitNearMe",
      %{
        query: query,
        stopsWithDistances: stops_json,
        mapData: map_data,
        mapId: "js-tnm-map-dynamic-data",
        routesWithRealtimeSchedules: [],
        stopsWithRoutes: []
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
