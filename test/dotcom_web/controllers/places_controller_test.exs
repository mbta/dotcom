defmodule DotcomWeb.PlacesControllerTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.PlacesController
  import Mox
  import Test.Support.Factories.LocationService.LocationService

  setup :verify_on_exit!

  setup do
    conn =
      default_conn()
      |> put_req_header("accept", "application/json")
      |> put_req_header("content-type", "application/json")

    {:ok, conn: conn}
  end

  describe "autocomplete" do
    test "responds with predictions", %{conn: conn} do
      input = Faker.App.name()
      hit_limit = Faker.random_between(3, 5)
      suggestions = build_list(3, :address)

      expect(LocationService.Mock, :autocomplete, fn ^input, ^hit_limit ->
        {:ok, suggestions}
      end)

      conn = autocomplete(conn, %{"input" => input, "hit_limit" => "#{hit_limit}"})
      assert conn.status == 200
      body = json_response(conn, 200)
      assert length(Jason.decode!(body["predictions"])) == length(suggestions)
    end

    test "responds with bad request if hit limit isn't an integer", %{conn: conn} do
      input = Faker.App.name()
      hit_limit = "eleven"
      conn = autocomplete(conn, %{"input" => input, "hit_limit" => "#{hit_limit}"})
      assert conn.status == 400
      body = json_response(conn, 400)
      assert body["error"] == "Invalid arguments"
    end

    test "responds with 500 error when location service returns an error", %{conn: conn} do
      expect(LocationService.Mock, :autocomplete, fn _, _ ->
        {:error, :internal_error}
      end)

      input = Faker.App.name()
      hit_limit = Faker.random_between(3, 5)
      conn = autocomplete(conn, %{"input" => input, "hit_limit" => "#{hit_limit}"})
      assert conn.status == 500
      assert %{"error" => "Internal error"} = json_response(conn, 500)
    end
  end

  describe "details" do
    test "responds with place details", %{conn: conn} do
      expect(LocationService.Mock, :geocode, fn _ ->
        {:ok, build_list(3, :address)}
      end)

      place_id = "controller_test_place_id"
      conn = details(conn, %{"address" => place_id})

      assert conn.status == 200
      body = json_response(conn, 200)

      result = Jason.decode!(body["result"])
      assert %{"formatted" => _, "latitude" => _, "longitude" => _} = result
    end

    test "responds with 500 error when AWS returns an error", %{conn: conn} do
      expect(LocationService.Mock, :geocode, fn _ ->
        {:error, :internal_error}
      end)

      conn = details(conn, %{"address" => "PLACE_ID"})

      assert conn.status == 500
      assert %{"error" => "Internal error"} = json_response(conn, 500)
    end
  end

  describe "reverse_geocode" do
    test "responds with the address given a latitude and longitude", %{conn: conn} do
      latitude = Faker.Address.latitude()
      longitude = Faker.Address.longitude()

      expect(LocationService.Mock, :reverse_geocode, fn ^latitude, ^longitude ->
        {:ok, build_list(3, :address)}
      end)

      conn = reverse_geocode(conn, %{"latitude" => "#{latitude}", "longitude" => "#{longitude}"})
      assert conn.status == 200
      body = json_response(conn, 200)
      assert is_list(Jason.decode!(body["results"]))
    end

    test "responds with bad request if latitude and longitude aren't floats", %{
      conn: conn
    } do
      conn = reverse_geocode(conn, %{"latitude" => "latitude", "longitude" => "longitude"})
      assert conn.status == 400
      assert %{"error" => "Invalid arguments"} = json_response(conn, 400)
    end

    test "responds with 500 if AWS returns an error", %{conn: conn} do
      expect(LocationService.Mock, :reverse_geocode, fn _, _ ->
        {:error, :internal_error}
      end)

      conn =
        reverse_geocode(conn, %{
          "latitude" => "#{Faker.Address.latitude()}",
          "longitude" => "#{Faker.Address.longitude()}"
        })

      assert conn.status == 500
      assert %{"error" => "Internal error"} = json_response(conn, 500)
    end
  end

  test "/places/popular returns a list of popular locations", %{conn: conn} do
    conn = popular(conn, %{})
    assert %{"result" => [location | _]} = json_response(conn, 200)
    assert %{"name" => "Boston Logan Airport", "icon" => "airplane"} = location
    assert has_urls?(location)
  end

  test "/places/urls augments a location", %{conn: conn} do
    conn = with_urls(conn, %{"latitude" => 1, "longitude" => 2})
    assert %{"result" => location} = json_response(conn, 200)
    assert has_urls?(location)
  end

  describe "/places/search/:query/:limit" do
    test "errors if hit limit isn't a number", %{conn: conn} do
      hit_limit = "NaN"
      conn = search(conn, %{"query" => "s", "hit_limit" => hit_limit})
      assert %{"error" => "Invalid arguments"} = json_response(conn, 400)
    end

    test "passes query and limit params to AWS autocomplete function", %{conn: conn} do
      search_term = Faker.App.name()
      hit_limit = Faker.random_between(1, 10)

      expect(LocationService.Mock, :autocomplete, fn ^search_term, ^hit_limit ->
        {:ok, []}
      end)

      search(conn, %{"query" => search_term, "hit_limit" => "#{hit_limit}"})
    end

    test "geocodes suggested results", %{conn: conn} do
      num_suggestions = Faker.random_between(2, 5)

      LocationService.Mock
      |> expect(:autocomplete, fn _, _ ->
        {:ok, build_list(num_suggestions, :address)}
      end)

      conn = search(conn, %{"query" => "south", "hit_limit" => "3"})
      assert %{"result" => locations} = json_response(conn, 200)
      assert Enum.all?(locations, &Map.has_key?(&1, "latitude"))
      assert Enum.all?(locations, &Map.has_key?(&1, "longitude"))
    end

    test "adds URLs to each result", %{conn: conn} do
      LocationService.Mock
      |> expect(:autocomplete, fn _, _ ->
        {:ok, build_list(10, :address)}
      end)

      conn = search(conn, %{"query" => "south", "hit_limit" => "3"})
      assert %{"result" => locations} = json_response(conn, 200)
      assert Enum.all?(locations, &has_urls?/1)
    end

    test "returns error", %{conn: conn} do
      expect(LocationService.Mock, :autocomplete, fn _, _ ->
        {:error, :interal_error}
      end)

      conn = search(conn, %{"query" => "south", "hit_limit" => "3"})
      assert %{"error" => "Internal error"} = json_response(conn, 500)
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
