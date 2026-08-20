defmodule DotcomWeb.PageView do
  @moduledoc false

  use DotcomWeb, :view

  import PhoenixHTMLHelpers.Tag
  import DotcomWeb.CMSHelpers
  import DotcomWeb.Components.SystemStatus.SubwayStatus, only: [homepage_subway_status: 1]

  use Nebulex.Caching.Decorators
  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(1)

  alias CMS.Page.NewsEntry
  alias CMS.Partial.Banner
  alias DotcomWeb.PartialView

  @spec alerts([Alerts.Alert.t()]) :: Phoenix.HTML.Safe.t()
  def alerts(alerts) do
    [routes, stops] =
      [
        &Dotcom.Alerts.routes_with_high_priority_alerts_by_mode/1,
        &Dotcom.Alerts.stops_with_access_alerts_by_effect/1
      ]
      |> Task.async_stream(& &1.(alerts), timeout: 10_000)
      |> Enum.map(fn {:ok, result} -> result end)

    render("_alerts.html",
      routes_with_high_priority_alerts_by_mode: routes,
      stops_with_accessibility_alerts_by_issue: stops
    )
  end

  @spec alerts_mode_url(Routes.Route.gtfs_route_type()) :: String.t()
  defp alerts_mode_url(mode) do
    path =
      case mode do
        :commuter_rail -> "commuter-rail"
        _ -> mode
      end

    DotcomWeb.Router.Helpers.alert_url(
      DotcomWeb.Endpoint,
      :show,
      path
    )
  end

  @spec alerts_access_url :: String.t()
  defp alerts_access_url do
    DotcomWeb.Router.Helpers.alert_url(
      DotcomWeb.Endpoint,
      :show,
      "access"
    )
  end

  @spec alerts_render_route_link_content(Routes.Route.gtfs_route_type(), Routes.Route.t()) ::
          Phoenix.HTML.Safe.t()
  defp alerts_render_route_link_content(mode, route) do
    case mode do
      :subway -> DotcomWeb.ViewHelpers.line_icon(route, :default)
      :bus -> DotcomWeb.ViewHelpers.bus_icon_pill(route)
      _ -> route.name
    end
  end

  @spec alerts_mode_icon_name(Routes.Route.gtfs_route_desc()) :: String.t()
  defp alerts_mode_icon_name(mode) do
    case mode do
      :subway -> "icon-subway-default.svg"
      :bus -> "icon-bus-default.svg"
      :ferry -> "icon-ferry-default.svg"
      :commuter_rail -> "icon-commuter-rail-default.svg"
    end
  end

  @spec alerts_route_url(Routes.Route.t()) :: String.t()
  defp alerts_route_url(route) do
    DotcomWeb.Router.Helpers.alerts_url(
      DotcomWeb.Endpoint,
      :show,
      route.id
    )
  end

  @spec alerts_stop_url(Stops.Stop.t()) :: String.t()
  defp alerts_stop_url(stop) do
    DotcomWeb.Router.Helpers.stop_url(
      DotcomWeb.Endpoint,
      :show,
      stop.id
    )
  end

  def shortcut_icons(locale) do
    Util.get_or_save_persistent_term({__MODULE__, :shortcut_icons, locale}, fn ->
      [:commuter_rail, :subway, :bus, :ferry, :the_ride]
      |> Enum.map(&shortcut_icon/1)
    end)
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
  defp shortcut_link(:stations), do: "/stops"
  defp shortcut_link(:the_ride), do: "/accessibility/the-ride"
  defp shortcut_link(:commuter_rail), do: "/schedules/commuter-rail"
  defp shortcut_link(mode), do: "/schedules/#{mode}"

  @spec shortcut_text(atom) :: [Phoenix.HTML.Safe.t()]
  defp shortcut_text(:stations) do
    [
      ~t"Stations",
      content_tag(:span, ~t" & Stops", class: "hidden-md-down")
    ]
  end

  defp shortcut_text(:the_ride) do
    content_tag(:span, ~t"The RIDE")
  end

  defp shortcut_text(:commuter_rail) do
    content_tag(:span, ~t"Commuter Rail")
  end

  defp shortcut_text(:subway) do
    [
      ~t"Subway",
      content_tag(:span, ~t" Lines", class: "hidden-md-down")
    ]
  end

  defp shortcut_text(mode) do
    [
      mode_name(mode),
      content_tag(:span, ~t" Routes", class: "hidden-md-down")
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
      |> Enum.split(3)
      |> Tuple.to_list()
      |> Enum.with_index()
      |> Enum.map(&do_render_news_entries/1),
      class: "row"
    )
  end

  @spec do_render_news_entries({[NewsEntry.t()], 0 | 1}) ::
          Phoenix.HTML.Safe.t()
  defp do_render_news_entries({entries, idx}) when idx in [0, 1] do
    content_tag(
      :div,
      Enum.map(
        entries,
        &PartialView.news_entry(&1, class: "m-homepage__news-item")
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

  @decorate cacheable(
              cache: @cache,
              on_error: :raise,
              opts: [ttl: @ttl],
              key: {"homepage|upcoming-events", conn.assigns.locale}
            )
  def render_upcoming_events(conn, event_teasers) do
    event_teasers
    |> Enum.map(fn event_teaser ->
      render_to_string(DotcomWeb.EventView, "_event_teaser.html",
        event_teaser: event_teaser,
        check_event_ended: true,
        conn: conn,
        month_number: event_teaser.date.month,
        year: event_teaser.date.year
      )
    end)
    |> Phoenix.HTML.raw()
  end
end
