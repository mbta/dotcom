defmodule Predictions.RepoTest do
  use ExUnit.Case
  alias Predictions.Repo
  alias Stops.Stop
  alias Routes.Route
  alias Plug.Conn

  describe "all/1" do
    test "returns a list" do
      predictions = Repo.all(route: "Red")
      assert is_list(predictions)
    end

    test "can filter by route / stop" do
      stops = Repo.all(route: "Red", stop: "place-sstat")

      for stop <- stops do
        assert %{route: %Routes.Route{id: "Red"}, stop: %Stop{id: "place-sstat"}} = stop
      end
    end

    test "can filter by stop / direction" do
      directions = Repo.all(stop: "place-sstat", direction_id: 1)

      for direction <- directions do
        assert %{stop: %Stop{id: "place-sstat"}, direction_id: 1} = direction
      end
    end

    test "can filter by trip" do
      trips = Repo.all(trip: "32542509")

      for prediction <- trips do
        assert prediction.trip.id == "32542509"
      end
    end

    test "filters by min_time" do
      min_time = Util.now() |> Timex.shift(minutes: 15)
      predictions = Repo.all(route: "39", min_time: min_time)
      refute Enum.empty?(predictions)

      for prediction <- predictions do
        assert DateTime.compare(prediction.time, min_time) in [:gt, :eq]
      end
    end

    @tag :capture_log
    test "returns a list even if the server is down" do
      v3_url = Application.get_env(:v3_api, :base_url)

      on_exit(fn ->
        Application.put_env(:v3_api, :base_url, v3_url)
      end)

      Application.put_env(:v3_api, :base_url, "http://localhost:0/")

      assert Repo.all(route: "test_down_server") == []
    end

    @red_route ~s({
        "data": {
          "attributes": {
            "direction_destinations": ["Ashmont/Braintree", "Alewife"],
            "direction_names": ["South", "North"],
            "long_name": "Red Line",
            "type": 1
          },
          "id": "Red",
          "type": "route"
        }
        })

    @tag :capture_log
    test "returns valid entries even if some don't parse" do
      # make sure it's cached
      _ = Stops.Repo.get("place-pktrm")

      bypass = Bypass.open()
      v3_url = Application.get_env(:v3_api, :base_url)

      on_exit(fn ->
        Application.put_env(:v3_api, :base_url, v3_url)
      end)

      Application.put_env(:v3_api, :base_url, "http://localhost:#{bypass.port}")

      Bypass.expect(bypass, fn %{request_path: request_path} = conn ->
        case request_path do
          "/predictions/" ->
            in_five_mins =
              Util.now()
              |> Timex.shift(minutes: 5)
              |> Timex.format!("{ISO:Extended}")

            # return a Prediction with a valid stop, and one with an invalid stop
            Conn.resp(
              conn,
              200,
              ~s(
                {
                  "included": [
                    {"type": "route", "id": "Red", "attributes": {"type": 1, "long_name": "Red Line", "direction_names": ["South", "North"], "description": "Rapid Transit"}, "relationships": {}},
                    {"type": "trip", "id": "trip", "attributes": {"headsign": "headsign", "name": "name", "direction_id": "1"}, "relationships": {}},
                    {"type": "stop", "id": "stop", "attributes": {"platform_code": null}, "relationships": {}}
                  ],
                  "data": [
                    {
                      "type": "prediction",
                      "id": "1",
                      "attributes": {
                        "arrival_time": "2016-01-01T00:00:00-05:00",
                        "direction_id": 0
                      },
                      "relationships": {
                        "route": {"data": {"type": "route", "id": "Red"}},
                        "trip": {"data": {"type": "trip", "id": "trip"}},
                        "stop": null,
                        "vehicle": {"data": {"type": "vehicle", "id": "vehicle_id"}}
                      }
                    },
                    {
                      "type": "prediction",
                      "id": "1",
                      "attributes": {
                        "arrival_time": "#{in_five_mins}",
                        "direction_id": 0
                      },
                      "relationships": {
                        "route": {"data": {"type": "route", "id": "Red"}},
                        "trip": {"data": {"type": "trip", "id": "trip", "headsign": "Headsign"}},
                        "stop": {"data": {"type": "stop", "id": "place-pktrm"}},
                        "vehicle": {"data": {"type": "vehicle", "id": "vehicle_id"}}
                      }
                    }
                  ]
                })
            )

          "/routes/Red" ->
            Conn.resp(conn, 200, @red_route)

          _ ->
            Conn.resp(conn, 200, "")
        end
      end)

      refute Repo.all(route: "Red", trip: "made_up_trip") == []
    end

    @tag :capture_log
    test "caches trips that are retrieved" do
      bypass = Bypass.open()
      v3_url = Application.get_env(:v3_api, :base_url)

      on_exit(fn ->
        Application.put_env(:v3_api, :base_url, v3_url)
      end)

      Application.put_env(:v3_api, :base_url, "http://localhost:#{bypass.port}")

      Bypass.expect(bypass, fn %{request_path: request_path} = conn ->
        # return a Prediction with a valid stop, and one with an invalid stop

        case request_path do
          "/predictions/" ->
            in_five_mins =
              Util.now()
              |> Timex.shift(minutes: 5)
              |> Timex.format!("{ISO:Extended}")

            Conn.resp(conn, 200, ~s(
            {
              "included": [
                {"type": "route", "id": "Red", "attributes": {"type": 1, "long_name": "Red Line", "direction_names": ["South", "North"], "description": "Rapid Transit"}, "relationships": {}},
                {"type": "trip", "id": "trip", "attributes": {"headsign": "headsign", "name": "name", "direction_id": "1"}, "relationships": {}},
                {"type": "stop", "id": "stop", "attributes": {"platform_code": null}, "relationships": {}}
              ],
              "data": [
                {
                  "type": "prediction",
                  "id": "1",
                  "attributes": {
                    "arrival_time": "2016-01-01T00:00:00-05:00",
                    "direction_id": 0
                  },
                  "relationships": {
                    "route": {"data": {"type": "route", "id": "Red"}},
                    "stop": null
                  }
                },
                {
                  "type": "prediction",
                  "id": "2",
                  "attributes": {
                    "arrival_time": "#{in_five_mins}",
                    "direction_id": 0
                  },
                  "relationships": {
                    "route": {"data": {"type": "route", "id": "Red"}},
                    "trip": {"data": {"type": "trip", "id": "trip", "headsign": "Headsign"}},
                    "stop": {"data": {"type": "stop", "id": "place-pktrm"}},
                    "vehicle": {"data": null}
                  }
                }
              ]
            }))

          "/routes/Red" ->
            Conn.resp(conn, 200, @red_route)

          _ ->
            Conn.resp(conn, 200, "")
        end
      end)

      refute Repo.all(route: "Red", trip: "trip") == []
      assert {:ok, %Schedules.Trip{id: "trip"}} = ConCache.get(Schedules.Repo, {:trip, "trip"})
    end

    @tag skip: "FIXME: Not sure why this is breaking"
    @tag :capture_log
    test "returns an empty list if the API returns an error" do
      # make sure it's cached
      _ = Stops.Repo.get("place-pktrm")

      bypass = Bypass.open()
      v3_url = Application.get_env(:v3_api, :base_url)

      on_exit(fn ->
        Application.put_env(:v3_api, :base_url, v3_url)
      end)

      Application.put_env(:v3_api, :base_url, "http://localhost:#{bypass.port}")

      Bypass.expect(bypass, fn %{request_path: "/predictions/"} = conn ->
        # return a Prediction with a valid stop, and one with an invalid stop
        Conn.resp(conn, 500, "")
      end)

      assert Repo.all(route: "Red", trip: "has_an_error") == []
    end
  end

  describe "has_trip?/1" do
    test "returns false for items without trips" do
      no_trip = %JsonApi.Item{id: "2"}
      assert Predictions.Repo.has_trip?(no_trip) == false
    end

    test "returns true for items with trips" do
      trip = %JsonApi.Item{relationships: %{"trip" => [%JsonApi.Item{id: "1"}]}}
      assert Predictions.Repo.has_trip?(trip) == true
    end
  end

  describe "load_from_other_repos/1" do
    test "turns a list of records into structs" do
      prediction = {
        "prediction_id",
        "trip_id",
        "place-sstat",
        "Red",
        0,
        Util.now() |> Timex.shift(minutes: 5),
        :stop_sequence,
        :schedule_relationship,
        1,
        :on_time,
        false,
        "vehicle_id"
      }

      assert [
               %Predictions.Prediction{
                 id: "prediction_id",
                 trip: nil,
                 stop: %Stop{id: "place-sstat"},
                 route: %Route{id: "Red"},
                 direction_id: 0,
                 time: %DateTime{},
                 stop_sequence: :stop_sequence,
                 schedule_relationship: :schedule_relationship,
                 track: 1,
                 status: :on_time,
                 departing?: false
               }
             ] = Predictions.Repo.load_from_other_repos([prediction])
    end
  end

  test "drops prediction if stop_id is nil" do
    prediction = {
      "prediction_id",
      "trip_id",
      nil,
      "Red",
      0,
      Util.now(),
      :stop_sequence,
      :schedule_relationship,
      1,
      :on_time,
      false,
      "vehicle_id"
    }

    assert Predictions.Repo.load_from_other_repos([prediction]) == []
  end

  test "drops prediction if stop doesn't exist" do
    prediction = {
      "prediction_id",
      "trip_id",
      "place-doesnt-exist",
      "Red",
      0,
      Util.now(),
      :stop_sequence,
      :schedule_relationship,
      1,
      :on_time,
      false,
      "vehicle_id"
    }

    log =
      ExUnit.CaptureLog.capture_log(fn ->
        assert Predictions.Repo.load_from_other_repos([prediction]) == []
      end)

    assert log =~ "Discarding prediction"
  end

  test "drops subway prediction if it is in the past" do
    prediction_in_the_past = {
      "past_prediction",
      "trip_id",
      "place-sstat",
      "Red",
      0,
      Util.now() |> Timex.shift(minutes: -15),
      :stop_sequence,
      :schedule_relationship,
      1,
      :on_time,
      false,
      "vehicle_id"
    }

    in_15_min = Util.now() |> Timex.shift(minutes: 15)

    prediction_in_the_future = {
      "future_prediction",
      "trip_id",
      "place-sstat",
      "Red",
      0,
      in_15_min,
      :stop_sequence,
      :schedule_relationship,
      1,
      :on_time,
      false,
      "vehicle_id"
    }

    # Prediction in the past gets discarded:
    total_predictions =
      Predictions.Repo.load_from_other_repos([
        prediction_in_the_future,
        prediction_in_the_past
      ])

    assert Enum.count(total_predictions) == 1 &&
             total_predictions |> Enum.at(0) |> Map.get(:id) == "future_prediction"

    # Prediction in the future does not get discarded:
    total_predictions =
      Predictions.Repo.load_from_other_repos([
        prediction_in_the_future,
        prediction_in_the_future
      ])

    assert Enum.count(total_predictions) == 2
  end

  test "does not drop prediction though it is in the past" do
    # predictions in the past are only dropped for subway
    bus_prediction_in_the_past = {
      "bus_prediction",
      "trip_id",
      "66",
      "1",
      1,
      Util.now() |> Timex.shift(minutes: -15),
      :stop_sequence,
      :schedule_relationship,
      1,
      :on_time,
      false,
      "vehicle_id"
    }

    total_predictions = Predictions.Repo.load_from_other_repos([bus_prediction_in_the_past])

    assert Enum.count(total_predictions) == 1
  end
end
