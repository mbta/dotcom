defmodule V3Api.RoutesTest do
  use ExUnit.Case

  alias V3Api.Routes

  @opts ["page[limit]": 1, sort: "long_name"]

  describe "all/1" do
    %JsonApi{data: [%JsonApi.Item{} = route]} = Routes.all(@opts)
    assert route.id == "80"
  end

  describe "get/1" do
    test "gets the route by ID" do
      %JsonApi{data: [%JsonApi.Item{} = route]} = Routes.get("80")
      assert route.id == "80"
    end
  end

  describe "by_type/1" do
    %JsonApi{data: [%JsonApi.Item{} = route]} = Routes.by_type(1, @opts)
    assert route.id == "Blue"
  end

  describe "by_stop/2" do
    %JsonApi{data: [%JsonApi.Item{} = route]} = Routes.by_stop("place-ogmnl", @opts)
    assert route.id == "131"
  end

  describe "by_stop_and_direction/3" do
    %JsonApi{data: [%JsonApi.Item{} = route]} =
      Routes.by_stop_and_direction("place-sstat", 0, @opts)

    assert route.id == "743"
  end
end
