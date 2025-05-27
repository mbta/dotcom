defmodule Dotcom.Alerts.EndpointStopsTest do
  use ExUnit.Case

  import Mox

  alias Alerts.{Alert, InformedEntity}
  alias Dotcom.Alerts.EndpointStops

  alias Test.Support.{
    Factories.Routes.Route,
    Factories.RoutePatterns.RoutePattern,
    Factories.Stops.Stop,
    FactoryHelpers
  }

  setup do
    Routes.Repo.Mock |> stub(:get, fn _ -> Route.build(:route) end)
    verify_on_exit!()
    :ok
  end

  describe "endpoint_stops/2" do
    test "returns empty list if an alert's informed entities don't include any stops" do
      route_id = FactoryHelpers.build(:id)
      alert = Alert.new(informed_entity: [%InformedEntity{stop: nil}])

      assert EndpointStops.endpoint_stops([alert], [route_id]) == []
    end

    test "returns the same stop twice if an alert's informed entities includes precisely one stop" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      stop_count = Faker.random_between(3, 20)
      stop_ids_on_route = Faker.Util.sample_uniq(stop_count, fn -> FactoryHelpers.build(:id) end)

      stop_index = Faker.random_between(0, stop_count - 1)

      stop_id = stop_ids_on_route |> Enum.at(stop_index)
      stop = Stop.build(:stop, parent_id: nil, id: stop_id)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, fn ^route_id,
                                 canonical: true,
                                 direction_id: 0,
                                 include: "representative_trip.stops" ->
        [RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_route)]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^stop_id -> stop
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      stop_informed_entities = [%InformedEntity{route: route_id, stop: stop_id}]

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id]) == [{stop, stop}]
    end

    test "returns the first and last affected stops according to the order given by RoutePattern.Repo" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      stop_count = Faker.random_between(3, 20)
      stop_ids_on_route = Faker.Util.sample_uniq(stop_count, fn -> FactoryHelpers.build(:id) end)

      [first_stop_index, last_stop_index] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(0, stop_count - 1) end)
        |> Enum.sort()

      first_stop_id = stop_ids_on_route |> Enum.at(first_stop_index)
      first_stop = Stop.build(:stop, parent_id: nil, id: first_stop_id)

      last_stop_id = stop_ids_on_route |> Enum.at(last_stop_index)
      last_stop = Stop.build(:stop, parent_id: nil, id: last_stop_id)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, fn ^route_id,
                                 canonical: true,
                                 direction_id: 0,
                                 include: "representative_trip.stops" ->
        [RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_route)]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id -> first_stop
        ^last_stop_id -> last_stop
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      stop_informed_entities =
        first_stop_index..last_stop_index
        |> Enum.map(&%InformedEntity{route: route_id, stop: stop_ids_on_route |> Enum.at(&1)})
        |> Enum.shuffle()

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id]) == [{first_stop, last_stop}]
    end

    test "uses a direction ID if there is one as an informed entity" do
      # Setup
      route_id = FactoryHelpers.build(:id)
      direction_id = 1

      stop_count = Faker.random_between(3, 20)
      stop_ids_on_route = Faker.Util.sample_uniq(stop_count, fn -> FactoryHelpers.build(:id) end)

      [first_stop_index, last_stop_index] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(0, stop_count - 1) end)
        |> Enum.sort()

      first_stop_id = stop_ids_on_route |> Enum.at(first_stop_index)
      first_stop = Stop.build(:stop, parent_id: nil, id: first_stop_id)

      last_stop_id = stop_ids_on_route |> Enum.at(last_stop_index)
      last_stop = Stop.build(:stop, parent_id: nil, id: last_stop_id)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, fn ^route_id,
                                 canonical: true,
                                 direction_id: ^direction_id,
                                 include: "representative_trip.stops" ->
        [RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_route)]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id -> first_stop
        ^last_stop_id -> last_stop
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      stop_informed_entities =
        first_stop_index..last_stop_index
        |> Enum.map(
          &%InformedEntity{
            route: route_id,
            direction_id: direction_id,
            stop: stop_ids_on_route |> Enum.at(&1)
          }
        )
        |> Enum.shuffle()

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id]) == [{first_stop, last_stop}]
    end

    test "returns multiple endpoint ranges if there are multiple alerts" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      stop_count = Faker.random_between(5, 20)
      stop_ids_on_route = Faker.Util.sample_uniq(stop_count, fn -> FactoryHelpers.build(:id) end)

      [first_stop_index1, last_stop_index1, first_stop_index2, last_stop_index2] =
        Faker.Util.sample_uniq(4, fn -> Faker.random_between(0, stop_count - 1) end)
        |> Enum.sort()

      first_stop_id1 = stop_ids_on_route |> Enum.at(first_stop_index1)
      first_stop1 = Stop.build(:stop, parent_id: nil, id: first_stop_id1)

      last_stop_id1 = stop_ids_on_route |> Enum.at(last_stop_index1)
      last_stop1 = Stop.build(:stop, parent_id: nil, id: last_stop_id1)

      first_stop_id2 = stop_ids_on_route |> Enum.at(first_stop_index2)
      first_stop2 = Stop.build(:stop, parent_id: nil, id: first_stop_id2)

      last_stop_id2 = stop_ids_on_route |> Enum.at(last_stop_index2)
      last_stop2 = Stop.build(:stop, parent_id: nil, id: last_stop_id2)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, 2, fn ^route_id,
                                    canonical: true,
                                    direction_id: 0,
                                    include: "representative_trip.stops" ->
        [RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_route)]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id1 -> first_stop1
        ^last_stop_id1 -> last_stop1
        ^first_stop_id2 -> first_stop2
        ^last_stop_id2 -> last_stop2
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      stop_informed_entities1 =
        first_stop_index1..last_stop_index1
        |> Enum.map(&%InformedEntity{route: route_id, stop: stop_ids_on_route |> Enum.at(&1)})
        |> Enum.shuffle()

      stop_informed_entities2 =
        first_stop_index2..last_stop_index2
        |> Enum.map(&%InformedEntity{route: route_id, stop: stop_ids_on_route |> Enum.at(&1)})
        |> Enum.shuffle()

      alert1 = Alert.new(informed_entity: stop_informed_entities1)
      alert2 = Alert.new(informed_entity: stop_informed_entities2)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert1, alert2], [route_id]) == [
               {first_stop1, last_stop1},
               {first_stop2, last_stop2}
             ]
    end

    test "returns the right stop range when an alert is on the trunk of a branched route" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      trunk_count = Faker.random_between(3, 5)
      branch_a_count = Faker.random_between(3, 5)
      branch_b_count = Faker.random_between(3, 5)

      all_stop_ids =
        Faker.Util.sample_uniq(trunk_count + branch_a_count + branch_b_count, fn ->
          FactoryHelpers.build(:id)
        end)

      {stop_ids_on_trunk, branch_ids} = all_stop_ids |> Enum.split(trunk_count)
      {stop_ids_on_branch_a, stop_ids_on_branch_b} = branch_ids |> Enum.split(branch_a_count)

      [first_stop_index, last_stop_index] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(0, trunk_count - 1) end)
        |> Enum.sort()

      first_stop_id = stop_ids_on_trunk |> Enum.at(first_stop_index)
      first_stop = Stop.build(:stop, parent_id: nil, id: first_stop_id)

      last_stop_id = stop_ids_on_trunk |> Enum.at(last_stop_index)
      last_stop = Stop.build(:stop, parent_id: nil, id: last_stop_id)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, fn ^route_id,
                                 canonical: true,
                                 direction_id: 0,
                                 include: "representative_trip.stops" ->
        [
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_a),
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_b)
        ]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id -> first_stop
        ^last_stop_id -> last_stop
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      stop_informed_entities =
        first_stop_index..last_stop_index
        |> Enum.map(&%InformedEntity{route: route_id, stop: stop_ids_on_trunk |> Enum.at(&1)})
        |> Enum.shuffle()

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id]) == [{first_stop, last_stop}]
    end

    test "returns the right stop range when an alert is partially on one branch of a branched route" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      trunk_count = Faker.random_between(3, 20)
      branch_a_count = Faker.random_between(3, 20)
      branch_b_count = Faker.random_between(3, 20)

      all_stop_ids =
        Faker.Util.sample_uniq(trunk_count + branch_a_count + branch_b_count, fn ->
          FactoryHelpers.build(:id)
        end)

      {stop_ids_on_trunk, branch_ids} = all_stop_ids |> Enum.split(trunk_count)
      {stop_ids_on_branch_a, stop_ids_on_branch_b} = branch_ids |> Enum.split(branch_a_count)

      first_stop_index = Faker.random_between(0, trunk_count - 1)
      last_stop_index = Faker.random_between(0, branch_b_count - 1)

      first_stop_id = stop_ids_on_trunk |> Enum.at(first_stop_index)
      first_stop = Stop.build(:stop, parent_id: nil, id: first_stop_id)

      last_stop_id = stop_ids_on_branch_b |> Enum.at(last_stop_index)
      last_stop = Stop.build(:stop, parent_id: nil, id: last_stop_id)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, fn ^route_id,
                                 canonical: true,
                                 direction_id: 0,
                                 include: "representative_trip.stops" ->
        [
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_a),
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_b)
        ]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id -> first_stop
        ^last_stop_id -> last_stop
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      {_, affected_trunk_ids} = stop_ids_on_trunk |> Enum.split(first_stop_index)
      {affected_branch_b_ids, _} = stop_ids_on_branch_b |> Enum.split(last_stop_index + 1)

      stop_informed_entities =
        (affected_trunk_ids ++ affected_branch_b_ids)
        |> Enum.map(&%InformedEntity{route: route_id, stop: &1})
        |> Enum.shuffle()

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id]) == [{first_stop, last_stop}]
    end

    test "returns a range including a direction name if an alert spans multiple branches on their forward parts" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      trunk_count = Faker.random_between(3, 20)
      branch_a_count = Faker.random_between(3, 20)
      branch_b_count = Faker.random_between(3, 20)

      all_stop_ids =
        Faker.Util.sample_uniq(trunk_count + branch_a_count + branch_b_count, fn ->
          FactoryHelpers.build(:id)
        end)

      {stop_ids_on_trunk, branch_ids} = all_stop_ids |> Enum.split(trunk_count)
      {stop_ids_on_branch_a, stop_ids_on_branch_b} = branch_ids |> Enum.split(branch_a_count)

      first_stop_index = Faker.random_between(0, trunk_count - 1)

      first_stop_id = stop_ids_on_trunk |> Enum.at(first_stop_index)
      first_stop = Stop.build(:stop, parent_id: nil, id: first_stop_id)

      last_stop_index_a = Faker.random_between(0, branch_a_count - 1)
      last_stop_id_a = stop_ids_on_branch_a |> Enum.at(last_stop_index_a)
      last_stop_a = Stop.build(:stop, parent_id: nil, id: last_stop_id_a)

      last_stop_index_b = Faker.random_between(0, branch_b_count - 1)
      last_stop_id_b = stop_ids_on_branch_b |> Enum.at(last_stop_index_b)
      last_stop_b = Stop.build(:stop, parent_id: nil, id: last_stop_id_b)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, fn ^route_id,
                                 canonical: true,
                                 direction_id: 0,
                                 include: "representative_trip.stops" ->
        [
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_a),
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_b)
        ]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id -> first_stop
        ^last_stop_id_a -> last_stop_a
        ^last_stop_id_b -> last_stop_b
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      direction_name = Faker.Cat.breed()

      Routes.Repo.Mock
      |> stub(:get, fn ^route_id ->
        Route.build(:route, direction_names: %{0 => direction_name, 1 => Faker.Cat.breed()})
      end)

      {_, affected_trunk_ids} = stop_ids_on_trunk |> Enum.split(first_stop_index)
      {affected_branch_a_ids, _} = stop_ids_on_branch_a |> Enum.split(last_stop_index_a + 1)
      {affected_branch_b_ids, _} = stop_ids_on_branch_b |> Enum.split(last_stop_index_b + 1)

      stop_informed_entities =
        (affected_trunk_ids ++ affected_branch_a_ids ++ affected_branch_b_ids)
        |> Enum.map(&%InformedEntity{route: route_id, stop: &1})
        |> Enum.shuffle()

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id]) == [
               {first_stop, "#{direction_name} Stops"}
             ]
    end

    test "returns a range including a direction name if an alert spans multiple branches on their backward parts" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      trunk_count = Faker.random_between(3, 20)
      branch_a_count = Faker.random_between(3, 20)
      branch_b_count = Faker.random_between(3, 20)

      all_stop_ids =
        Faker.Util.sample_uniq(trunk_count + branch_a_count + branch_b_count, fn ->
          FactoryHelpers.build(:id)
        end)

      {stop_ids_on_trunk, branch_ids} = all_stop_ids |> Enum.split(trunk_count)
      {stop_ids_on_branch_a, stop_ids_on_branch_b} = branch_ids |> Enum.split(branch_a_count)

      first_stop_index_a = Faker.random_between(0, branch_a_count - 1)
      first_stop_id_a = stop_ids_on_branch_a |> Enum.at(first_stop_index_a)
      first_stop_a = Stop.build(:stop, parent_id: nil, id: first_stop_id_a)

      first_stop_index_b = Faker.random_between(0, branch_b_count - 1)
      first_stop_id_b = stop_ids_on_branch_b |> Enum.at(first_stop_index_b)
      first_stop_b = Stop.build(:stop, parent_id: nil, id: first_stop_id_b)

      last_stop_index = Faker.random_between(0, trunk_count - 1)
      last_stop_id = stop_ids_on_trunk |> Enum.at(last_stop_index)
      last_stop = Stop.build(:stop, parent_id: nil, id: last_stop_id)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, fn ^route_id,
                                 canonical: true,
                                 direction_id: 0,
                                 include: "representative_trip.stops" ->
        [
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_branch_a ++ stop_ids_on_trunk),
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_branch_b ++ stop_ids_on_trunk)
        ]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id_a -> first_stop_a
        ^first_stop_id_b -> first_stop_b
        ^last_stop_id -> last_stop
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      direction_name = Faker.Cat.breed()

      Routes.Repo.Mock
      |> stub(:get, fn ^route_id ->
        Route.build(:route, direction_names: %{0 => Faker.Cat.breed(), 1 => direction_name})
      end)

      {affected_trunk_ids, _} = stop_ids_on_trunk |> Enum.split(last_stop_index + 1)
      {_, affected_branch_a_ids} = stop_ids_on_branch_a |> Enum.split(first_stop_index_a)
      {_, affected_branch_b_ids} = stop_ids_on_branch_b |> Enum.split(first_stop_index_b)

      stop_informed_entities =
        (affected_trunk_ids ++ affected_branch_a_ids ++ affected_branch_b_ids)
        |> Enum.map(&%InformedEntity{route: route_id, stop: &1})
        |> Enum.shuffle()

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id]) == [
               {last_stop, "#{direction_name} Stops"}
             ]
    end

    test "flips the direction names if the affected direction ID is 1" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      trunk_count = Faker.random_between(3, 20)
      branch_a_count = Faker.random_between(3, 20)
      branch_b_count = Faker.random_between(3, 20)

      all_stop_ids =
        Faker.Util.sample_uniq(trunk_count + branch_a_count + branch_b_count, fn ->
          FactoryHelpers.build(:id)
        end)

      {stop_ids_on_trunk, branch_ids} = all_stop_ids |> Enum.split(trunk_count)
      {stop_ids_on_branch_a, stop_ids_on_branch_b} = branch_ids |> Enum.split(branch_a_count)

      first_stop_index = Faker.random_between(0, trunk_count - 1)

      first_stop_id = stop_ids_on_trunk |> Enum.at(first_stop_index)
      first_stop = Stop.build(:stop, parent_id: nil, id: first_stop_id)

      last_stop_index_a = Faker.random_between(0, branch_a_count - 1)
      last_stop_id_a = stop_ids_on_branch_a |> Enum.at(last_stop_index_a)
      last_stop_a = Stop.build(:stop, parent_id: nil, id: last_stop_id_a)

      last_stop_index_b = Faker.random_between(0, branch_b_count - 1)
      last_stop_id_b = stop_ids_on_branch_b |> Enum.at(last_stop_index_b)
      last_stop_b = Stop.build(:stop, parent_id: nil, id: last_stop_id_b)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, fn ^route_id,
                                 canonical: true,
                                 direction_id: 1,
                                 include: "representative_trip.stops" ->
        [
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_a),
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_b)
        ]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id -> first_stop
        ^last_stop_id_a -> last_stop_a
        ^last_stop_id_b -> last_stop_b
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      direction_name = Faker.Cat.breed()

      Routes.Repo.Mock
      |> stub(:get, fn ^route_id ->
        Route.build(:route, direction_names: %{0 => Faker.Cat.breed(), 1 => direction_name})
      end)

      {_, affected_trunk_ids} = stop_ids_on_trunk |> Enum.split(first_stop_index)
      {affected_branch_a_ids, _} = stop_ids_on_branch_a |> Enum.split(last_stop_index_a + 1)
      {affected_branch_b_ids, _} = stop_ids_on_branch_b |> Enum.split(last_stop_index_b + 1)

      stop_informed_entities =
        (affected_trunk_ids ++ affected_branch_a_ids ++ affected_branch_b_ids)
        |> Enum.map(&%InformedEntity{route: route_id, stop: &1, direction_id: 1})
        |> Enum.shuffle()

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id]) == [
               {first_stop, "#{direction_name} Stops"}
             ]
    end

    test "returns specific stops including a direction name if an alert spans branches but still has unambiguous endpoints" do
      # Setup
      route_id = FactoryHelpers.build(:id)

      trunk_count = Faker.random_between(3, 20)
      branch_a_count = Faker.random_between(3, 20)
      branch_b_count = Faker.random_between(3, 20)

      all_stop_ids =
        Faker.Util.sample_uniq(trunk_count + branch_a_count + branch_b_count, fn ->
          FactoryHelpers.build(:id)
        end)

      {stop_ids_on_trunk, branch_ids} = all_stop_ids |> Enum.split(trunk_count)
      {stop_ids_on_branch_a, stop_ids_on_branch_b} = branch_ids |> Enum.split(branch_a_count)

      first_stop_index = Faker.random_between(0, branch_a_count - 1)
      first_stop_id = stop_ids_on_branch_a |> Enum.at(first_stop_index)
      first_stop = Stop.build(:stop, parent_id: nil, id: first_stop_id)

      last_stop_index = Faker.random_between(0, branch_b_count - 1)
      last_stop_id = stop_ids_on_branch_b |> Enum.at(last_stop_index)
      last_stop = Stop.build(:stop, parent_id: nil, id: last_stop_id)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, fn ^route_id,
                                 canonical: true,
                                 direction_id: 0,
                                 include: "representative_trip.stops" ->
        [
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_branch_a ++ stop_ids_on_trunk),
          RoutePattern.build(:route_pattern, stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_b)
        ]
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id -> first_stop
        ^last_stop_id -> last_stop
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      direction_name = Faker.Cat.breed()

      Routes.Repo.Mock
      |> stub(:get, fn ^route_id ->
        Route.build(:route, direction_names: %{0 => direction_name, 1 => Faker.Cat.breed()})
      end)

      {_, affected_branch_a_ids} = stop_ids_on_branch_a |> Enum.split(first_stop_index)
      {affected_branch_b_ids, _} = stop_ids_on_branch_b |> Enum.split(last_stop_index + 1)

      stop_informed_entities =
        (stop_ids_on_trunk ++ affected_branch_a_ids ++ affected_branch_b_ids)
        |> Enum.map(&%InformedEntity{route: route_id, stop: &1})
        |> Enum.shuffle()

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id]) == [
               {first_stop, last_stop}
             ]
    end

    test "treats multiple routes with shared stops as branched routes" do
      # Setup
      route_id1 = FactoryHelpers.build(:id)
      route_id2 = FactoryHelpers.build(:id)

      trunk_count = Faker.random_between(3, 20)
      branch_a_count = Faker.random_between(3, 20)
      branch_b_count = Faker.random_between(3, 20)

      all_stop_ids =
        Faker.Util.sample_uniq(trunk_count + branch_a_count + branch_b_count, fn ->
          FactoryHelpers.build(:id)
        end)

      {stop_ids_on_trunk, branch_ids} = all_stop_ids |> Enum.split(trunk_count)
      {stop_ids_on_branch_a, stop_ids_on_branch_b} = branch_ids |> Enum.split(branch_a_count)

      first_stop_index = Faker.random_between(0, trunk_count - 1)
      last_stop_index = Faker.random_between(0, branch_b_count - 1)

      first_stop_id = stop_ids_on_trunk |> Enum.at(first_stop_index)
      first_stop = Stop.build(:stop, parent_id: nil, id: first_stop_id)

      last_stop_id = stop_ids_on_branch_b |> Enum.at(last_stop_index)
      last_stop = Stop.build(:stop, parent_id: nil, id: last_stop_id)

      RoutePatterns.Repo.Mock
      |> expect(:by_route_id, 2, fn
        route_id, canonical: true, direction_id: 0, include: "representative_trip.stops" ->
          case route_id do
            ^route_id1 ->
              [
                RoutePattern.build(:route_pattern,
                  stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_a
                )
              ]

            ^route_id2 ->
              [
                RoutePattern.build(:route_pattern,
                  stop_ids: stop_ids_on_trunk ++ stop_ids_on_branch_b
                )
              ]
          end
      end)

      Stops.Repo.Mock
      |> stub(:get_parent, fn
        ^first_stop_id -> first_stop
        ^last_stop_id -> last_stop
        stop_id -> Stop.build(:stop, id: stop_id, parent_id: nil)
      end)

      {_, affected_trunk_ids} = stop_ids_on_trunk |> Enum.split(first_stop_index)
      {affected_branch_b_ids, _} = stop_ids_on_branch_b |> Enum.split(last_stop_index + 1)

      stop_informed_entities =
        (affected_trunk_ids ++ affected_branch_b_ids)
        |> Enum.flat_map(
          &[
            %InformedEntity{route: route_id1, stop: &1},
            %InformedEntity{route: route_id2, stop: &1}
          ]
        )
        |> Enum.shuffle()

      alert = Alert.new(informed_entity: stop_informed_entities)

      # Exercise / Verify
      assert EndpointStops.endpoint_stops([alert], [route_id1, route_id2]) ==
               [{first_stop, last_stop}]
    end
  end
end
