defmodule Test.Support.Factories.Schedules.Trip do
  @moduledoc """
  Generated fake data for %Schedules.Trip{}
  """

  use ExMachina

  alias Schedules.Trip
  alias Test.Support.FactoryHelpers

  def trip_factory do
    %Trip{
      id: FactoryHelpers.build(:id),
      direction_id: FactoryHelpers.build(:direction_id),
      name: Faker.App.name(),
      headsign: Faker.Address.city(),
      shape_id: FactoryHelpers.build(:id),
      route_pattern_id: FactoryHelpers.build(:id),
      occupancy:
        [:not_crowded, :some_crowding, :crowded]
        |> Faker.Util.pick()
        |> FactoryHelpers.nullable_item()
    }
  end
end
