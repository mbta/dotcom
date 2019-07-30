defmodule SiteWeb.TeaserViewTest do
  use Site.ViewCase, async: true

  import SiteWeb.CMS.TeaserView

  alias CMS.API.Static
  alias CMS.Teaser

  describe "teaser_color/1" do
    test "provides a CSS class for routes found on teaser" do
      teaser =
        Static.teaser_project_response()
        |> Enum.at(2)
        |> Teaser.from_api()

      [first_term, second_term] = teaser.routes

      assert first_term.id == "Red"
      assert first_term.mode == "subway"
      assert first_term.group == "line"

      assert second_term.id == "Orange"
      assert second_term.mode == "subway"
      assert second_term.group == "line"

      assert teaser_color(teaser) == "red-line"
    end

    test "provides a default route class for teasers w/o route data" do
      teaser =
        Static.teaser_news_entry_response()
        |> List.first()
        |> Teaser.from_api()
        |> Map.put(:routes, [])

      assert teaser_color(teaser) == "unknown"
    end

    test "formats a news_entry date for display" do
      teaser =
        Static.teaser_news_entry_response()
        |> List.first()
        |> Teaser.from_api()

      assert teaser.id == 3944
      assert display_date(teaser) == "December 4, 2018"
    end

    test "formats an event datetime for display" do
      teaser =
        Static.teaser_event_response()
        |> List.first()
        |> Teaser.from_api()

      assert teaser.id == 3911
      assert display_date(teaser) == "December 16, 2019, 12:00 PM"
    end

    test "formats a project date for display" do
      teaser =
        Static.teaser_project_response()
        |> List.first()
        |> Teaser.from_api()

      assert teaser.id == 3661
      assert display_date(teaser) == "November 30, 2018"
    end
  end

  describe "display_location/2" do
    test "displays location as a comma-separated string with default parts" do
      location = [
        place: "State Transportation Building",
        address: "10 Park Plaza",
        city: "Boston",
        state: "MA"
      ]

      assert display_location(location) == "State Transportation Building, Boston, MA"
    end

    test "displays specific location information as a comma-separated string" do
      location = [
        place: "State Transportation Building",
        address: "10 Park Plaza",
        city: "Boston",
        state: "MA"
      ]

      assert display_location(location, [:address, :city]) == "10 Park Plaza, Boston"
    end

    test "displays only as many location parts as available from CMS data as a comma-separated string" do
      location = [place: nil, address: nil, city: "Quincy", state: "MA"]

      assert display_location(location) == "Quincy, MA"
    end
  end
end
