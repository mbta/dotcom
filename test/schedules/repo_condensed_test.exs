defmodule Schedules.RepoCondensedTest do
  use ExUnit.Case

  import Mox
  import Schedules.RepoCondensed
  import Test.Support.Factories.MBTA.Api

  alias Schedules.ScheduleCondensed
  alias Test.Support.{FactoryHelpers, Generators}

  setup :verify_on_exit!

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
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
      assert %ScheduleCondensed{} = List.first(response)
    end

    test "returns the parent station as the stop" do
      response =
        by_route_ids(
          ["Red"],
          date: Util.service_date(),
          direction_id: 0,
          stop_sequences: ["first"]
        )

      assert response != []
      assert %{stop_id: "place-alfcl"} = List.first(response)
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

  describe "last_departure_datetime/4" do
    test "can take a route/direction/stop/date" do
      route_id = FactoryHelpers.build(:id)
      direction_id = FactoryHelpers.build(:direction_id)
      stop_id = FactoryHelpers.build(:id)
      date = Generators.DateTime.random_date_time() |> DateTime.to_date()

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", opts ->
        assert opts[:"filter[route]"] == route_id
        assert opts[:"filter[direction_id]"] == direction_id
        assert opts[:"filter[stop]"] == stop_id
        assert opts[:"filter[date]"] == Date.to_string(date)

        %JsonApi{data: build_list(1, :schedule_item)}
      end)

      assert %DateTime{} = last_departure_datetime(route_id, direction_id, stop_id, date)
    end

    test "handles errors" do
      route_id = FactoryHelpers.build(:id)
      direction_id = FactoryHelpers.build(:direction_id)
      stop_id = FactoryHelpers.build(:id)
      date = Generators.DateTime.random_date_time() |> DateTime.to_date()

      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        {:error, %{reason: :econnrefused}}
      end)

      assert last_departure_datetime(route_id, direction_id, stop_id, date) == nil
    end
  end
end
