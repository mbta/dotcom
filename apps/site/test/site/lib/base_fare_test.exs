defmodule BaseFareTest do
  use ExUnit.Case, async: true

  alias Routes.Route

  import Site.BaseFare

  @default_filters [reduced: nil, duration: :single_trip]

  test "returns an empty string if no route is provided" do
    refute base_fare(nil, nil, nil)
  end

  test "excludes weekend commuter rail rates" do
    route = %Route{type: 2}
    origin_id = "place-north"
    destination_id = "Haverhill"

    assert %Fares.Fare{cents: 1100, duration: :single_trip} =
             base_fare(route, origin_id, destination_id)
  end

  describe "subway" do
    @route %Route{type: 0}

    @subway_fares [
      %Fares.Fare{
        additional_valid_modes: [:bus],
        cents: 225,
        media: [:charlie_card],
        mode: :subway,
        name: :subway,
        reduced: nil
      },
      %Fares.Fare{
        additional_valid_modes: [:bus],
        cents: 275,
        media: [:charlie_ticket, :cash],
        mode: :subway,
        name: :subway,
        reduced: nil
      }
    ]

    test "returns the lowest one-way trip fare that is not discounted" do
      fare_fn = fn @default_filters ++ [mode: :subway] ->
        @subway_fares
      end

      assert %Fares.Fare{cents: 225} = base_fare(@route, nil, nil, fare_fn)
    end
  end

  describe "local bus" do
    @bus_fares [
      %Fares.Fare{
        additional_valid_modes: [],
        cents: 170,
        media: [:charlie_card],
        mode: :bus,
        name: :local_bus,
        reduced: nil
      },
      %Fares.Fare{
        additional_valid_modes: [],
        cents: 200,
        media: [:charlie_ticket, :cash],
        mode: :bus,
        name: :local_bus,
        reduced: nil
      },
      %Fares.Fare{
        additional_valid_modes: [],
        cents: 400,
        media: [:charlie_card],
        mode: :bus,
        name: :inner_express_bus,
        reduced: nil
      },
      %Fares.Fare{
        additional_valid_modes: [],
        cents: 500,
        media: [:charlie_ticket, :cash],
        mode: :bus,
        name: :inner_express_bus,
        reduced: nil
      },
      %Fares.Fare{
        additional_valid_modes: [],
        cents: 525,
        media: [:charlie_card],
        mode: :bus,
        name: :outer_express_bus,
        reduced: nil
      },
      %Fares.Fare{
        additional_valid_modes: [],
        cents: 700,
        media: [:charlie_ticket, :cash],
        mode: :bus,
        name: :outer_express_bus,
        reduced: nil
      }
    ]

    test "returns the lowest one-way trip fare that is not discounted for the local bus" do
      local_route = %Route{type: 3, id: "1"}

      fare_fn = fn @default_filters ++ [name: :local_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :local_bus))
      end

      assert %Fares.Fare{cents: 170} = base_fare(local_route, nil, nil, fare_fn)
    end

    test "returns the lowest one-way trip fare that is not discounted for the inner express bus" do
      inner_express_route = %Route{type: 3, id: "170"}

      fare_fn = fn @default_filters ++ [name: :inner_express_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :inner_express_bus))
      end

      assert %Fares.Fare{cents: 400} = base_fare(inner_express_route, nil, nil, fare_fn)
    end

    test "returns the lowerst one-way trip fare that is not discounted for the outer express bus" do
      outer_express_route = %Route{type: 3, id: "352"}

      fare_fn = fn @default_filters ++ [name: :outer_express_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :outer_express_bus))
      end

      assert %Fares.Fare{cents: 525} = base_fare(outer_express_route, nil, nil, fare_fn)
    end

    test "returns the subway fare for for SL1 route (id=741)" do
      sl1 = %Route{type: 3, id: "741"}

      fare_fn = fn @default_filters ++ [name: :subway] ->
        Enum.filter(@subway_fares, &(&1.name == :subway))
      end

      assert %Fares.Fare{cents: 225} = base_fare(sl1, nil, nil, fare_fn)
    end

    test "returns the subway fare for for SL2 route (id=742)" do
      sl2 = %Route{type: 3, id: "742"}

      fare_fn = fn @default_filters ++ [name: :subway] ->
        Enum.filter(@subway_fares, &(&1.name == :subway))
      end

      assert %Fares.Fare{cents: 225} = base_fare(sl2, nil, nil, fare_fn)
    end

    test "returns the subway fare for for SL3 route (id=743)" do
      sl3 = %Route{type: 3, id: "743"}

      fare_fn = fn @default_filters ++ [name: :subway] ->
        Enum.filter(@subway_fares, &(&1.name == :subway))
      end

      assert %Fares.Fare{cents: 225} = base_fare(sl3, nil, nil, fare_fn)
    end

    test "returns the bus fare for for SL4 route (id=751)" do
      sl4 = %Route{type: 3, id: "751"}

      fare_fn = fn @default_filters ++ [name: :local_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :local_bus))
      end

      assert %Fares.Fare{cents: 170} = base_fare(sl4, nil, nil, fare_fn)
    end
  end

  describe "commuter rail" do
    test "returns the one-way fare that is not discounted for a trip originating in Zone 1A" do
      route = %Route{type: 2}
      origin_id = "place-north"
      destination_id = "Haverhill"

      fare_fn = fn @default_filters ++ [name: {:zone, "7"}] ->
        [
          %Fares.Fare{
            additional_valid_modes: [],
            cents: 1050,
            media: [:commuter_ticket, :cash],
            mode: :commuter_rail,
            name: {:zone, "7"},
            reduced: nil
          }
        ]
      end

      assert %Fares.Fare{cents: 1050} = base_fare(route, origin_id, destination_id, fare_fn)
    end

    test "returns the lowest one-way fare that is not discounted for a trip terminating in Zone 1A" do
      route = %Route{type: 2}
      origin_id = "Ballardvale"
      destination_id = "place-north"

      fare_fn = fn @default_filters ++ [name: {:zone, "4"}] ->
        [
          %Fares.Fare{
            additional_valid_modes: [],
            cents: 825,
            media: [:commuter_ticket, :cash],
            mode: :commuter_rail,
            name: {:zone, "4"},
            reduced: nil
          }
        ]
      end

      assert %Fares.Fare{cents: 825} = base_fare(route, origin_id, destination_id, fare_fn)
    end

    test "returns an interzone fare that is not discounted for a trip that does not originate/terminate in Zone 1A" do
      route = %Route{type: 2}
      origin_id = "Ballardvale"
      destination_id = "Haverhill"

      fare_fn = fn @default_filters ++ [name: {:interzone, "4"}] ->
        [
          %Fares.Fare{
            additional_valid_modes: [],
            cents: 401,
            media: [:commuter_ticket, :cash],
            mode: :commuter_rail,
            name: {:interzone, "4"},
            reduced: nil
          }
        ]
      end

      assert %Fares.Fare{cents: 401} = base_fare(route, origin_id, destination_id, fare_fn)
    end

    test "returns the appropriate fare for Foxboro" do
      route = %Route{type: 2}
      south_station_id = "place-sstat"
      foxboro_id = "place-FS-0049"

      assert %Fares.Fare{cents: 2000, duration: :round_trip} =
               base_fare(route, south_station_id, foxboro_id)

      assert %Fares.Fare{cents: 2000, duration: :round_trip} =
               base_fare(route, foxboro_id, south_station_id)
    end

    test "returns nil if no matching fares found" do
      route = %Route{type: 2, id: "CapeFlyer"}
      origin_id = "place-sstat"
      destination_id = "Hyannis"

      fare_fn = fn _ -> [] end

      assert base_fare(route, origin_id, destination_id, fare_fn) == nil
    end
  end

  describe "ferry" do
    test "returns the fare that is not discounted for the correct ferry trip" do
      route = %Route{type: 4}
      origin_id = "Boat-Charlestown"
      destination_id = "Boat-Long-South"

      fare_fn = fn @default_filters ++ [name: :ferry_inner_harbor] ->
        [
          %Fares.Fare{
            additional_valid_modes: [],
            cents: 350,
            media: [:charlie_ticket],
            mode: :ferry,
            name: :ferry_inner_harbor,
            reduced: nil
          }
        ]
      end

      assert %Fares.Fare{cents: 350} = base_fare(route, origin_id, destination_id, fare_fn)
    end
  end
end
