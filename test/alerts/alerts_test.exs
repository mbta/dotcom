defmodule AlertsTest do
  use ExUnit.Case, async: false
  use Timex

  import Alerts.Alert
  import Mock
  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE

  @now Util.to_local_time(~N[2018-01-15T12:00:00])

  describe "new/1" do
    test "with no params, returns a default struct" do
      assert new() == %Alert{}
    end

    test "with params, sets values (include informed_entity)" do
      entities = [%Alerts.InformedEntity{}]

      assert new(effect: :detour, informed_entity: entities) == %Alert{
               effect: :detour,
               informed_entity: Alerts.InformedEntitySet.new(entities)
             }
    end
  end

  describe "update/2" do
    test "updates an existing alert, keeping the old values" do
      alert = new(effect: :detour)
      entities = [%Alerts.InformedEntity{}]
      expected = new(effect: :detour, informed_entity: entities)
      actual = update(alert, informed_entity: entities)
      assert expected == actual
    end
  end

  describe "get_entity/2" do
    test "can retrieve all InformedEntity types" do
      for type <- [:route, :route_type, :stop, :trip, :direction_id] do
        entity = Alerts.InformedEntity.from_keywords([{type, "entity"}])
        alert = Alert.new(informed_entity: [entity])
        assert Alert.get_entity(alert, type) == MapSet.new(["entity"])
      end
    end
  end

  describe "all_types/0" do
    test "contains no duplicates" do
      assert Enum.uniq(all_types()) == all_types()
    end
  end

  describe "human_effect/1" do
    test "returns a string representing the effect of the alert" do
      assert human_effect(%Alert{}) == "Unknown"
      assert human_effect(%Alert{effect: :snow_route}) == "Snow Route"
    end
  end

  describe "human_lifecycle/1" do
    test "returns a string representing the lifecycle of the alert" do
      assert human_lifecycle(%Alert{}) == "Unknown"
      assert human_lifecycle(%Alert{lifecycle: :new}) == "New"
      assert human_lifecycle(%Alert{lifecycle: :ongoing_upcoming}) == "Upcoming"
    end
  end

  describe "icon/1" do
    test "return :none, :cancel, :snow, :shuttle or :alert" do
      assert icon(%Alert{effect: :detour, priority: :low}) == :none
      assert icon(%Alert{effect: :suspension, priority: :high}) == :cancel
      assert icon(%Alert{effect: :cancellation, priority: :high}) == :cancel
      assert icon(%Alert{effect: :snow_route, priority: :high}) == :snow
      assert icon(%Alert{effect: :shuttle, priority: :high}) == :shuttle
      assert icon(%Alert{effect: :delay, priority: :high}) == :alert
    end
  end

  describe "is_high_severity_or_high_priority/1" do
    test "returns true for severity >= 7" do
      assert is_high_severity_or_high_priority(%Alert{severity: 8})
      assert is_high_severity_or_high_priority(%Alert{severity: 8, priority: :low})
    end

    test "returns true for priority == :high" do
      assert is_high_severity_or_high_priority(%Alert{priority: :high})
      assert is_high_severity_or_high_priority(%Alert{severity: 2, priority: :high})
    end

    test "returns true for high severity and high priority" do
      assert is_high_severity_or_high_priority(%Alert{severity: 7, priority: :high})
    end

    test "returns false otherwise" do
      refute is_high_severity_or_high_priority(%Alert{severity: 3, priority: :low})
    end
  end

  describe "is_diversion/1" do
    test "returns true for certain effects" do
      assert is_diversion(%Alert{effect: :shuttle})
      assert is_diversion(%Alert{effect: :stop_closure})
      assert is_diversion(%Alert{effect: :station_closure})
      assert is_diversion(%Alert{effect: :detour})
    end

    test "returns false for other effects" do
      refute is_diversion(%Alert{effect: :access_issue})
      refute is_diversion(%Alert{effect: :amber_alert})
      refute is_diversion(%Alert{effect: :delay})
      refute is_diversion(%Alert{effect: :dock_closure})
      refute is_diversion(%Alert{effect: :dock_issue})
      refute is_diversion(%Alert{effect: :extra_service})
      refute is_diversion(%Alert{effect: :elevator_closure})
      refute is_diversion(%Alert{effect: :escalator_closure})
      refute is_diversion(%Alert{effect: :policy_change})
      refute is_diversion(%Alert{effect: :schedule_change})
      refute is_diversion(%Alert{effect: :station_issue})
      refute is_diversion(%Alert{effect: :stop_moved})
      refute is_diversion(%Alert{effect: :summary})
      refute is_diversion(%Alert{effect: :suspension})
      refute is_diversion(%Alert{effect: :track_change})
      refute is_diversion(%Alert{effect: :unknown})
      refute is_diversion(%Alert{effect: :cancellation})
      refute is_diversion(%Alert{effect: :no_service})
      refute is_diversion(%Alert{effect: :service_change})
      refute is_diversion(%Alert{effect: :snow_route})
      refute is_diversion(%Alert{effect: :stop_shoveling})
    end
  end

  describe "municipality/1" do
    test "gets municipality from an alert's stops" do
      alert_with_muni = Alert.new(informed_entity: [%IE{stop: "some-stop"}])
      alert_no_muni = Alert.new(informed_entity: [%IE{stop: "other-stop"}])

      with_mock(Stops.Repo, [:passthrough],
        get: fn
          "some-stop" -> %Stops.Stop{municipality: "Metropolis"}
          _ -> nil
        end
      ) do
        assert "Metropolis" = municipality(alert_with_muni)
        refute municipality(alert_no_muni)
      end
    end
  end
end
