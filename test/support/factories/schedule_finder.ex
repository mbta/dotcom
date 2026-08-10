defmodule Test.Support.Factories.ScheduleFinder do
  @moduledoc """
  Module for generating outputs to the functions in Dotcom.ScheduleFinder
  """
  use ExMachina

  import Test.Support.Generators.DateTime, only: [random_date_time: 0]

  alias Dotcom.ScheduleFinder.DailyDeparture
  alias Test.Support.FactoryHelpers

  def daily_departure_factory do
    %DailyDeparture{
      headsign: Faker.Address.city() |> FactoryHelpers.nullable_item(),
      route: Test.Support.Factories.Routes.Route.build(:route),
      schedule_id: FactoryHelpers.build(:id),
      stop_sequence: Faker.random_between(0, 1000),
      time: random_date_time(),
      time_desc: Faker.Company.catch_phrase() |> FactoryHelpers.nullable_item(),
      trip_id: FactoryHelpers.build(:id),
      trip_name: Faker.App.name() |> FactoryHelpers.nullable_item()
    }
  end
end
