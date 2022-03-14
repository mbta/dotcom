defmodule SiteWeb.PlacesControllerTest do
  use SiteWeb.ConnCase
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

  setup do
    conn =
      default_conn()
      |> put_req_header("accept", "application/json")
      |> put_req_header("content-type", "application/json")

    bypass = Bypass.open()
    old_domain = Application.get_env(:location_service, :domain)
    Application.put_env(:location_service, :domain, "http://localhost:#{bypass.port}")

    on_exit(fn ->
      Application.put_env(:location_service, :domain, old_domain)
    end)

    {:ok, conn: conn, bypass: bypass}
  end

  describe "autocomplete" do
    test "responds with predictions", %{conn: conn} do
      input = "controller1"
      autocomplete_fn = fn _, _ ->
        {:ok, [%LocationService.Suggestion{ address: "123 Sesame Street" }]}
      end

      conn =
        conn
        |> assign(:autocomplete_fn, autocomplete_fn)
        |> get(conn, places_path(conn, :autocomplete, input, "3", "123"))

      assert conn.status == 200
      body = json_response(conn, 200)

      predictions = Poison.decode!(body["predictions"])
      assert is_list(predictions)
      assert length(predictions) == 1
    end

    test "responds with bad request if hit limit isn't an integer", %{conn: conn} do
      conn = get(conn, places_path(conn, :autocomplete, "controller2", "five", "123"))

      assert conn.status == 400
      body = json_response(conn, 400)
      assert body["error"] == "Invalid arguments"
    end

    test "responds with 500 error when location service returns an error", %{conn: conn} do
      autocomplete_fn = fn _, _ ->
        {:error, :internal_error}
      end

      conn =
        conn
        |> assign(:autocomplete_fn, autocomplete_fn)
        |> get(places_path(conn, :autocomplete, "input", "3", "123"))

      assert conn.status == 500
      assert %{"error" => "Internal error"} = json_response(conn, 500)
    end
  end

  describe "details" do
    test "responds with place details", %{conn: conn, bypass: bypass} do
      place_id = "controller_test_place_id"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["place_id"] == place_id

        Conn.resp(conn, 200, ~s({"status": "OK", "results": [#{@result1}]}))
      end)

      conn = get(conn, places_path(conn, :details, place_id))

      assert conn.status == 200
      body = json_response(conn, 200)

      result = Poison.decode!(body["result"])
      assert is_map(result)

      Map.has_key?(result, "place_id")
    end

    test "responds with 500 error when google returns an error", %{conn: conn} do
      geocode_by_place_id_fn = fn "PLACE_ID" ->
        {:error, :internal_error}
      end

      conn =
        conn
        |> assign(:geocode_by_place_id_fn, geocode_by_place_id_fn)
        |> get(places_path(conn, :details, "PLACE_ID"))

      assert conn.status == 500
      assert %{"error" => "Internal error"} = json_response(conn, 500)
    end

    test "responds with 500 error when google returns zero_results", %{conn: conn} do
      geocode_by_place_id_fn = fn "PLACE_ID" ->
        {:error, :zero_results}
      end

      conn =
        conn
        |> assign(:geocode_by_place_id_fn, geocode_by_place_id_fn)
        |> get(places_path(conn, :details, "PLACE_ID"))

      assert conn.status == 500
      assert %{"error" => "Zero results"} = json_response(conn, 500)
    end
  end

  describe "reverse_geocode" do
    test "responds with the address given a latitude and longitude", %{conn: conn, bypass: bypass} do
      latitude = "42.3484012"
      longitude = "-71.039176"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/geocode/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["latlng"] == "#{latitude},#{longitude}"
        Conn.resp(conn, 200, ~s({"status": "OK", "results": #{@reverse_geocode_results}}))
      end)

      conn = get(conn, places_path(conn, :reverse_geocode, latitude, longitude))

      assert conn.status == 200
      body = json_response(conn, 200)
      assert is_list(Poison.decode!(body["results"]))
    end

    test "responds with bad request if latitude and longitude aren't floats", %{
      conn: conn
    } do
      conn = get(conn, places_path(conn, :reverse_geocode, "latitude", "longitude"))

      assert conn.status == 400
      assert %{"error" => "Invalid arguments"} = json_response(conn, 400)
    end

    test "responds with 500 if google returns an error", %{conn: conn} do
      latitude = 42.3484012
      longitude = -71.039176

      reverse_geocode_fn = fn ^latitude, ^longitude ->
        {:error, :internal_error}
      end

      conn =
        conn
        |> assign(:reverse_geocode_fn, reverse_geocode_fn)
        |> get(
          places_path(
            conn,
            :reverse_geocode,
            Float.to_string(latitude),
            Float.to_string(longitude)
          )
        )

      assert conn.status == 500
      assert %{"error" => "Internal error"} = json_response(conn, 500)
    end

    test "responds with 500 if google returns zero_results", %{conn: conn} do
      latitude = 42.3484012
      longitude = -71.039176

      reverse_geocode_fn = fn ^latitude, ^longitude ->
        {:error, :zero_results}
      end

      conn =
        conn
        |> assign(:reverse_geocode_fn, reverse_geocode_fn)
        |> get(
          places_path(
            conn,
            :reverse_geocode,
            Float.to_string(latitude),
            Float.to_string(longitude)
          )
        )

      assert conn.status == 500
      assert %{"error" => "Zero results"} = json_response(conn, 500)
    end
  end
end
