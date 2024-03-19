defmodule Fares.MonthTest do
  use ExUnit.Case, async: true
  @moduletag :external

  alias Fares.{Fare, Month}
  alias Routes.Route
  alias Schedules.Trip

  @default_filters [reduced: nil, duration: :month]

  describe "nil route" do
    test "returns nil if no route is provided" do
      assert Month.recommended_pass(nil, nil, nil, nil) == nil
      assert Month.base_pass(nil, nil, nil, nil) == nil
    end
  end

  describe "reduced_pass" do
    @reduced_fares [
      %Fares.Fare{
        additional_valid_modes: [:bus],
        cents: 3_000,
        duration: :month,
        media: [:senior_card, :student_card],
        mode: :subway,
        name: :subway,
        price_label: nil,
        reduced: :any
      }
    ]

    test "returns a reduced month pass" do
      fare_fn = fn [reduced: :any, duration: :month, mode: :subway] -> @reduced_fares end

      assert %Fare{cents: 3_000} = Month.reduced_pass(%Route{type: 0}, nil, nil, nil, fare_fn)
    end

    test "accepts a Route ID" do
      fare_fn = fn [reduced: :any, duration: :month, mode: :subway] -> @reduced_fares end

      assert %Fare{cents: 3_000} = Month.reduced_pass("Red", nil, nil, nil, fare_fn)
    end

    test "accepts a Trip ID" do
      route = %Route{type: 2, id: "CR-Franklin"}
      trip_id = "CR-Weekday-Fall-19-751"

      assert %Fares.Fare{
               additional_valid_modes: [:subway, :bus, :ferry],
               cents: 13_600,
               duration: :month,
               media: [:senior_card, :student_card],
               mode: :commuter_rail,
               name: {:zone, "4"},
               price_label: nil,
               reduced: :any
             } = Month.reduced_pass(route, trip_id, "place-sstat", "place-PB-0194")
    end
  end

  describe "subway" do
    @subway_route %Route{type: 0}

    @subway_fares [
      %Fare{
        additional_valid_modes: [:bus],
        cents: 9_000,
        duration: :month,
        media: [:charlie_card, :charlie_ticket],
        mode: :subway,
        name: :subway,
        price_label: nil,
        reduced: nil
      }
    ]

    test "returns the lowest and highest month pass fares that are not discounted" do
      fare_fn = fn @default_filters ++ [mode: :subway] -> @subway_fares end

      assert %Fare{cents: 9_000} = Month.recommended_pass(@subway_route, nil, nil, nil, fare_fn)
      assert %Fare{cents: 9_000} = Month.base_pass(@subway_route, nil, nil, nil, fare_fn)
    end

    test "accepts a Route ID" do
      fare_fn = fn @default_filters ++ [mode: :subway] -> @subway_fares end

      assert %Fare{cents: 9_000} = Month.recommended_pass("Red", nil, nil, nil, fare_fn)
      assert %Fare{cents: 9_000} = Month.base_pass("Red", nil, nil, nil, fare_fn)
    end
  end

  describe "bus" do
    @bus_fares [
      %Fare{
        additional_valid_modes: [],
        cents: 5_500,
        duration: :month,
        media: [:charlie_card, :charlie_ticket],
        mode: :bus,
        name: :local_bus,
        price_label: nil,
        reduced: nil
      },
      %Fare{
        additional_valid_modes: [],
        cents: 13_600,
        duration: :month,
        media: [:charlie_card, :charlie_ticket],
        mode: :bus,
        name: :express_bus,
        price_label: nil,
        reduced: nil
      }
    ]

    test "returns the lowest and highest month pass fares that are not discounted for the local bus" do
      local_route = %Route{type: 3, id: "1"}

      fare_fn = fn @default_filters ++ [name: :local_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :local_bus))
      end

      assert %Fare{cents: 5_500} = Month.recommended_pass(local_route, nil, nil, nil, fare_fn)
      assert %Fare{cents: 5_500} = Month.base_pass(local_route, nil, nil, nil, fare_fn)
    end

    test "returns the lowest and highest month pass fares that are not discounted for the express bus" do
      express_route = %Route{type: 3, id: "170"}

      fare_fn = fn @default_filters ++ [name: :express_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :express_bus))
      end

      assert %Fare{cents: 13_600} = Month.recommended_pass(express_route, nil, nil, nil, fare_fn)

      assert %Fare{cents: 13_600} = Month.base_pass(express_route, nil, nil, nil, fare_fn)
    end

    test "returns the lowest and highest subway pass fares for the SL1, SL2, and SL3 routes" do
      sl1 = %Route{type: 3, id: "741"}
      sl2 = %Route{type: 3, id: "742"}
      sl3 = %Route{type: 3, id: "743"}

      fare_fn = fn @default_filters ++ [name: :subway] ->
        Enum.filter(@subway_fares, &(&1.name == :subway))
      end

      assert %Fare{cents: 9_000} = Month.recommended_pass(sl1, nil, nil, nil, fare_fn)
      assert %Fare{cents: 9_000} = Month.base_pass(sl1, nil, nil, nil, fare_fn)
      assert %Fare{cents: 9_000} = Month.recommended_pass(sl2, nil, nil, nil, fare_fn)
      assert %Fare{cents: 9_000} = Month.base_pass(sl2, nil, nil, nil, fare_fn)
      assert %Fare{cents: 9_000} = Month.recommended_pass(sl3, nil, nil, nil, fare_fn)
      assert %Fare{cents: 9_000} = Month.base_pass(sl3, nil, nil, nil, fare_fn)
    end

    test "returns the lowest and highest bus pass fares for the SL4 and SL5 routes" do
      sl4 = %Route{type: 3, id: "751"}
      sl5 = %Route{type: 3, id: "749"}

      fare_fn = fn @default_filters ++ [name: :local_bus] ->
        Enum.filter(@bus_fares, &(&1.name == :local_bus))
      end

      assert %Fare{cents: 5_500} = Month.recommended_pass(sl4, nil, nil, nil, fare_fn)
      assert %Fare{cents: 5_500} = Month.base_pass(sl4, nil, nil, nil, fare_fn)
      assert %Fare{cents: 5_500} = Month.recommended_pass(sl5, nil, nil, nil, fare_fn)
      assert %Fare{cents: 5_500} = Month.base_pass(sl5, nil, nil, nil, fare_fn)
    end
  end

  describe "commuter rail" do
    test "returns the lowest and highest one-way fares that are not discounted for a trip originating in Zone 1A" do
      route = %Route{type: 2}
      origin_id = "place-north"
      destination_id = "Haverhill"

      fare_fn = fn @default_filters ++ [name: {:zone, "7"}] ->
        [
          %Fare{
            additional_valid_modes: [:subway, :bus, :ferry],
            cents: 36_000,
            duration: :month,
            media: [:commuter_ticket],
            mode: :commuter_rail,
            name: {:zone, "7"},
            price_label: nil,
            reduced: nil
          },
          %Fare{
            additional_valid_modes: [],
            cents: 35_000,
            duration: :month,
            media: [:mticket],
            mode: :commuter_rail,
            name: {:zone, "7"},
            price_label: nil,
            reduced: nil
          }
        ]
      end

      assert %Fare{cents: 35_000} =
               Month.recommended_pass(route, nil, origin_id, destination_id, fare_fn)

      assert %Fare{cents: 36_000} =
               Month.base_pass(route, nil, origin_id, destination_id, fare_fn)
    end

    test "returns the lowest and highest one-way fares that are not discounted for a trip terminating in Zone 1A" do
      route = %Route{type: 2}
      origin_id = "Ballardvale"
      destination_id = "place-north"

      fare_fn = fn @default_filters ++ [name: {:zone, "4"}] ->
        [
          %Fare{
            additional_valid_modes: [:subway, :bus, :ferry],
            cents: 28_100,
            duration: :month,
            media: [:commuter_ticket],
            mode: :commuter_rail,
            name: {:zone, "4"},
            price_label: nil,
            reduced: nil
          },
          %Fare{
            additional_valid_modes: [],
            cents: 27_100,
            duration: :month,
            media: [:mticket],
            mode: :commuter_rail,
            name: {:zone, "4"},
            price_label: nil,
            reduced: nil
          }
        ]
      end

      assert %Fare{cents: 27_100} =
               Month.recommended_pass(route, nil, origin_id, destination_id, fare_fn)

      assert %Fare{cents: 28_100} =
               Month.base_pass(route, nil, origin_id, destination_id, fare_fn)
    end

    test "returns an interzone fares that are not discounted for a trip that does not originate/terminate in Zone 1A" do
      route = %Route{type: 2}
      origin_id = "Ballardvale"
      destination_id = "Haverhill"

      fare_fn = fn @default_filters ++ [name: {:interzone, "4"}] ->
        [
          %Fare{
            additional_valid_modes: [:bus],
            cents: 13_900,
            duration: :month,
            media: [:commuter_ticket],
            mode: :commuter_rail,
            name: {:interzone, "4"},
            price_label: nil,
            reduced: nil
          },
          %Fare{
            additional_valid_modes: [],
            cents: 12_900,
            duration: :month,
            media: [:mticket],
            mode: :commuter_rail,
            name: {:interzone, "4"},
            price_label: nil,
            reduced: nil
          }
        ]
      end

      assert %Fare{cents: 12_900} =
               Month.recommended_pass(route, nil, origin_id, destination_id, fare_fn)

      assert %Fare{cents: 13_900} =
               Month.base_pass(route, nil, origin_id, destination_id, fare_fn)
    end

    test "returns zone-based fares for standard trips on Foxboro pilot" do
      route = %Route{type: 2, id: "CR-Franklin"}
      trip_1 = %Trip{name: "751", id: "CR-Weekday-Fall-19-751"}
      trip_2 = %Trip{name: "759", id: "CR-Weekday-Fall-19-759"}

      assert %Fare{name: {:zone, "4"}} =
               Month.recommended_pass(route, trip_1, "place-sstat", "place-PB-0194")

      assert %Fare{name: {:interzone, "3"}} =
               Month.recommended_pass(route, trip_2, "place-FB-0118", "place-PB-0194")
    end

    test "accepts a Trip ID" do
      route = %Route{type: 2, id: "CR-Franklin"}
      trip_id = "CR-Weekday-Fall-19-751"

      assert %Fare{name: {:zone, "4"}} =
               Month.recommended_pass(route, trip_id, "place-sstat", "place-PB-0194")

      assert %Fare{name: {:zone, "4"}} =
               Month.base_pass(route, trip_id, "place-sstat", "place-PB-0194")
    end

    test "returns nil if no matching fares found" do
      route = %Route{type: 2, id: "CapeFlyer"}
      origin_id = "place-sstat"
      destination_id = "Hyannis"

      fare_fn = fn _ -> [] end

      assert Month.recommended_pass(route, nil, origin_id, destination_id, fare_fn) == nil
    end
  end

  describe "ferry" do
    test "returns the fares that are not discounted for the correct ferry trip" do
      route = %Route{type: 4}
      origin_id = "Boat-Charlestown"
      destination_id = "Boat-Long-South"

      fare_fn = fn @default_filters ++ [name: :ferry_inner_harbor] ->
        [
          %Fare{
            additional_valid_modes: [:subway, :bus, :commuter_rail],
            cents: 9_000,
            duration: :month,
            media: [:charlie_ticket],
            mode: :ferry,
            name: :ferry_inner_harbor,
            price_label: nil,
            reduced: nil
          },
          %Fare{
            additional_valid_modes: [],
            cents: 8_000,
            duration: :month,
            media: [:mticket],
            mode: :ferry,
            name: :ferry_inner_harbor,
            price_label: nil,
            reduced: nil
          }
        ]
      end

      assert %Fare{cents: 8_000} =
               Month.recommended_pass(route, nil, origin_id, destination_id, fare_fn)

      assert %Fare{cents: 9_000} = Month.base_pass(route, nil, origin_id, destination_id, fare_fn)
    end
  end
end
