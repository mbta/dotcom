defmodule DotcomWeb.ScheduleController.ScheduleApiTest do
  use DotcomWeb.ConnCase

  @moduletag :external

  describe "ScheduleApi" do
    test "schedules are returned for a date for bus", %{conn: conn} do
      date = Dotcom.Utils.DateTime.now() |> Date.to_iso8601()

      path =
        schedule_api_path(conn, :show, %{id: 111, direction_id: 0, date: date, stop_id: "5615"})

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert response["trip_order"]
      assert response["by_trip"]
    end

    test "schedules are returned for a date for subway", %{conn: conn} do
      date = Dotcom.Utils.DateTime.now() |> Date.to_iso8601()

      path =
        schedule_api_path(conn, :show, %{
          id: "Red",
          direction_id: 0,
          date: date,
          stop_id: "place-cntsq"
        })

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert response["trip_order"]
      assert response["by_trip"]
    end

    test "schedules are returned for a date for CR", %{conn: conn} do
      date = Dotcom.Utils.DateTime.now() |> Date.to_iso8601()

      path =
        schedule_api_path(conn, :show, %{
          id: "CR-Kingston",
          direction_id: 0,
          date: date,
          stop_id: "place-PB-0194"
        })

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert response["trip_order"]
      assert response["by_trip"]
    end

    test "schedules are returned for a date for ferry", %{conn: conn} do
      date = Dotcom.Utils.DateTime.now() |> Date.to_iso8601()

      path =
        schedule_api_path(conn, :show, %{
          id: "Boat-F1",
          direction_id: 0,
          date: date,
          stop_id: "Boat-Logan"
        })

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert response["trip_order"]
      assert response["by_trip"]
    end
  end
end
