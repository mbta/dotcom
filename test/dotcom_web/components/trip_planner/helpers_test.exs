defmodule DotcomWeb.Components.TripPlanner.HelpersTest do
  use ExUnit.Case, async: true
  doctest DotcomWeb.Components.TripPlanner.Helpers, import: true

  import DotcomWeb.Components.TripPlanner.Helpers
  import OpenTripPlannerClient.Test.Support.Factory

  alias OpenTripPlannerClient.Schema.Step

  describe "walk_summary/1" do
    test "describes a walking step" do
      for relative <- Step.relative_direction(),
          absolute <- Step.absolute_direction() do
        step = build(:step, absolute_direction: absolute, relative_direction: relative)
        assert walk_summary(step) |> is_binary()
        assert walk_summary(step) =~ step.street_name
      end
    end

    test "handles step bogus Transfer street name" do
      step = build(:step, street_name: "Transfer", relative_direction: :DEPART)
      assert walk_summary(step) == "Transfer"
    end

    test "handles other steps gracefully" do
      step = build(:step, absolute_direction: :SKYWARDS, relative_direction: :JUMP)
      assert walk_summary(step) == "Go onto #{step.street_name}"
    end

    test "describes a walking leg in minutes & miles" do
      summarized_leg =
        build(:walking_leg)
        |> walk_summary()

      assert Regex.match?(~r"(\d+) min, (\d.?\d?) mi", summarized_leg)
    end
  end
end
