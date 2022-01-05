defmodule Stops.ApiTest do
  use ExUnit.Case
  import Stops.Api
  alias Stops.Stop
  use ExVCRHelpers

  describe "by_gtfs_id/1" do
    test "uses the gtfs ID to find a stop" do
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
      assert {:ok, %Stop{} = parent} = by_gtfs_id("place-sstat")
      assert parent.parent_id == nil
      assert parent.is_child? == false
      assert parent.name == "South Station"
      assert parent.type == :station
      assert parent.platform_name == nil
      assert parent.platform_code == nil
      assert parent.description == nil

      assert parent.child_ids ==
               [
                 "70079",
                 "70080",
                 "74611",
                 "74617",
                 "NEC-2287",
                 "NEC-2287-01",
                 "NEC-2287-02",
                 "NEC-2287-03",
                 "NEC-2287-04",
                 "NEC-2287-05",
                 "NEC-2287-06",
                 "NEC-2287-07",
                 "NEC-2287-08",
                 "NEC-2287-09",
                 "NEC-2287-10",
                 "NEC-2287-11",
                 "NEC-2287-12",
                 "NEC-2287-13",
                 "door-sstat-atlantic",
                 "door-sstat-bus",
                 "door-sstat-dewey",
                 "door-sstat-finctr",
                 "door-sstat-main",
                 "door-sstat-outmain",
                 "door-sstat-reserve",
                 "door-sstat-summer",
                 "door-sstat-usps",
                 "node-382-lobby",
                 "node-382-rl",
                 "node-386-lobby",
                 "node-387-lobby",
                 "node-388-lobby",
                 "node-388-sl",
                 "node-389-lobby",
                 "node-389-rl",
                 "node-390-rl",
                 "node-390-sl",
                 "node-398-rl",
                 "node-398-sl",
                 "node-399-lobby",
                 "node-399-middle",
                 "node-400-middle",
                 "node-400-rl",
                 "node-411-lobby",
                 "node-411-sl",
                 "node-419-lobby",
                 "node-419-middle",
                 "node-420-middle",
                 "node-420-rl",
                 "node-424-lobby",
                 "node-6476-ground",
                 "node-6476-lobby",
                 "node-901-lobby",
                 "node-901-rl",
                 "node-901-sl",
                 "node-918-lobby",
                 "node-918-rl",
                 "node-918-sl",
                 "node-919-rl",
                 "node-919-sl",
                 "node-926-lobby",
                 "node-927-rl",
                 "node-927-sl",
                 "node-949-lobby",
                 "node-sstat-382stair-lobby",
                 "node-sstat-382stair-rl",
                 "node-sstat-388stair-lobby",
                 "node-sstat-388stair-sl",
                 "node-sstat-389stair-lobby",
                 "node-sstat-389stair-rl",
                 "node-sstat-390stair-rl",
                 "node-sstat-390stair-sl",
                 "node-sstat-398stair-rl",
                 "node-sstat-398stair-sl",
                 "node-sstat-399stair-lobby",
                 "node-sstat-399stair-middle",
                 "node-sstat-400sl-middle",
                 "node-sstat-400sl-sl",
                 "node-sstat-400stair-middle",
                 "node-sstat-400stair-rl",
                 "node-sstat-411stair-lobby",
                 "node-sstat-411stair-sl",
                 "node-sstat-419stair-lobby",
                 "node-sstat-419stair-middle",
                 "node-sstat-420sl-middle",
                 "node-sstat-420sl-sl",
                 "node-sstat-420stair-middle",
                 "node-sstat-420stair-rl",
                 "node-sstat-918stair-lobby",
                 "node-sstat-918stair-sl",
                 "node-sstat-919stair-rl",
                 "node-sstat-919stair-sl",
                 "node-sstat-alewife-farepaid",
                 "node-sstat-alewife-fareunpaid",
                 "node-sstat-ashbrain-farepaid",
                 "node-sstat-ashbrain-fareunpaid",
                 "node-sstat-bldgescdown-ground",
                 "node-sstat-bldgescdown-lobby",
                 "node-sstat-bldgescup-ground",
                 "node-sstat-bldgescup-lobby",
                 "node-sstat-bldgstair-ground",
                 "node-sstat-bldgstair-lobby",
                 "node-sstat-cr-lobby",
                 "node-sstat-deweystair-lobby",
                 "node-sstat-finctrstair-lobby",
                 "node-sstat-north-farepaid",
                 "node-sstat-north-fareunpaid",
                 "node-sstat-outmainstair-lobby",
                 "node-sstat-reservestair-lobby",
                 "node-sstat-south-farepaid",
                 "node-sstat-south-fareunpaid"
               ]
               |> Enum.sort()

      assert {:ok, %Stop{} = child} = by_gtfs_id("South Station-01")
      assert child.name == "South Station"
      assert child.type == :stop
      assert child.platform_name == "Commuter Rail - Track 1"
      assert child.platform_code == "1"
      assert child.description == "South Station - Commuter Rail - Track 1"
      assert child.parent_id == "place-sstat"
      assert child.child_ids == []
      assert child.is_child? == true
    end

    test "parses fare facilities" do
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
      {:ok, stop} = by_gtfs_id("Yawkey")
      assert ["accessible" | _] = stop.accessibility
    end

    test "returns nil if stop is not found" do
      assert by_gtfs_id("-1") == {:ok, nil}
    end

    test "returns a stop even if the stop is not a station" do
      {:ok, stop} = by_gtfs_id("411")

      assert stop.id == "411"
      assert stop.name == "Warren St @ Brunswick St"
      assert stop.latitude != nil
      assert stop.longitude != nil
      refute stop.station?
    end

    test "returns an error if the API returns an error" do
      bypass = Bypass.open()
      v3_url = Application.get_env(:v3_api, :base_url)

      on_exit(fn ->
        Application.put_env(:v3_api, :base_url, v3_url)
      end)

      Application.put_env(:v3_api, :base_url, "http://localhost:#{bypass.port}")

      Bypass.expect(bypass, fn conn ->
        Plug.Conn.resp(conn, 200, "")
      end)

      assert {:error, _} = by_gtfs_id("error stop")
    end
  end

  test "all/0 returns error if API returns error" do
    bypass = Bypass.open()
    v3_url = Application.get_env(:v3_api, :base_url)

    on_exit(fn ->
      Application.put_env(:v3_api, :base_url, v3_url)
    end)

    Application.put_env(:v3_api, :base_url, "http://localhost:#{bypass.port}")

    Bypass.expect(bypass, fn conn ->
      Plug.Conn.resp(conn, 200, "")
    end)

    assert {:error, _} = all()
  end

  test "by_route returns an error tuple if the V3 API returns an error" do
    bypass = Bypass.open()
    v3_url = Application.get_env(:v3_api, :base_url)

    on_exit(fn ->
      Application.put_env(:v3_api, :base_url, v3_url)
    end)

    Application.put_env(:v3_api, :base_url, "http://localhost:#{bypass.port}")

    Bypass.expect(bypass, fn conn ->
      Plug.Conn.resp(conn, 200, "")
    end)

    assert {:error, _} = by_route({"1", 0, []})
  end

  test "pretty payment falls back to empty string" do
    assert pretty_payment("invalid") == ""
  end
end
