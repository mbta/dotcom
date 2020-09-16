defmodule SiteWeb.LineApiTest do
  use SiteWeb.ConnCase

  import SiteWeb.ScheduleController.LineApi
  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE
  alias Alerts.Match
  alias Alerts.Stop, as: AlertsStop
  alias Routes.Route
  alias Stops.RouteStop

  describe "show" do
    test "success response", %{conn: conn} do
      conn = get(conn, line_api_path(conn, :show, %{"id" => "Red", "direction_id" => "1"}))

      assert json_response(conn, 200)
    end

    test "bad route", %{conn: conn} do
      conn = get(conn, line_api_path(conn, :show, %{"id" => "Puce", "direction_id" => "1"}))

      assert conn.status == 400
      body = json_response(conn, 400)
      assert body["error"] == "Invalid arguments"
    end
  end

  describe "realtime" do
    test "success response", %{conn: conn} do
      conn =
        get(
          conn,
          line_api_path(conn, :realtime, %{"id" => "Red", "direction_id" => "1", "v" => "2"})
        )

      assert %{"place-brdwy" => %{"headsigns" => _, "vehicles" => _}} = json_response(conn, 200)
    end
  end

  @now Timex.now()

  @line_data [
    {
      [nil: :terminus],
      %RouteStop{id: "place-alfcl", connections: [], route: %Route{id: "Red"}}
    },
    {
      [{"Alewife - Ashmont", :merge}, {"Alewife - Braintree", :merge}],
      %RouteStop{id: "place-jfk", connections: [], route: %Route{id: "Red"}}
    },
    {
      [{"Alewife - Ashmont", :line}, {"Alewife - Braintree", :stop}],
      %RouteStop{id: "place-nqncy", connections: [], route: %Route{id: "Red"}}
    },
    {
      [{"Alewife - Ashmont", :line}, {"Alewife - Braintree", :terminus}],
      %RouteStop{id: "place-brntn", connections: [], route: %Route{id: "Red"}}
    },
    {
      [{"Alewife - Ashmont", :stop}],
      %RouteStop{id: "place-shmnl", connections: [], route: %Route{id: "Red"}}
    },
    {
      [{"Alewife - Ashmont", :terminus}],
      %RouteStop{id: "place-asmnl", connections: [], route: %Route{id: "Red"}}
    }
  ]

  @disruption_alert Alert.new(
                      lifecycle: :ongoing,
                      effect: :detour,
                      informed_entity: [%IE{stop: "place-nqncy"}, %IE{stop: "place-brntn"}],
                      active_period: [{Timex.shift(@now, days: -1), Timex.shift(@now, days: 1)}]
                    )

  @future_alert Alert.new(
                  active_period: [{Timex.shift(@now, days: 2), Timex.shift(@now, days: 3)}],
                  lifecycle: :upcoming,
                  effect: :stop_closure,
                  informed_entity: [%IE{stop: "place-alfcl"}]
                )

  @other_alert Alert.new(
                 active_period: [{@now, nil}],
                 priority: :high,
                 lifecycle: :ongoing,
                 effect: :stop_shoveling,
                 informed_entity: [%IE{stop: "place-jfk"}]
               )

  @alerts [
    @disruption_alert,
    @future_alert,
    @other_alert
  ]

  describe "update_route_stop_data/3" do
    test "returns a list of line diagram stops" do
      assert [%{alerts: alerts, route_stop: route_stop, stop_data: stop_data} | _] =
               update_route_stop_data(@line_data, @alerts, @now)
    end

    test "includes expected alerts" do
      filtered =
        @alerts
        |> Enum.filter(&Match.any_time_match?(&1, @now))

      for stop_id <- Enum.map(@line_data, fn {_, %RouteStop{id: id}} -> id end) do
        stop_alerts = AlertsStop.match(filtered, stop_id)
        refute @future_alert in stop_alerts

        case stop_id do
          "place-nqncy" ->
            refute @other_alert in stop_alerts
            assert @disruption_alert in stop_alerts

          "place-brntn" ->
            refute @other_alert in stop_alerts
            assert @disruption_alert in stop_alerts

          "place-jfk" ->
            assert @other_alert in stop_alerts
            refute @disruption_alert in stop_alerts

          "place-alfcl" ->
            refute @other_alert in stop_alerts
            refute @disruption_alert in stop_alerts

          _ ->
            assert [] == stop_alerts
        end
      end
    end

    test "includes disrupted stop_data where appropriate" do
      line_diagram_data = update_route_stop_data(@line_data, @alerts, @now)

      disruption = fn stop_data ->
        %{has_disruption?: has_disruption} = List.last(stop_data)
        has_disruption
      end

      %{stop_data: stop_data} = Enum.find(line_diagram_data, &(&1.route_stop.id == "place-nqncy"))
      assert disruption.(stop_data)

      %{stop_data: stop_data_no_disruption} =
        Enum.find(line_diagram_data, &(&1.route_stop.id == "place-shmnl"))

      refute disruption.(stop_data_no_disruption)
    end
  end
end
