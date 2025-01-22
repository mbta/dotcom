defmodule Test.Support.Factories.Alerts.InformedEntity do
  @moduledoc """
  Generated fake data for %Alerts.InformedEntity{}
  """

  use ExMachina

  alias Alerts.InformedEntity

  def informed_entity_factory do
    %InformedEntity{
      activities: Enum.take_random(InformedEntity.activities(), 3),
      direction_id: Faker.Util.pick([0, 1]),
      facility: Faker.Lorem.word(),
      route: Faker.Lorem.word(),
      route_type: Faker.Lorem.word(),
      stop: Faker.Lorem.word(),
      trip: Faker.Lorem.word()
    }
  end
end
