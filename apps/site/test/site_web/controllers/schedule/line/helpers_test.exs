defmodule SiteWeb.ScheduleController.Line.HelpersTest do
  use ExUnit.Case, async: true

  alias Routes.{Route}
  alias RoutePatterns.RoutePattern
  alias SiteWeb.ScheduleController.Line.Helpers
  alias Stops.{RouteStops, Stop}

  doctest Helpers

  @routes_repo_api Application.get_env(:routes, :routes_repo_api)

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
      assert Helpers.get_route("") == :not_found
    end
  end

  describe "get_branch_route_stops/3" do
    @tag skip: "We'll mock route patterns soon"
    test "does not return branches for route patterns from multi trip routes"

    test "returns a list of RouteStops, one for each branch of the line" do
      assert [
               %RouteStops{branch: "Alewife - Ashmont", stops: ashmont_route_stops},
               %RouteStops{branch: "Alewife - Braintree", stops: braintree_route_stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Red"}, 0)

      assert Enum.all?(ashmont_route_stops, &(&1.branch == "Alewife - Ashmont"))

      assert_stop_ids(ashmont_route_stops, [
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
        "place-jfk",
        "place-shmnl",
        "place-fldcr",
        "place-smmnl",
        "place-asmnl"
      ])

      assert Enum.map(ashmont_route_stops, & &1.is_terminus?) ==
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
                 true
               ]

      assert Enum.map(ashmont_route_stops, & &1.is_beginning?) ==
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
                 false
               ]

      assert Enum.all?(braintree_route_stops, &(&1.branch == "Alewife - Braintree"))

      assert_stop_ids(braintree_route_stops, [
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
        "place-jfk",
        "place-nqncy",
        "place-wlsta",
        "place-qnctr",
        "place-qamnl",
        "place-brntn"
      ])

      assert Enum.map(braintree_route_stops, & &1.is_terminus?) ==
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
                 true
               ]

      assert Enum.map(braintree_route_stops, & &1.is_beginning?) ==
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
                 false
               ]
    end

    test "handles the combined Green line" do
      assert [
               %Stops.RouteStops{branch: "Green-E", stops: e_stops},
               %Stops.RouteStops{branch: "Green-D", stops: d_stops},
               %Stops.RouteStops{branch: "Green-C", stops: c_stops},
               %Stops.RouteStops{branch: "Green-B", stops: b_stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Green"}, 0)

      assert Enum.all?(e_stops, &Enum.member?(["Green-E", nil], &1.branch))

      assert_stop_ids(e_stops, [
        # As of 8/2022, the E line running to Union Square has been suspended
        # "place-unsqu",
        "place-lech",
        "place-spmnl",
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
                 # As of 8/2022, the E line running to Union Square has been suspended
                 #  false,
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
                 # As of 8/2022, the E line running to Union Square has been suspended
                 #  false,
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

      assert Enum.all?(d_stops, &Enum.member?(["Green-D", nil], &1.branch))

      assert_stop_ids(d_stops, [
        "place-unsqu",
        "place-lech",
        "place-spmnl",
        "place-north",
        "place-haecl",
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
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]

      assert Enum.all?(c_stops, &Enum.member?(["Green-C", nil], &1.branch))

      assert_stop_ids(c_stops, [
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
                 false
               ]

      assert Enum.all?(b_stops, &Enum.member?(["Green-B", nil], &1.branch))

      assert_stop_ids(b_stops, [
        "place-gover",
        "place-pktrm",
        "place-boyls",
        "place-armnl",
        "place-coecl",
        "place-hymnl",
        "place-kencl",
        "place-bland",
        "place-buest",
        "place-bucen",
        "place-amory",
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
                 false
               ]
    end

    test "handles a single Green line" do
      assert [
               %RouteStops{branch: "Government Center - Boston College", stops: stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Green-B"}, 0)

      assert Enum.all?(stops, &(&1.branch == "Government Center - Boston College"))

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
                 false
               ]
    end

    test "handles the E line" do
      assert [
               # As of 8/2022, the E line running to Union Square has been suspended
               #  %RouteStops{branch: "Union Square - Heath Street", stops: stops}
               %RouteStops{branch: "Lechmere - Heath Street", stops: stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Green-E"}, 0)

      # As of 8/2022, the E line running to Union Square has been suspended
      # assert Enum.all?(stops, &(&1.branch == "Union Square - Heath Street"))
      assert Enum.all?(stops, &(&1.branch == "Lechmere - Heath Street"))

      assert Enum.map(stops, & &1.is_terminus?) ==
               [
                 true,
                 # As of 8/2022, the E line running to Union Square has been suspended
                 #  false,
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
                 # As of 8/2022, the E line running to Union Square has been suspended
                 #  false,
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

    test "handles the Hingham-Hull ferry" do
      [
        %RouteStops{
          branch: "Long Wharf - Hingham via Logan Airport & Hull",
          stops: long_route_stops
        },
        %RouteStops{branch: "Rowes Wharf - Hingham", stops: rowe_route_stops}
      ] = Helpers.get_branch_route_stops(%Route{id: "Boat-F1"}, 0)

      assert Enum.all?(
               long_route_stops,
               &String.contains?(&1.branch, "Long Wharf - Hingham")
             )

      long_route_stop_ids = Enum.map(long_route_stops, & &1.id)

      assert long_route_stop_ids == ["Boat-Long", "Boat-Hull", "Boat-Hingham"] ||
               long_route_stop_ids == ["Boat-Long", "Boat-George", "Boat-Hull", "Boat-Hingham"] ||
               long_route_stop_ids == ["Boat-Long", "Boat-Logan", "Boat-Hull", "Boat-Hingham"]

      assert [first | tail] = Enum.map(long_route_stops, & &1.is_terminus?)
      [last | non_termini] = Enum.reverse(tail)
      assert Enum.all?([first, last])
      refute Enum.all?(non_termini)
      assert [true | non_beginning] = Enum.map(long_route_stops, & &1.is_beginning?)
      assert Enum.all?(non_beginning, &(&1 == false))

      assert Enum.all?(rowe_route_stops, &(&1.branch == "Rowes Wharf - Hingham"))
      assert_stop_ids(rowe_route_stops, ["Boat-Rowes", "Boat-Hingham"])
      assert Enum.map(rowe_route_stops, & &1.is_terminus?) == [true, true]
      assert Enum.map(rowe_route_stops, & &1.is_beginning?) == [true, false]
    end

    test "handles CR-Kingston, returning one branch whose stops cover all route patterns" do
      plymouth_route = %Route{id: "CR-Kingston"}

      assert [%RouteStops{stops: plymouth_route_stops}] =
               Helpers.get_branch_route_stops(plymouth_route, 0),
             "should have only one 'branch'"

      assert_stop_ids(
        plymouth_route_stops,
        [
          "place-sstat",
          "place-jfk",
          "place-qnctr",
          "place-brntn",
          "place-PB-0158",
          "place-PB-0194",
          "place-PB-0212",
          "place-PB-0245",
          "place-PB-0281",
          "place-KB-0351"
        ]
      )
    end

    test "handles rail replacement shuttles for CR-Fitchburg stopping at Alewife" do
      fitchburg_route = %Route{id: "CR-Fitchburg"}

      assert [%RouteStops{}] = Helpers.get_branch_route_stops(fitchburg_route, 1),
             "should have only one 'branch'"
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

  describe "get_shapes_by_direction/3 (for cases not tested in line_test)" do
    test "for ferry" do
      assert Helpers.get_shapes_by_direction("Ferry ID", 4, 0) == []
    end

    test "for bus" do
      assert Helpers.get_shapes_by_direction("1", 3, 0) == Helpers.do_get_shapes("1", 0)

      assert @routes_repo_api.get_shapes("1", direction_id: 0) == [
               %Routes.Shape{
                 direction_id: 0,
                 id: "010090",
                 name: "Nubian Station - Harvard Square",
                 polyline: "polyline",
                 priority: 3,
                 stop_ids: [
                   "place-nubn",
                   "1",
                   "2",
                   "6",
                   "10003",
                   "57",
                   "58",
                   "10590",
                   "87",
                   "188",
                   "89",
                   "91",
                   "93",
                   "95",
                   "97",
                   "99",
                   "101",
                   "102",
                   "104",
                   "106",
                   "107",
                   "108",
                   "109",
                   "110"
                 ]
               }
             ]
    end

    test "for bus without scheduled trips" do
      assert Helpers.get_shapes_by_direction("27", 3, 0) == []
    end
  end

  describe "get_branches/4" do
    test "returns a list of RouteStops, one for each branch of the line" do
      stops = Helpers.get_route_stops("Red", 0, &Stops.Repo.by_route/3)
      shapes = @routes_repo_api.get_shapes("Red", direction_id: 0)

      assert [%RouteStops{}, %RouteStops{}, %RouteStops{}] =
               Helpers.get_branches(shapes, stops, %Route{id: "Red"}, 0)
    end

    test "returns RouteStops for all Green line branches" do
      stops = Helpers.get_route_stops("Green", 0, &Stops.Repo.by_route/3)
      shapes = Helpers.get_shapes_by_direction("Green", 0, 0)

      assert [%RouteStops{}, %RouteStops{}, %RouteStops{}, %RouteStops{}] =
               Helpers.get_branches(shapes, stops, %Route{id: "Green"}, 0)
    end

    test "returns an empty list when given no stops" do
      stops = %{}
      shapes = @routes_repo_api.get_shapes("Red", direction_id: 0)

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
