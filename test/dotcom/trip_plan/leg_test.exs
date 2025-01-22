defmodule Dotcom.TripPlan.LegTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Leg
  import Mox

  alias Test.Support.Factories.Routes.Route
  alias Test.Support.Factories.Stops.Stop
  alias Test.Support.Factories.TripPlanner.TripPlanner

  @from TripPlanner.build(:stop_named_position)
  @to TripPlanner.build(:stop_named_position)
  @start ~N[2017-01-01T00:00:00]
  @stop ~N[2017-01-01T23:59:59]

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    personal_leg =
      TripPlanner.build(:walking_leg,
        from: @from,
        to: @to,
        start: @start,
        stop: @stop
      )

    transit_leg =
      TripPlanner.build(:transit_leg,
        from: @from,
        to: @to,
        start: @start,
        stop: @stop
      )

    {:ok, %{personal_leg: personal_leg, transit_leg: transit_leg}}
  end

  describe "route_id/1" do
    test "returns {:ok, id} for a transit leg", context do
      route_id = context.transit_leg.mode.route.id
      assert {:ok, ^route_id} = route_id(context.transit_leg)
    end

    test "returns :error for a personal leg", context do
      assert :error = route_id(context.personal_leg)
    end
  end

  describe "trip_id/1" do
    test "returns {:ok, id} for a transit leg", context do
      trip_id = context.transit_leg.mode.trip.id
      assert {:ok, ^trip_id} = trip_id(context.transit_leg)
    end

    test "returns :error for a personal leg", context do
      assert :error = trip_id(context.personal_leg)
    end
  end

  describe "stop_ids/1" do
    test "returns the stop IDs @from and @to", context do
      assert %{from: [@from.stop.id], to: [@to.stop.id]} == stop_ids(context.transit_leg)
    end

    test "ignores nil stop IDs" do
      from = %{@from | stop: nil}

      personal_leg =
        TripPlanner.build(:walking_leg,
          from: from,
          to: @to,
          start: @start,
          stop: @stop
        )

      assert %{from: [], to: [@to.stop.id]} == stop_ids(personal_leg)
    end
  end

  describe "transit?/1" do
    test "Returns true for transit leg", context do
      assert transit?(context.transit_leg)
    end

    test "Returns false for personal leg", context do
      refute transit?(context.personal_leg)
    end
  end

  describe "fare_complete_transit_leg?/1" do
    test "returns false for commuter rail routes between stops without commuter rail zone information" do
      cr_mode = TripPlanner.build(:transit_detail, route: Route.build(:route, %{type: 2}))

      leg =
        TripPlanner.build(:transit_leg,
          from: TripPlanner.build(:stop_named_position, stop: Stop.build(:stop, %{zone: "2"})),
          to: TripPlanner.build(:stop_named_position, stop: Stop.build(:stop, %{zone: "5"})),
          start: @start,
          stop: @stop,
          mode: cr_mode
        )

      assert fare_complete_transit_leg?(leg)

      bad_leg =
        TripPlanner.build(:transit_leg,
          from: TripPlanner.build(:stop_named_position, stop: Stop.build(:stop, zone: nil)),
          to: TripPlanner.build(:stop_named_position, stop: Stop.build(:stop, zone: nil)),
          start: @start,
          stop: @stop,
          mode: cr_mode
        )

      refute fare_complete_transit_leg?(bad_leg)
    end
  end

  describe "stop_is_silver_line_airport?/2" do
    test "stop is not the Silver Line", context do
      assert stop_is_silver_line_airport?([context.transit_leg], :from) == false
    end

    test "stop is the Silver Line" do
      leg =
        TripPlanner.build(:transit_leg,
          from: TripPlanner.build(:stop_named_position, stop: Stop.build(:stop, %{id: "17091"})),
          to: @to,
          start: @start,
          stop: @stop,
          mode: TripPlanner.build(:transit_detail, route: %Routes.Route{id: "741"})
        )

      assert stop_is_silver_line_airport?([leg], :from) == true
    end

    test "returns false when checking for Silver Line" do
      assert stop_is_silver_line_airport?([], :from) == false
    end
  end
end
