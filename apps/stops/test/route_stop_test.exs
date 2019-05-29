defmodule Stops.RouteStopTest do
  use ExUnit.Case, async: true

  import Stops.RouteStop
  alias Stops.RouteStop
  alias Stops.Stop
  alias Routes.{Route, Shape}
  @stop %Stop{name: "Braintree", id: "place-brntn"}
  @route %Routes.Route{id: "Red", type: 1}
  describe "build_route_stop/3" do
    test "creates a RouteStop object with all expected attributes" do
      result = build_route_stop(@stop, @route, first?: true, last?: true, branch: "Braintree")
      assert result.id == "place-brntn"
      assert result.name == "Braintree"
      assert result.station_info == @stop
      assert result.is_terminus?
      assert result.is_beginning?
      assert result.branch == "Braintree"
      assert result.zone == {:error, :not_fetched}
      # ~w(bus commuter_rail)a
      assert result.stop_features == {:error, :not_fetched}
      assert result.connections == {:error, :not_fetched}
    end
  end

  describe "fetch_zone/1" do
    test "returns a RouteStop with the zone data" do
      route_stop = build_route_stop(@stop, @route)
      fetched = fetch_zone(route_stop)
      refute fetched.zone == route_stop.zone
    end
  end

  describe "fetch_stop_features/1" do
    test "returns a RouteStop with the stop feature data" do
      route_stop = build_route_stop(@stop, @route)
      fetched = fetch_stop_features(route_stop)
      refute fetched.stop_features == route_stop.stop_features
    end
  end

  describe "fetch_connections/1" do
    test "builds a list of connecting routes at a stop" do
      route_stop = build_route_stop(@stop, @route)
      assert route_stop.connections == {:error, :not_fetched}
      fetched = fetch_connections(route_stop)
      assert [%Route{} | _] = fetched.connections
      assert Enum.find(fetched.connections, &(&1.id == fetched.route.id)) == nil
    end
  end

  describe "list_from_shapes/4" do
    test "handles Red line when Ashmont/Braintree are first" do
      ashmont_shape = %Shape{
        id: "ashmont",
        name: "Ashmont",
        stop_ids: ~w(alewife shared ashmont)s
      }

      braintree_shape = %Shape{
        id: "braintree",
        name: "Braintree",
        stop_ids: ~w(alewife shared braintree)s
      }

      stops = make_stops(~w(braintree ashmont shared alewife)s)
      route = %Route{id: "Red"}
      actual = list_from_shapes([ashmont_shape, braintree_shape], stops, route, 0)

      assert_stop_ids(actual, ~w(alewife shared braintree ashmont)s)
      assert_branch_names(actual, [nil, nil, "Braintree", "Ashmont"])
    end

    test "handles Red line when Ashmont/Braintree are last" do
      ashmont_shape = %Shape{
        id: "ashmont",
        name: "Ashmont",
        stop_ids: ~w(ashmont shared alewife)s
      }

      braintree_shape = %Shape{
        id: "braintree",
        name: "Braintree",
        stop_ids: ~w(braintree shared alewife)s
      }

      stops = make_stops(~w(braintree ashmont shared alewife)s)
      route = %Route{id: "Red"}
      actual = list_from_shapes([ashmont_shape, braintree_shape], stops, route, 1)

      assert_stop_ids(actual, ~w(ashmont braintree shared alewife))
      assert_branch_names(actual, ["Ashmont", "Braintree", nil, nil])
    end

    test "handles Kingston where the Plymouth branch doesn't have JFK (outbound)" do
      kingston = %Shape{
        id: "kingston",
        name: "Kingston",
        stop_ids: ~w(sstat jfk braintree kingston)s
      }

      plymouth = %Shape{
        id: "plymouth",
        name: "Plymouth",
        stop_ids: ~w(sstat braintree plymouth)s
      }

      stops = make_stops(~w(sstat jfk braintree kingston plymouth)s)
      route = %Route{id: "CR-Kingston"}
      actual = list_from_shapes([kingston, plymouth], stops, route, 0)

      assert_stop_ids(actual, ~w(sstat jfk braintree plymouth kingston))
      assert_branch_names(actual, [nil, nil, nil, "Plymouth", "Kingston"])
    end

    test "handles Kingston where the Plymouth branch doesn't have JFK (inbound)" do
      kingston = %Shape{
        id: "kingston",
        name: "Kingston",
        stop_ids: ~w(kingston braintree jfk sstat)s
      }

      plymouth = %Shape{
        id: "plymouth",
        name: "Plymouth",
        stop_ids: ~w(plymouth braintree sstat)s
      }

      stops = make_stops(~w(sstat jfk braintree kingston plymouth)s)
      route = %Route{id: "CR-Kingston"}
      actual = list_from_shapes([kingston, plymouth], stops, route, 1)

      assert_stop_ids(actual, ~w(kingston plymouth braintree jfk sstat)s)
      assert_branch_names(actual, ["Kingston", "Plymouth", nil, nil, nil])
    end

    test "handles ferry routes with multiple shapes by returning the stops as-is" do
      primary = %Shape{id: "primary"}
      other = %Shape{id: "secondary"}
      stops = make_stops(~w(long george logan hull rowes hingham))
      route = %Route{id: "boat", type: 4}
      actual = list_from_shapes([primary, other], stops, route, 1)
      assert_stop_ids(actual, ~w(long george logan hull rowes hingham))
    end
  end

  describe "RouteStop implements Util.Position" do
    @route_stop %RouteStop{station_info: %Stop{latitude: 100.0, longitude: 50.0}}

    test "Position.Latitude" do
      assert Util.Position.latitude(@route_stop) == 100.0
      assert Util.Position.longitude(@route_stop) == 50.0
    end
  end

  defp make_stops(stop_ids) do
    for id <- stop_ids do
      %Stop{id: id, name: id}
    end
  end

  def assert_stop_ids(actual, stop_ids) do
    assert Enum.map(actual, & &1.id) == stop_ids
  end

  def assert_branch_names(actual, branch_names) do
    assert Enum.map(actual, & &1.branch) == branch_names
  end
end
