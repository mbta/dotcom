defmodule V3Api.RoutePatternsTest do
  use ExUnit.Case

  alias V3Api.RoutePatterns

  @opts ["page[limit]": 1, sort: "id"]

  describe "all/1" do
    test "gets all route patterns" do
      assert %JsonApi{data: [%JsonApi.Item{}]} = RoutePatterns.all(@opts)
    end
  end

  describe "get/1" do
    test "gets the route pattern by ID" do
      %JsonApi{data: [%JsonApi.Item{} = route_pattern]} = RoutePatterns.get("111-5-0")
      assert route_pattern.id == "111-5-0"
    end
  end
end
