defmodule DotcomWeb.FareControllerTest do
  use DotcomWeb.ConnCase, async: true
  import Mox

  setup :verify_on_exit!

  describe "show" do
    test "renders the initial proposed sales locations page", %{conn: conn} do
      conn = get(conn, fare_path(conn, :show_transformation, []))
      assert html_response(conn, 200) =~ "Proposed Sales Locations"
    end

    @tag :external
    test "renders the proposed sales locations page with results by giving it an address", %{
      conn: conn
    } do
      conn =
        get(conn, "/fare-transformation/proposed-sales-locations", %{
          "latitude" => "42.3576135",
          "location" => %{"address" => "Park Street Place, Boston, MA, USA"},
          "longitude" => "-71.0625776"
        })

      assert html_response(conn, 200) =~ "Get Directions"
    end

    @tag :external
    test "renders the proposed sales locations page with results by giving it coordinates", %{
      conn: conn
    } do
      conn =
        get(conn, "/fare-transformation/proposed-sales-locations", %{
          "latitude" => "42.3576135",
          "longitude" => "-71.0625776"
        })

      assert html_response(conn, 200) =~ "Get Directions"
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

    @tag :external
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

    @tag :external
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
end
