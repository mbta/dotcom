defmodule TimeGroup do
  alias Schedules.Schedule

  @type time_block ::
          :early_morning | :am_rush | :midday | :pm_rush | :evening | :night | :late_night

  @doc """
  Given a list of schedules, returns those schedules grouped by the hour of day.

  Returns a keyword list rather than a map so that the times appear in order.

  Precondition: the schedules are already sorted by time.
  """
  @spec by_hour([%Schedule{}]) :: [{non_neg_integer, [%Schedule{}]}]
  def by_hour(schedules) do
    do_by_fn(schedules, & &1.time.hour)
  end

  @doc """
  Given a list of schedules, returns those schedules grouped into subway schedule periods:
  * OPEN - 6:30 AM (:early_morning)
  * 6:30 AM - 9:30 AM (:am_rush)
  * 9:30 AM - 3:30 PM (:midday)
  * 3:30 PM - 6:30 PM (:pm_rush)
  * 6:30 PM - 9:00 PM (:evening)
  * 9:00 PM - 12:00 AM (:night)
  * 12:00 AM - CLOSE (:late_night)

  Returns a keyword list, and expects that the schedules are already sorted.
  """
  @type subway_schedule :: time_block
  @spec by_subway_period([Schedule.t()]) :: [{subway_schedule, [Schedule.t()]}]
  def by_subway_period(schedules) do
    schedules
    |> do_by_fn(fn %Schedule{time: time} -> subway_period(time) end)
  end

  @doc """
  Given a list of schedules, return the frequency of service in minutes.
  If there are multiple schedules, returns either a min/max pair if there's a
  variation, or a single integer.  Otherwise, returns nil.
  """
  @spec frequency([Schedule.t()]) :: {non_neg_integer, non_neg_integer} | non_neg_integer | nil
  def frequency(schedules) do
    schedules
    |> Enum.uniq_by(& &1.time)
    |> do_frequency
  end

  defp do_frequency([_, _ | _] = schedules) do
    schedules
    |> Enum.zip(Enum.drop(schedules, 1))
    |> Enum.map(fn {x, y} -> Timex.diff(y.time, x.time, :minutes) end)
    |> Enum.min_max()
  end

  defp do_frequency(_) do
    nil
  end

  @spec frequency_for_time([Schedule.t()], atom) :: Schedules.Frequency.t()
  def frequency_for_time(schedules, time_block) do
    {min, max} =
      schedules
      |> Enum.filter(fn schedule -> subway_period(schedule.time) == time_block end)
      |> frequency
      |> verify_min_max

    %Schedules.Frequency{time_block: time_block, min_headway: min, max_headway: max}
  end

  @spec verify_min_max({integer, integer} | nil) :: {:infinity, :infinity} | {integer, integer}
  defp verify_min_max(nil), do: {:infinity, :infinity}
  defp verify_min_max({_min, _max} = min_max), do: min_max

  @spec frequency_by_time_block([Schedule.t()]) :: [Schedules.Frequency.t()]
  def frequency_by_time_block(schedules) do
    Enum.map(
      [:early_morning, :am_rush, :midday, :pm_rush, :evening, :night, :late_night],
      &frequency_for_time(schedules, &1)
    )
  end

  defp do_by_fn([], _) do
    []
  end

  defp do_by_fn(schedules, func) do
    schedules
    |> Enum.reduce([], &reduce_by_fn(&1, &2, func))
    |> reverse_first_group
    |> Enum.reverse()
  end

  defp reduce_by_fn(schedule, [], func) do
    [{func.(schedule), [schedule]}]
  end

  defp reduce_by_fn(schedule, [{value, grouped} | rest], func) do
    if value == func.(schedule) do
      head = {value, [schedule | grouped]}
      [head | rest]
    else
      head = {func.(schedule), [schedule]}
      previous_head = {value, Enum.reverse(grouped)}
      [head, previous_head | rest]
    end
  end

  defp reverse_first_group([{value, grouped} | rest]) do
    head = {value, Enum.reverse(grouped)}
    [head | rest]
  end

  @start {4, 0}
  @early_morning_end {6, 30}
  @am_rush_end {9, 30}
  @midday_end {15, 30}
  @pm_rush_end {18, 30}
  @evening_end {21, 0}
  @night_end {24, 0}
  def subway_period(time) do
    tup = {time.hour, time.minute}

    cond do
      tup < @start ->
        :late_night

      tup <= @early_morning_end ->
        :early_morning

      tup <= @am_rush_end ->
        :am_rush

      tup <= @midday_end ->
        :midday

      tup <= @pm_rush_end ->
        :pm_rush

      tup <= @evening_end ->
        :evening

      tup <= @night_end ->
        :night

      true ->
        :late_night
    end
  end

  @spec display_frequency_range(Schedules.Frequency.t()) :: iodata
  def display_frequency_range(%Schedules.Frequency{min_headway: value, max_headway: value}) do
    Integer.to_string(value)
  end

  def display_frequency_range(%Schedules.Frequency{min_headway: min, max_headway: max}) do
    [
      Integer.to_string(min),
      "-",
      Integer.to_string(max)
    ]
  end
end
