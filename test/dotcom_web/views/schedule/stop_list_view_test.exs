defmodule DotcomWeb.StopListViewTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.ScheduleView.StopList
  import Phoenix.HTML, only: [safe_to_string: 1]

  alias CMS.Repo
  alias DotcomWeb.ScheduleView
  alias Schedules.Departures

  describe "display_departure_range/1" do
    test "with :no_service, returns No Service" do
      result = display_departure_range(:no_service)
      assert result == "No Service"
    end

    test "with times, displays them formatted" do
      result =
        %Departures{
          first_departure: ~N[2017-02-27 06:15:00],
          last_departure: ~N[2017-02-28 01:04:00]
        }
        |> display_departure_range
        |> IO.iodata_to_binary()

      assert result == "6:15 AM-1:04 AM"
    end
  end

  describe "display_map_link?/1" do
    test "is true for subway and ferry" do
      assert display_map_link?(4) == true
    end

    test "is false for subway, bus and commuter rail" do
      assert display_map_link?(0) == false
      assert display_map_link?(3) == false
      assert display_map_link?(2) == false
    end
  end

  describe "_cms_teasers.html" do
    @tag :external
    test "renders featured content and news", %{conn: conn} do
      assert {news, featured} =
               [route_id: "Red", sidebar: 1]
               |> Repo.teasers()
               |> Enum.split_with(&(&1.type === :news_entry))

      refute Enum.empty?(news)

      rendered =
        "_cms_teasers.html"
        |> ScheduleView.render(
          featured_content: featured,
          news: news,
          conn: conn
        )
        |> safe_to_string()

      [featured_sample | _] = featured

      assert rendered =~ featured_sample.image.url
      assert rendered =~ featured_sample.image.alt
      assert rendered =~ featured_sample.title

      for item <- news do
        assert rendered =~ item.title
        assert rendered =~ Timex.format!(item.date, "{Mshort}")
      end
    end

    test "renders nothing when there is no content", %{conn: conn} do
      rendered =
        "_cms_teasers.html"
        |> ScheduleView.render(featured_content: [], news: [], conn: conn)
        |> safe_to_string()

      assert String.trim(rendered) == ""
    end
  end
end
