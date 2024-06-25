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
      trip: Trip.build(:trip) |> FactoryHelpers.nullable_item(),
      stop: Stop.build(:stop),
      platform_stop_id: FactoryHelpers.build(:nullable_id),
      route: Route.build(:route),
      vehicle_id: FactoryHelpers.build(:nullable_id),
      direction_id: FactoryHelpers.build(:direction_id),
      arrival_time: Faker.DateTime.forward(1),
      departure_time: Faker.DateTime.forward(1),
      time: Faker.DateTime.forward(1),
      schedule_relationship:
        Faker.Util.pick([:added, :unscheduled, :cancelled, :skipped, :no_data])
        |> FactoryHelpers.nullable_item(),
      track: Faker.Util.digit() |> FactoryHelpers.nullable_item()
    }
  end
end
