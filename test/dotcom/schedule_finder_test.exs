defmodule Dotcom.ScheduleFinderTest do
  use ExUnit.Case, async: true

  import Dotcom.ScheduleFinder
  import Mox
  import Test.Support.Factories.MBTA.Api

  alias Dotcom.ScheduleFinder.{DailyDeparture, FutureArrival}
  alias Test.Support.FactoryHelpers

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    :ok
  end

  setup :verify_on_exit!

  describe "daily_departures/4" do
    test "requests schedules" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", opts ->
        assert Keyword.get(opts, :include) == "trip"
        assert Keyword.get(opts, :"filter[route]") == route_id
        assert Keyword.get(opts, :"filter[direction_id]") == direction_id
        assert Keyword.get(opts, :"filter[stop]") == stop_id
        assert Keyword.get(opts, :"filter[date]") == date
        %JsonApi{data: []}
      end)

      assert {:ok, []} = daily_departures(route_id, direction_id, stop_id, date)
    end

    test "returns departures" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", _ ->
        %JsonApi{data: build_list(4, :schedule_item, departure_attributes())}
      end)

      assert {:ok, departures} = daily_departures(route_id, direction_id, stop_id, date)
      assert %DailyDeparture{} = List.first(departures)
    end

    test "omits schedules that don't pick up passengers" do
      route_id = FactoryHelpers.build(:id)
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      date = Faker.Util.format("%4d-%2d-%2d")

      attributes_without_pickup =
        departure_attributes() |> Map.merge(%{attributes: %{"pickup_type" => 1}})

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", _ ->
        %JsonApi{data: build_list(4, :schedule_item, attributes_without_pickup)}
      end)

      assert {:ok, []} = daily_departures(route_id, direction_id, stop_id, date)
    end
  end

  describe "next_arrivals/3" do
    test "requests schedules" do
      trip_id = FactoryHelpers.build(:id)
      stop_sequence = Faker.Util.pick([0, 1])
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", opts ->
        assert Keyword.get(opts, :include) == "stop"
        assert Keyword.get(opts, :"filter[trip]") == trip_id
        assert Keyword.get(opts, :"filter[date]") == date
        %JsonApi{data: []}
      end)

      assert {:ok, []} = next_arrivals(trip_id, stop_sequence, date)
    end

    test "omits schedules before the given stop_sequence" do
      trip_id = FactoryHelpers.build(:id)
      stop_sequence = "20"
      date = Faker.Util.format("%4d-%2d-%2d")

      arrivals_before_stop =
        arrival_attributes() |> Map.merge(%{attributes: %{"stop_sequence" => 10}})

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", opts ->
        assert Keyword.get(opts, :include) == "stop"
        assert Keyword.get(opts, :"filter[trip]") == trip_id
        assert Keyword.get(opts, :"filter[date]") == date
        %JsonApi{data: build_list(4, :schedule_item, arrivals_before_stop)}
      end)

      assert {:ok, []} = next_arrivals(trip_id, stop_sequence, date)
    end

    test "returns arrivals" do
      trip_id = FactoryHelpers.build(:id)
      stop_sequence = Faker.random_between(1, 100) |> to_string()
      date = Faker.Util.format("%4d-%2d-%2d")

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", opts ->
        assert Keyword.get(opts, :include) == "stop"
        assert Keyword.get(opts, :"filter[trip]") == trip_id
        assert Keyword.get(opts, :"filter[date]") == date
        %JsonApi{data: build_list(4, :schedule_item, arrival_attributes())}
      end)

      assert {:ok, arrivals} = next_arrivals(trip_id, stop_sequence, date)
      assert %FutureArrival{} = List.first(arrivals)
    end
  end

  describe "subway_groups/3" do
    test "returns route, destination, departure times" do
      direction_id = Faker.Util.pick([0, 1])
      stop_id = FactoryHelpers.build(:id)
      departures = departures()

      expect(Routes.Repo.Mock, :get, length(departures), fn id ->
        Test.Support.Factories.Routes.Route.build(:route, %{id: id})
      end)

      assert [{route, destination, times} | _] = subway_groups(departures, direction_id, stop_id)
      assert route.direction_destinations[direction_id] == destination
      assert [%DateTime{} | _] = times
    end

    test "if on the Southbound Red Line branches, adjusts destination accordingly" do
      direction_id = 0

      braintree_stop_id =
        ~w(place-nqncy place-wlsta place-qnctr place-qamnl place-brntn) |> Faker.Util.pick()

      departures = departures()

      expect(Routes.Repo.Mock, :get, length(departures), fn _ ->
        Test.Support.Factories.Routes.Route.build(:route, %{id: "Red"})
      end)

      assert [{route, destination, _} | _] =
               subway_groups(departures, direction_id, braintree_stop_id)

      refute route.direction_destinations[direction_id] == destination
      assert destination == "Braintree"
    end
  end

  defp departures do
    route_id = FactoryHelpers.build(:id)
    direction_id = Faker.Util.pick([0, 1])
    stop_id = FactoryHelpers.build(:id)
    date = Faker.Util.format("%4d-%2d-%2d")

    expect(MBTA.Api.Mock, :get_json, fn "/schedules/", _ ->
      %JsonApi{data: build_list(4, :schedule_item, departure_attributes())}
    end)

    {:ok, departures} = daily_departures(route_id, direction_id, stop_id, date)
    departures
  end

  defp departure_attributes do
    %{
      relationships: %{
        "route" => [build(:item)],
        "trip" => [build(:trip_item)]
      }
    }
  end

  defp arrival_attributes do
    %{
      relationships: %{
        "stop" => [build(:stop_item)]
      }
    }
  end
end
