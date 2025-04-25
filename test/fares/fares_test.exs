defmodule FaresTest do
  use ExUnit.Case, async: true
  doctest Fares

  import Mox

  alias Test.Support.Factories.{Routes.Route, Stops.Stop}

  setup :verify_on_exit!

  describe "calculate_commuter_rail/2" do
    test "when the origin is zone 6, finds the zone 6 fares" do
      assert Fares.calculate_commuter_rail("6", "1A") == {:zone, "6"}
    end

    test "given two stops, finds the interzone fares" do
      assert Fares.calculate_commuter_rail("3", "5") == {:interzone, "3"}
    end

    test "when the origin is zone 1a, finds the fare based on destination" do
      assert Fares.calculate_commuter_rail("1A", "4") == {:zone, "4"}
    end
  end

  describe "fare_for_stops/3" do
    # a subset of possible ferry stops
    @ferries ~w(Boat-Hingham Boat-Charlestown Boat-Logan Boat-Long-South Boat-Lewis Boat-Blossom Boat-Winthrop)

    test "returns the name of the commuter rail fare given the origin and destination" do
      zone_1a_stop = Stop.build(:stop, %{zone: "1A"})
      zone_1a_stop_id = zone_1a_stop.id
      zone_4_stop = Stop.build(:stop, %{zone: "4"})
      zone_4_stop_id = zone_4_stop.id
      zone_7_stop = Stop.build(:stop, %{zone: "7"})
      zone_7_stop_id = zone_7_stop.id

      stub(Stops.Repo.Mock, :get, fn id ->
        case id do
          ^zone_1a_stop_id -> zone_1a_stop
          ^zone_4_stop_id -> zone_4_stop
          ^zone_7_stop_id -> zone_7_stop
        end
      end)

      assert Fares.fare_for_stops(:commuter_rail, zone_1a_stop_id, zone_4_stop_id) ==
               {:ok, {:zone, "4"}}

      assert Fares.fare_for_stops(:commuter_rail, zone_7_stop_id, zone_1a_stop_id) ==
               {:ok, {:zone, "7"}}

      assert Fares.fare_for_stops(:commuter_rail, zone_4_stop_id, zone_7_stop_id) ==
               {:ok, {:interzone, "4"}}
    end

    test "returns an error if the fare doesn't exist" do
      cr_stop = Stop.build(:stop, %{zone: "3"})
      cr_stop_id = cr_stop.id
      other_stop = Stop.build(:stop, %{zone: nil})
      other_stop_id = other_stop.id

      Stops.Repo.Mock
      |> expect(:get, fn ^cr_stop_id -> cr_stop end)
      |> expect(:get, fn ^other_stop_id -> other_stop end)

      assert Fares.fare_for_stops(:commuter_rail, cr_stop.id, other_stop.id) == :error
    end

    test "returns the name of the ferry fare given the origin and destination" do
      for origin_id <- @ferries,
          destination_id <- @ferries do
        both = [origin_id, destination_id]
        has_logan? = "Boat-Logan" in both
        has_charlestown? = "Boat-Charlestown" in both
        has_long? = "Boat-Long" in both
        has_long_south? = "Boat-Long-South" in both
        has_east_boston? = "Boat-Lewis" in both
        has_lynn? = "Boat-Blossom" in both
        has_winthrop? = "Boat-Winthrop" in both

        expected_name =
          cond do
            has_logan? and has_charlestown? -> :ferry_cross_harbor
            has_long? and has_logan? -> :ferry_cross_harbor
            has_long_south? and has_charlestown? -> :ferry_inner_harbor
            has_long? and has_east_boston? -> :ferry_east_boston
            has_lynn? -> :ferry_lynn
            has_winthrop? -> :ferry_winthrop
            has_logan? -> :commuter_ferry_logan
            true -> :commuter_ferry
          end

        assert Fares.fare_for_stops(:ferry, origin_id, destination_id) == {:ok, expected_name},
               "Unexpected result for #{origin_id} to #{destination_id}"
      end
    end
  end

  describe "silver line rapid transit routes" do
    test "silver_line_rapid_transit?/1 returns true if a route id is in @silver_line_rapid_transit" do
      for id <- Fares.silver_line_rapid_transit() do
        assert Fares.silver_line_rapid_transit?(id)
      end

      refute Fares.silver_line_rapid_transit?("751")
    end
  end

  describe "express routes" do
    test "express?/1 returns true if a route id is in @express_routes" do
      for id <- Fares.express() do
        assert Fares.express?(id)
      end

      refute Fares.express?("1")
    end
  end

  describe "silver line airport origin routes" do
    test "inbound routes originating at airport are properly identified" do
      airport_stops = ["17091", "27092", "17093", "17094", "17095"]

      for origin_id <- airport_stops do
        assert Fares.silver_line_airport_stop?("741", origin_id)
      end

      refute Fares.silver_line_airport_stop?("742", "17091")
    end

    test "origin_id can be nil" do
      refute Fares.silver_line_airport_stop?("741", nil)
    end
  end

  describe "to_fare_atom/1" do
    test "silver line rapid transit returns subway" do
      assert Fares.to_fare_atom(%Routes.Route{type: 3, id: "741"}) == :subway
    end

    test "silver line returns bus" do
      assert Fares.to_fare_atom(%Routes.Route{type: 3, id: "751"}) == :bus
    end

    test "express bus returns :express_bus" do
      assert Fares.to_fare_atom(%Routes.Route{type: 3, id: "170"}) == :express_bus
    end

    test "other types of routes return specific atoms" do
      assert Fares.to_fare_atom(%Routes.Route{type: 0, id: "Green-B"}) == :subway
      assert Fares.to_fare_atom(%Routes.Route{type: 1, id: "Red"}) == :subway
      assert Fares.to_fare_atom(%Routes.Route{type: 2, id: "CR-Fitchburg"}) == :commuter_rail
      assert Fares.to_fare_atom(%Routes.Route{type: 3, id: "1"}) == :bus
    end

    test "also works with route IDs" do
      light_rail_route_id = Faker.Internet.slug()
      subway_route_id = Faker.Internet.slug()
      cr_route_id = Faker.Internet.slug()
      bus_route_id = Faker.Internet.slug()

      Routes.Repo.Mock
      |> expect(:get, fn ^light_rail_route_id ->
        Route.build(:route, %{type: 0, description: :rapid_transit})
      end)
      |> expect(:get, fn ^subway_route_id ->
        Route.build(:route, %{type: 1, description: :rapid_transit})
      end)
      |> expect(:get, fn ^cr_route_id ->
        Route.build(:route, %{type: 2, description: :commuter_rail})
      end)
      |> expect(:get, fn ^bus_route_id ->
        Route.build(:route, %{type: 3, description: :local_bus})
      end)

      assert Fares.to_fare_atom(light_rail_route_id) == :subway
      assert Fares.to_fare_atom(subway_route_id) == :subway
      assert Fares.to_fare_atom(cr_route_id) == :commuter_rail
      assert Fares.to_fare_atom(bus_route_id) == :bus
    end

    test "handles fare atoms" do
      assert Fares.to_fare_atom(:subway) == :subway
      assert Fares.to_fare_atom(:commuter_rail) == :commuter_rail
      assert Fares.to_fare_atom(:bus) == :bus
    end
  end
end
