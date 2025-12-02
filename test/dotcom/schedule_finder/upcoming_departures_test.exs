defmodule Dotcom.ScheduleFinder.UpcomingDeparturesTest do
  use ExUnit.Case

  import Mox

  alias Dotcom.ScheduleFinder.UpcomingDepartures
  alias Test.Support.{Factories, FactoryHelpers}

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get_parent, fn _ -> Factories.Stops.Stop.build(:stop) end)
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
               {:arrival_minutes, minutes_until_arrival}
             ]
    end

    test "uses departure_time if arrival_time is nil" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route_id = FactoryHelpers.build(:id)
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      minutes_until_departure = Faker.random_between(2, 59)
      departure_time = now |> DateTime.shift(minute: minutes_until_departure)

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id, direction_id: ^direction_id] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: nil,
            departure_time: departure_time,
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
               {:departure_minutes, minutes_until_departure}
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

    test "shows arrival_status as :boarding if there is a vehicle at a platform in the station and departure_time is within 90 seconds" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route_id = FactoryHelpers.build(:id)
      stop_id = FactoryHelpers.build(:id)
      stop = Factories.Stops.Stop.build(:stop, id: stop_id)
      platform_id = FactoryHelpers.build(:id, parent_id: stop_id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_departure = Faker.random_between(1, 90)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id, direction_id: ^direction_id] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: now |> DateTime.shift(second: -30),
            departure_time: departure_time,
            stop: stop,
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      expect(Vehicles.Repo.Mock, :trip, fn ^trip_id ->
        Factories.Vehicles.Vehicle.build(:vehicle, stop_id: platform_id)
      end)

      expect(Stops.Repo.Mock, :get_parent, fn ^platform_id -> stop end)

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
               :boarding
             ]
    end

    test "shows trip details" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route_id = FactoryHelpers.build(:id)

      stop_ids =
        Faker.Util.sample_uniq(3, fn -> FactoryHelpers.build(:id) end)

      [stop_before, stop, stop_after] =
        stop_ids |> Enum.map(&Factories.Stops.Stop.build(:stop, id: &1))

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_time_offsets =
        Faker.Util.sample_uniq(3, fn -> Faker.random_between(2, 59) end) |> Enum.sort()

      [arrival_time_before, arrival_time, arrival_time_after] =
        arrival_time_offsets |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id, direction_id: ^direction_id] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: stop,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_after,
            stop: stop_after,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_before,
            stop: stop_before,
            trip: trip
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route_id: route_id,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      trip_details = departure.trip_details

      assert trip_details.stops_before
             |> Enum.map(&(&1 |> Map.take([:stop_id, :stop_name, :time]))) == [
               %{stop_id: stop_before.id, stop_name: stop_before.name, time: arrival_time_before}
             ]

      assert trip_details.stop |> Map.take([:stop_id, :stop_name, :time]) ==
               %{stop_id: stop.id, stop_name: stop.name, time: arrival_time}

      assert trip_details.stops_after
             |> Enum.map(&(&1 |> Map.take([:stop_id, :stop_name, :time]))) == [
               %{stop_id: stop_after.id, stop_name: stop_after.name, time: arrival_time_after}
             ]
    end

    test "uses `departure_time` as other_stop.time if `arrival_time` isn't available" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route_id = FactoryHelpers.build(:id)

      stop_ids =
        Faker.Util.sample_uniq(3, fn -> FactoryHelpers.build(:id) end)

      [stop_before, stop, stop_after] =
        stop_ids |> Enum.map(&Factories.Stops.Stop.build(:stop, id: &1))

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_time_offsets =
        Faker.Util.sample_uniq(3, fn -> Faker.random_between(2, 59) end) |> Enum.sort()

      [departure_time_before, arrival_time, arrival_time_after] =
        arrival_time_offsets |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id, direction_id: ^direction_id] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: stop,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_after,
            stop: stop_after,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: nil,
            departure_time: departure_time_before,
            stop: stop_before,
            trip: trip
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route_id: route_id,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      trip_details = departure.trip_details

      assert trip_details.stops_before |> Enum.map(& &1.time) == [
               departure_time_before
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
