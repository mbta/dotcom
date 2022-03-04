defmodule GoogleMaps.GeocodeTest do
  use ExUnit.Case
  import GoogleMaps.Geocode
  alias Plug.Conn

  @result1 '{
  "address_components" : [{
      "long_name" : "52-2",
      "short_name" : "52-2",
      "types" : [ "street_number" ]
    }],
  "formatted_address" : "52-2 Park Ln, Boston, MA 02210, USA",
  "geometry" : {
    "bounds" : {
      "northeast" : {
        "lat" : 42.3484946,
        "lng" : -71.0389612
      },
      "southwest" : {
        "lat" : 42.3483114,
        "lng" : -71.03938769999999
      }
    },
    "location" : {
      "lat" : 42.3484012,
      "lng" : -71.039176
    }
  }
}'

  @result2 '{
  "address_components" : [{
      "long_name" : "24",
      "short_name" : "24",
      "types" : [ "street_number" ]
    }],
  "formatted_address" : "24 Beacon St, Boston, MA 02133, USA",
  "geometry" : {
    "location" : {
      "lat" : 42.358627,
      "lng" : -71.063767
    }
  }
}'

  @reverse_geocode_results Poison.encode!([
                             %{
                               "address_components" => [
                                 %{
                                   "long_name" => "1",
                                   "short_name" => "1",
                                   "types" => ["street_number"]
                                 },
                                 %{
                                   "long_name" => "Cambridge Street",
                                   "short_name" => "Cambridge St",
                                   "types" => ["route"]
                                 },
                                 %{
                                   "long_name" => "Downtown",
                                   "short_name" => "Downtown",
                                   "types" => ["neighborhood", "political"]
                                 },
                                 %{
                                   "long_name" => "Boston",
                                   "short_name" => "Boston",
                                   "types" => ["locality", "political"]
                                 },
                                 %{
                                   "long_name" => "Suffolk County",
                                   "short_name" => "Suffolk County",
                                   "types" => ["administrative_area_level_2", "political"]
                                 },
                                 %{
                                   "long_name" => "Massachusetts",
                                   "short_name" => "MA",
                                   "types" => ["administrative_area_level_1", "political"]
                                 },
                                 %{
                                   "long_name" => "United States",
                                   "short_name" => "US",
                                   "types" => ["country", "political"]
                                 },
                                 %{
                                   "long_name" => "02114",
                                   "short_name" => "02114",
                                   "types" => ["postal_code"]
                                 }
                               ],
                               "formatted_address" => "1 Cambridge St, Boston, MA 02114, USA",
                               "geometry" => %{
                                 "location" => %{"lat" => 42.3600825, "lng" => -71.0588801},
                                 "location_type" => "ROOFTOP",
                                 "viewport" => %{
                                   "northeast" => %{
                                     "lat" => 42.3614314802915,
                                     "lng" => -71.05753111970849
                                   },
                                   "southwest" => %{
                                     "lat" => 42.3587335197085,
                                     "lng" => -71.06022908029149
                                   }
                                 }
                               },
                               "place_id" => "ChIJuUjwAYVw44kRY42oP5cuJ00",
                               "plus_code" => %{
                                 "compound_code" =>
                                   "9W6R+2C Boston, Massachusetts, United States",
                                 "global_code" => "87JC9W6R+2C"
                               },
                               "types" => ["street_address"]
                             }
                           ])

  describe "geocode/1" do
    test "returns an error for invalid addresses" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      address = "zero results"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["address"] == address

        Conn.resp(conn, 200, ~s({"status": "ZERO_RESULTS", "error_message": "Message"}))
      end)

      actual = geocode(address)
      assert {:error, :zero_results} = actual
    end

    test "returns :ok for one valid responses" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      address = "one response"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["address"] == address

        Conn.resp(conn, 200, ~s({"status": "OK", "results": [#{@result1}]}))
      end)

      actual = geocode(address)
      assert {:ok, [result]} = actual
      assert %LocationService.Address{} = result
    end

    test "returns :ok for multiple matches" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      address = "multiple matches"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["address"] == address

        Conn.resp(conn, 200, ~s({"status": "OK", "results": [#{@result1}, #{@result2}]}))
      end)

      actual = geocode(address)
      assert {:ok, [result1, result2]} = actual
      assert %LocationService.Address{} = result1
      assert %LocationService.Address{} = result2
    end

    test "returns :error if the domain doesn't load" do
      set_domain("http://localhost:0")

      address = "bad domain"

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          actual = geocode(address)
          assert {:error, :internal_error} = actual
        end)

      assert log =~ "error="
    end

    test "returns :error with error and message from google" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      address = "google error"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["address"] == address

        Conn.resp(conn, 200, ~s({"status": "INVALID_REQUEST", "error_message": "Message"}))
      end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          actual = geocode(address)
          assert {:error, :internal_error} == actual
        end)

      assert log =~ "API error"
    end

    test "returns :error if the status != 200" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      address = "not 200 response"

      Bypass.expect(bypass, fn conn ->
        Conn.resp(conn, 500, "")
      end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          actual = geocode(address)
          assert {:error, :internal_error} = actual
        end)

      assert log =~ "Unexpected HTTP code"
    end

    test "returns :error if the JSON is invalid" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      address = "invalid json"

      Bypass.expect(bypass, fn conn ->
        Conn.resp(conn, 200, "{")
      end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          actual = geocode(address)
          assert {:error, :internal_error} = actual
        end)

      assert log =~ "Error parsing to JSON"
    end

    test "uses cache" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      address = "cached"

      Bypass.expect_once(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["address"] == address

        Conn.resp(conn, 200, ~s({"status": "OK", "results": [#{@result1}]}))
      end)

      cache_miss = geocode(address)
      assert {:ok, [cache_miss_result]} = cache_miss
      assert %LocationService.Address{} = cache_miss_result

      cache_hit = geocode(address)
      assert {:ok, [cache_hit_result]} = cache_hit
      assert %LocationService.Address{} = cache_hit_result
    end
  end

  describe "geocode_by_place_id/1" do
    test "returns an error for invalid addresses" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      place_id = "zero_results"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["place_id"] == place_id

        Conn.resp(conn, 200, ~s({"status": "ZERO_RESULTS", "error_message": "Message"}))
      end)

      actual = geocode_by_place_id(place_id)
      assert {:error, :zero_results} = actual
    end

    test "returns :ok for one valid response" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      place_id = "one_result"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["place_id"] == place_id

        Conn.resp(conn, 200, ~s({"status": "OK", "results": [#{@result1}]}))
      end)

      actual = geocode_by_place_id(place_id)
      assert {:ok, [result]} = actual
      assert %LocationService.Address{} = result
    end

    test "returns :ok for multiple matches" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      place_id = "multiple_results"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["place_id"] == place_id

        Conn.resp(conn, 200, ~s({"status": "OK", "results": [#{@result1}, #{@result2}]}))
      end)

      actual = geocode_by_place_id(place_id)
      assert {:ok, [result1, result2]} = actual
      assert %LocationService.Address{} = result1
      assert %LocationService.Address{} = result2
    end

    test "uses cache" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      place_id = "cached"

      Bypass.expect_once(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["place_id"] == place_id

        Conn.resp(conn, 200, ~s({"status": "OK", "results": [#{@result1}]}))
      end)

      cache_miss = geocode_by_place_id(place_id)
      assert {:ok, [cache_miss_result]} = cache_miss
      assert %LocationService.Address{} = cache_miss_result

      cache_hit = geocode_by_place_id(place_id)
      assert {:ok, [cache_hit_result]} = cache_hit
      assert %LocationService.Address{} = cache_hit_result
    end
  end

  describe "reverse_geocode/2" do
    test "parses successful results from Google" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      latitude = 42.3600825
      longitude = -71.0588801

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["latlng"] == "#{latitude},#{longitude}"
        Conn.resp(conn, 200, ~s({"status": "OK", "results": #{@reverse_geocode_results}}))
      end)

      assert {:ok, results} = reverse_geocode(latitude, longitude)
      assert is_list(results)
      assert Enum.all?(results, fn result -> %LocationService.Address{} = result end)
    end

    test "sets appropriate parameter and returns an error for invalid addresses" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      latitude = 0.0
      longitude = 0.0

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["latlng"] == "#{latitude},#{longitude}"

        Conn.resp(conn, 200, ~s({"status": "ZERO_RESULTS", "error_message": "Message"}))
      end)

      actual = reverse_geocode(latitude, longitude)
      assert {:error, :zero_results} = actual
    end

    test "caches the results" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      latitude = 1.0
      longitude = 1.0

      Bypass.expect_once(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["latlng"] == "#{latitude},#{longitude}"
        Conn.resp(conn, 200, ~s({"status": "OK", "results": #{@reverse_geocode_results}}))
      end)

      assert {:ok, cache_miss_results} = reverse_geocode(latitude, longitude)
      assert is_list(cache_miss_results)
      assert Enum.all?(cache_miss_results, fn result -> %LocationService.Address{} = result end)

      assert {:ok, cache_hit_results} = reverse_geocode(latitude, longitude)
      assert is_list(cache_hit_results)
      assert Enum.all?(cache_hit_results, fn result -> %LocationService.Address{} = result end)
    end
  end

  describe "calculate_position/2" do
    test "it calculates search position and address" do
      params = %{"location" => %{"address" => "42.0, -71.0"}}

      geocode_fn = fn _address ->
        {:ok, [%LocationService.Address{formatted: "address", latitude: 42.0, longitude: -70.1}]}
      end

      {position, formatted} = calculate_position(params, geocode_fn)

      assert formatted == "address"
      assert %{latitude: 42.0, longitude: -70.1} = position
    end

    test "does not geocode if latitude/longitude params exist" do
      params = %{"latitude" => "42.0", "longitude" => "-71.0"}

      geocode_fn = fn _ ->
        send(self(), :geocode_called)
        {:error, :no_results}
      end

      {position, formatted} = calculate_position(params, geocode_fn)
      refute_received :geocode_called
      assert formatted == "42.0,-71.0"
      assert %{latitude: 42.0, longitude: -71.0} = position
    end

    test "handles bad lat/lng values" do
      params = %{"latitude" => "foo", "longitude" => "bar"}

      geocode_fn = fn _address ->
        send(self(), :geocode_called)

        {:ok, [%LocationService.Address{formatted: "address", latitude: 42.0, longitude: -70.1}]}
      end

      {position, formatted} = calculate_position(params, geocode_fn)
      refute_received :geocode_called
      assert position == %{}
      assert formatted == ""
    end

    test "when there is no location map there is no position" do
      params = %{}
      geocode_fn = fn _address -> %{formatted: "address", latitude: 42.0, longitude: -71.0} end
      {position, formatted} = calculate_position(params, geocode_fn)
      assert formatted == ""
      assert position == %{}
    end
  end

  defp set_domain(new_domain) do
    old_domain = Application.get_env(:location_service, :domain)
    Application.put_env(:location_service, :domain, new_domain)

    on_exit(fn ->
      Application.put_env(:location_service, :domain, old_domain)
    end)
  end
end
