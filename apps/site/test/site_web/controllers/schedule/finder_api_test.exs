defmodule SiteWeb.ScheduleController.FinderApiTest do
  use SiteWeb.ConnCase

  @moduletag :external

  describe "journeys/2" do
    test "journeys are returned for a date for bus", %{conn: conn} do
      date = Util.now() |> Date.to_iso8601()

      path =
        finder_api_path(conn, :journeys, %{
          id: "111",
          direction: "0",
          date: date,
          stop: "5615"
        })

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert response |> Enum.at(1) |> Map.has_key?("departure")
    end

    test "journeys are returned for a date for CR", %{conn: conn} do
      date = Util.now() |> Date.to_iso8601()

      path =
        finder_api_path(conn, :journeys, %{
          id: "CR-Kingston",
          direction: "0",
          date: date,
          stop: "place-PB-0194"
        })

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert response |> Enum.at(1) |> Map.has_key?("departure")
    end

    test "journeys are returned for a date for ferry", %{conn: conn} do
      date = Util.now() |> Date.to_iso8601()

      path =
        finder_api_path(conn, :journeys, %{
          id: "Boat-F1",
          direction: "0",
          date: date,
          stop: "Boat-Logan"
        })

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert response |> Enum.at(1) |> Map.has_key?("departure")
    end
  end
end
