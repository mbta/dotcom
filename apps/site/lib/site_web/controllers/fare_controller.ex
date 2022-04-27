defmodule SiteWeb.FareController do
  @moduledoc """
  Controller for the Fares section of the website.
  """
  use SiteWeb, :controller
  alias Fares.RetailLocations
  alias GoogleMaps.Geocode
  import SiteWeb.ViewHelpers, only: [cms_static_page_path: 2]

  plug(:meta_description)

  @options %{
    geocode_fn: &LocationService.geocode/1,
    reverse_geocode_fn: &LocationService.reverse_geocode/2,
    nearby_fn: &Fares.RetailLocations.get_nearby/1
  }

  def show(conn, %{"id" => "retail-sales-locations"} = params) do
    search_location(conn, params)
  end

  def show(conn, _) do
    check_cms_or_404(conn)
  end

  def search_location(conn, %{"location" => %{"address" => address}} = params) do
    address = Geocode.check_address(address, @options)
    params = %{params | "location" => %{"address" => address}}

    {position, _formatted} = Geocode.calculate_position(params, @options.geocode_fn)

    retail_locations = fare_sales_locations(position, @options.nearby_fn)

    render_with_locations(conn, retail_locations, address, position)
  end

  def search_location(conn, %{"latitude" => lat, "longitude" => lon} = params) do
    params = Map.put(params, "location", %{"address" => lat <> "," <> lon})
    search_location(conn, params)
  end

  def search_location(conn, _params) do
    render_with_locations(conn, nil, "", %{})
  end

  def render_with_locations(conn, retail_locations, address, position) do
    conn
    |> assign(:breadcrumbs, [
      Breadcrumb.build("Fares", cms_static_page_path(conn, "/fares")),
      Breadcrumb.build("Retail Sales Locations")
    ])
    |> render(
      "retail_sales_locations.html",
      requires_location_service?: true,
      fare_sales_locations: retail_locations,
      address: address,
      search_position: position
    )
  end

  @spec fare_sales_locations(
          LocationService.Address.t(),
          (LocationService.Address.t() -> [{RetailLocations.Location.t(), float}])
        ) :: [{RetailLocations.Location.t(), float}]
  def fare_sales_locations(%{latitude: _lat, longitude: _long} = position, nearby_fn) do
    nearby_fn.(position)
  end

  def fare_sales_locations(%{}, _nearby_fn) do
    []
  end

  defp meta_description(conn, _) do
    conn
    |> assign(
      :meta_description,
      "View common fare information for the MBTA bus, subway, Commuter Rail, ferry, and The RIDE. " <>
        "Find online CharlieCard services and learn about bulk ordering programs."
    )
  end
end
