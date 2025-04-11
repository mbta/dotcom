defmodule SortTest do
  use ExUnit.Case, async: true

  import Schedules.Sort
  import Timex, only: [shift: 2]

  alias Schedules.Schedule
  alias Schedules.Trip
  alias Stops.Stop

  @now Timex.now()

  @schedules [
    %Schedule{
      departure_time: shift(@now, minutes: 2),
      stop: %Stop{id: "2"},
      time: shift(@now, minutes: 2),
      trip: %Trip{id: "1"}
    },
    %Schedule{
      departure_time: shift(@now, minutes: 1),
      stop: %Stop{id: "1"},
      time: shift(@now, minutes: 1),
      trip: %Trip{id: "1"}
    },
    %Schedule{
      departure_time: shift(@now, minutes: 6),
      stop: %Stop{id: "2"},
      time: shift(@now, minutes: 6),
      trip: %Trip{id: "3"}
    },
    %Schedule{
      departure_time: shift(@now, minutes: 5),
      stop: %Stop{id: "1"},
      time: shift(@now, minutes: 5),
      trip: %Trip{id: "3"}
    },
    %Schedule{
      departure_time: shift(@now, minutes: 4),
      stop: %Stop{id: "2"},
      time: shift(@now, minutes: 4),
      trip: %Trip{id: "2"}
    },
    %Schedule{
      departure_time: shift(@now, minutes: 3),
      stop: %Stop{id: "1"},
      time: shift(@now, minutes: 3),
      trip: %Trip{id: "2"}
    }
  ]

  @expected_sorted_trip_stop_ids [
    {"1", "1"},
    {"1", "2"},
    {"2", "1"},
    {"2", "2"},
    {"3", "1"},
    {"3", "2"}
  ]

  describe "sort_by_first_departure/1" do
    test "groups by trip and sorts groups on first departure time" do
      # Setup / Exercise
      sorted_trip_stop_ids =
        @schedules
        |> sort_by_first_departure()
        |> List.flatten()
        |> Enum.map(fn schedule -> {schedule.trip.id, schedule.stop.id} end)

      # Verify
      assert sorted_trip_stop_ids == @expected_sorted_trip_stop_ids
    end
  end

  describe "sort_by_first_shared_stop/1" do
    test "groups by trip and sorts groups on first stop in common" do
      # Setup / Exercise
      sorted_trip_stop_ids =
        @schedules
        |> sort_by_first_shared_stop()
        |> List.flatten()
        |> Enum.map(fn schedule -> {schedule.trip.id, schedule.stop.id} end)

      # Verify
      assert sorted_trip_stop_ids == @expected_sorted_trip_stop_ids
    end
  end
end
