defmodule Dotcom.ScheduleFinder.UpcomingDeparturesTest do
  use ExUnit.Case

  import Mox

  alias Dotcom.ScheduleFinder.UpcomingDepartures
  alias Test.Support.{Factories, FactoryHelpers}

  setup :verify_on_exit!

  setup do
    stub(Vehicles.Repo.Mock, :trip, fn _ -> Factories.Vehicles.Vehicle.build(:vehicle) end)

    :ok
  end

  describe "upcoming_departures/1" do
    test "includes upcoming departures for the route, stop, and direction in question" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route_id = FactoryHelpers.build(:id)
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      minutes_until_arrival = Faker.random_between(2, 59)
      arrival_time = now |> DateTime.shift(minute: minutes_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id, direction_id: ^direction_id] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route_id: route_id,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               {:minutes, minutes_until_arrival}
             ]
    end

    test "shows arrival_status as :approaching if it's between 30 and 60 seconds out" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route_id = FactoryHelpers.build(:id)
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(31, 60)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id, direction_id: ^direction_id] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route_id: route_id,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               :approaching
             ]
    end

    test "shows arrival_status as :arriving if it's between 0 and 30 seconds out" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route_id = FactoryHelpers.build(:id)
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(1, 30)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id, direction_id: ^direction_id] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route_id: route_id,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               :arriving
             ]
    end

    test "does not include upcoming departures for other stops" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route_id = FactoryHelpers.build(:id)
      [stop_id, other_stop_id] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      minutes_until_arrival = Faker.random_between(2, 59)
      arrival_time = now |> DateTime.shift(minute: minutes_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id, direction_id: ^direction_id] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: other_stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route_id: route_id,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.empty?()
    end
  end
end
