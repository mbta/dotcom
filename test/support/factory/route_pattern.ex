defmodule Test.Support.Factory.RoutePattern do
  @moduledoc """
  Generated fake data for %RoutePattern{}
  """
  use ExMachina

  alias RoutePatterns.RoutePattern

  def route_pattern_factory(attrs) do
    direction_id = Map.get(attrs, :direction_id, Faker.Util.pick([0, 1]))
    headsign = attrs[:headsign] || Faker.Address.street_name()
    id = attrs[:id] || sequence(:id, &"route-pattern-#{&1}")
    name = attrs[:name] || "#{Faker.Address.street_name()}-#{Faker.Address.street_name()}"

    representative_trip_id =
      attrs[:representative_trip_id] || sequence(:representative_trip_id, &"trip-#{&1}")

    representative_trip_polyline =
      attrs[:representative_trip_polyline] || Faker.Lorem.characters()

    route_id = attrs[:route_id] || sequence(:route_id, &"route-#{&1}")
    service_id = attrs[:service_id] || sequence(:service_id, &"service-#{&1}")
    shape_id = attrs[:shape_id] || sequence(:shape_id, &"shape-#{&1}")
    typicality = attrs[:typicality] || Faker.Util.pick([0, 1, 2, 3, 4, 5])

    route_pattern = %RoutePattern{
      direction_id: direction_id,
      headsign: headsign,
      id: id,
      name: name,
      representative_trip_id: representative_trip_id,
      representative_trip_polyline: representative_trip_polyline,
      route_id: route_id,
      service_id: service_id,
      shape_id: shape_id,
      typicality: typicality
    }

    merge_attributes(route_pattern, attrs)
  end
end
