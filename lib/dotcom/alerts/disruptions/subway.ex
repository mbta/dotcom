defmodule Dotcom.Alerts.Disruptions.Subway do
  @moduledoc """
  Disruptions are alerts that have `service_impacting_effects` grouped by `service_range`.
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1, sort_by_start_time: 1]
  import Dotcom.Routes, only: [subway_route_ids: 0]
  import Dotcom.Utils.ServiceDateTime, only: [service_range_range: 2]

  alias Alerts.Alert
  alias Dotcom.Utils
  alias Dotcom.Utils.ServiceDateTime

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
      {group, sort_by_start_time(alerts)}
    end)
    |> Enum.into(%{})
  end

  # Given an alert with multiple active periods, some of which may be
  # contiguous with one another (next one starts the same day or the
  # day after the previous one), combines the contiguous active
  # periods, and then returns one alert per combined-contiguous active
  # period
  #
  # For instance, if an alert has three active periods, {Sun, Mon},
  # {Mon, Tue}, and {Thu, Fri}, then {Sun, Mon} and {Mon, Tue} are
  # combined into {Sun, Tue}, but {Thu, Fri} is kept separate. The
  # result is then two alerts, both equivalent to the alert passed in,
  # except that one has a single active period of {Sun, Tue}, and the
  # other has a single active period of {Thu, Fri}.
  defp split_by_discontiguous_active_periods(alert) do
    alert.active_period
    |> combine_contiguous_active_periods()
    |> Enum.map(fn active_period ->
      %Alerts.Alert{alert | active_period: [active_period]}
    end)
  end

  # Given a list of active periods, combines contiguous ones. See
  # split_by_discontiguous_active_periods/1 for more detail.  Active
  # periods are considered contiguous if the start of the next one is
  # the same day as the end of the previous one, or if it's the day
  # after, so active periods of {Mon, Wed} and {Thu, Fri} would be
  # combined into {Mon, Fri}, as would {Mon, Wed} and {Wed, Fri}, but
  # {Mon, Tue} and {Thu, Fri} would be kept separate.
  defp combine_contiguous_active_periods([active_period1, active_period2 | rest]) do
    {start1, end1} = active_period1
    {start2, end2} = active_period2

    if Date.before?(
         ServiceDateTime.service_date(end1) |> Date.shift(day: 1),
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
    |> Enum.flat_map(fn {start, stop} -> service_range_range(start, stop) end)
    |> Enum.uniq()
    |> Enum.reduce(groups, fn service_range, groups ->
      Map.update(groups, service_range, [alert], &(&1 ++ [alert]))
    end)
  end
end
