defmodule PredictedSchedule.FilterTest do
  use ExUnit.Case, async: true

  import PredictedSchedule.Filter
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop

  describe "by_route_with_predictions/4" do
    test "does not remove schedules without predictions for commuter rail, bus, or ferry" do
      now = DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")

      for type <- 2..4 do
        route = %Route{id: "route", type: type}
        stop = %Stop{id: "stop"}
        trip = %Trip{direction_id: 0}

        schedule = %PredictedSchedule{
          schedule: %Schedule{route: route, stop: stop, trip: trip},
          prediction: nil
        }

        assert by_route_with_predictions([schedule], route, stop.id, now) == [
                 schedule
               ]
      end
    end

    test "filters schedules without predictions for subway if predictions exist" do
      now = DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
      prediction_time = DateTime.from_naive!(~N[2019-02-27T12:05:00], "Etc/UTC")

      for type <- [0, 1] do
        route = %Route{id: "route", type: type}
        stop = %Stop{id: "stop"}
        trip_1 = %Trip{direction_id: 0, id: "trip-1"}
        trip_2 = %Trip{direction_id: 0, id: "trip-2"}

        schedule_1 = %PredictedSchedule{
          schedule: %Schedule{route: route, stop: stop, trip: trip_1},
          prediction: %Prediction{route: route, stop: stop, trip: trip_1, time: prediction_time}
        }

        schedule_2 = %PredictedSchedule{
          schedule: %Schedule{route: route, stop: stop, trip: trip_2},
          prediction: nil
        }

        assert by_route_with_predictions(
                 [schedule_1, schedule_2],
                 route,
                 stop.id,
                 now
               ) ==
                 [schedule_1]
      end
    end

    test "returns empty list for subway if no predictions during normal hours" do
      now = DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")

      for type <- [0, 1] do
        route = %Route{id: "route", type: type}
        stop = %Stop{id: "stop"}
        trip = %Trip{direction_id: 0}
        schedule = %PredictedSchedule{schedule: %Schedule{route: route, stop: stop, trip: trip}}

        assert by_route_with_predictions([schedule], route, stop.id, now) == []
      end
    end

    test "returns schedules for subway if no predictions during late night" do
      now = DateTime.from_naive!(~N[2019-02-27T02:00:00], "Etc/UTC")

      for type <- [0, 1] do
        route = %Route{id: "route", type: type}
        stop = %Stop{id: "stop"}
        trip = %Trip{direction_id: 0}

        schedule = %PredictedSchedule{
          schedule: %Schedule{route: route, stop: stop, trip: trip}
        }

        assert by_route_with_predictions([schedule], route, stop.id, now) == [
                 schedule
               ]
      end
    end
  end

  describe "late_night?/1" do
    test "returns true between midnight and 3:00am" do
      {:ok, midnight} = DateTime.from_naive(~N[2019-02-22T00:00:00], "Etc/UTC")
      assert DateTime.to_time(midnight) == ~T[00:00:00]
      # assert Time.compare(~T[03:00:00], midnight |> DateTime.to_time()) == :eq
      assert midnight.hour === 0
      assert late_night?(midnight) == true

      {:ok, one_thirty} = DateTime.from_naive(~N[2019-02-22T01:30:00], "Etc/UTC")
      assert one_thirty.hour === 1
      assert late_night?(one_thirty) == true

      {:ok, two_fifty_nine} = DateTime.from_naive(~N[2019-02-22T02:59:00], "Etc/UTC")
      assert two_fifty_nine.hour === 2
      assert late_night?(two_fifty_nine) == true

      {:ok, three_am} = DateTime.from_naive(~N[2019-02-22T03:00:00], "Etc/UTC")
      assert three_am.hour === 3
      assert late_night?(three_am) == false
    end
  end

  # describe "by_route_with_prediction_or_schedule/2" do
  #   @predicted_schedule %PredictedSchedule{
  #     schedule: %Schedule{time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")}
  #   }

  #   @time_data_with_prediction %{
  #     delay: 0,
  #     prediction: %{status: nil, time: ["5", " ", "min"], track: nil},
  #     scheduled_time: ["3:50", " ", "PM"]
  #   }

  #   @time_data_without_prediction %{
  #     delay: 0,
  #     prediction: nil,
  #     scheduled_time: ["3:50", " ", "PM"]
  #   }

  #   test "at least 1 result contains a prediction, up to 2 predictions are returned" do
  #     enhanced_predicted_schedules = [
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_without_prediction,
  #         crowding: nil
  #       },
  #       %{
  #         predicted_schedule: %{
  #           @predicted_schedule
  #           | prediction: %Prediction{
  #               time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
  #             }
  #         },
  #         time_data: @time_data_with_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: %{
  #           @predicted_schedule
  #           | prediction: %Prediction{
  #               time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
  #             }
  #         },
  #         time_data: @time_data_with_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: %{
  #           @predicted_schedule
  #           | prediction: %Prediction{
  #               time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
  #             }
  #         },
  #         time_data: @time_data_with_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_without_prediction,
  #         crowding: nil
  #       }
  #     ]

  #     assert [
  #              enhanced_predicted_schedule1,
  #              enhanced_predicted_schedule2
  #            ] =
  #              by_route_with_prediction_or_schedule(
  #                enhanced_predicted_schedules,
  #                %Route{type: 3}
  #              )

  #     assert enhanced_predicted_schedule1.time_data.prediction != nil
  #     assert enhanced_predicted_schedule2.time_data.prediction != nil
  #   end

  #   test "1 result contains a prediction, only 1 prediction is returned if rest are schedules" do
  #     enhanced_predicted_schedules = [
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_without_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: %{
  #           @predicted_schedule
  #           | prediction: %Prediction{
  #               time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
  #             }
  #         },
  #         time_data: @time_data_with_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_with_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_with_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_without_prediction,
  #         crowding: :not_crowded
  #       }
  #     ]

  #     assert [
  #              enhanced_predicted_schedule
  #            ] =
  #              by_route_with_prediction_or_schedule(
  #                enhanced_predicted_schedules,
  #                %Route{type: 3}
  #              )

  #     assert enhanced_predicted_schedule.time_data.prediction != nil
  #   end

  #   test "no results contains a prediction, only return 1 schedule" do
  #     enhanced_predicted_schedules = [
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_without_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_without_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_without_prediction,
  #         crowding: :not_crowded
  #       },
  #       %{
  #         predicted_schedule: @predicted_schedule,
  #         time_data: @time_data_without_prediction,
  #         crowding: :not_crowded
  #       }
  #     ]

  #     assert [enhanced_predicted_schedule] =
  #              by_route_with_prediction_or_schedule(
  #                enhanced_predicted_schedules,
  #                %Route{type: 3}
  #              )

  #     assert enhanced_predicted_schedule.time_data.prediction == nil
  #   end
  # end
end
