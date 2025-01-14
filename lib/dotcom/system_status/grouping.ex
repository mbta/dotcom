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
        |> consolidate_duplicate_descriptions()
        |> sort_statuses()
        |> stringify_times()
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
    [%{description: "Normal Service", time: nil}]
  end

  defp alerts_to_statuses(alerts, now) do
    alerts
    |> Enum.map(fn alert ->
      alert_to_status(alert, now)
    end)
  end

  defp alert_to_status(alert, now) do
    description =
      case alert.effect do
        :delay -> "Delays"
        :shuttle -> "Shuttle Buses"
        :station_closure -> "Station Closure"
        :suspension -> "Suspension"
      end

    time = future_start_time(alert.active_period, now)

    %{description: description, time: time}
  end

  defp stringify_times(statuses) do
    statuses
    |> Enum.map(fn status ->
      case status do
        %{time: nil} ->
          status

        %{time: time} ->
          %{status | time: Timex.format!(time, "%-I:%M%p", :strftime) |> String.downcase()}
      end
    end)
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
    statuses
    |> Enum.sort_by(fn %{time: time, description: description} -> {time, description} end)
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

  defp consolidate_duplicate_descriptions(statuses) do
    statuses
    |> Enum.group_by(fn %{time: time, description: description} -> {time, description} end)
    |> Enum.map(fn
      {_, [status]} -> status
      {_, [status | _]} -> pluralize_description(status)
    end)
  end

  defp pluralize_description(%{description: description} = status) do
    new_description =
      case description do
        "Suspension" -> "Suspensions"
        "Station Closure" -> "Station Closures"
        _ -> description
      end

    %{status | description: new_description}
  end
end
