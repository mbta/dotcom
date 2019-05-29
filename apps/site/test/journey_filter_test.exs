defmodule JourneyListFilterTest do
  use ExUnit.Case, async: true
  import Journey.Filter

  alias Schedules.Schedule
  alias Predictions.Prediction

  describe "Journey.find_max_earlier_departure_schedule_time/2" do
    test "finds max earlier departure time" do
      journey1 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T07:00:00]}}
      }

      journey2 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T08:00:00]}}
      }

      journey3 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T09:00:00]}}
      }

      # [ 7:00, 8:00, 9:00 ] @ 8:10 -> 8:00
      actual =
        find_max_earlier_departure_schedule_time(
          [journey1, journey2, journey3],
          ~N[2017-03-01T08:10:00]
        )

      assert actual == ~N[2017-03-01T08:00:00]

      # [ 7:00, 8:00, 9:00 ] @ 9:10 -> nil since the current time is after the last time
      assert find_max_earlier_departure_schedule_time(
               [journey1, journey2, journey3],
               ~N[2017-03-01T09:10:00]
             ) == nil

      # [ 7:00, 8:00, 9:00 ] @ 7:00 -> 7:00
      earlier_time = ~N[2017-03-01T07:00:00]

      assert find_max_earlier_departure_schedule_time(
               [journey1, journey2, journey3],
               earlier_time
             ) == earlier_time

      # [ 7:00, 8:00, 9:00 ] @ 6:59 -> nil
      assert find_max_earlier_departure_schedule_time(
               [journey1, journey2, journey3],
               ~N[2017-03-01T06:59:00]
             ) == nil
    end
  end

  describe "Journey.remove_departure_schedules_before/2" do
    test "removes journeys" do
      journey1 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T07:00:00]}}
      }

      journey2 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T08:00:00]}}
      }

      journey3 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T09:00:00]}}
      }

      # [ 7:00, 8:00, 9:00 ] before 8:10 -> [ 8:00, 9:00 ]
      result1 =
        remove_departure_schedules_before([journey1, journey2, journey3], ~N[2017-03-01T07:10:00])

      assert result1 == [journey2, journey3]

      # [ 9:00, 8:00, 7:00 ] before 8:10 -> [ 9:00, 8:00 ]
      result2 =
        remove_departure_schedules_before([journey3, journey2, journey1], ~N[2017-03-01T07:10:00])

      assert result2 == [journey3, journey2]

      # [ 9:00, 8:00, 7:00 ] before nil -> [ 7:00, 8:00, 9:00 ]
      result3 = remove_departure_schedules_before([journey1, journey2, journey3], nil)
      assert result3 == [journey1, journey2, journey3]
    end
  end

  describe "Journey.filter/3" do
    test "filters last trip and upcoming" do
      journey1 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T07:00:00]}}
      }

      journey2 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T08:00:00]}}
      }

      journey3 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T09:00:00]}}
      }

      # [ 7:00, 8:00, 9:00 ] @ 7:10 -> [ 7:00, 8:00, 9:00 ]
      result1 =
        filter([journey1, journey2, journey3], :last_trip_and_upcoming, ~N[2017-03-01T07:10:00])

      assert result1 == [journey1, journey2, journey3]

      # [ 9:00, 8:00, 7:00 ] @ 8:10 -> [ 9:00, 8:00 ]
      result2 =
        filter([journey3, journey2, journey1], :last_trip_and_upcoming, ~N[2017-03-01T08:10:00])

      assert result2 == [journey3, journey2]

      # [ 9:00, 8:00, 7:00 ] @ 8:10 the day before -> [ 9:00, 8:00, 7:00 ]
      result2 =
        filter([journey3, journey2, journey1], :last_trip_and_upcoming, ~N[2017-02-28T08:10:00])

      assert result2 == [journey3, journey2, journey1]

      # [ 9:00, 8:00, 7:00 ] @ 8:10 the next day -> [ 9:00, 8:00, 7:00 ]
      result3 =
        filter([journey3, journey2, journey1], :last_trip_and_upcoming, ~N[2017-03-02T08:10:00])

      assert result3 == [journey3, journey2, journey1]
    end

    test "filters trips with no departure schedule" do
      # { nil -- 10:00(p) }
      journey1 = %Journey{
        departure: %PredictedSchedule{schedule: nil, prediction: nil},
        arrival: %PredictedSchedule{
          schedule: nil,
          prediction: %Schedule{time: ~N[2017-03-01T10:00:00]}
        }
      }

      # { 9:00(s) 9:00(p) -- 11:00(p) }
      journey2 = %Journey{
        departure: %PredictedSchedule{
          schedule: %Schedule{time: ~N[2017-03-01T09:00:00]},
          prediction: %Prediction{time: ~N[2017-03-01T09:00:00]}
        },
        arrival: %PredictedSchedule{
          schedule: nil,
          prediction: %Schedule{time: ~N[2017-03-01T11:00:00]}
        }
      }

      # [ { nil -- 10:00(p), { 9:00(s) 9:00(p) -- 11:00(p) } ] @ 10:30 ->
      # [ { nil -- 10:00(p), { 9:00(s) 9:00(p) -- 11:00(p) } ]
      assert filter([journey1, journey2], :last_trip_and_upcoming, ~N[2017-03-01T10:00:00]) == [
               journey1,
               journey2
             ]
    end
  end

  describe "Journey.expansion/3" do
    @times List.duplicate(%Journey{}, 6)

    test "Expansion is :none when expanded times and collapsed times are equal" do
      assert expansion(@times, @times, true) == :none
      assert expansion(@times, @times, false) == :none
    end

    test "Expansion is :collapsed when filtered times are less than total times, and not all times not shown" do
      assert expansion(@times, Enum.take(@times, 3), false) == :collapsed
    end

    test "Expansion is :expanded when filtered times are less than total times, and all times are shown" do
      assert expansion(@times, Enum.take(@times, 3), true) == :expanded
    end
  end

  describe "Journey.remove_departure_schedules_before_predictions/2" do
    test "scheduled departure is before all predicted departures" do
      journey1 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T07:00:00]}}
      }

      journey2 = %Journey{
        departure: %PredictedSchedule{prediction: %Prediction{time: ~N[2017-03-01T08:00:00]}}
      }

      journey3 = %Journey{
        departure: %PredictedSchedule{prediction: %Prediction{time: ~N[2017-03-01T09:00:00]}}
      }

      actual =
        remove_departure_schedules_before_predictions(
          [journey1, journey2, journey3],
          ~N[2017-03-01T06:00:00]
        )

      assert actual == [journey2, journey3]
    end

    test "scheduled daprture is between predcited departures" do
      journey1 = %Journey{
        departure: %PredictedSchedule{prediction: %Prediction{time: ~N[2017-03-01T07:00:00]}}
      }

      journey2 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T08:00:00]}}
      }

      journey3 = %Journey{
        departure: %PredictedSchedule{prediction: %Prediction{time: ~N[2017-03-01T09:00:00]}}
      }

      journey4 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T10:00:00]}}
      }

      actual =
        remove_departure_schedules_before_predictions(
          [journey1, journey2, journey3, journey4],
          ~N[2017-03-01T06:00:00]
        )

      assert actual == [journey1, journey3, journey4]
    end
  end
end
