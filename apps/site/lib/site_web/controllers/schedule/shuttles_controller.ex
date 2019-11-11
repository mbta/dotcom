defmodule SiteWeb.ScheduleController.ShuttlesController do
  @moduledoc false

  use SiteWeb, :controller

  alias SiteWeb.ScheduleView

  plug(SiteWeb.Plugs.Route)
  plug(SiteWeb.ScheduleController.Defaults)
  plug(:alerts)
  plug(SiteWeb.Plugs.AlertsByTimeframe)
  plug(SiteWeb.ScheduleController.RouteBreadcrumbs)
  plug(:tab_name)

  def show(conn, _) do
    conn
    |> put_view(ScheduleView)
    |> render("show.html", [])
  end

  defp alerts(conn, _), do: assign_alerts(conn, filter_by_direction?: false)
  defp tab_name(conn, _), do: assign(conn, :tab, "shuttles")
end
