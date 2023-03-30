defmodule AmbiguousAlertTest do
  @moduledoc false
  use ExUnit.Case, async: true

  import AmbiguousAlert
  alias Alerts.{Alert, HistoricalAlert}

  @start_date ~D[2018-01-31]

  setup do
    entity = %Alerts.InformedEntity{route_type: 0, route: "Pink"}

    alert =
      Alert.new(
        id: "new_alert",
        header: "Wrong Route",
        effect: :delay,
        active_period: [{@start_date, Timex.shift(@start_date, hours: 3)}],
        informed_entity: [entity]
      )

    historical_alert = %HistoricalAlert{
      id: alert.id,
      alert: alert,
      municipality: "Big City",
      routes: ["Pink"],
      stops: ["place-blossom"]
    }

    {:ok, %{alert: alert, historical_alert: historical_alert}}
  end

  describe "alert_start_date/1" do
    test "for Alerts.Alert", %{alert: alert} do
      assert alert_start_date(alert) == @start_date
    end

    test "for Alerts.HistoricalAlert", %{historical_alert: historical_alert} do
      assert alert_start_date(historical_alert) == @start_date
    end
  end

  describe "alert_municipality/1" do
    test "for Alerts.Alert", %{alert: alert} do
      assert alert_municipality(alert) == Alert.municipality(alert)
    end

    test "for Alerts.HistoricalAlert", %{historical_alert: historical_alert} do
      assert alert_municipality(historical_alert) == "Big City"
    end
  end

  describe "affected_routes/1" do
    test "for Alerts.Alert", %{alert: alert} do
      assert affected_routes(alert) == ["Pink"]
    end

    test "for Alerts.HistoricalAlert", %{historical_alert: historical_alert} do
      assert affected_routes(historical_alert) == ["Pink"]
    end
  end

  describe "related_stops/1" do
    test "for Alerts.Alert", %{alert: alert} do
      assert related_stops(alert) == []
    end

    test "for Alerts.HistoricalAlert", %{historical_alert: historical_alert} do
      assert related_stops(historical_alert) == ["place-blossom"]
    end
  end
end
