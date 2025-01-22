defmodule HubStopsTest do
  use ExUnit.Case, async: true

  import HubStops

  alias Routes.Route
  alias Stops.Stop

  describe "from_mode/2" do
    @commuter_stops [
      %DetailedStop{stop: %Stop{id: "place-sstat"}, features: []},
      %DetailedStop{stop: %Stop{id: "place-north"}, features: []},
      %DetailedStop{stop: %Stop{id: "place-bbsta"}, features: []}
    ]

    test "Returns all commuter hub stops" do
      hub_ids =
        :commuter_rail
        |> mode_hubs([{%Route{id: "cr-1"}, @commuter_stops}])
        |> Enum.map(fn %HubStop{detailed_stop: detailed_stop} -> detailed_stop.stop.id end)

      assert hub_ids == ["place-sstat", "place-north", "place-bbsta"]
    end

    test "Returns empty list for non commuter rail modes" do
      assert mode_hubs("subway", []) == []
      assert mode_hubs("ferry", []) == []
      assert mode_hubs("bus", []) == []
    end
  end

  describe "route_hubs/1" do
    @blue_stops [
      %DetailedStop{stop: %Stop{id: "place-state"}, features: [:access]},
      %DetailedStop{stop: %Stop{id: "place-wondl"}, features: []},
      %DetailedStop{stop: %Stop{id: "place-aport"}, features: []},
      %DetailedStop{stop: %Stop{id: "place-place"}, features: []},
      %DetailedStop{stop: %Stop{id: "place-blue"}, features: []}
    ]
    @red_stops [
      %DetailedStop{stop: %Stop{id: "place-sstat"}, features: [:subway]},
      %DetailedStop{stop: %Stop{id: "place-pktrm"}, features: []},
      %DetailedStop{stop: %Stop{id: "place-dwnxg"}, features: []},
      %DetailedStop{stop: %Stop{id: "place-red"}, features: []}
    ]

    @grouped_stops [
      {%Route{id: "Blue"}, @blue_stops},
      {%Route{id: "Red"}, @red_stops},
      {%Route{id: "Yellow"}, []}
    ]

    test "Returns a map with all hub stations" do
      route_hubs = route_hubs(@grouped_stops)
      state_street_hub = route_hubs |> Map.get("Blue") |> List.first()
      assert state_street_hub.image == "/images/stops/state_street"
      assert state_street_hub.detailed_stop.features == [:access]
    end
  end
end
