defmodule JourneyListTest do
  use ExUnit.Case, async: true

  import JourneyList
  import Mox
  import Test.Support.Factories.Schedules.Schedule

  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop
  alias Test.Support.Factories.Stops.Stop, as: StopFactory
  alias Test.Support.Factories.Schedules.Trip, as: TripFactory

  setup :verify_on_exit!

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  @time ~N[2017-01-01T22:30:00]
  @route %Route{id: "86", type: 3, name: "86"}

  @sched_stop1_trip1__7_00 %Schedule{
    time: ~N[2017-01-01T07:00:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip1"}
  }

  @sched_stop1_trip2__8_00 %Schedule{
    time: ~N[2017-01-01T08:00:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip2"}
  }

  @sched_stop1_trip3__9_00 %Schedule{
    time: ~N[2017-01-01T09:00:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip3"}
  }

  @sched_stop2_trip2__8_15 %Schedule{
    time: ~N[2017-01-01T08:15:00],
    route: @route,
    stop: %Stop{id: "stop2"},
    trip: %Trip{id: "trip2"}
  }

  @sched_stop3_trip1__7_30 %Schedule{
    time: ~N[2017-01-01T07:30:00],
    route: @route,
    stop: %Stop{id: "stop3"},
    trip: %Trip{id: "trip1"}
  }

  @sched_stop3_trip2__8_30 %Schedule{
    time: ~N[2017-01-01T08:30:00],
    route: @route,
    stop: %Stop{id: "stop3"},
    trip: %Trip{id: "trip2"}
  }

  @sched_stop3_trip3__9_30 %Schedule{
    time: ~N[2017-01-01T09:30:00],
    route: @route,
    stop: %Stop{id: "stop3"},
    trip: %Trip{id: "trip3"}
  }

  @pred_stop1_trip2__8_05 %Prediction{
    time: ~N[2017-01-01T08:05:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip2"}
  }

  @pred_stop2_trip2__8_16 %Prediction{
    time: ~N[2017-01-01T08:16:00],
    route: @route,
    stop: %Stop{id: "stop2"},
    trip: %Trip{id: "trip2"}
  }

  @pred_stop3_trip2__8_32 %Prediction{
    time: ~N[2017-01-01T08:32:00],
    route: @route,
    stop: %Stop{id: "stop3"},
    trip: %Trip{id: "trip2"}
  }

  @pred_stop1_trip1__8_05 %Prediction{
    time: ~N[2017-01-01T08:05:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip1"}
  }

  @pred_stop1_trip2__8_16 %Prediction{
    time: ~N[2017-01-01T08:16:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip2"}
  }

  @pred_stop1_trip3__8_32 %Prediction{
    time: ~N[2017-01-01T08:32:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip3"}
  }

  @pred_stop1_trip4__8_35 %Prediction{
    time: ~N[2017-01-01T08:35:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip4"}
  }

  @pred_stop1_trip5__8_36 %Prediction{
    time: ~N[2017-01-01T08:36:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip5"}
  }

  @pred_stop1_trip6__8_37 %Prediction{
    time: ~N[2017-01-01T08:37:00],
    route: @route,
    stop: %Stop{id: "stop1"},
    trip: %Trip{id: "trip6"}
  }

  @pred_stop3_trip6__8_38 %Prediction{
    time: ~N[2017-01-01T08:38:00],
    route: @route,
    stop: %Stop{id: "stop3"},
    trip: %Trip{id: "trip6"}
  }

  # ------------------------------
  #         trip1 | trip2 | trip3
  # ------------------------------
  # stop1 | 7:00  | 8:00  | 9:00
  # stop2 |       | 8:15  |
  # stop3 |       |       |

  @origin_schedules [
    @sched_stop1_trip3__9_00,
    @sched_stop1_trip1__7_00,
    @sched_stop1_trip2__8_00,
    @sched_stop2_trip2__8_15
  ]

  # ------------------------------
  #         trip1 | trip2 | trip3
  # ------------------------------
  # stop1 | 7:00  | 8:00  | 9:00
  # stop2 |       |       |
  # stop3 | 7:30  | 8:30  | 9:30

  @od_schedules [
    {@sched_stop1_trip2__8_00, @sched_stop3_trip2__8_30},
    {@sched_stop1_trip1__7_00, @sched_stop3_trip1__7_30},
    {@sched_stop1_trip3__9_00, @sched_stop3_trip3__9_30}
  ]

  # ------------------------------
  #         trip1 | trip2 | trip3
  # ------------------------------
  # stop1 |       | 8:05  |
  # stop2 |       | 8:16  |
  # stop3 |       | 8:32  |

  # shuffled to make sure we aren't order dependent
  @predictions [
    @pred_stop1_trip2__8_05,
    @pred_stop3_trip2__8_32,
    @pred_stop2_trip2__8_16
  ]

  # -----------------------------------------------------
  #         trip1 | trip2 | trip3 | trip4 | trip5 | trip6
  # -----------------------------------------------------
  # stop1 | 8:05  | 8:16  | 8:32  | 8:35  | 8:36  | 8:37
  # stop2 |       |       |       |       |       |
  # stop3 |       |       |       |       |       | 8:38

  # shuffled to make sure we aren't order dependent
  @origin_destination_predictions [
    @pred_stop1_trip6__8_37,
    @pred_stop1_trip4__8_35,
    @pred_stop1_trip3__8_32,
    @pred_stop1_trip5__8_36,
    @pred_stop1_trip1__8_05,
    @pred_stop1_trip2__8_16,
    @pred_stop3_trip6__8_38
  ]

  describe "has_predictions?/1" do
    test "true when any of the journeys have a prediction" do
      for {schedules, origin_id, destination_id} <- [
            {@origin_schedules, "stop1", nil},
            {@od_schedules, "stop1", "stop2"},
            {@od_schedules, "stop1", "stop3"},
            {@od_schedules, "stop2", "stop3"}
          ] do
        optionals = [origin_id: origin_id, destination_id: destination_id, current_time: @time]

        assert schedules
               |> build(@predictions, :last_trip_and_upcoming, true, optionals)
               |> has_predictions?
      end
    end

    test "false when there are no predictions" do
      for {schedules, destination_id} <- [{@origin_schedules, nil}, {@od_schedules, "stop2"}] do
        optionals = [destination_id: destination_id, current_time: @time]

        refute schedules
               |> build([], :last_trip_and_upcoming, true, optionals)
               |> has_predictions?
      end
    end
  end

  describe "build/1 with no origin or destination" do
    test "returns no times" do
      journeys =
        build(@origin_schedules, @predictions, :last_trip_and_upcoming, true, current_time: @time)

      assert journeys == %JourneyList{}
    end
  end

  describe "build/1 with only origin" do
    test "returns Journeys at that origin sorted by time with predictions first" do
      # --------------------------------------------
      #         trip1   | trip2           | trip3
      # --------------------------------------------
      # stop1 | 7:00(s) | 8:00(s) 8:05(p) | 9:00(s)
      # stop2 |         | 8:15(s) 8:16(p) |
      # stop3 |         | 8:32(p)         |

      optionals = [origin_id: "stop1", current_time: @time]

      result =
        build(@origin_schedules, @predictions, :predictions_then_schedules, false, optionals)

      assert result == %JourneyList{
               expansion: :collapsed,
               journeys: [
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T08:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip2"}
                     },
                     prediction: %Prediction{
                       time: ~N[2017-01-01T08:05:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip2"}
                     }
                   },
                   trip: %Trip{id: "trip2"}
                 },
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T09:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip3"}
                     },
                     prediction: nil
                   },
                   trip: %Trip{id: "trip3"}
                 }
               ]
             }
    end

    test "includes predictions without scheduled departures" do
      prediction = %Prediction{
        time: ~N[2017-01-01T07:05:00],
        route: @route,
        stop: %Stop{id: "stop1"},
        trip: %Trip{id: "trip1"}
      }

      filtered_schedules = Enum.filter(@origin_schedules, &(&1.trip.id != "trip1"))
      optionals = [origin_id: "stop1", current_time: @time]

      result =
        build(
          filtered_schedules,
          [prediction | @predictions],
          :predictions_then_schedules,
          true,
          optionals
        )

      assert List.first(result.journeys) == %Journey{
               arrival: nil,
               departure: %PredictedSchedule{
                 schedule: nil,
                 prediction: prediction
               },
               trip: %Trip{id: "trip1"}
             }
    end

    test "when showing all, can return schedules before predictions" do
      optionals = [origin_id: "stop1", current_time: @time]
      result = build(@origin_schedules, @predictions, :last_trip_and_upcoming, true, optionals)

      assert List.first(result.journeys) == %Journey{
               trip: %Trip{id: "trip1"},
               departure: %PredictedSchedule{
                 schedule: %Schedule{
                   time: ~N[2017-01-01T07:00:00],
                   route: @route,
                   stop: %Stop{id: "stop1"},
                   trip: %Trip{id: "trip1"}
                 },
                 prediction: nil
               }
             }
    end

    test "removes all scheduled time before the last prediction" do
      prediction = %Prediction{
        time: ~N[2017-01-01T09:05:00],
        route: @route,
        stop: %Stop{id: "stop1"},
        trip: %Trip{id: "trip4"}
      }

      schedule = %Schedule{
        time: ~N[2017-01-01T10:00:00],
        route: @route,
        stop: %Stop{id: "stop1"},
        trip: %Trip{id: "trip5"}
      }

      optionals = [origin_id: "stop1", current_time: @time]
      schedules = [schedule | @origin_schedules]

      result =
        build(
          schedules,
          [prediction | @predictions],
          :predictions_then_schedules,
          false,
          optionals
        )

      assert result == %JourneyList{
               expansion: :collapsed,
               journeys: [
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T08:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip2"}
                     },
                     prediction: %Prediction{
                       time: ~N[2017-01-01T08:05:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip2"}
                     }
                   },
                   trip: %Trip{id: "trip2"}
                 },
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: nil,
                     prediction: %Prediction{
                       time: ~N[2017-01-01T09:05:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip4"}
                     }
                   },
                   trip: %Trip{id: "trip4"}
                 },
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T10:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip5"}
                     },
                     prediction: nil
                   },
                   trip: %Trip{id: "trip5"}
                 }
               ]
             }
    end

    test "matches predictions and schedules with the same trip/stop even if the route is different" do
      prediction = %Prediction{
        time: ~N[2017-01-01T09:05:00],
        route: @route,
        stop: %Stop{id: "stop1"},
        trip: %Trip{id: "trip4"}
      }

      schedule = %Schedule{
        time: ~N[2017-01-01T10:00:00],
        route: %{@route | id: "different_route_id"},
        stop: %Stop{id: "stop1"},
        trip: %Trip{id: "trip4"}
      }

      optionals = [origin_id: "stop1", current_time: @time]
      result = build([schedule], [prediction], :predictions_then_schedules, true, optionals)

      assert result == %JourneyList{
               journeys: [
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: schedule,
                     prediction: prediction
                   },
                   trip: %Trip{id: "trip4"}
                 }
               ]
             }
    end

    test "only leaves upcoming trips and one previous" do
      # ------------------------------
      #         trip1 | trip2 | trip3
      # ------------------------------
      # stop1 | 7:00  | 8:00  | 9:00
      # stop2 |       | 8:15  |
      # stop3 |       |       |

      optionals = [origin_id: "stop1", current_time: ~N[2017-01-01T08:30:00]]
      result = build(@origin_schedules, [], :last_trip_and_upcoming, false, optionals)

      assert result == %JourneyList{
               expansion: :collapsed,
               journeys: [
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T08:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip2"}
                     },
                     prediction: nil
                   },
                   trip: %Trip{id: "trip2"}
                 },
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T09:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip3"}
                     },
                     prediction: nil
                   },
                   trip: %Trip{id: "trip3"}
                 }
               ]
             }
    end

    test "without predictions, :predictions_then_schedules is the same as :last_trip_and_upcoming" do
      # ------------------------------
      #         trip1 | trip2 | trip3
      # ------------------------------
      # stop1 | 7:00  | 8:00  | 9:00
      # stop2 |       | 8:15  |
      # stop3 |       |       |

      optionals = [origin_id: "stop1", current_time: ~N[2017-01-01T08:30:00]]
      expected = build(@origin_schedules, [], :last_trip_and_upcoming, true, optionals)
      actual = build(@origin_schedules, [], :predictions_then_schedules, true, optionals)

      assert expected == actual
    end

    test "returns all trips if they are upcoming" do
      # ------------------------------
      #         trip1 | trip2 | trip3
      # ------------------------------
      # stop1 | 7:00  | 8:00  | 9:00
      # stop2 |       | 8:15  |
      # stop3 |       |       |

      optionals = [origin_id: "stop1", current_time: ~N[2017-01-01T06:30:00]]
      result = build(@origin_schedules, [], :last_trip_and_upcoming, true, optionals)

      assert result == %JourneyList{
               journeys: [
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T07:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip1"}
                     },
                     prediction: nil
                   },
                   trip: %Trip{id: "trip1"}
                 },
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T08:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip2"}
                     },
                     prediction: nil
                   },
                   trip: %Trip{id: "trip2"}
                 },
                 %Journey{
                   arrival: nil,
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T09:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip3"}
                     },
                     prediction: nil
                   },
                   trip: %Trip{id: "trip3"}
                 }
               ]
             }
    end

    test "returns all trips if they are all in the past" do
      # ------------------------------
      #         trip1 | trip2 | trip3
      # ------------------------------
      # stop1 | 7:00  | 8:00  | 9:00
      # stop2 |       | 8:15  |
      # stop3 |       |       |

      optionals = [origin_id: "stop1", current_time: ~N[2017-01-01T09:30:00]]
      expected = build(@origin_schedules, [], :last_trip_and_upcoming, true, optionals)
      actual = build(@origin_schedules, [], :last_trip_and_upcoming, true, optionals)

      assert actual == expected
    end

    test "if origin is in the trip twice, only use first for ferry" do
      # setup - two schedules on the same trip visiting the same stop
      stop = StopFactory.build(:stop)

      ferry_schedules =
        build_list(2, :schedule,
          stop: stop,
          trip: TripFactory.build(:trip)
        )

      %JourneyList{journeys: journeys} =
        build(ferry_schedules, [], :predictions_then_schedules, true,
          origin_id: stop.id,
          current_time: @time
        )

      refute Enum.count(journeys) == Enum.count(ferry_schedules)
      assert Enum.count(journeys) == 1
    end
  end

  describe "build/1 with origin and destination" do
    test "with origin and destination provided, returns Journeys with arrivals and departures" do
      # --------------------------------------------
      #         trip1   | trip2           | trip3
      # --------------------------------------------
      # stop1 | 7:00(s) | 8:00(s) 8:05(p) | 9:00(s)
      # stop2 |         | 8:16(p)         |
      # stop3 | 7:30(s) | 8:30(s) 8:32(p) | 9:30(s)

      optionals = [origin_id: "stop1", destination_id: "stop3", current_time: @time]
      result = build(@od_schedules, @predictions, :predictions_then_schedules, false, optionals)

      assert result == %JourneyList{
               expansion: :collapsed,
               journeys: [
                 %Journey{
                   arrival: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T08:30:00],
                       route: @route,
                       stop: %Stop{id: "stop3"},
                       trip: %Trip{id: "trip2"}
                     },
                     prediction: %Prediction{
                       time: ~N[2017-01-01T08:32:00],
                       route: @route,
                       stop: %Stop{id: "stop3"},
                       trip: %Trip{id: "trip2"}
                     }
                   },
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T08:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip2"}
                     },
                     prediction: %Prediction{
                       time: ~N[2017-01-01T08:05:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip2"}
                     }
                   },
                   trip: %Trip{id: "trip2"}
                 },
                 %Journey{
                   arrival: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T09:30:00],
                       route: @route,
                       stop: %Stop{id: "stop3"},
                       trip: %Trip{id: "trip3"}
                     },
                     prediction: nil
                   },
                   departure: %PredictedSchedule{
                     schedule: %Schedule{
                       time: ~N[2017-01-01T09:00:00],
                       route: @route,
                       stop: %Stop{id: "stop1"},
                       trip: %Trip{id: "trip3"}
                     },
                     prediction: nil
                   },
                   trip: %Trip{id: "trip3"}
                 }
               ]
             }
    end

    test "includes arrival predictions without corresponding departure predictions" do
      orig_sched = %Schedule{
        time: ~N[2017-01-01T06:10:00],
        route: @route,
        stop: %Stop{id: "stop1"},
        trip: %Trip{id: "t_new"}
      }

      dest_sched = %Schedule{
        time: ~N[2017-01-01T06:30:00],
        route: @route,
        stop: %Stop{id: "stop3"},
        trip: %Trip{id: "t_new"}
      }

      schedule_pair = {orig_sched, dest_sched}

      prediction = %Prediction{
        time: ~N[2017-01-01T07:31:00],
        route: @route,
        stop: %Stop{id: "stop3"},
        trip: %Trip{id: "t_new"}
      }

      # --------------------------------------------------
      #         trip1   | trip2           | trip3 | t_new
      # --------------------------------------------------
      # stop1 | 7:00(s) | 8:00(s) 8:05(p) | 9:00  | 6:10(s)
      # stop2 |         | 8:16(p)         |       |
      # stop3 | 7:30(s) | 8:30(s) 8:32(p) | 9:30  | 6:30(s) 7:31(p)

      optionals = [
        origin_id: "stop1",
        destination_id: "stop3",
        current_time: ~N[2017-01-01T06:15:00]
      ]

      result =
        build(
          [schedule_pair | @od_schedules],
          [prediction | @predictions],
          :last_trip_and_upcoming,
          true,
          optionals
        )

      journey = hd(result.journeys)

      assert journey == %Journey{
               departure: %PredictedSchedule{schedule: orig_sched, prediction: nil},
               arrival: %PredictedSchedule{schedule: dest_sched, prediction: prediction},
               trip: %Schedules.Trip{id: "t_new"}
             }
    end

    test "when trips are cancelled, returns the schedules with those cancel predictions" do
      cancel_stop1_trip2 = %{
        @pred_stop1_trip2__8_16
        | time: nil,
          schedule_relationship: :cancelled
      }

      cancel_stop3_trip2 = %{
        @pred_stop3_trip2__8_32
        | time: nil,
          schedule_relationship: :cancelled
      }

      # cancellations for the right stops, but a trip going the other direction
      cancel_stop1_trip6 = %{
        @pred_stop1_trip6__8_37
        | time: nil,
          schedule_relationship: :cancelled,
          direction_id: 1
      }

      cancel_stop3_trip6 = %{
        @pred_stop3_trip6__8_38
        | time: nil,
          schedule_relationship: :cancelled,
          direction_id: 1
      }

      predictions = [
        cancel_stop3_trip6,
        cancel_stop1_trip6,
        cancel_stop3_trip2,
        cancel_stop1_trip2
      ]

      optionals = [
        origin_id: "stop1",
        destination_id: "stop3",
        current_time: ~N[2017-01-01T08:00:00]
      ]

      result = build(@od_schedules, predictions, :last_trip_and_upcoming, true, optionals)
      # should be trip 2
      journey = Enum.at(result.journeys, 1)

      assert PredictedSchedule.trip(journey.departure) == %Trip{id: "trip2"}
      assert journey.departure.prediction == cancel_stop1_trip2
      assert journey.arrival.prediction == cancel_stop3_trip2
    end

    test "when showing all, can return schedules before predictions" do
      optionals = [origin_id: "stop1", destination_id: "stop3", current_time: @time]
      result = build(@od_schedules, @predictions, :last_trip_and_upcoming, true, optionals)

      assert List.first(result.journeys) == %Journey{
               trip: %Trip{id: "trip1"},
               departure: %PredictedSchedule{
                 schedule: %Schedule{
                   time: ~N[2017-01-01T07:00:00],
                   route: @route,
                   stop: %Stop{id: "stop1"},
                   trip: %Trip{id: "trip1"}
                 },
                 prediction: nil
               },
               arrival: %PredictedSchedule{
                 schedule: %Schedule{
                   time: ~N[2017-01-01T07:30:00],
                   route: @route,
                   stop: %Stop{id: "stop3"},
                   trip: %Trip{id: "trip1"}
                 },
                 prediction: nil
               }
             }
    end

    test "excludes Journeys where there's no departure time" do
      predictions = [
        %{@pred_stop1_trip2__8_16 | time: nil, schedule_relationship: :skipped},
        @pred_stop3_trip2__8_32
      ]

      optionals = [origin_id: "stop1", destination_id: "stop3", current_time: @time]
      result = build([], predictions, :last_trip_and_upcoming, true, optionals)
      assert result.journeys == []
    end
  end

  describe "build_predictions_only/4" do
    test "Results contain no schedules for origin" do
      result = build_predictions_only([], @origin_destination_predictions, "stop1", nil).journeys
      assert length(result) == 5

      for journey <- result do
        assert %Journey{departure: %PredictedSchedule{schedule: nil}, arrival: nil} = journey
      end
    end

    test "Results contain the first 5 predictions regardless of original order" do
      # trip needs to have a headsign to trigger bug
      early_prediction = %Prediction{
        trip: %Trip{id: "trip0", headsign: "other"},
        route: @route,
        stop: %Stop{id: "stop1"},
        time: ~N[2017-01-01T00:00:00]
      }

      result =
        build_predictions_only(
          [],
          @origin_destination_predictions ++ [early_prediction],
          "stop1",
          nil
        ).journeys

      assert List.first(result).departure.prediction == early_prediction
    end

    test "Results contain no schedules for origin and destination" do
      # -----------------------------------------------------
      #         trip1 | trip2 | trip3 | trip4 | trip5 | trip6
      # -----------------------------------------------------
      # stop1 | 8:05  | 8:16  | 8:32  | 8:35  | 8:36  | 8:37
      # stop2 |       |       |       |       |       |
      # stop3 |       |       |       |       |       | 8:38

      result =
        build_predictions_only([], @origin_destination_predictions, "stop1", "stop3").journeys

      assert length(result) == 1

      journey = hd(result)

      assert journey.trip.id == "trip6"
      refute journey.departure.schedule
      refute journey.arrival.schedule
    end

    test "All times have departure predictions" do
      # -----------------------------------------------------
      #         trip1 | trip2 | trip3 | trip4 | trip5 | trip6
      # -----------------------------------------------------
      # stop1 | 8:05  | 8:16  | 8:32  | 8:35  | 8:36  | 8:37
      # stop2 |       |       |       |       |       |
      # stop3 |       |       |       |       |       | 8:38

      result =
        build_predictions_only([], @origin_destination_predictions, "stop1", "stop3").journeys

      assert length(result) == 1

      journey = hd(result)
      assert journey.trip.id == "trip6"
      assert journey.departure.prediction != nil
    end

    test "uses an arrival schedule if present and does not set a prediction" do
      departure_prediction = @pred_stop1_trip2__8_16
      arrival_schedule = {@sched_stop1_trip2__8_00, @sched_stop3_trip2__8_30}

      result =
        build_predictions_only([arrival_schedule], [departure_prediction], "stop1", "stop3").journeys

      assert [journey] = result
      assert journey.trip.id == "trip2"
      assert journey.departure.schedule
      assert journey.departure.prediction
      assert journey.arrival.schedule
      refute journey.arrival.prediction
    end

    test "uses an arrival prediction if present with a schedule" do
      departure_prediction = @pred_stop1_trip2__8_16
      arrival_prediction = @pred_stop3_trip2__8_32
      arrival_schedule = {@sched_stop1_trip2__8_00, @sched_stop3_trip2__8_30}

      result =
        build_predictions_only(
          [arrival_schedule],
          [departure_prediction, arrival_prediction],
          "stop1",
          "stop3"
        ).journeys

      assert [journey] = result
      assert journey.trip.id == "trip2"
      assert journey.departure.schedule
      assert journey.departure.prediction
      assert journey.arrival.schedule
      assert journey.arrival.prediction
    end

    test "does not use schedules if there are no predictions" do
      result = build_predictions_only([@sched_stop3_trip2__8_30], [], "stop3", nil).journeys

      assert result == []
    end

    test "handles predictions not associated with a trip" do
      prediction = %Prediction{
        id: "pred",
        time: Util.now(),
        route: @route,
        stop: %Stop{id: "stop1"},
        trip: nil
      }

      result = build_predictions_only([], [prediction], "stop1", nil)

      assert result == %JourneyList{
               journeys: [
                 %Journey{
                   trip: nil,
                   departure: %PredictedSchedule{
                     schedule: nil,
                     prediction: prediction
                   }
                 }
               ]
             }
    end

    test "handles predictions not associated with a trip on different routes" do
      stop = %Stop{id: "stop1"}

      prediction = %Prediction{
        id: "pred",
        route: @route,
        stop: stop,
        status: "2 stops away",
        time: Util.now() |> Timex.shift(minutes: 15)
      }

      other_prediction = %Prediction{
        id: "other pred",
        route: %Route{id: "other"},
        stop: stop,
        status: "1 stop away",
        time: Util.now() |> Timex.shift(minutes: 7)
      }

      result =
        build_predictions_only([], [prediction, other_prediction] |> Enum.shuffle(), "stop1", nil)

      assert [
               %Journey{trip: nil, departure: %PredictedSchedule{prediction: ^other_prediction}},
               %Journey{trip: nil, departure: %PredictedSchedule{prediction: ^prediction}}
             ] = result.journeys
    end

    test "ignores predictions where arrival is before departure" do
      prediction = %Prediction{
        time: ~N[2017-01-01T12:00:00],
        route: @route,
        stop: %Stop{id: "stop1"},
        trip: %Trip{id: "trip1"}
      }

      arrival_prediction = %{prediction | time: ~N[2016-12-31T12:00:00], stop: %Stop{id: "stop3"}}
      predictions = [prediction, arrival_prediction]
      result = build_predictions_only([], predictions, "stop1", "stop3")
      assert result.journeys == []
    end
  end

  describe "reduce/3" do
    test "reducing the JourneyList is the same as reducing the list of journeys on it" do
      optionals = [origin_id: "stop1", destination_id: "stop3", current_time: @time]

      journey_list =
        build(@od_schedules, @predictions, :predictions_then_schedules, false, optionals)

      assert Enum.reduce(journey_list, [], fn time, list -> [time.arrival | list] end) ==
               Enum.reduce(journey_list.journeys, [], fn time, list -> [time.arrival | list] end)
    end
  end
end
