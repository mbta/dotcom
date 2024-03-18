defmodule MBTA.Api.FacilitiesTest do
  use ExUnit.Case

  describe "all" do
    test "hits /facilities" do
      bypass = Bypass.open()

      url = "http://localhost:#{bypass.port}"

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/facilities/"
        conn = Plug.Conn.fetch_query_params(conn)
        Plug.Conn.resp(conn, 200, ~s({"data": []}))
      end)

      assert %JsonApi{} = MBTA.Api.Facilities.all([], base_url: url)
    end
  end

  describe "filter_by/2" do
    test "hits /facilities" do
      bypass = Bypass.open()

      url = "http://localhost:#{bypass.port}"

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/facilities/"
        conn = Plug.Conn.fetch_query_params(conn)

        assert conn.params["filter"] == %{"stop" => "place-alfcl", "type" => "ELEVATOR"}
        Plug.Conn.resp(conn, 200, ~s({"data": []}))
      end)

      assert %JsonApi{} =
               MBTA.Api.Facilities.filter_by(
                 [
                   {"stop", "place-alfcl"},
                   {"type", "ELEVATOR"}
                 ],
                 base_url: url
               )
    end
  end
end
