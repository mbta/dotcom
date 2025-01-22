defmodule Algolia.Stop.RouteTest do
  use ExUnit.Case, async: true

  alias Algolia.Stop.Route

  describe "&new/1" do
    test "generates a %Algolia.Stop.Route{} for the red line" do
      route =
        Route.new(:red_line, [%Routes.Route{id: "Red", type: 1, name: "Red Line"}])

      assert %Route{} = route
      assert route.icon == :red_line
      assert route.display_name == "Red Line"
    end

    test "generates a %Algolia.Stop.Route{} for the green line" do
      green_line = [
        %Routes.Route{id: "Green-B", type: 0, name: "Green Line B"},
        %Routes.Route{id: "Green-C", type: 0, name: "Green Line C"},
        %Routes.Route{id: "Green-D", type: 0, name: "Green Line D"},
        %Routes.Route{id: "Green-E", type: 0, name: "Green Line E"}
      ]

      assert %Route{} = route = Route.new(:green_line, green_line)
      assert route.icon == :green_line
      assert route.display_name == "Green Line"
    end

    test "generates a %Algolia.Stop.Route{} for a stop with bus routes" do
      bus_routes = [
        %Routes.Route{id: "1", type: 3, name: "1"},
        %Routes.Route{id: "2", type: 3, name: "2"},
        %Routes.Route{id: "3", type: 3, name: "3"}
      ]

      assert %Route{} = route = Route.new(:bus, bus_routes)
      assert route.icon == :bus
      assert route.display_name == "Bus: 1, 2, 3"
    end

    test "generates a %Algolia.Stop.Route{} for a stop with commuter rail routes" do
      bus_routes = [
        %Routes.Route{id: "CR-Haverhill", type: 2, name: "Haverhill"},
        %Routes.Route{id: "CR-Newburyport", type: 2, name: "Newburyport/Rockport Line"},
        %Routes.Route{id: "CR-Fitchburg", type: 2, name: "Fitchburg Line"}
      ]

      assert %Route{} = route = Route.new(:commuter_rail, bus_routes)
      assert route.icon == :commuter_rail
      assert route.display_name == "Commuter Rail"
    end
  end
end
