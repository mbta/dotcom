defmodule DotcomWeb.ScheduleController.FinderApiTest do
  use DotcomWeb.ConnCase

  import Mock

  alias DotcomWeb.ScheduleController.FinderApi
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.Schedule
  alias Schedules.Trip
  alias Services.Repo, as: ServicesRepo
  alias Stops.Stop

  @moduletag :external

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

  setup_all do
    # needed by DotcomWeb.ScheduleController.VehicleLocations plug
    _ = start_supervised({Phoenix.PubSub, name: Vehicles.PubSub})
    _ = start_supervised(Vehicles.Repo)
    :ok
  end

  describe "journeys/2" do
    test "gets valid journeys in order to derive trip params", %{conn: conn} do
      route_id = "Red"
      date = get_valid_trip_date(route_id)
      conn = assign(conn, :date, date)

      journey =
        %{id: route_id, direction: "0", stop: "place-sstat"}
        |> get_valid_journeys(conn)
        |> List.first()

      assert %{"trip" => %{"id" => _}, "route" => %{"id" => _}} = journey
      assert %{"departure" => %{"schedule" => %{"time" => date_time_string}}} = journey
      assert {:ok, date_time, _} = DateTime.from_iso8601(date_time_string)
      assert date == date_time |> DateTime.to_date() |> Date.to_iso8601()
    end

    test "handles journeys w/o schedules", %{conn: conn} do
      date = Date.to_iso8601(Util.now())

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

    test "discards journeys without schedule nor prediction", %{conn: conn} do
      with_mock JourneyList,
        build: fn _, _, _, _, _ ->
          [
            %Journey{
              arrival: nil,
              departure: %PredictedSchedule{prediction: nil, schedule: nil},
              trip: nil
            }
          ]
        end do
        route_id = "134"
        date = get_valid_trip_date(route_id)
        conn = assign(conn, :date, date)

        journeys = get_valid_journeys(%{id: route_id, direction: "0", stop: "any"}, conn)

        assert Enum.empty?(journeys)
      end
    end

    test "handles journeys for combined Green Line", %{conn: conn} do
      route_id = "Green"
      date = Date.to_iso8601(Util.now())
      conn = assign(conn, :date, date)

      journey =
        %{id: route_id, direction: "0", stop: "place-armnl"}
        |> get_valid_journeys(conn)
        |> List.first()

      assert %{"trip" => %{"id" => _}, "route" => %{"id" => _}} = journey
      assert %{"departure" => %{"schedule" => %{"time" => date_time_string}}} = journey
      assert {:ok, date_time, _} = DateTime.from_iso8601(date_time_string)
      assert date == date_time |> DateTime.to_date() |> Date.to_iso8601()
    end
  end

  describe "departures/2" do
    test "successfully calls the API", %{conn: conn} do
      path =
        finder_api_path(conn, :departures, %{
          id: "CR-Kingston",
          direction: "0",
          stop: "place-PB-0194"
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

    test "includes recently departed journeys within the time limit only", %{conn: conn} do
      path =
        finder_api_path(conn, :departures, %{
          id: "CR-Providence",
          direction: "0",
          stop: "place-sstat"
        })

      older_trip = %Trip{direction_id: 0, id: "CR-Weekday-Fall-19-000"}
      older_time = Timex.shift(@schedule_time, minutes: -15)

      recent_prediction =
        @prediction
        |> Map.put(:time, nil)
        |> Map.put(:status, "Departed")

      older_prediction = Map.put(recent_prediction, :trip, older_trip)

      older_schedule =
        @schedule
        |> Map.put(:time, older_time)
        |> Map.put(:trip, older_trip)

      response =
        conn
        |> assign(:schedules_fn, fn _, _ -> [older_schedule, @schedule] end)
        |> assign(:predictions_fn, fn _ -> [older_prediction, recent_prediction] end)
        |> get(path)
        |> json_response(200)

      assert length(response) == 2

      assert [
               %{
                 "trip" => %{"id" => "CR-Weekday-Fall-19-000"},
                 "realtime" => %{"prediction" => nil}
               },
               %{
                 "trip" => %{"id" => "CR-Weekday-Fall-19-839"},
                 "realtime" => %{"prediction" => %{"status" => "Departed"}}
               }
             ] = response
    end

    test "can handle added trips", %{conn: conn} do
      added_prediction = %Prediction{@prediction | schedule_relationship: :added}

      path =
        finder_api_path(conn, :departures, %{
          id: "CR-Providence",
          direction: "0",
          stop: "place-sstat"
        })

      response =
        conn
        |> assign(:schedules_fn, fn _, _ -> [] end)
        |> assign(:predictions_fn, fn _ -> [added_prediction] end)
        |> get(path)
        |> json_response(200)

      assert [%{"departure" => %{"prediction" => _added_prediction, "schedule" => nil}}] =
               response
    end

    test "logs a warning and returns empty when schedules_fn returns error", %{conn: conn} do
      path =
        finder_api_path(conn, :departures, %{
          id: "CR-Providence",
          direction: "0",
          stop: "place-sstat"
        })

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          response =
            conn
            |> assign(:schedules_fn, fn _, _ -> {:error, "error"} end)
            |> assign(:predictions_fn, fn _ -> [] end)
            |> get(path)
            |> json_response(200)

          assert response == []
        end)

      assert log =~ "ScheduleController.FinderApi Error getting schedules"
    end
  end

  describe "trip/2" do
    test "successfully calls the API", %{conn: conn} do
      params = %{
        id: "Red",
        direction: "0",
        stop: "place-sstat"
      }

      params_for_trip = get_valid_trip_params(params, conn)
      trip_path = finder_api_path(conn, :trip, params_for_trip)

      conn
      |> get(trip_path)
      |> json_response(200)
    end

    test "handles green line trips from the generic Green page", %{conn: conn} do
      # As of Aug 2022, the Green Line past Government Center is temporarily suspended.
      # params = %{
      #   id: "Green",
      #   direction: "0",
      #   stop: "place-north"
      # }
      params = %{
        id: "Green",
        direction: "0",
        stop: "place-gover"
      }

      params_for_trip = get_valid_trip_params(params, conn)
      trip_path = finder_api_path(conn, :trip, params_for_trip)

      conn
      |> get(trip_path)
      |> json_response(200)
    end

    test "only shows times starting at selected origin onward - direction 0", %{conn: conn} do
      origin_stop = "place-sstat"

      params = %{
        id: "Red",
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
      destination_stop_ids = Enum.map(times, &get_in(&1, ["schedule", "stop", "id"]))

      refute Enum.member?(destination_stop_ids, "place-dwnxg")

      assert times |> List.first() |> get_in(["schedule", "stop", "id"])
    end

    test "only shows times starting at selected origin onward - direction 1", %{conn: conn} do
      origin_stop = "place-sstat"

      params = %{
        id: "Red",
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

      destination_stop_ids = Enum.map(times, &get_in(&1, ["schedule", "stop", "id"]))

      refute Enum.member?(destination_stop_ids, "place-brdwy")

      assert times |> List.first() |> get_in(["schedule", "stop", "id"])
    end

    test "skips formatting predictions without a time", %{conn: conn} do
      date = Date.to_iso8601(Util.service_date())

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

    test "doesn't 500 if trip info not found", %{conn: conn} do
      date = Date.to_iso8601(Util.service_date())

      path =
        finder_api_path(conn, :trip, %{
          id: "",
          route: "CR-Providence",
          direction: "0",
          date: date,
          stop: "place-sstat"
        })

      opts = [
        trip_fn: fn _, _ -> [@schedule] end,
        prediction_fn: fn _ -> [@prediction] end
      ]

      _ =
        conn
        |> assign(:trip_info_functions, opts)
        |> get(path)
        |> json_response(404)
    end

    test "doesn't 500 if given bad params", %{conn: conn} do
      path =
        finder_api_path(conn, :trip, %{
          origin: "29253"
        })

      assert response =
               conn
               |> get(path)
               |> json_response(400)

      assert response == %{"error" => "Invalid arguments"}
    end

    test "doesn't 500 if route info not found for the Green Line", %{conn: conn} do
      path =
        finder_api_path(conn, :trip, %{
          date: "2020-10-28",
          route: "Green",
          direction: "0",
          stop: "place-haecl",
          id: "INVALID_GL_TRIP_ID"
        })

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert conn
                 |> get(path)
                 |> json_response(404) == nil
        end)

      assert log =~ "route_id_not_found route_id=Green, trip_id=INVALID_GL_TRIP_ID"
    end

    test "successfully finds a valid route id for the Green Line", %{conn: conn} do
      params_for_trip = %{
        direction: "0",
        id: "45803856-20:45-ReservoirRiverside",
        route: "Green",
        stop: "place-wrnst"
      }

      trip_path = finder_api_path(conn, :trip, params_for_trip)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert get(conn, trip_path)
        end)

      refute log =~ "route_id_not_found route_id=Green"
    end
  end

  describe "maybe_add_delay/1" do
    test "doesn't choke on missing schedules" do
      prediction_without_schedule = %{
        prediction: @prediction,
        schedule: nil
      }

      assert FinderApi.maybe_add_delay(prediction_without_schedule) == prediction_without_schedule
    end

    test "doesn't choke on schedule missing time" do
      schedule_without_time = %Schedule{@schedule | time: nil}

      prediction_and_schedule_without_time = %{
        prediction: @prediction,
        schedule: schedule_without_time
      }

      assert FinderApi.maybe_add_delay(prediction_and_schedule_without_time) ==
               prediction_and_schedule_without_time
    end
  end

  defp get_valid_trip_params(%{id: route_id, stop: _, direction: _} = params, conn) do
    date = get_valid_trip_date(route_id)
    conn = assign(conn, :date, date)

    valid_trip =
      params
      |> get_valid_journeys(conn)
      |> List.first()

    trip_id =
      valid_trip
      |> Map.get("trip")
      |> Map.get("id")

    valid_trip_route_id =
      valid_trip
      |> Map.get("route")
      |> Map.get("id")

    params
    |> Map.put(:id, trip_id)
    |> Map.put(:route, valid_trip_route_id)
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
    |> Enum.filter(&(&1.type == :weekday))
    |> Enum.sort_by(&{&1.end_date.year, &1.end_date.month, &1.end_date.day})
    |> List.last()
    |> Map.get(:end_date)
    |> Date.to_iso8601()
  end
end
