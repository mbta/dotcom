defmodule Dotcom.Alerts.AffectedStopsTest do
  use ExUnit.Case

  import Mox

  alias Alerts.{Alert, InformedEntity}
  alias Dotcom.Alerts.AffectedStops
  alias Test.Support.{Factories.Routes.Route, Factories.Stops.Stop, FactoryHelpers}

  setup :verify_on_exit!

  setup do
    Routes.Repo.Mock |> stub(:get, fn _ -> Route.build(:route) end)

    :ok
  end

  describe "affected_stops/2" do
    test "returns an empty list if there are no informed-entity stops" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      Stops.Repo.Mock
      |> stub(:by_route, fn ^route_id, _direction_id ->
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
        ^route_id, _direction_id ->
          build_random_size_stop_list() ++ stops ++ build_random_size_stop_list()

        _, _direction_id ->
          build_random_size_stop_list()
      end)

      informed_entities = stops |> Enum.map(&%InformedEntity{stop: &1.id})
      alert = Alert.new(informed_entity: informed_entities)

      # Exercise
      queried_route_ids = build_random_size_id_list() ++ [route_id] ++ build_random_size_id_list()

      affected_stops = AffectedStops.affected_stops([alert], queried_route_ids)

      # Verify
      assert affected_stops |> MapSet.new() ==
               stops |> Enum.map(&%{direction: :all, stop: &1}) |> MapSet.new()
    end

    test "uses the direction in the alert if present" do
      # Setup
      direction_id = Faker.Util.pick([0, 1])
      route_id = FactoryHelpers.build(:id)
      stops = build_random_size_non_empty_stop_list()

      Stops.Repo.Mock
      |> stub(:by_route, fn
        ^route_id, ^direction_id ->
          build_random_size_stop_list() ++ stops ++ build_random_size_stop_list()

        _, ^direction_id ->
          build_random_size_stop_list()
      end)

      direction_name = Faker.Cat.breed()

      Routes.Repo.Mock
      |> stub(:get, fn _ ->
        Route.build(:route, direction_names: %{direction_id => direction_name})
      end)

      informed_entities =
        stops |> Enum.map(&%InformedEntity{stop: &1.id, direction_id: direction_id})

      alert = Alert.new(informed_entity: informed_entities)

      # Exercise
      queried_route_ids = build_random_size_id_list() ++ [route_id] ++ build_random_size_id_list()

      affected_stops = AffectedStops.affected_stops([alert], queried_route_ids)

      # Verify
      assert affected_stops |> MapSet.new() ==
               stops
               |> Enum.map(&%{direction: {:direction, direction_name}, stop: &1})
               |> MapSet.new()
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
        ^route_id1, _direction_id ->
          build_random_size_stop_list() ++
            stops1 ++ overlap_stops ++ build_random_size_stop_list()

        ^route_id2, _direction_id ->
          build_random_size_stop_list() ++
            stops2 ++ overlap_stops ++ build_random_size_stop_list()

        _, _direction_id ->
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
      |> stub(:by_route, fn
        ^route_id, _direction_id ->
          build_random_size_stop_list() ++
            stops1 ++ stops2 ++ overlap_stops ++ build_random_size_stop_list()

        _, _direction_id ->
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

    test "reports a direction of `:all` when given multiple different direction ID's from the same alert" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      affected_stops = build_random_size_non_empty_stop_list()

      Stops.Repo.Mock
      |> stub(:by_route, fn
        ^route_id, _direction_id ->
          build_random_size_stop_list() ++ affected_stops ++ build_random_size_stop_list()

        _, _direction_id ->
          build_random_size_stop_list()
      end)

      informed_entities =
        affected_stops
        |> Enum.flat_map(
          &[
            %InformedEntity{stop: &1.id, direction_id: 0},
            %InformedEntity{stop: &1.id, direction_id: 1}
          ]
        )

      alert = Alert.new(informed_entity: informed_entities)

      # Exercise
      affected_stops = AffectedStops.affected_stops([alert], [route_id])

      # Verify
      assert affected_stops |> Enum.map(& &1.direction) ==
               1..(affected_stops |> Enum.count()) |> Enum.map(fn _ -> :all end)
    end

    test "reports a direction of `:all` when given multiple different direction ID's from different alerts" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      affected_stops = build_random_size_non_empty_stop_list()

      Stops.Repo.Mock
      |> stub(:by_route, fn
        ^route_id, _direction_id ->
          build_random_size_stop_list() ++ affected_stops ++ build_random_size_stop_list()

        _, _direction_id ->
          build_random_size_stop_list()
      end)

      informed_entities0 =
        affected_stops |> Enum.map(&%InformedEntity{stop: &1.id, direction_id: 0})

      alert0 = Alert.new(informed_entity: informed_entities0)

      informed_entities1 =
        affected_stops |> Enum.map(&%InformedEntity{stop: &1.id, direction_id: 1})

      alert1 = Alert.new(informed_entity: informed_entities1)

      # Exercise
      affected_stops = AffectedStops.affected_stops([alert0, alert1], [route_id])

      # Verify
      assert affected_stops |> Enum.map(& &1.direction) ==
               1..(affected_stops |> Enum.count()) |> Enum.map(fn _ -> :all end)
    end

    test "reports a direction of `:all` when given a `nil` direction ID plus anything else" do
      # Setup
      direction_id = Faker.Util.pick([0, 1])
      route_id = FactoryHelpers.build(:id)

      affected_stops = build_random_size_non_empty_stop_list()

      Stops.Repo.Mock
      |> stub(:by_route, fn
        ^route_id, _direction_id ->
          build_random_size_stop_list() ++ affected_stops ++ build_random_size_stop_list()

        _, _direction_id ->
          build_random_size_stop_list()
      end)

      informed_entities1 =
        affected_stops |> Enum.map(&%InformedEntity{stop: &1.id, direction_id: direction_id})

      informed_entities2 =
        affected_stops |> Enum.map(&%InformedEntity{stop: &1.id, direction_id: nil})

      alert1 = Alert.new(informed_entity: informed_entities1)
      alert2 = Alert.new(informed_entity: informed_entities2)

      # Exercise
      affected_stops = AffectedStops.affected_stops([alert1, alert2], [route_id])

      # Verify
      assert affected_stops |> Enum.map(& &1.direction) ==
               1..(affected_stops |> Enum.count()) |> Enum.map(fn _ -> :all end)
    end

    test "reports different directions for different stops" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      [bypass_direction_id, other_direction_id] =
        Faker.Util.sample_uniq(2, fn -> Faker.Util.pick([0, 1]) end)

      [bypassed_stop, closed_stop] = Stop.build_list(2, :stop)

      Stops.Repo.Mock
      |> stub(:by_route, fn
        ^route_id, _direction_id ->
          build_random_size_stop_list() ++
            [bypassed_stop] ++
            build_random_size_stop_list() ++
            [closed_stop] ++
            build_random_size_stop_list()

        _, _direction_id ->
          build_random_size_stop_list()
      end)

      [bypass_direction_name, other_direction_name] =
        Faker.Util.sample_uniq(2, fn -> Faker.Cat.breed() end)

      Routes.Repo.Mock
      |> stub(:get, fn
        _ ->
          Route.build(:route,
            direction_names: %{
              bypass_direction_id => bypass_direction_name,
              other_direction_id => other_direction_name
            }
          )
      end)

      bypass_alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{stop: bypassed_stop.id, direction_id: bypass_direction_id}
          ]
        )

      closure_alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{stop: closed_stop.id}
          ]
        )

      # Exercise
      queried_route_ids = build_random_size_id_list() ++ [route_id] ++ build_random_size_id_list()

      affected_stops =
        AffectedStops.affected_stops([bypass_alert, closure_alert], queried_route_ids)

      # Verify
      assert affected_stops |> Enum.map(& &1.direction) |> MapSet.new() ==
               MapSet.new([
                 {:direction, bypass_direction_name},
                 :all
               ])
    end
  end

  describe "affected_stops/1" do
    test "sources route ID's from the alert's informed entities" do
      # Setup
      route_id = FactoryHelpers.build(:id)
      stops = build_random_size_non_empty_stop_list()

      Stops.Repo.Mock
      |> stub(:by_route, fn
        ^route_id, _direction_id ->
          build_random_size_stop_list() ++ stops ++ build_random_size_stop_list()
      end)

      informed_entities = stops |> Enum.map(&%InformedEntity{stop: &1.id, route: route_id})
      alert = Alert.new(informed_entity: informed_entities)

      # Exercise
      affected_stops = AffectedStops.affected_stops([alert])

      # Verify
      assert affected_stops |> MapSet.new() ==
               stops |> Enum.map(&%{direction: :all, stop: &1}) |> MapSet.new()
    end
  end

  defp build_random_size_stop_list(), do: Stop.build_list(Faker.random_between(0, 3), :stop)

  defp build_random_size_id_list() do
    count = Faker.random_between(0, 2)
    FactoryHelpers.build_list(count, :id)
  end

  defp build_random_size_non_empty_stop_list() do
    count = Faker.random_between(1, 10)
    Stop.build_list(count, :stop)
  end
end
