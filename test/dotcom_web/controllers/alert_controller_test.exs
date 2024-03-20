defmodule DotcomWeb.AlertControllerTest do
  use DotcomWeb.ConnCase
  @moduletag :external

  use Phoenix.Controller
  alias Alerts.Alert
  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Stops.Repo
  import DotcomWeb.AlertController, only: [excluding_banner: 2, group_access_alerts: 1]

  test "renders commuter rail", %{conn: conn} do
    conn = get(conn, alert_path(conn, :show, "commuter-rail"))
    assert html_response(conn, 200) =~ "Commuter Rail"
  end

  describe "index/2" do
    test "index page is redirected to subway", %{conn: conn} do
      conn = get(conn, "/alerts")
      assert redirected_to(conn, 302) == "/alerts/subway"
    end
  end

  describe "show/2" do
    test "alerts are assigned for all modes", %{conn: conn} do
      for mode <- [:bus, "commuter-rail", :subway, :ferry] do
        conn = get(conn, alert_path(conn, :show, mode))
        assert conn.assigns.alerts
      end
    end

    test "alerts are assigned for the access tab", %{conn: conn} do
      conn = get(conn, alert_path(conn, :show, :access))
      assert conn.assigns.alerts
    end

    test "invalid mode does not assign alerts", %{conn: conn} do
      conn = get(conn, alert_path(conn, :show, :bicycle))
      refute conn.assigns[:alerts]
    end

    test "sets a custom meta description", %{conn: conn} do
      conn = get(conn, alert_path(conn, :show, :bus))
      assert conn.assigns.meta_description
    end

    test "parses timeframe param", %{conn: conn} do
      all_alerts = get(conn, alert_path(conn, :show, :bus))
      assert all_alerts.assigns.alerts_timeframe == nil

      current = get(conn, alert_path(conn, :show, :bus, alerts_timeframe: "current"))
      assert current.assigns.alerts_timeframe == :current

      upcoming = get(conn, alert_path(conn, :show, :bus, alerts_timeframe: "upcoming"))
      assert upcoming.assigns.alerts_timeframe == :upcoming

      bad_param = get(conn, alert_path(conn, :show, :bus, alerts_timeframe: "foobar"))
      assert bad_param.assigns.alerts_timeframe == nil
    end
  end

  describe "mode icons" do
    setup %{conn: conn} do
      {:ok,
       conn: conn,
       alerts: Enum.map([:bus, :subway, :commuter_rail, :ferry, :access], &create_alert/1)}
    end

    test "are shown on subway alerts", %{conn: conn, alerts: alerts} do
      response = render_alerts_page(conn, :subway, alerts)

      expected =
        %SvgIconWithCircle{icon: :red_line, aria_hidden?: true}
        |> SvgIconWithCircle.svg_icon_with_circle()
        |> Phoenix.HTML.safe_to_string()

      assert response =~ expected
    end

    test "are not shown on non-subway alerts", %{conn: conn, alerts: alerts} do
      for mode <- [:bus, :commuter_rail, :access] do
        response = render_alerts_page(conn, mode, alerts)
        assert response =~ "m-alerts-header"
        refute response =~ mode_icon_tag(mode)
      end
    end

    defp render_alerts_page(conn, mode, alerts) do
      conn
      |> assign(:alerts_timeframe, nil)
      |> assign(:date_time, ~N[2000-01-01 23:00:07])
      |> put_view(DotcomWeb.AlertView)
      |> render(
        "show.html",
        id: mode,
        alert_groups: alerts,
        breadcrumbs: ["Alerts"],
        date: Util.now()
      )
      |> html_response(200)
    end

    defp mode_icon_tag(mode) do
      %SvgIconWithCircle{icon: mode}
      |> SvgIconWithCircle.svg_icon_with_circle()
      |> Phoenix.HTML.safe_to_string()
      |> Kernel.<>(mode |> get_route |> Map.get(:name))
    end

    defp create_alert(mode) do
      mode
      |> get_route
      |> do_create_alert(mode)
    end

    defp get_route(:ferry),
      do: %Routes.Route{id: "Boat-F4", description: :ferry, name: "Charlestown Ferry", type: 4}

    defp get_route(:bus),
      do: %Routes.Route{id: "59", description: :local_bus, name: "59", type: 3}

    defp get_route(mode) when mode in [:subway, :access, :red_line],
      do: %Routes.Route{id: "Red", description: :rapid_transit, name: "Red Line", type: 1}

    defp get_route(:commuter_rail),
      do: %Routes.Route{
        id: "CR-Fitchburg",
        description: :commuter_rail,
        name: "Fitchburg Line",
        type: 2
      }

    defp do_create_alert(route, mode) do
      {route,
       [
         Alert.new(
           active_period: [{Util.now() |> Timex.shift(days: -2), nil}],
           informed_entity: [informed_entity(mode)],
           updated_at: Util.now() |> Timex.shift(days: -2),
           effect: effect(mode)
         )
       ]}
    end

    defp informed_entity(mode) when mode in [:subway, :access] do
      %Alerts.InformedEntity{route: "Red", route_type: 1, direction_id: 1}
    end

    defp informed_entity(:commuter_rail) do
      %Alerts.InformedEntity{route: "CR-Fitchburg", route_type: 2, direction_id: 1}
    end

    defp informed_entity(:bus) do
      %Alerts.InformedEntity{
        route: "59",
        route_type: 3,
        direction_id: nil,
        stop: "81448",
        trip: nil
      }
    end

    defp informed_entity(:ferry) do
      %Alerts.InformedEntity{
        route: "Boat-F4",
        route_type: 4,
        direction_id: 1,
        stop: "Boat-Charlestown"
      }
    end

    defp effect(:commuter_rail), do: :track_change
    defp effect(:access), do: :access_issue
    defp effect(_mode), do: :delay
  end

  describe "group_access_alerts/1" do
    test "given a list of alerts, groups the access alerts by stop" do
      alerts = [
        Alert.new(
          id: "alewife-escalator-alert",
          effect: :escalator_closure,
          header: "Escalator Alert 1",
          informed_entity: [%Alerts.InformedEntity{stop: "place-alfcl"}]
        ),
        Alert.new(
          id: "south-station-alert",
          effect: :escalator_closure,
          header: "Escalator Alert 2",
          informed_entity: [%Alerts.InformedEntity{stop: "place-sstat"}]
        ),
        Alert.new(
          id: "alewife-access-alert",
          effect: :access_issue,
          header: "Access Alert",
          informed_entity: [%Alerts.InformedEntity{stop: "place-alfcl"}]
        )
      ]

      grouped = alerts |> group_access_alerts() |> Map.new()
      alewife = Repo.get("place-alfcl")
      south_station = Repo.get("place-sstat")

      assert [access, escalator] = grouped |> Map.get(alewife) |> MapSet.to_list()
      assert escalator.id == "alewife-escalator-alert"
      assert access.id == "alewife-access-alert"
      assert [south_station_alert] = grouped |> Map.get(south_station) |> MapSet.to_list()
      assert south_station_alert.id == "south-station-alert"
    end

    test "deduplicates child stops" do
      alerts = [
        Alert.new(
          id: "escalator-alert",
          effect: :escalator_closure,
          header: "Escalator Alert 1",
          informed_entity: [%Alerts.InformedEntity{stop: "place-alfcl"}]
        ),
        Alert.new(
          id: "access-alert",
          effect: :access_issue,
          header: "Access Alert",
          informed_entity: [%Alerts.InformedEntity{stop: "70061"}]
        )
      ]

      assert Repo.get_parent("70061").id == "place-alfcl"

      grouped = group_access_alerts(alerts)
      assert Enum.map(grouped, fn {stop, _} -> stop.id end) == ["place-alfcl"]
      alewife = Repo.get("place-alfcl")
      assert [%Alert{}, %Alert{}] = grouped |> Map.new() |> Map.get(alewife) |> MapSet.to_list()
    end

    test "ignores bad stop ids" do
      alert = [
        Alert.new(
          id: "bad-stop-id",
          effect: :escalator_closure,
          header: "Escalator alert",
          informed_entity: [%Alerts.InformedEntity{stop: "does-not-exist"}]
        )
      ]

      assert group_access_alerts(alert) == []
    end
  end

  describe "mTicket detection" do
    test "mTicket matched", %{conn: conn} do
      response =
        conn
        |> put_req_header("user-agent", "Java/1.8.0_91")
        |> get(alert_path(conn, :show, "commuter-rail"))
        |> html_response(200)

      assert response =~ "mticket-notice"
      assert response =~ "access alerts:"
      assert response =~ "/alerts/commuter-rail"
    end

    test "mTicket not matched", %{conn: conn} do
      response =
        conn
        |> get(alert_path(conn, :show, "commuter-rail"))
        |> html_response(200)

      refute response =~ "mticket-notice"
    end
  end

  describe "excluding_banner/2" do
    setup do
      alerts = [
        %{id: "1"},
        %{id: "2"},
        %{id: "3"}
      ]

      %{alerts: alerts}
    end

    test "filters out the banner alert from a list of alerts", %{alerts: alerts} do
      expected_result = [
        %{id: "1"},
        %{id: "3"}
      ]

      assert excluding_banner(%{assigns: %{alert_banner: %{id: "2"}}}, alerts) == expected_result
    end

    test "returns the list of alerts if no banner alert is in assigns", %{alerts: alerts} do
      assert excluding_banner(%{}, alerts) == alerts
    end
  end
end
