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

  @display_fare_classes [
    :local_bus_fare,
    :express_bus_fare,
    :rapid_transit_fare,
    :commuter_rail_fare,
    :ferry_fare
  ]

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

  def one_way_by_stop_id(conn, %{"stop_id" => stop_id} = _params) do
    one_way_fares =
      stop_id
      # Get fare_class for all routes at this stop and at connecting stops
      |> Routes.Repo.by_stop(include: "stop.connecting_stops")
      |> Enum.map(&display_fare_class/1)
      |> Enum.uniq()
      # Sort in same order as @display_fare_classes
      |> Enum.sort_by(&Enum.find_index(@display_fare_classes, fn fc -> fc == &1 end))
      |> Enum.flat_map(fn fare_class ->
        fare_class
        |> Fares.Repo.for_fare_class(duration: :single_trip, reduced: nil)
        |> Fares.Format.summarize(Fares.Format.mode_type_for_fare_class(fare_class))
        |> Enum.map(fn summary ->
          changedName = format_name(summary)
          {changedName, Fares.Summary.price_range(summary)}
        end)
      end)

    json(conn, one_way_fares)
  end

  defp format_name(summary) do
    name =
      if is_binary(summary.name) do
        summary.name
      else
        Enum.join(summary.name)
      end

    # capitalize lowercases every word after the first word in `name`.  This fixes the one
    # edge case for Commuter Rail
    capitalizedName = String.capitalize(name)
    String.replace(capitalizedName, "Commuter rail", "Commuter Rail")
  end

  # Use the route mode to determine the display fare. e.g. instead of the 23 bus
  # showing the free fare, show the bus fare
  defp display_fare_class(%Routes.Route{id: id, fare_class: fare_class} = route)
       when fare_class not in @display_fare_classes do
    if Fares.express?(id) do
      :express_bus_fare
    else
      case Routes.Route.type_atom(route) do
        :subway ->
          :rapid_transit_fare

        :bus ->
          :local_bus_fare

        :commuter_rail ->
          :commuter_rail_fare

        :ferry ->
          :ferry_fare

        # probably a shuttle??
        _ ->
          :local_bus_fare
      end
    end
  end

  defp display_fare_class(%Routes.Route{fare_class: fare_class}), do: fare_class

  defp meta_description(conn, _) do
    conn
    |> assign(
      :meta_description,
      "View common fare information for the MBTA bus, subway, Commuter Rail, ferry, and The RIDE. " <>
        "Find online CharlieCard services and learn about bulk ordering programs."
    )
  end
end
