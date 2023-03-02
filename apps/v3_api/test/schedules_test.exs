defmodule V3Api.SchedulesTest do
  use ExUnit.Case

  describe "all" do
    test "hits /schedules" do
      bypass = Bypass.open()

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/schedules/"
        conn = Plug.Conn.fetch_query_params(conn)
        Plug.Conn.resp(conn, 200, ~s({"data": []}))
      end)

      assert %JsonApi{} = V3Api.Schedules.all([])
    end
  end
end
