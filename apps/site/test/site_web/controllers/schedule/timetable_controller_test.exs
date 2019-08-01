defmodule SiteWeb.ScheduleController.TimetableControllerTest do
  @moduledoc false
  use ExUnit.Case, async: true
  import SiteWeb.ScheduleController.TimetableController
  alias Stops.Stop
  alias Schedules.{Schedule, Trip}
  alias Routes.Route

  @stops [
    %Stop{id: "1"},
    %Stop{id: "2"},
    %Stop{id: "3"}
  ]
  @schedules [
    %Schedule{
      stop_sequence: 1,
      time: DateTime.from_unix!(500),
      stop: %Stop{id: "1", name: "name1"},
      trip: %Trip{id: "trip-1", name: "123"}
    },
    %Schedule{
      stop_sequence: 2,
      time: DateTime.from_unix!(5000),
      stop: %Stop{id: "2", name: "name2"},
      trip: %Trip{id: "trip-2", name: "456"}
    },
    %Schedule{
      stop_sequence: 3,
      time: DateTime.from_unix!(50_000),
      stop: %Stop{id: "3", name: "name3"},
      trip: %Trip{id: "trip-3", name: "789"}
    }
  ]

  @odd_schedules [
    %Schedule{
      stop_sequence: 4,
      time: DateTime.from_unix!(50_000),
      stop: nil,
      trip: %Trip{id: "trip-4", headsign: "shuttle", name: "789"}
    },
    %Schedule{
      stop_sequence: 5,
      time: DateTime.from_unix!(50_000),
      route: %Route{description: :rail_replacement_bus},
      stop: %Stop{id: "5", name: "name3"},
      trip: %Trip{id: "trip-5", headsign: "shuttle", name: "789"}
    }
  ]
  @vehicle_schedules %{
    "name1-trip-1" => %{
      stop_name: "name1",
      stop_sequence: 1,
      trip_id: "trip-1"
    },
    "name2-trip-2" => %{
      stop_name: "name2",
      stop_sequence: 2,
      trip_id: "trip-2"
    },
    "name3-trip-3" => %{
      stop_name: "name3",
      stop_sequence: 3,
      trip_id: "trip-3"
    },
    "name3-trip-5" => %{stop_name: "name3", stop_sequence: 5, trip_id: "trip-5"},
    "shuttle-trip-4" => %{stop_name: "shuttle", stop_sequence: 4, trip_id: "trip-4"}
  }

  describe "build_timetable/2" do
    test "trip_schedules: a map from trip_id/stop_id to a schedule" do
      %{trip_schedules: trip_schedules} = build_timetable(@stops, @schedules)

      for schedule <- @schedules do
        assert trip_schedules[{schedule.trip.id, schedule.stop.id}] == schedule
      end

      assert map_size(trip_schedules) == length(@schedules)
    end

    test "all_stops: list of the stops in the same order" do
      %{all_stops: all_stops} = build_timetable(@stops, @schedules)

      assert all_stops == @stops
    end

    test "all_stops: if a stop isn't used, it's removed from the list" do
      schedules = Enum.take(@schedules, 1)

      %{all_stops: all_stops} = build_timetable(@stops, schedules)
      # other two stops were removed
      assert [%{id: "1"}] = all_stops
    end
  end

  describe "vehicle_schedules/1" do
    test "constructs vehicle data for channel consumption" do
      vehicles = vehicle_schedules(Enum.concat(@schedules, @odd_schedules))
      assert @vehicle_schedules == vehicles
    end
  end

  describe "prior_stops/1" do
    test "creates a map of stop identifiers to stop sequences for a schedule" do
      stops = prior_stops(@vehicle_schedules)

      assert %{
               "trip-1-1" => "name1-trip-1",
               "trip-2-2" => "name2-trip-2",
               "trip-3-3" => "name3-trip-3",
               "trip-4-4" => "shuttle-trip-4",
               "trip-5-5" => "name3-trip-5"
             } ==
               stops
    end
  end
end
