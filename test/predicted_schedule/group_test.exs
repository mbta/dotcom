defmodule PredictedSchedule.GroupTest do
  use ExUnit.Case, async: true

  import PredictedSchedule.Group

  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.Schedule
  alias Schedules.Trip
  alias Stops.Stop

  describe "PredictedScheduleGroup.build_prediction_map" do
    test "makes prediction_map for just origin" do
      pred1 = %Prediction{stop: %Stop{id: "stop1"}, trip: %Trip{id: "trip1"}}
      pred2 = %Prediction{stop: %Stop{id: "stop1"}, trip: %Trip{id: "trip2"}}
      pred3 = %Prediction{stop: %Stop{id: "stop1"}, trip: %Trip{id: "trip3"}}

      sched1 = %Schedule{stop: %Stop{id: "stop1"}, trip: %Trip{id: "trip1"}}
      sched2 = %Schedule{stop: %Stop{id: "stop1"}, trip: %Trip{id: "trip2"}}

      result = build_prediction_map([pred1, pred2, pred3], [sched1, sched2], "stop1", nil)

      assert Kernel.map_size(result) == 3

      assert result[%Trip{id: "trip1"}] == %{"stop1" => pred1}
      assert result[%Trip{id: "trip2"}] == %{"stop1" => pred2}
      assert result[%Trip{id: "trip3"}] == %{"stop1" => pred3}
    end

    test "makes prediction_map with origin and destination matching on schedules" do
      pred1 = %Prediction{stop: %Stop{id: "dest1"}, trip: %Trip{id: "trip1"}}
      pred2 = %Prediction{stop: %Stop{id: "dest1"}, trip: %Trip{id: "trip2"}}
      pred3 = %Prediction{stop: %Stop{id: "dest1"}, trip: %Trip{id: "trip3"}}

      orig_sched1 = %Schedule{stop: %Stop{id: "orig1"}, trip: %Trip{id: "trip1"}}
      dest_sched1 = %Schedule{stop: %Stop{id: "dest1"}, trip: %Trip{id: "trip1"}}
      orig_sched2 = %Schedule{stop: %Stop{id: "orig1"}, trip: %Trip{id: "trip2"}}
      dest_sched2 = %Schedule{stop: %Stop{id: "dest1"}, trip: %Trip{id: "trip2"}}

      result =
        build_prediction_map(
          [pred1, pred2, pred3],
          [{orig_sched1, dest_sched1}, {orig_sched2, dest_sched2}],
          "orig1",
          "dest1"
        )

      assert Kernel.map_size(result) == 2

      assert result[%Trip{id: "trip1"}] == %{"dest1" => pred1}
      assert result[%Trip{id: "trip2"}] == %{"dest1" => pred2}
    end

    test "makes prediction_map matching on origin and destination" do
      pred1 = %Prediction{stop: %Stop{id: "orig1"}, trip: %Trip{id: "trip1"}}
      pred2 = %Prediction{stop: %Stop{id: "dest1"}, trip: %Trip{id: "trip1"}}
      pred3 = %Prediction{stop: %Stop{id: "dest1"}, trip: %Trip{id: "trip2"}}

      result = build_prediction_map([pred1, pred2, pred3], [], "orig1", "dest1")

      assert Kernel.map_size(result) == 1

      assert result[%Trip{id: "trip1"}] == %{"orig1" => pred1, "dest1" => pred2}
    end

    test "makes prediction_map with a different key if there's no trip" do
      prediction = %Prediction{stop: %Stop{id: "orig1"}, trip: nil, route: %Route{id: "route"}}

      result = build_prediction_map([prediction], [], "orig1", nil)

      assert Map.values(result) == [%{"orig1" => prediction}]
    end
  end
end
