defmodule Dotcom.ScheduleFinder.TripDetailsTest do
  use ExUnit.Case

  import Mox

  alias Test.Support.FactoryHelpers
  alias Test.Support.Factories
  alias Dotcom.ScheduleFinder.TripDetails

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Stops.Repo.Mock, :get, fn id ->
      Factories.Stops.Stop.build(:stop, id: id, parent_id: nil)
    end)

    stub(Vehicles.Repo.Mock, :trip, fn _ -> Factories.Vehicles.Vehicle.build(:vehicle) end)

    :ok
  end

  describe "trip_details/1" do
    test "maps predicted_schedules into TripDetails" do
      trip = Factories.Schedules.Trip.build(:trip)
      stop_ids = Faker.Util.sample_uniq(3, fn -> FactoryHelpers.build(:id) end)
      stop_names = Faker.Util.sample_uniq(3, fn -> Faker.Beer.brand() end)

      stops =
        stop_ids
        |> Enum.zip(stop_names)
        |> Enum.map(fn {id, name} -> Factories.Stops.Stop.build(:stop, id: id, name: name) end)

      predicted_schedules =
        stops
        |> Enum.map(
          &%PredictedSchedule{
            prediction: Factories.Predictions.Prediction.build(:prediction, trip: trip, stop: &1),
            schedule: Factories.Schedules.Schedule.build(:schedule, trip: trip, stop: &1)
          }
        )

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_id: trip.id
        })

      assert trip_details.stops |> Enum.map(& &1.stop_id) == stop_ids
      assert trip_details.stops |> Enum.map(& &1.stop_name) == stop_names
    end

    test "includes vehicle status and stop info" do
      stop = Factories.Stops.Stop.build(:stop, parent_id: nil)
      stop_id = stop.id
      expect(Stops.Repo.Mock, :get, fn ^stop_id -> stop end)

      predicted_schedules =
        1..3
        |> Enum.map(fn _ ->
          %PredictedSchedule{
            prediction: Factories.Predictions.Prediction.build(:prediction),
            schedule: Factories.Schedules.Schedule.build(:schedule)
          }
        end)

      trip_id = FactoryHelpers.build(:id)

      vehicle = Factories.Vehicles.Vehicle.build(:vehicle, stop_id: stop_id)
      stub(Vehicles.Repo.Mock, :trip, fn ^trip_id -> vehicle end)

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_id: trip_id
        })

      vehicle_info = trip_details.vehicle_info
      assert vehicle_info.status == vehicle.status
      assert vehicle_info.stop_id == stop_id
      assert vehicle_info.stop_name == stop.name
    end

    test "uses the parent stop id if available" do
      [child_stop_id, parent_stop_id] =
        Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      stop = Factories.Stops.Stop.build(:stop, id: child_stop_id, parent_id: parent_stop_id)

      expect(Stops.Repo.Mock, :get, fn ^child_stop_id -> stop end)

      predicted_schedules =
        1..3
        |> Enum.map(fn _ ->
          %PredictedSchedule{
            prediction: Factories.Predictions.Prediction.build(:prediction),
            schedule: Factories.Schedules.Schedule.build(:schedule)
          }
        end)

      trip_id = FactoryHelpers.build(:id)

      vehicle = Factories.Vehicles.Vehicle.build(:vehicle, stop_id: child_stop_id)
      stub(Vehicles.Repo.Mock, :trip, fn ^trip_id -> vehicle end)

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_id: trip_id
        })

      vehicle_info = trip_details.vehicle_info
      assert vehicle_info.status == vehicle.status
      assert vehicle_info.stop_id == parent_stop_id
      assert vehicle_info.stop_name == stop.name
    end
  end

  test "drops the first stop if the vehicle is currently stopped there" do
    trip = Factories.Schedules.Trip.build(:trip)

    stop_ids =
      [current_stop_id | future_stop_ids] =
      Faker.Util.sample_uniq(4, fn -> FactoryHelpers.build(:id) end)

    stop_names =
      [_current_stop_name | future_stop_names] =
      Faker.Util.sample_uniq(4, fn -> Faker.Beer.brand() end)

    stops =
      stop_ids
      |> Enum.zip(stop_names)
      |> Enum.map(fn {id, name} -> Factories.Stops.Stop.build(:stop, id: id, name: name) end)

    predicted_schedules =
      stops
      |> Enum.map(
        &%PredictedSchedule{
          prediction: Factories.Predictions.Prediction.build(:prediction, trip: trip, stop: &1),
          schedule: Factories.Schedules.Schedule.build(:schedule, trip: trip, stop: &1)
        }
      )

    trip_id = trip.id

    stub(Vehicles.Repo.Mock, :trip, fn ^trip_id ->
      Factories.Vehicles.Vehicle.build(:vehicle, status: :stopped, stop_id: current_stop_id)
    end)

    trip_details =
      TripDetails.trip_details(%{
        predicted_schedules: predicted_schedules,
        trip_id: trip_id
      })

    assert trip_details.stops |> Enum.map(& &1.stop_id) == future_stop_ids
    assert trip_details.stops |> Enum.map(& &1.stop_name) == future_stop_names
  end
end
