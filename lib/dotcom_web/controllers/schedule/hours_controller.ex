defmodule DotcomWeb.ScheduleController.HoursController do
  @moduledoc "Returns the hours of operation for a given route"

  use DotcomWeb, :controller

  # uses a date URL parameter to set conn.assigns.date
  plug(DotcomWeb.Plugs.Date)

  def hours_of_operation(conn, %{"route" => "Green"}) do
    # Return an empty object.  Only supports specific routes
    json(conn, %{})
  end

  def hours_of_operation(conn, %{"route" => route_id}) do
    route = Routes.Repo.get(route_id)

    hours_of_operation =
      Schedules.HoursOfOperation.hours_of_operation(
        route_id,
        conn.assigns.date,
        route.description
      )

    json(conn, hours_of_operation)
  end

  def hours_of_operation_by_stop(conn, %{"route" => "Green"}) do
    # Return an empty object.  Only supports specific routes
    json(conn, %{})
  end

  def hours_of_operation_by_stop(conn, %{"route" => route_id}) do
    route = Routes.Repo.get(route_id)

    hours_of_operation =
      Schedules.HoursOfOperation.hours_of_operation_by_stop(
        route_id,
        conn.assigns.date,
        route.description
      )

    json(conn, hours_of_operation)
  end
end
