defmodule Stops.NearbyTest do
  use ExUnit.Case, async: true
  doctest Stops.Nearby

  alias Routes.Route
  alias Stops.Stop
  alias Util.Distance
  import Stops.Nearby

  @routes_repo_api Application.get_env(:routes, :routes_repo_api)

  @latitude 42.577
  @longitude -71.225
  @position {@latitude, @longitude}

  describe "nearby_with_routes/3" do
    test "nearby stop is returned with a list of routes" do
      stop = %Stop{id: "stop", longitude: -71.103404, latitude: 42.365291}
      route = %Route{id: "route"}

      api_fn = fn _, _opts -> [%{id: "stop", latitude: 0, longitude: 0}] end
      fetch_fn = fn _id -> stop end
      routes_fn = fn _id, _direction -> [route] end

      actual =
        nearby_with_routes(@position, 0.002,
          api_fn: api_fn,
          fetch_fn: fetch_fn,
          routes_fn: routes_fn
        )

      expected = [
        %{
          stop: stop,
          distance: 15.886258832510926,
          routes_with_direction: [
            %{
              direction_id: nil,
              route: route
            }
          ]
        }
      ]

      assert expected == actual
    end

    test "handles routes timeout gracefully" do
      stop = %Stop{id: "stop", longitude: -71.103404, latitude: 42.365291}

      api_fn = fn _, _opts -> [%{id: "stop", latitude: 0, longitude: 0}] end
      fetch_fn = fn _id -> stop end
      routes_fn = fn _id, _direction -> :error end

      actual =
        nearby_with_routes(@position, 0.002,
          api_fn: api_fn,
          fetch_fn: fetch_fn,
          routes_fn: routes_fn
        )

      expected = [
        %{
          distance: 15.886258832510926,
          routes_with_direction: [],
          stop: stop
        }
      ]

      assert expected == actual
    end
  end

  describe "nearby_with_varying_radius_by_mode/2" do
    test "gets CR/subway/bus stops, gathers then, and fetches them" do
      commuter = random_stops(5)
      subway = random_stops(5)
      bus = random_stops(5)

      route_type_map = %{
        "0,1" => subway,
        2 => commuter,
        3 => bus
      }

      api_fn = fn _, opts -> route_type_map[opts[:route_type]] end
      keys_fn = fn %{id: id} -> [id] end
      fetch_fn = fn id -> {:fetch, id} end

      actual =
        nearby_with_varying_radius_by_mode(@position,
          api_fn: api_fn,
          keys_fn: keys_fn,
          fetch_fn: fetch_fn
        )

      expected =
        @position
        |> gather_stops(commuter, subway, bus)
        # verifies calling fetch
        |> Enum.map(&{:fetch, &1.id})

      assert expected == actual
    end

    test "does not include more than two bus stops with a given key" do
      bus = [
        %{id: 1, latitude: @latitude, longitude: @longitude, keys: [1, 2]},
        %{id: 2, latitude: @latitude, longitude: @longitude, keys: [1]},
        %{id: 3, latitude: @latitude, longitude: @longitude, keys: [1]},
        %{id: 4, latitude: @latitude, longitude: @latitude, keys: [2]}
      ]

      api_fn = fn _, opts -> if opts[:route_type] == 3, do: bus, else: [] end
      keys_fn = fn %{keys: keys} -> keys end
      fetch_fn = fn id -> id end

      actual =
        nearby_with_varying_radius_by_mode(@position,
          api_fn: api_fn,
          keys_fn: keys_fn,
          fetch_fn: fetch_fn
        )

      expected = [1, 2, 4]

      assert expected == actual
    end

    test "does not include more than one subway stop with a given key" do
      subway = [
        %{id: 1, latitude: @latitude, longitude: @longitude, keys: [1, 2]},
        %{id: 2, latitude: @latitude, longitude: @longitude, keys: [1]},
        %{id: 3, latitude: @latitude, longitude: @latitude, keys: [2]}
      ]

      api_fn = fn _, opts -> if opts[:route_type] == "0,1", do: subway, else: [] end
      keys_fn = fn %{keys: keys} -> keys end
      fetch_fn = fn id -> id end

      actual =
        nearby_with_varying_radius_by_mode(@position,
          api_fn: api_fn,
          keys_fn: keys_fn,
          fetch_fn: fetch_fn
        )

      expected = [1]

      assert expected == actual
    end
  end

  describe "api_around/2" do
    test "returns positions around a lat/long" do
      actual = @position |> api_around(radius: 0.06) |> distance_sort

      expected = [
        %{id: "place-NHRML-0218", latitude: 42.593248, longitude: -71.280995},
        %{id: "place-NHRML-0152", latitude: 42.546624, longitude: -71.174334},
        %{id: "6902", latitude: 42.519675, longitude: -71.21163}
      ]

      assert expected == actual
    end

    test "returns the parent station if it exists" do
      # south station
      actual = {42.352271, -71.055242} |> api_around(radius: 0.001) |> distance_sort
      south_station = %{id: "place-sstat", latitude: 42.352271, longitude: -71.055242}
      assert south_station in actual
    end
  end

  describe "keys/1" do
    test "returns a list of {route_id, direction_id} tuples" do
      actual = %{id: "place-kencl"} |> keys |> Enum.sort()

      expected = [
        {"19", 0},
        {"19", 1},
        {"57", 0},
        {"57", 1},
        {"60", 0},
        {"60", 1},
        {"65", 0},
        {"65", 1},
        {"8", 0},
        {"8", 1},
        {"Green-B", 0},
        {"Green-B", 1},
        {"Green-C", 0},
        {"Green-C", 1},
        {"Green-D", 0},
        {"Green-D", 1}
      ]

      assert expected == actual
    end

    test "returns one direction of stops if that's all there is" do
      actual = %{id: "46"} |> keys |> Enum.sort()
      expected = [{"10", 1}]

      assert expected == actual
    end
  end

  describe "gather_stops/4" do
    test "given no results, returns an empty list" do
      assert gather_stops(@position, [], [], []) == []
    end

    test "takes the 4 closest commuter and subway stops" do
      commuter = random_stops(10)
      subway = random_stops(10)

      actual = gather_stops(@position, commuter, subway, [])

      [first_commuter | commuter_sorted] = commuter |> distance_sort
      [first_subway | subway_sorted] = subway |> distance_sort
      assert first_commuter in actual
      assert first_subway in actual
      assert ((commuter_sorted ++ subway_sorted) |> distance_sort |> List.first()) in actual
      assert ((commuter_sorted ++ subway_sorted) |> distance_sort |> Enum.at(1)) in actual
    end

    test "if there are no CR or Bus stops, takes the 12 closest subway" do
      subway = random_stops(20)

      actual = gather_stops(@position, [], subway, [])
      assert Distance.closest(subway, @position, 12) == actual
    end

    test "if there are no Subway or Bus stops, takes the 4 closest CR" do
      commuter = random_stops(10)

      actual = gather_stops(@position, commuter, [], [])
      assert Distance.closest(commuter, @position, 4) == actual
    end

    test "if subway and CR stops overlap, does not return duplicates" do
      both = random_stops(20)

      actual = gather_stops(@position, both, both, [])
      assert Distance.closest(both, @position, 12) == actual
    end

    test "if non-closest subway and CR stops overlap, does not return duplicates" do
      commuter = random_stops(1)
      subway = [%{id: "very close", latitude: @latitude, longitude: @longitude}]

      actual = gather_stops(@position, commuter, subway ++ commuter, [])
      assert [_, _] = actual
    end

    test "returns 12 closest bus stops" do
      bus = random_stops(20)

      actual = gather_stops(@position, [], [], bus)
      assert Distance.closest(bus, @position, 12) == actual
    end

    test "with subway and commuter, returns 8 bus stops" do
      commuter = random_stops(10)
      subway = random_stops(10)
      bus = random_stops(10)

      actual = gather_stops(@position, commuter, subway, bus)

      assert length(actual) == 12

      for stop <- Distance.closest(bus, @position, 8) do
        assert stop in actual
      end

      assert (commuter |> Distance.closest(@position, 1) |> List.first()) in actual
      assert (subway |> Distance.closest(@position, 1) |> List.first()) in actual
    end

    test "without enough bus stops, fill with subway" do
      commuter = random_stops(10)
      subway = random_stops(10)
      bus = random_stops(4)

      actual = gather_stops(@position, commuter, subway, bus)

      assert length(actual) == 12
    end

    @tag iterations: 100
    test "basic properties", %{iterations: iterations} do
      for _ <- 1..iterations do
        stops = random_stops(30)
        commuter = Enum.take_random(stops, Enum.random(0..10))
        subway = Enum.take_random(stops, Enum.random(0..10))
        bus = Enum.take_random(stops, Enum.random(0..10))

        actual = gather_stops(@position, commuter, subway, bus)

        # returns results if there are inputs
        if [] == commuter ++ subway ++ bus do
          assert actual == []
        else
          refute actual == []
        end

        # globally sorted
        assert Distance.sort(actual, @position) == actual
        # no duplicates
        assert Enum.uniq(actual) == actual
        # no more than 12 items
        assert length(actual) <= 12
      end
    end
  end

  describe "merge_routes/2" do
    test "sets direction_id for routes present in one direction at stop" do
      stop_id = "1994"
      routes_fn = &@routes_repo_api.by_stop_and_direction/2
      {:ok, actual} = merge_routes(stop_id, routes_fn)
      route_going_1way = Enum.find(actual, &(&1.route.name === "65"))

      refute nil == route_going_1way.direction_id
    end

    test "sets direction_id to nil for routes present in both directions at stop" do
      stop_id = "place-kencl"
      routes_fn = &@routes_repo_api.by_stop_and_direction/2
      {:ok, actual} = merge_routes(stop_id, routes_fn)
      route_going_2ways = Enum.find(actual, &(&1.route.name === "57A"))

      assert nil == route_going_2ways.direction_id
    end
  end

  def random_stops(count) do
    Enum.map(1..count, fn _ -> random_stop() end)
  end

  defp random_stop do
    id = System.unique_integer() |> Integer.to_string()

    %Stop{
      id: id,
      name: "Stop #{id}",
      latitude: random_around(@latitude),
      longitude: random_around(@longitude)
    }
  end

  defp random_around(float, range \\ 10_000) do
    integer = :rand.uniform(range * 2) - range
    float + integer / range
  end

  defp distance_sort(stops) do
    Distance.sort(stops, {@latitude, @longitude})
  end
end
