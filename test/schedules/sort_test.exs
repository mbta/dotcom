defmodule SortTest do
  use ExUnit.Case, async: true

  import Schedules.Sort
  import Timex, only: [shift: 2]

  alias Schedules.Schedule
  alias Schedules.Trip

  @now Timex.now()

  @schedules [
    %Schedule{time: @now, trip: %Trip{id: "1"}, stop: "s1"},
    %Schedule{time: shift(@now, minutes: 5), trip: %Trip{id: "1"}, stop: "s2"},
    %Schedule{time: shift(@now, minutes: 10), trip: %Trip{id: "1"}, stop: "s3"},
    %Schedule{time: shift(@now, minutes: 15), trip: %Trip{id: "1"}, stop: "s4"},
    %Schedule{time: shift(@now, minutes: 10), trip: %Trip{id: "3"}, stop: "s1"},
    %Schedule{time: shift(@now, minutes: 15), trip: %Trip{id: "3"}, stop: "s2"},
    %Schedule{time: shift(@now, minutes: 20), trip: %Trip{id: "3"}, stop: "s3"},
    %Schedule{time: shift(@now, minutes: 25), trip: %Trip{id: "3"}, stop: "s4"},
    %Schedule{time: shift(@now, minutes: 15), trip: %Trip{id: "2"}, stop: "s3"},
    %Schedule{time: shift(@now, minutes: 20), trip: %Trip{id: "2"}, stop: "s4"}
  ]

  describe "sort_by_first_time/1" do
    test "groups a list of schedules into lists of trips" do
      result = sort_by_first_times(@schedules)

      for [first | _] = trip_list <- result do
        assert Enum.all?(trip_list, &(&1.trip == first.trip))
      end
    end

    test "sorts schedules by their time at the first shared stop" do
      result = sort_by_first_times(@schedules)

      assert Enum.map(result, &List.first/1) == [
               %Schedule{time: @now, trip: %Trip{id: "1"}, stop: "s1"},
               %Schedule{time: shift(@now, minutes: 15), trip: %Trip{id: "2"}, stop: "s3"},
               %Schedule{time: shift(@now, minutes: 10), trip: %Trip{id: "3"}, stop: "s1"}
             ]
    end
  end
end
