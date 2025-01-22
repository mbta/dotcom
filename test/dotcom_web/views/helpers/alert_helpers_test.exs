defmodule DotcomWeb.Views.Helpers.AlertHelpersTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Views.Helpers.AlertHelpers

  alias DotcomWeb.PartialView.HeaderTabBadge

  describe "alert_line_show_path/2" do
    test "Returns line path given a real route id", %{conn: conn} do
      assert alert_line_show_path(conn, "Red") == "/schedules/Red/line"
    end

    test "Returns /accessibility path given fake 'Other' route id", %{conn: conn} do
      assert alert_line_show_path(conn, "Other") == "/accessibility"
    end

    test "Returns /accessibility path given fake 'Elevator' route id", %{conn: conn} do
      assert alert_line_show_path(conn, "Elevator") == "/accessibility"
    end

    test "Returns /accessibility path given fake 'Escalator' route id", %{conn: conn} do
      assert alert_line_show_path(conn, "Escalator") == "/accessibility"
    end
  end

  describe "alert_badge/1" do
    test "nil badge when count is 0" do
      assert nil == alert_badge(0)
    end

    test "returns a badge struct" do
      expected = %HeaderTabBadge{
        aria_label: "5 alerts",
        class: "m-alert-badge",
        content: "5"
      }

      actual = alert_badge(5)
      assert actual == expected
    end
  end
end
