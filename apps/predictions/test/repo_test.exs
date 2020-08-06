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
        if request_path == "/predictions/" do
          # return a Prediction with a valid stop, and one with an invalid stop
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
                      "arrival_time": "2016-01-01T00:00:00-05:00"
                    },
                    "relationships": {
                      "route": {"data": {"type": "route", "id": "Red"}},
                      "trip": {"data": {"type": "trip", "id": "trip"}},
                      "stop": null
                    }
                  },
                  {
                    "type": "prediction",
                    "id": "1",
                    "attributes": {
                      "arrival_time": "2016-01-01T00:00:00-05:00"
                    },
                    "relationships": {
                      "route": {"data": {"type": "route", "id": "Red"}},
                      "trip": {"data": {"type": "trip", "id": "trip", "headsign": "Headsign"}},
                      "stop": {"data": {"type": "stop", "id": "place-pktrm"}}
                    }
                  }
                ]
              }))
        else
          # Don't worry about requests for /routes or other.
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

      Bypass.expect(bypass, fn %{request_path: "/predictions/"} = conn ->
        # return a Prediction with a valid stop, and one with an invalid stop
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
                      "arrival_time": "2016-01-01T00:00:00-05:00"
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
                      "arrival_time": "2016-01-01T00:00:00-05:00"
                    },
                    "relationships": {
                      "route": {"data": {"type": "route", "id": "Red"}},
                      "trip": {"data": {"type": "trip", "id": "trip", "headsign": "Headsign"}},
                      "stop": {"data": {"type": "stop", "id": "place-pktrm"}}
                    }
                  }
                ]
              }))
      end)

      refute Repo.all(route: "Red", trip: "trip") == []
      assert {:ok, %Schedules.Trip{id: "trip"}} = ConCache.get(Schedules.Repo, {:trip, "trip"})
    end

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
        Util.now(),
        :stop_sequence,
        :schedule_relationship,
        1,
        :on_time,
        false
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
      false
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
      false
    }

    log =
      ExUnit.CaptureLog.capture_log(fn ->
        assert Predictions.Repo.load_from_other_repos([prediction]) == []
      end)

    assert log =~ "Discarding prediction"
  end
end
