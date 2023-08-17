defmodule Alerts.Priority do
  @moduledoc """
  Calculate an alert's priority
  """

  alias Alerts.Match

  @type priority_level :: :high | :low | :system
  @ongoing_effects Alerts.Alert.ongoing_effects()

  @spec priority(map, DateTime.t()) :: priority_level
  def priority(map, now \\ Util.now())

  def priority(%{lifecycle: lifecycle}, _) when lifecycle == :upcoming do
    # Ongoing alerts are low
    :low
  end

  def priority(
        %{effect: :delay, severity: severity, informed_entity: informed_entities},
        _time
      )
      when severity < 5 do
    # delay alerts for bus routes under severity 5 are low priority
    case length(Enum.filter(informed_entities, &(&1.route_type == 3))) > 0 do
      true -> :low
      false -> :high
    end
  end

  def priority(%{effect: :delay}, _params) do
    # Delays are always high
    :high
  end

  def priority(%{effect: :suspension}, _) do
    # Suspensions are high
    :high
  end

  def priority(%{effect: :cancellation, active_period: active_period} = params, time) do
    date = Timex.to_date(time)

    if Enum.all?(active_period, &outside_date_range?(date, &1)) and
         is_urgent_alert?(params, time) == false,
       do: :low,
       else: :high
  end

  def priority(%{severity: severity} = params, time) when severity >= 7 do
    if is_urgent_alert?(params, time), do: :high, else: :low
  end

  def priority(%{effect: :access_issue}, _) do
    :low
  end

  def priority(%{effect: :service_change, severity: severity}, _)
      when severity <= 3 do
    :low
  end

  def priority(%{lifecycle: lifecycle}, _)
      when lifecycle in [:ongoing, :ongoing_upcoming] do
    # Ongoing alerts are low
    :low
  end

  def priority(%{effect: effect, active_period: active_period}, time)
      when effect in @ongoing_effects do
    # non-Ongoing alerts are low if they aren't happening now
    if Match.any_period_match?(active_period, time), do: :high, else: :low
  end

  def priority(_, _) do
    # Default to low
    :low
  end

  @doc """
  Reducer to determine if alert is urgent due to time.
  High-severity alert should always be an alert if any of the following are true:
    * updated in the last week
    * now is within a week of start date
    * now is within one week of end date
  """
  @spec is_urgent_alert?(map, DateTime.t()) :: boolean
  def is_urgent_alert?(%{severity: severity}, _) when severity < 7 do
    false
  end

  def is_urgent_alert?(%{active_period: []}, _) do
    true
  end

  def is_urgent_alert?(%{updated_at: updated_at, active_period: active_period}, time) do
    within_one_week(time, updated_at) || Enum.any?(active_period, &is_urgent_period?(&1, time))
  end

  def is_urgent_alert?(_, _) do
    false
  end

  @spec is_urgent_period?({DateTime.t() | nil, DateTime.t() | nil}, DateTime.t()) :: boolean

  def is_urgent_period?({nil, nil}, %DateTime{}) do
    true
  end

  def is_urgent_period?({nil, %DateTime{} = until}, %DateTime{} = time) do
    within_one_week(until, time)
  end

  def is_urgent_period?({%DateTime{} = from, nil}, %DateTime{} = time) do
    within_one_week(time, from)
  end

  def is_urgent_period?({from, until}, time) do
    is_urgent_period?({from, nil}, time) || is_urgent_period?({nil, until}, time)
  end

  def within_one_week(time_1, time_2) do
    diff = Timex.diff(time_1, time_2, :days)
    diff <= 6 && diff >= -6
  end

  @spec outside_date_range?(Date.t(), {Date.t(), Date.t()}) :: boolean
  defp outside_date_range?(date, {nil, until}) do
    until_date = Timex.to_date(until)
    date > until_date
  end

  defp outside_date_range?(date, {from, nil}) do
    from_date = Timex.to_date(from)
    date < from_date
  end

  defp outside_date_range?(date, {from, until}) do
    from_date = Timex.to_date(from)
    until_date = Timex.to_date(until)
    date < from_date || date > until_date
  end
end
