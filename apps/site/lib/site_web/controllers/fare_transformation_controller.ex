defmodule SiteWeb.FareTransformationController do
  @moduledoc """
  Controller for the Fare Transformation section of the website.
  """
  use SiteWeb, :controller
  alias Fares.ProposedLocations
  alias GoogleMaps.Geocode
  import SiteWeb.ViewHelpers, only: [cms_static_page_path: 2]

  @options %{
    geocode_fn: &LocationService.geocode/1,
    reverse_geocode_fn: &LocationService.reverse_geocode/2
  }

  def index(conn, %{"id" => "proposed-sales-locations"} = params) do
    finder(conn, params)
  end

  def index(conn, _params) do
    redirect(conn,
      to: SiteWeb.Router.Helpers.fare_path(conn, :show, "retail-sales-locations")
    )
  end

  def finder(conn, %{"location" => %{"address" => address}} = params) do
    address = Geocode.check_address(address, @options)
    params = %{params | "location" => %{"address" => address}}

    {position, _formatted} = Geocode.calculate_position(params, @options.geocode_fn)

    nearby_proposed_locations_with_distance = ProposedLocations.get_nearby(position)

    render_page(conn, nearby_proposed_locations_with_distance, address, position)
  end

  def finder(conn, %{"latitude" => lat, "longitude" => lon} = params) do
    params = Map.put(params, "location", %{"address" => lat <> "," <> lon})

    finder(conn, params)
  end

  def finder(conn, _params) do
    render_page(conn, nil, "", %{})
  end

  def render_page(conn, nearby_proposed_locations, address, search_position) do
    conn
    |> assign(:breadcrumbs, [
      Breadcrumb.build(
        "Fare Transformation",
        cms_static_page_path(conn, "/fare-transformation")
      ),
      Breadcrumb.build("Proposed Sales Locations")
    ])
    |> render(
      "proposed_sales_locations.html",
      requires_location_service?: true,
      nearby_proposed_locations: nearby_proposed_locations,
      address: address,
      search_position: search_position
    )
  end
end
