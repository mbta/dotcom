defmodule SiteWeb.ScheduleController.ScheduleApiTest do
  use SiteWeb.ConnCase

  @moduletag :external

  describe "ScheduleApi" do
    test "schedules are returned for a date", %{conn: conn} do
      date = Util.now() |> Date.to_iso8601()
      path = schedule_api_path(conn, :show, %{id: 111, direction_id: 0, date: date})

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert response["trip_order"]
      assert response["by_trip"]
    end
  end
end
