defmodule Dotcom.AlertsTest do
  use ExUnit.Case

  import Dotcom.Alerts
  import Mox

  import Test.Support.Generators.DateTime,
    only: [random_date_time: 0, random_time_range_date_time: 1]

  alias Test.Support.Factories

  setup :verify_on_exit!

  setup do
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
end
