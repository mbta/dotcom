defmodule DotcomWeb.Plugs.CanonicalHostnameTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true

  alias DotcomWeb.Plugs.CanonicalHostname

  describe "call/2" do
    test "with a local IP address, does nothing" do
      # Class A
      conn = %Plug.Conn{default_conn() | host: "10.127.127.127"}
      assert conn.status != 301
      conn = CanonicalHostname.call(conn, nil)
      assert conn.status != 301

      # Class B
      conn = %Plug.Conn{default_conn() | host: "172.24.127.127"}
      assert conn.status != 301
      conn = CanonicalHostname.call(conn, nil)
      assert conn.status != 301

      # Class C
      conn = %Plug.Conn{default_conn() | host: "192.168.127.127"}
      assert conn.status != 301
      conn = CanonicalHostname.call(conn, nil)
      assert conn.status != 301
    end

    test "when the hostname doesn't match the canonical hostname, redirects" do
      conn = %Plug.Conn{default_conn() | host: "example.com"}
      assert conn.status != 301

      conn = CanonicalHostname.call(conn, nil)
      assert conn.status == 301
    end

    test "when the hostname matches the canonical hostname, does nothing" do
      conn = default_conn()
      assert conn.status != 301

      conn = CanonicalHostname.call(conn, nil)
      assert conn.status != 301
    end
  end
end
