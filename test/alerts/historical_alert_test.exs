defmodule Alerts.HistoricalAlertTest do
  use ExUnit.Case, async: false

  import Alerts.HistoricalAlert
  import Mock
  alias Alerts.{Alert, HistoricalAlert, InformedEntity}

  @basic_alert %Alert{header: "An alert header", effect: :delay, severity: 5}
  @stop_entity %InformedEntity{stop: "1"}
  @route_entity %InformedEntity{route: "627"}

  describe "from_alert/1" do
    test "can create a historical alert from an existing alert" do
      assert %HistoricalAlert{} = from_alert(@basic_alert)
    end

    test "can include name from related stop" do
      alert_for_stop = Alert.new(informed_entity: [@stop_entity])

      with_mock(Stops.Repo, [:passthrough], get: fn id -> %Stops.Stop{name: "Stop #{id}"} end) do
        assert %HistoricalAlert{
                 stops: ["Stop 1"]
               } = from_alert(alert_for_stop)
      end
    end

    test "can include municipality from related stop" do
      alert_for_stop = Alert.new(informed_entity: [@stop_entity])

      with_mock(Stops.Repo, [:passthrough], get: fn _ -> %Stops.Stop{municipality: "Atlantis"} end) do
        assert %HistoricalAlert{municipality: "Atlantis"} = from_alert(alert_for_stop)
      end

      with_mock(Stops.Repo, [:passthrough], get: fn _ -> %Stops.Stop{municipality: nil} end) do
        assert %HistoricalAlert{municipality: nil} = from_alert(alert_for_stop)
      end
    end

    test "can handle missing stop" do
      alert_for_stop = Alert.new(informed_entity: [@stop_entity])

      with_mock(Stops.Repo, [:passthrough], get: fn _ -> nil end) do
        assert %HistoricalAlert{stops: ["1"]} = from_alert(alert_for_stop)
      end
    end

    test "can include name from related routes" do
      alert_for_route = Alert.new(informed_entity: [@route_entity])

      with_mock(Routes.Repo, [:passthrough], get: fn id -> %Routes.Route{name: "Route #{id}"} end) do
        assert %HistoricalAlert{routes: ["Route 627"]} = from_alert(alert_for_route)
      end
    end

    test "can handle missing route" do
      alert_for_route = Alert.new(informed_entity: [@route_entity])

      with_mock(Routes.Repo, [:passthrough], get: fn _ -> nil end) do
        assert %HistoricalAlert{routes: ["627"]} = from_alert(alert_for_route)
      end
    end
  end
end
