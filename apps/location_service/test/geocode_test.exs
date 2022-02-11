defmodule LocationService.GeocodeTest do
  use ExUnit.Case, async: true

  import LocationService.Geocode
  import Mock

  describe "geocode/1" do
    setup do
      old_value = Application.get_env(:location_service, :geocode)

      on_exit(fn ->
        Application.put_env(:location_service, :geocode, old_value)
      end)
    end

    test "selects function based on application environment variable" do
      with_mocks [
        {LocationService.AWS, [], [geocode: fn _ -> "i use the amazon one" end]},
        {GoogleMaps.Geocode, [], [geocode: fn _ -> "i use the google one" end]}
      ] do
        Application.put_env(:location_service, :geocode, :google)
        assert "i use the google one" = geocode("a thing")

        Application.put_env(:location_service, :geocode, :aws)
        assert "i use the amazon one" = geocode("some other thing")
      end
    end

    test "uses cache" do
      # return the input address along with the time the function evaluates.
      mock_return_address = fn address -> {address, DateTime.utc_now()} end

      with_mocks [
        {LocationService.AWS, [], [geocode: mock_return_address]},
        {GoogleMaps.Geocode, [], [geocode: mock_return_address]}
      ] do
        Application.put_env(:location_service, :geocode, :aws)
        address1 = "a first place"
        {^address1, time1} = geocode(address1)
        :timer.sleep(1000)
        {^address1, time2} = geocode(address1)
        # the second call should return the cached result
        assert DateTime.compare(time1, time2) == :eq

        Application.put_env(:location_service, :geocode, :google)
        address2 = "another place"
        {^address2, time3} = geocode(address2)
        :timer.sleep(1000)
        {^address2, time4} = geocode(address2)
        assert DateTime.compare(time3, time4) == :eq
      end
    end
  end
end
