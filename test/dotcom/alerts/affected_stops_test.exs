defmodule Dotcom.Alerts.AffectedStopsTest do
  use ExUnit.Case

  import Mox

  alias Alerts.{Alert, InformedEntity}
  alias Dotcom.Alerts.AffectedStops
  alias Test.Support.{Factories.Stops.Stop, FactoryHelpers}

  setup :verify_on_exit!

  describe "affected_stops/2" do
    test "returns an empty list if there are no informed-entity stops" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      Stops.Repo.Mock
      |> expect(:by_route, fn ^route_id, 0 ->
        build_random_size_non_empty_stop_list()
      end)

      alert = Alert.new(informed_entity: [%InformedEntity{stop: nil}])

      # Exercise
      affected_stops = AffectedStops.affected_stops([alert], [route_id])

      # Verify
      assert affected_stops == []
    end

    test "returns stops that are part of the informed entities and part of the route given" do
      # Setup
      route_id = FactoryHelpers.build(:id)
      stops = build_random_size_non_empty_stop_list()

      Stops.Repo.Mock
      |> stub(:by_route, fn
        ^route_id, 0 -> build_random_size_stop_list() ++ stops ++ build_random_size_stop_list()
        _, 0 -> build_random_size_stop_list()
      end)

      informed_entities = stops |> Enum.map(&%InformedEntity{stop: &1.id})
      alert = Alert.new(informed_entity: informed_entities)

      # Exercise
      queried_route_ids = build_random_size_id_list() ++ [route_id] ++ build_random_size_id_list()

      affected_stops = AffectedStops.affected_stops([alert], queried_route_ids)

      # Verify
      assert affected_stops == stops
    end

    test "uses the direction in the alert if present" do
      # Setup
      route_id = FactoryHelpers.build(:id)
      stops = build_random_size_non_empty_stop_list()

      Stops.Repo.Mock
      |> stub(:by_route, fn
        ^route_id, 1 -> build_random_size_stop_list() ++ stops ++ build_random_size_stop_list()
        _, 1 -> build_random_size_stop_list()
      end)

      informed_entities = stops |> Enum.map(&%InformedEntity{stop: &1.id})
      alert = Alert.new(informed_entity: informed_entities ++ [%InformedEntity{direction_id: 1}])

      # Exercise
      queried_route_ids = build_random_size_id_list() ++ [route_id] ++ build_random_size_id_list()

      affected_stops = AffectedStops.affected_stops([alert], queried_route_ids)

      # Verify
      assert affected_stops == stops
    end

    test "dedupes stops that are part of multiple routes given" do
      # Setup
      route_id1 = FactoryHelpers.build(:id)
      stops1 = build_random_size_non_empty_stop_list()

      route_id2 = FactoryHelpers.build(:id)
      stops2 = build_random_size_non_empty_stop_list()

      overlap_stops = build_random_size_non_empty_stop_list()

      Stops.Repo.Mock
      |> stub(:by_route, fn
        ^route_id1, 0 ->
          build_random_size_stop_list() ++
            stops1 ++ overlap_stops ++ build_random_size_stop_list()

        ^route_id2, 0 ->
          build_random_size_stop_list() ++
            stops2 ++ overlap_stops ++ build_random_size_stop_list()

        _, 0 ->
          build_random_size_stop_list()
      end)

      informed_entities =
        (stops1 ++ stops2 ++ overlap_stops) |> Enum.map(&%InformedEntity{stop: &1.id})

      alert = Alert.new(informed_entity: informed_entities)

      # Exercise
      queried_route_ids =
        (build_random_size_id_list() ++ [route_id1, route_id2] ++ build_random_size_id_list())
        |> Enum.shuffle()

      affected_stops_count =
        AffectedStops.affected_stops([alert], queried_route_ids) |> Enum.count()

      # Verify
      total_stops_count = (stops1 ++ stops2 ++ overlap_stops) |> Enum.count()
      assert affected_stops_count == total_stops_count
    end

    test "combines stops from multiple alerts" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      stops1 = build_random_size_non_empty_stop_list()
      stops2 = build_random_size_non_empty_stop_list()

      overlap_stops = build_random_size_non_empty_stop_list()

      Stops.Repo.Mock
      |> expect(:by_route, fn
        ^route_id, 0 ->
          build_random_size_stop_list() ++
            stops1 ++ stops2 ++ overlap_stops ++ build_random_size_stop_list()

        _, 0 ->
          build_random_size_stop_list()
      end)

      informed_entities1 =
        (stops1 ++ overlap_stops) |> Enum.map(&%InformedEntity{stop: &1.id})

      informed_entities2 =
        (stops2 ++ overlap_stops) |> Enum.map(&%InformedEntity{stop: &1.id})

      alert1 = Alert.new(informed_entity: informed_entities1)
      alert2 = Alert.new(informed_entity: informed_entities2)

      # Exercise

      affected_stops_count =
        AffectedStops.affected_stops([alert1, alert2], [route_id]) |> Enum.count()

      # Verify
      total_stops_count = (stops1 ++ stops2 ++ overlap_stops) |> Enum.count()
      assert affected_stops_count == total_stops_count
    end
  end

  defp build_random_size_stop_list(), do: Stop.build_list(Faker.random_between(0, 10), :stop)

  defp build_random_size_id_list() do
    count = Faker.random_between(0, 10)
    FactoryHelpers.build_list(count, :id)
  end

  defp build_random_size_non_empty_stop_list() do
    count = Faker.random_between(1, 10)
    Stop.build_list(count, :stop)
  end
end
