defmodule Stops.RouteStopsTest do
  use ExUnit.Case, async: true

  import Mox

  alias Routes.Route
  alias Stops.RouteStop
  alias Stops.RouteStops
  alias Stops.Stop
  alias Test.Support.Factories.Routes.Shape
  alias Test.Support.Factories.Stops.Stop

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @red %Route{id: "Red", type: 1}

  setup :verify_on_exit!

  describe "from_route_stop_groups/1" do
    test "makes a RouteStops struct for each list of RouteStop structs" do
      route = %Route{id: "Red", type: 1}

      shared_route_stop = %RouteStop{
        id: "place-alfcl",
        name: "Alewife",
        route: route
      }

      braintree_route_stops = [
        %RouteStop{
          shared_route_stop
          | branch: "Alewife - Braintree"
        },
        %RouteStop{
          branch: "Alewife - Braintree",
          id: "place-brntn",
          name: "Braintree",
          route: route
        }
      ]

      ashmont_route_stops = [
        %RouteStop{
          shared_route_stop
          | branch: "Alewife - Ashmont"
        },
        %RouteStop{
          branch: "Alewife - Ashmont",
          id: "place-asmnl",
          name: "Ashmont",
          route: route
        }
      ]

      route_patern_groups = [
        braintree_route_stops,
        ashmont_route_stops
      ]

      assert [
               %RouteStops{
                 branch: "Alewife - Braintree",
                 stops: ^braintree_route_stops
               },
               %RouteStops{
                 branch: "Alewife - Ashmont",
                 stops: ^ashmont_route_stops
               }
             ] = RouteStops.from_route_stop_groups(route_patern_groups)
    end

    test "supports branching in both directions" do
      route_b = %Route{id: "Green-B", name: "Green Line B", type: 0}
      route_c = %Route{id: "Green-C", name: "Green Line C", type: 0}
      route_d = %Route{id: "Green-D", name: "Green Line D", type: 0}
      route_e = %Route{id: "Green-E", name: "Green Line E", type: 0}

      b_route_stops = [
        %RouteStop{
          branch: nil,
          id: "place-gover",
          name: "Government Center",
          route: route_b
        },
        %RouteStop{
          branch: nil,
          id: "place-coecl",
          name: "Copley",
          route: route_b
        },
        %RouteStop{
          branch: nil,
          id: "place-hymnl",
          name: "Hynes Convention Center",
          route: route_b
        },
        %RouteStop{
          branch: nil,
          id: "place-kencl",
          name: "Kenmore",
          route: route_b
        },
        %RouteStop{
          branch: "Green-B",
          id: "place-bland",
          name: "Blandford Street",
          route: route_b
        },
        %RouteStop{
          branch: "Green-B",
          id: "place-lake",
          name: "Boston College",
          route: route_b
        }
      ]

      c_route_stops = [
        %RouteStop{
          branch: nil,
          id: "place-gover",
          name: "Government Center",
          route: route_c
        },
        %RouteStop{
          branch: nil,
          id: "place-coecl",
          name: "Copley",
          route: route_c
        },
        %RouteStop{
          branch: nil,
          id: "place-hymnl",
          name: "Hynes Convention Center",
          route: route_c
        },
        %RouteStop{
          branch: nil,
          id: "place-kencl",
          name: "Kenmore",
          route: route_c
        },
        %RouteStop{
          branch: "Green-C",
          id: "place-smary",
          name: "Saint Mary's Street",
          route: route_c
        },
        %RouteStop{
          branch: "Green-C",
          id: "place-clmnl",
          name: "Cleveland Circle",
          route: route_c
        }
      ]

      d_route_stops = [
        %RouteStop{
          branch: "Green-D",
          id: "place-unsqu",
          name: "Union Square",
          route: route_d
        },
        %RouteStop{
          branch: nil,
          id: "place-lech",
          name: "Lechmere",
          route: route_d
        },
        %RouteStop{
          branch: nil,
          id: "place-spmnl",
          name: "Science Park/West End",
          route: route_d
        },
        %RouteStop{
          branch: nil,
          id: "place-north",
          name: "North Station",
          route: route_d
        },
        %RouteStop{
          branch: nil,
          id: "place-haecl",
          name: "Haymarket",
          route: route_d
        },
        %RouteStop{
          branch: nil,
          id: "place-gover",
          name: "Government Center",
          route: route_d
        },
        %RouteStop{
          branch: nil,
          id: "place-coecl",
          name: "Copley",
          route: route_d
        },
        %RouteStop{
          branch: nil,
          id: "place-hymnl",
          name: "Hynes Convention Center",
          route: route_d
        },
        %RouteStop{
          branch: nil,
          id: "place-kencl",
          name: "Kenmore",
          route: route_d
        },
        %RouteStop{
          branch: "Green-D",
          id: "place-fenwy",
          name: "Fenway",
          route: route_d
        },
        %RouteStop{
          branch: "Green-D",
          id: "place-river",
          name: "Riverside",
          route: route_d
        }
      ]

      e_route_stops = [
        %RouteStop{
          branch: "Green-E",
          id: "place-mdftf",
          name: "Medford/Tufts",
          route: route_e
        },
        %RouteStop{
          branch: "Green-E",
          id: "place-esomr",
          name: "East Somerville",
          route: route_e
        },
        %RouteStop{
          branch: nil,
          id: "place-lech",
          name: "Lechmere",
          route: route_e
        },
        %RouteStop{
          branch: nil,
          id: "place-spmnl",
          name: "Science Park/West End",
          route: route_e
        },
        %RouteStop{
          branch: nil,
          id: "place-north",
          name: "North Station",
          route: route_e
        },
        %RouteStop{
          branch: nil,
          id: "place-haecl",
          name: "Haymarket",
          route: route_e
        },
        %RouteStop{
          branch: nil,
          id: "place-gover",
          name: "Government Center",
          route: route_e
        },
        %RouteStop{
          branch: nil,
          id: "place-coecl",
          name: "Copley",
          route: route_e
        },
        %RouteStop{
          branch: "Green-E",
          id: "place-prmnl",
          name: "Prudential",
          route: route_e
        },
        %RouteStop{
          branch: "Green-E",
          id: "place-hsmnl",
          name: "Heath Street",
          route: route_e
        }
      ]

      route_stop_groups = [
        e_route_stops,
        d_route_stops,
        c_route_stops,
        b_route_stops
      ]

      assert [
               %RouteStops{branch: "Green-E", stops: ^e_route_stops},
               %RouteStops{branch: "Green-D", stops: ^d_route_stops},
               %RouteStops{branch: "Green-C", stops: ^c_route_stops},
               %RouteStops{branch: "Green-B", stops: ^b_route_stops}
             ] = RouteStops.from_route_stop_groups(route_stop_groups)
    end
  end

  describe "by_direction/2 returns a list of stops in one direction in the correct order" do
    @tag :external
    test "for Red Line, direction: 0" do
      stops = Stops.Repo.by_route("Red", 0)
      shapes = @routes_repo.get_shapes("Red", direction_id: 0)
      stops = RouteStops.by_direction(stops, shapes, @red, 0)
      [core, braintree, ashmont] = stops
      assert %RouteStops{branch: nil, stops: unbranched_stops} = core
      assert %RouteStops{branch: "Alewife - Braintree", stops: braintree_stops} = braintree
      assert %RouteStops{branch: "Alewife - Ashmont", stops: ashmont_stops} = ashmont

      assert Enum.map(unbranched_stops, & &1.name) == [
               "Alewife",
               "Davis",
               "Porter",
               "Harvard",
               "Central",
               "Kendall/MIT",
               "Charles/MGH",
               "Park Street",
               "Downtown Crossing",
               "South Station",
               "Broadway",
               "Andrew",
               "JFK/UMass"
             ]

      [alewife | _] = unbranched_stops
      assert alewife.terminus? == true
      assert alewife.zone == nil
      assert alewife.branch == nil
      assert alewife.stop_features == [:bus, :access, :parking_lot]

      jfk = List.last(unbranched_stops)
      assert jfk.name == "JFK/UMass"
      assert jfk.branch == nil
      assert jfk.stop_features == [:bus, :commuter_rail, :access]
      assert jfk.terminus? == false

      assert [savin | _] = ashmont_stops
      assert savin.name == "Savin Hill"
      assert savin.branch == "Alewife - Ashmont"
      assert savin.stop_features == [:access, :parking_lot]
      assert savin.terminus? == false

      ashmont = List.last(ashmont_stops)
      assert ashmont.name == "Ashmont"
      assert ashmont.branch == "Alewife - Ashmont"
      assert ashmont.stop_features == [:mattapan_line, :bus, :access]
      assert ashmont.terminus? == true

      [north_quincy | _] = braintree_stops
      assert north_quincy.name == "North Quincy"
      assert north_quincy.branch == "Alewife - Braintree"
      assert north_quincy.stop_features == [:bus, :access, :parking_lot]
      assert north_quincy.terminus? == false

      braintree = List.last(braintree_stops)
      assert braintree.name == "Braintree"
      assert braintree.branch == "Alewife - Braintree"
      assert braintree.stop_features == [:bus, :commuter_rail, :access, :parking_lot]
      assert braintree.terminus? == true
    end

    @tag :external
    test "for Red Line, direction: 1" do
      stops = Stops.Repo.by_route("Red", 1)
      shapes = @routes_repo.get_shapes("Red", direction_id: 1)
      stops = RouteStops.by_direction(stops, shapes, @red, 1)

      [ashmont, braintree, core] = stops
      assert %RouteStops{branch: "Ashmont - Alewife", stops: ashmont_stops} = ashmont
      assert %RouteStops{branch: "Braintree - Alewife", stops: braintree_stops} = braintree
      assert %RouteStops{branch: nil, stops: _unbranched_stops} = core

      [ashmont | _] = ashmont_stops
      assert ashmont.name == "Ashmont"
      assert ashmont.branch == "Ashmont - Alewife"
      assert ashmont.terminus? == true

      savin = List.last(ashmont_stops)
      assert savin.name == "Savin Hill"
      assert savin.branch == "Ashmont - Alewife"
      assert savin.terminus? == false

      [braintree | _] = braintree_stops
      assert braintree.name == "Braintree"
      assert braintree.branch == "Braintree - Alewife"
      assert braintree.stop_features == [:bus, :commuter_rail, :access, :parking_lot]
      assert braintree.terminus? == true

      n_quincy = List.last(braintree_stops)
      assert n_quincy.name == "North Quincy"
      assert n_quincy.branch == "Braintree - Alewife"
      assert n_quincy.terminus? == false
    end

    @tag :external
    test "works for green E line" do
      route = %Route{id: "Green-E", type: 0}
      shapes = @routes_repo.get_shapes("Green-E", direction_id: 0)
      stops = Stops.Repo.by_route("Green-E", 0)
      stops = RouteStops.by_direction(stops, shapes, route, 0)

      # As of June 2020, Lechmere has been closed so the commented line will make the test fail.
      # We are temporarily adding the fix but this will need to be undone later on.
      # assert [
      #          %RouteStops{
      #            stops: [%RouteStop{id: "place-lech", terminus?: true} | _]
      #          }
      #        ] = stops
      # As of Aug 2022, the Green Line past North Station is temporarily suspended.
      # assert [
      #          %RouteStops{
      #            stops: [%RouteStop{id: "place-north", terminus?: true} | _]
      #          }
      #        ] = stops
      assert [
               %RouteStops{
                 stops: [%RouteStop{id: "place-north", terminus?: true} | _]
               }
             ] = stops
    end

    @tag :external
    test "works for green non-E line" do
      route = %Route{id: "Green-D", type: 0}
      shapes = @routes_repo.get_shapes("Green-D", direction_id: 0)
      stops = Stops.Repo.by_route("Green-D", 0)
      stops = RouteStops.by_direction(stops, shapes, route, 0)

      assert [
               %RouteStops{
                 stops: [%RouteStop{id: "place-gover", terminus?: true} | _] = d_stops
               }
             ] = stops

      assert %RouteStop{id: "place-river", terminus?: true} = List.last(d_stops)
    end

    @tag :external
    test "works for Kingston line (outbound)" do
      route = %Route{id: "CR-Kingston", type: 2}
      shapes = @routes_repo.get_shapes("CR-Kingston", direction_id: 0)
      stops = Stops.Repo.by_route("CR-Kingston", 0)
      route_stops = RouteStops.by_direction(stops, shapes, route, 0)

      case route_stops do
        [core, plymouth, kingston] ->
          assert %RouteStops{
                   branch: nil,
                   stops: [%RouteStop{id: "place-sstat"} | _unbranched_stops]
                 } = core

          assert %RouteStops{branch: "Plymouth", stops: [%RouteStop{id: "Plymouth"}]} = plymouth

          assert %RouteStops{branch: "Kingston", stops: [%RouteStop{id: "Kingston"}]} = kingston

        [shape] ->
          assert %RouteStops{stops: [%RouteStop{id: "place-sstat"} | _]} = shape
      end
    end

    @tag :external
    test "works for Providence line (inbound)" do
      route = %Route{id: "CR-Providence", type: 2}
      shapes = @routes_repo.get_shapes("CR-Providence", direction_id: 1)
      stops = Stops.Repo.by_route("CR-Providence", 1)
      route_stops = RouteStops.by_direction(stops, shapes, route, 1)

      [wickford, stoughton, trunk] = route_stops

      assert %RouteStops{
               stops: [%RouteStop{id: "place-NEC-1659"} | _]
             } = wickford

      assert %RouteStops{
               stops: [%RouteStop{id: "place-SB-0189"} | _]
             } = stoughton

      assert %RouteStops{
               stops: [%RouteStop{id: "place-NEC-2139"} | _]
             } = trunk
    end

    @tag :external
    test "works for bus routes" do
      stops = Stops.Repo.by_route("1", 0)
      shapes = @routes_repo.get_shapes("1", direction_id: 0)
      route = %Route{id: "1", type: 3}

      [%RouteStops{branch: "Nubian Station - Harvard Square", stops: outbound}] =
        RouteStops.by_direction(stops, shapes, route, 0)

      assert is_list(outbound)
      assert Enum.all?(outbound, &(&1.branch == "Nubian Station - Harvard Square"))
      assert outbound |> List.first() |> Map.get(:terminus?) == true
      assert outbound |> Enum.slice(1..-2//1) |> Enum.all?(&(&1.terminus? == false))

      stops = Stops.Repo.by_route("1", 1)
      shapes = @routes_repo.get_shapes("1", direction_id: 1)
      route = %Route{id: "1", type: 3}

      [%RouteStops{branch: "Harvard Square - Nubian Station", stops: inbound}] =
        RouteStops.by_direction(stops, shapes, route, 1)

      assert Enum.all?(inbound, &(&1.branch == "Harvard Square - Nubian Station"))
      assert inbound |> List.first() |> Map.get(:terminus?) == true
    end

    @tag :external
    test "works for ferry routes" do
      stops = Stops.Repo.by_route("Boat-F4", 0)
      shapes = @routes_repo.get_shapes("Boat-F4", direction_id: 0)
      route = %Route{id: "Boat-F4", type: 4}

      [%RouteStops{branch: branch, stops: stops}] =
        RouteStops.by_direction(stops, shapes, route, 0)

      assert branch =~ "Charlestown"
      assert Enum.all?(stops, &(&1.__struct__ == RouteStop))
    end

    test "doesn't crash if we didn't have stops and/or shapes" do
      Stops.Repo.Mock
      |> stub(:get_parent, fn _ -> Stop.build(:stop) end)
      |> stub(:get, fn _ -> Stop.build(:stop) end)
      |> stub(:stop_features, fn _, _ -> [] end)

      direction_id = 0
      good_stops = Stop.build_list(4, :stop)
      good_shapes = Shape.build_list(3, :shape)

      for stops <- [[], good_stops], shapes <- [[], good_shapes], stops == [] or shapes == [] do
        actual = RouteStops.by_direction(stops, shapes, @red, direction_id)
        assert is_list(actual)
      end
    end
  end

  describe "from_list/1" do
    test "uses the list of route stops and takes the branch from the first item" do
      route_stops = [
        %RouteStop{
          branch: "TEST BRANCH",
          closed_stop_info: nil,
          connections: [],
          id: "place-alfcl",
          is_beginning?: true,
          terminus?: true,
          name: "Alewife",
          route: %Route{
            color: "DA291C",
            description: :rapid_transit,
            id: "Red",
            name: "Red Line",
            type: 1
          },
          station_info: %Stops.Stop{
            id: "place-alfcl",
            name: "Alewife",
            type: :station
          }
        }
      ]

      expected = %RouteStops{
        branch: "TEST BRANCH",
        stops: route_stops
      }

      assert RouteStops.from_list(route_stops) == expected
    end

    test "it handles route stops being []" do
      assert RouteStops.from_list([]) == %Stops.RouteStops{branch: nil, stops: []}
    end
  end
end
