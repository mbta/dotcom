defmodule Schedules.Sort do
  @moduledoc """
  Handles sorting schedules.
  """

  alias Schedules.Schedule
  alias Schedules.Trip

  @doc """
  Sorts a list of schedules into trip lists. Two lists are compared by checking the departure time at the
  first shared stop.
  """
  @spec sort_by_first_times([Schedule.t()]) :: [[Schedule.t()]]
  def sort_by_first_times(schedules) do
    schedules
    |> Enum.group_by(& &1.trip)
    |> Enum.sort_by(&schedule_mapper/1, &schedule_sorter/2)
    |> Enum.map(fn {_trip, schedules} -> schedules end)
  end

  @spec schedule_sorter([Schedule.t()], [Schedule.t()]) :: boolean
  defp schedule_sorter(left, right) do
    {left_time, right_time} =
      case first_matching_schedules(left, right) do
        nil -> {List.first(left).time, List.first(right).time}
        {%Schedule{time: left_time}, %Schedule{time: right_time}} -> {left_time, right_time}
      end

    Timex.before?(left_time, right_time)
  end

  @spec first_matching_schedules([Schedule.t()], [Schedule.t()]) ::
          {Schedule.t(), Schedule.t()} | nil
  def first_matching_schedules(left, right) do
    left_stops = Map.new(left, fn schedule -> {schedule.stop, schedule} end)

    case Enum.find(right, &Map.has_key?(left_stops, &1.stop)) do
      nil ->
        nil

      matching_right_schedule ->
        {left_stops[matching_right_schedule.stop], matching_right_schedule}
    end
  end

  @spec schedule_mapper({Trip.t(), [Schedule.t()]}) :: [Schedule.t()]
  defp schedule_mapper({_trip, schedules}) do
    schedules
  end
end
