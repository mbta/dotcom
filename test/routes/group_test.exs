defmodule Routes.GroupTest do
  use ExUnit.Case, async: true
  alias Routes.Route

  @routes_repo_api Application.compile_env!(:dotcom, :routes_repo_api)

  @light_rail %Route{
    type: 0,
    id: "light",
    name: "light rail"
  }
  @green @routes_repo_api.green_line()
  @subway %Route{
    type: 1,
    id: "subway",
    name: "subway"
  }
  @rail %Route{
    type: 2,
    id: "rail",
    name: "rail"
  }
  @bus %Route{
    type: 3,
    id: "bus",
    name: "bus"
  }
  @ferry %Route{
    type: 4,
    id: "ferry",
    name: "ferry"
  }

  test ".group groups routes by their type" do
    # drops the light rail (only keeps the green line)
    assert Routes.Group.group([@light_rail, @green, @subway, @rail, @bus, @ferry]) == [
             subway: [@light_rail, @subway, @green],
             bus: [@bus],
             commuter_rail: [@rail],
             ferry: [@ferry]
           ]
  end
end
