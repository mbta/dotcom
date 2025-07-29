defmodule DotcomWeb.AmbiguousAlertTest do
  @moduledoc false
  use ExUnit.Case, async: true

  import DotcomWeb.AmbiguousAlert
  alias Alerts.{Alert, HistoricalAlert}

  @start_datetime ~U[2023-04-05 01:09:08Z]

  setup do
    entity = %Alerts.InformedEntity{route_type: 0, route: "Pink"}

    alert =
      Alert.new(
        id: "new_alert",
        header: "Wrong Route",
        effect: :delay,
        active_period: [{@start_datetime, Timex.shift(@start_datetime, hours: 3)}],
        informed_entity: [entity],
        updated_at: @start_datetime
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
      assert alert_start_date(alert) == @start_datetime
    end

    test "for Alerts.HistoricalAlert", %{historical_alert: historical_alert} do
      assert alert_start_date(historical_alert) == @start_datetime
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
    @tag :external
    test "for Alerts.Alert", %{alert: alert} do
      assert affected_routes(alert) == ["Pink"]
    end

    @tag :external
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

  describe "time_range/1" do
    test "for Alerts.Alert", %{alert: alert} do
      time_range_div = time_range(alert) |> Phoenix.HTML.Safe.to_iodata() |> IO.iodata_to_binary()
      assert time_range_div =~ ~s(<div class=\"u-small-caps)
      assert time_range_div =~ ~s(<time datetime=\"2023-04-05T01:09:08Z\">Apr 5 2023 01:09</time>)
    end

    test "for Alerts.HistoricalAlert", %{historical_alert: historical_alert} do
      time_range_div =
        time_range(historical_alert) |> Phoenix.HTML.Safe.to_iodata() |> IO.iodata_to_binary()

      assert time_range_div =~ ~s(<div class=\"u-small-caps)
      assert time_range_div =~ ~s(<time datetime=\"2023-04-05T01:09:08Z\">Apr 5 2023 01:09</time>)
    end
  end

  describe "alert_item/2" do
    test "for Alerts.Alert", %{alert: alert} do
      conn = %Plug.Conn{assigns: %{date_time: @start_datetime}}

      alert_item_html =
        alert_item(alert, conn) |> Phoenix.HTML.Safe.to_iodata() |> IO.iodata_to_binary()

      assert alert_item_html =~ ~s(class=\"c-alert-item)
      assert alert_item_html =~ ~s(<div class=\"c-alert-item__icon\">)
    end

    test "for Alerts.HistoricalAlert", %{historical_alert: historical_alert} do
      conn = %Plug.Conn{assigns: %{date_time: @start_datetime}}

      alert_item_html =
        alert_item(historical_alert, conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert alert_item_html =~ ~s(class=\"c-alert-item)
      assert alert_item_html =~ ~s(<div class=\"c-alert-item__icon\">)
    end
  end
end
