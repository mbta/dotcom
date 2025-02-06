defmodule DotcomWeb.Plugs.AlertsByTimeframeTest do
  use DotcomWeb.ConnCase, async: true

  alias Alerts.Alert
  alias DotcomWeb.Plugs.AlertsByTimeframe

  @now Dotcom.Utils.DateTime.now()

  @timeframe_alerts [
    %Alert{
      id: "ongoing",
      active_period: [{Timex.shift(@now, days: -1), nil}]
    },
    %Alert{
      id: "upcoming",
      active_period: [{Timex.shift(@now, days: 1), nil}]
    },
    %Alert{
      id: "current",
      active_period: [{Timex.shift(@now, hours: -1), Timex.shift(@now, hours: 1)}]
    }
  ]

  setup %{conn: conn} do
    conn =
      conn
      |> assign(:alerts, @timeframe_alerts)
      |> assign(:date_time, @now)

    {:ok, conn: conn}
  end

  describe "filter_by_timeframe/3" do
    test "filters for current alerts", %{conn: conn} do
      conn =
        conn
        |> Map.put(:params, %{"alerts_timeframe" => "current"})
        |> AlertsByTimeframe.call([])

      assert Enum.map(conn.assigns.alerts, & &1.id) == ["ongoing", "current"]
    end

    test "filters for upcoming alerts", %{conn: conn} do
      conn =
        conn
        |> Map.put(:params, %{"alerts_timeframe" => "upcoming"})
        |> AlertsByTimeframe.call([])

      assert Enum.map(conn.assigns.alerts, & &1.id) == ["upcoming"]
    end

    test "returns all alerts if timeframe isn't available", %{conn: conn} do
      conn = AlertsByTimeframe.call(conn, [])
      assert Enum.map(conn.assigns.alerts, & &1.id) == ["ongoing", "upcoming", "current"]
    end
  end
end
