defmodule Dotcom.TripPlan.LoopsTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Loops
  import OpenTripPlannerClient.Test.Support.Factory

  describe "merge_loop_legs/1" do
    test "merges two legs into one" do
      # SETUP
      a = build(:transit_leg)
      b = build(:transit_leg, interline_with_previous_leg: true)

      itinerary_groups = build_itinerary_groups(a, b)

      # EXERCISE
      merged_itinerary_groups = merge_loop_legs(itinerary_groups)

      # VERIFY
      legs = get_legs(merged_itinerary_groups)

      assert Kernel.length(legs) === 1
    end

    test "does not merge two legs into one" do
      # SETUP
      a = build(:transit_leg)
      b = build(:transit_leg, interline_with_previous_leg: false)

      itinerary_groups = build_itinerary_groups(a, b)

      # EXERCISE
      merged_itinerary_groups = merge_loop_legs(itinerary_groups)

      # VERIFY
      legs = get_legs(merged_itinerary_groups)

      assert Kernel.length(legs) === 2
    end

    test "handles the first leg erroneously being labeled as interlined" do
      # SETUP
      a = build(:transit_leg, interline_with_previous_leg: true)
      b = build(:transit_leg, interline_with_previous_leg: false)

      itinerary_groups = build_itinerary_groups(a, b)

      # EXERCISE
      merged_itinerary_groups = merge_loop_legs(itinerary_groups)

      # VERIFY
      legs = get_legs(merged_itinerary_groups)

      assert Kernel.length(legs) === 2
    end
  end

  # Given two legs, build the itinerary groups scaffolding around them.
  defp build_itinerary_groups(a, b) do
    [
      %{
        itineraries: [
          %{
            legs: [a, b]
          }
        ]
      }
    ]
  end

  # Get all legs of itinerary groups.
  defp get_legs(itinerary_groups) do
    itinerary_groups
    |> Enum.map(fn itinerary_group ->
      itinerary_group
      |> Map.get(:itineraries)
      |> Enum.map(fn itinerary ->
        Map.get(itinerary, :legs)
      end)
    end)
    |> List.flatten()
  end
end
