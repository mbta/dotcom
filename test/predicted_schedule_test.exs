defmodule PredictedScheduleTest do
  use ExUnit.Case, async: false

  import Mock
  import Mox
  import PredictedSchedule
  import Test.Support.Factories.Predictions.Prediction

  alias Predictions.Prediction
  alias Schedules.{Schedule, ScheduleCondensed, Trip}
  alias Stops.Stop

  # set to the end of a month to uncover issues with sorting times as
  # structs, rather than as integers
  @base_time Timex.to_datetime(~N[2017-06-30T23:30:00])

  @route %Routes.Route{id: "Teal"}

  @schedules [
    %Schedule{
      stop: %Stop{id: "first"},
      trip: %Trip{id: "trip1"},
      time: @base_time,
      route: @route
    },
    %Schedule{
      stop: %Stop{id: "second"},
      trip: %Trip{id: "trip1"},
      time: Timex.shift(@base_time, minutes: 10),
      route: @route
    },
    %Schedule{
      stop: %Stop{id: "third"},
      trip: %Trip{id: "trip1"},
      time: Timex.shift(@base_time, minutes: 20),
      route: @route
    },
    %Schedule{
      stop: %Stop{id: "fourth"},
      trip: %Trip{id: "trip1"},
      time: Timex.shift(@base_time, minutes: 30),
      route: @route
    },
    %Schedule{
      stop: %Stop{id: "fifth"},
      trip: %Trip{id: "trip1"},
      time: Timex.shift(@base_time, minutes: 40),
      route: @route
    },
    %Schedule{
      stop: %Stop{id: "last"},
      trip: %Trip{id: "trip1"},
      time: Timex.shift(@base_time, minutes: 50),
      route: @route
    }
  ]

  @condensed_schedules Enum.map(
                         @schedules,
                         &%ScheduleCondensed{
                           trip_id: &1.trip.id,
                           stop_id: &1.stop.id,
                           time: &1.time
                         }
                       )

  @predictions [
    build(:prediction, %{
      stop: %Stop{id: "first"},
      trip: %Trip{id: "trip1"},
      time: Timex.shift(@base_time, minutes: 12),
      route: @route
    }),
    build(:prediction, %{
      stop: %Stop{id: "second"},
      trip: %Trip{id: "trip1"},
      time: Timex.shift(@base_time, minutes: 22),
      route: @route
    }),
    build(:prediction, %{
      stop: %Stop{id: "third"},
      trip: %Trip{id: "trip1"},
      time: Timex.shift(@base_time, minutes: 32),
      route: @route
    })
  ]

  @non_matching_predictions [
    build(:prediction, %{
      stop: %Stop{id: "stop1"},
      time: Timex.shift(@base_time, minutes: 12),
      trip: %Trip{id: "trip6"}
    }),
    build(:prediction, %{
      stop: %Stop{id: "stop2"},
      time: Timex.shift(@base_time, minutes: 32),
      trip: %Trip{id: "trip2"}
    })
  ]

  @trip_schedules [
    %Schedule{
      trip: %Trip{id: "Trip 1"},
      stop: %Stop{id: "stop1"},
      time: @base_time,
      route: @route
    },
    %Schedule{
      trip: %Trip{id: "Trip 2"},
      stop: %Stop{id: "stop1"},
      time: Timex.shift(@base_time, minutes: 10),
      route: @route
    },
    %Schedule{
      trip: %Trip{id: "Trip 3"},
      stop: %Stop{id: "stop1"},
      time: Timex.shift(@base_time, minutes: 20),
      route: @route
    }
  ]

  @trip_predictions [
    build(:prediction, %{
      trip: %Trip{id: "Trip 1"},
      stop: %Stop{id: "stop1"},
      time: Timex.shift(@base_time, minutes: 2),
      route: @route
    }),
    build(:prediction, %{
      trip: %Trip{id: "Trip 2"},
      stop: %Stop{id: "stop1"},
      time: Timex.shift(@base_time, minutes: 12),
      route: @route
    }),
    build(:prediction, %{
      trip: %Trip{id: "Trip 3"},
      stop: %Stop{id: "stop1"},
      time: Timex.shift(@base_time, minutes: 22),
      route: @route
    })
  ]

  describe "get/2" do
    @tag :external
    test "returns a list of predicted schedules" do
      predicted_schedules = get("1", 59, direction_id: 1, now: Util.now())
      assert is_list(predicted_schedules)

      if !Enum.empty?(predicted_schedules) do
        assert [%PredictedSchedule{} | _] = predicted_schedules
      end
    end

    test "filters results by time but doesn't filter predictions or schedules individually" do
      schedules_fn = fn ["Teal"], opts ->
        refute Keyword.has_key?(opts, :min_time)
        @trip_schedules
      end

      expect(Predictions.Repo.Mock, :all, fn opts ->
        refute Keyword.has_key?(opts, :min_time)
        @trip_predictions
      end)

      predicted_schedules =
        get("Teal", "stop1",
          # between scheduled and predicted times for Trip 2
          now: Timex.shift(@base_time, minutes: 11),
          schedules_fn: schedules_fn
        )

      # should not see Trip 1 since scheduled and predicted times have passed
      assert [
               %{schedule: %{trip: %{id: "Trip 2"}}, prediction: %{trip: %{id: "Trip 2"}}},
               %{schedule: %{trip: %{id: "Trip 3"}}, prediction: %{trip: %{id: "Trip 3"}}}
             ] = predicted_schedules
    end

    test "attempts to return a list of predicted schedules for tomorrow, after no valid ones are left for today" do
      expect(Predictions.Repo.Mock, :all, fn _ ->
        @trip_predictions
      end)

      schedules_fn = fn ["Teal"], _opts ->
        @trip_schedules
      end

      with_mock PredictedSchedule, [:passthrough],
        group: fn _predictions, _schedules, _opts -> [] end do
        get("Teal", "stop1",
          now: Timex.shift(@base_time, minutes: 30),
          schedules_fn: schedules_fn
        )

        assert :meck.num_calls(PredictedSchedule, :group, :_) == 2
      end
    end
  end

  describe "PredictedSchedules.group/2" do
    test "paired by stop" do
      predicted_schedules = group(@predictions, Enum.shuffle(@schedules))

      for %PredictedSchedule{schedule: schedule, prediction: prediction} <-
            Enum.take(predicted_schedules, 3) do
        assert schedule.stop == prediction.stop
      end
    end

    test "does not pair when schedule trip is nil" do
      schedules_nil_trips = Enum.map(@schedules, &Map.replace!(&1, :trip, nil))
      predicted_schedules = group(@predictions, Enum.shuffle(schedules_nil_trips))

      # predictions have no schedules with trips to pair with
      for %PredictedSchedule{schedule: schedule, prediction: prediction} <- predicted_schedules,
          is_nil(schedule) do
        assert prediction.stop
        assert prediction.trip
      end

      # nil-trip schedules are paired with a nil prediction
      for %PredictedSchedule{schedule: schedule, prediction: prediction} <- predicted_schedules,
          is_nil(prediction) do
        assert schedule.stop
      end
    end

    test "works with the schedules returned from Dotcom.RealtimeSchedule" do
      predicted_condensed_schedules = group(@predictions, Enum.shuffle(@condensed_schedules))

      for %PredictedSchedule{schedule: schedule, prediction: prediction} <-
            Enum.take(predicted_condensed_schedules, 3) do
        assert prediction.stop.id == schedule.stop_id
      end
    end

    test "Schedules and Predictions with different stop_sequence values stay separated" do
      predictions = @predictions ++ Enum.map(@predictions, &%{&1 | stop_sequence: 5})
      schedules = @schedules ++ Enum.map(@schedules, &%{&1 | stop_sequence: 5})
      predicted_schedules = group(predictions, schedules)
      assert length(predicted_schedules) == length(schedules)

      for %PredictedSchedule{schedule: schedule, prediction: prediction} <- predicted_schedules,
          not is_nil(prediction) do
        assert schedule.stop == prediction.stop
        assert schedule.stop_sequence == prediction.stop_sequence
      end

      stop_sequences =
        for %PredictedSchedule{schedule: schedule} <- predicted_schedules,
            do: schedule.stop_sequence

      assert stop_sequences == Enum.sort(stop_sequences)
    end

    test "Condensed Schedules and Predictions with different stop_sequence values stay separated" do
      predictions = @predictions ++ Enum.map(@predictions, &%{&1 | stop_sequence: 5})

      schedules =
        @condensed_schedules ++ Enum.map(@condensed_schedules, &%{&1 | stop_sequence: 5})

      predicted_schedules = group(predictions, schedules)
      assert length(predicted_schedules) == length(schedules)

      for %PredictedSchedule{schedule: schedule, prediction: prediction} <- predicted_schedules,
          not is_nil(prediction) do
        assert schedule.stop_id == prediction.stop.id
        assert schedule.stop_sequence == prediction.stop_sequence
      end

      stop_sequences =
        for %PredictedSchedule{schedule: schedule} <- predicted_schedules,
            do: schedule.stop_sequence

      assert stop_sequences == Enum.sort(stop_sequences)
    end

    test "All schedules are returned" do
      predicted_schedules = group(@predictions, @schedules)
      assert Enum.map(predicted_schedules, & &1.schedule) == @schedules
      predicted_condensed_schedules = group(@predictions, @condensed_schedules)
      assert Enum.map(predicted_condensed_schedules, & &1.schedule) == @condensed_schedules
      schedules_nil_trips = Enum.map(@schedules, &Map.replace!(&1, :trip, nil))
      predicted_schedules_with_nil_trips = group(@predictions, schedules_nil_trips)
      # these are grouped differently, so just check if all schedules are present
      predicted_schedules_schedules = Enum.map(predicted_schedules_with_nil_trips, & &1.schedule)
      assert Enum.all?(schedules_nil_trips, &Enum.member?(predicted_schedules_schedules, &1))
    end

    test "PredictedSchedules are returned in order of ascending time" do
      predicted_schedules = group(Enum.shuffle(@predictions), Enum.shuffle(@schedules))
      assert Enum.map(predicted_schedules, & &1.schedule) == @schedules
    end

    test "Predictions without matching stops are still returned" do
      predicted_schedules = group(@non_matching_predictions, Enum.shuffle(@schedules))

      assert Enum.count(predicted_schedules) ==
               Enum.count(@non_matching_predictions) + Enum.count(@schedules)

      for %PredictedSchedule{schedule: schedule, prediction: _prediction} <-
            Enum.take(predicted_schedules, 2) do
        refute schedule
      end
    end

    test "PredictedSchedules are sorted with unmatched predictions first" do
      predicted_schedules = group(@non_matching_predictions, Enum.shuffle(@schedules))

      for %PredictedSchedule{schedule: schedule, prediction: prediction} <-
            Enum.take(predicted_schedules, 2) do
        refute schedule
        assert prediction
      end

      for %PredictedSchedule{schedule: schedule, prediction: _prediction} <-
            Enum.drop(predicted_schedules, 2) do
        assert schedule
      end
    end

    test "predicted_schedules are grouped according to trip id" do
      grouped_predicted_schedules = group(@trip_predictions, @trip_schedules)

      for %PredictedSchedule{schedule: schedule, prediction: prediction} <-
            grouped_predicted_schedules do
        assert schedule.trip.id == prediction.trip.id
      end
    end

    test "works with schedules without stop" do
      modified_trip_schedules =
        @trip_schedules
        |> Enum.map(fn schedule ->
          %Schedule{
            schedule
            | stop: nil
          }
        end)

      assert group(@trip_predictions, modified_trip_schedules)
    end

    test "returns empty in case of error" do
      assert group({:error, "error in predictions"}, {:error, "error in schedules"}) == []
    end
  end

  describe "stop/1" do
    test "Returns stop when schedule is available" do
      predicted_schedule = %PredictedSchedule{
        schedule: List.first(@schedules),
        prediction: List.first(@predictions)
      }

      assert stop(predicted_schedule).id == "first"
    end

    test "Returns stop when only prediction is available" do
      predicted_schedule = %PredictedSchedule{prediction: List.first(@predictions)}
      assert stop(predicted_schedule).id == "first"
    end
  end

  describe "route/1" do
    test "Returns route when schedule is available" do
      predicted_schedule = %PredictedSchedule{
        schedule: List.first(@schedules),
        prediction: List.first(@predictions)
      }

      assert route(predicted_schedule) == @route
    end

    test "Returns route when only prediction is available" do
      predicted_schedule = %PredictedSchedule{prediction: List.first(@predictions)}
      assert route(predicted_schedule) == @route
    end
  end

  describe "has_prediction?/1" do
    test "determines if PredictedSchedule has prediction" do
      with_prediction = %PredictedSchedule{
        schedule: List.first(@schedules),
        prediction: List.first(@predictions)
      }

      without_prediction = %PredictedSchedule{schedule: List.first(@schedules), prediction: nil}
      assert has_prediction?(with_prediction) == true
      assert has_prediction?(without_prediction) == false
    end
  end

  describe "time/1" do
    test "Predicted time is given if one is available" do
      predicted_schedule = %PredictedSchedule{
        schedule: List.first(@schedules),
        prediction: List.last(@predictions)
      }

      assert time(predicted_schedule) == List.last(@predictions).time
    end

    test "Scheduled time is used if no prediction present" do
      predicted_schedule = %PredictedSchedule{schedule: List.first(@schedules)}
      assert time(predicted_schedule) == List.first(@schedules).time
    end

    test "Scheduled time is used if the prediction is present but without a time" do
      schedule = List.first(@schedules)
      prediction = %{List.last(@predictions) | time: nil, schedule_relationship: :cancelled}
      predicted_schedule = %PredictedSchedule{schedule: schedule, prediction: prediction}
      assert time(predicted_schedule) == schedule.time
    end

    test "returns nil if there isn't a scheduled time or a predicted time" do
      prediction = %{List.last(@predictions) | time: nil, status: "Approaching"}
      predicted_schedule = %PredictedSchedule{prediction: prediction}
      assert time(predicted_schedule) == nil
    end
  end

  describe "status/1" do
    test "returns status if one is available" do
      predicted_schedule = %PredictedSchedule{prediction: %Prediction{status: "Boarding"}}
      assert PredictedSchedule.status(predicted_schedule) == "Boarding"
    end

    test "returns nil when status is not available" do
      refute PredictedSchedule.status(%PredictedSchedule{})
    end
  end

  describe "direction_id/1" do
    test "uses prediction if available" do
      predicted_schedule = %PredictedSchedule{prediction: %Prediction{direction_id: 1}}
      assert direction_id(predicted_schedule) == 1
    end

    test "uses schedule's trip if there's no prediction" do
      predicted_schedule = %PredictedSchedule{
        schedule: %Schedule{trip: %Schedules.Trip{direction_id: 0}}
      }

      assert direction_id(predicted_schedule) == 0
    end
  end

  describe "map_optional/4" do
    test "returns nil if predicted_schedule is nil" do
      assert map_optional(nil, [:schedule], &is_nil/1) == nil
    end

    test "returns nil with an empty PredictedSchedule" do
      assert map_optional(%PredictedSchedule{}, [:schedule], &is_nil/1) == nil
    end

    test "can return a different default" do
      assert map_optional(nil, [:schedule], :default, &is_nil/1) == :default
    end

    test "returns the first valid value, mapped" do
      prediction = %PredictedSchedule{prediction: List.first(@predictions)}
      schedule = %PredictedSchedule{schedule: List.first(@schedules)}

      both = %PredictedSchedule{
        schedule: List.first(@schedules),
        prediction: List.first(@predictions)
      }

      assert map_optional(prediction, [:schedule, :prediction], & &1) == prediction.prediction
      assert map_optional(schedule, [:prediction, :schedule], & &1) == schedule.schedule
      assert map_optional(both, [:schedule, :prediction], & &1) == both.schedule
      assert map_optional(both, [:prediction, :schedule], & &1) == both.prediction
      assert map_optional(both, [:prediction, :schedule], & &1.__struct__) == Prediction
    end
  end

  describe "delay/1" do
    @time ~N[2017-01-01T12:00:00]

    test "returns the difference between a schedule and prediction" do
      assert delay(%PredictedSchedule{
               schedule: %Schedule{time: @time},
               prediction: %Prediction{time: Timex.shift(@time, minutes: 14)}
             }) == 14
    end

    test "returns 0 if either time is nil, or if the argument itself is nil" do
      assert delay(%PredictedSchedule{
               schedule: nil,
               prediction: %Prediction{time: Timex.shift(@time, minutes: 14)}
             }) == 0

      assert delay(%PredictedSchedule{
               schedule: %Schedule{time: @time},
               prediction: %Prediction{}
             }) ==
               0

      assert delay(%PredictedSchedule{schedule: %Schedule{time: @time}, prediction: nil}) == 0
      assert delay(%PredictedSchedule{schedule: nil, prediction: nil}) == 0
      assert delay(nil) == 0
    end
  end

  describe "upcoming?/2" do
    test "determines if given predicted schedule occurs after given time" do
      early_schedule = %Schedule{time: Timex.shift(@base_time, minutes: -2)}
      early_prediction = %Prediction{time: Timex.shift(@base_time, minutes: -1)}
      late_schedule = %Schedule{time: Timex.shift(@base_time, minutes: 2)}
      late_prediction = %Prediction{time: Timex.shift(@base_time, minutes: 1)}

      assert upcoming?(
               %PredictedSchedule{schedule: late_schedule, prediction: late_prediction},
               @base_time
             )

      refute upcoming?(
               %PredictedSchedule{schedule: early_schedule, prediction: early_prediction},
               @base_time
             )

      assert upcoming?(
               %PredictedSchedule{schedule: early_schedule, prediction: late_prediction},
               @base_time
             )
    end

    test "departing? field is used if no time is available" do
      upcoming_prediction = %PredictedSchedule{
        prediction: %Prediction{time: nil, departing?: true}
      }

      past_prediction = %PredictedSchedule{prediction: %Prediction{time: nil, departing?: false}}
      assert upcoming?(upcoming_prediction, @base_time)
      refute upcoming?(past_prediction, @base_time)
    end
  end

  describe "departing?/1" do
    test "If schedule is given, determines departing status by pickup type" do
      schedule = %Schedule{pickup_type: 1}
      prediction = %Prediction{departing?: true}
      refute departing?(%PredictedSchedule{schedule: schedule, prediction: prediction})

      assert departing?(%PredictedSchedule{
               schedule: %{schedule | pickup_type: 2},
               prediction: prediction
             })
    end

    test "Prediction is used to determine departing status if no schedule is given" do
      refute departing?(%PredictedSchedule{prediction: %Prediction{departing?: false}})

      assert departing?(%PredictedSchedule{
               prediction: %Prediction{departing?: true},
               schedule: nil
             })
    end
  end
end
