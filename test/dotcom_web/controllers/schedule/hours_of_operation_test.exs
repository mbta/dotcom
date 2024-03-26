defmodule DotcomWeb.ScheduleController.HoursOfOperationTest do
  use DotcomWeb.ConnCase, async: true
  @moduletag :external

  @routes_repo_api Application.compile_env!(:dotcom, :routes_repo_api)

  test "if route is nil, assigns nothing", %{conn: conn} do
    conn =
      conn
      |> assign(:route, nil)
      |> assign(:date, Util.service_date())
      |> DotcomWeb.ScheduleController.HoursOfOperation.call([])

    refute Map.has_key?(conn.assigns, :hours_of_operation)
  end

  test "assigns week, saturday, and sunday departures in both directions", %{conn: conn} do
    conn =
      conn
      |> assign(:route, %Routes.Route{id: "Red"})
      |> assign(:date, Util.service_date())
      |> DotcomWeb.ScheduleController.HoursOfOperation.call([])

    assert %Schedules.HoursOfOperation{} = conn.assigns.hours_of_operation
  end

  test "uses schedules for each Green line branch", %{conn: conn} do
    conn =
      conn
      |> assign(:route, @routes_repo_api.green_line())
      |> assign(:date, Util.service_date())
      |> DotcomWeb.ScheduleController.HoursOfOperation.call([])

    assert [%Schedules.HoursOfOperation{} | _] = conn.assigns.hours_of_operation
  end

  test "assigns nothing if there is no service", %{conn: conn} do
    conn =
      conn
      |> assign(:route, %Routes.Route{id: "Teal"})
      |> assign(:date, Util.service_date())
      |> DotcomWeb.ScheduleController.HoursOfOperation.call([])

    refute Map.has_key?(conn.assigns, :hours_of_operation)
  end
end
