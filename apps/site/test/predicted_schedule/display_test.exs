defmodule PredictedSchedule.DisplayTest do
  use ExUnit.Case, async: true
  import PredictedSchedule.Display
  alias Schedules.Schedule
  alias Predictions.Prediction

  describe "headsign/1" do
    test "if trip is present, displays the headsign from the trip" do
      trip = %Schedules.Trip{headsign: "headsign"}

      for {schedule, prediction} <- [
            {nil, %Prediction{trip: trip}},
            {%Schedule{trip: trip}, nil},
            {%Schedule{trip: trip}, %Prediction{trip: trip}}
          ] do
        ps = %PredictedSchedule{schedule: schedule, prediction: prediction}
        assert headsign(ps) == "headsign"
      end
    end

    test "if it's a westbound Green line without a trip, uses a hardcoded sign" do
      for {route_id, expected} <- %{
            "Green-B" => "Boston College",
            "Green-C" => "Cleveland Circle",
            "Green-D" => "Riverside",
            "Green-E" => "Heath Street"
          } do
        route = %Routes.Route{id: route_id}
        prediction = %Prediction{direction_id: 0, route: route, trip: nil}
        ps = %PredictedSchedule{prediction: prediction}
        assert headsign(ps) == expected
      end
    end

    test "if the route/direction is anything else, returns an empty string" do
      for {route_id, direction_id} <- [
            {"Green-B", 1},
            {"Unknown", 0}
          ] do
        route = %Routes.Route{id: route_id}
        prediction = %Prediction{direction_id: direction_id, route: route, trip: nil}
        ps = %PredictedSchedule{prediction: prediction}
        assert headsign(ps) == ""
      end
    end

    test "if both schedule and prediction are nil, returns an empty string" do
      assert headsign(%PredictedSchedule{}) == ""
    end
  end

  describe "do_time_difference/4" do
    @base_time ~N[2017-01-01T12:00:00]

    test "difference above threshold" do
      actual =
        do_time_difference(
          Timex.shift(@base_time, minutes: 30),
          Timex.shift(@base_time, minutes: 28),
          fn _time -> "format time" end,
          1
        )

      assert actual == "format time"
    end

    test "difference below threshold" do
      actual =
        do_time_difference(
          Timex.shift(@base_time, minutes: 30),
          Timex.shift(@base_time, minutes: 28),
          fn _time -> "format time" end
        )

      assert actual == ["2", " ", "min"]
    end
  end
end
