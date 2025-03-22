defmodule DotcomWeb.ScheduleController.GreenTest do
  use DotcomWeb.ConnCase, async: false

  import DotcomWeb.ScheduleController.Green

  @moduletag :external

  @green_line Routes.Repo.green_line()

  setup_all do
    # needed by DotcomWeb.ScheduleController.VehicleLocations plug
    _ = start_supervised({Phoenix.PubSub, name: Vehicles.PubSub})
    _ = start_supervised(Vehicles.Repo)
    # Start parent supervisor
    _ = start_supervised({Dotcom.GreenLine.Supervisor, []})
    :ok
  end

  describe "schedule_path/3" do
    test "renders line tab without redirect when query_params doesn't include :tab", %{conn: conn} do
      conn = get(conn, schedule_path(conn, :show, "Green"))

      assert conn.status == 200

      assert conn.assigns.tab == "line"
    end

    test ~s(renders alerts tab without redirecting when query params = %{tab => alerts}), %{
      conn: conn
    } do
      conn = get(conn, schedule_path(conn, :show, "Green", %{tab: "alerts"}))
      assert conn.query_params == %{"tab" => "alerts"}

      assert conn.status == 200

      assert conn.assigns.tab == "alerts"
    end
  end

  test "assigns the route as the Green Line", %{conn: conn} do
    conn = get(conn, schedule_path(conn, :show, "Green"))
    html_response(conn, 200)
    assert conn.assigns.route == @green_line
  end

  test "assigns the date and date_time", %{conn: conn} do
    conn = get(conn, schedule_path(conn, :show, "Green"))
    html_response(conn, 200)
    assert conn.assigns.date
    assert conn.assigns.date_time
  end

  test "assigns date select and calendar", %{conn: conn} do
    conn = get(conn, schedule_path(conn, :show, "Green", date_select: "true"))
    html_response(conn, 200)
    assert conn.assigns.date_select
    assert conn.assigns.calendar
  end

  test "sets a custom meta description", %{conn: conn} do
    conn = get(conn, schedule_path(conn, :show, "Green"))
    assert conn.assigns.meta_description
  end

  describe "predictions" do
    test "assigns predictions and vehicle_predictions for all branches", %{conn: conn} do
      conn =
        conn
        |> assign(:date, ~D[2017-01-01])
        |> assign(:date_time, ~N[2017-01-01T12:00:00])
        |> assign(:origin, %Stops.Stop{id: "place-north"})
        |> assign(:destination, nil)
        |> assign(:direction_id, 0)
        |> assign(:route, @green_line)
        |> assign(:vehicle_locations, %{
          {"trip_1", "stop_1"} => %Vehicles.Vehicle{},
          {"trip_2", "stop_3"} => %Vehicles.Vehicle{}
        })
        |> predictions(
          predictions_fn: fn params ->
            case Enum.into(params, Map.new()) do
              # vehicle predictions
              %{trip: trip_ids} ->
                Enum.map(
                  cartesian_product(trip_ids, "stop_1,stop_3"),
                  fn {trip_id, stop_id} ->
                    %Predictions.Prediction{
                      id: "vehicle_predictions",
                      trip: %Schedules.Trip{id: trip_id},
                      stop: %Stops.Stop{id: stop_id}
                    }
                  end
                )

              # predictions
              value
              when value in [
                     %{direction_id: 0, route: "Green-E"},
                     %{direction_id: 0, route: "Green-D"},
                     %{direction_id: 0, route: "Green-C"},
                     %{direction_id: 0, route: "Green-B"}
                   ] ->
                [
                  %Predictions.Prediction{
                    id: "predictions",
                    trip: 1234,
                    route: %Routes.Route{id: value[:route]},
                    stop: %Stops.Stop{id: "place-north"},
                    departing?: true
                  }
                ]
            end
          end
        )

      assert Enum.map(conn.assigns.predictions, & &1.route.id) == GreenLine.branch_ids()
      assert Enum.all?(conn.assigns.predictions, &(&1.id == "predictions"))

      vehicle_prediction_ids =
        conn.assigns.vehicle_predictions
        |> Enum.map(&{&1.trip.id, &1.stop.id})
        |> Enum.sort()

      assert vehicle_prediction_ids == [
               {"trip_1", "stop_1"},
               {"trip_1", "stop_3"},
               {"trip_2", "stop_1"},
               {"trip_2", "stop_3"}
             ]

      assert Enum.all?(conn.assigns.vehicle_predictions, &(&1.id == "vehicle_predictions"))
    end

    defp cartesian_product(xs, ys) do
      for x <- String.split(xs, ","),
          y <- String.split(ys, ",") do
        {x, y}
      end
    end
  end

  test "assigns vehicle locations for all branches", %{conn: conn} do
    conn =
      conn
      |> assign(:date, ~D[2017-01-01])
      |> assign(:date_time, ~N[2017-01-01T12:00:00])
      |> assign(:direction_id, 0)
      |> assign(:route, @green_line)
      |> vehicle_locations(
        schedule_for_trip_fn: fn _ -> [] end,
        location_fn: fn route_id, _ ->
          [
            %Vehicles.Vehicle{
              route_id: route_id,
              stop_id: "stop-#{route_id}",
              trip_id: "trip-#{route_id}"
            }
          ]
        end
      )

    assert conn.assigns.vehicle_locations
           |> Map.values()
           |> Enum.map(& &1.route_id)
           |> Kernel.==(GreenLine.branch_ids())
  end

  test "assigns breadcrumbs", %{conn: conn} do
    conn = get(conn, schedule_path(conn, :show, "Green"))

    assert conn.assigns.breadcrumbs
  end

  test "assigns stops_on_routes", %{conn: conn} do
    conn =
      get(
        conn,
        schedule_path(conn, :show, "Green", "schedule_direction[direction_id]": 1)
      )

    assert conn.assigns.stops_on_routes == GreenLine.stops_on_routes(1, conn.assigns.date)
  end

  test "direction is not changed when origin and destination are in the correct order", %{
    conn: conn
  } do
    path =
      schedule_path(
        conn,
        :show,
        "Green",
        "schedule_direction[origin]": "place-bckhl",
        "schedule_direction[destination]": "place-pktrm",
        "schedule_direction[direction_id]": 1
      )

    conn = get(conn, path)
    assert conn.assigns.direction_id == 1
  end
end
