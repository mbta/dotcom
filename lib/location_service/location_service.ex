defmodule LocationService do
  @moduledoc """
  Interacts with a service to perform geocoding, reverse geocoding and place lookups.
  """
  use RepoCache, ttl: :timer.hours(24)

  require Logger

  @type result ::
          {:ok, nonempty_list(LocationService.Address.t())}
          | {:error, :zero_results | :internal_error}

  @doc "Uses either AWS Location Service or Google Maps Place API to perform a
  geocode lookup, selecting based on config value.
  Caches the result using the input address as key."
  @spec geocode(String.t()) :: result
  def geocode(address) when is_binary(address) do
    geocode_service = active_service(:reverse_geocode)

    _ =
      Logger.info(fn ->
        "#{__MODULE__} geocode active_service=#{geocode_service} address=#{address}"
      end)

    cache(address, fn address ->
      case geocode_service do
        :aws -> AWSLocation.geocode(address)
        _ -> GoogleMaps.Geocode.geocode(address)
      end
    end)
  end

  @doc "Uses either AWS Location Service or Google Maps Place API to perform a
  geocode lookup, selecting based on config value.
  Caches the result using the input address as key."
  @spec reverse_geocode(number, number) :: result
  def reverse_geocode(latitude, longitude) when is_float(latitude) and is_float(longitude) do
    reverse_geocode_service = active_service(:reverse_geocode)

    _ =
      Logger.info(fn ->
        "#{__MODULE__} reverse_geocode active_service=#{reverse_geocode_service} lat=#{latitude} lon=#{longitude}"
      end)

    cache({latitude, longitude}, fn {latitude, longitude} ->
      case reverse_geocode_service do
        :aws -> AWSLocation.reverse_geocode(latitude, longitude)
        _ -> GoogleMaps.Geocode.reverse_geocode(latitude, longitude)
      end
    end)
  end

  @doc "Uses either AWS Location Service or Google Maps Place API to do
  autocompletion, selecting based on config value."
  @spec autocomplete(String.t(), number, String.t() | nil) :: LocationService.Suggestion.result()
  def autocomplete(search, limit, token) do
    autocomplete_service = active_service(:autocomplete)

    _ =
      Logger.info(fn ->
        "#{__MODULE__} autocomplete active_service=#{autocomplete_service} search=#{search} limit=#{limit}"
      end)

    cache({search, limit}, fn {search, limit} ->
      case autocomplete_service do
        :aws -> AWSLocation.autocomplete(search, limit)
        _ -> LocationService.Wrappers.google_autocomplete(search, limit, token)
      end
    end)
  end

  def active_service(key) do
    Application.get_env(:site, LocationService)[key]
  end
end
