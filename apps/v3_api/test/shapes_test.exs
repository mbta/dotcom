defmodule V3Api.ShapesTest do
  use ExUnit.Case

  alias V3Api.Shapes

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

  describe "by_id/1" do
    test "gets the shape by ID" do
      %JsonApi{data: [%JsonApi.Item{} = shape]} = Shapes.by_id("852_0012")
      assert shape.id == "852_0012"
    end
  end
end
