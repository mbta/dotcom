defmodule V3Api.RoutePatternsTest do
  use ExUnit.Case

  alias V3Api.RoutePatterns

  @opts ["page[limit]": 1, sort: "id"]

  describe "all/1" do
    test "gets all route patterns" do
      assert %JsonApi{data: [%JsonApi.Item{}]} = RoutePatterns.all(@opts)
    end
  end
end
