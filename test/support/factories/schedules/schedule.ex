defmodule Test.Support.Factories.Schedules.Schedule do
  @moduledoc false
  use ExMachina

  import Test.Support.Generators.DateTime, only: [random_date_time: 0]

  alias Schedules.{Schedule, ScheduleCondensed}
  # credo:disable-for-lines:3 Credo.Check.Readability.AliasAs
  alias Test.Support.Factories.Routes.Route, as: RouteFactory
  alias Test.Support.Factories.Schedules.Trip, as: TripFactory
  alias Test.Support.Factories.Stops.Stop, as: StopFactory
  alias Test.Support.FactoryHelpers

  def schedule_factory do
    %Schedule{
      route: RouteFactory.build(:route),
      trip: TripFactory.build(:trip),
      stop: StopFactory.build(:stop),
      arrival_time: random_date_time() |> FactoryHelpers.nullable_item(),
      departure_time: random_date_time() |> FactoryHelpers.nullable_item(),
      time: random_date_time() |> FactoryHelpers.nullable_item(),
      stop_headsign: Faker.Address.city() |> FactoryHelpers.nullable_item(),
      platform_stop_id: FactoryHelpers.build(:id)
    }
  end

  def schedule_condensed_factory do
    %ScheduleCondensed{
      stop_id: FactoryHelpers.build(:id),
      time: random_date_time(),
      trip_id: FactoryHelpers.build(:id),
      route_pattern_id: FactoryHelpers.build(:id) |> FactoryHelpers.nullable_item(),
      stop_headsign: Faker.Address.city() |> FactoryHelpers.nullable_item(),
      headsign: Faker.Address.city()
    }
  end
end
