defmodule SiteWeb.Plugs.CanonicalHostnameTest do
  @moduledoc false
  use SiteWeb.ConnCase, async: true

  describe "call/2" do
    test "with the special mTicket hostname, does nothing" do
      conn = %Plug.Conn{default_conn() | host: "mticket.mbtace.com"}
      assert conn.status != 301

      conn = SiteWeb.Plugs.CanonicalHostname.call(conn, nil)
      assert conn.status != 301
    end

    test "when the hostname doesn't match the canonical hostname, redirects" do
      conn = %Plug.Conn{default_conn() | host: "example.com"}
      assert conn.status != 301

      conn = SiteWeb.Plugs.CanonicalHostname.call(conn, nil)
      assert conn.status == 301
    end

    test "when the hostname matches the canonical hostname, does nothing" do
      conn = default_conn()
      assert conn.status != 301

      conn = SiteWeb.Plugs.CanonicalHostname.call(conn, nil)
      assert conn.status != 301
    end
  end
end
