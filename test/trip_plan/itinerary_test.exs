defmodule TripPlan.ItineraryTest do
  use ExUnit.Case, async: true

  import Test.Support.Factories.TripPlanner.TripPlanner
  import TripPlan.Itinerary

  alias TripPlan.{Leg, PersonalDetail, TransitDetail}

  @from build(:stop_named_position)
  @to build(:stop_named_position)

  describe "destination/1" do
    test "returns the final destination of the itinerary" do
      itinerary =
        build(:itinerary,
          legs: [
            build(:leg, from: @from, to: @to, mode: build(:transit_detail))
          ]
        )

      assert destination(itinerary) == @to
    end
  end

  describe "transit_legs/1" do
    test "returns all transit legs excluding personal legs" do
      itinerary =
        build(:itinerary,
          legs: [
            build(:leg, from: @from, to: @to, mode: build(:transit_detail))
          ]
        )

      assert Enum.all?(transit_legs(itinerary), &Leg.transit?/1)
    end
  end

  describe "route_ids/1" do
    test "returns all the route IDs from the itinerary" do
      itinerary =
        build(:itinerary,
          legs: [
            build(:leg, from: @from, to: @to, mode: build(:transit_detail))
          ]
        )

      test_calculated_ids =
        Enum.flat_map(itinerary, fn leg ->
          case leg.mode do
            %TransitDetail{route_id: route_id} -> [route_id]
            _ -> []
          end
        end)

      assert test_calculated_ids == route_ids(itinerary)
    end
  end

  describe "trip_ids/1" do
    test "returns all the trip IDs from the itinerary" do
      itinerary =
        build(:itinerary,
          legs: [
            build(:leg, from: @from, to: @to, mode: build(:transit_detail))
          ]
        )

      test_calculated_ids =
        Enum.flat_map(itinerary, fn leg ->
          case leg.mode do
            %TransitDetail{trip_id: trip_id} -> [trip_id]
            _ -> []
          end
        end)

      assert test_calculated_ids == trip_ids(itinerary)
    end
  end

  describe "route_trip_ids/1" do
    test "returns all the route and trip IDs from the itinerary" do
      itinerary =
        build(:itinerary,
          legs: [
            build(:leg, from: @from, to: @to, mode: build(:transit_detail))
          ]
        )

      test_calculated_ids =
        Enum.flat_map(itinerary.legs, fn leg ->
          case leg.mode do
            %TransitDetail{} = td -> [{td.route_id, td.trip_id}]
            _ -> []
          end
        end)

      assert test_calculated_ids == route_trip_ids(itinerary)
    end
  end

  describe "positions/1" do
    test "returns all named positions for the itinerary" do
      itinerary =
        build(:itinerary,
          legs: build_list(3, :leg, from: @from, to: @to)
        )

      [first, second, third] = itinerary.legs
      expected = [first.from, first.to, second.from, second.to, third.from, third.to]
      assert positions(itinerary) == expected
    end
  end

  describe "stop_ids/1" do
    test "returns all the stop IDs from the itinerary" do
      itinerary =
        build(:itinerary,
          legs: [
            build(:leg, from: @from, to: @to, mode: build(:transit_detail))
          ]
        )

      test_calculated_ids =
        Enum.uniq(Enum.flat_map(itinerary.legs, &[&1.from.stop_id, &1.to.stop_id]))

      assert test_calculated_ids == stop_ids(itinerary)
    end
  end

  describe "walking_distance/1" do
    test "calculates walking distance of itinerary" do
      itinerary = %TripPlan.Itinerary{
        start: DateTime.from_unix(10),
        stop: DateTime.from_unix(13),
        legs: [
          %Leg{mode: %PersonalDetail{distance: 12.3}},
          %Leg{mode: %TransitDetail{}},
          %Leg{mode: %PersonalDetail{distance: 34.5}}
        ]
      }

      assert abs(walking_distance(itinerary) - 46.8) < 0.001
    end
  end

  describe "intermediate_stop_ids" do
    test "returns intermediate stop ids if the leg is transit detail and has them" do
      itinerary = %TripPlan.Itinerary{
        start: DateTime.from_unix(10),
        stop: DateTime.from_unix(13),
        legs: [
          %Leg{mode: %PersonalDetail{}},
          %Leg{mode: %TransitDetail{intermediate_stop_ids: ["1", "2", "3"]}},
          %Leg{mode: %PersonalDetail{}}
        ]
      }

      assert intermediate_stop_ids(itinerary) == ["1", "2", "3"]
    end

    test "does not return duplicate ids" do
      itinerary = %TripPlan.Itinerary{
        start: DateTime.from_unix(10),
        stop: DateTime.from_unix(13),
        legs: [
          %Leg{mode: %PersonalDetail{}},
          %Leg{mode: %TransitDetail{intermediate_stop_ids: ["1", "2", "3"]}},
          %Leg{mode: %TransitDetail{intermediate_stop_ids: ["1", "2", "3"]}}
        ]
      }

      assert intermediate_stop_ids(itinerary) == ["1", "2", "3"]
    end
  end
end
