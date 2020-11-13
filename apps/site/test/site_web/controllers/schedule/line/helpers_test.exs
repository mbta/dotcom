defmodule SiteWeb.ScheduleController.Line.HelpersTest do
  use ExUnit.Case, async: true

  alias Routes.{Route, Shape}
  alias RoutePatterns.RoutePattern
  alias SiteWeb.ScheduleController.Line.Helpers
  alias Stops.{RouteStops, Stop}

  doctest Helpers

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
               %RouteStops{branch: nil, stops: trunk_route_stops},
               %RouteStops{branch: "Alewife - Braintree", stops: braintree_route_stops},
               %RouteStops{branch: "Alewife - Ashmont", stops: ashmont_route_stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Red"}, 0)

      assert Enum.all?(trunk_route_stops, &(&1.branch == nil))

      assert_stop_ids(trunk_route_stops, [
        "place-alfcl",
        "place-davis",
        "place-portr",
        "place-harsq",
        "place-cntsq",
        "place-knncl",
        "place-chmnl",
        "place-pktrm",
        "place-dwnxg",
        "place-sstat",
        "place-brdwy",
        "place-andrw",
        "place-jfk"
      ])

      assert Enum.map(trunk_route_stops, & &1.is_terminus?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]

      assert Enum.map(trunk_route_stops, & &1.is_beginning?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]

      assert Enum.all?(braintree_route_stops, &(&1.branch == "Alewife - Braintree"))

      assert_stop_ids(braintree_route_stops, [
        "place-nqncy",
        "place-wlsta",
        "place-qnctr",
        "place-qamnl",
        "place-brntn"
      ])

      assert Enum.map(braintree_route_stops, & &1.is_terminus?) ==
               [false, false, false, false, true]

      assert Enum.map(braintree_route_stops, & &1.is_beginning?) ==
               [false, false, false, false, false]

      assert Enum.all?(ashmont_route_stops, &(&1.branch == "Alewife - Ashmont"))

      assert_stop_ids(ashmont_route_stops, [
        "place-shmnl",
        "place-fldcr",
        "place-smmnl",
        "place-asmnl"
      ])

      assert Enum.map(ashmont_route_stops, & &1.is_terminus?) ==
               [false, false, false, true]

      assert Enum.map(ashmont_route_stops, & &1.is_beginning?) ==
               [false, false, false, false]
    end

    test "handles the combined Green line" do
      assert [
               %Stops.RouteStops{branch: "Green-E", stops: e_stops},
               %Stops.RouteStops{branch: "Green-D", stops: d_stops},
               %Stops.RouteStops{branch: "Green-C", stops: c_stops},
               %Stops.RouteStops{branch: "Green-B", stops: b_stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Green"}, 0)

      assert Enum.map(e_stops, & &1.branch) ==
               [
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 "Green-E",
                 "Green-E",
                 "Green-E",
                 "Green-E",
                 "Green-E",
                 "Green-E",
                 "Green-E",
                 "Green-E",
                 "Green-E",
                 "Green-E",
                 "Green-E"
               ]

      assert_stop_ids(e_stops, [
        "place-lech",
        "14159",
        "place-north",
        "place-haecl",
        "place-gover",
        "place-pktrm",
        "place-boyls",
        "place-armnl",
        "place-coecl",
        "place-prmnl",
        "place-symcl",
        "place-nuniv",
        "place-mfa",
        "place-lngmd",
        "place-brmnl",
        "place-fenwd",
        "place-mispk",
        "place-rvrwy",
        "place-bckhl",
        "place-hsmnl"
      ])

      assert Enum.map(e_stops, & &1.is_terminus?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 true
               ]

      assert Enum.map(e_stops, & &1.is_beginning?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]

      assert Enum.map(d_stops, & &1.branch) ==
               [
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D",
                 "Green-D"
               ]

      assert_stop_ids(d_stops, [
        "place-gover",
        "place-pktrm",
        "place-boyls",
        "place-armnl",
        "place-coecl",
        "place-hymnl",
        "place-kencl",
        "place-fenwy",
        "place-longw",
        "place-bvmnl",
        "place-brkhl",
        "place-bcnfd",
        "place-rsmnl",
        "place-chhil",
        "place-newto",
        "place-newtn",
        "place-eliot",
        "place-waban",
        "place-woodl",
        "place-river"
      ])

      assert Enum.map(d_stops, & &1.is_terminus?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 true
               ]

      assert Enum.map(d_stops, & &1.is_beginning?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]

      assert Enum.map(c_stops, & &1.branch) ==
               [
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C",
                 "Green-C"
               ]

      assert_stop_ids(c_stops, [
        "place-north",
        "place-haecl",
        "place-gover",
        "place-pktrm",
        "place-boyls",
        "place-armnl",
        "place-coecl",
        "place-hymnl",
        "place-kencl",
        "place-smary",
        "place-hwsst",
        "place-kntst",
        "place-stpul",
        "place-cool",
        "place-sumav",
        "place-bndhl",
        "place-fbkst",
        "place-bcnwa",
        "place-tapst",
        "place-denrd",
        "place-engav",
        "place-clmnl"
      ])

      assert Enum.map(c_stops, & &1.is_terminus?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 true
               ]

      assert Enum.map(c_stops, & &1.is_beginning?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]

      assert Enum.map(b_stops, & &1.branch) ==
               [
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 nil,
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B",
                 "Green-B"
               ]

      assert_stop_ids(b_stops, [
        "place-pktrm",
        "place-boyls",
        "place-armnl",
        "place-coecl",
        "place-hymnl",
        "place-kencl",
        "place-bland",
        "place-buest",
        "place-bucen",
        "place-buwst",
        "place-stplb",
        "place-plsgr",
        "place-babck",
        "place-brico",
        "place-harvd",
        "place-grigg",
        "place-alsgr",
        "place-wrnst",
        "place-wascm",
        "place-sthld",
        "place-chswk",
        "place-chill",
        "place-sougr",
        "place-lake"
      ])

      assert Enum.map(b_stops, & &1.is_terminus?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 true
               ]

      assert Enum.map(b_stops, & &1.is_beginning?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]
    end

    test "handles a single Green line" do
      assert [
               %RouteStops{branch: "Park Street - Boston College", stops: stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Green-B"}, 0)

      assert Enum.all?(stops, &(&1.branch == "Park Street - Boston College"))

      assert Enum.map(stops, & &1.is_terminus?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 true
               ]

      assert Enum.map(stops, & &1.is_beginning?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]
    end

    test "handles the E line with the Lechmere shuttle" do
      assert [
               %RouteStops{branch: "North Station - Heath Street", stops: stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Green-E"}, 0)

      assert Enum.all?(stops, &(&1.branch == "North Station - Heath Street"))

      assert Enum.map(stops, & &1.is_terminus?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 true
               ]

      assert Enum.map(stops, & &1.is_beginning?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]
    end

    test "stitches together connecting patterns due to a shuttle on a branching CR line" do
      newburyport_route = %Route{id: "CR-Newburyport"}

      assert [
               %RouteStops{branch: nil, stops: trunk_route_stops},
               %RouteStops{branch: "North Station - Manchester", stops: rockport_route_stops},
               %RouteStops{branch: "North Station - Newburyport", stops: newburyport_route_stops}
             ] = Helpers.get_branch_route_stops(newburyport_route, 0)

      assert Enum.all?(trunk_route_stops, &(&1.branch == nil))

      assert_stop_ids(trunk_route_stops, [
        "place-north",
        "place-ER-0046",
        "place-ER-0099",
        "place-ER-0115",
        "place-ER-0128",
        "place-ER-0168",
        "place-ER-0183"
      ])

      assert Enum.map(trunk_route_stops, & &1.is_terminus?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]

      assert Enum.map(trunk_route_stops, & &1.is_beginning?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]

      assert Enum.all?(rockport_route_stops, &(&1.branch == "North Station - Manchester"))

      assert_stop_ids(rockport_route_stops, [
        "place-GB-0198",
        "place-GB-0222",
        "place-GB-0229",
        "place-GB-0254",
        "place-GB-0296",
        "place-GB-0316",
        "place-GB-0353"
      ])

      assert Enum.map(rockport_route_stops, & &1.is_terminus?) ==
               [
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 true
               ]

      assert Enum.map(rockport_route_stops, & &1.is_beginning?) ==
               [
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]

      assert Enum.all?(newburyport_route_stops, &(&1.branch == "North Station - Newburyport"))

      assert_stop_ids(newburyport_route_stops, [
        "place-ER-0208",
        "place-ER-0227",
        "place-ER-0276",
        "place-ER-0312",
        "place-ER-0362"
      ])

      assert Enum.map(newburyport_route_stops, & &1.is_terminus?) ==
               [
                 false,
                 false,
                 false,
                 false,
                 true
               ]

      assert Enum.map(newburyport_route_stops, & &1.is_beginning?) ==
               [
                 false,
                 false,
                 false,
                 false,
                 false
               ]
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

  describe "by_typicality/2" do
    test "without a selected route pattern, allows (returns true) only RoutePattern with a typicality of 1 through the filter" do
      assert Helpers.by_typicality(%RoutePattern{typicality: 1}, nil)
      refute Helpers.by_typicality(%RoutePattern{typicality: 2}, nil)
    end

    test "with a selected route pattern, allows (returns true) all RoutePatterns through the filter" do
      assert Helpers.by_typicality(%RoutePattern{typicality: 1}, "123")
      assert Helpers.by_typicality(%RoutePattern{typicality: 2}, "123")
    end
  end

  def assert_stop_ids(actual, stop_ids) do
    assert Enum.map(actual, & &1.id) == stop_ids
  end
end
