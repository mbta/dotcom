defmodule DotcomWeb.CMSHelpersTest do
  use ExUnit.Case, async: true

  import DotcomWeb.CMSHelpers

  describe "cms_route_to_class/1" do
    @tag :external
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

    @tag :external
    test "handles nonexistent routes" do
      assert cms_route_to_class(%{id: "fake-route"}) == "unknown"
    end
  end

  describe "cms_route_to_svg/1" do
    @tag :external
    test "converts cms route terms to svg atom" do
      assert cms_route_to_svg(%{id: "Red", group: "line", mode: "subway"}) == :red_line

      assert cms_route_to_svg(%{id: "mattapan", group: "branch", mode: "subway"}) ==
               :mattapan_line

      assert cms_route_to_svg(%{id: "commuter_rail", group: "mode"}) == :commuter_rail
      assert cms_route_to_svg(%{id: "66", group: "route", mode: "bus"}) == :bus
      assert cms_route_to_svg(%{id: "silver_line", group: "line", mode: "bus"}) == :silver_line
      assert cms_route_to_svg(%{id: "local_bus", group: "custom", mode: "bus"}) == :bus
      assert cms_route_to_svg(%{id: "Green", group: "line", mode: "subway"}) == :green_line
    end

    test "handles custom groups without mode ancestry" do
      assert cms_route_to_svg(%{id: "late_night", group: "custom", mode: nil}) == :t_logo
    end
  end
end
