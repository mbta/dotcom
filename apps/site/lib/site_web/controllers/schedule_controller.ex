defmodule SiteWeb.ScheduleController do
  use SiteWeb, :controller
  alias Routes.Route
  alias Schedules.Schedule

  require Logger

  plug(SiteWeb.Plugs.Route when action not in [:schedules_for_stop])

  @spec show(Plug.Conn.t(), map) :: Phoenix.HTML.Safe.t()
  def show(%{query_params: %{"tab" => "timetable"} = query_params} = conn, _params) do
    tab_redirect(
      conn,
      timetable_path(conn, :show, conn.assigns.route.id, Map.delete(query_params, "tab"))
    )
  end

  def show(%{query_params: %{"tab" => "line"} = query_params} = conn, _params) do
    tab_redirect(
      conn,
      line_path(conn, :show, conn.assigns.route.id, Map.delete(query_params, "tab"))
    )
  end

  def show(%{query_params: %{"tab" => "alerts"} = query_params} = conn, _params) do
    tab_redirect(
      conn,
      alerts_path(conn, :show, conn.assigns.route.id, Map.delete(query_params, "tab"))
    )
  end

  def show(
        %{assigns: %{route: %Route{type: mode, id: route_id}}, query_params: query_params} = conn,
        _params
      )
      when mode in [2, 4] do
    tab_redirect(conn, timetable_path(conn, :show, route_id, query_params))
  end

  def show(%{assigns: %{route: %Route{id: route_id}}, query_params: query_params} = conn, _params) do
    tab_redirect(conn, line_path(conn, :show, route_id, query_params))
  end

  defp tab_redirect(conn, path) do
    conn
    |> redirect(to: path)
    |> halt()
  end

  @spec schedules_for_stop(Plug.Conn.t(), map) :: Plug.Conn.t()
  def schedules_for_stop(conn, %{"stop_id" => stop_id} = params) do
    case Schedules.Repo.schedules_for_stop(stop_id, []) do
      {:error, error} ->
        _ =
          Logger.error(
            "module=#{__MODULE__} fun=schedules_for_stop stop=#{stop_id} date_time=#{DateTime.to_string(date_time(conn.assigns))} error=#{inspect(error)}"
          )

        SiteWeb.ControllerHelpers.return_internal_error(conn)

      data ->
        schedules =
          data
          |> future_departures(conn, params)
          |> omit_last_stop_departures(params)

        json(conn, schedules)
    end
  end

  defp date_time(%{"date_time" => date_time}), do: date_time
  defp date_time(_), do: Util.now()

  defp future_departures(schedules, conn, %{"future_departures" => "true"}) do
    now = date_time(conn.assigns)

    # Only list schedules with departure_time in the future
    schedules
    |> Enum.filter(fn %Schedule{departure_time: dt} ->
      dt && Util.time_is_greater_or_equal?(dt, now)
    end)
  end

  defp future_departures(schedules, _, _), do: schedules

  defp omit_last_stop_departures(schedules, %{"last_stop_departures" => "false"}) do
    # Don't list schedules departing from the last stop
    schedules
    |> Enum.reject(fn %Schedule{departure_time: dt, last_stop?: is_last_stop} ->
      dt && is_last_stop
    end)
  end

  defp omit_last_stop_departures(schedules, _), do: schedules
end
