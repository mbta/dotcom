defmodule Site.Components.Icons.Realtime do
  import Phoenix.HTML.Tag, only: [content_tag: 2, content_tag: 3]
  import SiteWeb.ViewHelpers, only: [svg: 1]

  @spec realtime_icon :: Phoenix.HTML.Safe.t()
  def realtime_icon do
    content_tag :span, class: "icon-realtime animate backstop-hide-animation" do
      [
        svg("icon-live-clock.svg"),
        content_tag(:span, "live", class: "icon-realtime-text")
      ]
    end
  end

  @spec realtime_icon_key :: Phoenix.HTML.Safe.t()
  def realtime_icon_key do
    content_tag :span, "aria-hidden": "true" do
      [
        realtime_icon(),
        content_tag(:span, " indicates real-time information")
      ]
    end
  end
end
