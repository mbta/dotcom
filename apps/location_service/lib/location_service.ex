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
      case active_service(:geocode) do
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
      case active_service(:reverse_geocode) do
        :aws -> AWSLocation.reverse_geocode(latitude, longitude)
        _ -> GoogleMaps.Geocode.reverse_geocode(latitude, longitude)
      end
    end)
  end

  @doc "Uses either AWS Location Service or Google Maps Place API to do
  autocompletion, selecting based on config value."
  @spec autocomplete(String.t(), number, String.t() | nil) :: LocationService.Suggestion.result()
  def autocomplete(search, limit, token) do
    cache({search, limit}, fn {search, limit} ->
      case active_service(:autocomplete) do
        :aws -> AWSLocation.autocomplete(search, limit)
        _ -> LocationService.Wrappers.google_autocomplete(search, limit, token)
      end
    end)
  end

  defp active_service(key) do
    {:system, env_var, default} = Application.get_env(:location_service, key)
    if value = System.get_env(env_var), do: String.to_atom(value), else: default
  end
end
