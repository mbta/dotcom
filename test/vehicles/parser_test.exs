defmodule Vehicles.ParserTest do
  use ExUnit.Case, async: false
  alias Vehicles.Vehicle
  import Vehicles.Parser
  import Mock

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
      "trip" => [%JsonApi.Item{id: "25"}]
    },
    type: "vehicle"
  }

  describe "parse/1" do
    test "parses an API response into a Vehicle struct" do
      expected = %Vehicle{
        id: "y1799",
        route_id: "1",
        stop_id: "72",
        trip_id: "25",
        shape_id: nil,
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140
      }

      assert parse(@item) == expected
    end

    test "can handle a missing trip" do
      item = put_in(@item.relationships["trip"], [])

      expected = %Vehicle{
        id: "y1799",
        route_id: "1",
        stop_id: "72",
        trip_id: nil,
        shape_id: nil,
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140
      }

      assert parse(item) == expected
    end

    test "can handle a missing stop" do
      item = put_in(@item.relationships["stop"], [])

      expected = %Vehicle{
        id: "y1799",
        route_id: "1",
        stop_id: nil,
        trip_id: "25",
        shape_id: nil,
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140
      }

      assert parse(item) == expected
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
        shape_id: nil,
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140
      }

      assert parse(item) == expected
    end

    test "fetches parent stop if present" do
      with_mock(Stops.Repo, [:passthrough], get_parent: fn "72" -> %Stops.Stop{id: "place-72"} end) do
        expected = %Vehicle{
          id: "y1799",
          route_id: "1",
          stop_id: "place-72",
          trip_id: "25",
          shape_id: nil,
          direction_id: 1,
          status: :stopped,
          latitude: 2.2,
          longitude: 1.1,
          bearing: 140
        }

        %Vehicle{} = parsed_vehicle = parse(@item)
        assert parsed_vehicle == expected, "parsed vehicle is #{inspect(parsed_vehicle)}"
      end
    end

    test "fetches shape if trip is present" do
      with_mock(Schedules.Repo, [:passthrough],
        trip: fn "25" -> %Schedules.Trip{shape_id: "25-shape"} end
      ) do
        expected = %Vehicle{
          id: "y1799",
          route_id: "1",
          stop_id: "72",
          trip_id: "25",
          shape_id: "25-shape",
          direction_id: 1,
          status: :stopped,
          latitude: 2.2,
          longitude: 1.1,
          bearing: 140
        }

        assert parse(@item) == expected
      end
    end

    test "can handle occupancy status" do
      item = put_in(@item.attributes["occupancy_status"], "FEW_SEATS_AVAILABLE")

      expected = %Vehicle{
        id: "y1799",
        route_id: "1",
        stop_id: "72",
        trip_id: "25",
        shape_id: nil,
        direction_id: 1,
        status: :stopped,
        latitude: 2.2,
        longitude: 1.1,
        bearing: 140,
        crowding: :some_crowding
      }

      assert parse(item) == expected
    end
  end
end
