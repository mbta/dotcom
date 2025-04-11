defmodule Dotcom.TripPlan.ParserTest do
  use ExUnit.Case, async: true

  import Mox
  import Dotcom.TripPlan.Parser

  alias Dotcom.TripPlan.Itinerary
  alias Test.Support.Factories.{Stops.Stop, TripPlanner.TripPlanner}

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    :ok
  end

  describe "parse/1" do
    test "outputs an %Itinerary{}" do
      unparsed = TripPlanner.build(:otp_itinerary)
      assert %Itinerary{} = parse(unparsed)
    end

    test "uses accessibility_score to mark itinerary as accessible" do
      unparsed = TripPlanner.build(:otp_itinerary, accessibility_score: 1.0)
      assert %Itinerary{accessible?: true} = parse(unparsed)
    end

    test "marks bus-only itineraries as accessible" do
      unparsed =
        TripPlanner.build(:otp_itinerary,
          accessibility_score: :rand.uniform(99) / 100,
          legs: TripPlanner.build_list(3, :otp_bus_leg)
        )

      assert %Itinerary{accessible?: true} = parse(unparsed)
    end

    test "marks other itineraries as inaccessible" do
      non_bus_leg =
        [:otp_commuter_rail_leg, :otp_ferry_leg, :otp_subway_leg]
        |> Faker.Util.pick()
        |> TripPlanner.build()

      unparsed =
        TripPlanner.build(:otp_itinerary,
          accessibility_score: :rand.uniform(99) / 100,
          legs: [non_bus_leg | TripPlanner.build_list(2, :otp_transit_leg)]
        )

      assert %Itinerary{accessible?: false} = parse(unparsed)
    end
  end
end
