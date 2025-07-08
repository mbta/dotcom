defmodule JourneyTest do
  use ExUnit.Case, async: true

  import Journey

  alias Predictions.Prediction
  alias Schedules.Schedule

  @time ~N[2017-01-01T22:30:00]

  describe "Journey.display_status/1" do
    test "returns the same as Journey.display_status/2 with a nil second argument" do
      assert Journey.display_status(%PredictedSchedule{
               schedule: nil,
               prediction: %Prediction{status: "On Time"}
             }) ==
               Journey.display_status(
                 %PredictedSchedule{schedule: nil, prediction: %Prediction{status: "On Time"}},
                 nil
               )
    end
  end

  describe "Journey.display_status/2" do
    test "uses the departure status if it exists" do
      result =
        Journey.display_status(
          %PredictedSchedule{schedule: nil, prediction: %Prediction{status: "On Time"}},
          nil
        )

      assert result |> Phoenix.HTML.safe_to_string() |> Floki.parse_document!() |> Floki.text() ==
               "On time"
    end

    test "includes track number if present" do
      prediction = %Prediction{status: "All Aboard", track: "5"}

      result =
        Journey.display_status(%PredictedSchedule{schedule: nil, prediction: prediction}, nil)

      result
      |> Phoenix.HTML.safe_to_string()
      |> Floki.text()

      assert result |> Phoenix.HTML.safe_to_string() |> Floki.parse_document!() |> Floki.text() ==
               "All aboard on track 5"
    end

    test "returns a readable message if there's a difference between the scheduled and predicted times" do
      now = @time
      later = Timex.shift(now, minutes: 5)

      result =
        Journey.display_status(
          %PredictedSchedule{
            schedule: %Schedule{time: now},
            prediction: %Prediction{time: later}
          },
          %PredictedSchedule{schedule: nil, prediction: nil}
        )

      assert result |> Phoenix.HTML.safe_to_string() |> Floki.parse_document!() |> Floki.text() ==
               "Delayed 5 minutes"
    end

    test "returns the empty string if the predicted and scheduled times are the same" do
      now = @time

      result =
        Journey.display_status(
          %PredictedSchedule{schedule: %Schedule{time: now}, prediction: %Prediction{time: now}},
          %PredictedSchedule{schedule: nil, prediction: nil}
        )

      assert result == ""
    end

    test "takes the max of the departure and arrival time delays" do
      departure = @time
      later_departure = Timex.shift(departure, minutes: 5)
      arrival = Timex.shift(departure, minutes: 30)
      later_arrival = Timex.shift(arrival, minutes: 10)

      result =
        Journey.display_status(
          %PredictedSchedule{
            schedule: %Schedule{time: departure},
            prediction: %Prediction{time: later_departure}
          },
          %PredictedSchedule{
            schedule: %Schedule{time: arrival},
            prediction: %Prediction{time: later_arrival}
          }
        )

      assert result |> Phoenix.HTML.safe_to_string() |> Floki.parse_document!() |> Floki.text() ==
               "Delayed 10 minutes"
    end

    test "handles nil arrivals" do
      now = @time
      later = Timex.shift(now, minutes: 5)

      result =
        Journey.display_status(
          %PredictedSchedule{
            schedule: %Schedule{time: now},
            prediction: %Prediction{time: later}
          },
          nil
        )

      assert result |> Phoenix.HTML.safe_to_string() |> Floki.parse_document!() |> Floki.text() ==
               "Delayed 5 minutes"
    end

    test "inflects the delay correctly" do
      now = @time
      later = Timex.shift(now, minutes: 1)

      result =
        Journey.display_status(
          %PredictedSchedule{
            schedule: %Schedule{time: now},
            prediction: %Prediction{time: later}
          },
          nil
        )

      assert result |> Phoenix.HTML.safe_to_string() |> Floki.parse_document!() |> Floki.text() ==
               "Delayed 1 minute"
    end
  end

  describe "Journey.before/2" do
    test "compares by departures" do
      journey1 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T07:00:00]}}
      }

      journey2 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T08:00:00]}}
      }

      journey3 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T09:00:00]}}
      }

      # 7:00 before 8:00
      assert Journey.before?(journey1, journey2)

      # 7:00 before 9:00
      assert Journey.before?(journey1, journey3)

      # 8:00 before 9:00
      assert Journey.before?(journey2, journey3)

      # 8:00 before 8:00
      assert Journey.before?(journey2, journey2)

      # refute 8:00 before 7:00
      refute Journey.before?(journey2, journey1)

      # refute 9:00 before 7:00
      refute Journey.before?(journey3, journey1)
    end

    test "compares by arrival when departure is nil" do
      journey1 = %Journey{
        departure: nil,
        arrival: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T10:00:00]}}
      }

      journey2 = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T08:00:00]}},
        arrival: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T11:00:00]}}
      }

      journey3 = %Journey{departure: nil, arrival: nil}

      # dep=nil; arr=10:00 before dep=8:00; arr=11:00
      assert Journey.before?(journey1, journey2)
      refute Journey.before?(journey2, journey1)

      # dep=nil; arr=nil before dep=nil; arr=10:00
      assert Journey.before?(journey3, journey1)
      refute Journey.before?(journey1, journey3)
    end

    test "compares when departure and arrival is nil" do
      dep_time_nil = %Journey{
        departure: nil,
        arrival: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T10:00:00]}}
      }

      arr_time_nil = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T10:00:00]}},
        arrival: nil
      }

      # dep=11; arr=nil before dep=nil; arr=10:00
      assert Journey.before?(arr_time_nil, dep_time_nil)
      refute Journey.before?(dep_time_nil, arr_time_nil)
    end

    test "compares by prediction times before schedules" do
      journey1 = %Journey{
        departure: %PredictedSchedule{
          schedule: %Schedule{time: ~N[2017-03-01T07:30:00]},
          prediction: %Prediction{time: ~N[2017-03-01T07:00:00]}
        }
      }

      journey2 = %Journey{
        departure: %PredictedSchedule{
          schedule: %Schedule{time: ~N[2017-03-01T07:25:00]},
          prediction: %Prediction{time: ~N[2017-03-01T07:20:00]}
        }
      }

      assert Journey.before?(journey1, journey2)
    end

    test "compares by status if there are no times" do
      one_away = %Journey{
        departure: %PredictedSchedule{prediction: %Prediction{status: "1 stop away"}}
      }

      two_away = %Journey{
        departure: %PredictedSchedule{prediction: %Prediction{status: "2 stops away"}}
      }

      boarding = %Journey{
        departure: %PredictedSchedule{prediction: %Prediction{status: "Boarding"}}
      }

      approaching = %Journey{
        departure: %PredictedSchedule{prediction: %Prediction{status: "Approaching"}}
      }

      assert before?(boarding, approaching)
      assert before?(approaching, one_away)
      assert before?(boarding, one_away)
      assert before?(one_away, two_away)

      # opposite direction
      refute before?(approaching, boarding)
      refute before?(one_away, boarding)
      refute before?(two_away, boarding)
      refute before?(two_away, one_away)
    end
  end

  describe "Journey.departure_schedule_before?/2" do
    test "compares with time" do
      journey = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T07:30:00]}}
      }

      assert Journey.departure_schedule_before?(journey, ~N[2017-03-01T07:30:01])

      refute Journey.departure_schedule_before?(journey, ~N[2017-03-01T07:29:00])

      refute Journey.departure_schedule_before?(journey, ~N[2017-03-01T07:30:00])
    end
  end

  describe "Journey.departure_schedule_after?/2" do
    test "compares with time" do
      journey = %Journey{
        departure: %PredictedSchedule{schedule: %Schedule{time: ~N[2017-03-01T07:30:00]}}
      }

      assert Journey.departure_schedule_after?(journey, ~N[2017-03-01T07:29:00])

      refute Journey.departure_schedule_after?(journey, ~N[2017-03-01T07:31:00])

      refute Journey.departure_schedule_after?(journey, ~N[2017-03-01T07:30:00])
    end
  end
end
