defmodule V3Api.ServicesTest do
  use ExUnit.Case

  describe "all" do
    test "hits /services" do
      bypass = Bypass.open()

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/services/"
        conn = Plug.Conn.fetch_query_params(conn)
        Plug.Conn.resp(conn, 200, ~s({"data": []}))
      end)

      assert %JsonApi{} = V3Api.Services.all([])
    end
  end
end
