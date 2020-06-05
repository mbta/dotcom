defmodule PredictedSchedule.DisplayTest do
  use ExUnit.Case, async: true
  import PredictedSchedule.Display
  import Phoenix.HTML, only: [safe_to_string: 1]
  alias Schedules.Schedule
  alias Predictions.Prediction
  alias Routes.Route

  describe "time/1" do
    @early_time ~N[2017-01-01T12:00:00]
    @late_time ~N[2018-02-02T14:14:14]
    @commuter_route %Route{id: "CR-Lowell", name: "Lowell", type: 2}

    test "Prediction is used if one is given" do
      display_time =
        time(%PredictedSchedule{
          schedule: %Schedule{time: @early_time},
          prediction: %Prediction{time: @late_time}
        })

      assert safe_to_string(display_time) =~ "2:14 PM"
      refute safe_to_string(display_time) =~ "12:00 PM"
      assert safe_to_string(display_time) =~ "icon-realtime"
    end

    test "Scheduled time is used if no prediction is available" do
      display_time =
        time(%PredictedSchedule{schedule: %Schedule{time: @early_time}, prediction: nil})

      assert safe_to_string(display_time) =~ "12:00 PM"
      refute safe_to_string(display_time) =~ "fa fa-rss"
    end

    test "Empty string returned if no value available in predicted_schedule pair" do
      assert time(%PredictedSchedule{schedule: nil, prediction: nil}) == ""
    end

    test "prediction status is used if the prediction does not have a time" do
      display_time =
        time(%PredictedSchedule{schedule: nil, prediction: %Prediction{status: "Text status"}})

      assert safe_to_string(display_time) =~ "Text status"
      assert safe_to_string(display_time) =~ "icon-realtime"
    end

    test "if the predicted time is later than the scheduled time, cross out the scheduled one" do
      result =
        %PredictedSchedule{
          schedule: %Schedule{route: @commuter_route, time: @early_time},
          prediction: %Prediction{route: @commuter_route, time: @late_time}
        }
        |> time
        |> safe_to_string

      assert result =~ "12:00 PM"
      assert result =~ "2:14 PM"
      assert result =~ "icon-realtime"
    end

    test "if the predicted time is earlier than the scheduled time, cross out the scheduled one" do
      result =
        %PredictedSchedule{
          schedule: %Schedule{route: @commuter_route, time: @late_time},
          prediction: %Prediction{route: @commuter_route, time: @early_time}
        }
        |> time
        |> safe_to_string

      assert result =~ "2:14 PM"
      assert result =~ "12:00 PM"
      assert result =~ "icon-realtime"
    end

    test "if the predicted time is earlier less than a 60 seconds, but across a different minute, cross out scheduled" do
      scheduled_time = ~N[2017-01-01T05:40:10]
      prediction_time = ~N[2017-01-01T05:39:58]

      result =
        %PredictedSchedule{
          schedule: %Schedule{route: @commuter_route, time: scheduled_time},
          prediction: %Prediction{route: @commuter_route, time: prediction_time}
        }
        |> time
        |> safe_to_string

      assert result =~ "5:40 AM"
      assert result =~ "5:39 AM"
      assert result =~ "icon-realtime"
    end

    test "if the times do not differ, just returns the same result as a non-CR time" do
      result =
        %PredictedSchedule{
          schedule: %Schedule{route: @commuter_route, time: @early_time},
          prediction: %Prediction{route: @commuter_route, time: @early_time}
        }
        |> time
        |> safe_to_string

      assert result =~ "12:00 PM"
      assert result =~ "icon-realtime"
    end

    test "if the trip is cancelled, only crosses out the schedule time" do
      result =
        %PredictedSchedule{
          schedule: %Schedule{route: @commuter_route, time: @early_time},
          prediction: %Prediction{route: @commuter_route, schedule_relationship: :cancelled}
        }
        |> time
        |> safe_to_string

      assert result =~ "<del"
      assert result =~ "12:00 PM"
      assert result =~ "icon-realtime"
    end

    test "if a trip is skipped, crosses out the schedule time" do
      result =
        %PredictedSchedule{
          schedule: %Schedule{time: @early_time},
          prediction: %Prediction{schedule_relationship: :skipped}
        }
        |> time
        |> safe_to_string

      assert result =~ "<del"
      assert result =~ "12:00 PM"
      assert result =~ "icon-realtime"
    end

    test "handles nil schedules" do
      result =
        time(%PredictedSchedule{
          schedule: nil,
          prediction: %Prediction{route: @commuter_route, time: @late_time}
        })

      assert safe_to_string(result) =~ "2:14 PM"
    end

    test "handles nil predictions" do
      result = time(%PredictedSchedule{schedule: %Schedule{time: @early_time}, prediction: nil})

      assert safe_to_string(result) =~ "12:00 PM"
    end
  end

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

  describe "time_difference/1" do
    @base_time ~N[2017-01-01T12:00:00]
    @schedule %Schedule{time: Timex.shift(@base_time, minutes: 30)}
    @prediction %Prediction{time: Timex.shift(@base_time, minutes: 28)}

    test "Prediction time is preferred" do
      ps = %PredictedSchedule{schedule: @schedule, prediction: @prediction}
      assert safe_to_string(time_difference(ps, @base_time)) =~ "28 min"
    end

    test "Schedule used when no prediction" do
      ps = %PredictedSchedule{schedule: @schedule}
      output = IO.iodata_to_binary(time_difference(ps, @base_time))
      assert output =~ "30 min"
    end

    test "realtime icon shown when prediction is shown" do
      ps = %PredictedSchedule{schedule: @schedule, prediction: @prediction}
      assert safe_to_string(time_difference(ps, @base_time)) =~ "icon-realtime"
    end

    test "Time shown when difference is over an hour" do
      ps = %PredictedSchedule{
        schedule: @schedule,
        prediction: %Prediction{time: Timex.shift(@base_time, hours: 2)}
      }

      assert safe_to_string(time_difference(ps, @base_time)) =~ "2:00 PM"
    end

    test "Time shown as `< 1` minute when same time as current_time" do
      ps = %PredictedSchedule{schedule: %Schedule{time: @base_time}}
      assert time_difference(ps, @base_time) == ["1", " ", "min"]
    end

    test "Time shown when predicted just before current time" do
      shoulda_been_here = %Prediction{time: Timex.shift(@base_time, minutes: -1)}
      ps = %PredictedSchedule{schedule: @schedule, prediction: shoulda_been_here}

      assert safe_to_string(time_difference(ps, @base_time)) =~ "11:59 AM"
    end

    test "crossed out schedule shown when prediction doesn't have a time" do
      ps = %PredictedSchedule{
        schedule: @schedule,
        prediction: %Prediction{schedule_relationship: :cancelled}
      }

      rendered = safe_to_string(time_difference(ps, @base_time))
      assert rendered =~ ~s(<del class="no-wrap strikethrough">)
      assert rendered =~ "12:30 PM"
      assert rendered =~ "icon-realtime"
    end

    test "shows nothing if we can't figure out a time" do
      ps = %PredictedSchedule{}
      assert time_difference(ps, @base_time) == ""
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
