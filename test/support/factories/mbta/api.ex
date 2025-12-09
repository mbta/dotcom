defmodule Test.Support.Factories.MBTA.Api do
  @moduledoc """
  Generated fake data for MBTA.Api
  """
  use ExMachina

  alias JsonApi.Item

  def item_factory do
    %Item{id: Faker.Internet.slug()}
  end

  def facility_item_factory do
    build(:item, %{
      attributes: %{
        "type" => Faker.Util.pick(~w(
          BIKE_STORAGE
          BRIDGE_PLATE
          ELECTRIC_CAR_CHARGERS
          ELEVATED_SUBPLATFORM
          ELEVATOR
          ESCALATOR
          FARE_MEDIA_ASSISTANCE_FACILITY
          FARE_MEDIA_ASSISTANT
          FARE_VENDING_MACHINE
          FARE_VENDING_RETAILER
          FULLY_ELEVATED_PLATFORM
          OTHER
          PARKING_AREA
          PICK_DROP
          PORTABLE_BOARDING_LIFT
          RAMP
          TAXI_STAND
          TICKET_WINDOW
        )),
        "short_name" => Faker.App.name(),
        "long_name" => Faker.App.name(),
        "latitude" => Faker.Address.latitude(),
        "longitude" => Faker.Address.longitude(),
        "properties" => []
      }
    })
  end

  def bike_facility_item_factory do
    build(:item, %{
      attributes: %{
        "type" => "BIKE_STORAGE",
        "short_name" => Faker.App.name(),
        "long_name" => Faker.App.name(),
        "latitude" => Faker.Address.latitude(),
        "longitude" => Faker.Address.longitude(),
        "properties" => []
      }
    })
  end

  def parking_facility_item_factory do
    build(:item, %{
      attributes: %{
        "type" => "PARKING_AREA",
        "short_name" => Faker.App.name(),
        "long_name" => Faker.App.name(),
        "latitude" => Faker.Address.latitude(),
        "longitude" => Faker.Address.longitude(),
        "properties" => []
      }
    })
  end

  def elevator_facility_item_factory do
    build(:item, %{
      attributes: %{
        "type" => "ELEVATOR",
        "short_name" => Faker.App.name(),
        "long_name" => Faker.App.name(),
        "latitude" => Faker.Address.latitude(),
        "longitude" => Faker.Address.longitude(),
        "properties" => []
      }
    })
  end

  def escalator_facility_item_factory do
    build(:item, %{
      attributes: %{
        "type" => "ESCALATOR",
        "short_name" => Faker.App.name(),
        "long_name" => Faker.App.name(),
        "latitude" => Faker.Address.latitude(),
        "longitude" => Faker.Address.longitude(),
        "properties" => []
      }
    })
  end

  def fare_facility_item_factory do
    build(:item, %{
      attributes: %{
        "type" => Faker.Util.pick(~w(
          FARE_MEDIA_ASSISTANCE_FACILITY
          FARE_MEDIA_ASSISTANT
          FARE_VENDING_MACHINE
          FARE_VENDING_RETAILER
          TICKET_WINDOW
        )),
        "short_name" => Faker.App.name(),
        "long_name" => Faker.App.name(),
        "latitude" => Faker.Address.latitude(),
        "longitude" => Faker.Address.longitude(),
        "properties" => []
      }
    })
  end

  def accessibility_facility_item_factory do
    build(:item, %{
      attributes: %{
        "type" => Faker.Util.pick(~w(
          ELEVATED_SUBPLATFORM
          FULLY_ELEVATED_PLATFORM
          PORTABLE_BOARDING_LIFT
          RAMP
        )),
        "short_name" => Faker.App.name(),
        "long_name" => Faker.App.name(),
        "latitude" => Faker.Address.latitude(),
        "longitude" => Faker.Address.longitude(),
        "properties" => []
      }
    })
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
          },
          type: "route_pattern"
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
            "wheelchair_boarding" => "",
            "vehicle_type" => Faker.Util.pick([0, 1, 2, 3, 4])
          },
          relationships: %{
            "child_stops" => [],
            "facilities" => [build(:facility_item)],
            "parent_station" => [],
            "zone" => []
          },
          type: "stop"
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
          },
          type: "route"
        },
        attrs,
        fn _k, v1, v2 ->
          Map.merge(v1, v2)
        end
      )
    )
  end

  def trip_item_factory(attrs) do
    build(
      :item,
      Map.merge(
        %{
          attributes: %{
            "direction_id" => Faker.Util.pick([0, 1]),
            "headsign" => Faker.App.name(),
            "name" => Faker.App.name()
          },
          type: "trip"
        },
        attrs,
        fn _k, v1, v2 ->
          Map.merge(v1, v2)
        end
      )
    )
  end

  def prediction_item_factory(attrs) do
    build(
      :item,
      Map.merge(
        %{
          attributes: %{
            "arrival_time" => formatted_datetime(),
            "departure_time" => formatted_datetime(),
            "direction_id" => Faker.Util.pick([0, 1]),
            "schedule_relationship" =>
              Faker.Util.pick(["ADDED", "CANCELLED", "SKIPPED", "UNSCHEDULED", "NO_DATA"]),
            "status" => "",
            "stop_sequence" => 0,
            "track" => ""
          },
          relationships: %{
            "route" => [build(:route_item)],
            "stop" => [build(:stop_item)],
            "trip" => [build(:trip_item)],
            "vehicle" => [build(:vehicle_item)]
          },
          type: "prediction"
        },
        attrs,
        fn _k, v1, v2 ->
          Map.merge(v1, v2)
        end
      )
    )
  end

  def vehicle_item_factory(attrs) do
    build(
      :item,
      Map.merge(
        %{
          attributes: %{
            "bearing" => 0,
            "current_status" => Faker.Util.pick(["IN_TRANSIT_TO", "INCOMING_AT", "STOPPED_AT"]),
            "direction_id" => Faker.Util.pick([0, 1]),
            "latitude" => Faker.Address.latitude(),
            "longitude" => Faker.Address.longitude(),
            "occupancy_status" =>
              Faker.Util.pick(["FEW_SEATS_AVAILABLE", "FULL", "MANY_SEATS_AVAILABLE"])
          },
          relationships: %{
            "route" => [build(:route_item)],
            "stop" => [build(:stop_item)],
            "trip" => [build(:trip_item)]
          },
          type: "vehicle"
        },
        attrs,
        fn _k, v1, v2 ->
          Map.merge(v1, v2)
        end
      )
    )
  end

  def shape_item_factory(attrs) do
    build(
      :item,
      Map.merge(
        %{
          attributes: %{
            "polyline" => Faker.Lorem.characters()
          },
          type: "shape"
        },
        attrs
      )
    )
  end

  def schedule_item_factory(attrs) do
    {stop_sequence, attrs} = attrs |> Map.pop(:stop_sequence)

    build(
      :item,
      Map.merge(
        %{
          attributes: %{
            "arrival_time" => formatted_datetime(),
            "departure_time" => formatted_datetime(),
            "pickup_type" => "",
            "stop_headsign" => "",
            "stop_sequence" => stop_sequence || 90
          },
          type: "schedule"
        },
        attrs
      )
    )
  end

  defp formatted_datetime do
    Faker.DateTime.forward(1)
    |> Timex.format!("{ISO:Extended}")
  end
end
