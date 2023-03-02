defmodule V3Api.ShapesTest do
  use ExUnit.Case

  describe "all" do
    test "hits /shapes" do
      bypass = Bypass.open()

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/shapes/"
        conn = Plug.Conn.fetch_query_params(conn)
        Plug.Conn.resp(conn, 200, ~s({"data": []}))
      end)

      assert %JsonApi{} = V3Api.Shapes.all([])
    end
  end
end
