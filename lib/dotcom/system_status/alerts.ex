defmodule Dotcom.SystemStatus.Alerts do
  @moduledoc """
  A utility module intended to filter alerts for the system status feature,
  relying on some specific criteria that are specific enough that they don't
  belong in the main `Alerts` module.
  """
  @relevant_effects [:delay, :shuttle, :suspension, :station_closure]

  defp has_started?(active_period_start, now) do
    now |> Timex.end_of_day() |> Timex.after?(active_period_start)
  end

  defp has_not_ended?(nil, _now) do
    true
  end

  defp has_not_ended?(active_period_end, now) do
    now |> Timex.before?(active_period_end)
  end

  @doc """
  Checks to see whether an alert is active at some point later today, possibly including
  `now`.

  Returns `true` if
  - The alert is currently active
  - The alert will become active later in the day

  ## Example (Currently Active)
      iex> now = Timex.to_datetime(~N[2025-01-05 14:00:00], "America/New_York")
      iex> one_hour_ago = Timex.to_datetime(~N[2025-01-05 13:00:00], "America/New_York")
      iex> one_hour_from_now = Timex.to_datetime(~N[2025-01-05 15:00:00], "America/New_York")
      iex> Dotcom.SystemStatus.Alerts.active_on_day?(
      ...>   %Alerts.Alert{active_period: [{one_hour_ago, one_hour_from_now}]},
      ...>   now
      ...> )
      true

  ## Example (Active Later Today)
      iex> now = Timex.to_datetime(~N[2025-01-05 14:00:00], "America/New_York")
      iex> one_hour_from_now = Timex.to_datetime(~N[2025-01-05 15:00:00], "America/New_York")
      iex> one_day_from_now = Timex.to_datetime(~N[2025-01-06 14:00:00], "America/New_York")
      iex> Dotcom.SystemStatus.Alerts.active_on_day?(
      ...>   %Alerts.Alert{active_period: [{one_hour_from_now, one_day_from_now}]},
      ...>   now
      ...> )
      true

  Returns `false` if the alert is not currently active, and either
  - Was only active in the past (even if earlier today)
  - Will next become active after the end of the day today

  ## Example (Expired)
      iex> now = Timex.to_datetime(~N[2025-01-05 14:00:00], "America/New_York")
      iex> two_hours_ago = Timex.to_datetime(~N[2025-01-05 12:00:00], "America/New_York")
      iex> one_hour_ago = Timex.to_datetime(~N[2025-01-05 13:00:00], "America/New_York")
      iex> Dotcom.SystemStatus.Alerts.active_on_day?(
      ...>   %Alerts.Alert{active_period: [{two_hours_ago, one_hour_ago}]},
      ...>   now
      ...> )
      false

  ## Example (Not Active Until Tomorrow)
      iex> now = Timex.to_datetime(~N[2025-01-05 14:00:00], "America/New_York")
      iex> one_day_from_now = Timex.to_datetime(~N[2025-01-06 14:00:00], "America/New_York")
      iex> two_days_from_now = Timex.to_datetime(~N[2025-01-07 14:00:00], "America/New_York")
      iex> Dotcom.SystemStatus.Alerts.active_on_day?(
      ...>   %Alerts.Alert{active_period: [{one_day_from_now, two_days_from_now}]},
      ...>   now
      ...> )
      false
  """
  def active_on_day?(alert, now) do
    Enum.any?(alert.active_period, fn {active_period_start, active_period_end} ->
      has_started?(active_period_start, now) && has_not_ended?(active_period_end, now)
    end)
  end

  @doc """
  Given a list of alerts, filters only the ones that are active today, as defined in `&active_on_day?/2`.
  See that function for details
  """
  def for_day(alerts, now) do
    Enum.filter(alerts, &active_on_day?(&1, now))
  end

  @doc """
  Given a list of alerts, returns only the alerts whose effects are one of
  `[:delay, :shuttle, :suspension, :station_closure]`.

  ## Examples
      iex> alerts = [
      ...>   %Alerts.Alert{id: "include_this", effect: :delay},
      ...>   %Alerts.Alert{id: "exclude_this", effect: :escalator_closure}
      ...> ]
      iex> Dotcom.SystemStatus.Alerts.filter_relevant(alerts) |> Enum.map(& &1.id)
      ["include_this"]
  }
  """
  def filter_relevant(alerts) do
    alerts |> Enum.filter(fn %{effect: effect} -> effect in @relevant_effects end)
  end
end
