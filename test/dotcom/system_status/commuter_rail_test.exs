defmodule Dotcom.SystemStatus.CommuterRailTest do
  use ExUnit.Case

  import Dotcom.SystemStatus.CommuterRail, only: [commuter_rail_status_for_route: 1]
  import Mox

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
             |> Kernel.get_in([:alert_counts, random_service_impacting_effect]) == 1
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
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          Factories.Alerts.Alert.build(:alert, active_period: active_period, effect: :delay),
          Factories.Alerts.Alert.build(:alert, active_period: active_period, effect: :delay),
          Factories.Alerts.Alert.build(:alert, active_period: active_period, effect: :shuttle)
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      assert result |> Map.values() |> List.first() |> Map.get(:alert_counts) == %{
               delay: 2,
               shuttle: 1
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

  describe "commuter_rail_status_for_route/1" do
    test "returns :normal if there are no alerts" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

      # EXERCISE
      status =
        commuter_rail_id
        |> commuter_rail_status_for_route()

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
        |> commuter_rail_status_for_route()

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
        |> commuter_rail_status_for_route()

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
        |> commuter_rail_status_for_route()

      # VERIFY
      assert status.cancellations == []
      assert status.service_alerts == []
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
        |> commuter_rail_status_for_route()
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
        |> Dotcom.SystemStatus.CommuterRail.commuter_rail_status_for_route()
        |> Map.get(:cancellations)

      # VERIFY
      assert cancellation.alert == alert
    end

    test "groups other service-impacting alerts under `service_alerts`" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      commuter_rail_id = Faker.Color.fancy_name()

      random_service_effect = @service_effects |> Enum.random()

      alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: active_period,
          effect: random_service_effect,
          severity: 3
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [alert] end)

      # EXERCISE
      status =
        commuter_rail_id
        |> commuter_rail_status_for_route()

      # VERIFY
      assert status.service_alerts == [alert]
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
        |> commuter_rail_status_for_route()
        |> Map.get(:delays)

      # VERIFY
      {:trip, trip_info} = delay.trip_info
      assert trip_info.name == trip.name
      assert trip_info.direction_id == trip.direction_id
      assert trip_info.first_stop == first_stop
      assert trip_info.last_stop == last_stop
      assert trip_info.first_departure_time == first_departure_time
    end

    test "returns multiple entries if an alert has multiple trips" do
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
        |> commuter_rail_status_for_route()
        |> Map.get(:delays)

      # VERIFY
      {:trip, trip_info1} = delay1.trip_info
      {:trip, trip_info2} = delay2.trip_info

      assert MapSet.new([trip_info1.name, trip_info2.name]) ==
               MapSet.new([trip1.name, trip2.name])
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
        |> commuter_rail_status_for_route()
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
        |> commuter_rail_status_for_route()
        |> Map.get(:delays)

      # VERIFY
      assert delay.trip_info == :all
    end
  end
end
