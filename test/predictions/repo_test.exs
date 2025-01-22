defmodule Predictions.RepoTest do
  use ExUnit.Case, async: true

  import Mox
  import Test.Support.Factories.MBTA.Api

  alias Predictions.Repo
  alias Routes.Route
  alias Stops.Stop
  alias Test.Support.Factories

  setup do
    cache = Application.get_env(:dotcom, :cache)

    cache.flush()

    stub(Stops.Repo.Mock, :get_parent, fn id ->
      Factories.Stops.Stop.build(:stop, %{id: id})
    end)

    %{cache: cache}
  end

  setup :verify_on_exit!

  describe "all/1" do
    test "returns a list" do
      route_id = Faker.Pizza.topping()

      expect(MBTA.Api.Mock, :get_json, fn "/predictions/", opts ->
        assert opts[:route] == route_id
        %JsonApi{data: []}
      end)

      predictions = Repo.all(route: route_id)

      assert is_list(predictions)
    end

    test "can filter by trip" do
      trip_id = Faker.Internet.slug()

      expect(MBTA.Api.Mock, :get_json, fn "/predictions/", opts ->
        assert opts[:trip] == trip_id

        %JsonApi{data: []}
      end)

      trips = Repo.all(trip: trip_id)
      assert is_list(trips)
    end

    test "filters by min_time" do
      route_id = Faker.Internet.slug()

      route_item =
        build(:route_item, %{
          id: route_id,
          attributes: %{
            "type" => 3
          }
        })

      stub(Routes.Repo.Mock, :get, fn id ->
        Factories.Routes.Route.build(:route, %{id: id})
      end)

      min_time = Util.now()

      before_time =
        min_time
        |> Timex.shift(hours: -3)
        |> Timex.format!("{ISO:Extended}")

      after_time =
        min_time
        |> Timex.shift(hours: 3)
        |> Timex.format!("{ISO:Extended}")

      expect(MBTA.Api.Mock, :get_json, fn "/predictions/", opts ->
        assert opts[:route] == route_id

        %JsonApi{
          data:
            build_list(2, :prediction_item, %{
              attributes: %{
                "arrival_time" => before_time
              },
              relationships: %{
                "route" => [route_item],
                "trip" => [],
                "vehicle" => []
              }
            }) ++
              build_list(2, :prediction_item, %{
                attributes: %{
                  "arrival_time" => after_time
                },
                relationships: %{
                  "route" => [route_item],
                  "trip" => [],
                  "vehicle" => []
                }
              })
        }
      end)

      predictions = Repo.all(route: route_id, min_time: min_time)

      for prediction <- predictions do
        assert DateTime.compare(prediction.time, min_time) in [:gt, :eq]
      end
    end

    test "filters out predictions with no departure" do
      stop_id = Faker.Pizza.topping()

      expect(Stops.Repo.Mock, :get_parent, fn id ->
        assert id == stop_id
        %Stop{}
      end)

      five_minutes_in_future = DateTime.add(DateTime.utc_now(), 5, :minute)

      five_minutes_in_future_string =
        Timex.format!(five_minutes_in_future, "{ISO:Extended:Z}")

      # Set as constant to take advantage of caching (less calls to get_json)
      route_id = Faker.Pizza.cheese()

      prediction_json = fn %{departure_time: departure_time, arrival_time: arrival_time} ->
        %JsonApi.Item{
          attributes: %{
            "departure_time" => departure_time,
            "arrival_time" => arrival_time,
            "direction_id" => Faker.random_between(0, 1)
          },
          relationships: %{
            "route" => [
              %{
                id: route_id
              }
            ],
            "trip" => [],
            "vehicle" => [],
            "stop" => [
              %{id: stop_id}
            ]
          }
        }
      end

      expect(MBTA.Api.Mock, :get_json, fn "/predictions/", _ ->
        %JsonApi{
          data: [
            prediction_json.(%{departure_time: nil, arrival_time: five_minutes_in_future_string}),
            prediction_json.(%{
              departure_time: five_minutes_in_future_string,
              arrival_time: five_minutes_in_future_string
            })
          ]
        }
      end)

      expect(Routes.Repo.Mock, :get, 3, fn id ->
        Factories.Routes.Route.build(:route, %{id: id})
      end)

      predictions = Repo.all(route: route_id)

      assert Kernel.length(predictions) == 1
    end

    test "returns a list even if the server is down" do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        {:error, %HTTPoison.Error{reason: :econnrefused}}
      end)

      assert Repo.all(route: "test_down_server") == []
    end

    @tag :external
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

    @tag :external
    test "caches trips that are retrieved", %{cache: cache} do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{data: []}
      end)

      Repo.all(route: "Red", trip: "trip")

      assert {:ok, %Schedules.Trip{id: "trip"}} = cache.get({:trip, "trip"})
    end

    @tag :external
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
    @tag :external
    test "turns a list of records into structs" do
      prediction = {
        "prediction_id",
        "trip_id",
        "70079",
        "Red",
        0,
        nil,
        Timex.shift(Util.now(), minutes: 5),
        Timex.shift(Util.now(), minutes: 5),
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

  @tag :external
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

  @tag :external
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

  @tag :external
  test "drops subway prediction if it is in the past" do
    prediction_in_the_past = {
      "past_prediction",
      "trip_id",
      "place-sstat",
      "Red",
      0,
      nil,
      Timex.shift(Util.now(), minutes: -15),
      Timex.shift(Util.now(), minutes: -15),
      :stop_sequence,
      :schedule_relationship,
      1,
      :on_time,
      false,
      "vehicle_id"
    }

    in_15_min = Timex.shift(Util.now(), minutes: 15)

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

  @tag :external
  test "does not drop prediction though it is in the past" do
    # predictions in the past are only dropped for subway
    bus_prediction_in_the_past = {
      "bus_prediction",
      "trip_id",
      "66",
      "1",
      1,
      nil,
      Timex.shift(Util.now(), minutes: -15),
      Timex.shift(Util.now(), minutes: -15),
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
