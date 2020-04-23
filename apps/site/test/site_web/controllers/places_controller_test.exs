defmodule SiteWeb.PlacesControllerTest do
  use SiteWeb.ConnCase
  alias GoogleMaps.Place.AutocompleteQuery
  alias Plug.Conn

  @prediction_results Poison.encode!([
                        %{
                          "description" => "Airport, Boston, MA, USA",
                          "id" => "9849ec38162852d3f21227b1162a70d5e37105da",
                          "matched_substrings" => [%{"length" => 4, "offset" => 0}],
                          "place_id" => "ChIJoYG_ryJw44kRhs8nIHc2Roo",
                          "reference" => "ChIJoYG_ryJw44kRhs8nIHc2Roo",
                          "structured_formatting" => %{
                            "main_text" => "Airport",
                            "main_text_matched_substrings" => [%{"length" => 4, "offset" => 0}],
                            "secondary_text" => "Boston, MA, USA"
                          },
                          "terms" => [
                            %{"offset" => 0, "value" => "Airport"},
                            %{"offset" => 9, "value" => "Boston"},
                            %{"offset" => 17, "value" => "MA"},
                            %{"offset" => 21, "value" => "USA"}
                          ],
                          "types" => ["neighborhood", "political", "geocode"]
                        },
                        %{
                          "description" =>
                            "Bradley International Airport (BDL), Schoephoester Road, Windsor Locks, CT, USA",
                          "id" => "52c0bd48bde3ed582ada49ae49942e345ea90ec6",
                          "matched_substrings" => [%{"length" => 4, "offset" => 22}],
                          "place_id" => "ChIJucyQYcL95okRZafxtdR6Wyc",
                          "reference" => "ChIJucyQYcL95okRZafxtdR6Wyc",
                          "structured_formatting" => %{
                            "main_text" => "Bradley International Airport (BDL)",
                            "main_text_matched_substrings" => [%{"length" => 4, "offset" => 22}],
                            "secondary_text" => "Schoephoester Road, Windsor Locks, CT, USA"
                          },
                          "terms" => [
                            %{"offset" => 0, "value" => "Bradley International Airport (BDL)"},
                            %{"offset" => 37, "value" => "Schoephoester Road"},
                            %{"offset" => 57, "value" => "Windsor Locks"},
                            %{"offset" => 72, "value" => "CT"},
                            %{"offset" => 76, "value" => "USA"}
                          ],
                          "types" => ["establishment"]
                        },
                        %{
                          "description" =>
                            "T. F. Green Airport (PVD), Post Road, Warwick, RI, USA",
                          "id" => "dd17811781a3db5e1e0a1720ae6c5040405a838c",
                          "matched_substrings" => [%{"length" => 4, "offset" => 12}],
                          "place_id" => "ChIJN0na1RRw44kRRFEtH8OUkww",
                          "reference" => "ChIJN0na1RRw44kRRFEtH8OUkww",
                          "structured_formatting" => %{
                            "main_text" => "T. F. Green Airport (PVD)",
                            "main_text_matched_substrings" => [%{"length" => 4, "offset" => 12}],
                            "secondary_text" => "Post Road, Warwick, RI, USA"
                          },
                          "terms" => [
                            %{"offset" => 0, "value" => "T. F. Green Airport (PVD)"},
                            %{"offset" => 27, "value" => "Post Road"},
                            %{"offset" => 38, "value" => "Warwick"},
                            %{"offset" => 47, "value" => "RI"},
                            %{"offset" => 51, "value" => "USA"}
                          ],
                          "types" => ["establishment"]
                        },
                        %{
                          "description" => "Airport Road, Manchester, NH, USA",
                          "id" => "e9810364342959dfb86a739124606291c58bc55b",
                          "matched_substrings" => [%{"length" => 4, "offset" => 0}],
                          "place_id" =>
                            "EiFBaXJwb3J0IFJvYWQsIE1hbmNoZXN0ZXIsIE5ILCBVU0EiLiosChQKEgkngCJ5R0ziiRGPkUEYQl3a-BIUChIJo2xmaNZO4okReXE1H0YyBGs",
                          "reference" =>
                            "EiFBaXJwb3J0IFJvYWQsIE1hbmNoZXN0ZXIsIE5ILCBVU0EiLiosChQKEgkngCJ5R0ziiRGPkUEYQl3a-BIUChIJo2xmaNZO4okReXE1H0YyBGs",
                          "structured_formatting" => %{
                            "main_text" => "Airport Road",
                            "main_text_matched_substrings" => [%{"length" => 4, "offset" => 0}],
                            "secondary_text" => "Manchester, NH, USA"
                          },
                          "terms" => [
                            %{"offset" => 0, "value" => "Airport Road"},
                            %{"offset" => 14, "value" => "Manchester"},
                            %{"offset" => 26, "value" => "NH"},
                            %{"offset" => 30, "value" => "USA"}
                          ],
                          "types" => ["route", "geocode"]
                        },
                        %{
                          "description" =>
                            "John F. Kennedy International Airport (JFK), Queens, NY, USA",
                          "id" => "87586c86ef1c53323d31eba8260ca7f0ea7cb094",
                          "matched_substrings" => [%{"length" => 4, "offset" => 30}],
                          "place_id" => "ChIJR0lA1VBmwokR8BGfSBOyT-w",
                          "reference" => "ChIJR0lA1VBmwokR8BGfSBOyT-w",
                          "structured_formatting" => %{
                            "main_text" => "John F. Kennedy International Airport (JFK)",
                            "main_text_matched_substrings" => [%{"length" => 4, "offset" => 30}],
                            "secondary_text" => "Queens, NY, USA"
                          },
                          "terms" => [
                            %{
                              "offset" => 0,
                              "value" => "John F. Kennedy International Airport (JFK)"
                            },
                            %{"offset" => 45, "value" => "Queens"},
                            %{"offset" => 53, "value" => "NY"},
                            %{"offset" => 57, "value" => "USA"}
                          ],
                          "types" => ["establishment"]
                        }
                      ])

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

    bypass = Bypass.open()
    old_domain = Application.get_env(:google_maps, :domain)
    Application.put_env(:google_maps, :domain, "http://localhost:#{bypass.port}")

    on_exit(fn ->
      Application.put_env(:google_maps, :domain, old_domain)
    end)

    {:ok, conn: conn, bypass: bypass}
  end

  describe "autocomplete" do
    test "responds with predictions", %{conn: conn, bypass: bypass} do
      input = "controller1"

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/place/autocomplete/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["input"] == input

        Conn.resp(conn, 200, ~s({"status": "OK", "predictions": #{@prediction_results}}))
      end)

      conn = get(conn, places_path(conn, :autocomplete, input, "3", "123"))

      assert conn.status == 200
      body = json_response(conn, 200)

      predictions = Poison.decode!(body["predictions"])
      assert is_list(predictions)
      assert length(predictions) == 3
    end

    test "responds with bad request if hit limit isn't an integer", %{conn: conn} do
      conn = get(conn, places_path(conn, :autocomplete, "controller2", "five", "123"))

      assert conn.status == 400
      body = json_response(conn, 400)
      assert body["error"] == "Invalid arguments"
    end

    test "responds with 500 error when google returns an error", %{conn: conn} do
      autocomplete_fn = fn %AutocompleteQuery{input: "input"} ->
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
