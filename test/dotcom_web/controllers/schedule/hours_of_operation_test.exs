defmodule DotcomWeb.ScheduleController.HoursOfOperationTest do
  use DotcomWeb.ConnCase, async: true
  @moduletag :external

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  test "if route is nil, assigns nothing", %{conn: conn} do
    conn =
      conn
      |> assign(:route, nil)
      |> assign(:date, Dotcom.Utils.DateTime.service_date())
      |> DotcomWeb.ScheduleController.HoursOfOperation.call([])

    refute Map.has_key?(conn.assigns, :hours_of_operation)
  end

  test "assigns week, saturday, and sunday departures in both directions", %{conn: conn} do
    conn =
      conn
      |> assign(:route, %Routes.Route{id: "Red"})
      |> assign(:date, Dotcom.Utils.DateTime.service_date())
      |> DotcomWeb.ScheduleController.HoursOfOperation.call([])

    assert %Schedules.HoursOfOperation{} = conn.assigns.hours_of_operation
  end

  test "uses schedules for each Green line branch", %{conn: conn} do
    conn =
      conn
      |> assign(:route, @routes_repo.green_line())
      |> assign(:date, Dotcom.Utils.DateTime.service_date())
      |> DotcomWeb.ScheduleController.HoursOfOperation.call([])

    assert [%Schedules.HoursOfOperation{} | _] = conn.assigns.hours_of_operation
  end

  test "assigns nothing if there is no service", %{conn: conn} do
    conn =
      conn
      |> assign(:route, %Routes.Route{id: "Teal"})
      |> assign(:date, Dotcom.Utils.DateTime.service_date())
      |> DotcomWeb.ScheduleController.HoursOfOperation.call([])

    refute Map.has_key?(conn.assigns, :hours_of_operation)
  end
end
