defmodule Alerts.HistoricalAlertTest do
  use ExUnit.Case, async: false

  import Alerts.HistoricalAlert
  import Mock
  import Mox
  alias Alerts.{Alert, HistoricalAlert, InformedEntity}

  @basic_alert %Alert{header: "An alert header", effect: :delay, severity: 5}
  @stop_entity %InformedEntity{stop: "1"}
  @route_entity %InformedEntity{route: "627"}

  setup :verify_on_exit!

  describe "from_alert/1" do
    test "can create a historical alert from an existing alert" do
      assert %HistoricalAlert{} = from_alert(@basic_alert)
    end

    test "can include name from related stop" do
      alert_for_stop = Alert.new(informed_entity: [@stop_entity])
      expect(Stops.Repo.Mock, :get, 2, fn id -> %Stops.Stop{name: "Stop #{id}"} end)

      assert %HistoricalAlert{
               stops: ["Stop 1"]
             } = from_alert(alert_for_stop)
    end

    test "can include municipality from related stop" do
      alert_for_stop = Alert.new(informed_entity: [@stop_entity])
      expect(Stops.Repo.Mock, :get, 2, fn _ -> %Stops.Stop{municipality: "Atlantis"} end)
      assert %HistoricalAlert{municipality: "Atlantis"} = from_alert(alert_for_stop)
      expect(Stops.Repo.Mock, :get, 2, fn _ -> %Stops.Stop{municipality: nil} end)
      assert %HistoricalAlert{municipality: nil} = from_alert(alert_for_stop)
    end

    test "can handle missing stop" do
      alert_for_stop = Alert.new(informed_entity: [@stop_entity])
      expect(Stops.Repo.Mock, :get, 2, fn _ -> nil end)
      assert %HistoricalAlert{stops: ["1"]} = from_alert(alert_for_stop)
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
