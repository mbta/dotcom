defmodule SortTest do
  use ExUnit.Case, async: true

  import Schedules.Sort
  import Timex, only: [shift: 2]

  alias Schedules.Schedule
  alias Schedules.Trip

  @now Timex.now()

  @schedules [
    %Schedule{departure_time: shift(@now, minutes: 1), trip: %Trip{id: "1"}},
    %Schedule{departure_time: shift(@now, minutes: 2), trip: %Trip{id: "1"}},
    %Schedule{departure_time: shift(@now, minutes: 5), trip: %Trip{id: "2"}},
    %Schedule{departure_time: shift(@now, minutes: 6), trip: %Trip{id: "2"}},
    %Schedule{departure_time: shift(@now, minutes: 3), trip: %Trip{id: "3"}},
    %Schedule{departure_time: shift(@now, minutes: 4), trip: %Trip{id: "3"}}
  ]

  describe "sort_by_first_time/1" do
    test "groups a list of schedules into lists of trips" do
      result = sort_by_first_times(@schedules)

      for [first | _] = trip_list <- result do
        assert Enum.all?(trip_list, &(&1.trip == first.trip))
      end
    end

    test "sorts schedules by their time at the first departure" do
      result = sort_by_first_times(@schedules)

      assert Enum.map(result, &List.first/1) == [
               %Schedule{departure_time: shift(@now, minutes: 1), trip: %Trip{id: "1"}},
               %Schedule{departure_time: shift(@now, minutes: 3), trip: %Trip{id: "3"}},
               %Schedule{departure_time: shift(@now, minutes: 5), trip: %Trip{id: "2"}}
             ]
    end
  end
end
