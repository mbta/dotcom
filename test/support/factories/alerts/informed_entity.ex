defmodule Test.Support.Factories.Alerts.InformedEntity do
  @moduledoc """
  Generated fake data for %Alerts.InformedEntity{}
  """

  use ExMachina

  alias Test.Support.Factories.Alerts.InformedEntity
  alias Alerts.InformedEntity

  def informed_entity_factory do
    %InformedEntity{
      activities: InformedEntity.activities() |> Enum.take_random(3) |> MapSet.new(),
      direction_id: Faker.Util.pick([0, 1]),
      facility: Faker.Lorem.word(),
      route: Faker.Lorem.word(),
      route_type: Faker.Util.pick(0..4),
      stop: Faker.Lorem.word(),
      trip: Faker.Lorem.word()
    }
  end
end
