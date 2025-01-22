defmodule Test.Support.Factories.Stops.Stop do
  @moduledoc """
  Generated fake data for %Stops.Stop{}
  """

  use ExMachina

  alias Stops.Stop
  alias Test.Support.FactoryHelpers

  def stop_factory do
    parent_id = FactoryHelpers.build(:nullable_id)

    child_ids =
      if is_nil(parent_id),
        do:
          Faker.Util.pick([
            [],
            FactoryHelpers.build_list(7, :id)
          ]),
        else: []

    %Stop{
      id: FactoryHelpers.build(:id),
      parent_id: parent_id,
      child_ids: child_ids,
      child?: !is_nil(parent_id),
      station?: fn -> if(parent_id, do: Faker.Util.pick([true, false]), else: false) end,
      type: Faker.Util.pick([:stop, :station, :entrance, :generic_node]),
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude(),
      municipality: Faker.Address.city(),
      address: Faker.Address.street_address(),
      name: Faker.App.name(),
      zone:
        ["1", "1A", "2", "3", "4", "5", "6", "7", "8", "9"]
        |> Faker.Util.pick()
        |> FactoryHelpers.nullable_item()
    }
  end
end
