defmodule SiteWeb.ScheduleController.FinderApiTest do
  use SiteWeb.ConnCase

  @moduletag :external

  alias Predictions.Prediction
  alias Routes.Route
  alias Services.Repo, as: ServicesRepo
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop

  @now Util.now()
  @schedule_time Timex.shift(@now, minutes: 3)
  @prediction_time Timex.shift(@now, minutes: 5)

  @stop %Stop{id: "place-sstat"}
  @trip %Trip{direction_id: 0, id: "CR-Weekday-Fall-19-839"}
  @route %Route{
    id: "CR-Providence",
    type: 2,
    direction_destinations: %{0 => "Stoughton or Wickford Junction", 1 => "South Station"}
  }

  @schedule %Schedule{
    route: @route,
    trip: @trip,
    stop: @stop,
    time: @schedule_time,
    flag?: false,
    early_departure?: false,
    last_stop?: true,
    stop_sequence: 10,
    pickup_type: 1
  }

  @prediction %Prediction{
    departing?: true,
    direction_id: 0,
    id: "prediction-39783543-70050-60",
    route: @route,
    schedule_relationship: nil,
    status: nil,
    stop: @stop,
    stop_sequence: 0,
    time: @prediction_time,
    track: "2",
    trip: @trip
  }

  describe "journeys/2" do
    test "gets valid journeys in order to derive trip params", %{conn: conn} do
      route_id = "CR-Worcester"
      date = get_valid_trip_date(route_id)
      conn = assign(conn, :date, date)

      journey =
        %{id: route_id, direction: "0", stop: "place-WML-0199"}
        |> get_valid_journeys(conn)
        |> List.first()

      assert %{"trip" => %{"id" => _}, "route" => %{"id" => _}} = journey
      assert %{"departure" => %{"schedule" => %{"time" => date_time_string}}} = journey
      assert {:ok, date_time, _} = DateTime.from_iso8601(date_time_string)
      assert date == date_time |> DateTime.to_date() |> Date.to_iso8601()
    end

    test "handles journeys w/o schedules", %{conn: conn} do
      date = Util.now() |> Date.to_iso8601()

      path =
        finder_api_path(conn, :journeys, %{
          id: "CR-Providence",
          direction: "0",
          date: date,
          stop: "place-sstat",
          is_current: true
        })

      response =
        conn
        |> assign(:schedules_fn, fn _, _ -> [] end)
        |> assign(:predictions_fn, fn _ -> [@prediction] end)
        |> get(path)
        |> json_response(200)

      assert [%{"departure" => %{"time" => _}}] = response
      assert [%{"route" => %{"type" => 2}}] = response
    end
  end

  describe "departures/2" do
    test "successfully calls the API", %{conn: conn} do
      date = Util.now() |> Date.to_iso8601()

      path =
        finder_api_path(conn, :departures, %{
          id: "CR-Kingston",
          direction: "0",
          date: date,
          stop: "place-PB-0194",
          is_current: "true"
        })

      opts = [
        trip_fn: fn _, _ -> [@schedule] end,
        prediction_fn: fn _ -> [@prediction] end
      ]

      conn
      |> assign(:trip_info_functions, opts)
      |> get(path)
      |> json_response(200)
    end
  end

  describe "trip/2" do
    test "successfully calls the API", %{conn: conn} do
      params = %{
        id: "CR-Worcester",
        direction: "0",
        stop: "place-sstat"
      }

      params_for_trip = get_valid_trip_params(params, conn)
      trip_path = finder_api_path(conn, :trip, params_for_trip)

      conn
      |> get(trip_path)
      |> json_response(200)
    end

    test "only shows times starting at selected origin onward - outbound", %{conn: conn} do
      origin_stop = "place-WML-0199"

      params = %{
        id: "CR-Worcester",
        direction: "0",
        stop: origin_stop
      }

      params_for_trip = get_valid_trip_params(params, conn)
      trip_path = finder_api_path(conn, :trip, params_for_trip)

      trip =
        conn
        |> get(trip_path)
        |> json_response(200)

      assert %{"times" => times} = trip
      assert length(times) == 7

      assert origin_stop = times |> List.first() |> get_in(["schedule", "stop", "id"])
    end

    test "only shows times starting at selected origin onward - inbound", %{conn: conn} do
      origin_stop = "place-WML-0199"

      params = %{
        id: "CR-Worcester",
        direction: "1",
        stop: origin_stop
      }

      params_for_trip = get_valid_trip_params(params, conn)
      trip_path = finder_api_path(conn, :trip, params_for_trip)

      trip =
        conn
        |> get(trip_path)
        |> json_response(200)

      assert %{"times" => times} = trip
      assert length(times) == 12

      assert origin_stop = times |> List.first() |> get_in(["schedule", "stop", "id"])
    end

    test "skips formatting predictions without a time", %{conn: conn} do
      date = Util.service_date() |> Date.to_iso8601()

      path =
        finder_api_path(conn, :trip, %{
          id: "CR-Trip-Id",
          route: "CR-Providence",
          direction: "0",
          date: date,
          stop: "place-sstat"
        })

      prediction_without_time = Map.put(@prediction, :time, nil)

      opts = [
        trip_fn: fn _, _ -> [@schedule] end,
        prediction_fn: fn _ -> [prediction_without_time] end
      ]

      response =
        conn
        |> assign(:trip_info_functions, opts)
        |> get(path)
        |> json_response(200)

      assert %{"times" => [processed_prediction | _]} = response
      assert %{"prediction" => %{"time" => nil}} = processed_prediction
    end
  end

  defp get_valid_trip_params(%{id: route_id, stop: _, direction: _} = params, conn) do
    date = get_valid_trip_date(route_id)
    conn = assign(conn, :date, date)

    trip_id =
      params
      |> get_valid_journeys(conn)
      |> List.first()
      |> Map.get("trip")
      |> Map.get("id")

    params
    |> Map.put(:id, trip_id)
    |> Map.put(:route, route_id)
    |> Map.put(:date, date)
  end

  defp get_valid_journeys(params, conn) do
    params =
      params
      |> Map.put(:date, conn.assigns.date)
      |> Map.put(:is_current, "false")

    journeys_path = finder_api_path(conn, :journeys, params)

    conn
    |> get(journeys_path)
    |> json_response(200)
  end

  defp get_valid_trip_date(route_id) do
    route_id
    |> ServicesRepo.by_route_id()
    |> List.first()
    |> Map.get(:end_date)
    |> Date.to_iso8601()
  end
end
