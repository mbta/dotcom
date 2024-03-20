defmodule DotcomWeb.TeaserViewTest do
  use Dotcom.ViewCase, async: true

  import DotcomWeb.CMS.TeaserView

  alias CMS.API.Static
  alias CMS.Partial.Teaser

  @dummy_teaser %Teaser{
    id: 777,
    type: :page,
    path: "/",
    title: "Dummy Teaser",
    topic: "Topic"
  }

  describe "transit_tag/1" do
    @tag :external
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

      assert transit_tag(teaser) == "red-line"
    end

    test "provides a default route class for teasers w/o route data" do
      teaser =
        Static.teaser_news_entry_response()
        |> List.first()
        |> Teaser.from_api()
        |> Map.put(:routes, [])

      assert transit_tag(teaser) == "unknown"
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

  describe "teaser_topic/1" do
    test "returns a topic without a link for non-project topics" do
      teaser = %{@dummy_teaser | topic: "Guides"}

      assert "Guides" == teaser_topic(teaser)
    end

    test "returns a linked topic when the topic is Projects" do
      teaser = %{@dummy_teaser | topic: "Projects"}
      result = teaser |> teaser_topic() |> Phoenix.HTML.safe_to_string()

      assert result =~ "View all Projects"
      assert result =~ "href"
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

  describe "handle_fields/2" do
    test "returns the proper default fields for display by content type when rendered via the CMS app" do
      cms_default_value = []

      assert handle_fields(:page, cms_default_value) == [:image, :topic, :title]
    end

    test "returns the proper default fields for display by content type when rendered via other apps" do
      elixir_default_value = nil

      assert handle_fields(:page, elixir_default_value) == [:image, :topic, :title]
    end

    test "unaccounted (new) content types default to showing all fields" do
      assert handle_fields(:game, []) == [:image, :title, :date, :topic, :location, :summary]
    end

    test "the image field is forced for certain content types, even when not provided" do
      assert handle_fields(:project, [:title, :summary]) == [:image, :title, :summary]
      assert handle_fields(:project_update, [:date]) == [:image, :date]
      refute handle_fields(:event, [:title, :location]) == [:image, :title, :location]
    end

    test "for most content types, requested fields displayed should match input" do
      assert handle_fields(:page, [:title]) == [:title]
      assert handle_fields(:news_entry, [:date, :title, :summary]) == [:date, :title, :summary]
    end
  end
end
