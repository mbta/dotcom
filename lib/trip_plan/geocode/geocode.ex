defmodule TripPlan.Geocode do
  @behaviour TripPlan.Geocoder

  alias TripPlan.NamedPosition

  @impl true
  def geocode(address) when is_binary(address) do
    case LocationService.geocode(address) do
      {:ok, results} ->
        {:ok, results |> List.first() |> address_to_result}

      {:error, :zero_results} ->
        {:error, :no_results}

      _ ->
        {:error, :unknown}
    end
  end

  defp address_to_result(%LocationService.Address{} = address) do
    %NamedPosition{
      name: address.formatted,
      latitude: address.latitude,
      longitude: address.longitude
    }
  end
end
