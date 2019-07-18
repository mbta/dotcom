defmodule SiteWeb.ScheduleController.ScheduleApi do
  use SiteWeb, :controller

  def show(conn, %{"id" => route_id, "date" => date, "direction_id" => direction_id}) do
    {:ok, date} = Date.from_iso8601(date)
    schedule_data = get_schedules(route_id, date, direction_id)

    json(conn, schedule_data)
  end

  @spec get_schedules(binary, any, any) :: %{by_trip: map, trip_order: [any]}
  def get_schedules(route_id, date, direction_id) do
    schedules =
      Enum.map(
        Schedules.Repo.by_route_ids([route_id], date: date, direction_id: direction_id),
        &Map.update!(&1, :route, fn route -> Routes.Route.to_json_safe(route) end)
      )

    schedules_by_trip =
      schedules
      |> Enum.map(&Map.update!(&1, :time, fn time -> Timex.format!(time, "{0h12}:{m} {AM}") end))
      |> Enum.group_by(& &1.trip.id)

    ordered_trips = schedules |> Enum.sort_by(& &1.time) |> Enum.map(& &1.trip.id) |> Enum.uniq()
    %{by_trip: schedules_by_trip, trip_order: ordered_trips}
  end
end
