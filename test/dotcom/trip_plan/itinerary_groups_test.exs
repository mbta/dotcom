defmodule Dotcom.TripPlan.ItineraryGroupsTest do
  @moduledoc false

  use ExUnit.Case, async: true

  import Mox

  alias Dotcom.TripPlan.ItineraryGroups
  alias Test.Support.Factories.{Stops.Stop, TripPlanner.TripPlanner}

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    stops = TripPlanner.build_list(3, :stop_named_position)

    {:ok, stops: stops}
  end

  describe "from_itineraries/1" do
    test "groups itineraries with the same mode, from, and to", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      subway_b_c_leg = TripPlanner.build(:subway_leg, from: b, to: c)

      itineraries =
        TripPlanner.build_list(:rand.uniform(5), :itinerary, legs: [bus_a_b_leg, subway_b_c_leg])

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries(itineraries)

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 1
    end

    test "only includes the first five itineraries in a group", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      subway_b_c_leg = TripPlanner.build(:subway_leg, from: b, to: c)

      itineraries =
        TripPlanner.build_list(10, :itinerary, legs: [bus_a_b_leg, subway_b_c_leg])

      # EXERCISE
      [group] = ItineraryGroups.from_itineraries(itineraries)

      # VERIFY
      assert Kernel.length(group.itineraries) == 5
    end

    test "does not group itineraries with different modes", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      bus_b_c_leg = TripPlanner.build(:bus_leg, from: b, to: c)
      subway_b_c_leg = TripPlanner.build(:subway_leg, from: b, to: c)

      first_itinerary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_c_leg])
      second_interary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, subway_b_c_leg])

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries([first_itinerary, second_interary])

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 2
    end

    test "does not group itineraries with different froms", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      bus_b_c_leg = TripPlanner.build(:bus_leg, from: b, to: c)
      bus_c_a_leg = TripPlanner.build(:bus_leg, from: c, to: a)

      first_itinerary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_c_leg])
      second_interary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_c_a_leg])

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries([first_itinerary, second_interary])

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 2
    end

    test "does not group itineraries with different tos", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      bus_b_c_leg = TripPlanner.build(:bus_leg, from: b, to: c)
      bus_b_a_leg = TripPlanner.build(:bus_leg, from: b, to: a)

      first_itinerary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_c_leg])
      second_interary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_a_leg])

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries([first_itinerary, second_interary])

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 2
    end
  end

  test "ignores short walking distances of < 0.2 miles when grouping", %{stops: [a, b, c]} do
    # SETUP
    bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
    walk_b_c_leg = TripPlanner.build(:walking_leg, from: b, to: c) |> Map.put(:distance, 0.199)
    walk_c_b_leg = TripPlanner.build(:walking_leg, from: c, to: b) |> Map.put(:distance, 0.199)
    bus_b_a_leg = TripPlanner.build(:bus_leg, from: b, to: a)

    first_itinerary =
      TripPlanner.build(:itinerary, legs: [bus_a_b_leg, walk_b_c_leg, walk_c_b_leg, bus_b_a_leg])

    second_itinerary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_a_leg])

    # EXERCISE
    grouped_itineraries = ItineraryGroups.from_itineraries([first_itinerary, second_itinerary])

    # VERIFY
    assert Kernel.length(grouped_itineraries) == 1
  end

  test "ignores intermediate legs with short walking durations of < 5 minutes when summarizing",
       %{stops: [a, b, c]} do
    bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)

    walk_b_c_leg =
      TripPlanner.build(:walking_leg, from: b, to: c)
      |> Map.merge(%{distance: 0.5, duration: 4})

    walk_c_b_leg =
      TripPlanner.build(:walking_leg, from: c, to: b)
      |> Map.merge(%{distance: 0.5, duration: 6})

    bus_b_a_leg = TripPlanner.build(:bus_leg, from: b, to: a)

    itinerary =
      TripPlanner.build(:itinerary, legs: [bus_a_b_leg, walk_b_c_leg, walk_c_b_leg, bus_b_a_leg])

    [%{summary: %{summarized_legs: legs}}] = ItineraryGroups.from_itineraries([itinerary])

    assert [_, %{walk_minutes: 6}, _] = legs
  end
end
