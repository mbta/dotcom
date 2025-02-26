defmodule Dotcom.Alerts.Disruptions.Subway do
  @moduledoc """
  Disruptions are alerts that have `service_impacting_effects` grouped by `service_range`.
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]
  import Dotcom.Routes, only: [subway_route_ids: 0]
  import Dotcom.Utils.ServiceDateTime, only: [all_service_ranges: 0, service_range: 1]

  alias Dotcom.Utils.ServiceDateTime
  alias Alerts.Alert
  alias Dotcom.Utils

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @doc """
  Disruptions that occur any time after today's service range.
  """
  @spec future_disruptions() :: %{Utils.ServiceDateTime.named_service_range() => [Alert.t()]}
  def future_disruptions() do
    disruption_groups() |> Map.take([:this_week, :next_week, :after_next_week])
  end

  @doc """
  Disruptions that occur during today's service range.
  """
  @spec todays_disruptions() :: %{today: [Alert.t()]}
  def todays_disruptions() do
    disruption_groups() |> Map.take([:today])
  end

  # Groups all disruption alerts by service range.
  #
  # 1. Gets all alerts for subway routes.
  # 2. Filters out non-service-impacting alerts
  # 3. Groups them according to service range.
  # 4. Sorts the alerts within the group by start time.
  defp disruption_groups() do
    subway_route_ids()
    |> @alerts_repo.by_route_ids(@date_time_module.now())
    |> Enum.flat_map(&split_by_discontiguous_active_periods/1)
    |> Enum.filter(&service_impacting_alert?/1)
    |> Enum.reduce(%{}, &group_alerts/2)
    |> Enum.map(fn {group, alerts} ->
      {group, sort_alerts_by_start_time(alerts)}
    end)
    |> Enum.into(%{})
  end

  # Given an alert with multiple active periods, some of which may be
  # contiguous with one another (next one starts the same day or the
  # day after the previous one), combines the contiguous active
  # periods, and then returns
  defp split_by_discontiguous_active_periods(alert) do
    alert.active_period
    |> combine_contiguous_active_periods()
    |> Enum.map(fn active_period ->
      %Alerts.Alert{alert | active_period: [active_period]}
    end)
  end

  # Given a list of active periods
  defp combine_contiguous_active_periods([active_period1, active_period2 | rest]) do
    {start1, end1} = active_period1
    {start2, end2} = active_period2

    if Timex.before?(
         ServiceDateTime.service_date(end1) |> Timex.shift(days: 1),
         ServiceDateTime.service_date(start2)
       ) do
      [active_period1 | combine_contiguous_active_periods([active_period2 | rest])]
    else
      combined_active_period = {start1, end2}
      combine_contiguous_active_periods([combined_active_period | rest])
    end
  end

  defp combine_contiguous_active_periods(active_periods) do
    active_periods
  end

  # Looks at every active period for an alert and groups that alert by service range.
  # Alerts can overlap service ranges, in which case we want them to appear in both.
  defp group_alerts(alert, groups) do
    alert
    |> Map.get(:active_period)
    |> Enum.flat_map(&service_range_range/1)
    |> Enum.uniq()
    |> Enum.reduce(groups, fn service_range, groups ->
      Map.update(groups, service_range, [alert], &(&1 ++ [alert]))
    end)
  end

  # An active period can span many ranges from start to stop
  # e.g. [:before_today, :today, :this_week]
  defp service_range_range({start, stop}) do
    start_index = Enum.find_index(all_service_ranges(), &(&1 == service_range(start)))
    stop_index = Enum.find_index(all_service_ranges(), &(&1 == service_range(stop)))

    all_service_ranges()
    |> Enum.with_index(&if(&2 in start_index..stop_index, do: &1))
    |> Enum.reject(&is_nil/1)
  end

  # Sorts alerts by the start time of the first active period.
  defp sort_alerts_by_start_time(alerts) do
    alerts
    |> Enum.sort_by(
      fn alert ->
        alert |> Map.get(:active_period, [{nil, nil}]) |> List.first() |> Kernel.elem(0)
      end,
      :asc
    )
  end
end
