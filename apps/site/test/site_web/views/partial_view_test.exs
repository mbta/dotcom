defmodule SiteWeb.PartialViewTest do
  use SiteWeb.ConnCase, async: true

  import Phoenix.HTML, only: [safe_to_string: 1]
  import SiteWeb.PartialView
  import SiteWeb.PartialView.{HeaderTabs, SvgIconWithCircle}

  alias CMS.{Repo, Teaser}
  alias SiteWeb.PartialView
  alias SiteWeb.PartialView.{HeaderTab, HeaderTabBadge, SvgIconWithCircle, FullscreenError}

  describe "stop_selector_suffix/2" do
    test "returns zones for commuter rail", %{conn: conn} do
      conn =
        conn
        |> assign(:route, %Routes.Route{type: 2})
        |> assign(:zone_map, %{"Lowell" => "6"})

      assert conn |> stop_selector_suffix("Lowell") |> IO.iodata_to_binary() == "Zone 6"
    end

    test "if the stop has no zone, returns the empty string", %{conn: conn} do
      conn =
        conn
        |> assign(:route, %Routes.Route{type: 2})
        |> assign(:zone_map, %{})

      assert stop_selector_suffix(conn, "Wachusett") == ""
    end

    test "returns a comma-separated list of lines for the green line", %{conn: conn} do
      conn =
        conn
        |> assign(:route, %Routes.Route{id: "Green"})
        |> assign(:stops_on_routes, GreenLine.stops_on_routes(0))

      assert conn |> stop_selector_suffix("place-pktrm") |> IO.iodata_to_binary() == "B,C,D,E"
      assert conn |> stop_selector_suffix("place-lech") |> IO.iodata_to_binary() == "E"
      assert conn |> stop_selector_suffix("place-kencl") |> IO.iodata_to_binary() == "B,C,D"
      # not on the green line
      assert conn |> stop_selector_suffix("place-alfcl") |> IO.iodata_to_binary() == ""
    end

    test "for other lines, returns the empty string", %{conn: conn} do
      assert stop_selector_suffix(conn, "place-harsq") == ""
    end
  end

  describe "clear_selector_link/1" do
    test "returns the empty string when clearable? is false" do
      assert clear_selector_link(%{clearable?: false, selected: "place-davis"}) == ""
    end

    test "returns the empty string when selecte is nil" do
      assert clear_selector_link(%{clearable?: true, selected: nil}) == ""
    end

    test "otherwise returns a link setting the query_key to nil", %{conn: conn} do
      result =
        %{
          clearable?: true,
          selected: "place-davis",
          placeholder_text: "destination",
          query_key: "destination",
          conn: fetch_query_params(conn)
        }
        |> clear_selector_link()
        |> safe_to_string

      assert result =~ "(clear<span class=\"sr-only\"> destination</span>)"
      refute result =~ "place-davis"
    end
  end

  describe "svg_icon_with_circle" do
    test "icons render an svg" do
      rendered =
        %SvgIconWithCircle{icon: :subway}
        |> svg_icon_with_circle()
        |> safe_to_string()

      assert rendered =~ "</svg>"
      assert rendered =~ "c-svg__icon-mode-subway"
      assert rendered =~ "title=\"Subway\""
    end

    test "uses small icon if size is set to small" do
      rendered =
        %SvgIconWithCircle{icon: :subway, size: :small}
        |> svg_icon_with_circle()
        |> safe_to_string()

      assert rendered =~ "c-svg__icon-mode-subway-small"
    end

    test "title/1" do
      assert title(:blue_line) == "Blue Line"
      assert title(%Routes.Route{id: "Orange"}) == "Orange Line"
      assert title(%Routes.Route{id: "Red"}) == "Red Line"
      assert title(%Routes.Route{id: "Blue"}) == "Blue Line"
      assert title(%Routes.Route{id: "Mattapan"}) == "Mattapan Trolley"
      assert title(%Routes.Route{id: "Green"}) == "Green Line"
      assert title(%Routes.Route{id: "Green-B"}) == "Green Line B"
      assert title(%Routes.Route{type: 4}) == "Ferry"
    end

    test "Title tooltip is shown if show_tooltip? is not specified" do
      rendered =
        %SvgIconWithCircle{icon: :subway}
        |> svg_icon_with_circle()
        |> safe_to_string()

      assert Floki.attribute(rendered, "data-toggle") == ["tooltip"]
    end

    test "Tooltip is not shown if show_tooltip? is false" do
      rendered =
        %SvgIconWithCircle{icon: :subway, show_tooltip?: false}
        |> svg_icon_with_circle()
        |> safe_to_string()

      assert rendered |> Floki.find("svg") |> List.first() |> Floki.attribute("data-toggle") == []
    end
  end

  describe "teaser/1" do
    test "renders the title, topic and description for teasers with topic" do
      assert [teaser | _] = Repo.teasers(type: [:project])
      assert %Teaser{topic: "Projects"} = teaser
      rendered = teaser |> PartialView.teaser() |> safe_to_string()
      assert rendered =~ teaser.image.url
      assert rendered =~ teaser.image.alt
      assert rendered =~ teaser.title
      assert rendered =~ teaser.text
      assert rendered =~ teaser.topic
    end

    test "renders the title and description for teasers w/o topic" do
      assert [teaser | _] = Repo.teasers(route_id: "Red", sidebar: 1)
      assert %Teaser{topic: nil} = teaser
      rendered = teaser |> PartialView.teaser() |> safe_to_string()
      assert rendered =~ teaser.image.url
      assert rendered =~ teaser.image.alt
      assert rendered =~ teaser.title
      assert rendered =~ teaser.text
      refute rendered =~ "c-content-teaser__topic"
    end

    test "only shows image for guide teasers" do
      assert [teaser | _] = Repo.teasers(topic: "guides", sidebar: 1)
      assert teaser.topic == "Guides"

      rendered =
        teaser
        |> PartialView.teaser()
        |> safe_to_string()

      assert rendered =~ teaser.image.url
      assert rendered =~ teaser.image.alt

      assert Floki.find(rendered, ".sr-only") == [
               {"span", [{"class", "sr-only"}], [teaser.title]}
             ]

      refute rendered =~ teaser.text
    end
  end

  describe "news_entry/3" do
    test "takes a Teaser struct" do
      assert {:ok, date} = Date.new(2018, 11, 30)

      news = %Teaser{
        id: 7999,
        type: :news_entry,
        date: date,
        title: "title",
        path: "/url",
        routes: []
      }

      rendered =
        news
        |> news_entry()
        |> safe_to_string()

      assert rendered =~ "title"
      assert rendered =~ "Nov"
      assert rendered =~ "30"
      assert rendered =~ "7999"
      assert rendered =~ ~s(href="/url")
    end
  end

  describe "paragraph/2" do
    test "renders a CMS partial (paragraph) directly from API", %{conn: conn} do
      rendered =
        30
        |> PartialView.paragraph(conn)
        |> safe_to_string()

      assert rendered =~ "<p>library item"
      assert rendered =~ "c-paragraph--custom-html"
      refute rendered =~ "c-paragraph--library-item"
    end
  end

  describe "render_tabs/2" do
    test "returns tabs with badge" do
      actual =
        [
          %HeaderTab{id: "a", name: "A", href: "/a"},
          %HeaderTab{id: "b", name: "B", href: "/b"},
          %HeaderTab{
            id: "c",
            name: "C",
            href: "/c",
            badge: %HeaderTabBadge{
              content: "5",
              class: "some-tab-badge",
              aria_label: "5 things"
            }
          }
        ]
        |> render_tabs(
          selected: "b",
          tab_class: "some-tab-class"
        )
        |> safe_to_string()

      expected =
        "<div class=\"header-tabs\"><a class=\"header-tab  some-tab-class a-tab\" href=\"/a\" id=\"a-tab\">A</a><a class=\"header-tab header-tab--selected some-tab-class b-tab\" href=\"/b\" id=\"b-tab\">B</a><a class=\"header-tab  some-tab-class c-tab\" href=\"/c\" id=\"c-tab\">C<span aria-label=\"5 things\" class=\"some-tab-badge\">5</span></a></div>"

      assert actual == expected
    end
  end

  describe "render_error/1" do
    test "returns full screen error" do
      actual =
        %FullscreenError{
          heading: "Danger",
          body: "Will Robinson"
        }
        |> FullscreenError.render_error()
        |> safe_to_string()

      expected =
        "<div class=\"c-fullscreen-error__container js-fullscreen-error\"><div class=\"container\"><a class=\"c-fullscreen-error__dismiss js-fullscreen-error__dismiss\" tabindex=\"0\">Dismiss <i aria-hidden=\"true\" class=\"notranslate fa fa-times \"></i></a><h1 class=\"c-fullscreen-error__heading h1\">Danger</h1><p>Will Robinson</p></div></div>"

      assert actual == expected
    end
  end
end
