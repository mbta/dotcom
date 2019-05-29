defmodule Algolia.MockStopsRepo do
  def by_route_type({1, []}) do
    [get("place-subway")]
  end

  def by_route_type({0, []}) do
    [get("place-greenline")]
  end

  def by_route_type({2, []}) do
    [get("place-commuter-rail")]
  end

  def by_route_type({3, []}) do
    [get("place-bus")]
  end

  def by_route_type({4, []}) do
    [get("place-ferry")]
  end

  def all do
    [
      get("place-greenline"),
      get("place-subway"),
      get("place-commuter-rail"),
      get("place-bus"),
      get("place-ferry")
    ]
  end

  def by_route({"CR-Commuterrail", 0, []}) do
    [get("place-greenline"), get("place-subway"), get("place-commuter-rail")]
  end

  def by_route({"1000", 0, []}) do
    [get("place-greenline"), get("place-bus"), get("place-commuter-rail")]
  end

  def get("place-subway") do
    %Stops.Stop{
      accessibility: ["accessible", "elevator", "tty_phone", "escalator_up"],
      id: "place-subway",
      latitude: 42.352271,
      longitude: -71.055242,
      name: "Subway Station"
    }
  end

  def get("place-greenline") do
    %Stops.Stop{
      id: "place-greenline",
      accessibility: ["accessible", "mobile_lift"],
      latitude: 42.336142,
      longitude: -71.149326,
      name: "Green Line Stop",
      station?: true
    }
  end

  def get("place-commuter-rail") do
    %Stops.Stop{
      accessibility: ["accessible"],
      id: "place-commuter-rail",
      latitude: 42.460574,
      longitude: -71.457804,
      name: "Commuter Rail Stop",
      station?: true,
      parking_lots: [
        %Stops.Stop.ParkingLot{
          manager: %Stops.Stop.ParkingLot.Manager{name: "Town of Acton"},
          capacity: [%Stops.Stop.ParkingLot.Capacity{total: 287}]
        }
      ]
    }
  end

  def get("place-bus") do
    %Stops.Stop{
      id: "place-bus",
      name: "Bus Stop",
      accessibility: ["accessible", "ramp"],
      latitude: 42.303251,
      station?: false,
      longitude: -70.920215
    }
  end

  def get("place-ferry") do
    %Stops.Stop{
      id: "place-ferry",
      name: "Ferry Stop",
      accessibility: ["accessible", "ramp"],
      latitude: 42.303251,
      longitude: -70.920215,
      station?: true
    }
  end
end
