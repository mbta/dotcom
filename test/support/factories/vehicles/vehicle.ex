defmodule Test.Support.Factories.Vehicles.Vehicle do
  @moduledoc """
  Generated fake data for %Vehicles.Vehicle{}
  """

  use ExMachina

  alias Test.Support.FactoryHelpers
  alias Vehicles.Vehicle

  def vehicle_factory do
    %Vehicle{
      id: FactoryHelpers.build(:id),
      direction_id: Faker.Util.pick([0, 1]),
      status: Faker.Util.pick([:in_transit, :stopped, :incoming]),
      stop_id: FactoryHelpers.build(:id),
      trip_id: FactoryHelpers.build(:id)
    }
  end
end
