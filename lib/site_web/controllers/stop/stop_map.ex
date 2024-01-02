defmodule SiteWeb.StopController.StopMap do
  @moduledoc """
  Module for building map info for Google Maps on stop pages
  """
  alias GoogleMaps.ViewHelpers
  alias Leaflet.{MapData, MapData.Marker}
  alias Stops.Stop

  @srcset_sizes [
    {140, 60},
    {280, 120},
    {340, 146},
    {400, 172},
    {520, 222}
  ]

  @type grouped_routes_map :: [%{group_name: atom, routes: [map]}]

  @doc """
  Returns a triplet containing a map data object, the image srcset, and the static image url
  """
  @spec map_info(Stop.t(), grouped_routes_map) :: %{
          map_data: MapData.t(),
          map_srcset: String.t(),
          map_url: String.t()
        }
  def map_info(stop, grouped_routes) do
    map_data = build_map_data(stop, grouped_routes, 735, 250)

    %{
      map_data: map_data,
      map_srcset: map_srcset(stop, grouped_routes),
      map_url: map_url(map_data)
    }
  end

  @spec map_srcset(Stop.t(), grouped_routes_map) :: String.t()
  defp map_srcset(stop, routes) do
    @srcset_sizes
    |> GoogleMaps.scale()
    |> Enum.map(&do_map_srcset(&1, stop, routes))
    |> Picture.srcset()
  end

  @spec do_map_srcset({integer, integer, 1 | 2}, Stop.t(), grouped_routes_map) ::
          {String.t(), String.t()}
  defp do_map_srcset({width, height, scale}, stop, routes) do
    size = "#{width * scale}"
    stop_map_src = stop |> build_map_data(routes, width, height) |> map_url()
    {size, stop_map_src}
  end

  @spec map_url(MapData.t()) :: String.t()
  defp map_url(map_data) do
    map_data
    |> MapData.to_google_map_data()
    |> GoogleMaps.static_map_url()
  end

  @spec build_map_data(Stop.t(), grouped_routes_map, integer, integer) :: MapData.t()
  defp build_map_data(stop, routes, width, height) do
    {width, height}
    |> MapData.new(16)
    |> add_stop_marker(stop, routes)
    |> Map.put(:tile_server_url, Application.fetch_env!(:site, :tile_server_url))
  end

  @spec add_stop_marker(MapData.t(), Stop.t(), grouped_routes_map) :: MapData.t()
  defp add_stop_marker(map_data, stop, routes) do
    marker = build_current_stop_marker(stop, routes)
    MapData.add_marker(map_data, marker)
  end

  @spec build_current_stop_marker(
          Stop.t(),
          grouped_routes_map
        ) :: Marker.t()
  def build_current_stop_marker(stop, routes) do
    Marker.new(
      stop.latitude,
      stop.longitude,
      id: stop.id,
      icon: ViewHelpers.marker_for_routes(routes)
    )
  end
end
