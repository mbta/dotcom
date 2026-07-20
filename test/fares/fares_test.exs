defmodule FaresTest do
  use ExUnit.Case, async: true
  doctest Fares

  import Mox

  alias Test.Support.Factories.{Routes.Route, Stops.Stop}

  setup :verify_on_exit!

  defp assert_ferry(origin, destination, expected_fare) do
    {_, received_fare} = Fares.fare_for_stops(:ferry, origin, destination)

    if origin != destination do
      assert received_fare == expected_fare,
             "Unexpected fare for #{origin} to #{destination}, got #{received_fare} expected #{expected_fare}"
    else
      assert true
    end
  end

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
    @hingham_hull_ferry ~W(Boat-Hingham Boat-Logan Boat-Long Boat-Hull)
    @charlestown_ferry ~W(Boat-Charlestown Boat-Long-South)
    @harbor_loop_ferry ~W(Boat-Lovejoy Boat-Aquarium Boat-Commonwealth Boat-Logan)
    @east_boston_ferry ~W(Boat-Lewis Boat-Long-North-5B)
    @lynn_ferry ~W(Boat-Blossom Boat-Long-North-5C)

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

    test "returns the proper fare given a valid origin and destination on the hingham/hull lines" do
      for origin <- @hingham_hull_ferry,
          destination <- @hingham_hull_ferry do
        both = [origin, destination]
        hingham? = "Boat-Hingham" in both
        hull? = "Boat-Hull" in both

        expected_fare =
          cond do
            hingham? -> :commuter_ferry
            hull? -> :commuter_ferry
            true -> :ferry_inner_harbor
          end

        assert_ferry(origin, destination, expected_fare)
      end
    end

    test "returns the proper fare given a valid origin and destination on the charlestown line" do
      for origin <- @charlestown_ferry,
          destination <- @charlestown_ferry do
        expected_fare = :ferry_inner_harbor
        assert_ferry(origin, destination, expected_fare)
      end
    end

    test "returns the proper fare given a valid origin and destination on the lynn line" do
      for origin <- @lynn_ferry,
          destination <- @lynn_ferry do
        expected_fare = :ferry_lynn
        assert_ferry(origin, destination, expected_fare)
      end
    end

    test "returns the proper fare given a valid origin and destination on the east boston line" do
      for origin <- @east_boston_ferry,
          destination <- @east_boston_ferry do
        expected_fare = :ferry_inner_harbor
        assert_ferry(origin, destination, expected_fare)
      end
    end

    test "returns the proper fare given a valid origin and destination on the harbor loop line" do
      for origin <- @harbor_loop_ferry,
          destination <- @harbor_loop_ferry do
        expected_fare = :ferry_inner_harbor
        assert_ferry(origin, destination, expected_fare)
      end
    end
  end

  describe "calculate_ferry/3" do
    test "returns the proper fare for trips that are entirely in the inner harbor" do
      origin = "Boat-Lovejoy"
      destination = "Boat-Logan"
      between = ["Boat-Aquarium", "Boat-Commonwealth"]

      expected_fare = :ferry_inner_harbor
      assert Fares.calculate_ferry(origin, destination, between) == expected_fare
    end

    test "returns the proper fare for trips that begin and end in the inner harbor, but exit the inner harbor and come back" do
      origin = "Boat-Fan"
      destination = "Boat-Logan"
      between = ["Boat-Aquarium", "Boat-Quincy"]

      expected_fare = :ferry_winthrop
      assert Fares.calculate_ferry(origin, destination, between) == expected_fare
    end

    test "returns the proper fare for trips that begin or end in Zone 5 (Winthrop zone)" do
      origin = "Boat-Winthrop"
      destination = "Boat-Aquarium"
      between = ["Boat-Logan"]

      expected_fare = :ferry_winthrop
      assert Fares.calculate_ferry(origin, destination, between) == expected_fare
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
