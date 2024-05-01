defmodule Test.Support.Factory.MbtaApi do
  @moduledoc """
  Generated fake data for MBTA.Api
  """
  use ExMachina

  alias JsonApi.Item

  def item_factory(attrs) do
    item = %Item{
      id: attrs[:id] || sequence(:id, &"item-#{&1}"),
      attributes: attrs[:attributes] || %{},
      relationships: attrs[:relationships] || %{}
    }

    merge_attributes(item, attrs)
  end

  def route_pattern_item_factory(attrs) do
    item = %Item{
      id: attrs[:id] || sequence(:id, &"item-#{&1}"),
      attributes:
        attrs[:attributes] ||
          %{
            "canonical" => false,
            "direction_id" => 0,
            "name" => Faker.App.name(),
            "sort_order" => 0,
            "time_desc" => nil,
            "typicality" => 1
          },
      relationships:
        attrs[:relationships] ||
          %{
            "representative_trip" =>
              build_list(1, :item, %{
                id: sequence(:representative_trip_id, &"trip-#{&1}"),
                attributes: %{
                  "headsign" => Faker.Address.street_name()
                },
                relationships: %{
                  "service" =>
                    Faker.Util.pick([
                      build_list(1, :item, id: sequence(:service, &"service-#{&1}")),
                      []
                    ]),
                  "stops" =>
                    Faker.Util.pick([
                      build_list(3, :item, id: sequence(:stop, &"stop-#{&1}")),
                      []
                    ]),
                  "shape" =>
                    Faker.Util.pick([
                      build_list(1, :item,
                        id: sequence(:shape, &"shape-#{&1}"),
                        attributes: %{"polyline" => Faker.Lorem.characters()}
                      ),
                      []
                    ])
                }
              }),
            "route" => build_list(1, :item, id: sequence(:route, &"route-#{&1}"))
          }
    }

    merge_attributes(item, attrs)
  end
end
