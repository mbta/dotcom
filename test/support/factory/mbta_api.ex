defmodule Test.Support.Factory.MbtaApi do
  @moduledoc """
  Generated fake data for MBTA.Api
  """
  use ExMachina

  alias JsonApi.Item

  def item_factory do
    %Item{}
  end

  @doc """
  MBTA V3 API route patterns return a subset of canonical, direction_id, name,
  sort_order, time_desc, and typicality attributes, with representative_trip and
  route relationships.
  """
  def route_pattern_item_factory(attrs) do
    build(
      :item,
      Map.merge(
        %{
          attributes: %{
            "canonical" => false,
            "direction_id" => 0,
            "name" => Faker.App.name(),
            "sort_order" => 0,
            "time_desc" => nil,
            "typicality" => 1
          },
          relationships: %{
            "representative_trip" => [build(:item)],
            "route" => [build(:item)]
          }
        },
        attrs
      )
    )
  end

  def stop_item_factory(attrs) do
    build(
      :item,
      Map.merge(
        %{
          attributes: %{
            "address" => Faker.Address.street_address(),
            "description" => nil,
            "latitude" => Faker.Address.latitude(),
            "location_type" => Faker.Util.pick([0, 1, 2, 3]),
            "longitude" => Faker.Address.longitude(),
            "municipality" => "",
            "name" => Faker.App.name(),
            "platform_code" => nil,
            "platform_name" => nil,
            "sort_order" => 0,
            "time_desc" => nil,
            "typicality" => 1,
            "wheelchair_boarding" => ""
          },
          relationships: %{
            "child_stops" => [],
            "facilities" => [
              build(:item, %{
                attributes: %{
                  "id" => "",
                  "latitude" => Faker.Address.latitude(),
                  "longitude" => Faker.Address.longitude(),
                  "long_name" => "",
                  "properties" => "",
                  "type" => Faker.Util.pick(~w(
                      fare_vending_retailer
                      fare_vending_machine
                      fare_media_assistant
                      fare_media_assistance_facility
                      ticket_window
                    )a)
                }
              })
            ],
            "parent_station" => [],
            "zone" => []
          }
        },
        attrs,
        fn _k, v1, v2 ->
          Map.merge(v1, v2)
        end
      )
    )
  end

  def route_item_factory(attrs) do
    build(
      :item,
      Map.merge(
        %{
          attributes: %{
            "color" => Faker.Color.rgb_hex(),
            "description" => nil,
            "direction_destinations" => ["", ""],
            "direction_names" => ["", ""],
            "fare_class" => nil,
            "long_name" => "",
            "short_name" => "",
            "sort_order" => 0,
            "type" => Faker.Util.pick([0, 1, 2, 3, 4])
          },
          relationships: %{
            "line" => [],
            "route_patterns" => []
          }
        },
        attrs,
        fn _k, v1, v2 ->
          Map.merge(v1, v2)
        end
      )
    )
  end
end
