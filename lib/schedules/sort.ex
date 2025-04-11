defmodule Schedules.Sort do
  @moduledoc """
  Handles sorting schedules.
  """

  alias Schedules.Schedule

  @doc """
  Sorts schedules by grouping them into trips and then comparing the first departure.
  """
  @spec sort_by_first_departure([Schedule.t()]) :: [[Schedule.t()]]
  def sort_by_first_departure(schedules) do
    schedules
    |> Enum.sort_by(& &1.departure_time, &datetime_sorter/2)
    |> Enum.group_by(& &1.trip.id)
    |> Enum.sort_by(&mapper/1, &departure_sorter/2)
    |> Enum.map(&mapper/1)
  end

  @doc """
  Sorts schedules by comparing the departure time of the first shared stop.
  """
  @spec sort_by_first_shared_stop([Schedule.t()]) :: [[Schedule.t()]]
  def sort_by_first_shared_stop(schedules) do
    schedules
    |> Enum.sort_by(& &1.time, &datetime_sorter/2)
    |> Enum.group_by(& &1.trip.id)
    |> Enum.sort_by(&mapper/1, &first_shared_stop_sorter/2)
    |> Enum.map(&mapper/1)
  end

  # Sorts two schedule lists by comparing the first departure time of each.
  defp departure_sorter(a, b) do
    a_departure_time = first_departure_time(a)

    b_departure_time = first_departure_time(b)

    datetime_sorter(a_departure_time, b_departure_time)
  end

  # Compares two times.
  # Handles the case where one or more are nil.
  defp datetime_sorter(nil, nil), do: true
  defp datetime_sorter(nil, _), do: false
  defp datetime_sorter(_, nil), do: true

  defp datetime_sorter(a, b) do
    Timex.compare(a, b) < 1
  end

  # Finds the schedule with the given stop id in a list of schedules.
  defp find_schedule_with_stop(schedules, stop_id) do
    Enum.find(schedules, fn schedule -> schedule.stop.id === stop_id end)
  end

  # Gets the first departure time for a list of schedules.
  defp first_departure_time(schedules) do
    schedules
    |> Enum.map(& &1.departure_time)
    |> Enum.reject(&is_nil/1)
    |> Enum.sort(&datetime_sorter/2)
    |> List.first()
  end

  # Sorts two schedule lists by comparing the departure time of the first shared stop.
  defp first_shared_stop_sorter(a, b) do
    a_stop_ids = Enum.map(a, & &1.stop.id)
    b_stop_ids = Enum.map(b, & &1.stop.id)

    common_stop = Enum.find(a_stop_ids, &Enum.member?(b_stop_ids, &1))

    if common_stop do
      a_schedule = find_schedule_with_stop(a, common_stop)
      b_schedule = find_schedule_with_stop(b, common_stop)

      datetime_sorter(a_schedule.time, b_schedule.time)
    else
      departure_sorter(a, b)
    end
  end

  # Ignores the trip id and returns the schedules for sorting.
  defp mapper({_, schedules}), do: schedules
end
