defmodule SiteWeb.ScheduleController.ShuttlesController do
  @moduledoc false

  use SiteWeb, :controller

  alias SiteWeb.ScheduleView

  import SiteWeb.ScheduleController.Line.Helpers,
    only: [get_shuttle_paragraphs: 1, get_shuttle_data: 1]

  plug(SiteWeb.Plugs.Route)
  plug(SiteWeb.ScheduleController.Defaults)
  plug(:alerts)
  plug(SiteWeb.Plugs.AlertsByTimeframe)
  plug(SiteWeb.ScheduleController.RouteBreadcrumbs)
  plug(:tab_name)

  @spec show(Plug.Conn.t(), any) :: Plug.Conn.t()
  def show(conn, _) do
    conn
    |> put_view(ScheduleView)
    |> assign(:paragraphs, get_shuttle_paragraphs(conn))
    |> assign(:shuttle_data, get_shuttle_data(conn))
    |> render("show.html", [])
  end

  defp alerts(conn, _), do: assign_alerts(conn, filter_by_direction?: false)
  defp tab_name(conn, _), do: assign(conn, :tab, "shuttles")
end
