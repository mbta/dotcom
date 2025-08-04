defmodule Dotcom.AlertsTest do
  use ExUnit.Case

  import Dotcom.Alerts
  import Mox

  import Test.Support.Generators.DateTime,
    only: [random_date_time: 0, random_time_range_date_time: 1]

  alias Test.Support.Factories

  @service_impacting_effects service_impacting_effects() |> Enum.map(fn {effect, _} -> effect end)
  @non_service_effects Alerts.Alert.all_types() -- @service_impacting_effects

  setup :verify_on_exit!

  setup do
    stub(Dotcom.Utils.DateTime.Mock, :coerce_ambiguous_date_time, fn date_time ->
      Dotcom.Utils.DateTime.coerce_ambiguous_date_time(date_time)
    end)

    stub(Dotcom.Utils.DateTime.Mock, :now, fn ->
      Dotcom.Utils.DateTime.now()
    end)

    :ok
  end

  describe "affected_stations/1" do
    test "returns a list of stations that are affected by the alert" do
      # Setup
      station = Factories.Stops.Stop.build(:stop, station?: true)
      not_a_station = Factories.Stops.Stop.build(:stop, station?: false)

      expect(Stops.Repo.Mock, :get, fn _ -> station end)
      expect(Stops.Repo.Mock, :get, fn _ -> not_a_station end)

      stops = MapSet.new([station.id, not_a_station.id])

      informed_entity =
        Factories.Alerts.InformedEntitySet.build(:informed_entity_set, stop: stops)

      alert = Factories.Alerts.Alert.build(:alert, informed_entity: informed_entity)

      # Exercise
      result = affected_stations(alert)

      # Verify
      assert [station] == result
    end
  end

  describe "service_impacting_alert?/1" do
    test "returns true if the alert has an effect that is considered service-impacting" do
      # Setup
      {effect, severity} = service_impacting_effects() |> Faker.Util.pick()
      alert = Factories.Alerts.Alert.build(:alert, effect: effect, severity: severity)

      # Exercise/Verify
      assert service_impacting_alert?(alert)
    end

    test "returns false if the alert does not have an effect that is considered service-impacting" do
      # Setup
      alert = Factories.Alerts.Alert.build(:alert, effect: :not_service_impacting)

      # Exercise/Verify
      refute service_impacting_alert?(alert)
    end
  end

  describe "service_impacting_effects/0" do
    test "returns a list of the alert effects as keywords" do
      # Exercise/Verify
      assert Keyword.keyword?(service_impacting_effects())
    end
  end

  describe "sort_by_start_time_sorter/2" do
    test "sorts the alerts by the start time of the first active period" do
      # Setup
      earlier = random_date_time()
      later = random_time_range_date_time({earlier, nil})

      earlier_alert = Factories.Alerts.Alert.build(:alert, active_period: [{earlier, nil}])
      later_alert = Factories.Alerts.Alert.build(:alert, active_period: [{later, nil}])

      alerts = [later_alert, earlier_alert]

      # Exercise
      sorted_alerts = Enum.sort(alerts, &sort_by_start_time_sorter/2)

      # Verify
      assert [earlier_alert, later_alert] == sorted_alerts
    end
  end

  describe "sort_by_station_sorter/2" do
    test "sorts by any stations" do
      # Setup
      a_station = Factories.Stops.Stop.build(:stop, station?: true, name: "A")
      b_station = Factories.Stops.Stop.build(:stop, station?: true, name: "B")

      stub(Stops.Repo.Mock, :get, fn id ->
        case id do
          "A" -> a_station
          "B" -> b_station
        end
      end)

      a_stop = MapSet.new(["A"])
      b_stop = MapSet.new(["B"])
      a_b_stops = MapSet.new(["A", "B"])

      a_informed_entity =
        Factories.Alerts.InformedEntitySet.build(:informed_entity_set, stop: a_stop)

      b_informed_entity =
        Factories.Alerts.InformedEntitySet.build(:informed_entity_set, stop: b_stop)

      c_informed_entity =
        Factories.Alerts.InformedEntitySet.build(:informed_entity_set, stop: a_b_stops)

      a_alert = Factories.Alerts.Alert.build(:alert, informed_entity: a_informed_entity)
      b_alert = Factories.Alerts.Alert.build(:alert, informed_entity: b_informed_entity)
      c_alert = Factories.Alerts.Alert.build(:alert, informed_entity: c_informed_entity)

      alerts = [c_alert, b_alert, a_alert]

      # Exercise
      sorted_alerts = Enum.sort(alerts, &sort_by_station_sorter/2)

      # Verify
      assert [a_alert, b_alert, c_alert] == sorted_alerts
    end
  end

  describe "subway_alert_groups/0" do
    setup do
      stub(Alerts.Repo.Mock, :all, fn _ -> [] end)
      stub(Alerts.Repo.Mock, :banner, fn -> nil end)
      stub(Routes.Repo.Mock, :by_type, fn _ -> [] end)

      :ok
    end

    test "groups alerts under their routes" do
      [route_1, route_2] = Factories.Routes.Route.build_list(2, :route)

      alerts_1 =
        Factories.Alerts.Alert.build_list(5, :alert_for_informed_entity,
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity: %{route: route_1.id, route_type: route_1.type}
        )

      alerts_2 =
        Factories.Alerts.Alert.build_list(5, :alert_for_informed_entity,
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity: %{route: route_2.id, route_type: route_2.type}
        )

      expect(Alerts.Repo.Mock, :all, fn _ -> (alerts_1 ++ alerts_2) |> Enum.shuffle() end)
      expect(Routes.Repo.Mock, :by_type, fn [0, 1] -> [route_1, route_2] end)

      groups = subway_alert_groups()

      {^route_1, alert_group_1} = groups |> Enum.find(fn {route, _} -> route == route_1 end)
      assert MapSet.new(alert_group_1) == MapSet.new(alerts_1)

      {^route_2, alert_group_2} = groups |> Enum.find(fn {route, _} -> route == route_2 end)
      assert MapSet.new(alert_group_2) == MapSet.new(alerts_2)
    end

    test "does not include alerts of non-subway types" do
      [subway_route, non_subway_route] = Factories.Routes.Route.build_list(2, :route)

      alerts_1 =
        Factories.Alerts.Alert.build_list(5, :alert_for_informed_entity,
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity: %{route: subway_route.id, route_type: subway_route.type}
        )

      alerts_2 =
        Factories.Alerts.Alert.build_list(5, :alert_for_informed_entity,
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity: %{route: non_subway_route.id, route_type: non_subway_route.type}
        )

      expect(Alerts.Repo.Mock, :all, fn _ -> (alerts_1 ++ alerts_2) |> Enum.shuffle() end)
      expect(Routes.Repo.Mock, :by_type, fn [0, 1] -> [subway_route] end)

      refute subway_alert_groups() |> Enum.any?(fn {route, _} -> route == non_subway_route end)
    end

    test "does not include empty alert groups" do
      [route_with_alerts, route_without_alerts] = Factories.Routes.Route.build_list(2, :route)

      alerts =
        Factories.Alerts.Alert.build_list(5, :alert_for_informed_entity,
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity: %{route: route_with_alerts.id, route_type: route_with_alerts.type}
        )

      expect(Alerts.Repo.Mock, :all, fn _ -> alerts end)

      expect(Routes.Repo.Mock, :by_type, fn [0, 1] ->
        [route_with_alerts, route_without_alerts]
      end)

      refute subway_alert_groups()
             |> Enum.any?(fn {route, _} -> route == route_without_alerts end)
    end

    test "does not include an alert if that alert is also the banner alert" do
      route = Factories.Routes.Route.build(:route)

      [banner_alert | non_banner_alerts] =
        alerts =
        Factories.Alerts.Alert.build_list(5, :alert_for_informed_entity,
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity: %{route: route.id, route_type: route.type}
        )

      expect(Alerts.Repo.Mock, :all, fn _ -> alerts end)

      expect(Alerts.Repo.Mock, :banner, fn ->
        Factories.Alerts.Banner.build(:banner, id: banner_alert.id)
      end)

      expect(Routes.Repo.Mock, :by_type, fn [0, 1] ->
        [route]
      end)

      {^route, alert_group} =
        subway_alert_groups() |> Enum.find(fn {r, _} -> r == route end)

      assert MapSet.new(alert_group) == MapSet.new(non_banner_alerts)
    end

    test "does not include service-impacting alerts" do
      route = Factories.Routes.Route.build(:route)

      non_service_alerts =
        Factories.Alerts.Alert.build_list(5, :alert_for_informed_entity,
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity: %{route: route.id, route_type: route.type}
        )

      service_alerts =
        Factories.Alerts.Alert.build_list(5, :alert_for_informed_entity,
          effect: Faker.Util.pick(@service_impacting_effects),
          severity: 3,
          informed_entity: %{route: route.id, route_type: route.type}
        )

      expect(Alerts.Repo.Mock, :all, fn _ ->
        (service_alerts ++ non_service_alerts) |> Enum.shuffle()
      end)

      expect(Routes.Repo.Mock, :by_type, fn [0, 1] -> [route] end)

      {^route, alert_group} =
        subway_alert_groups() |> Enum.find(fn {r, _} -> r == route end)

      assert MapSet.new(alert_group) == MapSet.new(non_service_alerts)
    end
  end
end
