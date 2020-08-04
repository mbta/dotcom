defmodule SiteWeb.ScheduleController.Line.HelpersTest do
  use ExUnit.Case, async: true

  alias Routes.{Route, Shape}
  alias SiteWeb.ScheduleController.Line.Helpers
  alias Stops.{RouteStops, Stop}

  @shape %Shape{
    direction_id: 1,
    id: "SHAPE_ID",
    name: "Nubian Station",
    polyline: "POLYLINE",
    priority: 3,
    stop_ids: ["110", "66", "place-dudly"]
  }

  @stop %Stop{
    id: "110",
    name: "Massachusetts Ave @ Holyoke St",
    type: :stop
  }

  @route_stops %{"1" => [@stop]}

  describe "get_route/1" do
    test "gets a route given its ID" do
      assert {:ok, %Route{id: "1", name: "1"}} = Helpers.get_route("1")
    end

    test "gets a custom response for 'Green'" do
      assert {:ok, %Route{id: "Green", name: "Green Line"}} = Helpers.get_route("Green")
    end

    test "returns :not_found if given a bad route ID" do
      assert Helpers.get_route("Puce") == :not_found
    end
  end

  describe "get_branch_route_stops/3" do
    test "returns a list of RouteStops, one for each branch of the line" do
      assert [
               %RouteStops{branch: nil},
               %RouteStops{branch: "Alewife - Braintree"},
               %RouteStops{branch: "Alewife - Ashmont"}
             ] = Helpers.get_branch_route_stops(%Route{id: "Red"}, 0, "931_0009")
    end
  end

  describe "get_route_shapes" do
    test "gets shapes for both directions of the given route" do
      get_shapes_fn = fn route_id, _shapes_opts, _filter_by_priority? ->
        if route_id == "1", do: [@shape], else: []
      end

      assert Helpers.get_route_shapes("1", nil, true, get_shapes_fn: get_shapes_fn) == [@shape]
    end

    test "gets shapes a single directions of the given route" do
      get_shapes_fn = fn route_id, shapes_opts, _filter_by_priority? ->
        if route_id == "1" and shapes_opts == [direction_id: 0], do: [@shape], else: []
      end

      assert Helpers.get_route_shapes("1", 0, true, get_shapes_fn: get_shapes_fn) == [@shape]
    end

    test "optionally does not filter out shapes with a negative priority" do
      get_shapes_fn = fn route_id, _shapes_opts, filter_by_priority? ->
        if route_id == "1" and filter_by_priority? == false, do: [@shape], else: []
      end

      assert Helpers.get_route_shapes("1", nil, false, get_shapes_fn: get_shapes_fn) == [@shape]
    end

    test "gets shapes for all Green lines" do
      get_shapes_fn = fn route_id, _shapes_opts, _filter_by_priority? ->
        if route_id == "Green-B,Green-C,Green-D,Green-E", do: [@shape], else: []
      end

      assert Helpers.get_route_shapes("Green", nil, true, get_shapes_fn: get_shapes_fn) == [
               @shape
             ]
    end
  end

  describe "get_route_stops" do
    test "gets stops by route for a given route" do
      stops_by_route_fn = fn route_id, direction_id, _opts ->
        if route_id == "1" and direction_id == 0, do: [@stop], else: []
      end

      assert Helpers.get_route_stops("1", 0, stops_by_route_fn) == @route_stops
    end

    test "handles an error response from the stops_by_route_fn" do
      stops_by_route_fn = fn _, _, _ -> {:error, "Error"} end

      assert Helpers.get_route_stops("1", 0, stops_by_route_fn) == %{}
    end

    test "gets stops for all Green lines" do
      stops_by_route_fn = fn _, _, _ -> [@stop] end

      assert Helpers.get_route_stops("Green", 0, stops_by_route_fn) == %{
               "Green-B" => [@stop],
               "Green-C" => [@stop],
               "Green-D" => [@stop],
               "Green-E" => [@stop]
             }
    end
  end

  describe "get_active_shapes/3" do
    test "for bus routes, returns the requested shape" do
      assert Helpers.get_active_shapes([@shape], %Route{type: 3, id: "1"}, "SHAPE_ID") == [
               @shape
             ]
    end

    test "for bus routes, returns the first shape if the requested shape wasn't found" do
      assert Helpers.get_active_shapes([@shape], %Route{type: 3, id: "1"}, "OTHER_SHAPE_ID") == [
               @shape
             ]
    end

    test "for bus routes, returns an empty list if given an empty list of shapes" do
      assert Helpers.get_active_shapes([], %Route{type: 3, id: "1"}, "SHAPE_ID") == []
    end

    test "returns an empty list for the generic Green line" do
      assert Helpers.get_active_shapes([@shape], %Route{id: "Green"}, "SHAPE_ID") == []
    end

    test "returns the passed in shapes for non-bus routes" do
      assert Helpers.get_active_shapes([@shape], %Route{type: 1, id: "Blue"}, "SHAPE_ID") == [
               @shape
             ]
    end
  end

  describe "filter_route_shapes/3" do
    test "returns the active shapes list for bus routes" do
      assert Helpers.filter_route_shapes([], [@shape], %Route{type: 3}) == [@shape]
    end

    test "returns the all shapes list for non-bus routes" do
      assert Helpers.filter_route_shapes([@shape], [], %Route{type: 1}) == [@shape]
    end
  end

  describe "get_branches/4" do
    test "returns a list of RouteStops, one for each branch of the line" do
      stops = Helpers.get_route_stops("Red", 0, &Stops.Repo.by_route/3)
      shapes = Routes.Repo.get_shapes("Red", direction_id: 0)

      assert [%RouteStops{}, %RouteStops{}, %RouteStops{}] =
               Helpers.get_branches(shapes, stops, %Route{id: "Red"}, 0)
    end

    test "returns RouteStops for all Green line branches" do
      stops = Helpers.get_route_stops("Green", 0, &Stops.Repo.by_route/3)
      shapes = Helpers.get_route_shapes("Green", 0)

      assert [%RouteStops{}, %RouteStops{}, %RouteStops{}, %RouteStops{}] =
               Helpers.get_branches(shapes, stops, %Route{id: "Green"}, 0)
    end

    test "returns an empty list when given no stops" do
      stops = %{}
      shapes = Routes.Repo.get_shapes("Red", direction_id: 0)

      assert Helpers.get_branches(shapes, stops, %Route{id: "Red"}, 0) == []
    end
  end
end
