defmodule SiteWeb.RealtimeScheduleApiTest do
  use SiteWeb.ConnCase

  # setup_all do
  #   _ = start_supervised({RepoCache.Supervisor, name: :rt})
  #   _ = start_supervised(Vehicles.Supervisor)
  #   _ = start_supervised(Predictions.Supervisor)
  #   _ = start_supervised(Routes.Supervisor)
  #   _ = start_supervised(Schedules.Supervisor)
  #   _ = start_supervised(Stops.Supervisor)
  #   _ = start_supervised(Alerts.Supervisor)
  #   _ = start_supervised({Site.RealtimeSchedule, name: :test_realtime_schedule})
  #   :ok
  # end

  describe "Stops" do
    test "success response", %{conn: conn} do
      conn = get(conn, realtime_schedule_api_path(conn, :stops, %{"stops" => "place-ogmnl"}))
      json_response(conn, 200)
    end
  end
end
