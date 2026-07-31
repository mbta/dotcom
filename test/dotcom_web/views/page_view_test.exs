defmodule DotcomWeb.PageViewTest do
  use Dotcom.ViewCase, async: true

  alias CMS.Field.{Image, Link}
  alias CMS.Partial.{Banner, Teaser}
  alias DotcomWeb.PageView
  alias Plug.Conn

  describe "banners" do
    test "renders _banner.html for important banners" do
      banner = %Banner{
        title: "Important Banner Title",
        blurb: "Uh oh, this is very important!",
        link: %Link{url: "http://example.com/important", title: "Call to Action"},
        utm_url: "http://example.com/important?utm=stuff",
        thumb: %Image{},
        banner_type: :important
      }

      rendered = render_to_string(PageView, "_banner.html", banner: banner, conn: %Conn{})
      assert rendered =~ "Important Banner Title"
      assert rendered =~ "Uh oh, this is very important!"
      assert rendered =~ "Call to Action"
    end

    test "renders _banner.html for default banners" do
      banner = %Banner{
        title: "Default Banner Title",
        blurb: "This is not as important.",
        link: %Link{url: "http://example.com/default", title: "Call to Action"},
        utm_url: "http://example.com/important?utm=stuff",
        thumb: %Image{},
        banner_type: :default
      }

      rendered = render_to_string(PageView, "_banner.html", banner: banner, conn: %Conn{})
      assert rendered =~ "Default Banner Title"
      refute rendered =~ "This is not as important."
      refute rendered =~ "Call to Action"
    end
  end

  describe "shortcut_icons/0" do
    test "renders shortcut icons" do
      icons = PageView.shortcut_icons()
      assert length(icons) == 5

      icon =
        List.first(icons)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert icon =~ "<svg"
    end
  end

  describe "render_news_entries/1" do
    test "renders news entries", %{conn: conn} do
      now = Util.now()

      entries =
        for idx <- 1..6 do
          %Teaser{
            id: idx * 1000,
            title: "News Entry #{idx}",
            type: :news_entry,
            date: Timex.shift(now, hours: -idx),
            path: "http://example.com/news?utm=stuff",
            routes: []
          }
        end

      document =
        conn
        |> assign(:news, entries)
        |> PageView.render_news_entries()
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()
        |> Floki.parse_document!()

      assert document |> Floki.find(".c-news-entry") |> Enum.count() == 6
      assert document |> Floki.find(".c-news-entry--small") |> Enum.count() == 6
    end
  end
end
