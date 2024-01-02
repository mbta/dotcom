defmodule Alerts.Sort do
  @moduledoc """

  Sorts alerts in order of relevance.  Currently, the logic is:

  * effect name
  * lifecycle
  * severity
  * updated at (newest first)
  * future affected period (closest first)
  * id

  """

  @lifecycle_order [
    :new,
    :upcoming,
    :ongoing_upcoming,
    :ongoing
  ]

  @effect_order [
    :amber_alert,
    :cancellation,
    :delay,
    :suspension,
    :track_change,
    :detour,
    :shuttle,
    :stop_closure,
    :dock_closure,
    :station_closure,
    :stop_moved,
    :extra_service,
    :schedule_change,
    :service_change,
    :snow_route,
    :stop_shoveling,
    :station_issue,
    :dock_issue,
    :access_issue,
    :policy_change
  ]

  def sort(alerts, now) do
    Enum.sort_by(alerts, &sort_key(&1, now))
  end

  defp sort_key(alert, now) do
    {
      -high_severity(alert),
      priority(alert),
      effect_index(alert.effect),
      lifecycle_index(alert.lifecycle),
      -alert.severity,
      -updated_at_date(alert.updated_at),
      first_future_active_period_start(alert.active_period, now),
      alert.id
    }
  end

  # generate methods for looking up the indexes, rather than having to
  # traverse the list each time
  for {lifecycle, index} <- Enum.with_index(@lifecycle_order) do
    defp lifecycle_index(unquote(lifecycle)), do: unquote(index)
  end

  # fallback
  defp lifecycle_index(_), do: unquote(length(@lifecycle_order))

  for {name, index} <- Enum.with_index(@effect_order) do
    defp effect_index(unquote(name)), do: unquote(index)
  end

  # fallback
  defp effect_index(_), do: unquote(length(@effect_order))

  defp high_severity(%{severity: severity}) when severity >= 7 do
    severity
  end

  defp high_severity(_), do: 0

  defp updated_at_date(dt) do
    dt
    |> Timex.beginning_of_day()
    |> Timex.to_unix()
  end

  defp priority(%{priority: :low}), do: 1
  defp priority(%{priority: :high}), do: 0
  defp priority(%{priority: :system}), do: 1

  # atoms are greater than any integer
  defp first_future_active_period_start([], _now), do: :infinity

  defp first_future_active_period_start(periods, now) do
    # first active period that's in the future
    now_unix = DateTime.to_unix(now, :second)

    future_periods =
      for {start, _} <- periods,
          start,
          # wrap in a list to avoid an Erlang 19.3 issue
          unix <- [DateTime.to_unix(start)],
          unix > now_unix do
        unix
      end

    if future_periods == [] do
      :infinity
    else
      Enum.min(future_periods)
    end
  end
end
