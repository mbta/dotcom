defmodule Dotcom.SystemStatus.Alerts do
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

  def active_today?(alert, now) do
    Enum.any?(alert.active_period, fn {active_period_start, active_period_end} ->
      has_started?(active_period_start, now) && has_not_ended?(active_period_end, now)
    end)
  end

  def for_today(alerts, now) do
    Enum.filter(alerts, &active_today?(&1, now))
  end

  def filter_relevant(alerts) do
    alerts |> Enum.filter(fn %{effect: effect} -> effect in @relevant_effects end)
  end
end
