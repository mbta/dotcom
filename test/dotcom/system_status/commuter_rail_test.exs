defmodule Dotcom.SystemStatus.CommuterRailTest do
  use ExUnit.Case

  import Dotcom.SystemStatus.CommuterRail, only: [commuter_rail_route_status: 1]
  import Mox
  import Test.Support.Generators.DateTime, only: [random_time_range_date_time: 1]

  alias Alerts.{InformedEntity, InformedEntitySet}
  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.{Factories, FactoryHelpers, Generators}

  setup :verify_on_exit!

  @service_impacting_effects Dotcom.Alerts.service_impacting_effects()
                             |> Enum.map(fn {effect, _severity} -> effect end)

  @service_effects @service_impacting_effects -- [:cancellation, :delay]

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    stub(Routes.Repo.Mock, :all, fn ->
      [
        Factories.Routes.Route.build(:route, type: 2)
      ]
    end)

    stub(Schedules.RepoCondensed.Mock, :by_route_ids, fn _ ->
      [
        %Schedules.ScheduleCondensed{
          time: Dotcom.Utils.DateTime.now()
        }
      ]
    end)

    stub(Schedules.Repo.Mock, :schedule_for_trip, fn _, "filter[stop_sequence]": "first,last" ->
      Factories.Schedules.Schedule.build_list(2, :schedule)
    end)

    :ok
  end

  describe "commuter_rail_status/0" do
    test "only returns commuter rail routes" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()
      subway_id = Faker.Color.fancy_name()

      expect(Routes.Repo.Mock, :all, fn ->
        [
          # Commuter Rail
          Factories.Routes.Route.build(:route, id: commuter_rail_id, type: 2),
          # Subway
          Factories.Routes.Route.build(:route, id: subway_id, type: 1)
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      assert result |> Map.keys() |> List.first() == commuter_rail_id
    end

    test "only uses service impacting alerts" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      random_service_impacting_effect =
        Dotcom.Alerts.service_impacting_effects()
        |> Enum.random()
        |> Kernel.elem(0)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          # Service impacting alert
          Factories.Alerts.Alert.build(:alert,
            active_period: active_period,
            effect: random_service_impacting_effect,
            severity: 3
          ),
          # Non-service impacting alert
          Factories.Alerts.Alert.build(:alert, effect: :summary)
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      assert result
             |> Map.values()
             |> List.first()
             |> Kernel.get_in([:alert_counts, random_service_impacting_effect, :count]) == 1
    end

    test "only uses alerts that are in effect today" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 24),
         Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 25)}
      ]

      random_service_impacting_effect = @service_impacting_effects |> Enum.random()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          Factories.Alerts.Alert.build(:alert,
            active_period: active_period,
            effect: random_service_impacting_effect
          )
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      assert result
             |> Map.values()
             |> List.first()
             |> Kernel.get_in([:alert_counts, random_service_impacting_effect]) == nil
    end

    test "groups alerts into the correct counts" do
      # SETUP
      now = Dotcom.Utils.DateTime.now()

      active_period = [
        {now, Timex.shift(now, hours: 1)}
      ]

      stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          Factories.Alerts.Alert.build(:alert,
            active_period: active_period,
            effect: :delay,
            severity: 2
          ),
          Factories.Alerts.Alert.build(:alert,
            active_period: active_period,
            effect: :delay,
            severity: 2
          ),
          Factories.Alerts.Alert.build(:alert, active_period: active_period, effect: :shuttle)
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      assert result |> Map.values() |> List.first() |> Map.get(:alert_counts) == %{
               delay: %{count: 2, next_active: {:current, now}},
               shuttle: %{count: 1, next_active: {:current, now}}
             }
    end

    test "indicates whether or not the route is running service today" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      expect(Routes.Repo.Mock, :all, fn ->
        [
          Factories.Routes.Route.build(:route, id: commuter_rail_id, type: 2)
        ]
      end)

      expect(Schedules.RepoCondensed.Mock, :by_route_ids, fn _ ->
        [
          %Schedules.ScheduleCondensed{
            time: Dotcom.Utils.DateTime.now() |> Timex.shift(days: 1)
          }
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      refute result |> Map.values() |> List.first() |> Map.get(:service_today?)
    end
  end

  describe "commuter_rail_route_status/1" do
    test "returns :normal if there are no alerts" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

      # EXERCISE
      status =
        commuter_rail_id
        |> commuter_rail_route_status()

      # VERIFY
      assert status == :normal
    end

    test "returns :no_scheduled_service if there's no scheduled service for today" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      expect(Schedules.RepoCondensed.Mock, :by_route_ids, fn _ ->
        [
          %Schedules.ScheduleCondensed{
            time: Dotcom.Utils.DateTime.now() |> Timex.shift(days: 1)
          }
        ]
      end)

      # EXERCISE
      status =
        commuter_rail_id
        |> commuter_rail_route_status()

      # VERIFY
      assert status == :no_scheduled_service
    end

    test "does not factor in non-service-impacting alerts" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          Factories.Alerts.Alert.build(:alert, effect: :summary)
        ]
      end)

      # EXERCISE
      status =
        commuter_rail_id
        |> commuter_rail_route_status()

      # VERIFY
      assert status == :normal
    end

    test "returns an empty list of cancellations and service_alerts when only delays are present" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      trip = Factories.Schedules.Trip.build(:trip)
      commuter_rail_id = Faker.Color.fancy_name()

      alert =
        Factories.Alerts.Alert.build(:alert_for_trip,
          active_period: active_period,
          effect: :delay,
          severity: 3,
          trip_id: trip.id
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      # EXERCISE
      status =
        commuter_rail_id
        |> commuter_rail_route_status()

      # VERIFY
      assert status.cancellations == []
      assert status.service_impacts == []
    end

    test "returns delays when present" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      commuter_rail_id = Faker.Color.fancy_name()

      alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: active_period,
          effect: :delay,
          severity: 3
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      # EXERCISE
      [delay] =
        commuter_rail_id
        |> commuter_rail_route_status()
        |> Map.get(:delays)

      # VERIFY
      assert delay.alert == alert
    end

    test "returns cancellations when present" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      commuter_rail_id = Faker.Color.fancy_name()

      alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: active_period,
          effect: :cancellation,
          severity: 3
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      # EXERCISE
      [cancellation] =
        commuter_rail_id
        |> Dotcom.SystemStatus.CommuterRail.commuter_rail_route_status()
        |> Map.get(:cancellations)

      # VERIFY
      assert cancellation.alert == alert
    end

    test "groups other service-impacting alerts under `service_impacts`" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      random_service_effect = @service_effects |> Enum.random()

      alert =
        Factories.Alerts.Alert.build(:alert,
          effect: random_service_effect,
          severity: 3
        )
        |> Factories.Alerts.Alert.active_now()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      # EXERCISE
      [service_impact] =
        commuter_rail_id
        |> commuter_rail_route_status()
        |> Map.get(:service_impacts)

      # VERIFY
      assert service_impact.alert == alert
      assert {:current, _} = service_impact.start_time
    end

    test "service-impacting alerts starting later in the day are given a {:future, time} start time" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      random_service_effect = @service_effects |> Enum.random()
      {_, service_day_end} = ServiceDateTime.service_range_day()

      start_time = random_time_range_date_time({Dotcom.Utils.DateTime.now(), service_day_end})

      alert =
        Factories.Alerts.Alert.build(:alert,
          effect: random_service_effect,
          severity: 3
        )
        |> Factories.Alerts.Alert.active_starting_at(start_time)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      # EXERCISE
      [service_impact] =
        commuter_rail_id
        |> commuter_rail_route_status()
        |> Map.get(:service_impacts)

      # VERIFY
      assert service_impact.alert == alert
      assert service_impact.start_time == {:future, start_time}
    end

    test "service-impacting alerts are sorted by start time" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      random_service_effect = @service_effects |> Enum.random()
      {service_day_beginning, service_day_end} = ServiceDateTime.service_range_day()

      start_time2 =
        random_time_range_date_time({service_day_beginning, Dotcom.Utils.DateTime.now()})

      start_time1 = random_time_range_date_time({service_day_beginning, start_time2})
      start_time3 = random_time_range_date_time({Dotcom.Utils.DateTime.now(), service_day_end})
      start_time4 = random_time_range_date_time({start_time3, service_day_end})

      alerts =
        [start_time1, start_time2, start_time3, start_time4]
        |> Enum.map(fn start_time ->
          Factories.Alerts.Alert.build(:alert,
            effect: random_service_effect,
            severity: 3
          )
          |> Factories.Alerts.Alert.active_starting_at(start_time)
        end)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> alerts |> Enum.shuffle() end)

      # EXERCISE
      service_impacts =
        commuter_rail_id
        |> commuter_rail_route_status()
        |> Map.get(:service_impacts)

      # VERIFY
      assert service_impacts |> Enum.map(& &1.alert.id) == alerts |> Enum.map(& &1.id)
    end

    test "returns the trip info when a single trip is assigned to the alert" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      trip = Factories.Schedules.Trip.build(:trip)
      trip_id = trip.id
      commuter_rail_id = Faker.Color.fancy_name()

      alert =
        Factories.Alerts.Alert.build(:alert_for_trip,
          active_period: active_period,
          effect: :delay,
          severity: 3,
          trip_id: trip_id
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      first_departure_time =
        ServiceDateTime.service_range_day()
        |> Generators.DateTime.random_time_range_date_time()

      last_departure_time = Generators.DateTime.random_date_time_after(first_departure_time)

      first_stop = Factories.Stops.Stop.build(:stop)
      last_stop = Factories.Stops.Stop.build(:stop)

      expect(Schedules.Repo.Mock, :schedule_for_trip, fn ^trip_id,
                                                         "filter[stop_sequence]": "first,last" ->
        [
          Factories.Schedules.Schedule.build(:schedule,
            departure_time: first_departure_time,
            stop: first_stop,
            trip: trip
          ),
          Factories.Schedules.Schedule.build(:schedule,
            departure_time: last_departure_time,
            stop: last_stop,
            trip: trip
          )
        ]
      end)

      # EXERCISE
      [delay] =
        commuter_rail_id
        |> commuter_rail_route_status()
        |> Map.get(:delays)

      # VERIFY
      {:trip, trip_info} = delay.trip_info
      assert trip_info.name == trip.name
      assert trip_info.direction_id == trip.direction_id
      assert trip_info.first_stop == first_stop
      assert trip_info.last_stop == last_stop
      assert trip_info.first_departure_time == first_departure_time
    end

    test "returns multiple entries sorted by first_departure_time if an alert has multiple trips" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      [trip_id1, trip_id2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      trip1 = Factories.Schedules.Trip.build(:trip, id: trip_id1)
      trip2 = Factories.Schedules.Trip.build(:trip, id: trip_id2)

      commuter_rail_id = Faker.Color.fancy_name()

      alert =
        Factories.Alerts.Alert.build(:alert_for_trips,
          active_period: active_period,
          effect: :delay,
          severity: 3,
          trip_ids: [trip_id1, trip_id2]
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      expect(Schedules.Repo.Mock, :schedule_for_trip, 2, fn
        ^trip_id1, _ -> Factories.Schedules.Schedule.build_list(2, :schedule, trip: trip1)
        ^trip_id2, _ -> Factories.Schedules.Schedule.build_list(2, :schedule, trip: trip2)
      end)

      # EXERCISE
      [delay1, delay2] =
        commuter_rail_id
        |> commuter_rail_route_status()
        |> Map.get(:delays)

      # VERIFY
      {:trip, trip_info1} = delay1.trip_info
      {:trip, trip_info2} = delay2.trip_info

      assert MapSet.new([trip_info1.name, trip_info2.name]) ==
               MapSet.new([trip1.name, trip2.name])
    end

    test "does not return entries corresponding to invalid trip ID's" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      [trip_id1, trip_id2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      trip1 = Factories.Schedules.Trip.build(:trip, id: trip_id1)

      commuter_rail_id = Faker.Color.fancy_name()

      alert =
        Factories.Alerts.Alert.build(:alert_for_trips,
          active_period: active_period,
          effect: :delay,
          severity: 3,
          trip_ids: [trip_id1, trip_id2]
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      expect(Schedules.Repo.Mock, :schedule_for_trip, 2, fn
        ^trip_id1, _ -> Factories.Schedules.Schedule.build_list(2, :schedule, trip: trip1)
        ^trip_id2, _ -> []
      end)

      # EXERCISE
      [delay1] =
        commuter_rail_id
        |> commuter_rail_route_status()
        |> Map.get(:delays)

      # VERIFY
      {:trip, trip_info1} = delay1.trip_info

      assert trip_info1.name == trip1.name
    end

    test "treats all-trip-id's-invalid as normal service" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      [trip_id1, trip_id2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      commuter_rail_id = Faker.Color.fancy_name()

      alert =
        Factories.Alerts.Alert.build(:alert_for_trips,
          active_period: active_period,
          effect: :delay,
          severity: 3,
          trip_ids: [trip_id1, trip_id2]
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      expect(Schedules.Repo.Mock, :schedule_for_trip, 2, fn
        ^trip_id1, _ -> []
        ^trip_id2, _ -> []
      end)

      # EXERCISE
      status =
        commuter_rail_id
        |> commuter_rail_route_status()

      # VERIFY
      assert status == :normal
    end

    test "returns direction info only if no specific trips are given" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      direction_id = FactoryHelpers.build(:direction_id)

      commuter_rail_id = Faker.Color.fancy_name()

      alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: active_period,
          effect: :delay,
          severity: 3,
          informed_entity: InformedEntitySet.new([%InformedEntity{direction_id: direction_id}])
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      # EXERCISE
      [delay] =
        commuter_rail_id
        |> commuter_rail_route_status()
        |> Map.get(:delays)

      # VERIFY
      {:direction, direction_info} = delay.trip_info

      assert direction_info.direction_id == direction_id
    end

    test "returns `:all` if no trip and no direction is selected" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      commuter_rail_id = Faker.Color.fancy_name()

      alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: active_period,
          effect: :delay,
          informed_entity: InformedEntitySet.new([]),
          severity: 3
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      # EXERCISE
      [delay] =
        commuter_rail_id
        |> commuter_rail_route_status()
        |> Map.get(:delays)

      # VERIFY
      assert delay.trip_info == :all
    end
  end
end
