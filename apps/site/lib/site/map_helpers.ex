defmodule Site.MapHelpers do
  @moduledoc """
  Map-related helper functions.
  """

  alias GoogleMaps.MapData.Marker

  import SiteWeb.Router.Helpers, only: [static_url: 2]
  import SiteWeb.ViewHelpers, only: [cms_static_page_path: 2]

  @spec map_pdf_url(atom) :: String.t()
  def map_pdf_url(:subway) do
    cms_static_page_path(
      SiteWeb.Endpoint,
      "/subway-map"
    )
  end

  def map_pdf_url(:bus) do
    cms_static_page_path(SiteWeb.Endpoint, "/bus-map")
  end

  def map_pdf_url(:commuter_rail) do
    cms_static_page_path(SiteWeb.Endpoint, "/cr-map")
  end

  def map_pdf_url(:ferry) do
    cms_static_page_path(SiteWeb.Endpoint, "/ferry-map")
  end

  def map_pdf_url(:commuter_rail_zones) do
    cms_static_page_path(
      SiteWeb.Endpoint,
      "/cr-map-zones"
    )
  end

  @spec thumbnail(atom) :: String.t()
  def thumbnail(:subway) do
    static_url(SiteWeb.Endpoint, "/images/map-thumbnail-subway.jpg")
  end

  def thumbnail(:commuter_rail) do
    static_url(SiteWeb.Endpoint, "/images/map-thumbnail-commuter-rail.jpg")
  end

  def thumbnail(:commuter_rail_zones) do
    static_url(SiteWeb.Endpoint, "/images/map-thumbnail-fare-zones.jpg")
  end

  def thumbnail(:bus) do
    static_url(SiteWeb.Endpoint, "/images/map-thumbnail-bus-system.jpg")
  end

  def thumbnail(:ferry) do
    static_url(SiteWeb.Endpoint, "/images/map-thumbnail-ferry.jpg")
  end

  @spec image(atom) :: String.t()
  def image(:subway) do
    static_url(
      SiteWeb.Endpoint,
      "/sites/default/files/media/2023-01/2022-12-12-subway-map-v37f.jpg"
    )
  end

  def image(:commuter_rail) do
    static_url(SiteWeb.Endpoint, "/sites/default/files/maps/2019-04-08-commuter-rail-map-v33.png")
  end

  def image(:ferry) do
    static_url(
      SiteWeb.Endpoint,
      "/sites/default/files/media/2023-06/2023-6-26-ferry-map.png"
    )
  end

  @doc """
  Returns the map icon path for the given route. An optional size
  can be given. A Size of :mid represents the larger stop icons.
  If no size is specified, the smaller icons are shown
  """
  @spec map_stop_icon_path(Marker.size() | nil, boolean) :: String.t()
  def map_stop_icon_path(size, filled \\ false)
  def map_stop_icon_path(:mid, false), do: "000000-dot-mid"
  def map_stop_icon_path(:mid, true), do: "000000-dot-filled-mid"
  def map_stop_icon_path(_size, true), do: "000000-dot-filled"
  def map_stop_icon_path(_size, false), do: "000000-dot"
end
