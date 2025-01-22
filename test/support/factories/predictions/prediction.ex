defmodule Test.Support.Factories.Predictions.Prediction do
  @moduledoc """
  Generated fake data for %Predictions.Prediction{}
  """

  use ExMachina

  alias Predictions.Prediction
  alias Test.Support.Factories.Routes.Route
  alias Test.Support.Factories.Schedules.Trip
  alias Test.Support.Factories.Stops.Stop
  alias Test.Support.FactoryHelpers

  def prediction_factory do
    %Prediction{
      id: FactoryHelpers.build(:id),
      arrival_time: Timex.shift(DateTime.utc_now(), minutes: 10),
      departure_time: Timex.shift(DateTime.utc_now(), minutes: 15),
      direction_id: FactoryHelpers.build(:direction_id),
      platform_stop_id: FactoryHelpers.build(:nullable_id),
      route: Route.build(:route),
      schedule_relationship:
        [:added, :unscheduled, :cancelled, :skipped, :no_data]
        |> Faker.Util.pick()
        |> FactoryHelpers.nullable_item(),
      stop: Stop.build(:stop),
      time: Faker.DateTime.forward(1),
      track: FactoryHelpers.nullable_item(Faker.Util.digit()),
      trip: :trip |> Trip.build() |> FactoryHelpers.nullable_item(),
      vehicle_id: FactoryHelpers.build(:nullable_id)
    }
  end

  @doc """
  A canonical prediction is one that should not be filtered out before being pushed to the client.

  1. If the route is a subway then the schedule relationship is not cancelled or skipped
  2. Has a departure time
  """
  def canonical_prediction_factory do
    route = Route.build(:route, id: Faker.Lorem.word(), type: 0)
    schedule_relationship = :added
    trip = Trip.build(:trip)

    build(:prediction, route: route, schedule_relationship: schedule_relationship, trip: trip)
  end
end
