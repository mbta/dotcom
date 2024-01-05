defmodule DotcomWeb.PlacesControllerTest do
  use DotcomWeb.ConnCase, async: false
  import Mock

  setup do
    conn =
      default_conn()
      |> put_req_header("accept", "application/json")
      |> put_req_header("content-type", "application/json")

    {:ok, conn: conn}
  end

  describe "autocomplete" do
    test "responds with predictions", %{conn: conn} do
      input = "controller1"

      autocomplete_fn = fn _, _, _ ->
        {:ok, [%LocationService.Suggestion{address: "123 Sesame Street", highlighted_spans: []}]}
      end

      conn = assign(conn, :autocomplete_fn, autocomplete_fn)
      conn = get(conn, places_path(conn, :autocomplete, input, "3", "123"))

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
      autocomplete_fn = fn _, _, _ ->
        {:error, :internal_error}
      end

      conn = assign(conn, :autocomplete_fn, autocomplete_fn)
      conn = get(conn, places_path(conn, :autocomplete, "input", "3", "123"))

      assert conn.status == 500
      assert %{"error" => "Internal error"} = json_response(conn, 500)
    end
  end

  describe "details" do
    test "responds with place details", %{conn: conn} do
      place_id = "controller_test_place_id"

      geocode_fn = fn _ -> {:ok, [:test]} end
      conn = assign(conn, :geocode_fn, geocode_fn)
      conn = get(conn, places_path(conn, :details, place_id))

      assert conn.status == 200
      body = json_response(conn, 200)

      result = Poison.decode!(body["result"])
      assert "test" = result
    end

    test "responds with 500 error when google returns an error", %{conn: conn} do
      geocode_fn = fn "PLACE_ID" ->
        {:error, :internal_error}
      end

      conn = assign(conn, :geocode_fn, geocode_fn)
      conn = get(conn, places_path(conn, :details, "PLACE_ID"))

      assert conn.status == 500
      assert %{"error" => "Internal error"} = json_response(conn, 500)
    end

    test "responds with 500 error when google returns zero_results", %{conn: conn} do
      geocode_fn = fn "PLACE_ID" ->
        {:error, :zero_results}
      end

      conn = assign(conn, :geocode_fn, geocode_fn)
      conn = get(conn, places_path(conn, :details, "PLACE_ID"))

      assert conn.status == 500
      assert %{"error" => "Zero results"} = json_response(conn, 500)
    end
  end

  describe "reverse_geocode" do
    test "responds with the address given a latitude and longitude", %{conn: conn} do
      latitude = "42.3484012"
      longitude = "-71.039176"

      reverse_geocode_fn = fn _, _ ->
        {:ok, []}
      end

      conn = assign(conn, :reverse_geocode_fn, reverse_geocode_fn)
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

  test "/places/popular returns a list of popular locations", %{conn: conn} do
    conn = get(conn, places_path(conn, :popular))
    assert %{"result" => [location | _]} = json_response(conn, 200)
    assert %{"name" => "Boston Logan Airport", "icon" => "airplane"} = location
    assert has_urls?(location)
  end

  test "/places/urls augments a location", %{conn: conn} do
    conn = get(conn, places_path(conn, :with_urls, %{"latitude" => 1, "longitude" => 2}))
    assert %{"result" => location} = json_response(conn, 200)
    assert has_urls?(location)
  end

  describe "/places/search/:query/:limit" do
    setup_with_mocks([
      {AWSLocation, [],
       [
         autocomplete: fn search, limit ->
           result =
             for i <- 1..limit,
                 do: %LocationService.Suggestion{
                   address: "suggestion #{i} for #{search}",
                   highlighted_spans: []
                 }

           {:ok, result}
         end,
         geocode: fn address ->
           {:ok, [%LocationService.Address{formatted: address, latitude: 60.4, longitude: 30.8}]}
         end
       ]}
    ]) do
      :ok
    end

    test "errors if hit limit isn't a number", %{conn: conn} do
      hit_limit = "NaN"
      conn = get(conn, places_path(conn, :search, "s", hit_limit))
      assert %{"error" => "Invalid arguments"} = json_response(conn, 400)
    end

    test "passes query and limit params to AWS autocomplete function", %{conn: conn} do
      get(conn, places_path(conn, :search, "search term", 14))
      assert called(AWSLocation.autocomplete("search term", 14))
    end

    test "geocodes suggested results", %{conn: conn} do
      conn = get(conn, places_path(conn, :search, "south", 3))
      assert %{"result" => locations} = json_response(conn, 200)
      assert Enum.all?(locations, &Map.has_key?(&1, "latitude"))
      assert Enum.all?(locations, &Map.has_key?(&1, "longitude"))
    end

    test "adds URLs to each result", %{conn: conn} do
      conn = get(conn, places_path(conn, :search, "south", 3))
      assert %{"result" => locations} = json_response(conn, 200)
      assert Enum.all?(locations, &has_urls?/1)
    end
  end

  defp has_urls?(%{
         "urls" => %{
           "transit-near-me" => tnm,
           "retail-sales-locations" => r,
           "proposed-sales-locations" => p
         }
       })
       when is_binary(tnm) and is_binary(r) and is_binary(p),
       do: true

  defp has_urls?(_), do: false
end
