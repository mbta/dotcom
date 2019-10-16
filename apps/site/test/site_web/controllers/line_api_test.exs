defmodule SiteWeb.LineApiTest do
  use SiteWeb.ConnCase

  describe "Line" do
    test "success response", %{conn: conn} do
      conn =
        get(
          conn,
          line_api_path(conn, :show, %{
            "id" => "Red",
            "direction_id" => "1"
          })
        )

      json_response(conn, 200)
    end
  end
end
