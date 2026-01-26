defmodule Schedules.RepoTest do
  use ExUnit.Case, async: false
  use Timex

  import Mox
  import Schedules.Repo

  alias Dotcom.Cache.KeyGenerator
  alias MBTA.Api.Trips
  alias Schedules.Schedule

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    %{cache: cache}
  end

  describe "by_route_ids/2" do
    @describetag :external
    test "can take a route/direction/sequence/date" do
      response =
        by_route_ids(
          ["CR-Lowell"],
          date: Util.service_date(),
          direction_id: 1,
          stop_sequences: "first"
        )

      assert response != []
      assert %Schedule{} = List.first(response)
    end

    test "can take multiple route IDs" do
      response =
        by_route_ids(
          ["1", "9"],
          direction_id: 1,
          stop_sequences: :first
        )

      refute response == []
      assert Enum.any?(response, &(&1.route.id == "1"))
      assert Enum.any?(response, &(&1.route.id == "9"))
    end

    test "returns the parent station as the stop and keeps raw stop id" do
      [first_schedule | _rest] =
        response =
        by_route_ids(
          ["Red"],
          date: Util.service_date(),
          direction_id: 0,
          stop_sequences: ["first"]
        )

      refute response |> Enum.empty?()

      assert %{stop: %{id: "place-alfcl", name: "Alewife"}, platform_stop_id: platform_stop_id} =
               first_schedule

      assert "place-alfcl" != platform_stop_id
    end

    test "filters by min_time when provided" do
      now = Util.now()

      before_now_fn = fn sched ->
        case DateTime.compare(sched.time, now) do
          :gt -> false
          :eq -> true
          :lt -> true
        end
      end

      unfiltered =
        by_route_ids(
          ["Red"],
          date: Util.service_date(),
          direction_id: 0
        )

      before_now = Enum.count(unfiltered, before_now_fn)
      assert before_now > 0

      filtered =
        by_route_ids(
          ["Red"],
          date: Util.service_date(),
          direction_id: 0,
          min_time: now
        )

      before_now = Enum.count(filtered, before_now_fn)
      assert before_now == 0
    end

    test "if we get an error from the API, returns an error tuple" do
      response =
        by_route_ids(
          ["CR-Lowell"],
          date: "1970-01-01",
          stop: "place-north"
        )

      assert {:error, _} = response
    end
  end

  describe "schedule_for_trip/2" do
    @describetag :external
    test "returns stops in order of their stop_sequence for a given trip" do
      trip_id =
        "place-WML-0442"
        |> schedules_for_stop(direction_id: 1)
        |> List.first()
        |> Map.get(:trip)
        |> Map.get(:id)

      # find a Worcester CR trip ID
      response = schedule_for_trip(trip_id)
      assert response |> Enum.all?(fn schedule -> schedule.trip.id == trip_id end)
      refute response == []
      assert List.first(response).stop.id == "place-WML-0442"
      assert List.last(response).stop.id == "place-sstat"
    end

    test "returns different values for different dates" do
      trip_id =
        "place-WML-0442"
        |> schedules_for_stop(direction_id: 1)
        |> List.first()
        |> Map.get(:trip)
        |> Map.get(:id)

      today = Util.service_date()
      tomorrow = Timex.shift(today, days: 1)
      assert schedule_for_trip(trip_id) == schedule_for_trip(trip_id, date: today)

      refute schedule_for_trip(trip_id, date: today) ==
               schedule_for_trip(trip_id, date: tomorrow)
    end
  end

  describe "trip/1" do
    @tag :external
    test "returns a %Schedule.Trip{} for a given ID" do
      date = Timex.shift(Util.service_date(), days: 1)
      schedules = by_route_ids(["1"], date: date, stop_sequences: :first, direction_id: 0)
      scheduled_trip = List.first(schedules).trip
      trip = trip(scheduled_trip.id)
      assert scheduled_trip == trip
      refute trip.shape_id == nil
    end

    test "returns nil if there's an error" do
      mock_response = {:error, "could not connect to the API"}
      assert trip("trip ID with an error", fn _, _ -> mock_response end) == nil
    end
  end

  describe "current_rating/0" do
    test "returns the dates if they come back from the API" do
      # Setup
      start_date = Faker.Date.between(~D[2000-01-01], ~D[2000-12-30])
      end_date = Timex.shift(start_date, days: 1)

      expect(MBTA.Api.Mock, :get_json, fn _ ->
        %JsonApi{
          data: [
            %{
              attributes: %{
                "feed" => %{
                  "start_date" => Date.to_string(start_date),
                  "end_date" => Date.to_string(end_date)
                }
              }
            }
          ]
        }
      end)

      # Exercise / Verify
      assert %{start_date: ^start_date, end_date: ^end_date} = current_rating()
    end
  end

  describe "insert_trips_into_cache/1" do
    test "caches trips that were already fetched", %{cache: cache} do
      trip_id = "trip_with_data"

      data = [
        %JsonApi.Item{
          relationships: %{
            "trip" => [
              %JsonApi.Item{
                id: trip_id,
                attributes: %{
                  "headsign" => "North Station",
                  "name" => "300",
                  "direction_id" => 1
                }
              }
            ]
          }
        }
      ]

      insert_trips_into_cache(data)

      key =
        KeyGenerator.generate(Schedules.Repo, :fetch_trip, [
          trip_id,
          &Trips.by_id/2
        ])

      assert {:ok, %Schedules.Trip{id: ^trip_id}} = cache.get(key)
    end

    test "caches trips that don't have the right data as nil", %{cache: cache} do
      # this can happen with Green Line trips. By caching them, we avoid an
      # extra trip to the server only to get a 404.
      trip_id = "trip_without_right_data"

      data = [
        %JsonApi.Item{relationships: %{"trip" => [%JsonApi.Item{id: trip_id}]}}
      ]

      insert_trips_into_cache(data)

      key =
        KeyGenerator.generate(Schedules.Repo, :fetch_trip, [
          trip_id,
          &Trips.by_id/2
        ])

      assert {:ok, nil} = cache.get(key)
    end
  end

  describe "valid?/1" do
    test "trips with an id are valid" do
      assert valid?(%JsonApi.Item{relationships: %{"trip" => [%JsonApi.Item{id: "1"}]}})
    end

    test "trips without an id are invalid" do
      refute valid?(%JsonApi.Item{relationships: %{"trip" => []}})
    end
  end

  describe "has_trip?/1" do
    test "keeps parsed schedules with trips" do
      assert has_trip?(
               {"CR-Lowell", "CR-Weekday-Fall-18-348", "place-NHRML-0254", "", nil,
                "2018-11-05 23:05:00-05:00 -05 Etc/GMT+5",
                "2018-11-05 23:05:00-05:00 -05 Etc/GMT+5", false, false, false, 1, 0}
             )
    end

    test "filters out parsed schedules that returned without trips" do
      # Setup
      response = {nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil}

      # Exercise/Verify
      refute has_trip?(response)
    end
  end
end
