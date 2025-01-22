defmodule DotcomWeb.Plugs.CacheControlTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.CacheControl

  describe "call/2" do
    test "does nothing without max_age", %{conn: conn} do
      assert conn == call(conn, [])
    end

    test "does nothing with bad max_age", %{conn: conn} do
      assert conn == call(conn, max_age: :not_a_number)
    end

    test "adds cache-control header", %{conn: conn} do
      age = 1337
      conn_with_header = call(conn, max_age: age)
      refute conn_with_header == conn

      assert conn_with_header.resp_headers == [
               {"cache-control", "max-age=#{age}, private, must-revalidate"}
             ]
    end
  end
end
