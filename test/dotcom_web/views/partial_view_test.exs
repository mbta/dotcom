defmodule DotcomWeb.PartialViewTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.PartialView
  import DotcomWeb.PartialView.HeaderTabs
  import DotcomWeb.PartialView.SvgIconWithCircle
  import Phoenix.HTML, only: [safe_to_string: 1]

  alias CMS.Partial.Teaser
  alias DotcomWeb.PartialView
  alias DotcomWeb.PartialView.FullscreenError
  alias DotcomWeb.PartialView.HeaderTab
  alias DotcomWeb.PartialView.HeaderTabBadge
  alias DotcomWeb.PartialView.SvgIconWithCircle

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
        |> safe_to_string()

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

  describe "render_teasers/3" do
    test "renders teasers as a teaser list", %{conn: conn} do
      teasers = [
        %Teaser{id: 1, type: :event, path: "/1", title: "Event 1"},
        %Teaser{id: 2, type: :event, path: "/2", title: "Event 2"}
      ]

      rendered =
        teasers
        |> render_teasers(conn)
        |> safe_to_string()

      assert rendered =~ "c-teaser-list"
      assert rendered =~ "c-content-teaser"
      assert rendered =~ "Event 1"
      assert rendered =~ "Event 2"
    end

    test "if no teasers are returned, renders empty HTML", %{conn: conn} do
      rendered =
        []
        |> render_teasers(conn)
        |> safe_to_string()

      assert rendered == ""
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
        "/paragraphs/custom-html/projects-index"
        |> PartialView.paragraph(conn)
        |> safe_to_string()

      assert rendered =~ "<p>The T is evolving every day."
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
        ~s(<div class="header-tabs"><a class="header-tab  some-tab-class a-tab" href="/a" id="a-tab">A</a><a class="header-tab header-tab--selected some-tab-class b-tab" href="/b" id="b-tab">B</a><a class="header-tab  some-tab-class c-tab" href="/c" id="c-tab">C<span aria-label="5 things" class="some-tab-badge">5</span></a></div>)

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
        ~s(<div class="c-fullscreen-error__container js-fullscreen-error"><div class="container"><a class="c-fullscreen-error__dismiss js-fullscreen-error__dismiss" tabindex="0">Dismiss <i aria-hidden="true" class="notranslate fa fa-times "></i></a><h1 class="c-fullscreen-error__heading">Danger</h1><p>Will Robinson</p></div></div>)

      assert actual == expected
    end
  end

  describe "alert_time_filters" do
    test "returns the proper markup when item is Route" do
      path_opts = [
        method: :alerts_path,
        item: %Routes.Route{
          color: "00843D",
          description: :rapid_transit,
          direction_destinations: %{0 => "Heath Street", 1 => "North Station"},
          direction_names: %{0 => "Westbound", 1 => "Eastbound"},
          id: "Green-E",
          long_name: "Green Line E",
          name: "Green Line E",
          sort_order: 10_035,
          type: 0
        }
      ]

      [_, links] = alert_time_filters(nil, path_opts)

      expected =
        ~s(<div class="m-alerts__time-filters"><a class="m-alerts__time-filter m-alerts__time-filter--selected" href="/schedules/Green-E/alerts">All Alerts</a><a class="m-alerts__time-filter" href="/schedules/Green-E/alerts?alerts_timeframe=current">Current Alerts</a><a class="m-alerts__time-filter" href="/schedules/Green-E/alerts?alerts_timeframe=upcoming">Planned Service Alerts</a></div>)

      assert safe_to_string(links) == expected
    end

    test "returns the proper markup when item is atom" do
      path_opts = [
        method: :alerts_path,
        item: :subway
      ]

      [_, links] = alert_time_filters(nil, path_opts)

      expected =
        ~s(<div class="m-alerts__time-filters"><a class="m-alerts__time-filter m-alerts__time-filter--selected" href="/schedules/subway/alerts">All Alerts</a><a class="m-alerts__time-filter" href="/schedules/subway/alerts?alerts_timeframe=current">Current Alerts</a><a class="m-alerts__time-filter" href="/schedules/subway/alerts?alerts_timeframe=upcoming">Planned Service Alerts</a></div>)

      assert safe_to_string(links) == expected
    end
  end
end
