defmodule Dotcom.TripPlan.OpenTripPlannerTest do
  use ExUnit.Case, async: true

  import Mox
  import Test.Support.Factories.TripPlanner.InputForm

  alias Dotcom.TripPlan.OpenTripPlanner

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "to_params/1 translates an %InputForm{} into %PlanParams{}" do
    test "translates an %InputForm{} into %PlanParams{} with custom numItineraries" do
      input_form = build(:form)

      assert %OpenTripPlannerClient.PlanParams{} =
               plan_params = OpenTripPlanner.to_params(input_form)

      assert plan_params.numItineraries > 5
    end
  end

  describe "plan/1" do
    test "accepts an %InputForm{} and passes %PlanParams{} to OpenTripPlanner" do
      input = build(:form)

      expect(OpenTripPlannerClient.Mock, :plan, fn params ->
        assert %OpenTripPlannerClient.PlanParams{} = params
        assert params == OpenTripPlanner.to_params(input)

        {:ok, %OpenTripPlannerClient.Plan{itineraries: []}}
      end)

      assert {:ok, _} = OpenTripPlanner.plan(input)
    end
  end
end
