defmodule Dotcom.SystemStatus do
  @moduledoc """
  This module exists to provide a simple view into the status of the
  subway system, for each line, showing whether its running normally,
  or whether there are alerts that impact service.
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]

  alias Dotcom.SystemStatus

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @doc """
  Returns a map indicating the subway status for each of the subway lines.
  """
  @spec subway_status :: %{Routes.Route.id_t() => SystemStatus.Subway.status_entry_group()}
  def subway_status() do
    @alerts_repo.by_route_types([0, 1], @date_time_module.now())
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

  # Returns true if the alert (as signified by the active_period_start provided)
  # starts before the end of datetime's day.
  defp starts_before_end_of_service?(active_period_start, datetime) do
    datetime |> Util.end_of_service() |> Timex.after?(active_period_start)
  end

  # Returns true if the alert (as signified by the active_period_end provided)
  # ends before the given datetime. If active_period_end is nil, then the alert
  # is indefinite, which means that it definitionally has not ended.
  defp has_not_ended?(nil, _datetime), do: true

  defp has_not_ended?(active_period_end, datetime),
    do: datetime |> Timex.before?(active_period_end)
end
