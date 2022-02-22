defmodule LocationService.ReverseGeocode do
  @moduledoc """
  Performs a geocode lookup.
  """
  use RepoCache, ttl: :timer.hours(24)

  @doc "Uses either AWS Location Service or Google Maps Place API to perform a
  geocode lookup, selecting based on config value.
  Caches the result using the input address as key."
  @spec reverse_geocode(number, number) :: LocationService.Address.t() | GoogleMaps.Geocode.t()
  def reverse_geocode(latitude, longitude) when is_float(latitude) and is_float(longitude) do
    cache({latitude, longitude}, fn {latitude, longitude} ->
      case Application.get_env(:location_service, :reverse_geocode) do
        :aws -> LocationService.AWS.reverse_geocode(latitude, longitude)
        _ -> GoogleMaps.Geocode.reverse_geocode(latitude, longitude)
      end
    end)
  end
end
