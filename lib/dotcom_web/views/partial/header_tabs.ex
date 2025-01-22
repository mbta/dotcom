defmodule DotcomWeb.PartialView.HeaderTabs do
  @moduledoc false
  use DotcomWeb, :view

  alias DotcomWeb.PartialView.HeaderTab
  alias DotcomWeb.PartialView.HeaderTabBadge
  alias Phoenix.HTML
  alias PhoenixHTMLHelpers.Link

  @spec render_tabs([HeaderTab.t()], Keyword.t()) :: HTML.safe()
  def render_tabs(tabs, opts \\ []) do
    selected = Keyword.get(opts, :selected, "")
    tab_class = Keyword.get(opts, :tab_class, "")

    content_tag :div, class: "header-tabs" do
      Enum.map(tabs, &render_tab(&1, tab_class, &1.id == selected))
    end
  end

  @spec render_tab(HeaderTab.t(), String.t(), boolean) :: HTML.safe()
  defp render_tab(%{name: name, href: href, badge: badge}, class, selected?) do
    id = slug(name)

    Link.link to: href,
              id: id,
              class: "header-tab #{selected_class(selected?)} #{class} #{id}" do
      [name, render_badge(badge)]
    end
  end

  @spec selected_class(boolean) :: String.t()
  defp selected_class(true), do: "header-tab--selected"
  defp selected_class(false), do: ""

  @spec render_badge(HeaderTabBadge.t() | nil) :: HTML.safe()
  defp render_badge(nil), do: ""

  defp render_badge(%{content: content, class: class, aria_label: aria_label}),
    do: content_tag(:span, content, class: class, aria_label: aria_label)
end
