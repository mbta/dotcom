defmodule FaresTest do
  use ExUnit.Case, async: true
  doctest Fares
  alias Routes.Route

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

    @tag :external
    test "returns the name of the commuter rail fare given the origin and destination" do
      zone_1a = "place-north"
      zone_4 = "Ballardvale"
      zone_7 = "Haverhill"

      assert Fares.fare_for_stops(:commuter_rail, zone_1a, zone_4) == {:ok, {:zone, "4"}}
      assert Fares.fare_for_stops(:commuter_rail, zone_7, zone_1a) == {:ok, {:zone, "7"}}
      assert Fares.fare_for_stops(:commuter_rail, zone_4, zone_7) == {:ok, {:interzone, "4"}}
    end

    @tag :external
    test "returns an error if the fare doesn't exist" do
      assert Fares.fare_for_stops(:commuter_rail, "place-north", "place-pktrm") == :error
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

    @tag :external
    test "trips between a 'combo' zone and a non-terminus stop are treated as the general zone" do
      assert Fares.fare_for_stops(:commuter_rail, "place-qnctr", "place-PB-0245") ==
               {:ok, {:interzone, "6"}}

      assert Fares.fare_for_stops(:commuter_rail, "place-PB-0245", "place-qnctr") ==
               {:ok, {:interzone, "6"}}
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
      assert Fares.to_fare_atom(%Route{type: 3, id: "741"}) == :subway
    end

    test "silver line returns bus" do
      assert Fares.to_fare_atom(%Route{type: 3, id: "751"}) == :bus
    end

    test "express bus returns :express_bus" do
      assert Fares.to_fare_atom(%Route{type: 3, id: "170"}) == :express_bus
    end

    test "other types of routes return specific atoms" do
      assert Fares.to_fare_atom(%Route{type: 0, id: "Green-B"}) == :subway
      assert Fares.to_fare_atom(%Route{type: 1, id: "Red"}) == :subway
      assert Fares.to_fare_atom(%Route{type: 2, id: "CR-Fitchburg"}) == :commuter_rail
      assert Fares.to_fare_atom(%Route{type: 3, id: "1"}) == :bus
    end

    @tag :external
    test "also works with route IDs" do
      assert Fares.to_fare_atom("Green-B") == :subway
      assert Fares.to_fare_atom("Red") == :subway
      assert Fares.to_fare_atom("CR-Fitchburg") == :commuter_rail
      assert Fares.to_fare_atom("1") == :bus
    end

    test "handles fare atoms" do
      assert Fares.to_fare_atom(:subway) == :subway
      assert Fares.to_fare_atom(:commuter_rail) == :commuter_rail
      assert Fares.to_fare_atom(:bus) == :bus
    end
  end

  describe "get_fare_by_type/2" do
    test "gets fare by type" do
      non_transit_leg = %TripPlan.Leg{
        from: %TripPlan.NamedPosition{
          latitude: 42.365486,
          longitude: -71.103802,
          name: "Central",
          stop: nil
        },
        mode: %TripPlan.PersonalDetail{
          distance: 24.274,
          steps: [
            %TripPlan.PersonalDetail.Step{
              absolute_direction: :southeast,
              distance: 24.274,
              relative_direction: :depart,
              street_name: "Massachusetts Avenue"
            }
          ]
        },
        polyline: "eoqaGzm~pLTe@BE@A",
        to: %TripPlan.NamedPosition{
          latitude: 42.365304,
          longitude: -71.103621,
          name: "Central",
          stop: %Stops.Stop{id: "70069"}
        }
      }

      assert Fares.get_fare_by_type(non_transit_leg, :highest_one_way_fare) == nil
      assert Fares.get_fare_by_type(non_transit_leg, :lowest_one_way_fare) == nil
      assert Fares.get_fare_by_type(non_transit_leg, :reduced_one_way_fare) == nil

      highest_one_way_fare = %{
        cents: 290
      }

      lowest_one_way_fare = %{
        cents: 240
      }

      reduced_one_way_fare = %{
        cents: 110
      }

      transit_leg = %TripPlan.Leg{
        from: %TripPlan.NamedPosition{
          latitude: 42.365304,
          longitude: -71.103621,
          name: "Central",
          stop: %Stops.Stop{id: "70069"}
        },
        mode: %TripPlan.TransitDetail{
          fares: %{
            highest_one_way_fare: highest_one_way_fare,
            lowest_one_way_fare: lowest_one_way_fare,
            reduced_one_way_fare: reduced_one_way_fare
          },
          intermediate_stops: [%Stops.Stop{id: "70071"}, %Stops.Stop{id: "70073"}],
          route: %Routes.Route{id: "Red"},
          trip_id: "43870769C0"
        },
        to: %TripPlan.NamedPosition{
          latitude: 42.356395,
          longitude: -71.062424,
          name: "Park Street",
          stop: %Stops.Stop{id: "70075"}
        }
      }

      assert Fares.get_fare_by_type(transit_leg, :highest_one_way_fare) == highest_one_way_fare
      assert Fares.get_fare_by_type(transit_leg, :lowest_one_way_fare) == lowest_one_way_fare
      assert Fares.get_fare_by_type(transit_leg, :reduced_one_way_fare) == reduced_one_way_fare
    end
  end
end
