defmodule Dotcom.TripPlan.FaresTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Fares
  import Mox
  import OpenTripPlannerClient.Test.Support.Factory

  alias Test.Support.Generators

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

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
          route: build(:route, agency: build(:agency, name: "MBTA"), type: 0)
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

    @tag skip: "The code is incorrect"
    test "free transfers for up to 3 consecutive bus or subway legs" do
      bus_or_subway_routes = [
        build(:route,
          agency: build(:agency, name: "MBTA"),
          type: 0
        ),
        build(:route,
          agency: build(:agency, name: "MBTA"),
          type: 1
        ),
        build(:route,
          agency: build(:agency, name: "MBTA"),
          type: 3,
          desc: "Local Bus"
        )
      ]

      three_subway_or_bus_legs =
        3
        |> Faker.Util.sample_uniq(fn -> Faker.Util.pick(bus_or_subway_routes) end)
        |> Enum.map(&build(:transit_leg, route: &1))

      one_subway_fare =
        build(:itinerary,
          legs:
            build_list(1, :transit_leg,
              route:
                build(:route,
                  agency: build(:agency, name: "MBTA"),
                  type: 0
                )
            )
        )
        |> fare()

      fare = build(:itinerary, legs: three_subway_or_bus_legs) |> fare()
      assert fare <= one_subway_fare
    end
  end

  test "valid two leg subway transfers" do
    start_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-start"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midA"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    end_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midA"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-end"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    one_subway_fare =
      build(:itinerary,
        legs:
          build_list(1, :transit_leg,
            route:
              build(:route,
                agency: build(:agency, name: "MBTA"),
                type: 0
              )
          )
      )
      |> fare()

    fare = build(:itinerary, legs: [start_leg, end_leg]) |> fare()
    assert fare <= one_subway_fare
  end

  test "valid three leg subway transfers" do
    start_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-start"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midA"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    mid_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midA"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midB"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    end_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midB"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-end"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    one_subway_fare =
      build(:itinerary,
        legs:
          build_list(1, :transit_leg,
            route:
              build(:route,
                agency: build(:agency, name: "MBTA"),
                type: 0
              )
          )
      )
      |> fare()

    fare = build(:itinerary, legs: [start_leg, mid_leg, end_leg]) |> fare()
    assert fare <= one_subway_fare
  end

  test "invalid two leg subway transfers (eg red <-> blue)" do
    start_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-start"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midA"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    end_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midB"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-end"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    one_subway_fare =
      build(:itinerary,
        legs:
          build_list(1, :transit_leg,
            route:
              build(:route,
                agency: build(:agency, name: "MBTA"),
                type: 0
              )
          )
      )
      |> fare()

    fare = build(:itinerary, legs: [start_leg, end_leg]) |> fare()
    assert fare > one_subway_fare
  end

  test "invalid three leg subway transfers (eg red <-> blue)" do
    start_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-start"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midA"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    mid_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midA"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-midB"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    end_leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-other"})),
        to: build(:place, stop: build(:stop, parent_station: %{gtfs_id: "mock-end"})),
        route:
          build(:route,
            agency: build(:agency, name: "MBTA"),
            type: 0
          )
      )

    one_subway_fare =
      build(:itinerary,
        legs:
          build_list(1, :transit_leg,
            route:
              build(:route,
                agency: build(:agency, name: "MBTA"),
                type: 0
              )
          )
      )
      |> fare()

    fare = build(:itinerary, legs: [start_leg, mid_leg, end_leg]) |> fare()
    assert fare > one_subway_fare
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

    test "Free bus routes" do
      mbta_agency = build(:agency, name: "MBTA")
      route_id = Faker.Util.pick(~w(23 28 29))

      leg =
        build(:transit_leg,
          agency: mbta_agency,
          from: build(:place_with_stop),
          to: build(:place_with_stop),
          route: build(:route, agency: mbta_agency, type: 3, gtfs_id: "mbta-ma-us:#{route_id}")
        )

      cents = cents_for_leg(leg)
      assert cents == 0
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

  describe "fare_nouveau/1" do
    test "returns the appropriate fare for a single-leg trip" do
      # Setup
      mbta_agency = build(:agency, name: "MBTA")

      leg = build(:transit_leg, agency: mbta_agency, route: build(:route, agency: mbta_agency))
      itinerary = build(:itinerary, legs: [leg])

      # Exercise / Verify
      assert fare_nouveau(itinerary) == cents_for_leg(leg)
    end

    test "returns the appropriate fare if a transit leg is surrounded by walking legs" do
      # Setup
      mbta_agency = build(:agency, name: "MBTA")

      transit_leg =
        build(:transit_leg, agency: mbta_agency, route: build(:route, agency: mbta_agency))

      legs = [
        build(:walking_leg),
        transit_leg,
        build(:walking_leg)
      ]

      itinerary = build(:itinerary, legs: legs)

      # Exercise
      fare = fare_nouveau(itinerary)

      # Verify
      assert fare == cents_for_leg(transit_leg)
    end

    test "charges the highest fare for any combination of subway, bus, and ferry within a 2-hour window" do
      # Setup
      itinerary_start_time = Generators.DateTime.random_date_time()
      transfer_window_end_time = itinerary_start_time |> DateTime.shift(hour: 2)

      legs = legs_in_window(itinerary_start_time, transfer_window_end_time)
      itinerary = build(:itinerary, legs: legs)

      # Exercise
      fare = fare_nouveau(itinerary)

      # Verify
      max_leg_fare = legs |> Enum.map(&cents_for_leg/1) |> Enum.max()

      assert fare == max_leg_fare
    end

    test "charges another fare after the two hour window has elapsed" do
      # Setup
      itinerary_start_time = Generators.DateTime.random_date_time()
      first_window_end_time = itinerary_start_time |> DateTime.shift(hour: 2)

      second_window_start_time =
        Generators.DateTime.random_date_time_after(first_window_end_time)

      second_window_end_time = second_window_start_time |> DateTime.shift(hour: 2)

      first_window_legs = legs_in_window(itinerary_start_time, first_window_end_time)
      second_window_legs = legs_in_window(second_window_start_time, second_window_end_time)

      itinerary = build(:itinerary, legs: first_window_legs ++ second_window_legs)

      # Exercise
      fare = fare_nouveau(itinerary)

      # Verify
      max_first_window_leg_fare = first_window_legs |> Enum.map(&cents_for_leg/1) |> Enum.max()
      max_second_window_leg_fare = second_window_legs |> Enum.map(&cents_for_leg/1) |> Enum.max()

      assert fare == max_first_window_leg_fare + max_second_window_leg_fare
    end

    test "charges commuter rail fares separately from other modes" do
      # Setup
      itinerary_start_time = Generators.DateTime.random_date_time()
      transfer_window_end_time = itinerary_start_time |> DateTime.shift(hour: 2)

      transfer_legs = legs_in_window(itinerary_start_time, transfer_window_end_time)

      commuter_rail_legs =
        legs_in_window(itinerary_start_time, transfer_window_end_time, modes: [2])

      legs =
        (transfer_legs ++ commuter_rail_legs) |> Enum.sort_by(& &1.start.scheduled_time, DateTime)

      itinerary = build(:itinerary, legs: legs)

      # Exercise
      fare = fare_nouveau(itinerary)

      # Verify
      max_transfer_fare = transfer_legs |> Enum.map(&cents_for_leg/1) |> Enum.max()
      commuter_rail_fare = commuter_rail_legs |> Enum.map(&cents_for_leg/1) |> Enum.sum()

      assert fare == max_transfer_fare + commuter_rail_fare
    end

    test "charges Logan Express fares separately from other modes" do
      # Setup
      itinerary_start_time = Generators.DateTime.random_date_time()
      transfer_window_end_time = itinerary_start_time |> DateTime.shift(hour: 2)

      transfer_legs = legs_in_window(itinerary_start_time, transfer_window_end_time)

      logan_express_legs =
        legs_in_window(itinerary_start_time, transfer_window_end_time, agency: "Logan Express")

      legs =
        (transfer_legs ++ logan_express_legs) |> Enum.sort_by(& &1.start.scheduled_time, DateTime)

      itinerary = build(:itinerary, legs: legs)

      # Exercise
      fare = fare_nouveau(itinerary)

      # Verify
      max_transfer_fare = transfer_legs |> Enum.map(&cents_for_leg/1) |> Enum.max()
      logan_express_fare = logan_express_legs |> Enum.map(&cents_for_leg/1) |> Enum.sum()

      assert fare == max_transfer_fare + logan_express_fare
    end

    # This only applies to SL1, SL2, SL3, and SLW. SL4 and SL5 are
    # regular buses that don't have in-station transfers
    test "counts in-station subway-or-SL-to-subway-or-SL transfers as free, even outside the 2-hour window" do
      # Setup
      mbta_agency = build(:agency, name: "MBTA")
      parent_station = build(:parent_stop)

      first_leg_start = Generators.DateTime.random_date_time()

      first_leg =
        build(:transit_leg,
          to: build(:place, stop: build(:stop, parent_station: parent_station)),
          route: subway_or_silver_line_route(mbta_agency),
          start: build(:leg_time, scheduled_time: first_leg_start)
        )

      walking_leg =
        build(:walking_leg,
          from: build(:place, stop: build(:stop, parent_station: parent_station)),
          to: build(:place, stop: build(:stop, parent_station: parent_station))
        )

      second_leg_start =
        first_leg_start |> DateTime.shift(hour: 2) |> Generators.DateTime.random_date_time_after()

      second_leg =
        build(:transit_leg,
          from: build(:place, stop: build(:stop, parent_station: parent_station)),
          route: subway_or_silver_line_route(mbta_agency),
          start: build(:leg_time, scheduled_time: second_leg_start)
        )

      itinerary = build(:itinerary, legs: [first_leg, walking_leg, second_leg])

      # Exercise
      fare = fare_nouveau(itinerary)

      # Verify
      assert fare == cents_for_leg(first_leg)
    end

    test "does not count subway-or-SL-to-subway-or-SL transfers as free outside the 2-hour window if they are at different stations" do
      # Setup
      mbta_agency = build(:agency, name: "MBTA")

      first_leg_start = Generators.DateTime.random_date_time()

      first_leg =
        build(:transit_leg,
          route: subway_or_silver_line_route(mbta_agency),
          start: build(:leg_time, scheduled_time: first_leg_start)
        )

      second_leg_start =
        first_leg_start |> DateTime.shift(hour: 2) |> Generators.DateTime.random_date_time_after()

      second_leg =
        build(:transit_leg,
          route: subway_or_silver_line_route(mbta_agency),
          start: build(:leg_time, scheduled_time: second_leg_start)
        )

      itinerary = build(:itinerary, legs: [first_leg, second_leg])

      # Exercise
      fare = fare_nouveau(itinerary)

      # Verify
      assert fare == cents_for_leg(first_leg) + cents_for_leg(second_leg)
    end

    test "does not count transfers from regular buses to subway-or-SL as free even if they're at the same station" do
      # Setup
      mbta_agency = build(:agency, name: "MBTA")

      parent_station = build(:parent_stop)

      first_leg_start = Generators.DateTime.random_date_time()

      first_leg =
        build(:transit_leg,
          route: build(:route, type: 3, agency: mbta_agency),
          start: build(:leg_time, scheduled_time: first_leg_start),
          to: build(:place, stop: build(:stop, parent_station: parent_station))
        )

      second_leg_start =
        Faker.DateTime.between(first_leg_start, first_leg_start |> DateTime.shift(hour: 2))

      second_leg =
        build(:transit_leg,
          from: build(:place, stop: build(:stop, parent_station: parent_station)),
          route: subway_or_silver_line_route(mbta_agency),
          start: build(:leg_time, scheduled_time: second_leg_start)
        )

      itinerary = build(:itinerary, legs: [first_leg, second_leg])

      # Exercise
      fare = fare_nouveau(itinerary)

      # Verify
      assert fare > cents_for_leg(first_leg)
    end

    # test "free legs don't start a 2-hour transfer window"
  end

  defp legs_in_window(start_time, end_time, opts \\ []) do
    modes = opts |> Keyword.get(:modes, [0, 1, 3, 4])
    agency_name = opts |> Keyword.get(:agency, "MBTA")

    agency = build(:agency, name: agency_name)

    leg_count = Faker.random_between(2, 20)

    leg_start_times =
      [
        start_time
        | Faker.Util.sample_uniq(leg_count - 1, fn ->
            Faker.DateTime.between(start_time, end_time)
          end)
          |> Enum.sort(DateTime)
      ]

    modes = Enum.map(1..leg_count, fn _ -> Faker.Util.pick(modes) end)

    Enum.zip([leg_start_times, modes])
    |> Enum.map(fn {start_time, mode} ->
      build(:transit_leg,
        agency: agency,
        route: build(:route, agency: agency, type: mode),
        start: build(:leg_time, scheduled_time: start_time)
      )
    end)
  end

  defp subway_or_silver_line_route(agency) do
    subway_or_silver_line_route(Faker.Util.pick([:subway, :silver_line]), agency)
  end

  defp subway_or_silver_line_route(:subway, agency) do
    build(:route, type: Faker.Util.pick([0, 1]), agency: agency)
  end

  defp subway_or_silver_line_route(:silver_line, agency) do
    route_id = Faker.Util.pick(~w(741 742 743 746))
    build(:route, type: 3, gtfs_id: "mbta-ma-us:#{route_id}", agency: agency)
  end
end
