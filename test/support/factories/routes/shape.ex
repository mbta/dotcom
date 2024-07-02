defmodule Test.Support.Factories.Routes.Shape do
  @moduledoc """
  Generated fake data for %Routes.Shape{}
  """

  use ExMachina

  alias Routes.Shape
  alias Test.Support.FactoryHelpers

  def shape_factory do
    %Shape{
      id: FactoryHelpers.build(:id),
      direction_id: FactoryHelpers.build(:direction_id),
      name: Faker.App.name(),
      polyline: Faker.Lorem.characters(),
      stop_ids: FactoryHelpers.build_list(15, :id)
    }
  end
end
