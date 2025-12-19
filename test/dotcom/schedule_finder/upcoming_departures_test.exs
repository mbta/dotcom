defmodule Dotcom.ScheduleFinder.UpcomingDeparturesTest do
  use ExUnit.Case

  import Mox

  alias Dotcom.ScheduleFinder.UpcomingDepartures
  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.{Factories, FactoryHelpers, Generators}

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    stub(Stops.Repo.Mock, :get_parent, fn _ -> Factories.Stops.Stop.build(:stop) end)
    stub(Vehicles.Repo.Mock, :trip, fn _ -> Factories.Vehicles.Vehicle.build(:vehicle) end)
    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    :ok
  end

  describe "upcoming_departures/1" do
    test "includes upcoming departures for the route, stop, and direction in question" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(2 * 60, 59 * 60)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               {:arrival_seconds, seconds_until_arrival}
             ]
    end

    test "includes scheduled trips and upcoming departures interleaved for bus and commuter rail" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      [trip_id_1, trip_id_2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      seconds_until_arrival_1 = Faker.random_between(2 * 60, 59 * 60)
      arrival_time_1 = now |> DateTime.shift(second: seconds_until_arrival_1)

      arrival_time_2 =
        Generators.DateTime.random_time_range_date_time(
          {arrival_time_1, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_1,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id_1)
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn [^route_id],
                                                    stop_ids: ^stop_id,
                                                    direction_id: ^direction_id,
                                                    date: date ->
        assert date == ServiceDateTime.service_date(now)

        [
          Factories.Schedules.Schedule.build(:schedule,
            arrival_time: arrival_time_2,
            time: arrival_time_2,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id_2)
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               {:arrival_seconds, seconds_until_arrival_1},
               {:scheduled, arrival_time_2}
             ]
    end

    test "excludes predictions with no arrival or departure time" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      direction_id = Faker.Util.pick([0, 1])

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
        Factories.Predictions.Prediction.build_list(2, :prediction,
          arrival_time: nil,
          departure_time: nil,
          stop: Factories.Stops.Stop.build(:stop, id: stop_id)
        )
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.empty?()
    end

    test "sorts upcoming departures by arrival time" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      [trip_id1, trip_id2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)
      direction_id = Faker.Util.pick([0, 1])

      minutes_until_arrival =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(2, 59) end)

      [arrival_time1, arrival_time2] =
        minutes_until_arrival |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time2,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id2)
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time1,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id1)
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.trip_id) == [
               trip_id1,
               trip_id2
             ]
    end

    test "uses departure_time if arrival_time is nil" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_departure = Faker.random_between(2 * 60, 59 * 60)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               {:departure_seconds, seconds_until_departure}
             ]
    end

    test "does not show an upcoming_departure if departure_time is nil" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            departure_time: nil,
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
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures == []
    end

    test "shows subway arrival_status as :approaching if it's between 30 and 60 seconds out" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(31, 60)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               :approaching
             ]
    end

    test "shows arrival seconds for bus if arrival time is between 30 and 60 seconds out" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:bus_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(31, 60)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               {:arrival_seconds, seconds_until_arrival}
             ]
    end

    test "shows arrival_status as :arriving for subway if it's between 0 and 30 seconds out" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(1, 30)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               :arriving
             ]
    end

    test "shows arrival_status as :boarding for subway if there is a vehicle at a platform in the station and departure_time is within 90 seconds" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      stop = Factories.Stops.Stop.build(:stop, id: stop_id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_departure = Faker.random_between(1, 90)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: now |> DateTime.shift(second: -30),
            departure_time: departure_time,
            stop: stop,
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               :boarding
             ]
    end

    test "shows arrival_status as :boarding for subway if arrival_time is nil" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      stop = Factories.Stops.Stop.build(:stop, id: stop_id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_departure = Faker.random_between(1, 90)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: nil,
            departure_time: departure_time,
            stop: stop,
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               :boarding
             ]
    end

    test "shows arrival_status as :now for bus if it's between 0 and 30 seconds out" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:bus_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(0, 30)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               :now
             ]
    end

    test "shows arrival_status as :now for bus if arrival_time is nil, and departure_time is <= 90 seconds out" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:bus_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_departure = Faker.random_between(0, 90)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               :now
             ]
    end

    test "shows trip details" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id

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

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
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

      route = Factories.Routes.Route.build(:route)
      route_id = route.id

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

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
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

      route = Factories.Routes.Route.build(:route)
      route_id = route.id
      [stop_id, other_stop_id] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      minutes_until_arrival = Faker.random_between(2, 59)
      arrival_time = now |> DateTime.shift(minute: minutes_until_arrival)

      expect(Predictions.Repo.Mock, :all, 2, fn [
                                                  route: ^route_id,
                                                  direction_id: ^direction_id,
                                                  include_terminals: true
                                                ] ->
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
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.empty?()
    end
  end
end
