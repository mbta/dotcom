defmodule SiteWeb.ContentHelpersTest do
  use ExUnit.Case, async: true

  import SiteWeb.ContentHelpers

  describe "cms_route_to_class/1" do
    test "converts cms route terms to class" do
      assert cms_route_to_class(%{id: "Red", group: "line", mode: "subway"}) == "red-line"
      assert cms_route_to_class(%{id: "mattapan", group: "branch", mode: "subway"}) == "red-line"
      assert cms_route_to_class(%{id: "commuter_rail", group: "mode"}) == "commuter-rail"
      assert cms_route_to_class(%{id: "66", group: "route", mode: "bus"}) == "bus"
      assert cms_route_to_class(%{id: "silver_line", group: "line", mode: "bus"}) == "silver-line"
      assert cms_route_to_class(%{id: "local_bus", group: "custom", mode: "bus"}) == "bus"
      assert cms_route_to_class(%{id: "Green", group: "line", mode: "subway"}) == "green-line"
    end

    test "handles custom groups without mode ancestry" do
      assert cms_route_to_class(%{id: "late_night", group: "custom", mode: nil}) == "unknown"
    end
  end
end
