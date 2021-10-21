defmodule Routes.HelpersTest do
  use ExUnit.Case, async: true

  import Routes.Helpers

  @original_routes [
    %Routes.Route{
      color: "FFC72C",
      custom_route?: false,
      description: :local_bus,
      direction_destinations: %{0 => "North Waltham", 1 => "Waltham Center"},
      direction_names: %{0 => "Outbound", 1 => "Inbound"},
      id: "61",
      long_name: "North Waltham - Waltham Center",
      name: "61",
      sort_order: 50610,
      type: 3
    },
    %Routes.Route{
      color: "FFC72C",
      custom_route?: false,
      description: :local_bus,
      direction_destinations: %{
        0 => "Bedford VA Hospital",
        1 => "Alewife Station"
      },
      direction_names: %{0 => "Outbound", 1 => "Inbound"},
      id: "627",
      long_name: "Bedford VA Hospital - Alewife Station via Hanscom Airport",
      name: "62/76",
      sort_order: 50621,
      type: 3
    },
    %Routes.Route{
      color: "FFC72C",
      custom_route?: false,
      description: :local_bus,
      direction_destinations: %{0 => "Belmont Center", 1 => "Harvard"},
      direction_names: %{0 => "Outbound", 1 => "Inbound"},
      id: "75",
      long_name: "Belmont Center - Harvard via Huron Avenue",
      name: "75",
      sort_order: 50750,
      type: 3
    },
    %Routes.Route{
      color: "FFC72C",
      custom_route?: false,
      description: :key_bus_route,
      direction_destinations: %{0 => "Arlington Heights", 1 => "Harvard Station"},
      direction_names: %{0 => "Outbound", 1 => "Inbound"},
      id: "77",
      long_name: "Arlington Heights - Harvard Station",
      name: "77",
      sort_order: 50770,
      type: 3
    }
  ]

  test "duplicate_blended_route/1" do
    blended_route = Enum.at(@original_routes, 1)
    updated_routes = List.insert_at(@original_routes, 3, blended_route)

    assert duplicate_blended_route(@original_routes) == updated_routes
  end
end
