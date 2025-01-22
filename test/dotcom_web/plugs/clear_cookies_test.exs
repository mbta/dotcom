defmodule DotcomWeb.Plugs.ClearCookiesTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.ClearCookies

  describe "call/2" do
    test "clears asp session cookies", %{conn: conn} do
      conn = %{conn | cookies: %{"ASPSESSION-TEST" => "session", "cookie" => "test"}}

      conn = call(conn, [])

      assert conn.cookies == %{"ASPSESSION-TEST" => "", "cookie" => "test"}
      assert conn.resp_cookies == %{"ASPSESSION-TEST" => %{max_age: 0, value: ""}}
    end
  end
end
