defmodule OneWayTest do
  use ExUnit.Case, async: true

  alias Routes.Route
  alias Schedules.Trip

  import Fares.OneWay

  @default_filters [duration: :single_trip]

  test "returns nil if no route is provided for all fare types" do
    refute recommended_fare(nil, nil, nil, nil)
    refute base_fare(nil, nil, nil, nil)
    refute reduced_fare(nil, nil, nil, nil)
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

    test "returns the lowest and highest one-way trip fare that is not discounted" do
      fare_fn = fn @default_filters ++ [mode: :subway] ->
        @subway_fares
      end

      assert %Fares.Fare{cents: 225} = recommended_fare(@route, nil, nil, nil, fare_fn)
      assert %Fares.Fare{cents: 275} = base_fare(@route, nil, nil, nil, fare_fn)
    end

    test "returns the reduced fares for subway" do
      reduced_subway_fare = %Fares.Fare{
        additional_valid_modes: [],
        cents: 110,
        duration: :single_trip,
        media: [:senior_card],
        mode: :subway,
        name: :subway,
        price_label: nil,
        reduced: :senior_disabled
      }

      fare_fn = fn @default_filters ++ [mode: :subway] ->
        @subway_fares ++ [reduced_subway_fare]
      end

      assert reduced_subway_fare == reduced_fare(@route, nil, nil, nil, fare_fn)
    end

    test "returns no reduced fare for subway" do
      fare_fn = fn @default_filters ++ [mode: :subway] ->
        @subway_fares
      end

      assert nil == reduced_fare(@route, nil, nil, nil, fare_fn)
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
        name: :express_bus,
        reduced: nil
      },
      %Fares.Fare{
        additional_valid_modes: [],
        cents: 500,
        media: [:charlie_ticket, :cash],
        mode: :bus,
        name: :express_bus,
        reduced: nil
      }
    ]

    test "returns the lowest and highest one-way trip fare that is not discounted for the local bus" do
      local_route = %Route{type: 3, id: "1"}

      fare_fn = fn @default_filters ++ [name: :local_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :local_bus))
      end

      assert %Fares.Fare{cents: 170} = recommended_fare(local_route, nil, nil, nil, fare_fn)
      assert %Fares.Fare{cents: 200} = base_fare(local_route, nil, nil, nil, fare_fn)
    end

    test "returns the lowest and highest one-way trip fare that is not discounted for the express bus" do
      express_route = %Route{type: 3, id: "170"}

      fare_fn = fn @default_filters ++ [name: :express_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :express_bus))
      end

      assert %Fares.Fare{cents: 400} = recommended_fare(express_route, nil, nil, nil, fare_fn)

      assert %Fares.Fare{cents: 500} = base_fare(express_route, nil, nil, nil, fare_fn)
    end

    test "returns the lowest and highest subway fare for for SL1 route (id=741)" do
      sl1 = %Route{type: 3, id: "741"}

      fare_fn = fn @default_filters ++ [name: :subway] ->
        Enum.filter(@subway_fares, &(&1.name == :subway))
      end

      assert %Fares.Fare{cents: 225} = recommended_fare(sl1, nil, nil, nil, fare_fn)
      assert %Fares.Fare{cents: 275} = base_fare(sl1, nil, nil, nil, fare_fn)
    end

    test "returns the lowest and highest subway fare for for SL2 route (id=742)" do
      sl2 = %Route{type: 3, id: "742"}

      fare_fn = fn @default_filters ++ [name: :subway] ->
        Enum.filter(@subway_fares, &(&1.name == :subway))
      end

      assert %Fares.Fare{cents: 225} = recommended_fare(sl2, nil, nil, nil, fare_fn)
      assert %Fares.Fare{cents: 275} = base_fare(sl2, nil, nil, nil, fare_fn)
    end

    test "returns lowest and highest the subway fare for for SL3 route (id=743)" do
      sl3 = %Route{type: 3, id: "743"}

      fare_fn = fn @default_filters ++ [name: :subway] ->
        Enum.filter(@subway_fares, &(&1.name == :subway))
      end

      assert %Fares.Fare{cents: 225} = recommended_fare(sl3, nil, nil, nil, fare_fn)
      assert %Fares.Fare{cents: 275} = base_fare(sl3, nil, nil, nil, fare_fn)
    end

    test "returns the lowest and highest bus fare for for SL4 route (id=751)" do
      sl4 = %Route{type: 3, id: "751"}

      fare_fn = fn @default_filters ++ [name: :local_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :local_bus))
      end

      assert %Fares.Fare{cents: 170} = recommended_fare(sl4, nil, nil, nil, fare_fn)
      assert %Fares.Fare{cents: 200} = base_fare(sl4, nil, nil, nil, fare_fn)
    end

    test "returns the reduced fares for local bus" do
      reduced_local_bus_fare = %Fares.Fare{
        additional_valid_modes: [],
        cents: 85,
        duration: :single_trip,
        media: [:senior_card],
        mode: :bus,
        name: :local_bus,
        price_label: nil,
        reduced: :senior_disabled
      }

      local_route = %Route{type: 3, id: "1"}

      fare_fn = fn @default_filters ++ [name: :local_bus] ->
        Enum.filter(@bus_fares ++ [reduced_local_bus_fare], &(&1.name == :local_bus))
      end

      assert reduced_local_bus_fare == reduced_fare(local_route, nil, nil, nil, fare_fn)
    end
  end

  describe "commuter rail" do
    test "returns the lowest and highest one-way fare that is not discounted for a trip originating in Zone 1A" do
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

      assert %Fares.Fare{cents: 1050} =
               recommended_fare(route, nil, origin_id, destination_id, fare_fn)

      assert %Fares.Fare{cents: 1050} = base_fare(route, nil, origin_id, destination_id, fare_fn)
    end

    test "returns the lowest and highest one-way fare that is not discounted for a trip terminating in Zone 1A" do
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

      assert %Fares.Fare{cents: 825} =
               recommended_fare(route, nil, origin_id, destination_id, fare_fn)

      assert %Fares.Fare{cents: 825} = base_fare(route, nil, origin_id, destination_id, fare_fn)
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

      assert %Fares.Fare{cents: 401} =
               recommended_fare(route, nil, origin_id, destination_id, fare_fn)

      assert %Fares.Fare{cents: 401} = base_fare(route, nil, origin_id, destination_id, fare_fn)
    end

    test "excludes weekend commuter rail rates" do
      route = %Route{type: 2}
      origin_id = "place-north"
      destination_id = "Haverhill"

      assert %Fares.Fare{cents: 1100, duration: :single_trip} =
               recommended_fare(route, nil, origin_id, destination_id)

      assert %Fares.Fare{cents: 1100, duration: :single_trip} =
               base_fare(route, nil, origin_id, destination_id)
    end

    test "returns the appropriate fare for Foxboro Special Events" do
      route = %Route{type: 2, id: "CR-Foxboro"}
      trip = %Trip{name: "9743"}
      south_station_id = "place-sstat"
      foxboro_id = "place-PB-0194"

      assert %Fares.Fare{cents: 2000, duration: :round_trip} =
               recommended_fare(route, trip, south_station_id, foxboro_id)

      assert %Fares.Fare{cents: 2000, duration: :round_trip} =
               base_fare(route, trip, south_station_id, foxboro_id)

      assert %Fares.Fare{cents: 2000, duration: :round_trip} =
               recommended_fare(route, trip, foxboro_id, south_station_id)

      assert %Fares.Fare{cents: 2000, duration: :round_trip} =
               base_fare(route, trip, foxboro_id, south_station_id)
    end

    test "returns zone-based fares for standard trips on Foxboro pilot" do
      route = %Route{type: 2, id: "CR-Franklin"}
      trip_1 = %Trip{name: "751", id: "CR-Weekday-Fall-19-751"}
      trip_2 = %Trip{name: "759", id: "CR-Weekday-Fall-19-759"}

      assert %Fares.Fare{name: {:zone, "4"}} =
               recommended_fare(route, trip_1, "place-sstat", "place-PB-0194")

      assert %Fares.Fare{name: {:interzone, "3"}} =
               recommended_fare(route, trip_2, "place-FB-0118", "place-PB-0194")
    end

    test "Zone 1A to 1A reverse commute trips on Foxboro pilot retain original pricing" do
      route = %Route{type: 2, id: "CR-Fairmount"}
      trip = %Trip{name: "741", id: "CR-Weekday-Fall-19-741"}

      assert %Fares.Fare{name: {:zone, "1A"}} =
               recommended_fare(route, trip, "origin=place-DB-2240", "place-DB-2222")
    end

    test "does not apply pilot/discounted fare for reverse commutes until Fall 2019" do
      route = %Route{type: 2, id: "CR-Franklin"}
      trip = %Trip{name: "743", id: "CR-Weekday-Spring-19-743"}

      assert %Fares.Fare{name: {:zone, "3"}} =
               recommended_fare(route, trip, "place-sstat", "place-FB-0148")
    end

    test "returns interzone fare for reverse commute trips to and from Foxboro" do
      route = %Route{type: 2, id: "CR-Franklin"}
      inbound_trip = %Trip{name: "750", id: "CR-Weekday-Fall-19-750"}
      outbound_trip = %Trip{name: "741", id: "CR-Weekday-Fall-19-741"}

      south_station_id = "place-sstat"
      foxboro_id = "place-PB-0194"

      assert %Fares.Fare{name: {:interzone, "4"}} =
               recommended_fare(route, inbound_trip, foxboro_id, south_station_id)

      assert %Fares.Fare{name: {:interzone, "4"}} =
               recommended_fare(route, outbound_trip, south_station_id, foxboro_id)
    end

    test "returns nil if no matching fares found" do
      route = %Route{type: 2, id: "CapeFlyer"}
      origin_id = "place-sstat"
      destination_id = "Hyannis"

      fare_fn = fn _ -> [] end

      assert recommended_fare(route, nil, origin_id, destination_id, fare_fn) == nil
    end

    test "returns a free fare for any bus shuttle rail replacements" do
      route = %Route{
        description: :rail_replacement_bus,
        id: "Shuttle-BallardvaleMaldenCenter",
        name: "Haverhill Line Shuttle",
        type: 3
      }

      origin_id = "place-mlmnl"
      destination_id = "place-WR-0099"

      assert %Fares.Fare{cents: 0, name: :free_fare} =
               recommended_fare(route, nil, origin_id, destination_id)

      assert %Fares.Fare{cents: 0, name: :free_fare} =
               base_fare(route, nil, origin_id, destination_id)
    end

    test "returns the reduced fares for commuter rail" do
      route = %Route{type: 2}
      origin_id = "place-north"
      destination_id = "Haverhill"

      reduced_cr_fare = %Fares.Fare{
        additional_valid_modes: [],
        cents: 350,
        duration: :single_trip,
        media: [:senior_card],
        mode: :commuter_rail,
        name: {:interzone, "10"},
        price_label: nil,
        reduced: :senior_disabled
      }

      fare_fn = fn @default_filters ++ [name: {:zone, "7"}] ->
        [
          %Fares.Fare{
            additional_valid_modes: [],
            cents: 1050,
            media: [:commuter_ticket, :cash],
            mode: :commuter_rail,
            name: {:zone, "7"},
            reduced: nil
          },
          reduced_cr_fare
        ]
      end

      assert reduced_cr_fare == reduced_fare(route, nil, origin_id, destination_id, fare_fn)
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

      assert %Fares.Fare{cents: 350} =
               recommended_fare(route, nil, origin_id, destination_id, fare_fn)

      assert %Fares.Fare{cents: 350} = base_fare(route, nil, origin_id, destination_id, fare_fn)
    end

    test "returns the reduced fares for ferry" do
      route = %Route{type: 4}
      origin_id = "Boat-Charlestown"
      destination_id = "Boat-Long-South"

      reduced_ferry_fare = %Fares.Fare{
        additional_valid_modes: [],
        cents: 350,
        duration: nil,
        media: [:charlie_ticket],
        mode: :ferry,
        name: :ferry_inner_harbor,
        price_label: nil,
        reduced: :senior_disabled
      }

      fare_fn = fn @default_filters ++ [name: :ferry_inner_harbor] ->
        [
          %Fares.Fare{
            additional_valid_modes: [],
            cents: 350,
            media: [:charlie_ticket],
            mode: :ferry,
            name: :ferry_inner_harbor,
            reduced: nil
          },
          reduced_ferry_fare
        ]
      end

      assert reduced_ferry_fare == reduced_fare(route, nil, origin_id, destination_id, fare_fn)
    end
  end

  describe "Massport" do
    @massport_fares [
      %Fares.Fare{
        additional_valid_modes: [],
        cents: 500,
        media: [],
        duration: :single_trip,
        mode: :massport_shuttle,
        name: "Massport-TEST-1",
        reduced: nil
      }
    ]
    test "returns a base fare based off route" do
      fare_fn = fn @default_filters ++ [name: "Massport-TEST-1"] ->
        @massport_fares
      end

      route = %Route{id: "Massport-TEST-1", type: "Massport-TEST-1"}
      origin_id = "Test Origin"
      destination_id = "Test Destination"
      trip = %Trip{name: "9743"}

      assert %Fares.Fare{
               cents: 500,
               duration: :single_trip,
               name: "Massport-TEST-1",
               mode: :massport_shuttle
             } == base_fare(route, trip, origin_id, destination_id, fare_fn)
    end
  end
end
