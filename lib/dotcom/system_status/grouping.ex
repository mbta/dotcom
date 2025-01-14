defmodule Dotcom.SystemStatus.Grouping do
  alias Alerts.Alert

  @lines ["Blue", "Orange", "Red", "Green"]

  def grouping(alerts, now) do
    grouped_alerts = Map.new(@lines, &{&1, alerts_for_line(alerts, &1)})

    [
      "Blue",
      "Orange",
      "Red",
      "Green"
    ]
    |> Enum.map(fn route_id ->
      statuses =
        grouped_alerts
        |> Map.get(route_id)
        |> alerts_to_statuses(now)
        |> sort_statuses()
        |> maybe_add_now_text()

      %{route_id: route_id, sub_routes: [], statuses: statuses}
    end)
  end

  defp alerts_for_line(alerts, line_id) do
    alerts
    |> Enum.filter(fn %Alert{informed_entity: informed_entity} ->
      informed_entity
      |> Enum.any?(fn
        %{route: ^line_id} -> true
        %{} -> false
      end)
    end)
  end

  defp alerts_to_statuses([], _now) do
    [%{status: "Normal Service", time: nil}]
  end

  defp alerts_to_statuses(alerts, now) do
    alerts
    |> Enum.map(fn alert ->
      alert_to_status(alert, now)
    end)
  end

  defp alert_to_status(alert, now) do
    status =
      case alert.effect do
        :delay -> "Delays"
        :shuttle -> "Shuttle Buses"
        :suspension -> "Suspension"
      end

    time =
      case future_start_time(alert.active_period, now) do
        nil -> nil
        start_time -> Timex.format!(start_time, "%-I:%M%p", :strftime) |> String.downcase()
      end

    %{status: status, time: time}
  end

  # - If the active period is in the future, returns its start_time.
  # - If the active period indicates that the alert is currently active, returns nil.
  # - Raises an error if the alert is completely in the past.
  defp future_start_time([{start_time, end_time} | more_active_periods], now) do
    cond do
      Timex.before?(end_time, now) -> future_start_time(more_active_periods, now)
      Timex.before?(start_time, now) -> nil
      true -> start_time
    end
  end

  defp sort_statuses(statuses) do
    statuses |> Enum.sort_by(fn %{time: time, status: status} -> {time, status} end)
  end

  defp maybe_add_now_text(statuses) do
    if any_future_statuses?(statuses) do
      statuses |> Enum.map(&add_now_text/1)
    else
      statuses
    end
  end

  defp any_future_statuses?(statuses) do
    statuses
    |> Enum.any?(fn
      %{time: nil} -> false
      %{} -> true
    end)
  end

  defp add_now_text(%{time: nil} = status), do: %{status | time: "Now"}
  defp add_now_text(status), do: status
end
