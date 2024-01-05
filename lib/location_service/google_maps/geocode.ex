defmodule GoogleMaps.Geocode do
  @moduledoc """
  Perform geocoding-related lookups against the Google Maps API.
  """
  use RepoCache, ttl: :timer.hours(24)

  alias LocationService.Result
  alias GoogleMaps.Geocode.Input
  require Logger

  @bounds %{
    east: 41.3193,
    north: -71.9380,
    west: 42.8266,
    south: -69.6189
  }

  @http_pool Application.compile_env!(:dotcom, :location_http_pool)
  @path "/maps/api/geocode/json"

  # Visits to the "Transit Near Me" page from Algolia search results already have lat/lng geocoding, but use
  # different parameters for the address. We track "address" as one of our analytics
  # parameters for Algolia search results, but the Phoenix form helper used in the
  # /transit-near-me template requires that we use a nested "locations"["address"] data structure.
  # This helper function simply looks for the address in one of those two values and falls
  # back to using the lat/lng if neither can be found.
  # Also used in the "Proposed Sales Location" page to identify whether an address is formatted or a String containing coordinates
  def formatted_address(%{"address" => address}, _options), do: address
  def formatted_address(%{"location" => %{"address" => address}}, _options), do: address

  def formatted_address(%{"latitude" => lat, "longitude" => lng}, options) do
    {parsed_lat, _} = Float.parse(lat)
    {parsed_lng, _} = Float.parse(lng)

    case options.reverse_geocode_fn.(parsed_lat, parsed_lng) do
      {:ok, [first | _]} ->
        first.formatted

      _ ->
        "#{lat}, #{lng}"
    end
  end

  @spec calculate_position(
          map(),
          (String.t() -> LocationService.Address.t())
        ) :: {LocationService.Address.t(), String.t()}
  def calculate_position(%{"latitude" => lat_str, "longitude" => lng_str} = params, geocode_fn) do
    case {Float.parse(lat_str), Float.parse(lng_str)} do
      {{lat, ""}, {lng, ""}} ->
        addr = %LocationService.Address{
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

  defp parse_geocode_response({:ok, [location | _]}) do
    {location, location.formatted}
  end

  defp parse_geocode_response(_) do
    {%{}, ""}
  end

  @spec check_address(String.t(), map) :: String.t()
  def check_address(address, opts) do
    # address can be a String containing "lat,lon" so we check for that case

    [lat, lon] =
      case String.split(address, ",", parts: 2) do
        [lat, lon] -> [lat, lon]
        _ -> ["error", "error"]
      end

    if Float.parse(lat) == :error || Float.parse(lon) == :error do
      address
    else
      formatted_address(%{"latitude" => lat, "longitude" => lon}, opts)
    end
  end

  @spec geocode(String.t()) :: LocationService.result()
  def geocode(address) when is_binary(address) do
    cache(address, fn address ->
      address
      |> geocode_url
      |> GoogleMaps.signed_url()
      |> HTTPoison.get([], hackney: [pool: @http_pool])
      |> Result.handle_response(%Input{address: address})
    end)
  end

  @spec geocode_by_place_id(String.t()) :: LocationService.result()
  def geocode_by_place_id(place_id) do
    cache(place_id, fn place_id ->
      place_id
      |> geocode_by_place_id_url()
      |> GoogleMaps.signed_url()
      |> HTTPoison.get([], hackney: [pool: @http_pool])
      |> Result.handle_response(%Input{address: place_id})
    end)
  end

  @spec reverse_geocode(float, float) :: LocationService.result()
  def reverse_geocode(latitude, longitude) when is_float(latitude) and is_float(longitude) do
    cache({latitude, longitude}, fn {latitude, longitude} ->
      {latitude, longitude}
      |> reverse_geocode_url()
      |> GoogleMaps.signed_url()
      |> HTTPoison.get([], hackney: [pool: @http_pool])
      |> Result.handle_response(%Input{latitude: latitude, longitude: longitude})
    end)
  end

  defp geocode_url(address) do
    URI.to_string(%URI{
      path: @path,
      query:
        URI.encode_query(
          address: address,
          bounds: "#{@bounds.east},#{@bounds.north}|#{@bounds.west},#{@bounds.south}"
        )
    })
  end

  defp geocode_by_place_id_url(place_id) do
    URI.to_string(%URI{
      path: @path,
      query: URI.encode_query(place_id: place_id)
    })
  end

  defp reverse_geocode_url({latitude, longitude}) do
    URI.to_string(%URI{
      path: @path,
      query: URI.encode_query(latlng: "#{latitude},#{longitude}")
    })
  end
end
