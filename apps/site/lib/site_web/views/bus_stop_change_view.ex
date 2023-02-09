defmodule SiteWeb.BusStopChangeView do
  use SiteWeb, :view
  alias Alerts.Alert
  alias Stops.Stop

  @spec sorted_by_start_date([%Alert{}]) :: [%Alert{}]
  def sorted_by_start_date(alerts) do
    Enum.sort_by(
      alerts,
      fn %Alert{active_period: [{start_date, _} | _]} ->
        start_date
      end,
      Date
    )
  end

  @spec related_stops(%Alert{}) :: [%Stop{}]
  def related_stops(%Alert{} = alert) do
    Alert.get_entity(alert, :stop)
    |> MapSet.delete(nil)
    |> MapSet.to_list()
    |> Enum.map(&Stops.Repo.get_parent(&1))
    |> Enum.uniq()
  end

  @spec time_filter_buttons(%Plug.Conn{}) :: Phoenix.HTML.Safe.t()
  def time_filter_buttons(conn) do
    selected_timeframe = conn.assigns.alerts_timeframe

    content_tag(
      :div,
      Enum.map([nil, :current, :upcoming], fn timeframe ->
        link(filter_text(timeframe),
          to: bus_stop_change_path(conn, :show, alerts_timeframe: timeframe),
          class:
            if(timeframe == selected_timeframe,
              do: "m-alerts__time-filter m-alerts__time-filter--selected",
              else: "m-alerts__time-filter"
            )
        )
      end),
      class: "m-alerts__time-filters small"
    )
  end

  defp filter_text(nil), do: "Past Changes"
  defp filter_text(:current), do: "Current Alerts"
  defp filter_text(:upcoming), do: "Upcoming Service Alerts"

  @spec affected_stops_links(%Plug.Conn{}, %Alert{}) :: Phoenix.HTML.Safe.t() | nil
  def affected_stops_links(conn, alert) do
    related_stops = related_stops(alert)

    if length(related_stops) > 0 do
      content_tag(
        :ul,
        Enum.map(related_stops, fn stop ->
          content_tag(:li, link(stop.name, to: stop_path(conn, :show, stop.id)))
        end),
        class: "list-unstyled"
      )
    end
  end

  @spec time_range(%Alert{}) :: Phoenix.HTML.Safe.t()
  def time_range(%Alerts.Alert{active_period: active_periods}) do
    active_periods
    |> Enum.map(fn {start_date, end_date} ->
      content_tag(
        :div,
        [
          date_tag(start_date),
          content_tag(
            :div,
            [
              "End date: ",
              date_tag(end_date) || "N/A"
            ],
            class: "small"
          )
        ]
      )
    end)
    |> List.first()
  end

  @spec date_tag(DateTime.t() | nil) :: Phoenix.HTML.Safe.t() | nil
  defp date_tag(%DateTime{} = date) do
    with iso <- DateTime.to_iso8601(date),
         {:ok, readable} <- Timex.format(date, "{Mshort} {D} {YYYY} {h24}:{m}") do
      [
        fa("calendar", class: "mr-025"),
        content_tag(:time, readable, datetime: iso, class: "u-small-caps u-bold")
      ]
    end
  end

  defp date_tag(nil), do: nil
end
