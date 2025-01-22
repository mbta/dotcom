defmodule DotcomWeb.ScheduleController.AlertsControllerTest do
  use DotcomWeb.ConnCase

  import DotcomWeb.ScheduleController.AlertsController

  alias Routes.Route

  describe "show" do
    @tag :external
    test "adds meta description for a line", %{conn: conn} do
      conn = get(conn, alerts_path(conn, :show, "Red"))

      assert conn.assigns.meta_description == "Alerts for MBTA Red Line Subway"
    end
  end

  describe "route_description" do
    test "subway" do
      assert route_description(%Route{type: 1, id: "3", name: "Red Line"}) ==
               "Alerts for MBTA Red Line Subway"
    end

    test "bus" do
      assert route_description(%Route{type: 2, id: "2", name: "Other"}) == "Alerts for MBTA Other"
    end

    test "other" do
      assert route_description(%Route{type: 3, id: "1", name: "test"}) ==
               "Alerts for MBTA bus route 1"
    end

    test "silver line" do
      assert route_description(%Route{type: 3, id: "741", name: "test"}) ==
               "Alerts for MBTA Silver Line route 741"
    end
  end
end
