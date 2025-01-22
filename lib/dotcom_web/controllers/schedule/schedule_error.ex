defmodule DotcomWeb.ScheduleController.ScheduleError do
  @moduledoc false
  use Plug.Builder

  alias Schedules.Repo

  def call(%{assigns: %{date_in_rating?: true}} = conn, _) do
    conn
  end

  def call(%{assigns: %{date_in_rating?: false}} = conn, _) do
    # During rating changes, this call will not return an error.
    # When that happens, we can assume that this date is actually
    # a valid date.
    by_route_ids_fn =
      Map.get(
        conn.assigns,
        :schedules_by_route_ids_fn,
        &Repo.by_route_ids/2
      )

    [conn.assigns.route.id]
    |> by_route_ids_fn.(
      direction_id: conn.assigns.direction_id,
      date: conn.assigns.date
    )
    |> case do
      {:error, [api_error]} -> assign(conn, :schedule_error, api_error)
      _ -> assign(conn, :date_in_rating?, true)
    end
  end
end
