defmodule DotcomWeb.CMS.PageView do
  @moduledoc """
  Handles rendering of partial content from the CMS.
  """
  use DotcomWeb, :view

  import DotcomWeb.CMS.ParagraphView, only: [render_paragraph: 2]

  alias CMS.Page
  alias CMS.Partial.Paragraph
  alias Plug.Conn

  @doc "Universal wrapper for CMS page content"
  def render_page(%CMS.Page.Diversions{} = page, conn) do
    sidebar_left = Map.has_key?(page, :sidebar_menu) && !is_nil(page.sidebar_menu)
    sidebar_right = has_right_rail?(page)
    sidebar_layout = sidebar_classes(sidebar_left, sidebar_right)

    render(
      "_diversions.html",
      page: page,
      sidebar_left: sidebar_left,
      sidebar_right: sidebar_right,
      sidebar_class: sidebar_layout,
      conn: conn
    )
  end

  def render_page(page, conn) do
    sidebar_left = Map.has_key?(page, :sidebar_menu) && !is_nil(page.sidebar_menu)
    sidebar_right = has_right_rail?(page)
    sidebar_layout = sidebar_classes(sidebar_left, sidebar_right)

    render(
      "_page.html",
      page: page,
      sidebar_left: sidebar_left,
      sidebar_right: sidebar_right,
      sidebar_class: sidebar_layout,
      conn: conn
    )
  end

  @doc """
  Intelligently choose and render page template content based on type, except
  for certain types which either have no template or require special values.
  """
  def render_page_content(%Page.Project{} = page, conn) do
    render(
      "_project.html",
      page: page,
      conn: conn
    )
  end

  def render_page_content(%Page.ProjectUpdate{} = page, conn) do
    render(
      "_project_update.html",
      page: page,
      conn: conn
    )
  end

  def render_page_content(page, conn) do
    render(
      "_generic.html",
      page: page,
      conn: conn
    )
  end

  @doc "Sets CMS content wrapper classes based on presence of sidebar elements {left, right}"
  def sidebar_classes(true, _), do: "c-cms--with-sidebar c-cms--sidebar-left"
  def sidebar_classes(false, true), do: "c-cms--with-sidebar c-cms--sidebar-right"
  def sidebar_classes(false, false), do: "c-cms--no-sidebar"

  def has_right_rail?(%{paragraphs: paragraphs}) do
    Enum.any?(paragraphs, &right_rail_check(&1))
  end

  defp teasers?(%{teasers: teasers}) do
    if Enum.empty?(teasers), do: false, else: true
  end

  defp teasers?(_), do: true

  # Checks if any paragraphs have been assigned to the right rail.
  # If the paragraph is a ContentList.t(), ensure it has teasers.
  defp right_rail_check(paragraph) do
    if Paragraph.right_rail?(paragraph) do
      teasers?(paragraph)
    else
      false
    end
  end

  def get_project_url_paths(s) do
    if String.contains?(s, "/projects") and String.contains?(s, "/update") do
      [s, Regex.replace(~r/\/update.*/, s, "")]
    else
      [s]
    end
  end

  defp get_mbta_url_path(nil), do: nil

  defp get_mbta_url_path(path) do
    uri = URI.parse(path)

    if uri.host != nil and String.contains?(uri.host, "mbta.com") do
      uri.path
    else
      nil
    end
  end

  defp trim_and_downcase(nil), do: nil
  defp trim_and_downcase(s), do: String.downcase(String.trim(s))

  defp alert_related?(project_paths, alert) do
    case get_mbta_url_path(alert.url) do
      nil ->
        false

      alert_path ->
        alert_path
        |> get_project_url_paths()
        |> Enum.map(&trim_and_downcase/1)
        |> Enum.any?(&MapSet.member?(project_paths, &1))
    end
  end

  defp alerts_for_project(project, alerts) do
    paths =
      [project.path_alias | project.redirects]
      |> Enum.map(&trim_and_downcase/1)
      |> MapSet.new()

    Enum.filter(alerts, &alert_related?(paths, &1))
  end

  defp inject_alerts_section({:safe, rewritten}, {:safe, alerts_section}) do
    {:ok, parsed_rewritten} = Floki.parse_fragment(rewritten)

    case parsed_rewritten do
      [{"figure", _, _} = figure | rest] ->
        {:safe, [Floki.raw_html([figure]) | alerts_section] ++ [Floki.raw_html(rest)]}

      _ ->
        {:safe, alerts_section ++ [rewritten]}
    end
  end

  def body_with_alerts_section(conn, page) do
    rewritten = Dotcom.ContentRewriter.rewrite(page.body, conn)

    alerts_section =
      render(
        "_alerts.html",
        alerts: conn.assigns.alerts,
        date_time: conn.assigns.date_time,
        page: page
      )
      |> Phoenix.HTML.Safe.to_iodata()

    inject_alerts_section(rewritten, {:safe, alerts_section})
  end
end
