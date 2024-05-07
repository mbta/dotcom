defmodule Predictions.RepoTest do
  use ExUnit.Case, async: false
  @moduletag :external

  import Mox

  alias Predictions.Repo
  alias Routes.Route
  alias Stops.Stop

  setup :set_mox_global

  setup do
    cache = Application.get_env(:dotcom, :cache)

    cache.flush()

    %{cache: cache}
  end

  setup :verify_on_exit!

  describe "all/1" do
    test "returns a list" do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{data: []}
      end)

      predictions = Repo.all(route: "Red")

      assert is_list(predictions)
    end

    test "can filter by trip" do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{data: []}
      end)

      trips = Repo.all(trip: "32542509")

      for prediction <- trips do
        assert prediction.trip.id == "32542509"
      end
    end

    test "filters by min_time" do
      min_time = Util.now() |> Timex.shift(minutes: 15)

      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{data: []}
      end)

      predictions = Repo.all(route: "39", min_time: min_time)
      refute Enum.empty?(predictions)

      for prediction <- predictions do
        assert DateTime.compare(prediction.time, min_time) in [:gt, :eq]
      end
    end

    test "filtes out predictions with no departure" do
      five_minutes_in_future = DateTime.add(Timex.now(), 5, :minute)

      five_minutes_in_future_string =
        Timex.format!(five_minutes_in_future, "{ISO:Extended:Z}")

      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{
          data: [
            %JsonApi.Item{
              attributes: %{
                "departure_time" => nil,
                "arrival_time" => five_minutes_in_future_string,
                "direction_id" => 1
              },
              relationships: %{
                "route" => [
                  %{
                    id: "Red"
                  }
                ],
                "trip" => [],
                "vehicle" => [],
                "stop" => [
                  %{id: "StopID"}
                ]
              }
            },
            %JsonApi.Item{
              attributes: %{
                "departure_time" => five_minutes_in_future_string,
                "arrival_time" => five_minutes_in_future_string,
                "direction_id" => 1
              },
              relationships: %{
                "route" => [
                  %{
                    id: "Red"
                  }
                ],
                "trip" => [],
                "vehicle" => [],
                "stop" => [
                  %{id: "StopID"}
                ]
              }
            }
          ]
        }
      end)

      # Route for calculating display time
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{
          data: [
            %JsonApi.Item{
              id: "Red",
              attributes: %{
                "type" => "1",
                "long_name" => "Red Test Subway",
                "direction_names" => ["North Test Name", "South Test Name"],
                "direction_destinations" => ["North Test", "South Test"]
              },
              relationships: %{}
            }
          ]
        }
      end)

      # Parent Stop for prediction
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{
          data: [
            %JsonApi.Item{
              id: "place-subway",
              attributes: %{
                "name" => "Test Subway Stop",
                "location_type" => 0,
                "platform_name" => "Test Subway Platform",
                "platform_code" => "Test Code",
                "description" => "Test Description"
              },
              relationships: %{
                "facilities" => %{},
                "zone" => "Test Zone"
              }
            }
          ]
        }
      end)

      predictions = Repo.all(route: "39")

      assert Kernel.length(predictions) == 1
    end

    test "returns a list even if the server is down" do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        {:error, %HTTPoison.Error{reason: :econnrefused}}
      end)

      assert Repo.all(route: "test_down_server") == []
    end

    test "returns valid entries even if some don't parse" do
      expect(MBTA.Api.Mock, :get_json, fn _, _, _ ->
        %JsonApi{data: []}
      end)

      # make sure it's cached
      Stops.Repo.get("place-pktrm")

      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{data: []}
      end)

      refute Repo.all(route: "Red", trip: "made_up_trip") == []
    end

    test "caches trips that are retrieved", %{cache: cache} do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{data: []}
      end)

      Repo.all(route: "Red", trip: "trip")

      assert {:ok, %Schedules.Trip{id: "trip"}} = cache.get({:trip, "trip"})
    end

    test "returns an empty list if the API returns an error" do
      # make sure it's cached
      expect(MBTA.Api.Mock, :get_json, fn _, _, _ ->
        %JsonApi{data: []}
      end)

      Stops.Repo.get("place-pktrm")

      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{data: []}
      end)

      assert Repo.all(route: "Red", trip: "has_an_error") == []
    end
  end

  describe "has_trip?/1" do
    test "returns false for items without trips" do
      no_trip = %JsonApi.Item{id: "2"}

      assert Repo.has_trip?(no_trip) == false
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
        "70079",
        "Red",
        0,
        nil,
        Util.now() |> Timex.shift(minutes: 5),
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
                 platform_stop_id: "70079",
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
      nil,
      Util.now(),
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
      nil,
      Util.now(),
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
      nil,
      Util.now() |> Timex.shift(minutes: -15),
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
      nil,
      in_15_min,
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
      nil,
      Util.now() |> Timex.shift(minutes: -15),
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
