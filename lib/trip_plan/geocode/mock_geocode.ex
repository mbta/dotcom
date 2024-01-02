defmodule TripPlan.Geocode.MockGeocode do
  @behaviour TripPlan.Geocode

  alias TripPlan.NamedPosition

  def geocode("no results" = address) do
    return_result(
      address,
      {:error, :no_results}
    )
  end

  def geocode("too many results" = address) do
    return_result(
      address,
      {:error, {:multiple_results, [result("one"), result("two")]}}
    )
  end

  def geocode(address) do
    return_result(
      address,
      {:ok, result(address)}
    )
  end

  def return_result(address, result) do
    send(self(), {:geocoded_address, address, result})
    result
  end

  def result(base_name) do
    %NamedPosition{
      name: "Geocoded #{base_name}",
      latitude: 42 + :rand.uniform(),
      longitude: -71 - :rand.uniform()
    }
  end
end
