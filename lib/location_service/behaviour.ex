defmodule LocationService.Behaviour do
  @moduledoc """
  The behaviour for interacting with AWS Location Service
  """

  @type result ::
          {:ok, nonempty_list(LocationService.Address.t())}
          | {:error, :zero_results | :internal_error}

  @doc """
  Geocodes free-form text, such as an address, name, city, or region to allow
  you to search for Places or points of interest.

  https://docs.aws.amazon.com/location-places/latest/APIReference/API_SearchPlaceIndexForText.html

  Caches the result using the input address as key.
  """
  @callback geocode(String.t()) :: result

  @doc """
  Uses AWS Location Service to perform a geocode lookup. Caches the result using
  the input address as key.
  """
  @callback reverse_geocode(number, number) :: result

  @doc """
  Uses AWS Location Service to do autocompletion. Caches the result using the
  search term and limit as key.
  """
  @callback autocomplete(String.t(), number) ::
              LocationService.Suggestion.result()
              | {:error, :invalid_arguments}
              | {:error, :zero_results}
end
