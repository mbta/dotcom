defmodule LocationServiceTest do
  use ExUnit.Case, async: false

  import LocationService
  import Mock

  setup do
    old_value = System.get_env("LOCATION_SERVICE")
    System.put_env("LOCATION_SERVICE", "")

    on_exit(fn ->
      System.put_env("LOCATION_SERVICE", old_value || "")
    end)
  end

  describe "geocode/1" do
    test "selects function based on system environment variable" do
      with_mocks [
        {AWSLocation, [], [geocode: fn _ -> "i use the amazon one" end]},
        {GoogleMaps.Geocode, [], [geocode: fn _ -> "i use the google one" end]}
      ] do
        System.put_env("LOCATION_SERVICE", "google")
        assert "i use the google one" = geocode("a thing")

        System.put_env("LOCATION_SERVICE", "aws")
        assert "i use the amazon one" = geocode("some other thing")
      end
    end

    test "uses cache" do
      # return the input address along with the time the function evaluates.
      mock_return_address = fn address -> {address, DateTime.utc_now()} end

      with_mocks [
        {AWSLocation, [], [geocode: mock_return_address]},
        {GoogleMaps.Geocode, [], [geocode: mock_return_address]}
      ] do
        System.put_env("LOCATION_SERVICE", "aws")
        address1 = "a first place"
        {^address1, time1} = geocode(address1)
        :timer.sleep(1000)
        {^address1, time2} = geocode(address1)
        # the second call should return the cached result
        assert DateTime.compare(time1, time2) == :eq

        System.put_env("LOCATION_SERVICE", "google")
        address2 = "another place"
        {^address2, time3} = geocode(address2)
        :timer.sleep(1000)
        {^address2, time4} = geocode(address2)
        assert DateTime.compare(time3, time4) == :eq
      end
    end
  end

  describe "reverse_geocode/1" do
    test "selects function based on system environment variable" do
      with_mocks [
        {AWSLocation, [], [reverse_geocode: fn _, _ -> "i use the amazon one" end]},
        {GoogleMaps.Geocode, [], [reverse_geocode: fn _, _ -> "i use the google one" end]}
      ] do
        System.put_env("LOCATION_SERVICE", "google")
        assert "i use the google one" = reverse_geocode(71.56890, -68.5285)

        System.put_env("LOCATION_SERVICE", "aws")
        assert "i use the amazon one" = reverse_geocode(71.56890, 40.5285)
      end
    end

    test "uses cache" do
      # return the input coordinates along with the time the function evaluates.
      mock_return_coordinates = fn lat, long -> {lat, long, DateTime.utc_now()} end

      with_mocks [
        {AWSLocation, [], [reverse_geocode: mock_return_coordinates]},
        {GoogleMaps.Geocode, [], [reverse_geocode: mock_return_coordinates]}
      ] do
        System.put_env("LOCATION_SERVICE", "aws")
        lat1 = 71.596
        long1 = -68.321
        {^lat1, ^long1, time1} = reverse_geocode(lat1, long1)
        :timer.sleep(1000)
        {^lat1, ^long1, time2} = reverse_geocode(lat1, long1)
        # the second call should return the cached result
        assert DateTime.compare(time1, time2) == :eq

        System.put_env("LOCATION_SERVICE", "google")
        lat2 = 42.0
        long2 = 71.55
        {^lat2, ^long2, time3} = reverse_geocode(lat2, long2)
        :timer.sleep(1000)
        {^lat2, ^long2, time4} = reverse_geocode(lat2, long2)
        assert DateTime.compare(time3, time4) == :eq
      end
    end
  end

  describe "autocomplete/3" do
    test "selects function based on application environment variable" do
      with_mocks [
        {AWSLocation, [], [autocomplete: fn _, _ -> "i use the amazon one" end]},
        {LocationService.Wrappers, [],
         [google_autocomplete: fn _, _, _ -> "i use the google one" end]}
      ] do
        System.put_env("LOCATION_SERVICE", "google")
        assert "i use the google one" = autocomplete("a thing", 2, nil)

        System.put_env("LOCATION_SERVICE", "aws")
        assert "i use the amazon one" = autocomplete("some other thing", 2, nil)
      end
    end

    test "is cached" do
      with_mock AWSLocation, [], autocomplete: fn _, _ -> DateTime.utc_now() end do
        System.put_env("LOCATION_SERVICE", "aws")
        t1 = autocomplete("cached", 2, nil)
        t2 = autocomplete("cached", 2, nil)
        assert t1 == t2
      end
    end
  end
end
