defmodule Dotcom.TripPlan.TransferTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Transfer
  import OpenTripPlannerClient.Test.Support.Factory

  describe "maybe_transfer?/1 correctly identifies the potential presence of a transfer [assumes single ride media]" do
    defp bus_leg,
      do:
        build(:transit_leg,
          agency: build(:agency, name: "MBTA"),
          route: build(:route, type: 3, desc: "Local Bus")
        )

    defp subway_leg,
      do: build(:transit_leg, agency: build(:agency, name: "MBTA"), route: build(:route, type: 1))

    defp cr_leg,
      do: build(:transit_leg, agency: build(:agency, name: "MBTA"), route: build(:route, type: 2))

    defp ferry_leg,
      do: build(:transit_leg, agency: build(:agency, name: "MBTA"), route: build(:route, type: 4))

    defp xp_leg,
      do:
        build(:transit_leg,
          agency: build(:agency, name: "MBTA"),
          route:
            build(:route, type: 3, gtfs_id: "mbta-ma-us:" <> Faker.Util.pick(Fares.express()))
        )

    defp sl_rapid_leg,
      do:
        build(:transit_leg,
          agency: build(:agency, name: "MBTA"),
          route:
            build(:route,
              agency: build(:agency, name: "MBTA"),
              type: 3,
              gtfs_id: "mbta-ma-us:" <> Faker.Util.pick(Fares.silver_line_rapid_transit())
            )
        )

    defp shuttle_leg,
      do:
        build(:transit_leg,
          agency: build(:agency, name: "MBTA"),
          route:
            build(:route,
              agency: build(:agency, name: "MBTA"),
              type: 3,
              desc: "Rail Replacement Bus"
            )
        )

    test "if from or to is nil" do
      refute [nil, nil] |> maybe_transfer?
      refute [subway_leg(), nil] |> maybe_transfer?
      refute [nil, bus_leg()] |> maybe_transfer?
    end

    test "subway -> local bus" do
      assert [subway_leg(), bus_leg()] |> maybe_transfer?
    end

    test "local bus -> subway" do
      assert [bus_leg(), subway_leg()] |> maybe_transfer?
    end

    test "local bus -> local bus" do
      assert [bus_leg(), bus_leg()] |> maybe_transfer?
    end

    test "express bus -> subway" do
      assert [xp_leg(), subway_leg()] |> maybe_transfer?
    end

    test "express bus -> local bus" do
      assert [xp_leg(), bus_leg()] |> maybe_transfer?
    end

    test "SL1 -> local bus" do
      assert [sl_rapid_leg(), bus_leg()] |> maybe_transfer?
    end

    test "local bus -> the same local bus" do
      bus_leg = bus_leg()
      refute [bus_leg, bus_leg] |> maybe_transfer?
    end

    test "express bus -> express bus" do
      assert [xp_leg(), xp_leg()] |> maybe_transfer?
    end

    test "commuter rail -> any other mode" do
      refute [cr_leg(), cr_leg()] |> maybe_transfer?
      refute [cr_leg(), subway_leg()] |> maybe_transfer?
      refute [cr_leg(), bus_leg()] |> maybe_transfer?
      refute [cr_leg(), xp_leg()] |> maybe_transfer?
      refute [cr_leg(), sl_rapid_leg()] |> maybe_transfer?
    end

    test "ferry -> bus, subway, or ferry" do
      assert [ferry_leg(), ferry_leg()] |> maybe_transfer?
      assert [ferry_leg(), subway_leg()] |> maybe_transfer?
      assert [ferry_leg(), bus_leg()] |> maybe_transfer?
      assert [ferry_leg(), sl_rapid_leg()] |> maybe_transfer?
    end

    test "ferry -> express bus is not a transfer" do
      refute [ferry_leg(), xp_leg()] |> maybe_transfer?
    end

    test "subway -> subway" do
      assert [subway_leg(), subway_leg()] |> maybe_transfer?
    end

    test "shuttle -> subway or bus" do
      refute maybe_transfer?([shuttle_leg(), bus_leg()])
      refute maybe_transfer?([shuttle_leg(), subway_leg()])
    end

    test "any number of consecutive bus, subway, and/or ferry legs" do
      assert [bus_leg(), subway_leg(), ferry_leg(), bus_leg(), subway_leg()]
             |> maybe_transfer?
    end

    test "a bus route repeated mid-chain breaks the transfer" do
      bus_leg = bus_leg()
      refute [subway_leg(), bus_leg, bus_leg, subway_leg()] |> maybe_transfer?
    end
  end
end
