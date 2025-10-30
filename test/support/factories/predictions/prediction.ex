defmodule Test.Support.Factories.Predictions.Prediction do
  @moduledoc """
  Generated fake data for %Predictions.Prediction{}
  """

  use ExMachina

  alias Predictions.Prediction
  alias Test.Support.Factories.{Routes.Route, Schedules.Trip, Stops.Stop}
  alias Test.Support.FactoryHelpers

  def prediction_factory do
    %Prediction{
      id: FactoryHelpers.build(:id),
      arrival_time: Timex.now() |> Timex.shift(minutes: 10),
      departure_time: Timex.now() |> Timex.shift(minutes: 15),
      direction_id: FactoryHelpers.build(:direction_id),
      platform_stop_id: FactoryHelpers.build(:nullable_id),
      route: Route.build(:route),
      schedule_relationship:
        Faker.Util.pick([:added, :unscheduled, :cancelled, :skipped, :no_data])
        |> FactoryHelpers.nullable_item(),
      stop: Stop.build(:stop),
      status: Faker.App.name() |> FactoryHelpers.nullable_item(),
      time: Faker.DateTime.forward(1),
      track: Faker.Util.digit() |> FactoryHelpers.nullable_item(),
      trip: Trip.build(:trip) |> FactoryHelpers.nullable_item(),
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
