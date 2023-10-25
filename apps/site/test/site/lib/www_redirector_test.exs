defmodule SiteWeb.WwwRedirectorTest do
  use SiteWeb.ConnCase, async: true
  import Phoenix.ConnTest, only: [redirected_to: 2]

  alias SiteWeb.WwwRedirector

  test "call", %{conn: conn} do
    conn = WwwRedirector.call(%{conn | request_path: "/news"}, [])
    assert_conn_redirected_halted(conn, SiteWeb.Endpoint.url() <> "/news")
  end

  test "call with host option", %{conn: conn} do
    conn = WwwRedirector.call(%{conn | request_path: "/news"}, host: "https://myfakedomain.xyz")
    assert_conn_redirected_halted(conn, "https://myfakedomain.xyz/news")
  end

  @doc "Use case: The path_params are populated in the router, and if they're part of a scoped route, the redirected URL should not include the path prefix."
  test "omits scoped route path prefix", %{conn: conn} do
    request_path = "/charlie/page/one/two"

    conn = %{
      conn
      | request_path: request_path,
        query_string: nil,
        path_params: %{"path" => ["page", "one", "two"]}
    }

    conn = WwwRedirector.call(conn, host: "https://myfakedomain.xyz")

    refute redirected_to(conn, :moved_permanently) == "https://myfakedomain.xyz#{request_path}"
    assert_conn_redirected_halted(conn, "https://myfakedomain.xyz/page/one/two")
  end

  describe "redirect" do
    test "top level redirected", %{conn: conn} do
      check_redirect_to_www_mbta(conn, "/", nil, "https://www.mbta.com/")
      check_redirect_to_www_mbta(conn, "", nil, "https://www.mbta.com")
    end

    test "with path redirected", %{conn: conn} do
      check_redirect_to_www_mbta(conn, "/schedules", nil, "https://www.mbta.com/schedules")
    end

    test "with path and query string redirected", %{conn: conn} do
      check_redirect_to_www_mbta(
        conn,
        "/schedules/Boat-F4/schedule",
        "destination=Boat-Long",
        "https://www.mbta.com/schedules/Boat-F4/schedule?destination=Boat-Long"
      )
    end

    test "with path and query string with anchor redirected", %{conn: conn} do
      check_redirect_to_www_mbta(
        conn,
        "/schedules/Boat-F4/schedule",
        "destination=Boat-Long&direction_id=1&origin=Boat-Charlestown#direction-filter",
        "https://www.mbta.com/schedules/Boat-F4/schedule?destination=Boat-Long&direction_id=1&origin=Boat-Charlestown#direction-filter"
      )
    end
  end

  defp check_redirect_to_www_mbta(conn, request_path, query_string, expected_url) do
    conn = %{conn | request_path: request_path, query_string: query_string}
    conn = WwwRedirector.site_redirect("https://www.mbta.com", conn)

    assert_conn_redirected_halted(conn, expected_url)
  end

  defp assert_conn_redirected_halted(conn, expected_url) do
    assert redirected_to(conn, :moved_permanently) == expected_url
    assert conn.status == 301
    assert conn.halted
  end
end
