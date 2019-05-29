defmodule GoogleMaps.Geocode do
  @moduledoc """
  Perform geocoding-related lookups against the Google Maps API.
  """
  use RepoCache, ttl: :timer.hours(24)

  alias GoogleMaps.Geocode.Address
  alias GoogleMaps.Geocode.Input
  require Logger

  @type t :: {:ok, nonempty_list(Address.t())} | {:error, :zero_results | :internal_error}

  @bounds %{
    east: 41.3193,
    north: -71.9380,
    west: 42.8266,
    south: -69.6189
  }

  @http_pool Application.get_env(:google_maps, :http_pool)
  @path "/maps/api/geocode/json"

  @spec geocode(String.t()) :: t
  def geocode(address) when is_binary(address) do
    cache(address, fn address ->
      address
      |> geocode_url
      |> GoogleMaps.signed_url()
      |> HTTPoison.get([], hackney: [pool: @http_pool])
      |> parse_google_response(%Input{address: address})
    end)
  end

  @spec geocode_by_place_id(String.t()) :: t
  def geocode_by_place_id(place_id) do
    cache(place_id, fn place_id ->
      place_id
      |> geocode_by_place_id_url()
      |> GoogleMaps.signed_url()
      |> HTTPoison.get([], hackney: [pool: @http_pool])
      |> parse_google_response(%Input{address: place_id})
    end)
  end

  @spec reverse_geocode(float, float) :: t
  def reverse_geocode(latitude, longitude) when is_float(latitude) and is_float(longitude) do
    cache({latitude, longitude}, fn {latitude, longitude} ->
      {latitude, longitude}
      |> reverse_geocode_url()
      |> GoogleMaps.signed_url()
      |> HTTPoison.get([], hackney: [pool: @http_pool])
      |> parse_google_response(%Input{latitude: latitude, longitude: longitude})
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

  defp parse_google_response({:error, error}, input) do
    internal_error(input, "HTTP error", fn -> "error=#{inspect(error)}" end)
  end

  defp parse_google_response({:ok, %{status_code: 200, body: body}}, input) do
    case Poison.Parser.parse(body) do
      {:error, :invalid} ->
        internal_error(input, "Error parsing to JSON", fn -> "body=#{inspect(body)}" end)

      {:error, {:invalid, parse_error_message}} ->
        internal_error(input, "Error parsing to JSON", fn ->
          "body=#{inspect(body)} error_message=#{inspect(parse_error_message)}"
        end)

      {:ok, json} ->
        parse_json(json, input)
    end
  end

  defp parse_google_response({:ok, %{status_code: code, body: body}}, input) do
    internal_error(input, "Unexpected HTTP code", fn ->
      "code=#{inspect(code)} body=#{inspect(body)}"
    end)
  end

  @spec parse_json(map, Input.t()) :: t
  defp parse_json(%{"status" => "OK", "results" => results}, input) do
    results(input, Enum.map(results, &parse_result/1))
  end

  defp parse_json(%{"status" => "ZERO_RESULTS"}, input) do
    zero_results(input)
  end

  defp parse_json(%{"status" => status} = parsed, input) do
    internal_error(input, "API error", fn ->
      "status=#{inspect(status)} error_message=#{inspect(Map.get(parsed, "error_message", ""))}"
    end)
  end

  @spec parse_result(map) :: Address.t()
  defp parse_result(%{
         "geometry" => %{"location" => %{"lat" => lat, "lng" => lng}},
         "formatted_address" => address
       }) do
    %Address{
      formatted: address,
      latitude: lat,
      longitude: lng
    }
  end

  @spec results(Input.t(), [Address.t()]) :: t
  defp results(input, []) do
    zero_results(input)
  end

  defp results(input, results) do
    _ = Logger.info(fn -> "#{__MODULE__} input=#{inspect(input)} result=#{inspect(results)}" end)
    {:ok, results}
  end

  @spec zero_results(Input.t()) :: t
  defp zero_results(input) do
    _ = Logger.info(fn -> "#{__MODULE__} input=#{inspect(input)} result=ZERO_RESULTS" end)
    {:error, :zero_results}
  end

  @spec internal_error(Input.t(), String.t(), (() -> String.t())) :: t
  defp internal_error(input, message, error_fn) do
    _ =
      Logger.warn(fn ->
        "#{__MODULE__} input=#{inspect(input)} message=#{inspect(message)} #{error_fn.()}"
      end)

    {:error, :internal_error}
  end
end
