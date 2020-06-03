defmodule TransferTest do
  @moduledoc false
  use ExUnit.Case

  import Fares.Transfer

  describe "is_maybe_transfer/1 correctly identifies the potential presence of a transfer [assumes single ride media]" do
    test "subway -> subway" do
      assert ["Blue", "Red"] |> is_maybe_transfer
    end

    test "subway -> local bus" do
      assert ["Orange", "1"] |> is_maybe_transfer
    end

    test "local bus -> subway" do
      assert ["77", "Red"] |> is_maybe_transfer
    end

    test "local bus -> local bus" do
      assert ["77", "1"] |> is_maybe_transfer
    end

    test "inner express bus -> subway" do
      assert ["351", "Red"] |> is_maybe_transfer
    end

    test "outer express bus -> subway" do
      assert ["505", "Blue"] |> is_maybe_transfer
    end

    test "inner express bus -> local bus" do
      assert ["326", "4"] |> is_maybe_transfer
    end

    test "outer express bus -> local bus" do
      assert ["505", "39"] |> is_maybe_transfer
    end

    test "SL4 -> local bus" do
      assert ["751", "4"] |> is_maybe_transfer
    end

    test "SL1 -> local bus" do
      assert ["741", "39"] |> is_maybe_transfer
    end

    test "local bus -> the same local bus" do
      refute ["23", "23"] |> is_maybe_transfer
    end

    test "inner express bus -> inner express bus" do
      refute ["326", "351"] |> is_maybe_transfer
    end

    test "outer express bus -> outer express bus" do
      refute ["505", "352"] |> is_maybe_transfer
    end

    test "commuter rail -> any other mode" do
      refute ["CR-Worcester", "CR-Lowell"] |> is_maybe_transfer
      refute ["CR-Worcester", "Red"] |> is_maybe_transfer
      refute ["CR-Worcester", "39"] |> is_maybe_transfer
      refute ["CR-Worcester", "351"] |> is_maybe_transfer
      refute ["CR-Worcester", "352"] |> is_maybe_transfer
      refute ["CR-Worcester", "751"] |> is_maybe_transfer
      refute ["CR-Worcester", "741"] |> is_maybe_transfer
    end

    test "ferry -> any other mode" do
      refute ["Boat-F4", "Boat-F1"] |> is_maybe_transfer
      refute ["Boat-F4", "Red"] |> is_maybe_transfer
      refute ["Boat-F4", "39"] |> is_maybe_transfer
      refute ["Boat-F4", "351"] |> is_maybe_transfer
      refute ["Boat-F4", "352"] |> is_maybe_transfer
      refute ["Boat-F4", "751"] |> is_maybe_transfer
      refute ["Boat-F4", "741"] |> is_maybe_transfer
    end
  end
end
