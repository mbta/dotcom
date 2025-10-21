defmodule DotcomWeb.AlertView do
  @moduledoc "Helper functions related to displaying Alerts on the web site."

  use DotcomWeb, :view

  import DotcomWeb.ViewHelpers
  import DotcomWeb.Components.PlannedDisruptions, only: [disruptions: 1]
  import DotcomWeb.Components.RouteSymbols

  import DotcomWeb.Components.SystemStatus.SubwayStatus, only: [alerts_subway_status: 1]

  import DotcomWeb.Components.SystemStatus.CommuterRailStatus,
    only: [alerts_commuter_rail_status: 1]

  import PhoenixHTMLHelpers.Tag, only: [content_tag: 3]

  alias Alerts.{Alert, InformedEntity, InformedEntitySet, URLParsingHelpers}
  alias Routes.Route
  alias Stops.Stop

  @type priority_filter :: :any | Alerts.Priority.priority_level()

  @doc """

  Used to render a group of alerts.

  """
  def group(opts) do
    stop? = Keyword.has_key?(opts, :stop)
    route = Keyword.get(opts, :stop) || Keyword.fetch!(opts, :route)
    show_empty? = Keyword.get(opts, :show_empty?, false)
    priority_filter = Keyword.get(opts, :priority_filter, :any)
    timeframe = Keyword.get(opts, :timeframe, nil)
    date_time = Keyword.get(opts, :date_time)

    alerts =
      opts
      |> Keyword.fetch!(:alerts)
      |> Enum.filter(&filter_by_priority(priority_filter, &1))
      |> then(&(Keyword.get(opts, :always_show, []) ++ &1))
      |> deduplicate()

    case {alerts, show_empty?} do
      {[], true} ->
        content_tag(
          :div,
          no_alerts_message(route, stop?, timeframe),
          class: "callout"
        )

      {[], false} ->
        ""

      _ ->
        render(__MODULE__, "group.html", alerts: alerts, route: route, date_time: date_time)
    end
  end

  defp deduplicate(alerts) do
    Enum.uniq_by(alerts, & &1.id)
  end

  @spec no_alerts_message(map, boolean, atom) :: iolist
  def no_alerts_message(route, false, :current) do
    [
      ~t"Service is running as expected",
      location_name(route, false),
      ". ",
      empty_message_for_timeframe(:current, "")
    ]
  end

  def no_alerts_message(route, false, :upcoming) do
    empty_message_for_timeframe(:upcoming, [" for the ", route.name])
  end

  def no_alerts_message(route, stop?, timeframe) do
    empty_message_for_timeframe(timeframe, location_name(route, stop?))
  end

  @spec location_name(map, boolean) :: iolist
  def location_name(route, true) do
    [~t" at ", route.name]
  end

  def location_name(route, false) do
    [~t" on the ", route.name]
  end

  @spec format_alerts_timeframe(atom | nil) :: String.t() | nil
  def format_alerts_timeframe(:upcoming) do
    ~t"planned"
  end

  def format_alerts_timeframe(:all_timeframes) do
    ""
  end

  def format_alerts_timeframe(nil) do
    ""
  end

  def format_alerts_timeframe(timeframe) when is_atom(timeframe) do
    Atom.to_string(timeframe)
  end

  @spec empty_message_for_timeframe(atom | nil, String.t() | iolist | nil) :: iolist
  def empty_message_for_timeframe(:current, location),
    do: [~t"There are no ", format_alerts_timeframe(:current), ~t" alerts", location, ~t"."]

  def empty_message_for_timeframe(nil, location),
    do: [~t"There are no alerts", location, ~t" at this time."]

  def empty_message_for_timeframe(timeframe, location),
    do: [
      ~t"There are no ",
      format_alerts_timeframe(timeframe),
      ~t" alerts",
      location,
      ~t" at this time."
    ]

  @spec filter_by_priority(
          priority_filter,
          Alert.t()
        ) :: boolean
  defp filter_by_priority(:any, _alert), do: true

  defp filter_by_priority(priority_filter, %{priority: priority})
       when is_atom(priority_filter) and priority_filter == priority,
       do: true

  defp filter_by_priority(_filter, _alert), do: false

  def effect_name(%{lifecycle: lifecycle} = alert)
      when lifecycle in [:new, :unknown] do
    Alert.human_effect(alert)
  end

  def effect_name(alert) do
    Alert.human_effect(alert)
  end

  def alert_label_class(%Alert{} = alert) do
    ["u-small-caps", "c-alert-item__badge"]
    |> do_alert_label_class(alert)
    |> Enum.join(" ")
  end

  defp do_alert_label_class(class_list, %Alert{priority: priority})
       when priority == :system do
    ["c-alert-item__badge--system" | class_list]
  end

  defp do_alert_label_class(class_list, %Alert{lifecycle: lifecycle})
       when lifecycle in [:upcoming, :ongoing_upcoming] do
    ["c-alert-item__badge--upcoming" | class_list]
  end

  defp do_alert_label_class(class_list, _) do
    class_list
  end

  def alert_updated(%Alert{updated_at: updated_at}, relative_to) do
    alert_updated(updated_at, relative_to)
  end

  def alert_updated(updated_at, relative_to) do
    date =
      if Timex.equal?(relative_to, updated_at) do
        ~t"Today at"
      else
        Timex.format!(updated_at, "{M}/{D}/{YYYY}")
      end

    time = Timex.format!(updated_at, "{h12}:{m} {AM} {Zabbr}") |> String.trim()

    [~t"Updated: ", date, 32, time]
  end

  def format_alert_description(text) do
    import Phoenix.HTML

    text
    |> html_escape
    |> safe_to_string
    # an initial header
    |> String.replace(~r/^(.*:)(\r\n|\r|\n)/, "<strong>\\1</strong>\n")
    # all other start with a line break
    |> String.replace(~r/\n(.*:)(\r\n|\r|\n)/, "<br /><strong>\\1</strong>\n")
    |> String.replace(~r/\s*\n/s, "<br />")
    |> replace_urls_with_links
  end

  @spec replace_urls_with_links(String.t()) :: Phoenix.HTML.safe()
  def replace_urls_with_links(text) do
    URLParsingHelpers.replace_urls_with_links(text)
  end

  @spec group_header_path(Route.t() | Stop.t()) :: String.t()
  def group_header_path(%Route{id: route_id}) do
    schedule_path(DotcomWeb.Endpoint, :show, route_id)
  end

  def group_header_path(%Stop{id: stop_id}) do
    stop_path(DotcomWeb.Endpoint, :show, stop_id)
  end

  @spec group_header_name(Route.t() | Stop.t()) :: Phoenix.HTML.Safe.t()
  def group_header_name(%Route{long_name: long_name, name: name, type: 3}) do
    [
      content_tag(:span, name, class: "text-xl pr-sm"),
      content_tag(:span, long_name, class: "text-lg")
    ]
  end

  def group_header_name(%Route{name: name}) do
    [name]
  end

  def group_header_name(%Stops.Stop{name: name}) do
    [name]
  end

  @spec show_mode_icon?(Route.t() | Stop.t()) :: boolean
  defp show_mode_icon?(%Stop{}), do: false

  defp show_mode_icon?(%Route{}), do: true

  @spec show_systemwide_alert?(map) :: boolean
  def show_systemwide_alert?(%{
        alert_banner: alert_banner,
        route_type: route_type
      }) do
    # Ensure route types are in a List
    route_types = List.flatten([route_type])

    Enum.any?(route_types, fn route_type ->
      InformedEntitySet.match?(
        alert_banner.informed_entity_set,
        %InformedEntity{route_type: route_type}
      )
    end)
  end

  def show_systemwide_alert?(_) do
    false
  end

  @spec type_name(atom) :: String.t()
  def type_name(:commuter_rail), do: ~t"Rail"
  def type_name(mode), do: mode_name(mode)

  @spec type_icon(atom) :: Phoenix.HTML.Safe.t()
  def type_icon(:access), do: svg("icon-accessible-default.svg")
  def type_icon(mode), do: mode_icon(mode, :default)

  @spec alert_icon(Alert.icon_type()) :: Phoenix.HTML.Safe.t()
  def alert_icon(:shuttle), do: svg("icon-shuttle-default.svg")
  def alert_icon(:cancel), do: svg("icon-cancelled-default.svg")
  def alert_icon(:snow), do: svg("icon-snow-default.svg")
  def alert_icon(:alert), do: svg("icon-alerts-triangle.svg")
  def alert_icon(:none), do: ""
end
