defmodule SiteWeb.FareTransformationControllerTest do
  use SiteWeb.ConnCase

  describe "index" do
    test "renders the initial proposed sales locations page", %{conn: conn} do
      conn = get(conn, "/fare-transformation/proposed-sales-locations")
      assert html_response(conn, 200) =~ "Proposed Sales Locations"
    end

    test "redirects to the Retail Sales page", %{conn: conn} do
      conn = get(conn, "/fare-transformation/pumpkin-spice-latte")
      assert redirected_to(conn, 302) == "/fares/retail-sales-locations"
    end

    test "renders the proposed sales locations page with results", %{conn: conn} do
      conn =
        get(conn, "/fare-transformation/proposed-sales-locations", %{
          "latitude" => "42.3576135",
          "location" => %{"address" => "Park Street Place, Boston, MA, USA"},
          "longitude" => "-71.0625776"
        })

      assert html_response(conn, 200) =~ "Get Directions"
    end
  end
end
