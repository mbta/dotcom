defmodule Dotcom.TripPlan.FaresTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Fares
  import OpenTripPlannerClient.Test.Support.Factory

  describe "fare/1" do
    test "returns a number" do
      itinerary = build(:itinerary)
      assert fare(itinerary) |> is_integer()
    end

    test "returns nil if involving transit agency we don't know fares for" do
      itinerary =
        build(:itinerary,
          legs: build_list(1, :transit_leg, agency: build(:agency, name: Faker.Lorem.word()))
        )

      assert fare(itinerary) |> is_nil()
    end

    test "gives a free subway transfer after taking the SL1 from the airport" do
      airport_stop = Faker.Util.pick(~w(17091 27092 17093 17094 17095))

      legs_with_transfer = [
        build(:transit_leg,
          from: build(:place, stop: build(:stop, gtfs_id: "mbta-ma-us:#{airport_stop}")),
          route:
            build(:route,
              agency: build(:agency, name: "MBTA"),
              type: 3,
              gtfs_id: "mbta-ma-us:741"
            )
        ),
        build(:transit_leg,
          route:
            build(:route, agency: build(:agency, name: "MBTA"), type: Faker.Util.pick([0, 1]))
        )
      ]

      itinerary = build(:itinerary, legs: legs_with_transfer)
      fare = fare(itinerary)
      assert fare == 0
    end

    test "free transfers for up to 3 consecutive bus legs" do
      bus_legs =
        build_list(3, :transit_leg,
          route: fn ->
            build(:route,
              agency: build(:agency, name: "MBTA"),
              type: 3
            )
          end
        )

      fare1 = build(:itinerary, legs: Enum.take(bus_legs, 1)) |> fare()
      fare2 = build(:itinerary, legs: Enum.take(bus_legs, 2)) |> fare()
      fare3 = build(:itinerary, legs: Enum.take(bus_legs, 3)) |> fare()
      assert fare1 == fare2
      assert fare2 == fare3
    end
  end

  test "subway to subway transfers are free even between different lines/stations (eg red <-> blue)" do
    start_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop)),
        to: build(:place, stop: build(:stop)),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: Faker.Util.pick([0, 1])
          )
      )

    end_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop)),
        to: build(:place, stop: build(:stop)),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: Faker.Util.pick([0, 1])
          )
      )

    one_subway_fare =
      build(:itinerary,
        legs:
          build_list(1, :transit_leg,
            route:
              build(:route,
                agency: build(:agency, name: "MBTA"),
                type: Faker.Util.pick([0, 1])
              )
          )
      )
      |> fare()

    fare = build(:itinerary, legs: [start_leg, end_leg]) |> fare()
    assert fare == one_subway_fare
  end

  test "subway to subway to subway transfers are free even between different lines/stations (eg red <-> blue)" do
    start_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-start"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midA"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: Faker.Util.pick([0, 1])
          )
      )

    mid_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midA"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midB"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: Faker.Util.pick([0, 1])
          )
      )

    end_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-other"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-end"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: Faker.Util.pick([0, 1])
          )
      )

    one_subway_fare =
      build(:itinerary,
        legs:
          build_list(1, :transit_leg,
            route:
              build(:route,
                agency: build(:agency, name: "MBTA"),
                type: Faker.Util.pick([0, 1])
              )
          )
      )
      |> fare()

    fare = build(:itinerary, legs: [start_leg, mid_leg, end_leg]) |> fare()
    assert fare == one_subway_fare
  end

  test "unlimited transfers between bus, subway, and ferry only charge the highest-priced leg" do
    bus_leg =
      build(:transit_leg,
        route: build(:route, agency: build(:agency, name: "MBTA"), type: 3, desc: "Local Bus")
      )

    subway_leg =
      build(:transit_leg,
        route: build(:route, agency: build(:agency, name: "MBTA"), type: Faker.Util.pick([0, 1]))
      )

    ferry_leg =
      build(:transit_leg, route: build(:route, agency: build(:agency, name: "MBTA"), type: 4))

    itinerary = build(:itinerary, legs: [bus_leg, subway_leg, ferry_leg, bus_leg, subway_leg])

    fares_for_legs = [bus_leg, subway_leg, ferry_leg] |> Enum.map(&cents_for_leg/1)

    assert fare(itinerary) == Enum.max(fares_for_legs)
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
          route:
            build(:route,
              agency: build(:agency, name: "Logan Express"),
              short_name: Faker.Util.pick(["FH", "WO", "DV", "BT"])
            )
        )

      assert cents_for_leg(leg) == 900
    end

    test "Logan Express Back Bay from airport" do
      airport_name =
        Faker.Util.pick(["Logan Airport", "Terminal A", "Terminal B", "Terminal B - Departures"])

      leg =
        build(:transit_leg,
          agency: build(:agency, name: "Logan Express"),
          route:
            build(:route,
              agency: build(:agency, name: "Logan Express"),
              short_name: "BB"
            ),
          from: build(:place, name: airport_name)
        )

      assert cents_for_leg(leg) == 0
    end

    test "Logan Express Back Bay not from Airport" do
      leg =
        build(:transit_leg,
          agency: build(:agency, name: "Logan Express"),
          route:
            build(:route,
              agency: build(:agency, name: "Logan Express"),
              short_name: "BB"
            )
        )

      assert cents_for_leg(leg) == 300
    end

    test "SL1 from the airport" do
      airport_stop = Faker.Util.pick(~w(17091 27092 17093 17094 17095))

      leg =
        build(:transit_leg,
          from: build(:place, stop: build(:stop, gtfs_id: "mbta-ma-us:#{airport_stop}")),
          mode: :BUS,
          route:
            build(:route,
              agency: build(:agency, name: "MBTA"),
              type: 3,
              gtfs_id: "mbta-ma-us:741"
            )
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
