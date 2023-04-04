defmodule SiteWeb.BusStopChangeView do
  use SiteWeb, :view
  alias Alerts.{Alert, HistoricalAlert}
  alias SiteWeb.AmbiguousAlert
  alias Stops.Stop

  defdelegate affected_routes(alert), to: AmbiguousAlert
  defdelegate related_stops(alert), to: AmbiguousAlert
  defdelegate alert_start_date(alert), to: AmbiguousAlert
  defdelegate alert_municipality(alert), to: AmbiguousAlert
  defdelegate time_range(alert), to: AmbiguousAlert
  defdelegate alert_item(alert, conn), to: AmbiguousAlert

  def grouped_by_stop(alerts) do
    alerts
    |> Enum.flat_map(&alert_with_related_stops/1)
    |> Enum.group_by(&elem(&1, 0), &elem(&1, 1))
    |> sort_and_group_with_fn(fn alerts_list ->
      Enum.sort_by(alerts_list, &alert_start_date/1)
    end)
  end

  defp alert_with_related_stops(alert) do
    alert
    |> related_stops()
    |> Enum.map(&{&1, alert})
  end

  def grouped_by_municipality(alerts) do
    alerts
    |> Enum.group_by(&alert_municipality/1)
    |> sort_and_group_with_fn(&grouped_by_stop/1)
  end

  # Remaps the grouped alerts by a given function, and sorts by group keys.
  defp sort_and_group_with_fn(grouped_alerts_list, func) do
    grouped_alerts_list
    |> Enum.map(fn {key, alerts} ->
      {key, func.(alerts)}
    end)
    |> Enum.sort_by(&elem(&1, 0))
    |> Enum.into(%{})
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
  defp filter_text(:current), do: "Current Changes"
  defp filter_text(:upcoming), do: "Upcoming Changes"

  @spec affected_stop_link(%Plug.Conn{}, %Stop{} | String.t()) :: Phoenix.HTML.Safe.t() | nil
  def affected_stop_link(_conn, stopname) when is_binary(stopname) do
    content_tag(:div, stopname)
  end

  def affected_stop_link(conn, stop) do
    if(stop, do: link(stop.name, to: stop_path(conn, :show, stop.id), class: "text-primary"))
  end
end
