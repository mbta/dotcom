defmodule Dotcom.ScheduleFinderTest do
  use ExUnit.Case, async: true

  import Dotcom.ScheduleFinder
  import Mox

  alias Dotcom.ScheduleFinder.{DailyDeparture, FutureArrival}
  alias Test.Support.Factories.{RoutePatterns.RoutePattern, Schedules.Schedule}
  alias Test.Support.FactoryHelpers

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "daily_departures/4" do
    test "requests schedules" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(Schedules.Repo.Mock, :by_route_ids, fn routes, opts ->
        assert routes == [route_id]
        assert Keyword.get(opts, :direction_id) == direction_id
        assert Keyword.get(opts, :stop_ids) == stop_id
        assert Keyword.get(opts, :date) == date
        []
      end)

      assert {:ok, []} = daily_departures(route_id, direction_id, stop_id, date)
    end

    test "returns departures" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")
      schedules = Schedule.build_list(4, :schedule)

      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ ->
        schedules
      end)

      expect(RoutePatterns.Repo.Mock, :get, length(schedules), fn id ->
        RoutePattern.build(:route_pattern, id: id)
      end)

      assert {:ok, departures} = daily_departures(route_id, direction_id, stop_id, date)
      assert %DailyDeparture{} = List.first(departures)
    end

    test "returns departures with route pattern time_desc" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")
      schedules = Schedule.build_list(4, :schedule)

      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ ->
        schedules
      end)

      time_desc = Faker.Company.catch_phrase()

      expect(RoutePatterns.Repo.Mock, :get, length(schedules), fn id ->
        RoutePattern.build(:route_pattern, id: id, time_desc: time_desc)
      end)

      assert {:ok, departures} = daily_departures(route_id, direction_id, stop_id, date)
      assert %DailyDeparture{time_desc: ^time_desc} = List.first(departures)
    end

    test "omits schedules that don't pick up passengers" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ ->
        Schedule.build_list(4, :schedule, pickup_type: 1)
      end)

      stub(RoutePatterns.Repo.Mock, :get, fn id ->
        RoutePattern.build(:route_pattern, id: id)
      end)

      assert {:ok, []} = daily_departures(route_id, direction_id, stop_id, date)
    end
  end

  describe "next_arrivals/3" do
    test "requests schedules" do
      trip_id = FactoryHelpers.build(:id)
      stop_sequence = Faker.Util.pick([0, 1])
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(Schedules.Repo.Mock, :schedule_for_trip, fn ^trip_id, opts ->
        assert Keyword.get(opts, :date) == date
        []
      end)

      assert {:ok, []} = next_arrivals(trip_id, stop_sequence, date)
    end

    test "omits schedules before the given stop_sequence" do
      trip_id = FactoryHelpers.build(:id)
      stop_sequence = Faker.random_between(2, 100)
      earlier_stop_sequence = stop_sequence - 1
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(Schedules.Repo.Mock, :schedule_for_trip, fn _, _ ->
        Schedule.build_list(4, :schedule, stop_sequence: earlier_stop_sequence)
      end)

      assert {:ok, []} = next_arrivals(trip_id, stop_sequence, date)
    end

    test "returns arrivals" do
      trip_id = FactoryHelpers.build(:id)

      [stop_sequence_for_stop, stop_sequence_for_arrivals] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(1, 100) end) |> Enum.sort()

      date = Faker.Util.format("%4d-%2d-%2d")
      schedules = Schedule.build_list(4, :schedule, stop_sequence: stop_sequence_for_arrivals)

      expect(Schedules.Repo.Mock, :schedule_for_trip, fn _, _ ->
        schedules
      end)

      assert {:ok, arrivals} = next_arrivals(trip_id, stop_sequence_for_stop, date)
      assert %FutureArrival{} = List.first(arrivals)
    end
  end

  describe "subway_groups/3" do
    test "returns route, destination, departure times" do
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      route = Test.Support.Factories.Routes.Route.build(:route)
      departures = departures()

      expect(Routes.Repo.Mock, :get, length(departures), fn _ ->
        route
      end)

      assert [{route, destination, times} | _] = subway_groups(departures, direction_id, stop_id)
      assert route.direction_destinations[direction_id] == destination
      assert [%DateTime{} | _] = times
    end

    test "if on the Southbound Red Line branches, adjusts destination accordingly" do
      direction_id = 0

      braintree_stop_id =
        ~w(place-nqncy place-wlsta place-qnctr place-qamnl place-brntn) |> Faker.Util.pick()

      departures = departures()
      route = Test.Support.Factories.Routes.Route.build(:route, %{id: "Red"})

      expect(Routes.Repo.Mock, :get, length(departures), fn _ ->
        route
      end)

      assert [{route, destination, _} | _] =
               subway_groups(departures, direction_id, braintree_stop_id)

      refute route.direction_destinations[direction_id] == destination
      assert destination == "Braintree"
    end
  end

  describe "current_alerts/2" do
    setup do
      Alerts.Repo.Mock
      |> stub(:by_route_id_and_type, fn _, _, _ -> [] end)

      :ok
    end

    test "requests alerts for stop & route" do
      route =
        Test.Support.Factories.Routes.Route.build(:route, type: Faker.Util.pick([0, 1, 3, 4]))

      stop = Test.Support.Factories.Stops.Stop.build(:stop)

      alert =
        active_alert(%{
          informed_entity: %{
            route: route.id,
            route_type: route.type,
            stop: stop.id
          }
        })

      Alerts.Repo.Mock
      |> expect(:by_route_id_and_type, fn route_id, route_type, _ ->
        assert route.id == route_id
        assert route.type == route_type
        [alert]
      end)

      assert [^alert] = current_alerts(stop, route)
    end

    test "omits alerts which aren't currently active" do
      route = Test.Support.Factories.Routes.Route.build(:route)
      stop = Test.Support.Factories.Stops.Stop.build(:stop)

      upcoming_alert =
        active_alert(%{
          informed_entity: %{
            route: route.id,
            route_type: route.type,
            stop: stop.id
          }
        })
        |> Test.Support.Factories.Alerts.Alert.active_upcoming()

      Alerts.Repo.Mock
      |> expect(:by_route_id_and_type, fn _, _, _ -> [upcoming_alert] end)

      assert current_alerts(stop, route) == []
    end

    test "omits non-service impacting alerts" do
      route =
        Test.Support.Factories.Routes.Route.build(:route, type: Faker.Util.pick([0, 1, 3, 4]))

      stop = Test.Support.Factories.Stops.Stop.build(:stop)

      alert =
        active_alert(%{
          effect: :nothing,
          informed_entity: %{
            route: route.id,
            route_type: route.type,
            stop: stop.id
          }
        })

      Alerts.Repo.Mock
      |> expect(:by_route_id_and_type, fn _, _, _ -> [alert] end)

      assert current_alerts(stop, route) == []

      {effect, severity} = Dotcom.Alerts.service_impacting_effects() |> Faker.Util.pick()
      impacting_alert = %{alert | effect: effect, severity: severity}

      Alerts.Repo.Mock
      |> expect(:by_route_id_and_type, fn _, _, _ -> [impacting_alert] end)

      assert [^impacting_alert] = current_alerts(stop, route)
    end

    test "returns track change alerts" do
      route = Test.Support.Factories.Routes.Route.build(:route)
      stop = Test.Support.Factories.Stops.Stop.build(:stop)

      alert =
        active_alert(%{
          effect: :nothing,
          informed_entity: %{
            route: route.id,
            route_type: route.type,
            stop: stop.id
          }
        })

      Alerts.Repo.Mock
      |> expect(:by_route_id_and_type, fn _, _, _ -> [alert] end)

      assert current_alerts(stop, route) == []

      track_change_alert = %{alert | effect: :track_change}

      Alerts.Repo.Mock
      |> expect(:by_route_id_and_type, fn _, _, _ -> [track_change_alert] end)

      assert [^track_change_alert] = current_alerts(stop, route)
    end

    test "omits track change alert at other stop" do
      route = Test.Support.Factories.Routes.Route.build(:route)
      stop = Test.Support.Factories.Stops.Stop.build(:stop)
      other_stop = Test.Support.Factories.Stops.Stop.build(:stop)

      alert =
        active_alert(%{
          effect: :track_change,
          informed_entity: %{
            route: route.id,
            route_type: route.type,
            stop: other_stop.id
          }
        })

      Alerts.Repo.Mock
      |> expect(:by_route_id_and_type, fn _, _, _ -> [alert] end)

      assert current_alerts(stop, route) == []
    end

    test "omits CR trip cancellations" do
      route = Test.Support.Factories.Routes.Route.build(:route, type: 2)
      stop = Test.Support.Factories.Stops.Stop.build(:stop)
      trip_id = FactoryHelpers.build(:id)

      {effect, severity} =
        Dotcom.Alerts.service_impacting_effects()
        |> Enum.find(fn {e, _} -> e == :cancellation end)

      alert =
        active_alert(%{
          effect: effect,
          severity: severity,
          informed_entity: %{
            route: route.id,
            route_type: route.type,
            stop: stop.id,
            trip: trip_id
          }
        })

      Alerts.Repo.Mock
      |> expect(:by_route_id_and_type, fn _, _, _ -> [alert] end)

      assert current_alerts(stop, route) == []
    end

    test "omits CR trip delays" do
      route = Test.Support.Factories.Routes.Route.build(:route, type: 2)
      stop = Test.Support.Factories.Stops.Stop.build(:stop)
      trip_id = FactoryHelpers.build(:id)

      {effect, severity} =
        Dotcom.Alerts.service_impacting_effects()
        |> Enum.find(fn {e, _} -> e == :delay end)

      alert =
        active_alert(%{
          effect: effect,
          severity: severity,
          informed_entity: %{
            route: route.id,
            route_type: route.type,
            stop: stop.id,
            trip: trip_id
          }
        })

      Alerts.Repo.Mock
      |> expect(:by_route_id_and_type, fn _, _, _ -> [alert] end)

      assert current_alerts(stop, route) == []
    end
  end

  describe "simplify_platform_name/2" do
    test "leaves the name unchanged for typical non-subway platform names" do
      route_type = Faker.Util.pick([2, 3, 4])
      platform_name = Faker.Pizza.topping()

      assert simplify_platform_name(platform_name, route_type) == platform_name
    end

    test "returns nil for subway routes" do
      route_type = Faker.Util.pick([0, 1])

      assert simplify_platform_name(Faker.Pizza.topping(), route_type) == nil
    end

    test "returns nil for commuter rail platforms called 'Commuter Rail'" do
      assert simplify_platform_name("Commuter Rail", 2) == nil
    end

    test "returns nil for commuter rail platforms with 'All Trains' in the name" do
      assert simplify_platform_name("#{Faker.Pizza.topping()} (All Trains)", 2) == nil
    end

    test "leaves nil platform names as nil" do
      assert simplify_platform_name(nil, 2) == nil
    end
  end

  defp active_alert(attrs) do
    {effect, severity} = Dotcom.Alerts.service_impacting_effects() |> Faker.Util.pick()

    attrs =
      %{effect: effect, severity: severity}
      |> Map.merge(attrs)
      |> Map.put_new(:informed_entity, %{})

    Test.Support.Factories.Alerts.Alert.build(:alert_for_informed_entity, attrs)
    |> Test.Support.Factories.Alerts.Alert.active_now()
  end

  defp departures do
    route_id = FactoryHelpers.build(:id)
    direction_id = Faker.Util.pick([0, 1])
    stop_id = FactoryHelpers.build(:id)
    date = Faker.Util.format("%4d-%2d-%2d")

    schedules = Schedule.build_list(4, :schedule)

    expect(Schedules.Repo.Mock, :by_route_ids, fn _, _ ->
      schedules
    end)

    expect(RoutePatterns.Repo.Mock, :get, length(schedules), fn id ->
      RoutePattern.build(:route_pattern, id: id)
    end)

    {:ok, departures} = daily_departures(route_id, direction_id, stop_id, date)
    departures
  end
end
