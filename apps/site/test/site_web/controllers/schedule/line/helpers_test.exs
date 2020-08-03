defmodule SiteWeb.ScheduleController.Line.HelpersTest do
  use ExUnit.Case, async: true

  alias Routes.Route
  alias SiteWeb.ScheduleController.Line.Helpers

  describe "get_route/1" do
    test "gets a route given its ID" do
      assert {:ok, %Route{id: "1", name: "1"}} = Helpers.get_route("1")
    end

    test "gets a custom response for 'Green'" do
      assert {:ok, %Route{id: "Green", name: "Green Line"}} = Helpers.get_route("Green")
    end

    test "returns :not_found if given a bad route ID" do
      assert Helpers.get_route("Puce") == :not_found
    end
  end
end
