defmodule AWSLocation do
  @moduledoc """
  Functions for interacting with Amazon's Location service, specifocally its Places service.
  """
  alias AWSLocation.Request
  alias LocationService.Result

  @doc """
  Geocodes free-form text, such as an address, name, city, or region to allow
  you to search for Places or points of interest.

  https://docs.aws.amazon.com/location-places/latest/APIReference/API_SearchPlaceIndexForText.html
  """
  @spec geocode(String.t()) :: LocationService.result()
  def geocode(address) when is_binary(address) do
    Request.new(address)
    |> Result.handle_response(address)
  end

  @spec reverse_geocode(number, number) :: LocationService.result()
  def reverse_geocode(latitude, longitude) when is_float(latitude) and is_float(longitude) do
    Request.new([latitude, longitude])
    |> Result.handle_response([latitude, longitude])
  end

  @spec autocomplete(String.t(), number) ::
          LocationService.Suggestion.result()
          | {:error, :invalid_arguments}
          | {:error, :zero_results}
  def autocomplete(search, limit) when 1 <= limit and limit <= 15 do
    Request.autocomplete(search, limit)
    |> Result.handle_response(%{search: search, limit: limit})
  end

  def autocomplete(_, _), do: {:error, :invalid_arguments}
end
