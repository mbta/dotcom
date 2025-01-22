defmodule DotcomWeb.ScheduleController.GreenTerminiApiTest do
  use DotcomWeb.ConnCase, async: true

  @moduletag :external

  describe "show/2" do
    test "returns green line stop data formatted as json", %{conn: conn} do
      conn = get(conn, green_termini_api_path(conn, :show))

      assert response = json_response(conn, 200)

      assert %{
               "Green-E" => ["Heath Street", "Medford/Tufts"],
               "Green-D" => ["Riverside", "Union Square"],
               "Green-C" => ["Cleveland Circle", "Government Center"],
               "Green-B" => ["Boston College", "Government Center"]
             } = response
    end
  end
end
