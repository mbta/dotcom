defmodule Schedules.RepoTest do
  use ExUnit.Case, async: false
  use Timex

  import Mox
  import Schedules.Repo
  import Test.Support.Factories.MBTA.Api

  alias Dotcom.Cache.KeyGenerator
  alias MBTA.Api.Trips
  alias Schedules.Schedule
  alias Test.Support.FactoryHelpers

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    %{cache: cache}
  end

  setup :verify_on_exit!

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
    test "uses trip argument" do
      trip_id = FactoryHelpers.build(:id)

      MBTA.Api.Mock
      |> expect(:get_json, fn "/schedules/", args ->
        assert args[:trip] == trip_id
        %JsonApi{data: []}
      end)

      _ = schedule_for_trip(trip_id)
    end

    test "uses date argument" do
      trip_id = FactoryHelpers.build(:id)
      today = Util.service_date()
      tomorrow = Date.shift(today, day: 1)

      MBTA.Api.Mock
      |> expect(:get_json, fn "/schedules/", args ->
        assert args[:date] == today
        %JsonApi{data: []}
      end)
      |> expect(:get_json, fn "/schedules/", args ->
        assert args[:date] == tomorrow
        %JsonApi{data: []}
      end)

      _ = schedule_for_trip(trip_id, date: today)
      _ = schedule_for_trip(trip_id, date: tomorrow)
    end

    test "gets schedules from additional trips if needed" do
      [trip_id1, trip_id2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)
      trip2 = build(:trip_item, id: trip_id2)

      trip1 =
        build(:trip_item,
          id: trip_id1,
          relationships: %{
            "from_trip_transfers" => [
              build(:item, %{
                attributes: %{"transfer_type" => 4},
                relationships: %{"to_trip" => [trip2]},
                type: "transfer"
              })
            ]
          }
        )

      MBTA.Api.Mock
      |> expect(:get_json, fn "/schedules/", args ->
        assert args[:trip] == trip_id1

        %JsonApi{
          links: %{},
          data: build_list(5, :schedule_item, relationships: %{"trip" => [trip1]})
        }
      end)
      |> expect(:get_json, fn "/schedules/", args ->
        assert args[:trip] == trip_id2

        %JsonApi{
          links: %{},
          data: build_list(5, :schedule_item, relationships: %{"trip" => [trip2]})
        }
      end)

      stub(Routes.Repo.Mock, :get, fn _ ->
        Test.Support.Factories.Routes.Route.build(:route)
      end)

      stub(Stops.Repo.Mock, :get_parent, fn _ ->
        Test.Support.Factories.Stops.Stop.build(:stop)
      end)

      schedules = schedule_for_trip(trip_id1)
      assert Enum.any?(schedules, &(&1.trip.id == trip_id1))
      assert Enum.any?(schedules, &(&1.trip.id == trip_id2))
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
                type: "trip",
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
