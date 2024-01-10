defmodule DotcomWeb.MapConfigControllerTest do
  use DotcomWeb.ConnCase, async: false

  describe "GET - map config" do
    test "returns the json with the map config", %{conn: conn} do
      conn = get(conn, "/api/map-config")
      data = json_response(conn, 200)
      assert %{"tile_server_url" => Application.fetch_env!(:dotcom, :tile_server_url)} == data
    end
  end
end
