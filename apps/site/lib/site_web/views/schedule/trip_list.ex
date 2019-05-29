defmodule SiteWeb.ScheduleView.TripList do
  alias Site.Components.Icons.SvgIcon
  import Phoenix.HTML, only: [raw: 1]
  import Phoenix.HTML.Tag, only: [content_tag: 2, content_tag: 3]
  import Phoenix.HTML.Link, only: [link: 2]
  alias SiteWeb.ViewHelpers

  alias Routes.Route

  @doc """
  Returns Trip Alerts by the trip id and time from the given predicted_schedule, route and direction_id
  If no schedule is available, the prediction is used to match against alerts
  Does not return alerts for Bus routes
  """
  @spec trip_alerts(PredictedSchedule.t() | nil, [Alerts.Alert.t()], Route.t(), String.t()) :: [
          Alerts.Alert.t()
        ]
  def trip_alerts(_predicted_schedule, _alerts, %Route{type: 3}, _direction_id), do: []

  def trip_alerts(predicted_schedule, alerts, route, direction_id) do
    PredictedSchedule.map_optional(predicted_schedule, [:schedule, :prediction], [], fn x ->
      Alerts.Trip.match(
        alerts,
        x.trip.id,
        time: x.time,
        route: route.id,
        direction_id: direction_id
      )
    end)
  end

  @doc """
  Matches the given alerts with the stop id and time from the given predicted_schedule, route and direction_id
  If no schedule is available, the prediction is used to match against alerts
  """
  @spec stop_alerts(PredictedSchedule.t() | nil, [Alerts.Alert.t()], String.t(), String.t()) :: [
          Alerts.Alert.t()
        ]
  def stop_alerts(predicted_schedule, alerts, route_id, direction_id) do
    PredictedSchedule.map_optional(predicted_schedule, [:schedule, :prediction], [], fn x ->
      Alerts.Stop.match(
        alerts,
        x.stop.id,
        time: x.time,
        route: route_id,
        direction_id: direction_id
      )
    end)
  end

  @doc "If alerts are given, display alert icon"
  @spec display_alerts([Alerts.Alert.t()]) :: Phoenix.HTML.Safe.t()
  def display_alerts([]), do: raw("")

  def display_alerts(_alerts),
    do: SiteWeb.PageView.svg_icon(%SvgIcon{icon: :alert, class: "icon-small-inline"})

  @doc """
  Returns vehicle frequency for the frequency table, either "Every X minutes" or "No service between these hours".
  """
  @spec frequency_times(Schedules.Frequency.t()) :: Phoenix.HTML.Safe.t()
  def frequency_times(frequency) do
    if Schedules.Frequency.has_service?(frequency) do
      content_tag :span do
        [
          "Every ",
          TimeGroup.display_frequency_range(frequency),
          content_tag(:span, " minutes", class: "sr-only"),
          content_tag(:span, " mins", aria_hidden: true)
        ]
      end
    else
      content_tag(:span, "No service between these hours")
    end
  end

  @spec frequency_block_name(Schedules.Frequency.t(), Schedules.Departures.t() | :no_service) ::
          String.t()
  def frequency_block_name(
        %Schedules.Frequency{time_block: :early_morning},
        %Schedules.Departures{} = departure
      ) do
    "#{ViewHelpers.format_schedule_time(departure.first_departure)} - 6:30A"
  end

  def frequency_block_name(%Schedules.Frequency{time_block: :am_rush}, _), do: "6:30A - 9:30A"
  def frequency_block_name(%Schedules.Frequency{time_block: :midday}, _), do: "9:30A - 3:30P"
  def frequency_block_name(%Schedules.Frequency{time_block: :pm_rush}, _), do: "3:30P - 6:30P"
  def frequency_block_name(%Schedules.Frequency{time_block: :evening}, _), do: "6:30P - 9:00P"
  def frequency_block_name(%Schedules.Frequency{time_block: :night}, _), do: "9:00P - 12:00A"

  def frequency_block_name(
        %Schedules.Frequency{time_block: :late_night},
        %Schedules.Departures{} = departure
      ) do
    "12:00A - #{ViewHelpers.format_schedule_time(departure.last_departure)}"
  end

  @spec stop_name_link_with_alerts(String.t(), String.t(), [Alerts.Alert.t()]) ::
          Phoenix.HTML.Safe.t()
  def stop_name_link_with_alerts(name, url, []) do
    link to: url do
      name
      |> ViewHelpers.break_text_at_slash()
    end
  end

  def stop_name_link_with_alerts(name, url, alerts) do
    link to: url do
      name
      |> ViewHelpers.break_text_at_slash()
      |> add_icon_to_stop_name(alerts)
    end
  end

  defp add_icon_to_stop_name(stop_name, alerts) do
    content_tag :span, class: "name-with-icon" do
      stop_name
      |> String.split(" ")
      |> add_icon_to_string(alerts)
    end
  end

  defp add_icon_to_string([word | []], alerts) do
    content_tag :span, class: "inline-block" do
      [word, display_alerts(alerts)]
    end
  end

  defp add_icon_to_string([word | rest], alerts) do
    [word, " ", add_icon_to_string(rest, alerts)]
  end

  @doc """
  Returns a link to expand or collapse the trip list. No link is shown
  if there are no additional trips
  """
  @spec trip_expansion_link(:none | :collapsed | :expanded, Date.t(), Plug.Conn.t()) ::
          Phoenix.HTML.safe() | nil
  def trip_expansion_link(:none, _date, _conn) do
    nil
  end

  def trip_expansion_link(:collapsed, date, conn) do
    date_string = date |> ViewHelpers.pretty_date() |> String.downcase()

    link to: UrlHelpers.update_url(conn, show_all_trips: true) <> "#trip-list",
         class: "trip-list-row trip-list-footer" do
      "Show all trips for #{date_string}"
    end
  end

  def trip_expansion_link(:expanded, _date, conn) do
    link to: UrlHelpers.update_url(conn, show_all_trips: false) <> "#trip-list",
         class: "trip-list-row trip-list-footer" do
      "Show upcoming trips only"
    end
  end
end
