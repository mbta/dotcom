defmodule DotcomWeb.VehicleChannelTest do
  use DotcomWeb.ChannelCase

  alias DotcomWeb.UserSocket
  alias DotcomWeb.VehicleChannel
  alias Vehicles.Vehicle

  @vehicles [
    %Vehicle{
      id: "1",
      route_id: "CR-Lowell",
      direction_id: 0,
      stop_id: "BNT-0000-01",
      status: :in_transit,
      trip_id: "trip_1"
    },
    %Vehicle{
      id: "2",
      route_id: "CR-Lowell",
      direction_id: 0,
      stop_id: "place-NHRML-0127",
      status: :in_transit,
      trip_id: "trip_2"
    }
  ]

  setup_all do
    # needed by DotcomWeb.ScheduleController.VehicleLocations plug
    _ = start_supervised({Phoenix.PubSub, name: Vehicles.PubSub})
    _ = start_supervised(Vehicles.Repo)

    :ok
  end

  test "sends vehicles when receives reset event" do
    # subscribes to a random channel name to
    # avoid receiving real data in assert_push
    assert {:ok, _, socket} =
             UserSocket
             |> socket("", %{some: :assign})
             |> subscribe_and_join(VehicleChannel, "vehicles-v2:VehiclesChannelTest")

    broadcast_from(socket, "reset", %{data: @vehicles})

    assert_push("data", event_payload)

    assert %{data: @vehicles, event: "reset"} = event_payload
  end

  test "sends vehicles when receives add event" do
    # subscribes to a random channel name to
    # avoid receiving real data in assert_push
    assert {:ok, _, socket} =
             UserSocket
             |> socket("", %{some: :assign})
             |> subscribe_and_join(VehicleChannel, "vehicles-v2:VehiclesChannelTest")

    broadcast_from(socket, "add", %{data: @vehicles})

    assert_push("data", event_payload)

    assert %{data: @vehicles, event: "add"} = event_payload
  end

  test "sends vehicles when receives update event" do
    # subscribes to a random channel name to
    # avoid receiving real data in assert_push
    assert {:ok, _, socket} =
             UserSocket
             |> socket("", %{some: :assign})
             |> subscribe_and_join(VehicleChannel, "vehicles-v2:VehiclesChannelTest1")

    broadcast_from(socket, "update", %{data: @vehicles})

    assert_push("data", event_payload)

    assert %{data: @vehicles, event: "update"} = event_payload
  end

  test "sends vehicle ids for remove event" do
    assert {:ok, _, socket} =
             UserSocket
             |> socket("", %{some: :assign})
             |> subscribe_and_join(VehicleChannel, "vehicles-v2:VehiclesChannelTest2")

    broadcast_from(socket, "remove", %{data: ["vehicle_id"]})

    assert_push("data", data)

    assert %{data: ["vehicle_id"], event: "remove"} = data
  end

  test "responds to init push by sending data" do
    assert {:ok, _, socket} =
             UserSocket
             |> socket("", %{some: :assign})
             |> subscribe_and_join(VehicleChannel, "vehicles-v2:VehiclesChannelTest3")

    push(socket, "init", %{"route_id" => "route_id", "direction_id" => "0"})

    assert_push("data", _)
  end
end
