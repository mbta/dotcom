defmodule MBTA.Api.StopsTest do
  use ExUnit.Case

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
               MBTA.Api.Stops.by_gtfs_id("123", [include: "parent_station,facilities"],
                 base_url: url
               )
    end
  end
end
