defmodule DotcomWeb.HealthControllerTest do
  @moduledoc false
  use DotcomWeb.ConnCase
  import Mox

  @cache Application.compile_env!(:dotcom, :cache)

  setup :verify_on_exit!

  describe "index/2" do
    test "returns 200 with no content", %{conn: conn} do
      response = get(conn, health_path(conn, :index))
      assert response.status == 200
      assert response.resp_body == ""
    end
  end

  describe "open_trip_planner/2" do
    setup do
      @cache.flush()

      :ok
    end

    test "returns 200 when OpenTripPlanner is healthy", %{conn: conn} do
      expect(OpenTripPlannerClient.Mock, :healthy?, fn -> true end)

      response = get(conn, health_path(conn, :open_trip_planner))
      assert response.status == 200

      assert get_resp_header(response, "cache-control") == [
               "max-age=60, public"
             ]
    end

    test "uses cached data", %{conn: conn} do
      # only calls once
      expect(OpenTripPlannerClient.Mock, :healthy?, 1, fn -> true end)

      response = get(conn, health_path(conn, :open_trip_planner))
      assert response.status == 200

      response = get(conn, health_path(conn, :open_trip_planner))
      assert response.status == 200
    end

    test "returns 503 when OpenTripPlanner is unhealthy", %{conn: conn} do
      expect(OpenTripPlannerClient.Mock, :healthy?, fn -> false end)
      response = get(conn, health_path(conn, :open_trip_planner))
      assert response.status == 503
    end
  end
end
