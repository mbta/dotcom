defmodule TripPlan.GeocodeTest do
  use ExUnit.Case, async: false
  import Mock
  import TripPlan.Geocode
  alias LocationService.Address
  alias TripPlan.NamedPosition

  describe "geocode/1" do
    test "returns {:error, :no_results} if there are no results" do
      with_geocode_mock({:error, :zero_results}, fn ->
        assert {:error, :no_results} = geocode("formatted")
      end)
    end

    test "returns first result when multiple results are returned" do
      one = %Address{formatted: "one", latitude: 1, longitude: 1}
      two = %Address{formatted: "two", latitude: 2, longitude: 2}

      with_geocode_mock({:ok, [one, two]}, fn ->
        assert {:ok, result} = geocode("formatted")
        assert %NamedPosition{name: "one", latitude: 1, longitude: 1} = result
      end)
    end

    test "returns {:error, :unknown} for other errors" do
      with_geocode_mock({:error, :request_denied, "Request denied."}, fn ->
        assert {:error, :unknown} = geocode("formatted")
      end)
    end
  end

  defp with_geocode_mock(geocode_return, test_fn) do
    with_mock LocationService, geocode: fn _address -> geocode_return end do
      test_fn.()
    end
  end
end
