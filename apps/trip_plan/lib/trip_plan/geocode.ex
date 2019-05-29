defmodule TripPlan.Geocode do
  @type t :: {:ok, result} | {:error, error}
  @type result :: TripPlan.NamedPosition.t()
  @type error :: :no_results | {:multiple_results, nonempty_list(result)} | :required | :unknown

  @doc """
  Given a string, figure out the latitude/longitude.

  If we're able to parse an address, we'll return the NamedPosition for it.
  Otherwise, we'll return an error.
  """
  @callback geocode(String.t()) :: t
end
