defmodule Vehicles.ParserTest do
  use ExUnit.Case, async: true
  alias Vehicles.{Parser, Vehicle}

  @item %JsonApi.Item{
    attributes: %{
      "current_status" => "STOPPED_AT",
      "direction_id" => 1,
      "longitude" => 1.1,
      "latitude" => 2.2,
      "bearing" => 140
    },
    id: "y1799",
    relationships: %{
      "route" => [%JsonApi.Item{id: "1"}],
      "stop" => [%JsonApi.Item{id: "72"}],
      "trip" => [
        %JsonApi.Item{
          id: "32893540",
          relationships: %{
            "shape" => [%{id: "12345"}]
          }
        }
      ]
    },
    type: "vehicle"
  }

  describe "parse/1" do
    test "parses an API response into a Vehicle struct" do
      expected = %Vehicle{
        id: "y1799",
        route_id: "1",
        stop_id: "72",
        trip_id: "32893540",
        shape_id: "12345",
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140
      }

      assert Parser.parse(@item) == expected
    end

    test "can handle a missing trip" do
      item = put_in(@item.relationships["trip"], [])

      expected = %Vehicle{
        id: "y1799",
        route_id: "1",
        stop_id: "72",
        trip_id: nil,
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140
      }

      assert Parser.parse(item) == expected
    end

    test "can handle a missing stop" do
      item = put_in(@item.relationships["stop"], [])

      expected = %Vehicle{
        id: "y1799",
        route_id: "1",
        stop_id: nil,
        trip_id: "32893540",
        shape_id: "12345",
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140
      }

      assert Parser.parse(item) == expected
    end

    test "can handle a missing route" do
      item = put_in(@item.relationships["route"], [])
      # if we don't have a route, we definitely don't have a trip
      item = put_in(item.relationships["trip"], [])

      expected = %Vehicle{
        id: "y1799",
        route_id: nil,
        stop_id: "72",
        trip_id: nil,
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140
      }

      assert Parser.parse(item) == expected
    end

    test "parses parent stop relationships if present" do
      item = %JsonApi.Item{
        attributes: %{
          "current_status" => "IN_TRANSIT_TO",
          "direction_id" => 0,
          "longitude" => 1.1,
          "latitude" => 2.2
        },
        id: "544B1E1A",
        relationships: %{
          "route" => [%JsonApi.Item{id: "Red"}],
          "stop" => [
            %JsonApi.Item{
              id: "70068",
              relationships: %{
                "parent_station" => [%JsonApi.Item{id: "place-harsq"}]
              }
            }
          ],
          "trip" => [%JsonApi.Item{id: "32542428"}]
        },
        type: "vehicle"
      }

      expected = %Vehicle{
        id: "544B1E1A",
        route_id: "Red",
        stop_id: "place-harsq",
        trip_id: "32542428",
        direction_id: 0,
        status: :in_transit,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 0
      }

      assert Parser.parse(item) == expected
    end

    test "can handle occupancy status" do
      item = put_in(@item.attributes["occupancy_status"], "CRUSHED_STANDING_ROOM_ONLY")

      expected = %Vehicle{
        id: "y1799",
        route_id: "1",
        stop_id: "72",
        trip_id: "32893540",
        shape_id: "12345",
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140,
        crowding: :some_crowding
      }

      assert Parser.parse(item) == expected
    end
  end
end
