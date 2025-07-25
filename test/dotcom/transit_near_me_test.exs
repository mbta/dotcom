defmodule Dotcom.TransitNearMeTest do
  use ExUnit.Case, async: true

  import Mox

  alias Dotcom.TransitNearMe
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop

  setup :verify_on_exit!

  describe "simple_prediction/2" do
    @now Util.now()

    test "returns nil if no prediction" do
      assert nil == TransitNearMe.simple_prediction(nil, :commuter_rail, @now)
    end

    test "returns up to three keys if a prediction is available" do
      assert %{time: _, track: _, status: _} =
               TransitNearMe.simple_prediction(
                 %Prediction{time: Util.now(), track: 1, status: "On time"},
                 :commuter_rail,
                 @now
               )
    end

    test "returns a AM/PM time for CR" do
      [time, _, am_pm] =
        TransitNearMe.simple_prediction(%Prediction{time: Util.now()}, :commuter_rail, @now).time

      assert time =~ ~r/\d{1,2}:\d\d/
      assert am_pm =~ ~r/(AM|PM)/
    end

    test "returns a time difference for modes other than CR" do
      assert [_, _, "min"] =
               TransitNearMe.simple_prediction(
                 %Prediction{time: Timex.shift(Util.now(), minutes: 5)},
                 :subway,
                 @now
               ).time
    end
  end

  describe "late_night?/1" do
    test "returns true between midnight and 3:00am" do
      {:ok, midnight} = DateTime.from_naive(~N[2019-02-22T00:00:00], "Etc/UTC")
      assert DateTime.to_time(midnight) == ~T[00:00:00]
      # assert Time.compare(~T[03:00:00], midnight |> DateTime.to_time()) == :eq
      assert midnight.hour === 0
      assert TransitNearMe.late_night?(midnight) == true

      {:ok, one_thirty} = DateTime.from_naive(~N[2019-02-22T01:30:00], "Etc/UTC")
      assert one_thirty.hour === 1
      assert TransitNearMe.late_night?(one_thirty) == true

      {:ok, two_fifty_nine} = DateTime.from_naive(~N[2019-02-22T02:59:00], "Etc/UTC")
      assert two_fifty_nine.hour === 2
      assert TransitNearMe.late_night?(two_fifty_nine) == true

      {:ok, three_am} = DateTime.from_naive(~N[2019-02-22T03:00:00], "Etc/UTC")
      assert three_am.hour === 3
      assert TransitNearMe.late_night?(three_am) == false
    end
  end

  @trips %{
    "trip-1" => %Trip{
      id: "trip-1",
      headsign: "Headsign 1",
      shape_id: "shape-id",
      direction_id: 0
    },
    "trip-2" => %Trip{
      id: "trip-2",
      headsign: "Headsign 2",
      shape_id: "shape-id",
      direction_id: 0
    },
    "trip-3" => %Trip{
      id: "trip-3",
      headsign: "Headsign 1",
      shape_id: "shape-id",
      direction_id: 0
    },
    "trip-4" => %Trip{
      id: "trip-4",
      headsign: "Headsign 2",
      shape_id: "shape-id",
      direction_id: 0
    }
  }

  describe "build_direction_map/2" do
    test "returns schedules and predictions for non-subway routes" do
      stop = %Stop{id: "stop"}
      stub(Stops.Repo.Mock, :get_parent, fn _ -> stop end)

      route = %Route{
        id: "route",
        type: 2,
        direction_destinations: %{0 => "First Stop", 1 => "Last Stop"}
      }

      time = DateTime.from_naive!(~N[2019-02-21T12:00:00], "Etc/UTC")

      schedules =
        Enum.map(
          1..4,
          &%PredictedSchedule{
            schedule: %Schedule{
              route: route,
              stop: stop,
              time: time,
              trip: Map.get(@trips, "trip-#{&1}")
            },
            prediction: %Prediction{
              route: route,
              stop: stop,
              time: time,
              trip: Map.get(@trips, "trip-#{&1}")
            }
          }
        )

      assert {%DateTime{}, output} =
               TransitNearMe.build_direction_map(
                 {0, schedules},
                 now: time
               )

      assert output.direction_id == 0

      assert Enum.count(output.headsigns) === 2

      for headsign <- output.headsigns do
        assert Enum.count(headsign.times) === TransitNearMe.schedule_count(route)

        for %{scheduled_time: sched} <- headsign.times do
          assert sched === ["12:00", " ", "PM"]
        end
      end
    end

    test "only uses predictions for subway routes" do
      stop = %Stops.Stop{id: "stop"}
      stub(Stops.Repo.Mock, :get_parent, fn _ -> stop end)

      route = %Route{
        id: "route",
        type: 1,
        direction_destinations: %{0 => "First Stop", 1 => "Last Stop"}
      }

      time = DateTime.from_naive!(~N[2019-02-21T12:00:00], "Etc/UTC")

      schedules =
        Enum.map(
          1..4,
          &%PredictedSchedule{
            prediction: %Prediction{
              stop: stop,
              route: route,
              trip: Map.get(@trips, "trip-#{&1}"),
              time: time
            },
            schedule: %Schedule{
              stop: stop,
              route: route,
              trip: Map.get(@trips, "trip-#{&1}"),
              time: time
            }
          }
        )

      assert {%DateTime{}, output} =
               TransitNearMe.build_direction_map(
                 {0, schedules},
                 now: time
               )

      assert output.direction_id == 0

      assert Enum.count(output.headsigns) === 2

      for headsign <- output.headsigns do
        assert Enum.count(headsign.times) === TransitNearMe.schedule_count(route)

        for %{scheduled_time: sched} <- headsign.times do
          assert sched === ["12:00", " ", "PM"]
        end
      end
    end
  end

  describe "filter_predicted_schedules/4" do
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

        assert TransitNearMe.filter_predicted_schedules([schedule], route, stop.id, now) == [
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

        assert TransitNearMe.filter_predicted_schedules(
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

        assert TransitNearMe.filter_predicted_schedules([schedule], route, stop.id, now) == []
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

        assert TransitNearMe.filter_predicted_schedules([schedule], route, stop.id, now) == [
                 schedule
               ]
      end
    end
  end

  describe "filter_headsign_schedules/2" do
    @predicted_schedule %PredictedSchedule{
      schedule: %Schedule{time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")}
    }

    @time_data_with_prediction %{
      delay: 0,
      prediction: %{status: nil, time: ["5", " ", "min"], track: nil},
      scheduled_time: ["3:50", " ", "PM"]
    }

    @time_data_without_prediction %{
      delay: 0,
      prediction: nil,
      scheduled_time: ["3:50", " ", "PM"]
    }

    test "result contains a prediction, one result returned" do
      schedules = [
        {@predicted_schedule, @time_data_without_prediction},
        {
          %{
            @predicted_schedule
            | prediction: %Prediction{
                time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
              }
          },
          @time_data_with_prediction
        },
        {@predicted_schedule, @time_data_without_prediction},
        {@predicted_schedule, @time_data_without_prediction}
      ]

      assert [{_predicted_schedule, time_data}] =
               TransitNearMe.filter_headsign_schedules(schedules, %Route{type: 3})

      assert time_data.prediction != nil
    end

    test "neither result contains a prediction" do
      schedules = [
        {@predicted_schedule, @time_data_without_prediction},
        {@predicted_schedule, @time_data_without_prediction},
        {@predicted_schedule, @time_data_without_prediction},
        {@predicted_schedule, @time_data_without_prediction}
      ]

      assert [{_predicted_schedule, time_data}] =
               TransitNearMe.filter_headsign_schedules(schedules, %Route{type: 3})

      assert time_data.prediction == nil
    end
  end
end
