defmodule SiteWeb.Plugs.UriCheckerTest do
  @moduledoc """
  Tests for the UriChecker plug
  """
  use SiteWeb.ConnCase, async: true
  import SiteWeb.Plugs.UriChecker

  describe "URI checker" do
    test "does nothing because URI is not malformed", %{conn: conn} do
      assert conn == call(conn, [])
    end

    test "redirects with a 404 because URI is malformed", %{conn: conn} do
      conn =
        %{conn | path_info: ["pass-program", "perq%"]}
        |> put_private(:phoenix_endpoint, SiteWeb.Endpoint)

      conn = call(conn, [])

      assert conn.status == 404
      assert conn.halted
    end
  end
end
