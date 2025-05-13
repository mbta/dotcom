defmodule Dotcom.SystemStatus do
  @moduledoc """
  This module exists to provide a simple view into the status of the
  subway system, for each line, showing whether its running normally,
  or whether there are alerts that impact service.
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]
  import Dotcom.Routes, only: [subway_route_ids: 0]

  alias Dotcom.SystemStatus

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]

  @type status_time() :: :current | {:future, DateTime.t()}

  @type status_t() :: :normal | Dotcom.Alerts.service_effect_t()

  @type status_entry() :: %{
          alerts: [Alert.t()],
          multiple: boolean(),
          status: status_t(),
          time: status_time()
        }

  @type status_entry_group() :: %{
          branch_ids: [Routes.Route.id_t()],
          status_entries: [SystemStatus.status_entry()]
        }

  @doc """
  Returns a map indicating the subway status for each of the subway lines.
  """
  @spec subway_status :: %{Routes.Route.id_t() => SystemStatus.Subway.status_entry_group()}
  def subway_status() do
    subway_route_ids()
    |> @alerts_repo.by_route_ids(@date_time_module.now())
    |> Enum.filter(&status_alert?(&1, @date_time_module.now()))
    |> SystemStatus.Subway.subway_status(@date_time_module.now())
  end

  def status_alert?(alert, datetime) do
    service_impacting_alert?(alert) and active_now_or_later_on_day?(alert, datetime)
  end

  @doc """
  Returns `true` if the alert is active at some point during the day
  given, unless the alert's end time is before the time given.

  This is primarily intended to be called with `now` as the time
  passed in, so that it effectively says whether an alert is relevant
  for a commuter now or later today.

  ## Example (Currently Active)
      iex> now = Timex.to_datetime(~N[2025-01-05 14:00:00], "America/New_York")
      iex> one_hour_ago = Timex.to_datetime(~N[2025-01-05 13:00:00], "America/New_York")
      iex> one_hour_from_now = Timex.to_datetime(~N[2025-01-05 15:00:00], "America/New_York")
      iex> Dotcom.SystemStatus.active_now_or_later_on_day?(
      ...>   %Alerts.Alert{active_period: [{one_hour_ago, one_hour_from_now}]},
      ...>   now
      ...> )
      true

  ## Example (Active Later Today)
      iex> now = Timex.to_datetime(~N[2025-01-05 14:00:00], "America/New_York")
      iex> one_hour_from_now = Timex.to_datetime(~N[2025-01-05 15:00:00], "America/New_York")
      iex> one_day_from_now = Timex.to_datetime(~N[2025-01-06 14:00:00], "America/New_York")
      iex> Dotcom.SystemStatus.active_now_or_later_on_day?(
      ...>   %Alerts.Alert{active_period: [{one_hour_from_now, one_day_from_now}]},
      ...>   now
      ...> )
      true

  Returns `false` for alerts that are either closed out or too far in
  the future.

  ## Example (Expired)
      iex> now = Timex.to_datetime(~N[2025-01-05 14:00:00], "America/New_York")
      iex> two_hours_ago = Timex.to_datetime(~N[2025-01-05 12:00:00], "America/New_York")
      iex> one_hour_ago = Timex.to_datetime(~N[2025-01-05 13:00:00], "America/New_York")
      iex> Dotcom.SystemStatus.active_now_or_later_on_day?(
      ...>   %Alerts.Alert{active_period: [{two_hours_ago, one_hour_ago}]},
      ...>   now
      ...> )
      false

  ## Example (Not Active Until Tomorrow)
      iex> now = Timex.to_datetime(~N[2025-01-05 14:00:00], "America/New_York")
      iex> one_day_from_now = Timex.to_datetime(~N[2025-01-06 14:00:00], "America/New_York")
      iex> two_days_from_now = Timex.to_datetime(~N[2025-01-07 14:00:00], "America/New_York")
      iex> Dotcom.SystemStatus.active_now_or_later_on_day?(
      ...>   %Alerts.Alert{active_period: [{one_day_from_now, two_days_from_now}]},
      ...>   now
      ...> )
      false
  """
  def active_now_or_later_on_day?(alert, datetime) do
    Enum.any?(alert.active_period, fn {active_period_start, active_period_end} ->
      starts_before_end_of_service?(active_period_start, datetime) &&
        has_not_ended?(active_period_end, datetime)
    end)
  end

  @doc """
  Maps a list of alerts to a list of statuses that are formatted
  according to the system status specifications:
   - Identical alerts are grouped together and pluralized.
   - Times are given as a kitchen-formatted string, nil, or "Now".
   - Statuses are sorted alphabetically.
  """
  @spec alerts_to_statuses([Alert.t()], DateTime.t()) :: [status_entry()]
  def alerts_to_statuses(alerts, time) do
    alerts
    |> alerts_to_statuses_naive(time)
    |> consolidate_duplicates()
    |> sort_statuses()
  end

  # Naively maps a list of alerts to a list of statuses, where a
  # status is a simple structure with a route, a status, and a
  # few additional fields that determine how it will render in the
  # frontend.
  @spec alerts_to_statuses_naive([Alert.t()], DateTime.t()) :: [status_entry()]
  defp alerts_to_statuses_naive(alerts, time)

  # If there are no alerts, then we want a single status indicating
  # "Normal Service".
  defp alerts_to_statuses_naive([], _time) do
    [normal_status()]
  end

  # If there are alerts, then create a starting list of statuses that
  # maps one-to-one with the alerts provided.
  defp alerts_to_statuses_naive(alerts, time) do
    alerts
    |> Enum.map(fn alert ->
      alert_to_status(alert, time)
    end)
  end

  # Translates an alert to a status:
  #  - The effect is humanized into a status for the status.
  #  - If the alert's already active, `time` is set to `nil`.
  #  - If the alert is in the future, `time` is set to the alert's
  #    start time
  @spec alert_to_status(Alert.t(), DateTime.t()) :: status_entry()
  defp alert_to_status(alert, time) do
    time = future_start_time(alert.active_period, time)

    %{alerts: [alert], multiple: false, status: alert.effect, time: time}
  end

  @spec normal_status() :: status_entry()
  defp normal_status() do
    %{multiple: false, status: :normal, time: :current, alerts: []}
  end

  # Returns true if the alert (as signified by the active_period_start provided)
  # starts before the end of datetime's day.
  defp starts_before_end_of_service?(active_period_start, datetime) do
    datetime |> Util.end_of_service() |> Timex.after?(active_period_start)
  end

  # - If the active period is in the future, returns its start_time.
  # - If the active period indicates that the alert is currently active, returns nil.
  # - Raises an error if the alert is completely in the past.
  @spec future_start_time([Alert.period_pair()], DateTime.t()) :: status_time()
  defp future_start_time(
         [{start_time, _end_time} = first_active_period | more_active_periods],
         time
       ) do
    cond do
      ends_before?(first_active_period, time) -> future_start_time(more_active_periods, time)
      starts_before?(first_active_period, time) -> :current
      true -> {:future, start_time}
    end
  end

  # Returns true if the active period ends before the time given. An
  # end-time of false indicates an indefinite active period, which
  # never ends.
  @spec ends_before?(Alert.period_pair(), DateTime.t()) :: boolean()
  defp ends_before?({_start_time, nil}, _time), do: false
  defp ends_before?({_start_time, end_time}, time), do: Timex.before?(end_time, time)

  # Returns true if the active period starts before the time given.
  @spec starts_before?(Alert.period_pair(), DateTime.t()) :: boolean()
  defp starts_before?({start_time, _end_time}, time), do: Timex.before?(start_time, time)

  # Combines statuses that have the same active time and status
  # into a single pluralized status (e.g. "Station Closures" instead
  # of "Station Closure").
  @spec consolidate_duplicates([status_entry()]) :: [status_entry()]
  defp consolidate_duplicates(statuses) do
    statuses
    |> Enum.group_by(fn %{time: time, status: effect} -> {time, effect} end)
    |> Enum.map(fn {{time, effect}, grouped_statuses} ->
      %{
        time: time,
        status: effect,
        multiple: length(grouped_statuses) > 1,
        alerts: Enum.flat_map(grouped_statuses, & &1.alerts) |> Enum.uniq()
      }
    end)
  end

  # Sorts the given list of statuses first by time, then by
  # status, so that earlier statuses show up before later ones,
  # and then to keep statuses in a stable order.
  #
  # This takes advantage of the fact that `nil` is sorted before
  # anything else, which allows it to automatically sort active
  # statuses before future ones.
  #
  # This should be called before &stringify_times/1, otherwise times
  # will get sorted lexically instead of temporally (e.g. 10:00pm will
  # get sorted ahead of 9:00pm).
  @spec sort_statuses([status_entry()]) :: [status_entry()]
  defp sort_statuses(statuses) do
    statuses
    |> Enum.sort_by(fn %{time: time, status: status} -> {time, status} end)
  end

  # Given a list of branches that don't have any alerts, returns a
  # status entry indicating normal service for those branches, or
  # nothing if the list of branches is empty. Returns this as a list
  # so that it can be concatenated with the alert-based status
  # entries.
  @spec normal_status_entry_groups([Routes.Route.id_t()]) :: [status_entry_group()]
  def normal_status_entry_groups([]), do: []

  def normal_status_entry_groups(normal_branches) do
    [
      %{
        branch_ids: normal_branches,
        status_entries: [normal_status()]
      }
    ]
  end

  # Returns true if the alert (as signified by the active_period_end provided)
  # ends before the given datetime. If active_period_end is nil, then the alert
  # is indefinite, which means that it definitionally has not ended.
  defp has_not_ended?(nil, _datetime), do: true

  defp has_not_ended?(active_period_end, datetime),
    do: datetime |> Timex.before?(active_period_end)
end
