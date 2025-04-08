defmodule Schedules.Sort do
  @moduledoc """
  Handles sorting schedules.
  """

  alias Schedules.Schedule

  @doc """
  Sorts a list of schedules into trip lists. Two lists are compared by checking the departure time at the
  first shared stop.
  """
  @spec sort_by_first_times([Schedule.t()]) :: [[Schedule.t()]]
  def sort_by_first_times(schedules) do
    schedules
    |> Enum.group_by(&(&1.trip.id))
    |> Enum.sort_by(&mapper/1, &sorter/2)
    |> Enum.map(fn {_trip, schedules} -> schedules end)
  end

  # Gets the first departure time for a list of schedules.
  defp first_departure_time(schedules) do
    schedules
    |> Enum.map(&(&1.departure_time))
    |> Enum.reject(&is_nil/1)
    |> Enum.sort(&subsorter/2)
    |> List.first()
  end

  # Ignores the trip id and returns the schedules for sorting.
  defp mapper({_, schedules}), do: schedules

  # Sorts two schedule lists by comparing the first departure time of each.
  defp sorter(a, b) do
    a_departure_time = first_departure_time(a)

    b_departure_time = first_departure_time(b)

    subsorter(a_departure_time, b_departure_time)
  end

  # Compares two times.
  # Handles the case where one or more are nil.
  defp subsorter(nil, nil), do: true
  defp subsorter(nil, _), do: false
  defp subsorter(_, nil), do: true
  defp subsorter(a, b) do
    Timex.compare(a, b) < 1
  end
end
