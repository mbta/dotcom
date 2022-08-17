defmodule Stops.RouteStopsTest do
  use ExUnit.Case

  alias Routes.Route
  alias Stops.{RouteStop, RouteStops, Stop}

  @routes_repo_api Application.get_env(:routes, :routes_repo_api)

  @red %Route{id: "Red", type: 1}

  describe "from_route_stop_groups" do
    test "makes a RouteStops struct for each list of RouteStop structs" do
      route = %Route{id: "Red", type: 1}

      nil_route_stop = %RouteStop{
        branch: nil,
        id: "place-alfcl",
        name: "Alewife",
        route: route,
        station_info: %Stops.Stop{
          id: "place-alfcl",
          name: "Alewife"
        }
      }

      braintree_route_stop = %RouteStop{
        nil_route_stop
        | branch: "Alewife - Braintree"
      }

      ashmont_route_stop = %RouteStop{
        nil_route_stop
        | branch: "Alewife - Ashmont"
      }

      route_patern_groups = [
        [nil_route_stop],
        [braintree_route_stop],
        [ashmont_route_stop]
      ]

      assert [
               %RouteStops{
                 branch: nil,
                 stops: [nil_route_stop]
               },
               %RouteStops{
                 branch: "Alewife - Braintree",
                 stops: [braintree_route_stop]
               },
               %RouteStops{
                 branch: "Alewife - Ashmont",
                 stops: [ashmont_route_stop]
               }
             ] = RouteStops.from_route_stop_groups(route_patern_groups)
    end
  end

  describe "by_direction/2 returns a list of stops in one direction in the correct order" do
    test "for Red Line, direction: 0" do
      stops = Stops.Repo.by_route("Red", 0)
      shapes = @routes_repo_api.get_shapes("Red", direction_id: 0)
      stops = RouteStops.by_direction(stops, shapes, @red, 0)
      [core, braintree, ashmont] = stops
      assert %RouteStops{branch: nil, stops: unbranched_stops} = core
      assert %RouteStops{branch: "Alewife - Braintree", stops: braintree_stops} = braintree
      assert %RouteStops{branch: "Alewife - Ashmont", stops: ashmont_stops} = ashmont

      assert unbranched_stops |> Enum.map(& &1.name) == [
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
      assert alewife.is_terminus? == true
      assert alewife.zone == nil
      assert alewife.branch == nil
      assert alewife.stop_features == [:bus, :access, :parking_lot]

      jfk = List.last(unbranched_stops)
      assert jfk.name == "JFK/UMass"
      assert jfk.branch == nil
      assert jfk.stop_features == [:bus, :commuter_rail, :access]
      assert jfk.is_terminus? == false

      assert [savin | _] = ashmont_stops
      assert savin.name == "Savin Hill"
      assert savin.branch == "Alewife - Ashmont"
      assert savin.stop_features == [:access, :parking_lot]
      assert savin.is_terminus? == false

      ashmont = List.last(ashmont_stops)
      assert ashmont.name == "Ashmont"
      assert ashmont.branch == "Alewife - Ashmont"
      assert ashmont.stop_features == [:mattapan_line, :bus, :access]
      assert ashmont.is_terminus? == true

      [north_quincy | _] = braintree_stops
      assert north_quincy.name == "North Quincy"
      assert north_quincy.branch == "Alewife - Braintree"
      assert north_quincy.stop_features == [:bus, :access, :parking_lot]
      assert north_quincy.is_terminus? == false

      braintree = List.last(braintree_stops)
      assert braintree.name == "Braintree"
      assert braintree.branch == "Alewife - Braintree"
      assert braintree.stop_features == [:bus, :commuter_rail, :access, :parking_lot]
      assert braintree.is_terminus? == true
    end

    test "for Red Line, direction: 1" do
      stops = Stops.Repo.by_route("Red", 1)
      shapes = @routes_repo_api.get_shapes("Red", direction_id: 1)
      stops = RouteStops.by_direction(stops, shapes, @red, 1)

      [ashmont, braintree, core] = stops
      assert %RouteStops{branch: "Ashmont - Alewife", stops: ashmont_stops} = ashmont
      assert %RouteStops{branch: "Braintree - Alewife", stops: braintree_stops} = braintree
      assert %RouteStops{branch: nil, stops: _unbranched_stops} = core

      [ashmont | _] = ashmont_stops
      assert ashmont.name == "Ashmont"
      assert ashmont.branch == "Ashmont - Alewife"
      assert ashmont.is_terminus? == true

      savin = List.last(ashmont_stops)
      assert savin.name == "Savin Hill"
      assert savin.branch == "Ashmont - Alewife"
      assert savin.is_terminus? == false

      [braintree | _] = braintree_stops
      assert braintree.name == "Braintree"
      assert braintree.branch == "Braintree - Alewife"
      assert braintree.stop_features == [:bus, :commuter_rail, :access, :parking_lot]
      assert braintree.is_terminus? == true

      n_quincy = List.last(braintree_stops)
      assert n_quincy.name == "North Quincy"
      assert n_quincy.branch == "Braintree - Alewife"
      assert n_quincy.is_terminus? == false
    end

    test "works for green E line" do
      route = %Route{id: "Green-E", type: 0}
      shapes = @routes_repo_api.get_shapes("Green-E", direction_id: 0)
      stops = Stops.Repo.by_route("Green-E", 0)
      stops = RouteStops.by_direction(stops, shapes, route, 0)

      # As of June 2020, Lechmere has been closed so the commented line will make the test fail.
      # We are temporarily adding the fix but this will need to be undone later on.
      # assert [
      #          %RouteStops{
      #            stops: [%RouteStop{id: "place-lech", is_terminus?: true} | _]
      #          }
      #        ] = stops
      # As of Aug 2022, the Green Line past Government Center is temporarily suspended.
      # assert [
      #          %RouteStops{
      #            stops: [%RouteStop{id: "place-north", is_terminus?: true} | _]
      #          }
      #        ] = stops
      assert [
               %RouteStops{
                 stops: [%RouteStop{id: "place-gover", is_terminus?: true} | _]
               }
             ] = stops
    end

    test "works for green non-E line" do
      route = %Route{id: "Green-D", type: 0}
      shapes = @routes_repo_api.get_shapes("Green-D", direction_id: 0)
      stops = Stops.Repo.by_route("Green-D", 0)
      stops = RouteStops.by_direction(stops, shapes, route, 0)

      assert [
               %RouteStops{
                 stops: [%RouteStop{id: "place-gover", is_terminus?: true} | _] = d_stops
               }
             ] = stops

      assert %RouteStop{id: "place-river", is_terminus?: true} = List.last(d_stops)
    end

    test "works for Kingston line (outbound)" do
      route = %Route{id: "CR-Kingston", type: 2}
      shapes = @routes_repo_api.get_shapes("CR-Kingston", direction_id: 0)
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

    test "works for Providence line (inbound)" do
      route = %Route{id: "CR-Providence", type: 2}
      shapes = @routes_repo_api.get_shapes("CR-Providence", direction_id: 1)
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

    test "works for bus routes" do
      stops = Stops.Repo.by_route("1", 0)
      shapes = @routes_repo_api.get_shapes("1", direction_id: 0)
      route = %Route{id: "1", type: 3}

      [%RouteStops{branch: "Nubian Station - Harvard Square", stops: outbound}] =
        RouteStops.by_direction(stops, shapes, route, 0)

      assert is_list(outbound)
      assert Enum.all?(outbound, &(&1.branch == "Nubian Station - Harvard Square"))
      assert outbound |> List.first() |> Map.get(:is_terminus?) == true
      assert outbound |> Enum.slice(1..-2) |> Enum.all?(&(&1.is_terminus? == false))

      stops = Stops.Repo.by_route("1", 1)
      shapes = @routes_repo_api.get_shapes("1", direction_id: 1)
      route = %Route{id: "1", type: 3}

      [%RouteStops{branch: "Harvard Square - Nubian Station", stops: inbound}] =
        RouteStops.by_direction(stops, shapes, route, 1)

      assert Enum.all?(inbound, &(&1.branch == "Harvard Square - Nubian Station"))
      assert inbound |> List.first() |> Map.get(:is_terminus?) == true
    end

    test "works for ferry routes" do
      stops = Stops.Repo.by_route("Boat-F4", 0)
      shapes = @routes_repo_api.get_shapes("Boat-F4", direction_id: 0)
      route = %Route{id: "Boat-F4", type: 4}

      [%RouteStops{branch: branch, stops: stops}] =
        RouteStops.by_direction(stops, shapes, route, 0)

      assert branch =~ "Charlestown"
      assert Enum.all?(stops, &(&1.__struct__ == RouteStop))
    end

    test "doesn't crash if we didn't have stops and/or shapes" do
      direction_id = 0
      good_stops = Stops.Repo.by_route("Red", direction_id)
      good_shapes = @routes_repo_api.get_shapes("Red", direction_id: direction_id)

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
          is_terminus?: true,
          name: "Alewife",
          route: %Route{
            color: "DA291C",
            description: :rapid_transit,
            id: "Red",
            name: "Red Line",
            type: 1
          },
          station_info: %Stop{
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
