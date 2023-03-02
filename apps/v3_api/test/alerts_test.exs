defmodule V3Api.AlertsTest do
  use ExUnit.Case

  describe "all" do
    test "hits /alerts" do
      bypass = Bypass.open()

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/alerts/"
        conn = Plug.Conn.fetch_query_params(conn)
        Plug.Conn.resp(conn, 200, ~s({"data": []}))
      end)

      assert %JsonApi{} = V3Api.Alerts.all()
    end
  end
end
