defmodule Dotcom.InSeatTransfersTest do
  use ExUnit.Case, async: true

  alias Dotcom.InSeatTransfers
  alias Dotcom.InSeatTransfers.TripHeading

  defp heading(%{trip: trip}), do: %TripHeading{headsign: "to #{trip}", route: nil}

  describe "insert_trip_headings/3" do
    test "returns items for a single trip unchanged" do
      items = [%{trip: 1, stop: :a}, %{trip: 1, stop: :b}]

      assert InSeatTransfers.insert_trip_headings(items, & &1.trip, &heading/1) == items
    end

    test "replaces the first item of each subsequent trip with a heading" do
      items = [
        %{trip: 1, stop: :a},
        %{trip: 1, stop: :b},
        %{trip: 2, stop: :b},
        %{trip: 2, stop: :c},
        %{trip: 3, stop: :c},
        %{trip: 3, stop: :d}
      ]

      assert InSeatTransfers.insert_trip_headings(items, & &1.trip, &heading/1) == [
               %{trip: 1, stop: :a},
               %{trip: 1, stop: :b},
               %TripHeading{headsign: "to 2"},
               %{trip: 2, stop: :c},
               %TripHeading{headsign: "to 3"},
               %{trip: 3, stop: :d}
             ]
    end

    test "handles an empty list" do
      assert InSeatTransfers.insert_trip_headings([], & &1.trip, &heading/1) == []
    end
  end

  describe "trim_at_return/2" do
    test "does not trim lists without a trip heading" do
      items = [%{stop: :a}, %{stop: :b}, %{stop: :a}, %{stop: :c}]

      assert InSeatTransfers.trim_at_return(items, &(&1.stop == :a)) == items
    end

    test "trims at the second occurrence of the viewed stop, keeping earlier headings" do
      items = [
        %{stop: :a},
        %{stop: :b},
        %TripHeading{headsign: "Continuing"},
        %{stop: :a},
        %{stop: :c}
      ]

      assert InSeatTransfers.trim_at_return(items, &(&1.stop == :a)) == [
               %{stop: :a},
               %{stop: :b},
               %TripHeading{headsign: "Continuing"},
               %{stop: :a}
             ]
    end

    test "drops a trailing heading" do
      items = [
        %{stop: :a},
        %{stop: :b},
        %{stop: :a},
        %TripHeading{headsign: "Continuing"},
        %{stop: :c}
      ]

      assert InSeatTransfers.trim_at_return(items, &(&1.stop == :a)) == [
               %{stop: :a},
               %{stop: :b},
               %{stop: :a}
             ]
    end

    test "does not trim if the vehicle never returns to the viewed stop" do
      items = [%{stop: :a}, %TripHeading{headsign: "Continuing"}, %{stop: :c}]

      assert InSeatTransfers.trim_at_return(items, &(&1.stop == :a)) == items
    end
  end
end
