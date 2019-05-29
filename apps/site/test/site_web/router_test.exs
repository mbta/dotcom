defmodule Phoenix.Router.RoutingTest do
  use SiteWeb.ConnCase, async: true

  describe "redirects" do
    test "yawkey redirect", %{conn: conn} do
      conn = get(conn, "/stops/Lansdowne")
      assert redirected_to(conn, 301) == "/stops/Yawkey"
    end

    test "SL", %{conn: conn} do
      conn = get(conn, "/schedules/SL1")
      assert redirected_to(conn, 301) == "/schedules/741"

      conn = get(conn, "/schedules/sl1")
      assert redirected_to(conn, 301) == "/schedules/741"

      conn = get(conn, "/schedules/SL2")
      assert redirected_to(conn, 301) == "/schedules/742"

      conn = get(conn, "/schedules/sl2")
      assert redirected_to(conn, 301) == "/schedules/742"

      conn = get(conn, "/schedules/SL3")
      assert redirected_to(conn, 301) == "/schedules/743"

      conn = get(conn, "/schedules/sl3")
      assert redirected_to(conn, 301) == "/schedules/743"

      conn = get(conn, "/schedules/SL4")
      assert redirected_to(conn, 301) == "/schedules/751"

      conn = get(conn, "/schedules/sl4")
      assert redirected_to(conn, 301) == "/schedules/751"

      conn = get(conn, "/schedules/SL5")
      assert redirected_to(conn, 301) == "/schedules/749"

      conn = get(conn, "/schedules/sl5")
      assert redirected_to(conn, 301) == "/schedules/749"

      conn = get(conn, "/schedules/CT1")
      assert redirected_to(conn, 301) == "/schedules/701"

      conn = get(conn, "/schedules/ct1")
      assert redirected_to(conn, 301) == "/schedules/701"

      conn = get(conn, "/schedules/CT2")
      assert redirected_to(conn, 301) == "/schedules/747"

      conn = get(conn, "/schedules/ct2")
      assert redirected_to(conn, 301) == "/schedules/747"

      conn = get(conn, "/schedules/CT3")
      assert redirected_to(conn, 301) == "/schedules/708"

      conn = get(conn, "/schedules/ct3")
      assert redirected_to(conn, 301) == "/schedules/708"
    end
  end
end
