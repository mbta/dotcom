defmodule DotcomWeb.Plugs.CSPHeadersTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.CSPHeaders

  describe "call/2" do
    test "populates content-security-policy header", %{
      conn: conn
    } do
      assert [] = get_resp_header(conn, "content-security-policy-report-only")
      conn = call(conn, [])
      assert [_ | _] = get_resp_header(conn, "content-security-policy-report-only")
    end
  end
end
