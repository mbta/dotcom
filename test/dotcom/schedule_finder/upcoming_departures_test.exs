defmodule Dotcom.ScheduleFinder.UpcomingDeparturesTest do
  use ExUnit.Case

  import Mox

  alias Dotcom.ScheduleFinder.UpcomingDepartures
  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.{Factories, FactoryHelpers, Generators}

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Stops.Repo.Mock, :get, fn id ->
      Factories.Stops.Stop.build(:stop, id: id, parent_id: nil)
    end)

    stub(Vehicles.Repo.Mock, :trip, fn _ -> Factories.Vehicles.Vehicle.build(:vehicle) end)
    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)
    stub(Predictions.Repo.Mock, :all, fn _ -> [] end)

    :ok
  end

  describe "upcoming_departures/1" do
    test "includes upcoming departures for the route, stop, and direction in question" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :subway_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_sequence = Faker.random_between(1, 10_000)

      seconds_until_arrival = Faker.random_between(2 * 60, 59 * 60)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            stop_sequence: stop_sequence,
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
      assert departures
             |> Enum.map(&(&1 |> Map.take([:arrival_status, :stop_sequence, :trip_id]))) == [
               %{
                 arrival_status: {:arrival_seconds, seconds_until_arrival},
                 stop_sequence: stop_sequence,
                 trip_id: trip_id
               }
             ]
    end

    test "includes status if present for subway departures" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      status = Faker.Lorem.sentence()

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            status: status,
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
               {:status, status}
             ]
    end

    test "includes trip name, platform name, and detailed arrival status for commuter rail departures" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      trip_name = Faker.Cat.breed()

      platform_id = FactoryHelpers.build(:id)
      platform_name = Faker.Pokemon.location()

      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(2 * 60, 59 * 60)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            platform_stop_id: platform_id,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, name: trip_name)
          )
        ]
      end)

      stub(Stops.Repo.Mock, :get, fn
        ^platform_id -> Factories.Stops.Stop.build(:stop, platform_name: platform_name)
        _ -> Factories.Stops.Stop.build(:stop)
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
      assert [departure] = departures
      assert departure.trip_name == trip_name
      assert departure.platform_name == platform_name
    end

    test "strips 'Commuter Rail -' from platform name" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      platform_id = FactoryHelpers.build(:id)
      platform_name = Faker.Pokemon.location()

      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(2 * 60, 59 * 60)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            platform_stop_id: platform_id,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip)
          )
        ]
      end)

      stub(Stops.Repo.Mock, :get, fn
        ^platform_id ->
          Factories.Stops.Stop.build(:stop, platform_name: "Commuter Rail - #{platform_name}")

        _ ->
          Factories.Stops.Stop.build(:stop)
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
      assert [departure] = departures
      assert departure.platform_name == platform_name
    end

    test "treats a platform name of 'Commuter Rail' as nil" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      platform_id = FactoryHelpers.build(:id)

      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(2 * 60, 59 * 60)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            platform_stop_id: platform_id,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip)
          )
        ]
      end)

      stub(Stops.Repo.Mock, :get, fn
        ^platform_id -> Factories.Stops.Stop.build(:stop, platform_name: "Commuter Rail")
        _ -> Factories.Stops.Stop.build(:stop)
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
      assert [departure] = departures
      assert departure.platform_name == nil
    end

    test "does not include trip name for bus or subway departures" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :subway_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      direction_id = Faker.Util.pick([0, 1])

      seconds_until_arrival = Faker.random_between(2 * 60, 59 * 60)
      arrival_time = now |> DateTime.shift(second: seconds_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip)
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
      assert departures |> Enum.map(& &1.trip_name) == [
               nil
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

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_1,
            departure_time: arrival_time_1 |> DateTime.shift(second: 30),
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id_1)
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: arrival_time_2,
              departure_time: arrival_time_2 |> DateTime.shift(second: 30),
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
      assert departures |> Enum.map(& &1.trip_id) == [
               trip_id_1,
               trip_id_2
             ]
    end

    test "returns the scheduled time for the first trip for subway if there are no predictions and it's before the first trip of the day" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_arrival_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        []
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: scheduled_arrival_time,
              departure_time: scheduled_arrival_time |> DateTime.shift(second: 30),
              time: scheduled_arrival_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id)
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
      assert {:before_service, departure} = departures
      assert departure.arrival_status == {:first_scheduled, scheduled_arrival_time}
    end

    test "does not return :before_service if there are no predictions if it's after the first trip of the day" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_arrival_time_1 =
        Generators.DateTime.random_time_range_date_time(
          {ServiceDateTime.beginning_of_service_day(now), now}
        )

      scheduled_arrival_time_2 =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        []
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: scheduled_arrival_time_1,
              departure_time: scheduled_arrival_time_1 |> DateTime.shift(second: 30),
              time: scheduled_arrival_time_1,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id)
            ),
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: scheduled_arrival_time_2,
              departure_time: scheduled_arrival_time_2 |> DateTime.shift(second: 30),
              time: scheduled_arrival_time_2,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id)
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
      refute match?({:before_service, _}, departures)
    end

    test "returns :no_realtime if only subway schedules" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_arrival_time_1 =
        Generators.DateTime.random_time_range_date_time(
          {ServiceDateTime.beginning_of_service_day(now), now}
        )

      scheduled_arrival_time_2 =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        []
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: scheduled_arrival_time_1,
              departure_time: scheduled_arrival_time_1 |> DateTime.shift(second: 30),
              time: scheduled_arrival_time_1,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id)
            ),
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: scheduled_arrival_time_2,
              departure_time: scheduled_arrival_time_2 |> DateTime.shift(second: 30),
              time: scheduled_arrival_time_2,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id)
            )
          ]
      end)

      # Exercise
      assert UpcomingDepartures.upcoming_departures(%{
               direction_id: direction_id,
               now: now,
               route: route,
               stop_id: stop_id
             }) == :no_realtime
    end

    test "returns :no_realtime with departures if bus/commuter rail schedules" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route =
        [:bus_route, :commuter_rail_route]
        |> Faker.Util.pick()
        |> Factories.Routes.Route.build()

      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_arrival_time_1 =
        Generators.DateTime.random_time_range_date_time(
          {ServiceDateTime.beginning_of_service_day(now), now}
        )

      scheduled_arrival_time_2 =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        []
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: scheduled_arrival_time_1,
              departure_time: scheduled_arrival_time_1 |> DateTime.shift(second: 30),
              time: scheduled_arrival_time_1,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id)
            ),
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: scheduled_arrival_time_2,
              departure_time: scheduled_arrival_time_2 |> DateTime.shift(second: 30),
              time: scheduled_arrival_time_2,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id)
            )
          ]
      end)

      # Exercise
      assert {:no_realtime, departures} =
               UpcomingDepartures.upcoming_departures(%{
                 direction_id: direction_id,
                 now: now,
                 route: route,
                 stop_id: stop_id
               })

      assert [%UpcomingDepartures.UpcomingDeparture{} | _] = departures
    end

    test "uses departure time for scheduled trips when arrival time is nil" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      trip_id = FactoryHelpers.build(:id)

      departure_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: nil,
              departure_time: departure_time,
              time: departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
              trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
            )
          ]
      end)

      # Exercise
      {:no_realtime, departures} =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures |> Enum.map(& &1.arrival_status) == [
               {:scheduled, departure_time}
             ]
    end

    test "favors prediction over schedules if both are present for bus" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:bus_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      trip_id = FactoryHelpers.build(:id)

      predicted_seconds_until_arrival = Faker.random_between(2 * 60, 59 * 60)
      predicted_arrival_time = now |> DateTime.shift(second: predicted_seconds_until_arrival)

      scheduled_arrival_time =
        Generators.DateTime.random_time_range_date_time(
          {predicted_arrival_time, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: predicted_arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: scheduled_arrival_time,
              departure_time: scheduled_arrival_time |> DateTime.shift(second: 30),
              time: scheduled_arrival_time,
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
               {:arrival_seconds, predicted_seconds_until_arrival}
             ]
    end

    test "does not include scheduled trips for subway" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
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

      expect(Predictions.Repo.Mock, :all, fn [
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

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: arrival_time_2,
              departure_time: arrival_time_2 |> DateTime.shift(second: 30),
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
               {:arrival_seconds, seconds_until_arrival_1}
             ]
    end

    test "does not include scheduled trips in the past" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      [past_trip_id, future_trip_id] =
        Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      past_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {ServiceDateTime.beginning_of_service_day(now), now}
        )

      stub(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], stop_ids: ^stop_id, direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: past_departure_time,
              time: past_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
              trip: Factories.Schedules.Trip.build(:trip, id: past_trip_id)
            )
          ]

        [^route_id], direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: past_departure_time,
              time: past_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
              trip: Factories.Schedules.Trip.build(:trip, id: past_trip_id)
            ),
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: now,
              departure_time: now |> DateTime.shift(second: 30),
              time: now,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
              trip: Factories.Schedules.Trip.build(:trip, id: future_trip_id)
            )
          ]
      end)

      # Exercise
      {:no_realtime, departures} =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert [%UpcomingDepartures.UpcomingDeparture{trip_id: ^future_trip_id}] = departures
    end

    test "shows :service_ended if trips in the past" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      trip_id = FactoryHelpers.build(:id)

      past_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {ServiceDateTime.beginning_of_service_day(now), now}
        )

      stub(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], stop_ids: ^stop_id, direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: past_departure_time,
              time: past_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
              trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
            )
          ]

        [^route_id], direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: past_departure_time,
              time: past_departure_time,
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
      assert departures == :service_ended
    end

    test "shows :no_service if there are no trips" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      stub(Schedules.Repo.Mock, :by_route_ids, fn [^route_id], _opts -> [] end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert departures == :no_service
    end

    test "does include trips scheduled in the past if they have predictions" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      trip_id = FactoryHelpers.build(:id)

      past_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {ServiceDateTime.beginning_of_service_day(now), now}
        )

      predicted_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {past_departure_time, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: predicted_departure_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      stub(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], stop_ids: ^stop_id, direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: past_departure_time,
              time: past_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
              trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
            )
          ]

        [^route_id], direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: past_departure_time,
              time: past_departure_time,
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
      assert departures |> Enum.map(& &1.trip_id) == [trip_id]
    end

    test "excludes predictions with no arrival or departure time" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      direction_id = Faker.Util.pick([0, 1])

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        Factories.Predictions.Prediction.build_list(2, :prediction,
          arrival_time: nil,
          departure_time: nil,
          stop: Factories.Stops.Stop.build(:stop, id: stop_id)
        ) ++
          [
            Factories.Predictions.Prediction.build(:prediction,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id)
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
      assert departures |> Enum.count() == 1
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

      expect(Predictions.Repo.Mock, :all, fn [
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

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :subway_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      seconds_until_departure = Faker.random_between(2 * 60, 59 * 60)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      expect(Predictions.Repo.Mock, :all, fn [
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

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            departure_time: nil,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          ),
          Factories.Predictions.Prediction.build(:prediction,
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
      assert departures |> Enum.count() == 1
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

      expect(Predictions.Repo.Mock, :all, fn [
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

      expect(Predictions.Repo.Mock, :all, fn [
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

      expect(Predictions.Repo.Mock, :all, fn [
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

      expect(Predictions.Repo.Mock, :all, fn [
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

      expect(Predictions.Repo.Mock, :all, fn [
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

      expect(Predictions.Repo.Mock, :all, fn [
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

      expect(Predictions.Repo.Mock, :all, fn [
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

    test "shows departure time and :on_time for commuter rail if predicted and scheduled times differ by under a minute" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      trip = Factories.Schedules.Trip.build(:trip)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      predicted_departure_time =
        scheduled_departure_time |> DateTime.shift(second: Faker.random_between(-59, 59))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            departure_time: predicted_departure_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        _, _ ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: scheduled_departure_time,
              time: scheduled_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
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
          stop_id: stop_id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:time, predicted_departure_time}
      assert departure.arrival_substatus == :on_time
    end

    test "shows :on_time for commuter rail if there is no schedule" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      trip = Factories.Schedules.Trip.build(:trip)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      predicted_departure_time =
        scheduled_departure_time |> DateTime.shift(second: Faker.random_between(-59, 59))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            departure_time: predicted_departure_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        _, _ ->
          []
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
      assert [departure] = departures
      assert departure.arrival_status == {:time, predicted_departure_time}
      assert departure.arrival_substatus == :on_time
    end

    test "shows {:early_from, scheduled_time} for commuter rail if predicted and scheduled times differ by more than a minute" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      trip = Factories.Schedules.Trip.build(:trip)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      predicted_departure_time =
        scheduled_departure_time
        |> DateTime.shift(second: -Faker.random_between(60, 3600))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            departure_time: predicted_departure_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: scheduled_departure_time,
              time: scheduled_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
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
          stop_id: stop_id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:time, predicted_departure_time}
      assert departure.arrival_substatus == {:early_from, scheduled_departure_time}
    end

    test "shows {:delayed_from, scheduled_time} for commuter rail if predicted time is more than a minute late" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      trip = Factories.Schedules.Trip.build(:trip)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      predicted_departure_time =
        scheduled_departure_time
        |> DateTime.shift(second: Faker.random_between(60, 3600))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            departure_time: predicted_departure_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: scheduled_departure_time,
              time: scheduled_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
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
          stop_id: stop_id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:time, predicted_departure_time}
      assert departure.arrival_substatus == {:delayed_from, scheduled_departure_time}
    end

    test "shows :scheduled for commuter rail if there is no prediction" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      trip = Factories.Schedules.Trip.build(:trip)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: scheduled_departure_time,
              time: scheduled_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
              trip: trip
            )
          ]
      end)

      # Exercise
      {:no_realtime, departures} =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:scheduled, scheduled_departure_time}
      assert departure.arrival_substatus == :scheduled
    end

    test "shows {:status, status} for commuter rail if there is a status field set on the prediction" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      trip = Factories.Schedules.Trip.build(:trip)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      predicted_departure_time =
        scheduled_departure_time
        |> DateTime.shift(second: Faker.random_between(-120, 120))

      [word1, word2] = Faker.Lorem.words(2)
      api_status = (word1 |> String.capitalize()) <> " " <> word2
      display_status = (word1 |> String.capitalize()) <> " " <> (word2 |> String.capitalize())

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            departure_time: predicted_departure_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            status: api_status,
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        _, _ ->
          []
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
      assert [departure] = departures
      assert departure.arrival_status == {:time, predicted_departure_time}
      assert departure.arrival_substatus == {:status, display_status}
    end

    test "shows :cancelled for commuter rail if the schedule_relationship is :cancelled or :skipped" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:commuter_rail_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      trip = Factories.Schedules.Trip.build(:trip)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      schedule_relationship = Faker.Util.pick([:cancelled, :skipped])

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: nil,
            departure_time: nil,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            schedule_relationship: schedule_relationship,
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: scheduled_departure_time,
              time: scheduled_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
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
          stop_id: stop_id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:cancelled, scheduled_departure_time}
      assert departure.arrival_substatus == schedule_relationship
    end

    test "does not include skipped or cancelled bus or subway trips" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :subway_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)

      trip = Factories.Schedules.Trip.build(:trip)
      direction_id = Faker.Util.pick([0, 1])

      scheduled_departure_time =
        Generators.DateTime.random_time_range_date_time(
          {now, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: nil,
            departure_time: nil,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            schedule_relationship: Faker.Util.pick([:cancelled, :skipped]),
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: date ->
          assert date == ServiceDateTime.service_date(now)

          [
            Factories.Schedules.Schedule.build(:schedule,
              departure_time: scheduled_departure_time,
              time: scheduled_departure_time,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
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
          stop_id: stop_id
        })

      # Verify
      assert departures == []
    end

    test "shows trip details with other stops" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id

      stop_ids =
        Faker.Util.sample_uniq(3, fn -> FactoryHelpers.build(:id) end)

      [stop_before, stop, stop_after] =
        stop_ids |> Enum.map(&Factories.Stops.Stop.build(:stop, id: &1))

      [stop_sequence_before, stop_sequence, stop_sequence_after] =
        Faker.Util.sample_uniq(3, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_time_offsets =
        Faker.Util.sample_uniq(3, fn -> Faker.random_between(2, 59) end) |> Enum.sort()

      [arrival_time_before, arrival_time, arrival_time_after] =
        arrival_time_offsets |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: stop,
            stop_sequence: stop_sequence,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_after,
            stop: stop_after,
            stop_sequence: stop_sequence_after,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_before,
            stop: stop_before,
            stop_sequence: stop_sequence_before,
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
             |> Enum.map(&(&1 |> Map.take([:cancelled?, :stop_id, :stop_name, :time]))) == [
               %{
                 cancelled?: false,
                 stop_id: stop_before.id,
                 stop_name: stop_before.name,
                 time: {:time, arrival_time_before}
               }
             ]

      assert trip_details.stop |> Map.take([:cancelled?, :stop_id, :stop_name, :time]) ==
               %{
                 cancelled?: false,
                 stop_id: stop.id,
                 stop_name: stop.name,
                 time: {:time, arrival_time}
               }

      assert trip_details.stops_after
             |> Enum.map(&(&1 |> Map.take([:cancelled?, :stop_id, :stop_name, :time]))) == [
               %{
                 cancelled?: false,
                 stop_id: stop_after.id,
                 stop_name: stop_after.name,
                 time: {:time, arrival_time_after}
               }
             ]
    end

    test "shows correct trip details if a trip visits a stop multiple times" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id

      stop_ids =
        Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      [stop_multi, stop_single] =
        stop_ids |> Enum.map(&Factories.Stops.Stop.build(:stop, id: &1))

      [stop_sequence_multi_1, stop_sequence_single, stop_sequence_multi_2] =
        Faker.Util.sample_uniq(3, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_time_offsets =
        Faker.Util.sample_uniq(3, fn -> Faker.random_between(2, 59) end) |> Enum.sort()

      [arrival_time_multi_1, arrival_time_single, arrival_time_multi_2] =
        arrival_time_offsets |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_multi_1,
            stop: stop_multi,
            stop_sequence: stop_sequence_multi_1,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_single,
            stop: stop_single,
            stop_sequence: stop_sequence_single,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_multi_2,
            stop: stop_multi,
            stop_sequence: stop_sequence_multi_2,
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
          stop_id: stop_multi.id
        })

      # Verify
      assert [departure_1, departure_2] = departures

      # Departure 1 should select the first visit to stop_multi as
      # `stop`, with its second visit in `stops_after`.
      assert departure_1.trip_details.stops_before
             |> Enum.map(&(&1 |> Map.take([:stop_id, :stop_sequence]))) == []

      assert departure_1.trip_details.stop |> Map.take([:stop_id, :stop_sequence]) == %{
               stop_id: stop_multi.id,
               stop_sequence: stop_sequence_multi_1
             }

      assert departure_1.trip_details.stops_after
             |> Enum.map(&(&1 |> Map.take([:stop_id, :stop_sequence]))) == [
               %{stop_id: stop_single.id, stop_sequence: stop_sequence_single},
               %{stop_id: stop_multi.id, stop_sequence: stop_sequence_multi_2}
             ]

      # Departure 2 should select the second visit to stop_multi as
      # `stop`, with its first visit in `stops_before`.
      assert departure_2.trip_details.stops_before
             |> Enum.map(&(&1 |> Map.take([:stop_id, :stop_sequence]))) == [
               %{stop_id: stop_multi.id, stop_sequence: stop_sequence_multi_1},
               %{stop_id: stop_single.id, stop_sequence: stop_sequence_single}
             ]

      assert departure_2.trip_details.stop |> Map.take([:stop_id, :stop_sequence]) == %{
               stop_id: stop_multi.id,
               stop_sequence: stop_sequence_multi_2
             }

      assert departure_2.trip_details.stops_after
             |> Enum.map(&(&1 |> Map.take([:stop_id, :stop_sequence]))) == []
    end

    test "shows trip details with vehicle info" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id

      stop = Factories.Stops.Stop.build(:stop)

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        Factories.Predictions.Prediction.build_list(3, :prediction, stop: stop, trip: trip)
      end)

      vehicle = Factories.Vehicles.Vehicle.build(:vehicle)
      expect(Vehicles.Repo.Mock, :trip, fn ^trip_id -> vehicle end)

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
      vehicle_info = departure.trip_details.vehicle_info

      assert vehicle_info.status == vehicle.status
    end

    test "drops the current stop if the vehicle is currently stopped there" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id

      stop_ids =
        Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      [stop, stop_after] =
        stop_ids |> Enum.map(&Factories.Stops.Stop.build(:stop, id: &1))

      [stop_sequence, stop_sequence_after] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_time_offsets =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(2, 59) end) |> Enum.sort()

      [arrival_time, arrival_time_after] =
        arrival_time_offsets |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: stop,
            stop_sequence: stop_sequence,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_after,
            stop: stop_after,
            stop_sequence: stop_sequence_after,
            trip: trip
          )
        ]
      end)

      vehicle = Factories.Vehicles.Vehicle.build(:vehicle, status: :stopped, stop_id: stop.id)
      expect(Vehicles.Repo.Mock, :trip, fn ^trip_id -> vehicle end)

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

      assert trip_details.stops_before == []

      assert trip_details.stop == nil

      assert trip_details.stops_after
             |> Enum.map(&(&1 |> Map.take([:cancelled?, :stop_id, :stop_name, :time]))) == [
               %{
                 cancelled?: false,
                 stop_id: stop_after.id,
                 stop_name: stop_after.name,
                 time: {:time, arrival_time_after}
               }
             ]
    end

    test "pulls trip details from schedules for scheduled trips" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
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

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: arrival_time,
              departure_time: arrival_time |> DateTime.shift(second: 30),
              time: arrival_time,
              stop: stop,
              trip: trip
            ),
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: arrival_time_after,
              departure_time: arrival_time_after |> DateTime.shift(second: 30),
              time: arrival_time_after,
              stop: stop_after,
              trip: trip
            ),
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: arrival_time_before,
              departure_time: arrival_time_before |> DateTime.shift(second: 30),
              time: arrival_time_before,
              stop: stop_before,
              trip: trip
            )
          ]
      end)

      # Exercise
      {:no_realtime, departures} =
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
               %{
                 stop_id: stop_before.id,
                 stop_name: stop_before.name,
                 time: {:time, arrival_time_before}
               }
             ]

      assert trip_details.stop |> Map.take([:stop_id, :stop_name, :time]) ==
               %{stop_id: stop.id, stop_name: stop.name, time: {:time, arrival_time}}

      assert trip_details.stops_after
             |> Enum.map(&(&1 |> Map.take([:stop_id, :stop_name, :time]))) == [
               %{
                 stop_id: stop_after.id,
                 stop_name: stop_after.name,
                 time: {:time, arrival_time_after}
               }
             ]
    end

    test "pulls trip details from schedules for upcoming other-stops without predictions" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
      route_id = route.id

      stop_ids =
        Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      [stop, stop_after] =
        stop_ids |> Enum.map(&Factories.Stops.Stop.build(:stop, id: &1))

      [stop_sequence, stop_sequence_after] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_time_offsets =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(2, 59) end) |> Enum.sort()

      [arrival_time, arrival_time_after] =
        arrival_time_offsets |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: stop,
            stop_sequence: stop_sequence,
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              stop: stop,
              stop_sequence: stop_sequence,
              trip: trip
            ),
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: arrival_time_after,
              departure_time: arrival_time_after |> DateTime.shift(second: 30),
              stop: stop_after,
              stop_sequence: stop_sequence_after,
              time: arrival_time_after,
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

      assert trip_details.stop |> Map.take([:stop_id, :stop_name, :time]) ==
               %{stop_id: stop.id, stop_name: stop.name, time: {:time, arrival_time}}

      assert trip_details.stops_after
             |> Enum.map(&(&1 |> Map.take([:stop_id, :stop_name, :time]))) == [
               %{
                 stop_id: stop_after.id,
                 stop_name: stop_after.name,
                 time: {:time, arrival_time_after}
               }
             ]
    end

    test "does not include past scheduled stops in trip details" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
      route_id = route.id

      stop_ids =
        Faker.Util.sample_uniq(3, fn -> FactoryHelpers.build(:id) end)

      [stop_before, stop, stop_after] =
        stop_ids |> Enum.map(&Factories.Stops.Stop.build(:stop, id: &1))

      [stop_sequence_before, stop_sequence, stop_sequence_after] =
        Faker.Util.sample_uniq(3, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_time_offsets =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(2, 59) end) |> Enum.sort()

      [arrival_time, arrival_time_after] =
        arrival_time_offsets |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      departure_time_before =
        Generators.DateTime.random_time_range_date_time(
          {ServiceDateTime.beginning_of_service_day(now), now}
        )

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: stop,
            stop_sequence: stop_sequence,
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: departure_time_before |> DateTime.shift(second: -30),
              departure_time: departure_time_before,
              stop: stop_before,
              stop_sequence: stop_sequence_before,
              time: departure_time_before,
              trip: trip
            ),
            Factories.Schedules.Schedule.build(:schedule,
              stop: stop,
              stop_sequence: stop_sequence,
              trip: trip
            ),
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: arrival_time_after,
              departure_time: arrival_time_after |> DateTime.shift(second: 30),
              stop: stop_after,
              stop_sequence: stop_sequence_after,
              time: arrival_time_after,
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

      assert trip_details.stops_before == []
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

      [stop_sequence_before, stop_sequence, stop_sequence_after] =
        Faker.Util.sample_uniq(3, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_time_offsets =
        Faker.Util.sample_uniq(3, fn -> Faker.random_between(2, 59) end) |> Enum.sort()

      [departure_time_before, arrival_time, arrival_time_after] =
        arrival_time_offsets |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: stop,
            stop_sequence: stop_sequence,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_after,
            stop: stop_after,
            stop_sequence: stop_sequence_after,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: nil,
            departure_time: departure_time_before,
            stop: stop_before,
            stop_sequence: stop_sequence_before,
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
               {:time, departure_time_before}
             ]
    end

    test "shows an `other_stop` as cancelled if the time on its prediction is nil and the time on its schedule is non-nil" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      route_id = route.id

      stop_ids =
        Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      [stop, stop_after] =
        stop_ids |> Enum.map(&Factories.Stops.Stop.build(:stop, id: &1))

      [stop_sequence, stop_sequence_after] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      trip_id = FactoryHelpers.build(:id)
      trip = Factories.Schedules.Trip.build(:trip, id: trip_id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_time_offsets =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(2, 59) end) |> Enum.sort()

      [arrival_time, arrival_time_after] =
        arrival_time_offsets |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: stop,
            stop_sequence: stop_sequence,
            trip: trip
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: nil,
            departure_time: nil,
            stop: stop_after,
            stop_sequence: stop_sequence_after,
            trip: trip
          )
        ]
      end)

      expect(Schedules.Repo.Mock, :by_route_ids, fn
        [^route_id], direction_id: ^direction_id, date: _date ->
          [
            Factories.Schedules.Schedule.build(:schedule,
              stop: stop,
              stop_sequence: stop_sequence,
              trip: trip
            ),
            Factories.Schedules.Schedule.build(:schedule,
              arrival_time: arrival_time_after,
              departure_time: arrival_time_after |> DateTime.shift(second: 30),
              time: arrival_time_after,
              stop: stop_after,
              stop_sequence: stop_sequence_after,
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

      assert [stop_after] = trip_details.stops_after
      assert stop_after.time == {:time, arrival_time_after}
      assert stop_after.cancelled?
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

      expect(Predictions.Repo.Mock, :all, fn [
                                               route: ^route_id,
                                               direction_id: ^direction_id,
                                               include_terminals: true
                                             ] ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          ),
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
      assert departures |> Enum.count() == 1
    end
  end

  describe "last_trip_time/4" do
    test "returns the last time for a route/stop/direction/date" do
      now = Dotcom.Utils.DateTime.now()
      route = Factories.Routes.Route.build(:route)
      stop = Factories.Stops.Stop.build(:stop)
      trip = Factories.Schedules.Trip.build(:trip)
      direction_id = Faker.Util.pick([0, 1])

      predictions =
        Factories.Predictions.Prediction.build_list(20, :prediction, stop: stop, trip: trip)
        |> Enum.sort_by(& &1.time, DateTime)

      schedules =
        Factories.Schedules.Schedule.build_list(20, :schedule, stop: stop, trip: trip)
        |> Enum.sort_by(& &1.time, DateTime)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      last_prediction = List.last(predictions)
      last_schedule = List.last(schedules)

      last_trip_time = UpcomingDepartures.last_trip_time(route.id, direction_id, now, stop.id)

      assert last_trip_time in [
               last_prediction.arrival_time,
               last_prediction.departure_time,
               last_schedule.arrival_time,
               last_schedule.departure_time
             ]
    end
  end
end
