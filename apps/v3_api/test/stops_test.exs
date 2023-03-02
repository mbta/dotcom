defmodule V3Api.StopsTest do
  use ExUnit.Case

  describe "all" do
    test "hits /stops" do
      bypass = Bypass.open()

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/stops/"
        conn = Plug.Conn.fetch_query_params(conn)
        Plug.Conn.resp(conn, 200, ~s({"data": []}))
      end)

      assert %JsonApi{} = V3Api.Stops.all([])
    end
  end

  describe "by_gtfs_id/1" do
    test "gets the parent station info" do
      bypass = Bypass.open()

      url = "http://localhost:#{bypass.port}"

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/stops/123"
        conn = Plug.Conn.fetch_query_params(conn)
        assert conn.params["include"] == "parent_station,facilities"
        Plug.Conn.resp(conn, 200, ~s({"data": []}))
      end)

      assert %JsonApi{} =
               V3Api.Stops.by_gtfs_id("123", [include: "parent_station,facilities"], base_url: url)
    end
  end
end
