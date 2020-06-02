defmodule Stops.RouteStopsTest do
  use ExUnit.Case
  alias Stops.{RouteStops}

  @red %Routes.Route{id: "Red", type: 1}

  describe "by_direction/2 returns a list of stops in one direction in the correct order" do
    test "for Red Line, direction: 0" do
      stops = Stops.Repo.by_route("Red", 0)
      shapes = Routes.Repo.get_shapes("Red", direction_id: 0)
      stops = RouteStops.by_direction(stops, shapes, @red, 0)
      [core, braintree, ashmont] = stops
      assert %Stops.RouteStops{branch: nil, stops: unbranched_stops} = core
      assert %Stops.RouteStops{branch: "Alewife - Braintree", stops: braintree_stops} = braintree
      assert %Stops.RouteStops{branch: "Alewife - Ashmont", stops: ashmont_stops} = ashmont

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
      shapes = Routes.Repo.get_shapes("Red", direction_id: 1)
      stops = RouteStops.by_direction(stops, shapes, @red, 1)

      [ashmont, braintree, core] = stops
      assert %Stops.RouteStops{branch: "Ashmont - Alewife", stops: ashmont_stops} = ashmont
      assert %Stops.RouteStops{branch: "Braintree - Alewife", stops: braintree_stops} = braintree
      assert %Stops.RouteStops{branch: nil, stops: _unbranched_stops} = core

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
      route = %Routes.Route{id: "Green-E", type: 0}
      shapes = Routes.Repo.get_shapes("Green-E", direction_id: 0)
      stops = Stops.Repo.by_route("Green-E", 0)
      stops = RouteStops.by_direction(stops, shapes, route, 0)

      # As of June 2020, Lechmere has been closed so the commented line will make the test fail.
      # We are temporarily adding the fix but this will need to be undone later on.
      # assert [
      #          %Stops.RouteStops{
      #            stops: [%Stops.RouteStop{id: "place-lech", is_terminus?: true} | _]
      #          }
      #        ] = stops
      assert [
               %Stops.RouteStops{
                 stops: [%Stops.RouteStop{id: "place-north", is_terminus?: true} | _]
               }
             ] = stops
    end

    test "works for green non-E line" do
      route = %Routes.Route{id: "Green-B", type: 0}
      shapes = Routes.Repo.get_shapes("Green-B", direction_id: 0)
      stops = Stops.Repo.by_route("Green-B", 0)
      stops = RouteStops.by_direction(stops, shapes, route, 0)

      assert [
               %Stops.RouteStops{
                 stops: [%Stops.RouteStop{id: "place-pktrm", is_terminus?: true} | _] = b_stops
               }
             ] = stops

      assert %Stops.RouteStop{id: "place-lake", is_terminus?: true} = List.last(b_stops)
    end

    test "works for Kingston line (outbound)" do
      route = %Routes.Route{id: "CR-Kingston", type: 2}
      shapes = Routes.Repo.get_shapes("CR-Kingston", direction_id: 0)
      stops = Stops.Repo.by_route("CR-Kingston", 0)
      route_stops = RouteStops.by_direction(stops, shapes, route, 0)

      case route_stops do
        [core, plymouth, kingston] ->
          assert %Stops.RouteStops{
                   branch: nil,
                   stops: [%Stops.RouteStop{id: "place-sstat"} | _unbranched_stops]
                 } = core

          assert %Stops.RouteStops{branch: "Plymouth", stops: [%Stops.RouteStop{id: "Plymouth"}]} =
                   plymouth

          assert %Stops.RouteStops{branch: "Kingston", stops: [%Stops.RouteStop{id: "Kingston"}]} =
                   kingston

        [shape] ->
          assert %Stops.RouteStops{stops: [%Stops.RouteStop{id: "place-sstat"} | _]} = shape
      end
    end

    test "works for Providence line (inbound)" do
      route = %Routes.Route{id: "CR-Providence", type: 2}
      shapes = Routes.Repo.get_shapes("CR-Providence", direction_id: 1)
      stops = Stops.Repo.by_route("CR-Providence", 1)
      route_stops = RouteStops.by_direction(stops, shapes, route, 1)

      [wickford, stoughton, trunk] = route_stops

      assert %Stops.RouteStops{
               stops: [%Stops.RouteStop{id: "place-NEC-1659"} | _]
             } = wickford

      assert %Stops.RouteStops{
               stops: [%Stops.RouteStop{id: "place-SB-0189"} | _]
             } = stoughton

      assert %Stops.RouteStops{
               stops: [%Stops.RouteStop{id: "place-NEC-2139"} | _]
             } = trunk
    end

    test "works for bus routes" do
      stops = Stops.Repo.by_route("1", 0)
      shapes = Routes.Repo.get_shapes("1", direction_id: 0)
      route = %Routes.Route{id: "1", type: 3}

      [%Stops.RouteStops{branch: "Dudley Station - Harvard Square", stops: outbound}] =
        RouteStops.by_direction(stops, shapes, route, 0)

      assert is_list(outbound)
      assert Enum.all?(outbound, &(&1.branch == "Dudley Station - Harvard Square"))
      assert outbound |> List.first() |> Map.get(:is_terminus?) == true
      assert outbound |> Enum.slice(1..-2) |> Enum.all?(&(&1.is_terminus? == false))

      stops = Stops.Repo.by_route("1", 1)
      shapes = Routes.Repo.get_shapes("1", direction_id: 1)
      route = %Routes.Route{id: "1", type: 3}

      [%Stops.RouteStops{branch: "Harvard Square - Dudley Station", stops: inbound}] =
        RouteStops.by_direction(stops, shapes, route, 1)

      assert Enum.all?(inbound, &(&1.branch == "Harvard Square - Dudley Station"))
      assert inbound |> List.first() |> Map.get(:is_terminus?) == true
    end

    test "works for ferry routes" do
      stops = Stops.Repo.by_route("Boat-F4", 0)
      shapes = Routes.Repo.get_shapes("Boat-F4", direction_id: 0)
      route = %Routes.Route{id: "Boat-F4", type: 4}

      [%Stops.RouteStops{branch: branch, stops: stops}] =
        RouteStops.by_direction(stops, shapes, route, 0)

      assert branch =~ "Charlestown"
      assert Enum.all?(stops, &(&1.__struct__ == Stops.RouteStop))
    end

    test "doesn't crash if we didn't have stops and/or shapes" do
      direction_id = 0
      good_stops = Stops.Repo.by_route("Red", direction_id)
      good_shapes = Routes.Repo.get_shapes("Red", direction_id: direction_id)

      for stops <- [[], good_stops], shapes <- [[], good_shapes], stops == [] or shapes == [] do
        actual = RouteStops.by_direction(stops, shapes, @red, direction_id)
        assert is_list(actual)
      end
    end
  end
end
