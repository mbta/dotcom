defmodule Dotcom.SystemStatus.Grouping do
  @moduledoc """
  A module that groups alerts into statuses for the system status widget.
  """

  alias Alerts.Alert

  @lines ["Blue", "Orange", "Red", "Green"]
  @green_line_branches ["Green-B", "Green-C", "Green-D", "Green-E"]
  @routes ["Blue", "Orange", "Red"] ++ @green_line_branches

  def grouping(alerts, now) do
    grouped_alerts = Map.new(@routes, &{&1, alerts_for_line(alerts, &1)})

    @routes
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
    |> combine_green_line_branches()
    |> sort_routes_and_sub_routes()
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

  defp combine_green_line_branches(statuses_by_route) do
    {green_line_entries, other_entries} =
      statuses_by_route
      |> Enum.split_with(fn %{route_id: route_id} -> route_id in @green_line_branches end)

    consolidated_green_line_entries =
      green_line_entries
      |> Enum.group_by(& &1.statuses)
      |> Enum.to_list()
      |> convert_branches_to_sub_routes()

    other_entries ++ consolidated_green_line_entries
  end

  defp convert_branches_to_sub_routes([{statuses, _}]) do
    [
      %{
        route_id: "Green",
        sub_routes: [],
        statuses: statuses
      }
    ]
  end

  defp convert_branches_to_sub_routes(entries) do
    entries
    |> Enum.map(fn {statuses, routes} ->
      %{
        route_id: "Green",
        sub_routes: routes |> Enum.map(& &1.route_id),
        statuses: statuses
      }
    end)
  end

  defp sort_routes_and_sub_routes(entries) do
    line_indexes = @lines |> Enum.with_index() |> Map.new()

    entries
    |> Enum.sort_by(fn %{route_id: route_id, statuses: [%{description: description} | _]} ->
      description_sort_order =
        case description do
          "Normal Service" -> 1
          _ -> 0
        end

      {line_indexes |> Map.get(route_id), description_sort_order}
    end)
  end
end
