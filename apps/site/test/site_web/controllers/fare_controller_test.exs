defmodule SiteWeb.FareControllerTest do
  use SiteWeb.ConnCase, async: false
  import SiteWeb.FareController
  import Mock

  describe "show" do
    @tag skip:
           "Commenting out this test temporarily. As of Summer 2020 the limited service does not include this ferry."
    test "renders Georges Island ferry when present in the data", %{conn: conn} do
      conn =
        get(
          conn,
          fare_path(conn, :show, :ferry, origin: "Boat-George", destination: "Boat-Logan")
        )

      response = html_response(conn, 200)

      assert response =~ "Georges Island Fare"
      assert response =~ "Child under 3"
      assert response =~ "Family 4-pack"
    end

    test "renders a page about retail sale locations", %{conn: conn} do
      conn = get(conn, fare_path(conn, :show, "retail-sales-locations"))
      assert html_response(conn, 200) =~ "Retail Sales Locations"
    end

    test "404s on nonexistant mode", %{conn: conn} do
      conn = get(conn, fare_path(conn, :show, :doesnotexist))
      assert html_response(conn, 404) =~ "Sorry! We missed your stop."
    end

    test "sets a custom meta description", %{conn: conn} do
      conn = get(conn, fare_path(conn, :show, "retail-sales-locations"))

      assert conn.assigns.meta_description
    end

    test "renders the retail sales locations page with results by giving it an address", %{
      conn: conn
    } do
      conn =
        get(conn, fare_path(conn, :show, "retail-sales-locations"), %{
          "latitude" => "42.3576135",
          "location" => %{"address" => "Park Street Place, Boston, MA, USA"},
          "longitude" => "-71.0625776"
        })

      assert html_response(conn, 200) =~ "Get Directions"
    end

    test "renders the retail sales locations page with results by giving it coordinates", %{
      conn: conn
    } do
      conn =
        get(conn, fare_path(conn, :show, "retail-sales-locations"), %{
          "latitude" => "42.3576135",
          "longitude" => "-71.0625776"
        })

      assert html_response(conn, 200) =~ "Get Directions"
    end
  end

  describe "fare_sales_locations/2" do
    test "calculates nearest retail_sales_locations" do
      nearby_fn = fn position ->
        [{%{latitude: position.latitude, longitude: position.longitude}, 10.0}]
      end

      locations = fare_sales_locations(%{latitude: 42.0, longitude: -71.0}, nearby_fn)
      assert locations == [{%{latitude: 42.0, longitude: -71.0}, 10.0}]
    end

    test "when there is no search position, is an empty list of nearby locations" do
      nearby_fn = fn position ->
        [{%{latitude: position.latitude, longitude: position.longitude}, 10.0}]
      end

      locations = fare_sales_locations(%{}, nearby_fn)
      assert locations == []
    end
  end

  describe "one_way_by_stop_id/2" do
    test "returns one-way fare names and price ranges", %{conn: conn} do
      with_mock(Routes.Repo,
        by_stop: fn "stop_id", _ ->
          [
            %Routes.Route{fare_class: :ferry_fare},
            %Routes.Route{fare_class: :local_bus_fare},
            %Routes.Route{fare_class: :commuter_rail_fare}
          ]
        end
      ) do
        conn = get(conn, fare_path(conn, :one_way_by_stop_id, %{"stop_id" => "stop_id"}))
        fares_response = json_response(conn, 200)

        assert fares_response == [
                 ["Local bus one-way", "$1.70"],
                 ["Commuter Rail one-way", "$2.40 – $13.25"],
                 ["Ferry one-way", "$2.40 – $9.75"]
               ]
      end
    end
  end
end
