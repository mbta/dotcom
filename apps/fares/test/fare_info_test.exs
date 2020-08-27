defmodule Fares.FareInfoTest do
  use ExUnit.Case, async: true
  alias Fares.Fare
  import Fares.FareInfo

  describe "fare_info/0" do
    test "returns a non-empty list of Fare objects" do
      actual = fare_info()
      refute actual == []
      assert Enum.all?(actual, &match?(%Fare{}, &1))
    end

    test "no duplicate fares are present" do
      results = fare_info()
      unique = Enum.uniq(results)
      assert Enum.count(results) == Enum.count(unique)
    end

    test "reduced fares for senior and student media have been broken out" do
      results = fare_info()
      assert Enum.any?(results, &match?(%Fare{reduced: :senior_disabled}, &1))
      assert Enum.any?(results, &match?(%Fare{reduced: :student}, &1))
      assert Enum.any?(results, &match?(%Fare{reduced: :any}, &1))
    end
  end

  describe "mapper/1" do
    test "maps the fares for a zone into one-way, round trip, monthly, mticket, and weekend prices" do
      assert mapper(["commuter", "zone_1a", "2.25", "1.10", "84.50"]) == [
               %Fare{
                 name: {:zone, "1A"},
                 mode: :commuter_rail,
                 duration: :single_trip,
                 media: [:commuter_ticket, :cash, :mticket],
                 reduced: nil,
                 cents: 225
               },
               %Fare{
                 name: {:zone, "1A"},
                 mode: :commuter_rail,
                 duration: :single_trip,
                 media: [:senior_card, :student_card],
                 reduced: :any,
                 cents: 110
               },
               %Fare{
                 name: {:zone, "1A"},
                 mode: :commuter_rail,
                 duration: :round_trip,
                 media: [:commuter_ticket, :cash, :mticket],
                 reduced: nil,
                 cents: 450
               },
               %Fare{
                 name: {:zone, "1A"},
                 mode: :commuter_rail,
                 duration: :round_trip,
                 media: [:senior_card, :student_card],
                 reduced: :any,
                 cents: 220
               },
               %Fare{
                 name: {:zone, "1A"},
                 mode: :commuter_rail,
                 duration: :month,
                 media: [:commuter_ticket],
                 reduced: nil,
                 cents: 8450,
                 additional_valid_modes: [:subway, :bus, :ferry]
               },
               %Fare{
                 name: {:zone, "1A"},
                 mode: :commuter_rail,
                 duration: :month,
                 media: [:mticket],
                 reduced: nil,
                 cents: 7450
               },
               %Fare{
                 name: {:zone, "1A"},
                 mode: :commuter_rail,
                 duration: :weekend,
                 media: [:commuter_ticket, :cash, :mticket],
                 reduced: nil,
                 cents: 1_000
               }
             ]
    end

    test "does not include subway or ferry modes for interzone fares" do
      assert mapper(["commuter", "interzone_5", "4.50", "2.25", "148.00"]) == [
               %Fare{
                 additional_valid_modes: [],
                 cents: 450,
                 duration: :single_trip,
                 media: [:commuter_ticket, :cash, :mticket],
                 mode: :commuter_rail,
                 name: {:interzone, "5"},
                 reduced: nil
               },
               %Fare{
                 additional_valid_modes: [],
                 cents: 225,
                 duration: :single_trip,
                 media: [:senior_card, :student_card],
                 mode: :commuter_rail,
                 name: {:interzone, "5"},
                 reduced: :any
               },
               %Fare{
                 additional_valid_modes: [],
                 cents: 900,
                 duration: :round_trip,
                 media: [:commuter_ticket, :cash, :mticket],
                 mode: :commuter_rail,
                 name: {:interzone, "5"},
                 reduced: nil
               },
               %Fare{
                 additional_valid_modes: [],
                 cents: 450,
                 duration: :round_trip,
                 media: [:senior_card, :student_card],
                 mode: :commuter_rail,
                 name: {:interzone, "5"},
                 reduced: :any
               },
               %Fare{
                 additional_valid_modes: [:bus],
                 cents: 14_800,
                 duration: :month,
                 media: [:commuter_ticket],
                 mode: :commuter_rail,
                 name: {:interzone, "5"},
                 reduced: nil
               },
               %Fare{
                 additional_valid_modes: [],
                 cents: 13_800,
                 duration: :month,
                 media: [:mticket],
                 mode: :commuter_rail,
                 name: {:interzone, "5"},
                 reduced: nil
               },
               %Fare{
                 additional_valid_modes: [],
                 cents: 1000,
                 duration: :weekend,
                 media: [:commuter_ticket, :cash, :mticket],
                 mode: :commuter_rail,
                 name: {:interzone, "5"},
                 price_label: nil,
                 reduced: nil
               }
             ]
    end
  end

  describe "mticket_price/1" do
    test "subtracts 10 dollars from the monthly price" do
      assert mticket_price(2000) == 1000
    end
  end

  describe "georges_island_ferry_fares/0" do
    test "returns 7 Fare structs with name :ferry_george" do
      fares = georges_island_ferry_fares()
      assert length(fares) == 7
      assert Enum.all?(fares, fn %Fare{name: :ferry_george} -> true end)
    end
  end

  describe "mapper/2" do
    test "merges paper and plastic fares for subway and bus" do
      fare_map_expected_modes = [
        ["subway", "2.40", "2.40", "1.10", "30.00", "12.75", "22.50", "90.00", ""],
        ["local_bus", "1.70", "1.70", "0.85", "30.00", "12.75", "22.50", "55.00", ""],
        ["inner_express_bus", "4.25", "4.25", "2.10", "30.00", "12.75", "22.50", "136.00", ""],
        ["outer_express_bus", "5.25", "5.25", "2.60", "30.00", "12.75", "22.50", "168.00", ""]
      ]

      assert Enum.count(
               Enum.flat_map(fare_map_expected_modes, &mapper(&1, 1_598_918_400)),
               &match?(%Fare{media: [:charlie_card, :charlie_ticket, :cash]}, &1)
             ) == 4

      refute Enum.any?(
               Enum.flat_map(fare_map_expected_modes, &mapper(&1, 1_598_918_400)),
               &match?(%Fare{media: [:charlie_card]}, &1)
             )

      refute Enum.any?(
               Enum.flat_map(fare_map_expected_modes, &mapper(&1, 1_598_918_400)),
               &match?(%Fare{media: [:charlie_ticket, :cash]}, &1)
             )

      fare_map_expected_unchanged_modes = [
        ["commuter", "interzone_10", "7.25", "3.50", "257.00", "", "", "", ""],
        ["foxboro", "20.00", "", "", "", "", "", "", ""],
        ["ferry", "3.70", "90.00", "9.75", "9.75", "329.00", "9.75", "12.75", "22.50"],
        ["the_ride", "3.35", "5.60", "", "", "", "", "", ""]
      ]

      refute Enum.any?(
               Enum.flat_map(fare_map_expected_unchanged_modes, &mapper(&1, 1_598_918_400)),
               &match?(%Fare{media: [:charlie_card, :charlie_ticket, :cash]}, &1)
             )
    end
  end
end
