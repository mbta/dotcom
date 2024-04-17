defmodule Algolia.Stop.RoutesTest do
  use ExUnit.Case, async: true

  alias Algolia.Stop

  describe "&for_stop/2" do
    test "builds a route list for a stop with multiple modes" do
      routes = [
        %Routes.Route{id: "Green-C", name: "Green Line C", type: 0},
        %Routes.Route{id: "Red", name: "Red Line", type: 1},
        %Routes.Route{id: "CR-Fitchburg", name: "Fitchburg Line", type: 2},
        %Routes.Route{id: "1000", name: "1000", type: 3},
        %Routes.Route{id: "Boat-F1", name: "Ferry", type: 4}
      ]

      assert [light_rail, heavy_rail, commuter_rail, bus, ferry] =
               Stop.Routes.for_stop(routes)

      assert light_rail == %Stop.Route{
               display_name: "Green Line C",
               icon: :green_line_c,
               type: 0
             }

      assert heavy_rail == %Stop.Route{display_name: "Red Line", icon: :red_line, type: 1}

      assert commuter_rail == %Stop.Route{
               display_name: "Commuter Rail",
               icon: :commuter_rail,
               type: 2
             }

      assert bus == %Stop.Route{display_name: "Bus: 1000", icon: :bus, type: 3}
      assert ferry == %Stop.Route{display_name: "Ferry", icon: :ferry, type: 4}
    end
  end

  describe "&green_line_branches/2" do
    test "builds a route list for a stop with multiple modes" do
      routes = [
        %Routes.Route{id: "Green-C", name: "Green Line C", type: 0},
        %Routes.Route{id: "Red", name: "Red Line", type: 1},
        %Routes.Route{id: "CR-Fitchburg", name: "Fitchburg Line", type: 2},
        %Routes.Route{id: "Green-D", name: "Green Line E", type: 0},
        %Routes.Route{id: "1000", name: "1000", type: 3},
        %Routes.Route{id: "Boat-F1", name: "Ferry", type: 4}
      ]

      branches = Stop.Routes.green_line_branches(routes)
      assert branches == ["Green-C", "Green-D"]
    end
  end
end
