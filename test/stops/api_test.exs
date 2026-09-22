defmodule Stops.ApiTest do
  use ExUnit.Case, async: false

  import Mox
  import Stops.Api
  import Test.Support.Factories.MBTA.Api

  alias JsonApi.Item
  alias Stops.Stop

  setup :set_mox_global
  setup :verify_on_exit!

  describe "by_gtfs_id/1" do
    test "uses the gtfs ID to find a stop" do
      parking_lot =
        build(:facility_item,
          attributes: %{
            "type" => "PARKING_AREA",
            "long_name" => "Anderson/Woburn Parking Lot",
            "latitude" => 42.557933,
            "longitude" => -71.151585,
            "properties" => [
              %{"name" => "capacity", "value" => 838},
              %{"name" => "operator", "value" => "Massport"}
            ]
          }
        )

      elevator =
        build(:facility_item, attributes: %{"type" => "ELEVATOR", "properties" => []})

      stop_item =
        build(:stop_item,
          id: "place-NHRML-0127",
          attributes: %{
            "name" => "Anderson/Woburn",
            "address" => "10 Atlantic Ave, Woburn, MA 01801",
            "municipality" => "Woburn",
            "latitude" => 42.5579,
            "longitude" => -71.1519,
            "location_type" => 1,
            "wheelchair_boarding" => 1
          },
          relationships: %{
            "facilities" => [parking_lot, elevator],
            "parent_station" => [],
            "child_stops" => [],
            "connecting_stops" => [],
            "zone" => []
          }
        )

      expect(MBTA.Api.Mock, :get_json, fn "/stops/place-NHRML-0127", _params ->
        %JsonApi{data: [stop_item]}
      end)

      stub(Routes.Repo.Mock, :by_stop, fn _stop_id -> [] end)

      {:ok, stop} = by_gtfs_id("place-NHRML-0127")

      assert stop.id == "place-NHRML-0127"
      assert stop.name == "Anderson/Woburn"
      assert stop.station?
      assert stop.accessibility != []
      assert stop.parking_lots != []

      for parking_lot <- stop.parking_lots do
        assert %Stop.ParkingLot{} = parking_lot
        assert parking_lot.capacity.total != nil
        manager = parking_lot.manager
        assert manager.name in ["Massport", "LAZ Parking"]
      end
    end

    test "parses parent_id and child_ids" do
      child_ids = [
        "70079",
        "NEC-2287",
        "NEC-2287-10",
        "door-sstat-main",
        "node-388-lobby",
        "node-400-middle",
        "node-400-rl",
        "node-6476-ground",
        "node-sstat-400sl-sl",
        "node-sstat-finctrstair-lobby",
        "node-sstat-north-farepaid",
        "node-sstat-north-fareunpaid",
        "node-sstat-outmainstair-lobby"
      ]

      parent_item =
        build(:stop_item,
          id: "place-sstat",
          attributes: %{
            "name" => "South Station",
            "location_type" => 1,
            "wheelchair_boarding" => 1
          },
          relationships: %{
            "parent_station" => [],
            "child_stops" => Enum.map(child_ids, &%Item{type: "stop", id: &1}),
            "facilities" => [],
            "connecting_stops" => [],
            "zone" => []
          }
        )

      child_item =
        build(:stop_item,
          id: "NEC-2287-01",
          attributes: %{
            "name" => "South Station",
            "location_type" => 0,
            "platform_name" => "Commuter Rail - Track 1",
            "platform_code" => "1",
            "description" => "South Station - Commuter Rail - Track 1",
            "wheelchair_boarding" => 1
          },
          relationships: %{
            "parent_station" => [%Item{type: "stop", id: "place-sstat"}],
            "child_stops" => [],
            "facilities" => [],
            "connecting_stops" => [],
            "zone" => []
          }
        )

      expect(MBTA.Api.Mock, :get_json, fn "/stops/place-sstat", _params ->
        %JsonApi{data: [parent_item]}
      end)

      expect(MBTA.Api.Mock, :get_json, fn "/stops/NEC-2287-01", _params ->
        %JsonApi{data: [child_item]}
      end)

      stub(Routes.Repo.Mock, :by_stop, fn _stop_id -> [] end)

      assert {:ok, %Stop{} = parent} = by_gtfs_id("place-sstat")
      assert parent.parent_id == nil
      assert parent.child? == false
      assert parent.name == "South Station"
      assert parent.type == :station
      assert parent.platform_name == nil
      assert parent.platform_code == nil
      assert parent.description == nil

      for child_id <- child_ids do
        assert Enum.member?(parent.child_ids, child_id),
               "#{child_id} not found in parent.child_ids"
      end

      assert {:ok, %Stop{} = child} = by_gtfs_id("NEC-2287-01")
      assert child.name == "South Station"
      assert child.type == :stop
      assert child.platform_name == "Commuter Rail - Track 1"
      assert child.platform_code == "1"
      assert child.description == "South Station - Commuter Rail - Track 1"
      assert child.parent_id == "place-sstat"
      assert child.child_ids == []
      assert child.child? == true
    end

    test "parses fare facilities" do
      north_station_item =
        build(:stop_item,
          id: "place-north",
          attributes: %{
            "name" => "North Station",
            "location_type" => 1,
            "wheelchair_boarding" => 1
          },
          relationships: %{
            "facilities" => [
              build(:facility_item,
                attributes: %{"type" => "FARE_MEDIA_ASSISTANT", "properties" => []}
              ),
              build(:facility_item,
                attributes: %{"type" => "FARE_VENDING_MACHINE", "properties" => []}
              ),
              build(:facility_item, attributes: %{"type" => "TICKET_WINDOW", "properties" => []})
            ],
            "parent_station" => [],
            "child_stops" => [],
            "connecting_stops" => [],
            "zone" => []
          }
        )

      bu_east_item =
        build(:stop_item,
          id: "place-buest",
          attributes: %{
            "name" => "Blandford Street",
            "location_type" => 0,
            "wheelchair_boarding" => 0
          },
          relationships: %{
            "facilities" => [],
            "parent_station" => [],
            "child_stops" => [],
            "connecting_stops" => [],
            "zone" => []
          }
        )

      expect(MBTA.Api.Mock, :get_json, fn "/stops/place-north", _params ->
        %JsonApi{data: [north_station_item]}
      end)

      expect(MBTA.Api.Mock, :get_json, fn "/stops/place-buest", _params ->
        %JsonApi{data: [bu_east_item]}
      end)

      stub(Routes.Repo.Mock, :by_stop, fn _stop_id -> [] end)

      assert {:ok, north_station} = by_gtfs_id("place-north")

      assert north_station.fare_facilities ==
               MapSet.new([:fare_media_assistant, :fare_vending_machine, :ticket_window])

      assert north_station.has_fare_machine?
      assert north_station.has_charlie_card_vendor?

      assert {:ok, bu_east} = by_gtfs_id("place-buest")

      assert bu_east.fare_facilities == MapSet.new([])

      refute bu_east.has_fare_machine?
      refute bu_east.has_charlie_card_vendor?
    end

    test "can use the GTFS accessibility data" do
      stop_item =
        build(:stop_item,
          id: "Yawkey",
          attributes: %{
            "name" => "Yawkey",
            "location_type" => 1,
            "wheelchair_boarding" => 1
          },
          relationships: %{
            "facilities" => [
              build(:facility_item, attributes: %{"type" => "ELEVATOR", "properties" => []})
            ],
            "parent_station" => [],
            "child_stops" => [],
            "connecting_stops" => [],
            "zone" => []
          }
        )

      expect(MBTA.Api.Mock, :get_json, fn "/stops/Yawkey", _params ->
        %JsonApi{data: [stop_item]}
      end)

      stub(Routes.Repo.Mock, :by_stop, fn _stop_id -> [] end)

      {:ok, stop} = by_gtfs_id("Yawkey")
      assert ["accessible" | _] = stop.accessibility
    end

    test "returns nil if stop is not found" do
      expect(MBTA.Api.Mock, :get_json, fn "/stops/-1", _params ->
        {:error, [%JsonApi.Error{code: "not_found"}]}
      end)

      assert by_gtfs_id("-1") == {:ok, nil}
    end

    test "returns a stop even if the stop is not a station" do
      stop_item =
        build(:stop_item,
          id: "411",
          attributes: %{
            "name" => "Warren St @ Brunswick St",
            "location_type" => 0,
            "latitude" => 42.32659,
            "longitude" => -71.10869,
            "wheelchair_boarding" => 0
          },
          relationships: %{
            "facilities" => [],
            "parent_station" => [],
            "child_stops" => [],
            "connecting_stops" => [],
            "zone" => []
          }
        )

      expect(MBTA.Api.Mock, :get_json, fn "/stops/411", _params ->
        %JsonApi{data: [stop_item]}
      end)

      stub(Routes.Repo.Mock, :by_stop, fn _stop_id -> [] end)

      {:ok, stop} = by_gtfs_id("411")

      assert stop.id == "411"
      assert stop.name == "Warren St @ Brunswick St"
      assert stop.latitude != nil
      assert stop.longitude != nil
      refute stop.station?
    end

    test "returns an error if the API returns an error" do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        {:error, %{reason: :econnrefused}}
      end)

      assert {:error, _} = by_gtfs_id("error stop")
    end
  end

  test "all/0 returns error if API returns error" do
    expect(MBTA.Api.Mock, :get_json, fn _, _ ->
      {:error, %{reason: :econnrefused}}
    end)

    assert {:error, _} = all()
  end

  test "by_route returns an error tuple if the V3 API returns an error" do
    expect(MBTA.Api.Mock, :get_json, fn _, _ ->
      {:error, %{reason: :econnrefused}}
    end)

    assert {:error, _} = by_route({"1", 0, []})
  end

  test "pretty payment falls back to empty string" do
    assert pretty_payment("invalid") == ""
  end

  test "by_trip returns an empty list if the V3 API returns an error" do
    expect(MBTA.Api.Mock, :get_json, fn _, _ ->
      {:ok, %Req.Response{status: 500, body: ""}}
    end)

    assert [] = by_trip("1")
  end
end
