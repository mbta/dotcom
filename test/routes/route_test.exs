defmodule Routes.RouteTest do
  use ExUnit.Case, async: true

  import Mox
  import Routes.Route
  alias Routes.Route

  setup :verify_on_exit!

  describe "type_atom/1" do
    test "returns an atom for the route type" do
      for {int, atom} <- [
            {0, :subway},
            {1, :subway},
            {2, :commuter_rail},
            {3, :bus},
            {4, :ferry},
            {"the_ride", :the_ride}
          ] do
        assert type_atom(int) == atom
      end
    end

    test "handles hyphen in commuter-rail" do
      assert type_atom("commuter-rail") == :commuter_rail
      assert type_atom("commuter_rail") == :commuter_rail
    end

    test "extracts the type integer from the route struct and returns the corresponding atom" do
      assert type_atom(%Route{type: 3}) == :bus
    end
  end

  describe "icon_atom/1" do
    test "for subways, returns the name of the line as an atom" do
      for {expected, id} <- [
            red_line: "Red",
            mattapan_line: "Mattapan",
            orange_line: "Orange",
            blue_line: "Blue",
            green_line: "Green",
            green_line_b: "Green-B"
          ] do
        route = %Route{id: id}
        actual = icon_atom(route)
        assert actual == expected
      end
    end

    test "for other routes, returns an atom based on the type" do
      for {expected, type} <- [commuter_rail: 2, bus: 3, ferry: 4] do
        route = %Route{type: type}
        actual = icon_atom(route)
        assert actual == expected
      end
    end
  end

  describe "path_atom/1" do
    test "hyphenates the :commuter_rail atom for path usage" do
      assert path_atom(%Route{type: 2}) == :"commuter-rail"
      assert path_atom(%Route{type: 3}) == :bus
    end
  end

  describe "types_for_mode/1" do
    test "returns correct mode list for each mode" do
      assert types_for_mode(:subway) == [0, 1]
      assert types_for_mode(:commuter_rail) == [2]
      assert types_for_mode(:bus) == [3]
      assert types_for_mode(:ferry) == [4]

      for light_rail <- [:green_line, :mattapan_line],
          do: assert(types_for_mode(light_rail) == [0])

      for heavy_rail <- [:red_line, :orange_line, :blue_line],
          do: assert(types_for_mode(heavy_rail) == [1])
    end
  end

  describe "type_name/1" do
    test "titleizes the name" do
      for {atom, str} <- [
            subway: "Subway",
            bus: "Bus",
            ferry: "Ferry",
            commuter_rail: "Commuter Rail",
            the_ride: "The RIDE"
          ] do
        assert type_name(atom) == str
      end
    end
  end

  describe "type_summary" do
    test "lists route names for bus routes" do
      routes = [%Route{id: "1", name: "1", type: 3}, %Route{id: "747", name: "SL1", type: 3}]
      assert type_summary(:bus, routes) == "Bus: 1, SL1"
    end

    test "returns type name for all other route types" do
      assert type_summary(:green_line, [
               %Route{id: "Green-C", name: "Green Line C", type: 0},
               %Route{id: "Green-C", name: "Green Line C", type: 0}
             ]) == "Green Line"

      assert type_summary(:mattapan_trolley, [%Route{id: "Mattapan", name: "Mattapan", type: 0}]) ==
               "Mattapan Trolley"

      assert type_summary(:red_line, [%Route{id: "Red", name: "Red Line", type: 1}]) == "Red Line"

      assert type_summary(:commuter_rail, [%Route{id: "CR-Fitchburg", name: "Fitchburg", type: 2}]) ==
               "Commuter Rail"

      assert type_summary(:ferry, [%Route{id: "Boat-F1", name: "Hull Ferry", type: 4}]) == "Ferry"
    end
  end

  describe "direction_name/2" do
    test "returns the name of the direction" do
      assert direction_name(%Route{}, 0) == "Outbound"
      assert direction_name(%Route{}, 1) == "Inbound"
      assert direction_name(%Route{direction_names: %{0 => "Northbound"}}, 0) == "Northbound"
      assert direction_name(%Route{direction_names: %{0 => "Southbound"}}, 0) == "Southbound"
      assert direction_name(%Route{direction_names: %{0 => "Eastbound"}}, 0) == "Eastbound"
      assert direction_name(%Route{direction_names: %{0 => "Westbound"}}, 0) == "Westbound"
      assert direction_name(%Route{direction_names: %{0 => ""}}, 0) == ""
    end
  end

  describe "direction_destination/2" do
    test "returns the destination of the direction" do
      route = %Route{
        direction_destinations: %{
          0 => "Start",
          1 => "End"
        }
      }

      assert direction_destination(route, 0) == "Start"
      assert direction_destination(route, 1) == "End"
    end
  end

  describe "vehicle_name/1" do
    test "returns the appropriate type of vehicle" do
      for {type, name} <- [
            {0, "Train"},
            {1, "Train"},
            {2, "Train"},
            {3, "Bus"},
            {4, "Boat"}
          ] do
        assert vehicle_name(%Route{type: type}) == name
      end
    end
  end

  describe "frequent_route?" do
    test "true if rapid transit or key bus route" do
      assert frequent_route?(%Route{description: :frequent_bus_route})
      assert frequent_route?(%Route{description: :rapid_transit})
    end
  end

  describe "silver_line?/1" do
    test "returns true if a route id is in @silver_line" do
      assert %Routes.Route{id: "741"} |> silver_line?()
      refute %Routes.Route{id: "747"} |> silver_line?()
    end
  end

  describe "to_naive/1" do
    test "turns a green line branch into a generic green line route" do
      stub(Routes.Repo.Mock, :green_line, fn ->
        Routes.Repo.green_line()
      end)

      for branch <- ["B", "C", "D", "E"] do
        assert %Route{id: "Green"} =
                 Route.to_naive(%Routes.Route{
                   id: "Green-" <> branch,
                   name: "Green Line " <> branch
                 })
      end
    end

    test "does nothing for other routes" do
      route = %Routes.Route{id: "Red", type: 1}
      assert Route.to_naive(route) == route
    end
  end

  describe "to_json_safe/1" do
    test "converts a Route to a Json string with safe object keys" do
      route = %Route{
        description: :rapid_transit,
        direction_destinations: %{0 => "Ashmont/Braintree", 1 => "Alewife"},
        direction_names: %{0 => "South", 1 => "North"},
        id: "Red",
        long_name: "Red Line",
        name: "Red Line",
        type: 1,
        color: "DA291C",
        sort_order: 5
      }

      assert %{
               direction_destinations: %{"0" => "Ashmont/Braintree", "1" => "Alewife"},
               direction_names: %{"0" => "South", "1" => "North"}
             } = Route.to_json_safe(route)
    end
  end

  describe "Phoenix.Param.to_param" do
    test "Green routes are normalized to Green" do
      green_e = %Route{id: "Green-E"}
      green_b = %Route{id: "Green-B"}
      green_c = %Route{id: "Green-C"}
      green_d = %Route{id: "Green-D"}
      to_param = &Phoenix.Param.Routes.Route.to_param/1

      for route <- [green_e, green_b, green_c, green_d] do
        assert to_param.(route) == "Green"
      end
    end

    test "Mattapan is kept as mattapan" do
      mattapan = %Route{id: "Mattapan"}
      assert Phoenix.Param.Routes.Route.to_param(mattapan) == "Mattapan"
    end
  end

  describe "hidden?/1" do
    test "Returns true for hidden routes" do
      hidden_routes = [
        "2427",
        "3233",
        "3738",
        "4050",
        "725",
        "8993",
        "116117",
        "214216",
        "441442",
        "9701",
        "9702",
        "9703",
        "Logan-Airport"
      ]

      for route_id <- hidden_routes do
        assert Route.hidden?(%{id: route_id})
      end
    end

    test "Returns false for non hidden routes" do
      visible_routes = ["SL1", "66", "1", "742"]

      for route_id <- visible_routes do
        refute Route.hidden?(%{id: route_id})
      end
    end
  end

  describe "rail?/1" do
    test "returns true if a route is on rails" do
      assert %Routes.Route{type: 0} |> rail?()
      assert %Routes.Route{type: 1} |> rail?()
      assert %Routes.Route{type: 2} |> rail?()
      refute %Routes.Route{type: 3} |> rail?()
      refute %Routes.Route{type: 4} |> rail?()
    end
  end

  describe "commuter_rail?/1" do
    test "returns ture if a route is a commuter rail" do
      assert %Routes.Route{type: 2} |> commuter_rail?()
      refute %Routes.Route{type: 0} |> commuter_rail?()
      refute %Routes.Route{type: 1} |> commuter_rail?()
    end
  end
end
