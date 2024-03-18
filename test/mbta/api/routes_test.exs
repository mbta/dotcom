defmodule MBTA.Api.RoutesTest do
  use ExUnit.Case

  alias MBTA.Api.Routes

  @opts ["page[limit]": 1, sort: "long_name"]

  describe "all/1" do
    test "gets all routes" do
      assert %JsonApi{data: [%JsonApi.Item{}]} = Routes.all(@opts)
    end
  end

  describe "get/1" do
    test "gets the route by ID" do
      assert %JsonApi{data: [%JsonApi.Item{id: "80"}]} = Routes.get("80")
    end
  end

  describe "by_type/1" do
    test "gets routes by type" do
      assert %JsonApi{data: [%JsonApi.Item{id: "Blue"}]} = Routes.by_type(1, @opts)
    end
  end

  describe "by_stop/2" do
    test "gets routes by stop ID" do
      assert %JsonApi{data: [%JsonApi.Item{id: "CR-Haverhill"}]} =
               Routes.by_stop("place-ogmnl", @opts)
    end
  end

  describe "by_stop_and_direction/3" do
    test "gets routes by stop ID and direction ID" do
      assert %JsonApi{data: [%JsonApi.Item{id: "743"}]} =
               Routes.by_stop_and_direction("place-sstat", 0, @opts)
    end
  end
end
