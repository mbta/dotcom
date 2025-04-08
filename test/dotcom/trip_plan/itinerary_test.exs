defmodule Dotcom.TripPlan.ItineraryTest do
  use ExUnit.Case, async: true

  import Mox
  import Dotcom.TripPlan.Itinerary

  alias Dotcom.TripPlan.Leg
  alias Test
  alias Test.Support.Factories.{Stops.Stop, TripPlanner.TripPlanner}

  @from TripPlanner.build(:stop_named_position)
  @to TripPlanner.build(:stop_named_position)

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    transit_leg = TripPlanner.build(:transit_leg, from: @from, to: @to)
    itinerary = TripPlanner.build(:itinerary, legs: [transit_leg])
    %{itinerary: itinerary}
  end

  describe "transit_legs/1" do
    test "returns all transit legs excluding personal legs", %{itinerary: itinerary} do
      assert Enum.all?(transit_legs(itinerary), &Leg.transit?/1)
    end
  end
end
