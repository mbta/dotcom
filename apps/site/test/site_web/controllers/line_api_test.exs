defmodule SiteWeb.LineApiTest do
  use SiteWeb.ConnCase

  import SiteWeb.ScheduleController.LineApi
  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE
  alias Alerts.Match
  alias Alerts.Stop, as: AlertsStop
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Stops.{RouteStop, Stop}

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

  describe "headsigns_by_stop/3" do
    @now Util.now()
    @schedule_time1 Timex.shift(@now, minutes: 3)
    @prediction_time1 Timex.shift(@now, minutes: 5)
    @schedule_time2 Timex.shift(@now, minutes: 13)
    @prediction_time2 Timex.shift(@now, minutes: 15)
    @schedule_time3 Timex.shift(@now, minutes: 23)
    @prediction_time3 Timex.shift(@now, minutes: 25)

    @route %Route{
      id: "1",
      type: 3,
      direction_destinations: %{0 => "Harvard Square", 1 => "Nubian Station"}
    }

    @stop %Stop{id: "95"}
    @trip1 %Trip{direction_id: 1, id: "44936023", name: "first trip", headsign: "Nubian Station"}
    @trip2 %Trip{direction_id: 1, id: "44936025", name: "second trip", headsign: "Nubian Station"}
    @trip3 %Trip{direction_id: 1, id: "44936030", name: "third trip", headsign: "Nubian Station"}

    @schedule1 %Schedule{
      route: @route,
      stop: @stop,
      trip: @trip1,
      time: @schedule_time1
    }

    @prediction1 %Prediction{
      departing?: true,
      direction_id: 1,
      id: "prediction-39783543-70050-60",
      route: @route,
      schedule_relationship: nil,
      status: nil,
      stop: @stop,
      stop_sequence: 60,
      time: @prediction_time1,
      track: "2",
      trip: @trip1
    }

    @schedule2 %Schedule{
      route: @route,
      stop: @stop,
      trip: @trip2,
      time: @schedule_time2
    }

    @prediction2 %Prediction{
      departing?: true,
      direction_id: 1,
      id: "prediction-39783543-70050-61",
      route: @route,
      schedule_relationship: nil,
      status: nil,
      stop: @stop,
      stop_sequence: 60,
      time: @prediction_time2,
      track: "2",
      trip: @trip2
    }

    @schedule3 %Schedule{
      route: @route,
      stop: @stop,
      trip: @trip3,
      time: @schedule_time3
    }

    @prediction3 %Prediction{
      departing?: true,
      direction_id: 1,
      id: "prediction-39783543-70050-61",
      route: @route,
      schedule_relationship: nil,
      status: nil,
      stop: @stop,
      stop_sequence: 60,
      time: @prediction_time3,
      track: "2",
      trip: @trip3
    }

    test "returns time data for the next 2 predictions" do
      predictions_fn = fn _ -> [@prediction1, @prediction2, @prediction3] end

      schedules_fn = fn _, _ ->
        [@schedule1, @schedule2, @schedule3]
      end

      actual =
        headsigns_by_stop(@route.id, 1,
          schedules_fn: schedules_fn,
          predictions_fn: predictions_fn,
          now: @now
        )

      assert %{"95" => headsign_data} = actual

      assert ["first trip", "second trip"] =
               headsign_data
               |> Enum.filter(&(!is_nil(&1.predicted_time)))
               |> Enum.map(& &1.trip_name)

      assert %{
               delay: 0,
               headsign_name: "Nubian Station",
               predicted_time: @prediction_time1,
               scheduled_time: nil,
               skipped_or_cancelled: false,
               status: nil,
               track: _track,
               trip_name: "first trip",
               vehicle_crowding: nil
             } = List.first(headsign_data)
    end

    test "returns no data when schedules is empty" do
      predictions_fn = fn _ -> [@prediction1] end

      schedules_fn = fn _, _ ->
        []
      end

      actual =
        headsigns_by_stop(@route.id, 1,
          schedules_fn: schedules_fn,
          predictions_fn: predictions_fn,
          now: @now
        )

      assert %{"95" => [%{}]} = actual
    end

    test "return neither schedules nor predictions if date is outside rating" do
      predictions_fn = fn _ -> [@prediction1] end

      schedules_fn = fn _, _ ->
        {:error,
         [
           %JsonApi.Error{
             code: "no_service",
             detail: nil,
             meta: %{
               "end_date" => "2020-03-14",
               "start_date" => "2019-12-06",
               "version" => "Winter 2020, 2019-12-13T17:29:50+00:00, version D"
             },
             source: %{"parameter" => "date"}
           }
         ]}
      end

      actual =
        headsigns_by_stop(@route.id, 1,
          schedules_fn: schedules_fn,
          predictions_fn: predictions_fn,
          now: Timex.shift(@now, years: -1)
        )

      assert actual == %{}
    end
  end

  describe "filter_predicted_schedules_for_display/2" do
    @predicted_schedule %PredictedSchedule{
      schedule: %Schedule{time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")}
    }

    test "at least 1 result contains a prediction, up to 2 predictions are returned" do
      predicted_schedules = [
        @predicted_schedule,
        %{
          @predicted_schedule
          | prediction: %Prediction{
              time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
            }
        },
        %{
          @predicted_schedule
          | prediction: %Prediction{
              time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
            }
        },
        %{
          @predicted_schedule
          | prediction: %Prediction{
              time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
            }
        },
        @predicted_schedule
      ]

      assert [
               predicted_schedule1,
               predicted_schedule2
             ] =
               filter_predicted_schedules_for_display(
                 predicted_schedules,
                 3
               )

      assert predicted_schedule1.prediction != nil
      assert predicted_schedule2.prediction != nil
    end

    test "1 result contains a prediction, only 1 prediction is returned if rest are schedules" do
      predicted_schedules = [
        @predicted_schedule,
        %{
          @predicted_schedule
          | prediction: %Prediction{
              time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
            }
        },
        @predicted_schedule,
        @predicted_schedule,
        @predicted_schedule
      ]

      assert [
               predicted_schedule
             ] =
               filter_predicted_schedules_for_display(
                 predicted_schedules,
                 3
               )

      assert predicted_schedule.prediction != nil
    end

    test "no results contains a prediction, only return 1 schedule" do
      predicted_schedules = [
        @predicted_schedule,
        @predicted_schedule,
        @predicted_schedule,
        @predicted_schedule
      ]

      assert [predicted_schedule] =
               filter_predicted_schedules_for_display(
                 predicted_schedules,
                 3
               )

      assert predicted_schedule.prediction == nil
    end
  end
end
