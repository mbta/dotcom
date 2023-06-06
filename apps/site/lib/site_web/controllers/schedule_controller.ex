defmodule SiteWeb.ScheduleController do
  use SiteWeb, :controller
  alias Routes.Route

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
  def schedules_for_stop(conn, %{"stop_id" => stop_id}) do
    schedules =
      Schedules.Repo.schedules_for_stop(stop_id, [])
      # Only list schedules with departure_time in the future
      |> Enum.filter(fn %Schedules.Schedule{departure_time: dt} ->
        dt && Util.time_is_greater_or_equal?(dt, Util.now())
      end)
      # Don't list schedules departing from the last stop
      |> Enum.reject(fn %Schedules.Schedule{last_stop?: is_last_stop} -> is_last_stop end)

    json(conn, schedules)
  end
end
