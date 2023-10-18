defmodule Stops.ApiTest do
  use ExUnit.Case
  import Stops.Api
  alias Stops.Stop

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

      for child_id <- [
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
          ] do
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

  test "by_trip returns an empty list if the V3 API returns an error" do
    bypass = Bypass.open()
    v3_url = Application.get_env(:v3_api, :base_url)

    on_exit(fn ->
      Application.put_env(:v3_api, :base_url, v3_url)
    end)

    Application.put_env(:v3_api, :base_url, "http://localhost:#{bypass.port}")

    Bypass.expect(bypass, fn conn ->
      Plug.Conn.resp(conn, 500, "")
    end)

    assert [] = by_trip("1")
  end
end
