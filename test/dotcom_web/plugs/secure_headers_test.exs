defmodule DotcomWeb.Plugs.SecureHeadersTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.SecureHeaders, only: [call: 2]
  import Plug.Conn, only: [get_resp_header: 2]

  describe "call/2" do
    test "puts the secure headers", %{conn: conn} do
      refute has_security_headers?(conn)
      conn = call(conn, [])
      assert has_security_headers?(conn)
    end
  end

  defp has_security_headers?(conn) do
    [
      "strict-transport-security",
      "x-content-type-options",
      "x-frame-options",
      "x-xss-protection"
    ]
    |> Enum.all?(&(get_resp_header(conn, &1) |> has_value()))
  end

  defp has_value([_ | _]), do: true
  defp has_value(_), do: false
end
