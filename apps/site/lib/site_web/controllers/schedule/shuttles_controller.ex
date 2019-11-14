defmodule SiteWeb.ScheduleController.ShuttlesController do
  @moduledoc false

  use SiteWeb, :controller

  alias CMS.Partial.Paragraph.ContentList
  alias SiteWeb.ScheduleView

  import CMS.Repo, only: [get_paragraph: 1]
  import SiteWeb.CMS.ParagraphView, only: [render_paragraph: 2]

  @common_paragraphs [
    "paragraphs/content-list/shuttles-sidebar-project",
    "paragraphs/custom-html/shuttles-boilerplate"
  ]

  plug(SiteWeb.Plugs.Route)
  plug(SiteWeb.ScheduleController.Defaults)
  plug(:alerts)
  plug(SiteWeb.Plugs.AlertsByTimeframe)
  plug(SiteWeb.ScheduleController.RouteBreadcrumbs)
  plug(:tab_name)
  plug(:paragraphs)

  @spec show(Plug.Conn.t(), any) :: Plug.Conn.t()
  def show(conn, _) do
    conn
    |> put_view(ScheduleView)
    |> render("show.html", [])
  end

  defp alerts(conn, _), do: assign_alerts(conn, filter_by_direction?: false)
  defp tab_name(conn, _), do: assign(conn, :tab, "shuttles")
  defp paragraphs(conn, _), do: assign(conn, :paragraphs, get_and_render_paragraphs(conn))

  defp get_and_render_paragraphs(conn) do
    conn
    |> paragraphs_by_line()
    |> Enum.map(&get_paragraph/1)
    |> Enum.map(&post_process_paragraph/1)
    |> Enum.map(&render_paragraph(&1, conn))
  end

  defp paragraphs_by_line(conn) do
    line_paragraphs =
      case conn.assigns.route.id do
        "Red" -> ["paragraphs/custom-html/shuttles-sidebar-red-line"]
        "Orange" -> ["paragraphs/custom-html/shuttles-sidebar-orange-line"]
        "Green" -> ["paragraphs/custom-html/shuttles-sidebar-green-line"]
      end

    @common_paragraphs ++ line_paragraphs
  end

  defp post_process_paragraph(%ContentList{} = content_list) do
    ContentList.fetch_teasers(content_list)
  end

  defp post_process_paragraph(normal_paragraph) do
    normal_paragraph
  end
end
