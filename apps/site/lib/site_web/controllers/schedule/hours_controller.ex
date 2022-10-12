defmodule SiteWeb.ScheduleController.HoursController do
  @moduledoc "Returns the hours of operation for a given route"

  use SiteWeb, :controller

  def hours_of_operation(conn, %{"route" => "Green"}) do
    # Return an empty object.  Only supports specific routes
    json(conn, %{})
  end

  def hours_of_operation(conn, %{"route" => route_id}) do
    route = Routes.Repo.get(route_id)

    hours_of_operation =
      Schedules.Repo.hours_of_operation(route_id, conn.assigns.date, route.description)

    json(conn, hours_of_operation)
  end
end
