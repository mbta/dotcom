defmodule LocationServiceTest do
  use ExUnit.Case, async: false

  import LocationService
  import Mock
  import Test.Support.EnvHelpers

  describe "selects functions based on environment variable" do
    setup_with_mocks([
      {AWSLocation, [],
       [
         geocode: fn _ -> "i use the amazon one" end,
         reverse_geocode: fn _, _ -> "i use the amazon one" end,
         autocomplete: fn _, _ -> "i use the amazon one" end
       ]},
      {LocationService.Wrappers, [],
       [google_autocomplete: fn _, _, _ -> "i use the google one" end]},
      {GoogleMaps.Geocode, [:passthrough],
       [
         geocode: fn _ -> "i use the google one" end,
         reverse_geocode: fn _, _ -> "i use the google one" end
       ]}
    ]) do
      :ok
    end

    test "selects functions based on system environment variable (google)" do
      set_location_service_config(
        geocode: "google",
        reverse_geocode: "google",
        autocomplete: "google"
      )

      assert "i use the google one" = geocode("a thing")
      assert "i use the google one" = reverse_geocode(71.56890, -68.5285)
      assert "i use the google one" = autocomplete("a thing", 2, nil)
    end

    test "selects functions based on system environment variable (aws)" do
      set_location_service_config(geocode: "aws", reverse_geocode: "aws", autocomplete: "aws")
      assert "i use the amazon one" = geocode("another thing")
      assert "i use the amazon one" = reverse_geocode(71.56890, 40.5285)
      assert "i use the amazon one" = autocomplete("some other thing", 2, nil)
    end
  end

  describe "geocode/1" do
    test "uses cache" do
      # return the input address along with the time the function evaluates.
      mock_return_address = fn address -> {address, DateTime.utc_now()} end

      with_mocks [
        {AWSLocation, [], [geocode: mock_return_address]}
      ] do
        set_location_service_config(geocode: "aws")
        address1 = "a first place"
        {^address1, time1} = geocode(address1)
        :timer.sleep(1000)
        {^address1, time2} = geocode(address1)
        # the second call should return the cached result
        assert DateTime.compare(time1, time2) == :eq
      end
    end
  end

  describe "reverse_geocode/1" do
    test "uses cache" do
      # return the input coordinates along with the time the function evaluates.
      mock_return_coordinates = fn lat, long -> {lat, long, DateTime.utc_now()} end

      with_mocks [
        {AWSLocation, [], [reverse_geocode: mock_return_coordinates]},
        {GoogleMaps.Geocode, [], [reverse_geocode: mock_return_coordinates]}
      ] do
        set_location_service_config(reverse_geocode: "aws")
        lat1 = 71.596
        long1 = -68.321
        {^lat1, ^long1, time1} = reverse_geocode(lat1, long1)
        :timer.sleep(1000)
        {^lat1, ^long1, time2} = reverse_geocode(lat1, long1)
        # the second call should return the cached result
        assert DateTime.compare(time1, time2) == :eq
      end
    end
  end

  describe "autocomplete/3" do
    test "is cached" do
      with_mock AWSLocation, [], autocomplete: fn _, _ -> DateTime.utc_now() end do
        set_location_service_config(autocomplete: "aws")
        t1 = autocomplete("cached", 2, nil)
        t2 = autocomplete("cached", 2, nil)
        assert t1 == t2
      end
    end
  end

  defp set_location_service_config(opts) do
    adjusted_config =
      Application.get_env(:site, LocationService)
      |> Keyword.merge(opts)

    reassign_env(:site, LocationService, adjusted_config)
  end
end
