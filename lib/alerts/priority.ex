defmodule Alerts.Priority do
  @moduledoc """
  Calculate an alert's priority
  """

  import Dotcom.Utils.Time, only: [between?: 3]

  alias Alerts.Match

  @type priority_level :: :high | :low | :system

  @priority_levels [:high, :low, :system]

  @spec priority_levels() :: [priority_level]
  def priority_levels, do: @priority_levels

  @spec priority(map, DateTime.t()) :: priority_level
  def priority(map, now \\ Dotcom.Utils.DateTime.now())

  def priority(%{lifecycle: lifecycle}, _) when lifecycle == :upcoming do
    # Ongoing alerts are low
    :low
  end

  def priority(
        %{effect: :delay, severity: severity, informed_entity: informed_entities, cause: cause},
        _time
      )
      when severity < 6 and cause === :traffic do
    # delay alerts for bus routes with a cause of traffic under severity 6 are low priority
    is_bus_alert = Enum.any?(informed_entities, &(&1.route_type == 3))

    case is_bus_alert do
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
    date = DateTime.to_date(time)

    if Enum.all?(active_period, &outside_date_range?(date, &1)) and
         urgent?(params, time) == false,
       do: :low,
       else: :high
  end

  def priority(%{effect: :track_change}, _) do
    :low
  end

  def priority(%{severity: severity} = params, time) when severity >= 7 do
    if urgent?(params, time), do: :high, else: :low
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

  def priority(%{effect: effect, active_period: active_period}, time) do
    # non-Ongoing alerts are low priority if they aren't happening now
    if effect in Alerts.Alert.ongoing_effects() && Match.any_period_match?(active_period, time) do
      :high
    else
      :low
    end
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
  @spec urgent?(map, DateTime.t()) :: boolean
  def urgent?(%{severity: severity}, _) when severity < 7 do
    false
  end

  def urgent?(%{active_period: []}, _) do
    true
  end

  def urgent?(%{updated_at: updated_at, active_period: active_period}, time) do
    within_one_week(time, updated_at) || Enum.any?(active_period, &urgent_period?(&1, time))
  end

  def urgent?(_, _) do
    false
  end

  @spec urgent_period?({DateTime.t() | nil, DateTime.t() | nil}, DateTime.t()) :: boolean

  def urgent_period?({nil, nil}, %DateTime{}) do
    true
  end

  def urgent_period?({nil, %DateTime{} = until}, %DateTime{} = time) do
    within_one_week(until, time)
  end

  def urgent_period?({%DateTime{} = from, nil}, %DateTime{} = time) do
    within_one_week(time, from)
  end

  def urgent_period?({from, until}, time) do
    urgent_period?({from, nil}, time) || urgent_period?({nil, until}, time)
  end

  def within_one_week(time_1, time_2) do
    diff = DateTime.diff(time_1, time_2, :day) |> abs()
    diff <= 6
  end

  @spec outside_date_range?(Date.t(), Alerts.Alert.period_pair()) :: boolean
  defp outside_date_range?(date, {from, until}) do
    from_date = if(from, do: DateTime.to_date(from))
    until_date = if(until, do: DateTime.to_date(until))
    not between?(date, from_date, until_date)
  end
end
