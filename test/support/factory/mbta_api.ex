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

  @doc """
  MBTA V3 API route patterns return a subset of canonical, direction_id, name, sort_order, time_desc, and typicality attributes, with representative_trip and route relationships.
  """
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
            "representative_trip" => build_list(1, :trip_item),
            "route" => build_list(1, :item, id: sequence(:route, &"route-#{&1}"))
          }
    }

    merge_attributes(item, attrs)
  end

  @doc """
  MBTA V3 API trips return a subset of headsign, and optionally service, stops, and shape relationships.
  """
  def trip_item_factory(attrs) do
    item = %Item{
      id: attrs[:id] || sequence(:trip, &"trip-#{&1}"),
      attributes:
        attrs[:attributes] ||
          %{
            "direction_id" => Faker.Util.pick([0, 1]),
            "headsign" => Faker.Address.street_name(),
            "name" => Faker.Address.street_name()
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
            build_list(1, :shape_item),
            []
          ])
      }
    }

    merge_attributes(item, attrs)
  end

  @doc """
  MBTA V3 API shapes return a polyline attribute.
  """
  def shape_item_factory(attrs) do
    item = %Item{
      id: attrs[:id] || sequence(:shape, &"shape-#{&1}"),
      attributes: attrs[:attributes] || %{"polyline" => Faker.Lorem.characters()},
      relationships: %{}
    }

    merge_attributes(item, attrs)
  end
end
