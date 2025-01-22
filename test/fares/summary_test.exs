defmodule Fares.SummaryTest do
  use ExUnit.Case, async: true

  alias Fares.Summary

  describe "price_range/1" do
    test "plain text of a summary price range can be extracted" do
      summary = %Summary{
        name: "Ferry One-Way",
        duration: :single_trip,
        fares: [{"All ferry routes", ["$1.00", " – ", "$2.00"]}],
        modes: [:ferry]
      }

      assert Summary.price_range(summary) == "$1.00 – $2.00"
    end

    test "does not create price range when lo and hi are the same amount" do
      summary = %Summary{
        name: "Weekend Pass",
        duration: :weekend,
        fares: [{"All ferry routes", ["$10.00", " – ", "$10.00"]}],
        modes: [:commuter_rail]
      }

      assert Summary.price_range(summary) == "$10.00"
    end
  end
end
