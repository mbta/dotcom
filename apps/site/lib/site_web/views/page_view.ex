defmodule SiteWeb.PageView do
  @moduledoc false
  import Phoenix.HTML.Tag
  import SiteWeb.CMSHelpers
  import SiteWeb.CMS.ParagraphView, only: [render_paragraph: 2]

  alias CMS.Page.NewsEntry
  alias CMS.Partial.Banner
  alias SiteWeb.PartialView

  use SiteWeb, :view

  def shortcut_icons do
    icons =
      [:subway, :bus, :commuter_rail, :ferry, :the_ride]
      |> Enum.map(&shortcut_icon/1)

    content_tag(:div, icons, class: "m-homepage__shortcuts")
  end

  @spec shortcut_icon(atom) :: Phoenix.HTML.Safe.t()
  defp shortcut_icon(id) do
    content_tag(
      :a,
      [
        id |> shortcut_svg_name() |> svg(),
        content_tag(:div, shortcut_text(id), class: "m-homepage__shortcut-text")
      ],
      href: shortcut_link(id),
      class: "m-homepage__shortcut"
    )
  end

  @spec shortcut_link(atom) :: String.t()
  defp shortcut_link(:stations), do: stop_path(SiteWeb.Endpoint, :index)

  defp shortcut_link(:the_ride),
    do: cms_static_page_path(SiteWeb.Endpoint, "/accessibility/the-ride")

  defp shortcut_link(:commuter_rail), do: schedule_path(SiteWeb.Endpoint, :show, :"commuter-rail")

  defp shortcut_link(mode), do: schedule_path(SiteWeb.Endpoint, :show, mode)

  @spec shortcut_text(atom) :: [Phoenix.HTML.Safe.t()]
  defp shortcut_text(:stations) do
    [
      "Stations",
      content_tag(:span, [" &", tag(:br), "Stops"], class: "hidden-md-down")
    ]
  end

  defp shortcut_text(:the_ride) do
    [
      content_tag(:span, [
        content_tag(
          :span,
          [
            "The",
            tag(:br)
          ],
          class: "hidden-md-down"
        ),
        "RIDE"
      ])
    ]
  end

  defp shortcut_text(:commuter_rail) do
    [
      content_tag(:span, "Commuter ", class: "hidden-md-down"),
      tag(:br, class: "hidden-md-down"),
      "Rail",
      content_tag(:span, [raw("&nbsp;"), "Lines"], class: "hidden-md-down")
    ]
  end

  defp shortcut_text(:subway) do
    [
      "Subway",
      content_tag(:span, [tag(:br), "Lines"], class: "hidden-md-down")
    ]
  end

  defp shortcut_text(mode) do
    [
      mode_name(mode),
      content_tag(:span, [tag(:br), "Routes"], class: "hidden-md-down")
    ]
  end

  defp shortcut_svg_name(:stations), do: "icon-circle-t-default.svg"
  defp shortcut_svg_name(:the_ride), do: "icon-the-ride-default.svg"
  defp shortcut_svg_name(:commuter_rail), do: shortcut_svg_name(:"commuter-rail")
  defp shortcut_svg_name(mode), do: "icon-mode-#{mode}-default.svg"

  def schedule_separator do
    content_tag(:span, "|", aria_hidden: "true", class: "schedule-separator")
  end

  @spec render_news_entries(Plug.Conn.t()) :: Phoenix.HTML.Safe.t()
  def render_news_entries(conn) do
    content_tag(
      :div,
      conn.assigns
      |> Map.get(:news)
      |> Enum.split(2)
      |> Tuple.to_list()
      |> Enum.with_index()
      |> Enum.map(&do_render_news_entries/1),
      class: "row"
    )
  end

  @spec do_render_news_entries({[NewsEntry.t()], 0 | 1}) ::
          Phoenix.HTML.Safe.t()
  defp do_render_news_entries({entries, idx}) when idx in [0, 1] do
    size = if idx == 0, do: :large, else: :small

    content_tag(
      :div,
      Enum.map(
        entries,
        &PartialView.news_entry(&1, size: size, class: "m-homepage__news-item")
      ),
      class: "col-md-6"
    )
  end

  @spec banner_content_class(Banner.t()) :: String.t()
  defp banner_content_class(%Banner{} = banner) do
    Enum.join(
      [
        "c-banner__content",
        "c-banner__content--responsive",
        "c-banner__content--" <> CSSHelpers.atom_to_class(banner.banner_type),
        "c-banner__content--" <> CSSHelpers.atom_to_class(banner.text_position)
        | banner_bg_class(banner)
      ],
      " "
    )
  end

  @spec banner_bg_class(Banner.t()) :: [String.t()]
  defp banner_bg_class(%Banner{banner_type: :important}), do: []
  defp banner_bg_class(%Banner{routes: []}), do: ["u-bg--unknown"]
  defp banner_bg_class(%Banner{routes: [route | _]}), do: ["u-bg--" <> cms_route_to_class(route)]

  @spec banner_cta(Banner.t()) :: Phoenix.HTML.Safe.t()
  defp banner_cta(%Banner{banner_type: :important, link: %{title: title}}) do
    content_tag(:span, title, class: "c-banner__cta")
  end

  defp banner_cta(%Banner{}) do
    ""
  end
end
