defmodule SiteWeb.ScheduleController.HoursController do
  @moduledoc "Handles the page that shows the map and line diagram for a given route."

  use SiteWeb, :controller

  def hours_of_operation(conn, %{"route" => "Green"}) do
    # TODO should this return an error?
    json(conn, %{})
  end

  def hours_of_operation(conn, %{"route" => route_id}) do
    route = Routes.Repo.get(route_id)

    hours_of_operation =
      Schedules.Repo.hours_of_operation(route_id, conn.assigns.date, route.description)

    IO.inspect(hours_of_operation)
    json(conn, hours_of_operation)
  end
end
