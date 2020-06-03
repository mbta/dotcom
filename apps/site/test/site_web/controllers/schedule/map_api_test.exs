defmodule SiteWeb.ScheduleController.MapApiTest do
  use SiteWeb.ConnCase, async: true

  describe "show/2" do
    test "returns map data formatted as json", %{conn: conn} do
      conn = get(conn, map_api_path(conn, :show, id: "66", direction_id: "0"))

      assert response = json_response(conn, 200)

      assert %{
               "default_center" => %{"latitude" => _, "longitude" => _},
               "height" => _,
               "markers" => _,
               "polylines" => _,
               "stop_markers" => _,
               "tile_server_url" => _,
               "width" => _,
               "zoom" => _
             } = response
    end

    test "allows you to specify a variant", %{conn: conn} do
      conn = get(conn, map_api_path(conn, :show, id: "66", direction_id: "0", variant: "66-B-0"))

      assert response = json_response(conn, 200)

      assert %{
               "default_center" => %{"latitude" => _, "longitude" => _},
               "height" => _,
               "markers" => _,
               "polylines" => _,
               "stop_markers" => _,
               "tile_server_url" => _,
               "width" => _,
               "zoom" => _
             } = response
    end
  end
end
