defmodule Dotcom.TripPlan.FaresTest do
  use ExUnit.Case, async: true

  import Mox
  import Dotcom.TripPlan.Fares
  import OpenTripPlannerClient.Test.Support.Factory

  setup :verify_on_exit!

  describe "fare/1" do
    test "fare" do
      itinerary = build(:itinerary)
      assert fare(itinerary) |> is_integer()
    end
  end

  describe "cents_for_leg/1" do
    test "walking leg" do
      leg = build(:walking_leg)
      assert cents_for_leg(leg) == 0
    end

    test "Massport" do
      leg = build(:transit_leg, agency: build(:agency, name: "Massport"))
      assert cents_for_leg(leg) == 0
    end

    test "Logan Express (not Back Bay)" do
      leg =
        build(:transit_leg,
          agency: build(:agency, name: "Logan Express"),
          route: build(:route, short_name: Faker.Util.pick(["FH", "WO", "DV", "BT"]))
        )

      assert cents_for_leg(leg) == 900
    end

    test "Logan Express Back Bay from airport" do
      airport_name =
        Faker.Util.pick(["Logan Airport", "Terminal A", "Terminal B", "Terminal B - Departures"])

      leg =
        build(:transit_leg,
          agency: build(:agency, name: "Logan Express"),
          route: build(:route, short_name: "BB"),
          from: build(:place, name: airport_name)
        )

      assert cents_for_leg(leg) == 0
    end

    test "MBTA routes" do
      leg =
        build(:transit_leg,
          agency: build(:agency, name: "MBTA"),
          from: build(:place_with_stop),
          to: build(:place_with_stop)
        )

      cents = cents_for_leg(leg)
      assert is_integer(cents)
    end
  end
end
