defmodule LocationService do
  @moduledoc """
  Interacts with a service to perform geocoding, reverse geocoding and place lookups.
  """
  use RepoCache, ttl: :timer.hours(24)

  @type result ::
          {:ok, nonempty_list(LocationService.Address.t())}
          | {:error, :zero_results | :internal_error}

  @doc "Uses either AWS Location Service or Google Maps Place API to perform a 
  geocode lookup, selecting based on config value.
  Caches the result using the input address as key."
  @spec geocode(String.t()) :: result
  def geocode(address) when is_binary(address) do
    cache(address, fn address ->
      case Application.get_env(:location_service, :geocode) do
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
    cache({latitude, longitude}, fn {latitude, longitude} ->
      case Application.get_env(:location_service, :reverse_geocode) do
        :aws -> AWSLocation.reverse_geocode(latitude, longitude)
        _ -> GoogleMaps.Geocode.reverse_geocode(latitude, longitude)
      end
    end)
  end

  # TODO Add suggestion/place lookup
end
