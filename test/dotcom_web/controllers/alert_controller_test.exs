defmodule DotcomWeb.AlertControllerTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.AlertController, only: [excluding_banner: 2, group_access_alerts: 1]
  import Mox
  import Phoenix.LiveViewTest

  alias Alerts.Alert
  alias Dotcom.Utils
  alias Stops.Stop
  alias Test.Support.Factories

  setup :verify_on_exit!

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    stub(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ -> [] end)
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Alerts.Repo.Mock, :all, fn _date ->
      Factories.Alerts.Alert.build_list(20, :alert)
    end)

    stub(Alerts.Repo.Mock, :banner, fn -> nil end)

    stub(Alerts.Repo.Mock, :by_route_ids, fn route_ids, _date ->
      Enum.map(route_ids, &Factories.Alerts.Alert.build(:alert_for_route, %{route_id: &1}))
    end)

    stub(Alerts.Repo.Mock, :by_route_types, fn _route_types, _date ->
      []
    end)

    stub(Routes.Repo.Mock, :all, fn ->
      Factories.Routes.Route.build_list(3, :route)
    end)

    stub(Routes.Repo.Mock, :by_type, fn route_type ->
      Factories.Routes.Route.build_list(2, :route, %{type: route_type})
    end)

    stub(Schedules.RepoCondensed.Mock, :by_route_ids, fn _route_ids ->
      []
    end)

    stub(Stops.Repo.Mock, :get, fn id ->
      Factories.Stops.Stop.build(:stop, %{id: id})
    end)

    stub(Stops.Repo.Mock, :get_parent, fn id ->
      Factories.Stops.Stop.build(:stop, %{id: id})
    end)

    stub(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ -> [] end)

    stub(Dotcom.SystemStatus.SubwayCache.Mock, :subway_status, fn ->
      Dotcom.SystemStatus.subway_status()
    end)

    stub(Dotcom.SystemStatus.CommuterRailCache.Mock, :commuter_rail_status, fn ->
      Dotcom.SystemStatus.CommuterRail.commuter_rail_status()
    end)

    :ok
  end

  test "renders commuter rail", %{conn: conn} do
    expect(Routes.Repo.Mock, :by_type, fn 2 ->
      Factories.Routes.Route.build_list(2, :route, %{type: 2})
    end)

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
    test "alerts are assigned for all modes served by this controller", %{conn: conn} do
      for mode <- [:bus, :ferry] do
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
      expect(Routes.Repo.Mock, :by_type, fn 3 ->
        Factories.Routes.Route.build_list(2, :route, %{type: 3})
      end)

      conn = get(conn, alert_path(conn, :show, :bus))
      assert conn.assigns.meta_description
    end

    test "ignores timeframe param", %{conn: conn} do
      all_alerts = get(conn, alert_path(conn, :show, :bus))
      assert all_alerts.assigns.alerts_timeframe == nil

      current = get(conn, alert_path(conn, :show, :bus, alerts_timeframe: "current"))
      assert current.assigns.alerts_timeframe == nil

      upcoming = get(conn, alert_path(conn, :show, :bus, alerts_timeframe: "upcoming"))
      assert upcoming.assigns.alerts_timeframe == nil

      bad_param = get(conn, alert_path(conn, :show, :bus, alerts_timeframe: "foobar"))
      assert bad_param.assigns.alerts_timeframe == nil
    end
  end

  test "route pills are shown for subway alerts", %{conn: conn} do
    # setup... stub an alert that'll show on the page.
    # surprisingly involved, as to be included in this section:
    # - alerts must have nil banner
    # - alerts must be current to the given datetime
    # - alerts must not be a disruption
    # - alerts informed entity has to match the subway routes fetched for
    #   this page in both route ID and route type
    route_id = Faker.Util.pick(Dotcom.Routes.subway_route_ids())
    route_type = Faker.Util.pick([0, 1])

    expect(Alerts.Repo.Mock, :all, fn date ->
      Factories.Alerts.Alert.build_list(1, :alert, %{
        active_period: [Utils.ServiceDateTime.service_range_day(date)],
        banner: nil,
        effect: :amber_alert,
        informed_entity:
          Alerts.InformedEntitySet.new([
            %Alerts.InformedEntity{
              route_type: route_type,
              route: route_id
            }
          ])
      })
    end)

    expect(Routes.Repo.Mock, :by_type, fn [0, 1] ->
      Factories.Routes.Route.build_list(1, :route, %{
        id: route_id,
        type: route_type
      })
    end)

    response =
      conn
      |> get(~p"/alerts/subway")
      |> html_response(200)

    expected =
      render_component(
        &DotcomWeb.Components.RouteSymbols.subway_route_pill/1,
        %{route_ids: [route_id]}
      )

    assert response =~ expected
  end

  describe "group_access_alerts/1" do
    test "given a list of access alerts, gets associated stop & groups the access alerts by stop" do
      stops = Factories.Stops.Stop.build_list(1, :stop)
      stop = List.first(stops)
      stop_id = stop.id

      alerts =
        Factories.Alerts.Alert.build_list(10, :alert, %{
          effect: :access_issue,
          informed_entity:
            Alerts.InformedEntitySet.new([
              %Alerts.InformedEntity{
                stop: stop_id
              }
            ])
        })

      expect(Stops.Repo.Mock, :get_parent, length(alerts), fn ^stop_id ->
        stop
      end)

      assert grouped = group_access_alerts(alerts) |> Map.new()

      assert %{^stop => grouped_alerts} = grouped
      assert MapSet.size(grouped_alerts) == length(alerts)
    end

    test "deduplicates child stops" do
      child_stop = %Stop{id: "child-stop", parent_id: "parent-stop"}
      parent_stop = %Stop{id: "parent-stop", child_ids: ["child-stop"]}

      stub(Stops.Repo.Mock, :get_parent, fn _ ->
        parent_stop
      end)

      alerts = [
        Alert.new(
          id: "escalator-alert",
          effect: :escalator_closure,
          header: "Escalator Alert 1",
          informed_entity: [%Alerts.InformedEntity{stop: parent_stop.id}]
        ),
        Alert.new(
          id: "access-alert",
          effect: :access_issue,
          header: "Access Alert",
          informed_entity: [%Alerts.InformedEntity{stop: child_stop.id}]
        )
      ]

      grouped = group_access_alerts(alerts)
      assert Enum.map(grouped, fn {stop, _} -> stop.id end) == [parent_stop.id]

      assert [%Alert{}, %Alert{}] =
               grouped |> Map.new() |> Map.get(parent_stop) |> MapSet.to_list()
    end

    test "ignores bad stop ids" do
      stub(Stops.Repo.Mock, :get_parent, fn _ ->
        nil
      end)

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
