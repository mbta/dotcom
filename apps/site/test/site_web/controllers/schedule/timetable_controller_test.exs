defmodule SiteWeb.ScheduleController.TimetableControllerTest do
  @moduledoc false
  use ExUnit.Case, async: true
  import SiteWeb.ScheduleController.TimetableController
  alias Routes.Route
  alias Stops.Stop
  alias Schedules.{Schedule, Trip}

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
      trip: %Trip{id: "trip-1", name: "123"},
      platform_stop_id: "stop-1-platform-1"
    },
    %Schedule{
      stop_sequence: 2,
      time: DateTime.from_unix!(5000),
      stop: %Stop{id: "2", name: "name2"},
      trip: %Trip{id: "trip-2", name: "456"},
      platform_stop_id: "stop-2-platform-1"
    },
    %Schedule{
      stop_sequence: 3,
      time: DateTime.from_unix!(50_000),
      stop: %Stop{id: "3", name: "name3"},
      trip: %Trip{id: "trip-3", name: "789"},
      platform_stop_id: "stop-3-platform-1"
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

  describe "trip_messages/2" do
    test "returns proper messages for CR Franklin" do
      assert trip_messages(%Routes.Route{id: "CR-Franklin"}, 1) == %{}

      assert [
               "731"
             ] ==
               %Routes.Route{id: "CR-Franklin"}
               |> trip_messages(0)
               |> Map.keys()
               |> Enum.map(&elem(&1, 0))
               |> Enum.uniq()
               |> Enum.sort()
    end

    test "returns proper messages for CR Fairmount" do
      assert trip_messages(%Routes.Route{id: "CR-Fairmount"}, 1) == %{}
    end
  end

  describe "vehicle_schedules/1" do
    test "constructs vehicle data for channel consumption" do
      vehicles =
        vehicle_schedules(
          %{assigns: %{date: Util.service_date()}},
          Enum.concat(@schedules, @odd_schedules)
        )

      assert @vehicle_schedules == vehicles
    end

    test "doesn't constructs vehicle data for channel consumption if the date is not today" do
      vehicles =
        vehicle_schedules(%{assigns: %{date: Date.add(Util.service_date(), 1)}}, @schedules)

      assert vehicles == %{}
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

  describe "track_change_for_schedule/2" do
    test "when there are no canonical routes, then no track change" do
      [schedule_1 | _others] = @schedules

      assert nil ==
               track_change_for_schedule(schedule_1, MapSet.new(), fn _platform_stop_id ->
                 %{platform_code: "new-platform"}
               end)
    end

    test "when the scheduled stop doesn't match the canonical pattern stops, then track change detected" do
      [schedule_1 | _others] = @schedules

      assert "new-platform" ==
               track_change_for_schedule(
                 schedule_1,
                 MapSet.new(["stop-1-other-patform"]),
                 fn _platform_stop_id -> %{platform_code: "new-platform"} end
               )
    end
  end
end
