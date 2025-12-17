defmodule Dotcom.ScheduleFinderTest do
  use ExUnit.Case, async: true

  import Dotcom.ScheduleFinder
  import Mox
  import Test.Support.Factories.MBTA.Api

  alias Dotcom.ScheduleFinder.{DailyDeparture, FutureArrival}
  alias Test.Support.FactoryHelpers

  setup do
    Mox.stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    :ok
  end

  setup :verify_on_exit!

  describe "daily_departures/4" do
    test "requests schedules" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", opts ->
        assert Keyword.get(opts, :include) == "trip"
        assert Keyword.get(opts, :"filter[route]") == route_id
        assert Keyword.get(opts, :"filter[direction_id]") == direction_id
        assert Keyword.get(opts, :"filter[stop]") == stop_id
        assert Keyword.get(opts, :"filter[date]") == date
        %JsonApi{data: []}
      end)

      assert {:ok, []} = daily_departures(route_id, direction_id, stop_id, date)
    end

    test "returns departures" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", _ ->
        %JsonApi{data: build_list(4, :schedule_item, departure_attributes())}
      end)

      assert {:ok, departures} = daily_departures(route_id, direction_id, stop_id, date)
      assert %DailyDeparture{} = List.first(departures)
    end

    test "omits schedules that don't pick up passengers" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")

      attributes_without_pickup =
        departure_attributes() |> Map.merge(%{attributes: %{"pickup_type" => 1}})

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", _ ->
        %JsonApi{data: build_list(4, :schedule_item, attributes_without_pickup)}
      end)

      assert {:ok, []} = daily_departures(route_id, direction_id, stop_id, date)
    end
  end

  describe "next_arrivals/3" do
    test "requests schedules" do
      trip_id = FactoryHelpers.build(:id)
      stop_sequence = Faker.Util.pick([0, 1])
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", opts ->
        assert Keyword.get(opts, :include) == "stop"
        assert Keyword.get(opts, :"filter[trip]") == trip_id
        assert Keyword.get(opts, :"filter[date]") == date
        %JsonApi{data: []}
      end)

      assert {:ok, []} = next_arrivals(trip_id, stop_sequence, date)
    end

    test "omits schedules before the given stop_sequence" do
      trip_id = FactoryHelpers.build(:id)
      stop_sequence = "20"
      date = Faker.Util.format("%4d-%2d-%2d")

      arrivals_before_stop =
        arrival_attributes() |> Map.merge(%{attributes: %{"stop_sequence" => 10}})

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", opts ->
        assert Keyword.get(opts, :include) == "stop"
        assert Keyword.get(opts, :"filter[trip]") == trip_id
        assert Keyword.get(opts, :"filter[date]") == date
        %JsonApi{data: build_list(4, :schedule_item, arrivals_before_stop)}
      end)

      assert {:ok, []} = next_arrivals(trip_id, stop_sequence, date)
    end

    test "returns arrivals" do
      trip_id = FactoryHelpers.build(:id)

      [stop_sequence_for_stop, stop_sequence_for_arrivals] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(1, 100) end) |> Enum.sort()

      date = Faker.Util.format("%4d-%2d-%2d")

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", opts ->
        assert Keyword.get(opts, :include) == "stop"
        assert Keyword.get(opts, :"filter[trip]") == trip_id
        assert Keyword.get(opts, :"filter[date]") == date

        %JsonApi{
          data:
            build_list(
              4,
              :schedule_item,
              arrival_attributes() |> Map.put(:stop_sequence, stop_sequence_for_arrivals)
            )
        }
      end)

      assert {:ok, arrivals} = next_arrivals(trip_id, stop_sequence_for_stop |> to_string(), date)
      assert %FutureArrival{} = List.first(arrivals)
    end
  end

  describe "subway_groups/3" do
    test "returns route, destination, departure times" do
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      departures = departures()

      expect(Routes.Repo.Mock, :get, length(departures), fn id ->
        Test.Support.Factories.Routes.Route.build(:route, %{id: id})
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

      expect(Routes.Repo.Mock, :get, length(departures), fn _ ->
        Test.Support.Factories.Routes.Route.build(:route, %{id: "Red"})
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

    expect(MBTA.Api.Mock, :get_json, fn "/schedules/", _ ->
      %JsonApi{data: build_list(4, :schedule_item, departure_attributes())}
    end)

    {:ok, departures} = daily_departures(route_id, direction_id, stop_id, date)
    departures
  end

  defp departure_attributes do
    %{
      relationships: %{
        "route" => [build(:item)],
        "trip" => [build(:trip_item)]
      }
    }
  end

  defp arrival_attributes do
    %{
      relationships: %{
        "stop" => [build(:stop_item)]
      }
    }
  end
end
