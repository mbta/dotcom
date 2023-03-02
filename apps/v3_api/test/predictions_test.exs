defmodule V3Api.PredictionsTest do
  use ExUnit.Case

  describe "all" do
    test "hits /predictions" do
      bypass = Bypass.open()

      url = "http://localhost:#{bypass.port}"

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/predictions/"
        conn = Plug.Conn.fetch_query_params(conn)
        Plug.Conn.resp(conn, 200, ~s({"data": []}))
      end)

      assert %JsonApi{} = V3Api.Predictions.all(url)
    end
  end
end
