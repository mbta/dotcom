defmodule TripPlan.LegTest do
  use ExUnit.Case, async: true

  import Test.Support.Factory.TripPlanner
  import TripPlan.Leg

  alias Test.Support.Factory.Stop

  @from build(:stop_named_position)
  @to build(:stop_named_position)
  @start ~N[2017-01-01T00:00:00]
  @stop ~N[2017-01-01T23:59:59]
  @personal_leg build(:walking_leg,
                  from: @from,
                  to: @to,
                  start: @start,
                  stop: @stop
                )
  @transit_leg build(:transit_leg,
                 from: @from,
                 to: @to,
                 start: @start,
                 stop: @stop
               )

  describe "route_id/1" do
    test "returns {:ok, id} for a transit leg" do
      route_id = @transit_leg.mode.route.id
      assert {:ok, ^route_id} = route_id(@transit_leg)
    end

    test "returns :error for a personal leg" do
      assert :error = route_id(@personal_leg)
    end
  end

  describe "trip_id/1" do
    test "returns {:ok, id} for a transit leg" do
      trip_id = @transit_leg.mode.trip_id
      assert {:ok, ^trip_id} = trip_id(@transit_leg)
    end

    test "returns :error for a personal leg" do
      assert :error = trip_id(@personal_leg)
    end
  end

  describe "stop_ids/1" do
    test "returns the stop IDs @from and @to" do
      assert [@from.stop.id, @to.stop.id] == stop_ids(@transit_leg)
    end

    test "ignores nil stop IDs" do
      from = %{@from | stop: nil}

      personal_leg =
        build(:walking_leg,
          from: from,
          to: @to,
          start: @start,
          stop: @stop
        )

      assert [@to.stop.id] == stop_ids(personal_leg)
    end
  end

  describe "transit?/1" do
    test "Returns true for transit leg" do
      assert transit?(@transit_leg)
    end

    test "Returns false for personal leg" do
      refute transit?(@personal_leg)
    end
  end

  describe "fare_complete_transit_leg?/1" do
    test "returns false for commuter rail routes between stops without commuter rail zone information" do
      cr_mode = build(:transit_detail, route: %Routes.Route{type: 2})

      leg =
        build(:transit_leg,
          from: build(:stop_named_position, stop: Stop.build(:stop)),
          to: build(:stop_named_position, stop: Stop.build(:stop)),
          start: @start,
          stop: @stop,
          mode: cr_mode
        )

      assert fare_complete_transit_leg?(leg)

      bad_leg =
        build(:transit_leg,
          from: build(:stop_named_position, stop: Stop.build(:stop, zone: nil)),
          to: build(:stop_named_position, stop: Stop.build(:stop, zone: nil)),
          start: @start,
          stop: @stop,
          mode: cr_mode
        )

      refute fare_complete_transit_leg?(bad_leg)
    end
  end

  describe "stop_is_silver_line_airport?/2" do
    test "stop is not the Silver Line" do
      assert stop_is_silver_line_airport?([@transit_leg], :from) == false
    end

    test "stop is the Silver Line" do
      leg =
        build(:transit_leg,
          from: build(:stop_named_position, stop: Stop.build(:stop, %{id: "17091"})),
          to: @to,
          start: @start,
          stop: @stop,
          mode: build(:transit_detail, route: %Routes.Route{id: "741"})
        )

      assert stop_is_silver_line_airport?([leg], :from) == true
    end

    test "returns false when checking for Silver Line" do
      assert stop_is_silver_line_airport?([], :from) == false
    end
  end
end
