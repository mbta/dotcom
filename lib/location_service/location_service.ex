defmodule LocationService do
  @moduledoc """
  Interacts with Amazon's Location Service, specifically its Places service, to perform geocoding, reverse geocoding and place lookups.
  """
  use RepoCache, ttl: :timer.hours(24)

  require Logger

  alias AWSLocation.Request
  alias LocationService.Result

  @type result ::
          {:ok, nonempty_list(LocationService.Address.t())}
          | {:error, :zero_results | :internal_error}

  @doc "Geocodes free-form text, such as an address, name, city, or region to allow you to search for Places or points of interest.

  https://docs.aws.amazon.com/location-places/latest/APIReference/API_SearchPlaceIndexForText.html

  Caches the result using the input address as key."
  @spec geocode(String.t()) :: result
  def geocode(address) when is_binary(address) do
    cache(address, fn address ->
      Request.new(address)
      |> Result.handle_response(address)
    end)
  end

  @doc "Uses AWS Location Service to perform a
  geocode lookup. Caches the result using the input address as key."
  @spec reverse_geocode(number, number) :: result
  def reverse_geocode(latitude, longitude) when is_float(latitude) and is_float(longitude) do
    cache({latitude, longitude}, fn {latitude, longitude} ->
      Request.new([latitude, longitude])
      |> Result.handle_response([latitude, longitude])
    end)
  end

  @doc "Uses AWS Location Service to do
  autocompletion. Caches the result using the search term and limit as key."
  @spec autocomplete(String.t(), number) ::
          LocationService.Suggestion.result()
          | {:error, :invalid_arguments}
          | {:error, :zero_results}
  def autocomplete(search, limit) when 1 <= limit and limit <= 15 do
    cache({search, limit}, fn {search, limit} ->
      Request.autocomplete(search, limit)
      |> Result.handle_response(%{search: search, limit: limit})
    end)
  end

  def autocomplete(_, _), do: {:error, :invalid_arguments}
end
