defmodule TransferTest do
  @moduledoc false
  use ExUnit.Case

  import Fares.Transfer
  alias Routes.Route
  alias TripPlan.{Leg, NamedPosition, TransitDetail}

  describe "is_maybe_transfer?/1 correctly identifies the potential presence of a transfer [assumes single ride media]" do
    test "if from or to is nil" do
      refute [nil, nil] |> is_maybe_transfer?
      refute ["Red", nil] |> is_maybe_transfer?
      refute [nil, "Orange"] |> is_maybe_transfer?
    end

    test "subway -> subway" do
      assert ["Blue", "Red"] |> is_maybe_transfer?
    end

    test "subway -> local bus" do
      assert ["Orange", "1"] |> is_maybe_transfer?
    end

    test "local bus -> subway" do
      assert ["77", "Red"] |> is_maybe_transfer?
    end

    test "local bus -> local bus" do
      assert ["77", "1"] |> is_maybe_transfer?
    end

    test "inner express bus -> subway" do
      assert ["351", "Red"] |> is_maybe_transfer?
    end

    test "outer express bus -> subway" do
      assert ["505", "Blue"] |> is_maybe_transfer?
    end

    test "inner express bus -> local bus" do
      assert ["326", "4"] |> is_maybe_transfer?
    end

    test "outer express bus -> local bus" do
      assert ["505", "39"] |> is_maybe_transfer?
    end

    test "SL4 -> local bus" do
      assert ["751", "4"] |> is_maybe_transfer?
    end

    test "SL1 -> local bus" do
      assert ["741", "39"] |> is_maybe_transfer?
    end

    test "local bus -> the same local bus" do
      refute ["23", "23"] |> is_maybe_transfer?
    end

    test "inner express bus -> inner express bus" do
      refute ["326", "351"] |> is_maybe_transfer?
    end

    test "outer express bus -> outer express bus" do
      refute ["505", "352"] |> is_maybe_transfer?
    end

    test "commuter rail -> any other mode" do
      refute ["CR-Worcester", "CR-Lowell"] |> is_maybe_transfer?
      refute ["CR-Worcester", "Red"] |> is_maybe_transfer?
      refute ["CR-Worcester", "39"] |> is_maybe_transfer?
      refute ["CR-Worcester", "351"] |> is_maybe_transfer?
      refute ["CR-Worcester", "352"] |> is_maybe_transfer?
      refute ["CR-Worcester", "751"] |> is_maybe_transfer?
      refute ["CR-Worcester", "741"] |> is_maybe_transfer?
    end

    test "ferry -> any other mode" do
      refute ["Boat-F4", "Boat-F1"] |> is_maybe_transfer?
      refute ["Boat-F4", "Red"] |> is_maybe_transfer?
      refute ["Boat-F4", "39"] |> is_maybe_transfer?
      refute ["Boat-F4", "351"] |> is_maybe_transfer?
      refute ["Boat-F4", "352"] |> is_maybe_transfer?
      refute ["Boat-F4", "751"] |> is_maybe_transfer?
      refute ["Boat-F4", "741"] |> is_maybe_transfer?
    end
  end

  describe "is_free_transfer?/1 correctly identifies a free underground subway transfer" do
    test "if from or to is nil" do
      leg = %Leg{
        mode: %TransitDetail{
          route_id: "Red"
        },
        to: %NamedPosition{
          stop_id: "example"
        }
      }

      refute [nil, nil] |> is_free_transfer?
      refute [leg, nil] |> is_free_transfer?
      refute [nil, leg] |> is_free_transfer?
    end

    test "Red -> Blue" do
      red = %Leg{
        mode: %TransitDetail{
          route_id: "Red"
        },
        to: %NamedPosition{
          stop_id: "red-blue-connector"
        }
      }

      blue = %Leg{
        mode: %TransitDetail{
          route_id: "Blue"
        },
        from: %NamedPosition{
          stop_id: "red-blue-connector"
        }
      }

      refute [red, blue] |> is_free_transfer?
    end

    test "Red -> Orange via DTX" do
      red_to_dtx = %Leg{
        mode: %TransitDetail{
          route_id: "Red"
        },
        to: %NamedPosition{
          stop_id: "place-dwnxg"
        }
      }

      orange_from_dtx = %Leg{
        mode: %TransitDetail{
          route_id: "Orange"
        },
        from: %NamedPosition{
          stop_id: "place-dwnxg"
        }
      }

      assert [red_to_dtx, orange_from_dtx] |> is_free_transfer?
    end
  end

  describe "to_fare_atom/1" do
    test "silver line rapid transit returns subway" do
      assert to_fare_atom(%Route{type: 3, id: "741"}) == :subway
    end

    test "silver line returns bus" do
      assert to_fare_atom(%Route{type: 3, id: "751"}) == :bus
    end

    test "inner express bus returns :inner_express_bus" do
      assert to_fare_atom(%Route{type: 3, id: "170"}) == :inner_express_bus
    end

    test "outer express bus returns :outer_express_bus" do
      assert to_fare_atom(%Route{type: 3, id: "352"}) == :outer_express_bus
    end

    test "other types of routes return specific atoms" do
      assert to_fare_atom(%Route{type: 0, id: "Green-B"}) == :subway
      assert to_fare_atom(%Route{type: 1, id: "Red"}) == :subway
      assert to_fare_atom(%Route{type: 2, id: "CR-Fitchburg"}) == :commuter_rail
      assert to_fare_atom(%Route{type: 3, id: "1"}) == :bus
    end

    test "also works with route IDs" do
      assert to_fare_atom("Green-B") == :subway
      assert to_fare_atom("Red") == :subway
      assert to_fare_atom("CR-Fitchburg") == :commuter_rail
      assert to_fare_atom("1") == :bus
    end

    test "handles fare atoms" do
      assert to_fare_atom(:subway) == :subway
      assert to_fare_atom(:commuter_rail) == :commuter_rail
      assert to_fare_atom(:bus) == :bus
    end
  end
end
