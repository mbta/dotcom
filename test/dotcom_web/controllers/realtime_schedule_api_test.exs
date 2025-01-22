defmodule DotcomWeb.RealtimeScheduleApiTest do
  use DotcomWeb.ConnCase

  @moduletag :external

  describe "Stops" do
    test "success response", %{conn: conn} do
      conn = get(conn, realtime_schedule_api_path(conn, :stops, %{"stops" => "place-ogmnl"}))
      json_response(conn, 200)
    end
  end
end
