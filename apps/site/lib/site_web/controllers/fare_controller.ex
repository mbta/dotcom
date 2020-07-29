defmodule SiteWeb.FareController do
  @moduledoc """
  Controller for the Fares section of the website.
  """
  use SiteWeb, :controller
  alias Fares.RetailLocations
  import SiteWeb.ViewHelpers, only: [cms_static_page_path: 2]

  plug(:meta_description)

  @options %{
    geocode_fn: &GoogleMaps.Geocode.geocode/1,
    nearby_fn: &Fares.RetailLocations.get_nearby/1
  }

  def show(
        %Plug.Conn{assigns: %{date_time: date_time}} = conn,
        %{"id" => "retail-sales-locations"} = params
      ) do
    {position, formatted} = calculate_position(params, @options.geocode_fn)

    conn
    |> assign(:breadcrumbs, [
      Breadcrumb.build("Fares", cms_static_page_path(conn, "/fares")),
      Breadcrumb.build("Retail Sales Locations")
    ])
    |> render(
      "retail_sales_locations.html",
      current_pass: current_pass(date_time),
      requires_google_maps?: true,
      fare_sales_locations: fare_sales_locations(position, @options.nearby_fn),
      address: formatted,
      search_position: position
    )
  end

  def show(conn, _) do
    check_cms_or_404(conn)
  end

  @spec calculate_position(
          map(),
          (String.t() -> GoogleMaps.Geocode.Address.t())
        ) :: {GoogleMaps.Geocode.Address.t(), String.t()}
  def calculate_position(%{"latitude" => lat_str, "longitude" => lng_str} = params, geocode_fn) do
    case {Float.parse(lat_str), Float.parse(lng_str)} do
      {{lat, ""}, {lng, ""}} ->
        addr = %GoogleMaps.Geocode.Address{
          latitude: lat,
          longitude: lng,
          formatted: lat_str <> "," <> lng_str
        }

        parse_geocode_response({:ok, [addr]})

      _ ->
        params
        |> Map.delete("latitude")
        |> Map.delete("longitude")
        |> calculate_position(geocode_fn)
    end
  end

  def calculate_position(%{"location" => %{"address" => address}}, geocode_fn) do
    address
    |> geocode_fn.()
    |> parse_geocode_response()
  end

  def calculate_position(_params, _geocode_fn) do
    {%{}, ""}
  end

  @spec current_pass(DateTime.t()) :: String.t()
  def current_pass(%{day: day} = date) when day < 15 do
    Timex.format!(date, "{Mfull} {YYYY}")
  end

  def current_pass(date) do
    next_month = Timex.shift(date, months: 1)
    Timex.format!(next_month, "{Mfull} {YYYY}")
  end

  defp parse_geocode_response({:ok, [location | _]}) do
    {location, location.formatted}
  end

  defp parse_geocode_response(_) do
    {%{}, ""}
  end

  @spec fare_sales_locations(
          GoogleMaps.Geocode.Address.t(),
          (GoogleMaps.Geocode.Address.t() -> [{RetailLocations.Location.t(), float}])
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
