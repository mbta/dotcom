defmodule SiteWeb.VehicleChannelTest do
  use SiteWeb.ChannelCase

  alias Leaflet.MapData.Marker
  alias SiteWeb.{VehicleChannel, UserSocket}
  alias Vehicles.Repo

  test "sends vehicles and marker data" do
    # subscribes to a random channel name to
    # avoid receiving real data in assert_push
    assert {:ok, _, socket} =
             UserSocket
             |> socket("", %{some: :assign})
             |> subscribe_and_join(VehicleChannel, "vehicles:VehicleChannelTest")

    assert [vehicle | _] =
             Repo.all()
             |> Enum.reject(&(&1.route_id == nil))

    assert {:noreply, %Phoenix.Socket{}} =
             VehicleChannel.handle_out("reset", %{data: [vehicle]}, socket)

    assert_push("data", vehicles)

    assert %{data: [vehicle_with_marker]} = vehicles

    assert %{
             data: %{stop_name: _, vehicle: ^vehicle},
             marker: %Marker{}
           } = vehicle_with_marker
  end

  test "sends vehicle ids for remove event" do
    assert {:ok, _, socket} =
             UserSocket
             |> socket("", %{some: :assign})
             |> subscribe_and_join(VehicleChannel, "vehicles:VehicleChannelTest2")

    assert {:noreply, %Phoenix.Socket{}} =
             VehicleChannel.handle_out("remove", %{data: ["vehicle_id"]}, socket)

    assert_push("data", vehicles)

    assert vehicles == %{data: ["vehicle_id"], event: "remove"}
  end

  test "responds to init push by sending data" do
    assert {:ok, _, socket} =
             UserSocket
             |> socket("", %{some: :assign})
             |> subscribe_and_join(VehicleChannel, "vehicles:VehicleChannelTest3")

    assert {:noreply, %Phoenix.Socket{}} =
             VehicleChannel.handle_in(
               "init",
               %{"route_id" => "route_id", "direction_id" => "0"},
               socket
             )

    assert_push("data", _)
  end
end
