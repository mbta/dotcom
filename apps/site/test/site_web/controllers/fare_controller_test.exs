defmodule SiteWeb.FareControllerTest do
  use SiteWeb.ConnCase
  import SiteWeb.FareController

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
      assert html_response(conn, 404) =~ "Your stop cannot be found."
    end

    test "sets a custom meta description", %{conn: conn} do
      conn = get(conn, fare_path(conn, :show, "retail-sales-locations"))

      assert conn.assigns.meta_description
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
end
