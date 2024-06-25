defmodule Test.Support.Factories.RoutePatterns.RoutePattern do
  @moduledoc """
  Generated fake data for %RoutePattern{}
  """
  use ExMachina

  alias RoutePatterns.RoutePattern
  alias Test.Support.FactoryHelpers

  def route_pattern_factory do
    %RoutePattern{
      id: FactoryHelpers.build(:id),
      canonical: Faker.Util.pick([true, false]),
      direction_id: FactoryHelpers.build(:direction_id),
      headsign: Faker.Address.city(),
      name: Faker.App.name(),
      representative_trip_id: FactoryHelpers.build(:id),
      representative_trip_polyline: Faker.Lorem.characters(),
      route_id: FactoryHelpers.build(:id),
      service_id: FactoryHelpers.build(:id),
      shape_id: FactoryHelpers.build(:id),
      stop_ids: FactoryHelpers.build_list(14, :id),
      time_desc: Faker.Company.catch_phrase(),
      typicality: Faker.Util.pick([0, 1, 2, 3, 4, 5])
    }
  end
end
