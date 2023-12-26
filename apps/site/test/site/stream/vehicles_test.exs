defmodule Site.Stream.VehiclesTest do
  use SiteWeb.ChannelCase, async: true
  alias Vehicles.Vehicle

  @vehicles [
    %Vehicle{route_id: "Red", direction_id: 0},
    %Vehicle{route_id: "CR-Lowell", direction_id: 1},
    %Vehicle{route_id: "Blue", direction_id: nil},
    %Vehicle{route_id: "Green-B", direction_id: 1},
    %Vehicle{route_id: "Green-C", direction_id: 1}
  ]

  setup do
    _ = start_supervised({Phoenix.PubSub, name: Vehicles.PubSub})
    :ok
  end

  test "broadcasts vehicles by route and direction id" do
    Phoenix.PubSub.subscribe(Site.PubSub, "vehicles:Red:0")
    Phoenix.PubSub.subscribe(Site.PubSub, "vehicles:CR-Lowell:1")
    Phoenix.PubSub.subscribe(Site.PubSub, "vehicles:Blue:0")
    Phoenix.PubSub.subscribe(Site.PubSub, "vehicles:Blue:1")

    assert {:ok, pid} = start_supervised({Site.Stream.Vehicles, []})

    send(pid, {:reset, @vehicles})

    assert_broadcast("reset", %{
      data: [
        %Vehicle{route_id: "Red", direction_id: 0}
      ]
    })

    assert_broadcast("reset", %{
      data: [
        %Vehicle{route_id: "CR-Lowell", direction_id: 1}
      ]
    })

    refute_broadcast("reset", %{
      data: [
        %Vehicle{route_id: "Blue", direction_id: nil}
      ]
    })
  end

  test "sends a generic Green broadcast" do
    Phoenix.PubSub.subscribe(Site.PubSub, "vehicles:Green:1")
    assert {:ok, pid} = start_supervised({Site.Stream.Vehicles, []})

    send(pid, {:reset, @vehicles})

    assert_broadcast("reset", %{
      data: [
        %Vehicle{route_id: "Green-B", direction_id: 1},
        %Vehicle{route_id: "Green-C", direction_id: 1}
      ]
    })
  end

  test "broadcasts to the configured topic" do
    SiteWeb.Endpoint.subscribe("vehicles-v2:Green:1")
    assert {:ok, pid} = start_supervised({Site.Stream.Vehicles, topic: "vehicles-v2"})

    send(pid, {:reset, @vehicles})

    assert_broadcast("reset", %{
      data: [
        %Vehicle{route_id: "Green-B", direction_id: 1},
        %Vehicle{route_id: "Green-C", direction_id: 1}
      ]
    })
  end
end
