defmodule DotcomWeb.PartialView.HeaderTabs do
  use DotcomWeb, :view
  alias Phoenix.HTML
  alias PhoenixHTMLHelpers.Link
  alias DotcomWeb.PartialView.{HeaderTab, HeaderTabBadge}

  def render_tabs(tabs, opts \\ []) do
    selected = Keyword.get(opts, :selected, "")
    tab_class = Keyword.get(opts, :tab_class, "")

    content_tag :div, class: "header-tabs" do
      Enum.map(tabs, &render_tab(&1, tab_class, &1.id == selected))
    end
  end

  defp render_tab(%{name: name, href: href, badge: badge}, class, selected?) do
    id = slug(name)

    Link.link to: href,
              id: id,
              class: "header-tab #{selected_class(selected?)} #{class} #{id}" do
      [name, render_badge(badge)]
    end
  end

  defp selected_class(true), do: "header-tab--selected"
  defp selected_class(false), do: ""

  defp render_badge(nil), do: ""

  defp render_badge(%{content: content, class: class, aria_label: aria_label}),
    do: content_tag(:span, content, class: class, aria_label: aria_label)
end
