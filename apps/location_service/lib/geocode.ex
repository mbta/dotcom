defmodule LocationService.Geocode do
  @moduledoc """
  Performs a geocode lookup.
  """
  use RepoCache, ttl: :timer.hours(24)

  @doc "Uses either AWS Location Service or Google Maps Place API to perform a 
  geocode lookup, selecting based on config value.
  Caches the result using the input address as key."
  @spec geocode(String.t()) :: LocationService.Address.t() | GoogleMaps.Geocode.t()
  def geocode(address) when is_binary(address) do
    cache(address, fn address ->
      case Application.get_env(:location_service, :geocode) do
        :aws -> LocationService.AWS.geocode(address)
        _ -> GoogleMaps.Geocode.geocode(address)
      end
    end)
  end
end
