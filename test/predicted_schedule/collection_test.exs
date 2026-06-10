defmodule PredictedSchedule.CollectionTest do
  use ExUnit.Case, async: true
  doctest PredictedSchedule.Collection

  import Mox

  alias PredictedSchedule.Collection
  alias Test.Support.Factories
  alias Test.Support.FactoryHelpers

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  describe "PredictedSchedule.Collection" do
    test "is empty if passed an empty list of schedules" do
      collection = Collection.new([])

      assert collection |> Collection.to_list() |> Enum.empty?()
    end

    test "starts out with a bunch of PredictedSchedules with no predictions" do
      # Setup
      schedules = build_schedules(2)

      # Exercise
      actual_predicted_schedule_list =
        schedules
        |> Collection.new()
        |> Collection.to_list()

      # Verify
      expected_predicted_schedule_list =
        schedules
        |> Enum.map(&%PredictedSchedule{schedule: &1, prediction: nil})

      assert MapSet.new(actual_predicted_schedule_list) ==
               MapSet.new(expected_predicted_schedule_list)
    end

    test "attaches a prediction to the right schedule" do
      # Setup
      schedules = [schedule | other_schedules] = build_schedules(2)
      prediction = build_prediction_from_schedule(schedule)

      # Exercise
      actual_predicted_schedule_list =
        schedules
        |> Collection.new()
        |> Collection.put_prediction(prediction)
        |> Collection.to_list()
        |> MapSet.new()

      # Verify
      expected_predicted_schedule_list =
        (other_schedules
         |> Enum.map(&%PredictedSchedule{schedule: &1, prediction: nil})) ++
          [%PredictedSchedule{schedule: schedule, prediction: prediction}]

      assert MapSet.new(actual_predicted_schedule_list) ==
               MapSet.new(expected_predicted_schedule_list)
    end

    test "removes a schedule-associated prediction and keeps the schedule intact" do
      # Setup
      schedules = [schedule | _] = build_schedules(2)
      prediction = build_prediction_from_schedule(schedule)

      # Exercise
      actual_predicted_schedule_list =
        schedules
        |> Collection.new()
        |> Collection.put_prediction(prediction)
        |> Collection.delete_prediction(prediction)
        |> Collection.to_list()
        |> MapSet.new()

      # Verify
      expected_predicted_schedule_list =
        schedules |> Enum.map(&%PredictedSchedule{schedule: &1, prediction: nil})

      assert MapSet.new(actual_predicted_schedule_list) ==
               MapSet.new(expected_predicted_schedule_list)
    end

    test "adds a PredictedSchedule with no schedule if a prediction doesn't correspond to a schedule" do
      # Setup
      [absent_schedule | schedules] = build_schedules(2)
      prediction = build_prediction_from_schedule(absent_schedule)

      # Exercise
      actual_predicted_schedule_list =
        schedules
        |> Collection.new()
        |> Collection.put_prediction(prediction)
        |> Collection.to_list()
        |> MapSet.new()

      # Verify
      expected_predicted_schedule_list =
        (schedules
         |> Enum.map(&%PredictedSchedule{schedule: &1, prediction: nil})) ++
          [%PredictedSchedule{schedule: nil, prediction: prediction}]

      assert MapSet.new(actual_predicted_schedule_list) ==
               MapSet.new(expected_predicted_schedule_list)
    end

    test "fully removes a PredictedSchedule with no schedule when removing the prediction" do
      # Setup
      [absent_schedule | schedules] = build_schedules(2)
      prediction = build_prediction_from_schedule(absent_schedule)

      # Exercise
      actual_predicted_schedule_list =
        schedules
        |> Collection.new()
        |> Collection.put_prediction(prediction)
        |> Collection.delete_prediction(prediction)
        |> Collection.to_list()
        |> MapSet.new()

      # Verify
      expected_predicted_schedule_list =
        schedules
        |> Enum.map(&%PredictedSchedule{schedule: &1, prediction: nil})

      assert MapSet.new(actual_predicted_schedule_list) ==
               MapSet.new(expected_predicted_schedule_list)
    end

    test "can clear the predictions" do
      # Setup
      [absent_schedule | schedules] = build_schedules(3)
      [regular_schedule, schedule_no_prediction] = schedules

      prediction_no_schedule = build_prediction_from_schedule(absent_schedule)
      regular_prediction = build_prediction_from_schedule(regular_schedule)

      # Exercise
      actual_predicted_schedule_list =
        schedules
        |> Collection.new()
        |> Collection.put_prediction(prediction_no_schedule)
        |> Collection.put_prediction(regular_prediction)
        |> Collection.clear_predictions()
        |> Collection.to_list()
        |> MapSet.new()

      # Verify
      expected_predicted_schedule_list =
        [
          %PredictedSchedule{schedule: regular_schedule, prediction: nil},
          %PredictedSchedule{schedule: schedule_no_prediction, prediction: nil}
        ]

      assert MapSet.new(actual_predicted_schedule_list) ==
               MapSet.new(expected_predicted_schedule_list)
    end

    test "can swap in a different set of schedules" do
      # Setup
      [old_schedule_1, old_schedule_2, new_schedule_1, new_schedule_2] = build_schedules(4)

      old_prediction = build_prediction_from_schedule(old_schedule_1)
      new_prediction = build_prediction_from_schedule(new_schedule_1)

      # Exercise
      actual_predicted_schedule_list =
        [old_schedule_1, old_schedule_2]
        |> Collection.new()
        |> Collection.put_prediction(old_prediction)
        |> Collection.put_prediction(new_prediction)
        |> Collection.update_schedules([new_schedule_1, new_schedule_2])
        |> Collection.to_list()
        |> MapSet.new()

      # Verify
      expected_predicted_schedule_list =
        [
          %PredictedSchedule{schedule: nil, prediction: old_prediction},
          %PredictedSchedule{schedule: new_schedule_1, prediction: new_prediction},
          %PredictedSchedule{schedule: new_schedule_2, prediction: nil}
        ]

      assert MapSet.new(actual_predicted_schedule_list) ==
               MapSet.new(expected_predicted_schedule_list)
    end
  end

  defp build_schedules(count) do
    Faker.Util.sample_uniq(count, fn ->
      {FactoryHelpers.build(:id), Faker.random_between(1, 10_000)}
    end)
    |> Enum.map(fn {trip_id, stop_sequence} ->
      Factories.Schedules.Schedule.build(:schedule,
        trip: Factories.Schedules.Trip.build(:trip, id: trip_id),
        stop_sequence: stop_sequence
      )
    end)
  end

  defp build_prediction_from_schedule(schedule) do
    Factories.Predictions.Prediction.build(:prediction,
      trip: schedule.trip,
      stop_sequence: schedule.stop_sequence
    )
  end
end
