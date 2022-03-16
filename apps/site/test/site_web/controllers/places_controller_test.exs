defmodule SiteWeb.PlacesControllerTest do
  use SiteWeb.ConnCase

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
end
