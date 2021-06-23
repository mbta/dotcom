defmodule SiteWeb.FareTransformationController do
  @moduledoc """
  Controller for the Fare Transformation section of the website.
  """
  use SiteWeb, :controller
  alias Fares.ProposedLocations
  alias GoogleMaps.Geocode
  import SiteWeb.ViewHelpers, only: [cms_static_page_path: 2]

  @options %{
    geocode_fn: &Geocode.geocode/1,
    reverse_geocode_fn: &Geocode.reverse_geocode/2
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
    psl_type = Map.get(params, "psl_type")

    {position, _formatted} = Geocode.calculate_position(params, @options.geocode_fn)

    nearby_proposed_locations = ProposedLocations.by_lat_lon(position)

    nearby_proposed_locations_with_distance =
      if is_nil(nearby_proposed_locations) do
        []
      else
        # Return the 10 closest locations, sorted by distance
        nearby_proposed_locations
        |> Util.Distance.sort(position)
        |> psl_type_filter(psl_type)
        |> Enum.slice(0, 10)
        |> Enum.map(fn loc ->
          lat_lon = {loc.latitude, loc.longitude}
          {loc, Util.Distance.haversine(lat_lon, position)}
        end)
      end

    render_page(conn, nearby_proposed_locations_with_distance, address, position, psl_type)
  end

  defp psl_type_filter(locations, nil), do: locations
  defp psl_type_filter(locations, psl_type) do
    Enum.filter(locations, &psl_type_filter_logic?(&1, psl_type))
  end

  defp psl_type_filter_logic?(loc, psl_type) do
    String.downcase(loc.retail_fvm) === String.downcase(psl_type) or
      String.downcase(loc.retail_fvm) |> String.contains?("both")
  end

  def finder(conn, %{"latitude" => lat, "longitude" => lon} = params) do
    params = Map.put(params, "location", %{"address" => lat <> "," <> lon})

    finder(conn, params)
  end

  def finder(conn, _params) do
    render_page(conn, nil, "", %{}, nil)
  end

  def render_page(conn, nearby_proposed_locations, address, search_position, psl_type) do
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
      requires_google_maps?: true,
      nearby_proposed_locations: nearby_proposed_locations,
      address: address,
      search_position: search_position,
      psl_type: psl_type
    )
  end
end
