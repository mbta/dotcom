defmodule Test.Support.Factories.Facilities.Facility do
  @moduledoc """
  Generated fake data for %Facilities.Facility{}
  """

  use ExMachina

  alias Facilities.Facility
  alias Test.Support.FactoryHelpers

  def facility_factory do
    %Facility{
      id: FactoryHelpers.build(:id),
      type: Stops.Api.gtfs_facility_types() |> Faker.Util.pick(),
      short_name: Faker.App.name(),
      long_name: Faker.App.name(),
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude(),
      properties: []
    }
  end
end
