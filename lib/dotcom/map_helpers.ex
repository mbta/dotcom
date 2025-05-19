defmodule Dotcom.MapHelpers do
  @moduledoc """
  Map-related helper functions.
  """
  import DotcomWeb.Router.Helpers, only: [static_url: 2]
  import DotcomWeb.ViewHelpers, only: [cms_static_page_path: 2]

  @spec map_pdf_url(atom) :: String.t()
  def map_pdf_url(:subway) do
    cms_static_page_path(
      DotcomWeb.Endpoint,
      "/subway-map"
    )
  end

  def map_pdf_url(:bus) do
    cms_static_page_path(DotcomWeb.Endpoint, "/bus-map")
  end

  def map_pdf_url(:commuter_rail) do
    cms_static_page_path(DotcomWeb.Endpoint, "/cr-map")
  end

  def map_pdf_url(:ferry) do
    cms_static_page_path(DotcomWeb.Endpoint, "/ferry-map")
  end

  def map_pdf_url(:commuter_rail_zones) do
    cms_static_page_path(
      DotcomWeb.Endpoint,
      "/cr-map-zones"
    )
  end

  @spec thumbnail(atom) :: String.t()
  def thumbnail(:subway) do
    static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-subway.jpg")
  end

  def thumbnail(:commuter_rail) do
    static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-commuter-rail.jpg")
  end

  def thumbnail(:commuter_rail_zones) do
    static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-fare-zones.jpg")
  end

  def thumbnail(:bus) do
    static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-bus-system.jpg")
  end

  def thumbnail(:ferry) do
    static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-ferry.jpg")
  end

  @spec image(atom) :: String.t()
  def image(:subway) do
    "/subway-map-image"
  end

  def image(:commuter_rail) do
    "/cr-map-image"
  end

  def image(:ferry) do
    "/ferry-map-image"
  end
end
