defmodule DotcomWeb.ScheduleController.Line.HelpersTest do
  use ExUnit.Case, async: true

  import Mox

  alias DotcomWeb.ScheduleController.Line.Helpers
  alias Routes.Route
  alias Stops.RouteStop
  alias Stops.RouteStops
  alias Stops.Stop
  alias Test.Support.Factories
  alias Test.Support.Factories.Routes.Shape

  @stop %Stop{
    id: "110",
    name: "Massachusetts Ave @ Holyoke St",
    type: :stop
  }

  @route_stops %{"1" => [@stop]}

  doctest Helpers

  setup :verify_on_exit!

  describe "get_route/1" do
    test "gets a route given its ID" do
      route_id = Faker.Internet.slug()

      expect(Routes.Repo.Mock, :get, fn id ->
        assert id == route_id
      end)

      assert Helpers.get_route(route_id)
    end

    test "returns :not_found if given a bad route ID" do
      expect(Routes.Repo.Mock, :get, fn _ ->
        nil
      end)

      assert Helpers.get_route("Puce") == :not_found
    end
  end

  describe "get_branch_route_stops/3" do
    @tag :external
    test "returns a list of RouteStops, one for each branch of the line" do
      assert [
               %RouteStops{branch: "Alewife - Ashmont", stops: ashmont_route_stops},
               %RouteStops{branch: "Alewife - Braintree", stops: braintree_route_stops}
             ] = Enum.sort_by(Helpers.get_branch_route_stops(%Route{id: "Red"}, 0), & &1.branch)

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

      assert Enum.map(ashmont_route_stops, & &1.terminus?) ==
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

      assert Enum.map(braintree_route_stops, & &1.terminus?) ==
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

    @tag :external
    test "handles the combined Green line" do
      assert [
               %Stops.RouteStops{branch: "Green-E", stops: e_stops},
               %Stops.RouteStops{branch: "Green-D", stops: d_stops},
               %Stops.RouteStops{branch: "Green-C", stops: c_stops},
               %Stops.RouteStops{branch: "Green-B", stops: b_stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Green"}, 0)

      assert Enum.all?(e_stops, &Enum.member?(["Green-E", nil], &1.branch))

      assert_stop_ids(e_stops, [
        "place-mdftf",
        "place-balsq",
        "place-mgngl",
        "place-gilmn",
        "place-esomr",
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

      assert Enum.map(e_stops, & &1.terminus?) ==
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

      assert Enum.map(d_stops, & &1.terminus?) ==
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

      assert Enum.map(c_stops, & &1.terminus?) ==
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

      assert Enum.map(b_stops, & &1.terminus?) ==
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

    @tag :external
    test "handles a single Green line" do
      assert [
               %RouteStops{branch: "Government Center - Boston College", stops: stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Green-B"}, 0)

      assert Enum.all?(stops, &(&1.branch == "Government Center - Boston College"))

      assert Enum.map(stops, & &1.terminus?) ==
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

    @tag :external
    test "handles the E line" do
      assert [
               %RouteStops{branch: "Medford/Tufts - Heath Street", stops: stops}
             ] = Helpers.get_branch_route_stops(%Route{id: "Green-E"}, 0)

      assert Enum.all?(stops, &(&1.branch == "Medford/Tufts - Heath Street"))

      assert Enum.map(stops, & &1.terminus?) ==
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
                 false,
                 false
               ]
    end

    @tag :external
    test "handles the Hingham-Hull ferry" do
      route_stops = Helpers.get_branch_route_stops(%Route{id: "Boat-F1", type: 4}, 0)

      assert [
               %RouteStops{
                 branch: "Long Wharf - Hingham via Logan Airport & Hull",
                 stops: long_route_stops
               },
               %RouteStops{
                 branch: "Long Wharf - Hingham via Hull",
                 stops: long_hull_route_stops
               },
               %RouteStops{branch: "Rowes Wharf - Hingham", stops: rowe_route_stops} | _others
             ] = route_stops

      assert Enum.all?(
               long_route_stops,
               &String.contains?(&1.branch, "Long Wharf - Hingham")
             )

      long_route_stop_ids = Enum.map(long_route_stops, & &1.id)

      assert long_route_stop_ids == ["Boat-Long", "Boat-Hull", "Boat-Hingham"] ||
               long_route_stop_ids == ["Boat-Long", "Boat-George", "Boat-Hull", "Boat-Hingham"] ||
               long_route_stop_ids == ["Boat-Long", "Boat-Logan", "Boat-Hull", "Boat-Hingham"]

      assert [first | tail] = Enum.map(long_route_stops, & &1.terminus?)
      [last | non_termini] = Enum.reverse(tail)
      assert Enum.all?([first, last])
      refute Enum.all?(non_termini)
      assert [true | non_beginning] = Enum.map(long_route_stops, & &1.is_beginning?)
      assert Enum.all?(non_beginning, &(&1 == false))

      assert Enum.all?(long_hull_route_stops, &(&1.branch == "Long Wharf - Hingham via Hull"))
      assert_stop_ids(long_hull_route_stops, ["Boat-Long", "Boat-Hull", "Boat-Hingham"])
      assert Enum.map(long_hull_route_stops, & &1.terminus?) == [true, false, true]
      assert Enum.map(long_hull_route_stops, & &1.is_beginning?) == [true, false, false]

      assert Enum.all?(rowe_route_stops, &(&1.branch == "Rowes Wharf - Hingham"))
      assert_stop_ids(rowe_route_stops, ["Boat-Rowes", "Boat-Hingham"])
      assert Enum.map(rowe_route_stops, & &1.terminus?) == [true, true]
      assert Enum.map(rowe_route_stops, & &1.is_beginning?) == [true, false]
    end

    @tag :external
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

    @tag :external
    test "handles rail replacement shuttles for CR-Fitchburg stopping at Alewife" do
      fitchburg_route = %Route{id: "CR-Fitchburg"}

      assert [%RouteStops{}] = Helpers.get_branch_route_stops(fitchburg_route, 1),
             "should have only one 'branch'"
    end

    @tag :external
    test "ensures that Forest Hills is in the trunk of every CR-Franklin branch" do
      franklin_route = %Routes.Route{id: "CR-Franklin"}

      assert [%RouteStops{stops: branch_0_1_stops}, %RouteStops{stops: branch_0_2_stops}] =
               Helpers.get_branch_route_stops(franklin_route, 0)

      assert [%RouteStops{stops: branch_1_1_stops}, %RouteStops{stops: branch_1_2_stops}] =
               Helpers.get_branch_route_stops(franklin_route, 1)

      assert Enum.member?(stop_ids(branch_0_1_stops), "place-forhl")
      assert Enum.member?(stop_ids(branch_0_2_stops), "place-forhl")
      assert Enum.member?(stop_ids(branch_1_1_stops), "place-forhl")
      assert Enum.member?(stop_ids(branch_1_2_stops), "place-forhl")
    end

    @tag :external
    test "ensures that Forest Hills is in the trunk of every CR-Providence direction 0 branch" do
      providence_route = %Routes.Route{id: "CR-Providence"}

      assert [%RouteStops{stops: branch_0_1_stops}, %RouteStops{stops: branch_0_2_stops}] =
               Helpers.get_branch_route_stops(providence_route, 0)

      assert Enum.member?(stop_ids(branch_0_1_stops), "place-forhl")
      assert Enum.member?(stop_ids(branch_0_2_stops), "place-forhl")
    end
  end

  describe "get_route_stops" do
    test "gets stops by route for a given route" do
      stub(Stops.Repo.Mock, :by_route, fn route_id, direction_id, _opts ->
        if route_id == "1" and direction_id == 0, do: [@stop], else: []
      end)

      assert Helpers.get_route_stops("1", 0) == @route_stops
    end

    test "handles an error response from the stops function" do
      stub(Stops.Repo.Mock, :by_route, fn _, _, _ -> {:error, "Error"} end)
      assert Helpers.get_route_stops("1", 0) == %{}
    end

    test "gets stops for all Green lines" do
      stub(Stops.Repo.Mock, :by_route, fn _, _, _ ->
        [@stop]
      end)

      assert Helpers.get_route_stops("Green", 0) == %{
               "Green-B" => [@stop],
               "Green-C" => [@stop],
               "Green-D" => [@stop],
               "Green-E" => [@stop]
             }
    end
  end

  describe "get_shapes_by_direction/3 (for cases not tested in line_test)" do
    @tag :external
    test "for ferry" do
      assert Helpers.get_shapes_by_direction("Ferry ID", 4, 0) == []
    end

    test "for bus" do
      route_id = Faker.Internet.slug()
      direction_id = Faker.Util.pick([0, 1])
      shapes = Shape.build_list(5, :shape)

      expect(Routes.Repo.Mock, :get_shapes, 2, fn ^route_id, opts ->
        assert opts[:direction_id] == direction_id

        shapes
      end)

      [shapes_by_direction] = Helpers.get_shapes_by_direction(route_id, 3, direction_id)

      assert shapes_by_direction == route_id |> Helpers.do_get_shapes(direction_id) |> List.first()
    end

    test "for bus without scheduled trips" do
      route_id = Faker.Internet.slug()
      direction_id = Faker.Util.pick([0, 1])

      expect(Routes.Repo.Mock, :get_shapes, fn ^route_id, opts ->
        assert opts[:direction_id] == direction_id

        []
      end)

      assert Helpers.get_shapes_by_direction(route_id, 3, direction_id) == []
    end
  end

  describe "get_branches/4" do
    @tag :flaky
    test "returns a list of RouteStops, one for each branch of the line" do
      stub(Routes.Repo.Mock, :by_stop, fn _, _ -> Factories.Routes.Route.build_list(2, :route) end)

      stub(Stops.Repo.Mock, :get, fn id -> %Stop{id: id} end)
      stub(Stops.Repo.Mock, :get_parent, fn id -> %Stop{id: id} end)
      stub(Stops.Repo.Mock, :stop_features, fn _, _ -> [] end)

      shapes = Shape.build_list(3, :shape)

      stops =
        shapes
        |> Enum.flat_map(& &1.stop_ids)
        |> Enum.map(&%Stop{id: &1})

      route_id = Faker.Internet.slug()

      assert [
               %RouteStops{},
               %RouteStops{},
               %RouteStops{}
             ] =
               Helpers.get_branches(shapes, %{route_id => stops}, %Route{id: route_id}, 0)
    end

    test "returns an empty list when given no stops" do
      route_id = Faker.Internet.slug()
      direction_id = Faker.Util.pick([0, 1])
      stops = %{}
      shapes = Shape.build_list(3, :shape)

      assert Helpers.get_branches(shapes, stops, %Route{id: route_id}, direction_id) == []
    end
  end

  describe "filtered_by_typicality/1" do
    test "finds all most typical route patterns" do
      assert [%{typicality: 1}] =
               Helpers.filtered_by_typicality([
                 %RoutePatterns.RoutePattern{typicality: 1},
                 %RoutePatterns.RoutePattern{typicality: 2},
                 %RoutePatterns.RoutePattern{typicality: 3},
                 %RoutePatterns.RoutePattern{typicality: 4},
                 %RoutePatterns.RoutePattern{typicality: 5}
               ])

      assert [%{typicality: 2}, _, _] =
               Helpers.filtered_by_typicality([
                 %RoutePatterns.RoutePattern{typicality: 2},
                 %RoutePatterns.RoutePattern{typicality: 2},
                 %RoutePatterns.RoutePattern{typicality: 2},
                 %RoutePatterns.RoutePattern{typicality: 4},
                 %RoutePatterns.RoutePattern{typicality: 5}
               ])
    end
  end

  describe "get_stop_tree_or_lists/2" do
    setup do
      test_route_stops = [
        %RouteStops{
          branch: "Branch-A",
          stops: [
            %RouteStop{id: "a"},
            %RouteStop{id: "b"},
            %RouteStop{id: "c"},
            %RouteStop{id: "d"}
          ]
        },
        %RouteStops{
          branch: "Branch-B",
          stops: [
            %RouteStop{id: "a"},
            %RouteStop{id: "b"},
            %RouteStop{id: "e"},
            %RouteStop{id: "f"}
          ]
        }
      ]

      {:ok, route_stops: test_route_stops}
    end

    test "returns tree for rail route types", %{route_stops: route_stops} do
      assert {%UnrootedPolytree{}, nil} = Helpers.get_stop_tree_or_lists(route_stops, 0)
      assert {%UnrootedPolytree{}, nil} = Helpers.get_stop_tree_or_lists(route_stops, 1)
      assert {%UnrootedPolytree{}, nil} = Helpers.get_stop_tree_or_lists(route_stops, 2)
    end

    test "returns list for bus route type", %{route_stops: route_stops} do
      assert {nil, stops_lists} = Helpers.get_stop_tree_or_lists(route_stops, 3)
      assert [[%RouteStop{} | _], [%RouteStop{} | _]] = stops_lists
    end

    test "returns neither for ferry route type", %{route_stops: route_stops} do
      assert {nil, nil} = Helpers.get_stop_tree_or_lists(route_stops, 4)
    end
  end

  def assert_stop_ids(actual, stop_ids) do
    assert Enum.map(actual, & &1.id) == stop_ids
  end

  defp stop_ids(stops), do: Enum.map(stops, & &1.id)
end
