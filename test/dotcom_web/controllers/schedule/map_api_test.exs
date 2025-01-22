defmodule DotcomWeb.ScheduleController.MapApiTest do
  use DotcomWeb.ConnCase, async: true

  @moduletag :external

  describe "show/2" do
    test "returns map data formatted as json", %{conn: conn} do
      conn = get(conn, map_api_path(conn, :show, id: "66"))

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

    test "returns valid map data for the green line", %{conn: conn} do
      conn = get(conn, map_api_path(conn, :show, id: "Green"))

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

    test "returns 400 if given a bad route", %{conn: conn} do
      conn = get(conn, map_api_path(conn, :show, id: "Puce"))

      assert response = json_response(conn, 400)

      assert response == %{"error" => "Invalid arguments"}
    end
  end
end
