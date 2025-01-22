defmodule DotcomWeb.Plugs.StaticTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.Static

  describe "apple-touch-icon redirects" do
    test "returns apple-touch-icon if we request apple-touch-icon-*.png", %{conn: conn} do
      conn = %{conn | request_path: "/apple-touch-icon-120x120.png"}
      conn = call(conn, [])
      assert conn.status == 302
      assert conn.state === :sent
      assert conn.halted
    end

    test "does not return apple-touch-icon if we request /path/apple-touch-icon.png", %{
      conn: conn
    } do
      conn = %{conn | request_path: "/path/apple-touch-icon.png"}
      conn = call(conn, [])
      refute conn.state == :unsent
      refute conn.halted
    end

    test "ignores other URLs", %{conn: conn} do
      conn = call(conn, [])
      refute conn.state == :unsent
      refute conn.halted
    end
  end
end
