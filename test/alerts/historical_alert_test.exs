defmodule Alerts.HistoricalAlertTest do
  use ExUnit.Case, async: true

  import Alerts.HistoricalAlert
  import Mox
  import Test.Support.Factories.Routes.Route

  alias Alerts.Alert
  alias Alerts.HistoricalAlert
  alias Alerts.InformedEntity

  @basic_alert %Alert{header: "An alert header", effect: :delay, severity: 5}
  @municipality Faker.Address.city()
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
      expect(Stops.Repo.Mock, :get, 2, fn _ -> %Stops.Stop{municipality: @municipality} end)
      assert %HistoricalAlert{municipality: muni} = from_alert(alert_for_stop)
      assert muni == @municipality
      expect(Stops.Repo.Mock, :get, 2, fn _ -> %Stops.Stop{municipality: nil} end)
      assert %HistoricalAlert{municipality: nil} = from_alert(alert_for_stop)
    end

    test "can handle missing stop" do
      alert_for_stop = Alert.new(informed_entity: [@stop_entity])
      expect(Stops.Repo.Mock, :get, 2, fn _ -> nil end)
      assert %HistoricalAlert{stops: ["1"]} = from_alert(alert_for_stop)
    end

    test "can include name from related routes" do
      expect(Routes.Repo.Mock, :get, fn id -> build(:route, %{id: id}) end)

      alert_for_route = Alert.new(informed_entity: [@route_entity])

      assert %HistoricalAlert{routes: [route_id]} = from_alert(alert_for_route)
      assert is_binary(route_id)
    end

    test "can handle missing route" do
      expect(Routes.Repo.Mock, :get, fn _ ->
        {:error, %JsonApi.Error{}}
      end)

      alert_for_route = Alert.new(informed_entity: [@route_entity])

      assert %HistoricalAlert{routes: ["627"]} = from_alert(alert_for_route)
    end
  end
end
