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
  end
end
