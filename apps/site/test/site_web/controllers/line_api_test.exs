defmodule SiteWeb.LineApiTest do
  use SiteWeb.ConnCase

  describe "show" do
    test "success response", %{conn: conn} do
      conn = get(conn, line_api_path(conn, :show, %{"id" => "Red", "direction_id" => "1"}))

      assert json_response(conn, 200)
    end
  end

  describe "realtime" do
    test "success response", %{conn: conn} do
      conn = get(conn, line_api_path(conn, :realtime, %{"id" => "Red", "direction_id" => "1"}))

      assert %{"place-brdwy" => %{"headsigns" => _, "vehicles" => _}} = json_response(conn, 200)
    end
  end
end
