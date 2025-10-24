defmodule DotcomWeb.BusStopChangeView do
  use DotcomWeb, :view
  alias DotcomWeb.AmbiguousAlert
  alias Stops.Stop

  @type keyname :: String.t()
  @type alerts_with_keys :: [{keyname, AmbiguiousAlert.t()}]
  @type alerts_by_key :: [{keyname, [AmbiguiousAlert.t()]}]

  defdelegate affected_routes(alert), to: AmbiguousAlert
  defdelegate related_stops(alert), to: AmbiguousAlert
  defdelegate alert_start_date(alert), to: AmbiguousAlert
  defdelegate alert_municipality(alert), to: AmbiguousAlert
  defdelegate time_range(alert), to: AmbiguousAlert
  defdelegate alert_item(alert, conn), to: AmbiguousAlert

  def keyed_by_municipality(alerts) do
    alerts
    |> Enum.map(&{alert_municipality(&1), &1})
    |> sort_and_adjust_values(&keyed_by_stop/1)
  end

  @spec keyed_by_stop(alerts_with_keys) :: alerts_by_key
  defp keyed_by_stop(keyed_alerts) do
    keyed_alerts
    |> Enum.flat_map(&alert_with_related_stops/1)
    |> sort_and_adjust_values(fn alerts_list ->
      Enum.sort_by(alerts_list, &alert_start_date/1, DateTime)
    end)
  end

  @spec alert_with_related_stops(AmbiguousAlert.t()) :: alerts_with_keys
  defp alert_with_related_stops(alert) do
    alert
    |> related_stops()
    |> Enum.map(&{&1, alert})
  end

  @spec sort_and_adjust_values(
          alerts_by_key,
          ([AmbiguiousAlert.t()] -> [AmbiguiousAlert.t()])
        ) :: alerts_by_key
  defp sort_and_adjust_values(keyed_alerts_list, alerts_func) do
    keyed_alerts_list
    |> Enum.group_by(&elem(&1, 0), &elem(&1, 1))
    |> Enum.map(fn {key, alerts} ->
      # Apply function to the values
      {key, alerts_func.(alerts)}
    end)
    # Sort whole list by keys
    |> Enum.sort()
  end

  @spec time_filter_buttons(Plug.Conn.t()) :: Phoenix.HTML.Safe.t()
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

  @spec affected_stop_link(Plug.Conn.t(), Stop.t() | String.t()) :: Phoenix.HTML.Safe.t() | nil
  def affected_stop_link(_conn, stopname) when is_binary(stopname) do
    content_tag(:div, stopname)
  end

  def affected_stop_link(conn, stop) do
    if(stop, do: link(stop.name, to: stop_path(conn, :show, stop.id), class: "text-primary"))
  end
end
