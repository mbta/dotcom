defmodule DotcomWeb.CMS.PageView do
  @moduledoc """
  Handles rendering of partial content from the CMS.
  """

  use DotcomWeb, :view

  require Dotcom.Locales

  import Dotcom.Translator.Behaviour, only: [translate_html: 2]
  import DotcomWeb.CMS.ParagraphView, only: [render_paragraph: 2]

  alias CMS.Page
  alias CMS.Partial.Paragraph
  alias Plug.Conn

  @doc "Universal wrapper for CMS page content"
  @spec render_page(Page.t(), Conn.t()) :: Phoenix.HTML.safe()
  def render_page(%CMS.Page.Diversions{} = page, conn) do
    sidebar_left = Map.has_key?(page, :sidebar_menu) && !is_nil(page.sidebar_menu)
    sidebar_right = has_right_rail?(page)
    sidebar_layout = sidebar_classes(sidebar_left, sidebar_right)

    content =
      render(
        "_diversions.html",
        page: page,
        sidebar_left: sidebar_left,
        sidebar_right: sidebar_right,
        sidebar_class: sidebar_layout,
        conn: conn
      )
      |> Phoenix.HTML.Safe.to_iodata()
      |> IO.iodata_to_binary()
      |> translate_html(get_locale(conn))

    {:safe, content}
  end

  def render_page(page, conn) do
    sidebar_left = Map.has_key?(page, :sidebar_menu) && !is_nil(page.sidebar_menu)
    sidebar_right = has_right_rail?(page)
    sidebar_layout = sidebar_classes(sidebar_left, sidebar_right)

    content =
      render(
        "_page.html",
        page: page,
        sidebar_left: sidebar_left,
        sidebar_right: sidebar_right,
        sidebar_class: sidebar_layout,
        conn: conn
      )
      |> Phoenix.HTML.Safe.to_iodata()
      |> IO.iodata_to_binary()
      |> translate_html(get_locale(conn))

    {:safe, content}
  end

  @doc """
  Intelligently choose and render page template content based on type, except
  for certain types which either have no template or require special values.
  """
  @spec render_page_content(Page.t(), Conn.t()) :: Phoenix.HTML.safe()
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
  @spec sidebar_classes(boolean, boolean) :: String.t()
  def sidebar_classes(true, _), do: "c-cms--with-sidebar c-cms--sidebar-left"
  def sidebar_classes(false, true), do: "c-cms--with-sidebar c-cms--sidebar-right"
  def sidebar_classes(false, false), do: "c-cms--no-sidebar"

  @spec has_right_rail?(Page.t()) :: boolean
  def has_right_rail?(%{paragraphs: paragraphs}) do
    Enum.any?(paragraphs, &right_rail_check(&1))
  end

  defp get_locale(conn) do
    conn
    |> Plug.Conn.get_session()
    |> Map.get("locale", Dotcom.Locales.default_locale_code())
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

  @spec get_project_url_paths(String.t()) :: [String.t()]
  def get_project_url_paths(s) do
    if String.contains?(s, "/projects") and String.contains?(s, "/update") do
      [s, Regex.replace(~r/\/update.*/, s, "")]
    else
      [s]
    end
  end

  @spec get_mbta_url_path(String.t() | nil) :: String.t() | nil
  defp get_mbta_url_path(nil), do: nil

  defp get_mbta_url_path(path) do
    uri = URI.parse(path)

    if uri.host != nil and String.contains?(uri.host, "mbta.com") do
      uri.path
    else
      nil
    end
  end

  @spec trim_and_downcase(String.t() | nil) :: String.t()
  defp trim_and_downcase(nil), do: nil
  defp trim_and_downcase(s), do: String.downcase(String.trim(s))

  @spec alert_related?(MapSet.t(), Alerts.Alert.t()) :: boolean()
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

  @spec alerts_for_project(Page.Project.t(), [Alerts.Alert]) :: [Alerts.Alert]
  defp alerts_for_project(project, alerts) do
    paths =
      [project.path_alias | project.redirects]
      |> Enum.map(&trim_and_downcase/1)
      |> MapSet.new()

    Enum.filter(alerts, &alert_related?(paths, &1))
  end

  @spec inject_alerts_section(Phoenix.HTML.Safe.t(), Phoenix.HTML.Safe.t()) ::
          Phoenix.HTML.Safe.t()
  defp inject_alerts_section({:safe, rewritten}, {:safe, alerts_section}) do
    {:ok, parsed_rewritten} = Floki.parse_fragment(rewritten)

    case parsed_rewritten do
      [{"figure", _, _} = figure | rest] ->
        {:safe, [Floki.raw_html([figure]) | alerts_section] ++ [Floki.raw_html(rest)]}

      _ ->
        {:safe, alerts_section ++ [rewritten]}
    end
  end

  @spec body_with_alerts_section(Plug.Conn.t(), Page.Project.t()) :: Phoenix.HTML.Safe.t()
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
