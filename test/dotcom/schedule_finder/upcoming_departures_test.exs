defmodule Dotcom.ScheduleFinder.UpcomingDeparturesTest do
  use ExUnit.Case

  import Dotcom.Utils.Time, only: [truncate: 2]
  import Mox

  alias Dotcom.ScheduleFinder.{Platforms, UpcomingDepartures}
  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.{Factories, FactoryHelpers, Generators, PredictedScheduleHelper}

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Stops.Repo.Mock, :get, fn id ->
      Factories.Stops.Stop.build(:stop, id: id, parent_id: nil)
    end)

    stub(Vehicles.Repo.Mock, :get, fn _ -> Factories.Vehicles.Vehicle.build(:vehicle) end)
    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)
    stub(Predictions.Repo.Mock, :all, fn _ -> [] end)

    :ok
  end

  describe "upcoming_departures/1" do
    test "includes the stop_sequence and trip_id in upcoming departures" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        route: route,
        stops: [_, stop, _],
        stop_sequences: [_, stop_sequence, _],
        trip_id: trip_id,
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey()

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures

      assert departure.stop_sequence == stop_sequence
      assert departure.trip_id == trip_id
    end

    test "shows the number of minutes until arrival for bus and subway departures" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        route: route,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route, :subway_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      minutes_before_arrival = Faker.random_between(2, 59)
      seconds_before_arrival = minutes_before_arrival * 60 + Faker.random_between(-30, 29)

      now = arrival_time |> DateTime.shift(second: -seconds_before_arrival)

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:arrival_minutes, minutes_before_arrival}
    end

    test "includes status if present for subway departures" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        prediction_statuses: statuses,
        route: route,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:subway_route],
          include_prediction_statuses: true
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      [_, status, _] = statuses
      assert [departure] = departures
      assert departure.arrival_status == {:status, status}
    end

    test "includes whether or not each trip is the last trip for subways" do
      # Setup
      last_trip? = Faker.Util.pick([true, false])

      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        route: route,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:subway_route],
          last_trip?: last_trip?
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.last_trip? == last_trip?
    end

    test "includes trip name and platform name for commuter rail departures" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        route: route,
        platform_stop_ids: [_, platform_id, _],
        stops: [_, stop, _],
        trip: trip,
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:commuter_rail_route],
          stop_id_options: Platforms.stations_with_commuter_rail_platforms()
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      platform_name = Faker.Pokemon.location()

      stub(Stops.Repo.Mock, :get, fn
        ^platform_id -> Factories.Stops.Stop.build(:stop, platform_name: platform_name)
        _ -> Factories.Stops.Stop.build(:stop)
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures

      assert departure.trip_name == trip.name
      assert departure.platform_name == platform_name
    end

    test "does not hide platform names for bus or commuter rail stops outside allowlist" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        route: route,
        platform_stop_ids: [_, platform_id, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route, :commuter_rail_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      platform_name = Faker.Pokemon.location()

      stub(Stops.Repo.Mock, :get, fn
        ^platform_id -> Factories.Stops.Stop.build(:stop, platform_name: platform_name)
        _ -> Factories.Stops.Stop.build(:stop)
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.platform_name == platform_name
    end

    test "strips 'Commuter Rail -' from platform name" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        route: route,
        platform_stop_ids: [_, platform_id, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:commuter_rail_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      platform_name = Faker.Pokemon.location()

      stub(Stops.Repo.Mock, :get, fn
        ^platform_id ->
          Factories.Stops.Stop.build(:stop, platform_name: "Commuter Rail - #{platform_name}")

        _ ->
          Factories.Stops.Stop.build(:stop)
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.platform_name == platform_name
    end

    test "treats a platform name of 'Commuter Rail' as nil" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        route: route,
        platform_stop_ids: [_, platform_id, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:commuter_rail_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      stub(Stops.Repo.Mock, :get, fn
        ^platform_id -> Factories.Stops.Stop.build(:stop, platform_name: "Commuter Rail")
        _ -> Factories.Stops.Stop.build(:stop)
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.platform_name == nil
    end

    test "does not include trip name for bus or subway departures" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        route: route,
        platform_stop_ids: [_, platform_id, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:subway_route, :bus_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      stub(Stops.Repo.Mock, :get, fn
        ^platform_id -> Factories.Stops.Stop.build(:stop, platform_name: "Commuter Rail")
        _ -> Factories.Stops.Stop.build(:stop)
      end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.trip_name == nil
    end

    test "includes scheduled trips and upcoming departures interleaved for bus and commuter rail" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(Faker.Util.pick([:bus_route, :commuter_rail_route]))
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_sequence = Faker.random_between(1, 10_000)

      [trip_id_1, trip_id_2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      seconds_until_arrival_1 = Faker.random_between(2 * 60, 59 * 60)
      arrival_time_1 = now |> DateTime.shift(second: seconds_until_arrival_1)

      arrival_time_2 =
        Generators.DateTime.random_time_range_date_time(
          {arrival_time_1, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, fn _opts ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_1,
            departure_time: arrival_time_1 |> DateTime.shift(second: 30),
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            stop_sequence: stop_sequence,
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id_1)
          )
        ]
      end)

      stub(Vehicles.Repo.Mock, :get, fn _ ->
        Factories.Vehicles.Vehicle.build(:vehicle, stop_sequence: stop_sequence)
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

      expect(Predictions.Repo.Mock, :all, fn _opts ->
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

      expect(Predictions.Repo.Mock, :all, fn _opts ->
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

      expect(Predictions.Repo.Mock, :all, fn _opts ->
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

      expect(Predictions.Repo.Mock, :all, fn _opts ->
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

    test "uses departure time for scheduled trips for the first stop, when arrival time is nil" do
      # Setup
      %{
        scheduled_departure_times: [departure_time, _, _],
        route: route,
        schedules: schedules,
        stops: [stop, _, _]
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route, :commuter_rail_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> [] end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert {:no_realtime, [departure]} = departures
      assert departure.arrival_status == {:scheduled, departure_time}
    end

    test "favors prediction over schedules if both are present for bus" do
      # Setup
      seconds_behind = Faker.random_between(1, 999)

      %{
        predicted_arrival_times: [_, predicted_time, _],
        predictions: predictions,
        route: route,
        scheduled_arrival_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route], seconds_behind: seconds_behind)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      minutes_before_arrival = Faker.random_between(2, 59)
      seconds_before_arrival = minutes_before_arrival * 60 + Faker.random_between(-30, 29)

      now = predicted_time |> DateTime.shift(second: -seconds_before_arrival)

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      refute departure.arrival_status == {:scheduled, scheduled_time}
      assert departure.arrival_status == {:arrival_minutes, minutes_before_arrival}
    end

    test "does not include scheduled trips for subway" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:subway_route)
      route_id = route.id
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_sequence = Faker.random_between(1, 10_000)

      [trip_id_1, trip_id_2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      minutes_until_arrival_1 = Faker.random_between(2, 59)
      seconds_until_arrival_1 = minutes_until_arrival_1 * 60 + Faker.random_between(-30, 29)
      arrival_time_1 = now |> DateTime.shift(second: seconds_until_arrival_1)

      arrival_time_2 =
        Generators.DateTime.random_time_range_date_time(
          {arrival_time_1, ServiceDateTime.end_of_service_day(now)}
        )

      expect(Predictions.Repo.Mock, :all, fn _opts ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time_1,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            stop_sequence: stop_sequence,
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id_1)
          )
        ]
      end)

      stub(Vehicles.Repo.Mock, :get, fn _ ->
        Factories.Vehicles.Vehicle.build(:vehicle, stop_sequence: stop_sequence)
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
               {:arrival_minutes, minutes_until_arrival_1}
             ]
    end

    @tag :skip
    test "shows :service_ended if all trips are scheduled in the past" do
      # Setup
      %{
        route: route,
        scheduled_arrival_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _]
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> [] end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.later_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
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

    test "can include trips scheduled in the past if they have predictions" do
      seconds_behind = Faker.random_between(-999, 999)

      %{
        predictions: predictions,
        route: route,
        scheduled_arrival_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        trip: trip,
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route, :commuter_rail_route],
          seconds_behind: seconds_behind
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.later_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.trip_id == trip.id
    end

    test "includes skipped stops for bus or commuter rail if their scheduled time is in the future" do
      %{
        predictions: predictions,
        route: route,
        scheduled_departure_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route, :commuter_rail_route],
          skipped_stops: [1]
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures

      assert departure.arrival_status == {:cancelled, scheduled_time}
      assert departure.arrival_substatus == :skipped
    end

    test "excludes upcoming departures for skipped subway stops" do
      %{
        predictions: predictions,
        route: route,
        scheduled_departure_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:subway_route],
          skipped_stops: [1]
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert departures == []
    end

    @tag :skip
    test "excludes bus and commuter rail skipped stops if their scheduled time is in the past" do
      %{
        predictions: predictions,
        route: route,
        scheduled_arrival_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route, :commuter_rail_route],
          skipped_stops: [1]
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.later_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert departures == :service_ended
    end

    test "includes cancelled bus or commuter rail trips if their scheduled time is in the future" do
      %{
        predictions: predictions,
        route: route,
        scheduled_departure_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route, :commuter_rail_route],
          cancelled?: true
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures

      assert departure.arrival_status == {:cancelled, scheduled_time}
      assert departure.arrival_substatus == :cancelled
    end

    test "excludes cancelled subway trips" do
      %{
        predictions: predictions,
        route: route,
        scheduled_departure_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:subway_route],
          cancelled?: true
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert departures == []
    end

    @tag :skip
    test "excludes cancelled bus or commuter rail trips if their scheduled time is in the past" do
      %{
        predictions: predictions,
        route: route,
        scheduled_arrival_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route, :commuter_rail_route],
          cancelled?: true
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.later_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert departures == :service_ended
    end

    test "shows schedule data for bus or CR predictions with no times that aren't skipped or cancelled" do
      %{
        predictions: predictions,
        route: route,
        scheduled_arrival_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route, :commuter_rail_route],
          missing_realtime?: true
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:scheduled, scheduled_time}
    end

    test "does not show schedule data for subway predictions with no times that aren't skipped or cancelled" do
      %{
        predictions: predictions,
        route: route,
        scheduled_arrival_times: [_, scheduled_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:subway_route],
          missing_realtime?: true
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(scheduled_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      refute match?([_departure], departures)
    end

    test "excludes predictions with no arrival or departure time" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      stop_id = FactoryHelpers.build(:id)

      direction_id = Faker.Util.pick([0, 1])
      stop_sequence = Faker.random_between(1, 10_000)

      expect(Predictions.Repo.Mock, :all, fn _opts ->
        Factories.Predictions.Prediction.build_list(2, :prediction,
          arrival_time: nil,
          departure_time: nil,
          stop: Factories.Stops.Stop.build(:stop, id: stop_id),
          stop_sequence: stop_sequence
        ) ++
          [
            Factories.Predictions.Prediction.build(:prediction,
              stop: Factories.Stops.Stop.build(:stop, id: stop_id),
              stop_sequence: stop_sequence
            )
          ]
      end)

      stub(Vehicles.Repo.Mock, :get, fn _ ->
        Factories.Vehicles.Vehicle.build(:vehicle, stop_sequence: stop_sequence)
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
      stop_id = FactoryHelpers.build(:id)
      [trip_id1, trip_id2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)
      direction_id = Faker.Util.pick([0, 1])
      stop_sequence = Faker.random_between(1, 10_000)

      minutes_until_arrival =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(2, 59) end)

      [arrival_time1, arrival_time2] =
        minutes_until_arrival |> Enum.map(&(now |> DateTime.shift(minute: &1)))

      expect(Predictions.Repo.Mock, :all, fn _opts ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time2,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            stop_sequence: stop_sequence,
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id2)
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time1,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            stop_sequence: stop_sequence,
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id1)
          )
        ]
      end)

      stub(Vehicles.Repo.Mock, :get, fn _ ->
        Factories.Vehicles.Vehicle.build(:vehicle, stop_sequence: stop_sequence)
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

    test "uses departure time for the first stop, when arrival_time is nil" do
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [departure_time, _, _],
        stops: [stop, _, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route, :subway_route],
          vehicle_stop_index: 0
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      minutes_before_departure = Faker.random_between(2, 59)
      seconds_before_departure = minutes_before_departure * 60 + Faker.random_between(-30, 29)

      now = departure_time |> DateTime.shift(second: -seconds_before_departure)

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:departure_minutes, minutes_before_departure}
    end

    test "does not show an upcoming_departure for the last stop in a trip, when the departure_time is nil" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      stop_id = FactoryHelpers.build(:id)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_sequence = Faker.random_between(1, 10_000)

      expect(Predictions.Repo.Mock, :all, fn _opts ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            departure_time: nil,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          ),
          Factories.Predictions.Prediction.build(:prediction,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            stop_sequence: stop_sequence,
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      stub(Vehicles.Repo.Mock, :get, fn _ ->
        Factories.Vehicles.Vehicle.build(:vehicle, stop_sequence: stop_sequence)
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

    test "shows arrival minutes for bus or subway if arrival time is 30 seconds or more out" do
      %{
        predictions: predictions,
        route: route,
        predicted_arrival_times: [_, arrival_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route, :subway_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      minutes_before_arrival = Faker.random_between(1, 59)
      seconds_before_arrival = minutes_before_arrival * 60 + Faker.random_between(-30, 29)

      now = arrival_time |> DateTime.shift(second: -seconds_before_arrival)

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:arrival_minutes, minutes_before_arrival}
    end

    test "shows arrival_status as :arriving for subway if it's between 0 and 30 seconds out" do
      %{
        predictions: predictions,
        route: route,
        predicted_arrival_times: [_, arrival_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:subway_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      seconds_before_arrival = Faker.random_between(0, 29)

      now = arrival_time |> DateTime.shift(second: -seconds_before_arrival)

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == :arriving
    end

    test "shows arrival_status as :arriving for subway even if the vehicle is at an earlier stop" do
      %{
        predictions: predictions,
        route: route,
        predicted_arrival_times: [_, arrival_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:subway_route], vehicle_stop_index: 0)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      seconds_before_arrival = Faker.random_between(0, 29)

      now = arrival_time |> DateTime.shift(second: -seconds_before_arrival)

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == :arriving
    end

    test "shows arrival_status as :boarding for subway if there is a vehicle at a platform in the station and we are between arrival and departure times" do
      %{
        predictions: predictions,
        route: route,
        predicted_arrival_times: [_, arrival_time, _],
        predicted_departure_times: [_, departure_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:subway_route],
          vehicle_statuses: [:stopped]
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      now = Generators.DateTime.random_time_range_date_time({arrival_time, departure_time})

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == :boarding
    end

    test "shows arrival_status as :boarding for subway if there is a vehicle at a platform in the station at the first stop (arrival_time is nil) and departure_time is <= 90 seconds out" do
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [departure_time, _, _],
        stops: [stop, _, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:subway_route],
          vehicle_statuses: [:stopped],
          vehicle_stop_index: 0
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      seconds_before_departure = Faker.random_between(0, 90)

      now = departure_time |> DateTime.shift(second: -seconds_before_departure)

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == :boarding
    end

    test "shows arrival_status as :now for bus if it's between 0 and 30 seconds out" do
      %{
        predictions: predictions,
        route: route,
        predicted_arrival_times: [_, arrival_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      seconds_before_arrival = Faker.random_between(0, 29)

      now = arrival_time |> DateTime.shift(second: -seconds_before_arrival)

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == :now
    end

    test "shows arrival_status as :now for bus if arrival_time is nil, and departure_time is <= 90 seconds out" do
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [departure_time, _, _],
        stops: [stop, _, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route],
          vehicle_statuses: [:stopped],
          vehicle_stop_index: 0
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      seconds_before_departure = Faker.random_between(0, 90)

      now = departure_time |> DateTime.shift(second: -seconds_before_departure)

      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: now,
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == :now
    end

    test "shows departure time and :on_time for commuter rail if predicted and scheduled times differ by under a minute" do
      # Setup
      %{
        predictions: predictions,
        schedules: schedules,
        route: route,
        predicted_departure_times: [_, departure_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:commuter_rail_route],
          seconds_behind: Faker.random_between(-59, 59)
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:time, departure_time |> truncate(:minute)}
      assert departure.arrival_substatus == :on_time
    end

    test "shows :on_time for commuter rail if there is no schedule" do
      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [_, departure_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(route_types: [:commuter_rail_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:time, departure_time |> truncate(:minute)}
      assert departure.arrival_substatus == :on_time
    end

    test "shows {:early_from, scheduled_time} for commuter rail if predicted and scheduled times differ by more than a minute" do
      # Setup
      %{
        predictions: predictions,
        schedules: schedules,
        route: route,
        predicted_departure_times: [_, predicted_departure_time, _],
        scheduled_departure_times: [_, scheduled_departure_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:commuter_rail_route],
          seconds_behind: Faker.random_between(-3600, -60)
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(predicted_departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:time, predicted_departure_time |> truncate(:minute)}
      assert departure.arrival_substatus == {:early_from, scheduled_departure_time}
    end

    test "shows {:delayed_from, scheduled_time} for commuter rail if predicted time is more than a minute late" do
      # Setup
      %{
        predictions: predictions,
        schedules: schedules,
        route: route,
        predicted_departure_times: [_, predicted_departure_time, _],
        scheduled_departure_times: [_, scheduled_departure_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:commuter_rail_route],
          seconds_behind: Faker.random_between(60, 3600)
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(predicted_departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:time, predicted_departure_time |> truncate(:minute)}
      assert departure.arrival_substatus == {:delayed_from, scheduled_departure_time}
    end

    test "does not show an arrival_substatus for non-CR" do
      # Setup
      %{
        predictions: predictions,
        schedules: schedules,
        route: route,
        predicted_departure_times: [_, predicted_departure_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:subway_route, :bus_route, :ferry_route],
          seconds_behind: Faker.random_between(-3600, 3600)
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(predicted_departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_substatus == nil
    end

    test "shows :scheduled for commuter rail if there is no prediction" do
      # Setup
      %{
        schedules: schedules,
        route: route,
        scheduled_departure_times: [_, scheduled_departure_time, _],
        stops: [_, stop, _]
      } =
        PredictedScheduleHelper.journey(route_types: [:commuter_rail_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> [] end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(scheduled_departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert {:no_realtime, [departure]} = departures
      assert departure.arrival_status == {:scheduled, scheduled_departure_time}
      assert departure.arrival_substatus == :scheduled
    end

    test "shows :scheduled_sr_only for bus if there is no prediction" do
      # Setup
      %{
        schedules: schedules,
        route: route,
        scheduled_arrival_times: [_, scheduled_arrival_time, _],
        stops: [_, stop, _]
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route])

      expect(Predictions.Repo.Mock, :all, fn _ -> [] end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(scheduled_arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert {:no_realtime, [departure]} = departures

      assert departure.arrival_status == {:scheduled, scheduled_arrival_time}
      assert departure.arrival_substatus == :scheduled_sr_only
    end

    test "shows {:status, status} for commuter rail if there is a status field set on the prediction" do
      # Setup
      [word1, word2] = Faker.Lorem.words(2)
      api_status = (word1 |> String.capitalize()) <> " " <> word2
      display_status = (word1 |> String.capitalize()) <> " " <> (word2 |> String.capitalize())

      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [_, predicted_departure_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:commuter_rail_route],
          prediction_status: api_status
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(predicted_departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures

      assert departure.arrival_status == {:time, predicted_departure_time |> truncate(:minute)}
      assert departure.arrival_substatus == {:status, display_status}
    end

    test "shows {:status, 'Delayed'} for commuter rail if the status is 'Delayed', but the predicted time is less than a minute late" do
      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [_, predicted_departure_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:commuter_rail_route],
          prediction_status: "Delayed",
          seconds_behind: Faker.random_between(0, 59)
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(predicted_departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures

      assert departure.arrival_status == {:time, predicted_departure_time |> truncate(:minute)}
      assert departure.arrival_substatus == {:status, "Delayed"}
    end

    @tag :skip
    test "shows {:status, 'Delayed'} for commuter rail if the status is 'Delayed' and there are no schedules" do
      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [_, predicted_departure_time, _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:commuter_rail_route],
          prediction_status: "Delayed",
          seconds_behind: Faker.random_between(0, 59)
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(predicted_departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures

      assert departure.arrival_status == {:time, predicted_departure_time |> truncate(:minute)}
      assert departure.arrival_substatus == {:status, "Delayed"}
    end

    test "shows {:delayed_from, scheduled_time} for commuter rail if predicted time is more than a minute late even if the status is 'Delayed'" do
      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [_, predicted_departure_time, _],
        scheduled_departure_times: [_, scheduled_departure_time, _],
        schedules: schedules,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          route_types: [:commuter_rail_route],
          prediction_status: "Delayed",
          seconds_behind: Faker.random_between(60, 3600)
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)
      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(predicted_departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [departure] = departures

      assert departure.arrival_status == {:time, predicted_departure_time |> truncate(:minute)}
      assert departure.arrival_substatus == {:delayed_from, scheduled_departure_time}
    end

    test "shows trip details with other stops" do
      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_arrival_times: [_, time, time_after],
        predicted_departure_times: [time_before, _, _],
        stops: [stop_before, stop, stop_after],
        stop_sequences: [seq_before, seq, seq_after],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(vehicle_stop_index: 0)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures

      assert trip_details.stops_before
             |> Enum.map(
               &(&1
                 |> Map.take([:cancelled?, :stop_id, :stop_name, :stop_sequence, :time]))
             ) == [
               %{
                 cancelled?: false,
                 stop_id: stop_before.id,
                 stop_name: stop_before.name,
                 stop_sequence: seq_before,
                 time: {:time, time_before |> truncate(:minute)}
               }
             ]

      assert trip_details.stop
             |> Map.take([:cancelled?, :stop_id, :stop_name, :stop_sequence, :time]) ==
               %{
                 cancelled?: false,
                 stop_id: stop.id,
                 stop_name: stop.name,
                 stop_sequence: seq,
                 time: {:time, time |> truncate(:minute)}
               }

      assert trip_details.stops_after
             |> Enum.map(
               &(&1
                 |> Map.take([:cancelled?, :stop_id, :stop_name, :stop_sequence, :time]))
             ) == [
               %{
                 cancelled?: false,
                 stop_id: stop_after.id,
                 stop_name: stop_after.name,
                 stop_sequence: seq_after,
                 time: {:time, time_after |> truncate(:minute)}
               }
             ]
    end

    test "shows correct trip details if a trip visits a stop multiple times" do
      [stop_id_multi, stop_id_1, stop_id_2, stop_id_3] =
        Faker.Util.sample_uniq(4, fn -> FactoryHelpers.build(:id) end)

      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_arrival_times: [_, arrival_time | _],
        stop_sequences: [seq_1, seq_2, seq_3, seq_4, seq_5],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          vehicle_stop_index: 0,
          stop_ids: [stop_id_1, stop_id_multi, stop_id_2, stop_id_multi, stop_id_3]
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop_id_multi
        })

      # Verify
      assert [%{trip_details: trip_details_1}, %{trip_details: trip_details_2}] = departures

      assert trip_details_1.stops_before |> Enum.map(&{&1.stop_id, &1.stop_sequence}) == [
               {stop_id_1, seq_1}
             ]

      assert trip_details_1.stops_after |> Enum.map(&{&1.stop_id, &1.stop_sequence}) == [
               {stop_id_2, seq_3},
               {stop_id_multi, seq_4},
               {stop_id_3, seq_5}
             ]

      assert trip_details_2.stops_before |> Enum.map(&{&1.stop_id, &1.stop_sequence}) == [
               {stop_id_1, seq_1},
               {stop_id_multi, seq_2},
               {stop_id_2, seq_3}
             ]

      assert trip_details_2.stops_after |> Enum.map(&{&1.stop_id, &1.stop_sequence}) == [
               {stop_id_3, seq_5}
             ]
    end

    test "shows trip details with vehicle info" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time, _],
        predictions: predictions,
        route: route,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(vehicle_stop_index: 0)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures
      assert trip_details.vehicle_info.status == vehicle.status
    end

    test "drops the current stop if the vehicle is currently stopped there" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time | _],
        predictions: predictions,
        route: route,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          vehicle_statuses: [:stopped],
          vehicle_stop_index: 1
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures
      assert trip_details.stop == nil
    end

    test "keeps the current stop if the vehicle is in transit or incoming" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time | _],
        predictions: predictions,
        route: route,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          vehicle_statuses: [:in_transit, :incoming],
          vehicle_stop_index: 1
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures
      assert trip_details.stop.stop_id == stop.id
    end

    test "drops an earlier stop if the vehicle is currently stopped there" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time | _],
        predictions: predictions,
        route: route,
        stops: [_stop_0, _stop_1, stop_2, stop_3, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          stop_count: 5,
          vehicle_statuses: [:stopped],
          vehicle_stop_index: 1
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop_3.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures
      assert trip_details.stops_before |> Enum.map(& &1.stop_id) == [stop_2.id]
    end

    test "keeps an earlier stop if the vehicle is currently in transit or incoming" do
      # Setup
      %{
        predicted_arrival_times: [_, arrival_time | _],
        predictions: predictions,
        route: route,
        stops: [_stop_0, stop_1, stop_2, stop_3, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(
          stop_count: 5,
          vehicle_statuses: [:in_transit, :incoming],
          vehicle_stop_index: 1
        )

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      stub(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(arrival_time),
          route: route,
          stop_id: stop_3.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures
      assert trip_details.stops_before |> Enum.map(& &1.stop_id) == [stop_1.id, stop_2.id]
    end

    test "shows a vehicle status of :scheduled_to_depart if the trip has no predictions and all schedules are in the future" do
      # Setup
      %{
        scheduled_departure_times: [departure_time | _],
        route: route,
        schedules: schedules,
        stops: [_, stop, _]
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route, :commuter_rail_route])

      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(departure_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert {:no_realtime, [%{trip_details: trip_details}]} = departures
      assert trip_details.vehicle_info.status == :scheduled_to_depart
    end

    test "shows a vehicle status of :location_unavailable if the trip has no predictions and some schedules are in the past" do
      # Setup
      %{
        scheduled_departure_times: [departure_time_1, departure_time_2 | _],
        route: route,
        schedules: schedules,
        stops: [_, stop, _]
      } =
        PredictedScheduleHelper.journey(route_types: [:bus_route, :commuter_rail_route])

      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now:
            Generators.DateTime.random_time_range_date_time({departure_time_1, departure_time_2}),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert {:no_realtime, [%{trip_details: trip_details}]} = departures
      assert trip_details.vehicle_info.status == :location_unavailable
    end

    test "shows a vehicle status of :location_unavailable if the trip has predictions but no vehicle" do
      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [time | _],
        stops: [_, stop, _]
      } =
        PredictedScheduleHelper.journey(missing_vehicle?: true)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures
      assert trip_details.vehicle_info.status == :location_unavailable
    end

    test "shows a vehicle status of :location_unavailable if the predictions' assigned vehicle has a nil stop ID" do
      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [time | _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey()

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      expect(Vehicles.Repo.Mock, :get, fn _ -> %{vehicle | stop_id: nil} end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures
      assert trip_details.vehicle_info.status == :location_unavailable
    end

    test "shows a vehicle status of :finishing_another_trip if the predictions' assigned vehicle has a different trip ID" do
      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [time | _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(vehicle_on_different_trip?: true)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      expect(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures
      assert trip_details.vehicle_info.status == :finishing_another_trip
    end

    test "shows a vehicle status of :waiting_to_depart if the predictions' assigned vehicle is :stopped at the origin stop of the trip" do
      # Setup
      %{
        predictions: predictions,
        route: route,
        predicted_departure_times: [time | _],
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(vehicle_stop_index: 0, vehicle_statuses: [:stopped])

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      expect(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures
      assert trip_details.vehicle_info.status == :waiting_to_depart
    end

    test "pulls trip details from schedules for scheduled trips" do
      # Setup
      %{
        route: route,
        schedules: schedules,
        scheduled_arrival_times: [_, time_1, time_2],
        stops: [_stop_0, stop_1, stop_2]
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route, :commuter_rail_route],
          vehicle_stop_index: 0
        )

      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(time_1),
          route: route,
          stop_id: stop_1.id
        })

      # Verify
      assert {:no_realtime, [%{trip_details: trip_details}]} = departures

      assert trip_details.stop |> then(&{&1.stop_id, &1.time}) ==
               {stop_1.id, {:time, time_1 |> truncate(:minute)}}

      assert trip_details.stops_after |> Enum.map(&{&1.stop_id, &1.time}) == [
               {stop_2.id, {:time, time_2 |> truncate(:minute)}}
             ]
    end

    test "pulls trip details from schedules for upcoming other-stops without predictions" do
      # Setup
      %{
        predicted_departure_times: [predicted_time_0 | _],
        predictions: [prediction | _],
        route: route,
        scheduled_arrival_times: [_, scheduled_time_1, scheduled_time_2],
        schedules: schedules,
        stops: [stop_0, stop_1, stop_2]
      } =
        PredictedScheduleHelper.journey(vehicle_stop_index: 0)

      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)
      expect(Predictions.Repo.Mock, :all, fn _ -> [prediction] end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(predicted_time_0),
          route: route,
          stop_id: stop_0.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures

      assert trip_details.stops_after |> Enum.map(&{&1.stop_id, &1.time}) == [
               {stop_1.id, {:time, scheduled_time_1 |> truncate(:minute)}},
               {stop_2.id, {:time, scheduled_time_2 |> truncate(:minute)}}
             ]
    end

    @tag :skip
    test "does not include past scheduled stops in trip details" do
      # Setup
      %{
        route: route,
        scheduled_arrival_times: [_, scheduled_time_1, scheduled_time_2, _, _],
        schedules: schedules,
        stops: [_, _stop_1, stop_2, stop, _]
      } =
        PredictedScheduleHelper.journey(
          route_types: [:bus_route, :commuter_rail_route],
          stop_count: 5
        )

      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> schedules end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now:
            Generators.DateTime.random_time_range_date_time({scheduled_time_1, scheduled_time_2}),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert {:no_realtime, [%{trip_details: trip_details}]} = departures

      assert trip_details.stops_before |> Enum.map(&{&1.stop_id, &1.time}) == [
               {stop_2.id, {:time, scheduled_time_2 |> truncate(:minute)}}
             ]
    end

    test "uses `departure_time` as other_stop.time if `arrival_time` isn't available" do
      # Setup
      %{
        route: route,
        predicted_departure_times: [predicted_time | _],
        predicted_arrival_times: [nil | _],
        predictions: predictions,
        stops: [_, stop, _],
        vehicle: vehicle
      } =
        PredictedScheduleHelper.journey(vehicle_stop_index: 0)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)
      expect(Vehicles.Repo.Mock, :get, fn _ -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: Faker.Util.pick([0, 1]),
          now: Generators.ServiceDateTime.earlier_on_day(predicted_time),
          route: route,
          stop_id: stop.id
        })

      # Verify
      assert [%{trip_details: trip_details}] = departures

      assert trip_details.stops_before |> Enum.map(& &1.time) == [
               {:time, predicted_time |> truncate(:minute)}
             ]
    end

    test "OLD - shows an `other_stop` as cancelled if the time on its prediction is nil and the time on its schedule is non-nil" do
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

      expect(Predictions.Repo.Mock, :all, fn _opts ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            schedule_relationship: :scheduled,
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

      stub(Vehicles.Repo.Mock, :get, fn _ ->
        Factories.Vehicles.Vehicle.build(:vehicle, stop_sequence: stop_sequence)
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
      assert stop_after.time == {:time, arrival_time_after |> truncate(:minute)}
      assert stop_after.cancelled?
    end

    test "OLD - does not include upcoming departures for other stops" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route = Factories.Routes.Route.build(:route)
      [stop_id, other_stop_id] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)
      trip_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_sequence = Faker.random_between(1, 10_000)

      minutes_until_arrival = Faker.random_between(2, 59)
      arrival_time = now |> DateTime.shift(minute: minutes_until_arrival)

      expect(Predictions.Repo.Mock, :all, fn _opts ->
        [
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            stop_sequence: stop_sequence,
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          ),
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: other_stop_id),
            trip: Factories.Schedules.Trip.build(:trip, id: trip_id)
          )
        ]
      end)

      stub(Vehicles.Repo.Mock, :get, fn _ ->
        Factories.Vehicles.Vehicle.build(:vehicle, stop_sequence: stop_sequence)
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

    test "OLD - uses vehicle :stopped status for subway arrival_status, if applicable" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      subway_route = Factories.Routes.Route.build(:subway_route)
      vehicle_id = FactoryHelpers.build(:id)
      seconds_until_departure = Faker.random_between(0, 600)
      arrival_time = now |> DateTime.shift(second: -5)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      prediction =
        Factories.Predictions.Prediction.build(:prediction,
          arrival_time: arrival_time,
          departure_time: departure_time,
          route: subway_route
        )

      vehicle_at_stop =
        Factories.Vehicles.Vehicle.build(:vehicle,
          id: vehicle_id,
          status: :stopped,
          stop_id: prediction.stop.id,
          trip_id: prediction.trip.id,
          stop_sequence: prediction.stop_sequence
        )

      prediction = Map.put(prediction, :vehicle_id, vehicle_id)

      expect(Predictions.Repo.Mock, :all, fn _ -> [prediction] end)
      expect(Vehicles.Repo.Mock, :get, fn ^vehicle_id -> vehicle_at_stop end)

      # Exercise
      [departure] =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: prediction.direction_id,
          now: now,
          route: subway_route,
          stop_id: prediction.stop.id
        })

      # Verify
      assert departure.arrival_status == :boarding
    end

    test "OLD - does not show :boarding status if vehicle is stopped at a different stop" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      subway_route = Factories.Routes.Route.build(:subway_route)
      other_stop_id = FactoryHelpers.build(:id)
      vehicle_id = FactoryHelpers.build(:id)
      seconds_until_departure = Faker.random_between(0, 90)
      arrival_time = now |> DateTime.shift(second: -5)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      [vehicle_stop_sequence, prediction_stop_sequence] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      prediction =
        Factories.Predictions.Prediction.build(:prediction,
          arrival_time: arrival_time,
          departure_time: departure_time,
          route: subway_route,
          stop_sequence: prediction_stop_sequence
        )

      vehicle_at_stop =
        Factories.Vehicles.Vehicle.build(:vehicle,
          id: vehicle_id,
          status: :stopped,
          stop_id: other_stop_id,
          stop_sequence: vehicle_stop_sequence,
          trip_id: prediction.trip.id
        )

      prediction = Map.put(prediction, :vehicle_id, vehicle_id)

      expect(Predictions.Repo.Mock, :all, fn _ -> [prediction] end)
      expect(Vehicles.Repo.Mock, :get, fn ^vehicle_id -> vehicle_at_stop end)

      # Exercise
      [departure] =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: prediction.direction_id,
          now: now,
          route: subway_route,
          stop_id: prediction.stop.id
        })

      # Verify
      refute departure.arrival_status == :boarding
    end

    test "OLD - does not show :boarding for the first stop of a trip (arrival_time=nil) more than 90 seconds before departure" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      subway_route = Factories.Routes.Route.build(:subway_route)
      vehicle_id = FactoryHelpers.build(:id)
      seconds_until_departure = Faker.random_between(91, 3600)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      prediction =
        Factories.Predictions.Prediction.build(:prediction,
          arrival_time: nil,
          departure_time: departure_time,
          route: subway_route
        )

      vehicle_at_stop =
        Factories.Vehicles.Vehicle.build(:vehicle,
          id: vehicle_id,
          status: :stopped,
          stop_id: prediction.stop.id,
          trip_id: prediction.trip.id,
          stop_sequence: prediction.stop_sequence
        )

      prediction = Map.put(prediction, :vehicle_id, vehicle_id)

      expect(Predictions.Repo.Mock, :all, fn _ -> [prediction] end)
      expect(Vehicles.Repo.Mock, :get, fn ^vehicle_id -> vehicle_at_stop end)

      # Exercise
      [departure] =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: prediction.direction_id,
          now: now,
          route: subway_route,
          stop_id: prediction.stop.id
        })

      # Verify
      refute departure.arrival_status == :boarding
    end

    test "OLD - shows :boarding when the vehicle is stopped at the station, even if the prediction time is in the past" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      subway_route = Factories.Routes.Route.build(:subway_route)
      vehicle_id = FactoryHelpers.build(:id)
      seconds_since_departure = Faker.random_between(1, 600)
      departure_time = now |> DateTime.shift(second: -seconds_since_departure)

      prediction =
        Factories.Predictions.Prediction.build(:prediction,
          arrival_time: nil,
          departure_time: departure_time,
          route: subway_route
        )

      vehicle_at_stop =
        Factories.Vehicles.Vehicle.build(:vehicle,
          id: vehicle_id,
          status: :stopped,
          stop_id: prediction.stop.id,
          trip_id: prediction.trip.id,
          stop_sequence: prediction.stop_sequence
        )

      prediction = Map.put(prediction, :vehicle_id, vehicle_id)

      expect(Predictions.Repo.Mock, :all, fn _ -> [prediction] end)
      expect(Vehicles.Repo.Mock, :get, fn ^vehicle_id -> vehicle_at_stop end)

      # Exercise
      [departure] =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: prediction.direction_id,
          now: now,
          route: subway_route,
          stop_id: prediction.stop.id
        })

      # Verify
      assert departure.arrival_status == :boarding
    end

    test "OLD - drops a prediction when the vehicle is past the station whether or not the prediction is in the past" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      subway_route = Factories.Routes.Route.build(:subway_route)
      vehicle_id = FactoryHelpers.build(:id)
      seconds_since_or_until_departure = Faker.random_between(-600, 600)
      departure_time = now |> DateTime.shift(second: seconds_since_or_until_departure)

      [prediction_stop_sequence, vehicle_stop_sequence] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      prediction =
        Factories.Predictions.Prediction.build(:prediction,
          arrival_time: nil,
          departure_time: departure_time,
          route: subway_route,
          stop_sequence: prediction_stop_sequence
        )

      vehicle =
        Factories.Vehicles.Vehicle.build(:vehicle,
          id: vehicle_id,
          trip_id: prediction.trip.id,
          stop_sequence: vehicle_stop_sequence
        )

      prediction = Map.put(prediction, :vehicle_id, vehicle_id)

      expect(Predictions.Repo.Mock, :all, fn _ -> [prediction] end)
      expect(Vehicles.Repo.Mock, :get, fn ^vehicle_id -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: prediction.direction_id,
          now: now,
          route: subway_route,
          stop_id: prediction.stop.id
        })

      # Verify
      assert departures == []
    end

    test "OLD - does not drop a prediction when the vehicle is serving a different trip even if its stop sequence is lower than the vehicle's" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      subway_route = Factories.Routes.Route.build(:subway_route)
      vehicle_id = FactoryHelpers.build(:id)

      minutes_until_departure = Faker.random_between(2, 59)
      seconds_until_departure = minutes_until_departure * 60 + Faker.random_between(-30, 29)
      departure_time = now |> DateTime.shift(second: seconds_until_departure)

      [vehicle_trip_id, prediction_trip_id] =
        Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      [prediction_stop_sequence, vehicle_stop_sequence] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(0, 1000) end)
        |> Enum.sort()

      prediction =
        Factories.Predictions.Prediction.build(:prediction,
          arrival_time: nil,
          departure_time: departure_time,
          route: subway_route,
          stop_sequence: prediction_stop_sequence,
          trip: Factories.Schedules.Trip.build(:trip, id: prediction_trip_id)
        )

      vehicle =
        Factories.Vehicles.Vehicle.build(:vehicle,
          id: vehicle_id,
          trip_id: vehicle_trip_id,
          stop_sequence: vehicle_stop_sequence
        )

      prediction = Map.put(prediction, :vehicle_id, vehicle_id)

      expect(Predictions.Repo.Mock, :all, fn _ -> [prediction] end)
      expect(Vehicles.Repo.Mock, :get, fn ^vehicle_id -> vehicle end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: prediction.direction_id,
          now: now,
          route: subway_route,
          stop_id: prediction.stop.id
        })

      # Verify
      assert [departure] = departures
      assert departure.arrival_status == {:departure_minutes, minutes_until_departure}
    end

    test "OLD - marks the last upcoming departure with last_trip? = true for non-subway routes" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      route =
        Factories.Routes.Route.build(
          Faker.Util.pick([:bus_route, :commuter_rail_route, :ferry_route])
        )

      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_times =
        Faker.Util.sample_uniq(4, fn ->
          Generators.DateTime.random_time_range_date_time(
            {now, ServiceDateTime.end_of_service_day(now)}
          )
        end)
        |> Enum.sort(DateTime)

      predictions =
        Enum.map(arrival_times, fn arrival_time ->
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip)
          )
        end)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert is_list(departures)
      assert length(departures) == 4

      # All departures except the last should have last_trip? = false
      for departure <- Enum.take(departures, 3) do
        refute departure.last_trip?
      end

      # The last departure should have last_trip? = true
      last_departure = List.last(departures)
      assert last_departure.last_trip?
    end

    test "OLD - does not mark last_trip? = true for subway routes" do
      # Setup
      now = Dotcom.Utils.DateTime.now()
      route = Factories.Routes.Route.build(:subway_route)
      stop_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])

      arrival_times =
        Faker.Util.sample_uniq(4, fn ->
          Generators.DateTime.random_time_range_date_time(
            {now, ServiceDateTime.end_of_service_day(now)}
          )
        end)
        |> Enum.sort(DateTime)

      predictions =
        Enum.map(arrival_times, fn arrival_time ->
          Factories.Predictions.Prediction.build(:prediction,
            arrival_time: arrival_time,
            stop: Factories.Stops.Stop.build(:stop, id: stop_id),
            trip: Factories.Schedules.Trip.build(:trip)
          )
        end)

      expect(Predictions.Repo.Mock, :all, fn _ -> predictions end)

      # Exercise
      departures =
        UpcomingDepartures.upcoming_departures(%{
          direction_id: direction_id,
          now: now,
          route: route,
          stop_id: stop_id
        })

      # Verify
      assert is_list(departures)
      assert length(departures) == 4

      # All departures including the last should have last_trip? = false for subway
      for departure <- departures do
        refute departure.last_trip?
      end
    end
  end
end
