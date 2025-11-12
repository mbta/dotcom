defmodule DotcomWeb.ViewHelpersTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.ViewHelpers
  import PhoenixHTMLHelpers.Tag, only: [tag: 2, content_tag: 3]
  import Phoenix.HTML, only: [safe_to_string: 1, html_escape: 1]
  alias Routes.{Repo, Route}

  describe "break_text_at_slash/1" do
    test "doesn't change text without slashes" do
      s = "this text doesn't contain a slash"
      assert s == break_text_at_slash(s)
    end

    test "adds zero width spaces after slashes" do
      s = "abc/123/xyz"
      result = break_text_at_slash(s)
      assert String.length(result) == 13
      assert result == "abc/​123/​xyz"
    end
  end

  describe "tel_link/1" do
    test "renders numbers as a link" do
      assert tel_link("617-222-3200") ==
               content_tag(:a, "617-222-3200",
                 href: "tel:+1-617-222-3200",
                 class: "no-wrap",
                 aria: [label: "6 1 7. 2 2 2. 3 2 0 0"]
               )
    end

    test "three digit numbers become links" do
      assert tel_link("311") ==
               content_tag(:a, "311",
                 href: "tel:311",
                 class: "no-wrap",
                 aria: [label: "3 1 1"]
               )
    end

    test "words don't get processed to a link" do
      assert tel_link("Hello") ==
               content_tag(:span, "Hello", [])
    end
  end

  describe "hidden_query_params/2" do
    test "creates a hidden tag for each query parameter", %{conn: conn} do
      actual = hidden_query_params(%{conn | query_params: %{"one" => "value", "two" => "other"}})

      expected = [
        tag(:input, type: "hidden", name: "one", value: "value"),
        tag(:input, type: "hidden", name: "two", value: "other")
      ]

      assert expected == actual
    end

    test "can handle nested params", %{conn: conn} do
      query_params = %{"location" => %{"address" => "value"}}
      actual = hidden_query_params(%{conn | query_params: query_params})

      expected = [
        tag(:input, type: "hidden", name: "location[address]", value: "value")
      ]

      assert actual == expected
    end

    test "can handle lists of params", %{conn: conn} do
      query_params = %{"address" => ["one", "two"]}
      actual = hidden_query_params(%{conn | query_params: query_params})

      expected = [
        tag(:input, type: "hidden", name: "address[]", value: "one"),
        tag(:input, type: "hidden", name: "address[]", value: "two")
      ]

      assert actual == expected
    end
  end

  describe "stop_link/1" do
    test "given a stop, returns a link to that stop" do
      link =
        %Stops.Stop{id: "place-sstat", name: "South Station"}
        |> stop_link
        |> safe_to_string

      assert link == ~s(<a href="/stops/place-sstat">South Station</a>)
    end

    @tag :external
    test "given a stop ID, returns a link to that stop" do
      link =
        "place-sstat"
        |> stop_link
        |> safe_to_string

      assert link == ~s(<a href="/stops/place-sstat">South Station</a>)
    end
  end

  describe "external_link/1" do
    test "Protocol is added when one is not included" do
      assert external_link("http://www.google.com") == "http://www.google.com"
      assert external_link("www.google.com") == "http://www.google.com"
      assert external_link("https://google.com") == "https://google.com"
    end
  end

  describe "route_to_class/1" do
    test "converts routes to css classes based on type" do
      assert route_to_class(%Routes.Route{type: 0}) == "subway"
      assert route_to_class(%Routes.Route{type: 1}) == "subway"
      assert route_to_class(%Routes.Route{type: 2}) == "commuter-rail"
      assert route_to_class(%Routes.Route{type: 3}) == "bus"
      assert route_to_class(%Routes.Route{type: 4}) == "ferry"
    end

    test "no route generates no class" do
      assert route_to_class(nil) == ""
    end
  end

  describe "mode_summaries/2" do
    test "commuter rail summaries only include commuter_rail mode" do
      summaries = mode_summaries(:commuter_rail, {:zone, "7"})
      assert Enum.all?(summaries, fn summary -> :commuter_rail in summary.modes end)
    end

    test "Bus summaries return bus single trip information with subway passes" do
      [first | rest] = mode_summaries(:bus)
      assert first.modes == [:bus]
      assert first.duration == :single_trip
      assert Enum.all?(rest, fn summary -> summary.duration in [:week, :month] end)
    end

    test "Bus_subway summaries return both bus and subway information" do
      summaries = mode_summaries(:bus_subway)
      mode_present = fn summary, mode -> mode in summary.modes end

      assert Enum.any?(summaries, &mode_present.(&1, :bus)) &&
               Enum.any?(summaries, &mode_present.(&1, :subway))
    end

    test "Ferry summaries with nil fare name return range of fares including passes" do
      fares =
        :ferry
        |> mode_summaries(nil)
        |> Enum.map(fn %Fares.Summary{fares: [{text, prices}]} ->
          IO.iodata_to_binary([text, " ", prices])
        end)

      assert fares == ["All ferry routes $2.40 – $9.75", "All ferry routes $80.00 – $329.00"]
    end

    test "Ferry summmaries with a fare name return a single fare" do
      fares =
        :ferry
        |> mode_summaries(:ferry_inner_harbor)
        |> Enum.map(fn %Fares.Summary{fares: [{text, prices}]} ->
          IO.iodata_to_binary([text, " ", prices])
        end)

      assert fares == [
               "mTicket App, paper ferry ticket, contactless payment, or cash $3.70",
               "CharlieTicket $90.00",
               "mTicket App $80.00"
             ]
    end
  end

  describe "mode_name/1" do
    test "returns correct name for custom routes" do
      assert mode_name("909") == "Logan Express"
      assert mode_name("983") == "Massport Shuttle"
      assert mode_name("Massport-1") == "Massport Shuttle"
    end
  end

  describe "mode_atom/1" do
    test "Mode atoms do not contain spaces" do
      assert mode_atom("Commuter Rail") == :commuter_rail
      assert mode_atom("Red Line") == :red_line
      assert mode_atom("Ferry") == :ferry
    end
  end

  describe "format_full_date/1" do
    test "formats a date" do
      assert format_full_date(~D[2017-03-31]) == "March 31, 2017"
    end
  end

  describe "cms_static_page_path/2" do
    test "returns the given path as-is", %{conn: conn} do
      assert cms_static_page_path(conn, "/cms/path") == "/cms/path"
    end

    test "external links should not be processed", %{conn: conn} do
      path =
        conn
        |> Map.put(:query_params, %{"preview" => nil, "vid" => "latest"})
        |> cms_static_page_path("https://www.google.com")

      assert path == "https://www.google.com"
    end

    test "returns the given path as-is, even with preview params (chained-preview disabled)", %{
      conn: conn
    } do
      path =
        conn
        |> Map.put(:query_params, %{"preview" => nil, "vid" => "112", "nid" => "6"})
        |> cms_static_page_path("/cms/path")

      assert path == "/cms/path"
    end
  end

  describe "fare_group/1" do
    test "return correct fare group for all modes" do
      assert fare_group(:bus) == "bus_subway"
      assert fare_group(:subway) == "bus_subway"
      assert fare_group(:commuter_rail) == "commuter_rail"
      assert fare_group(:ferry) == "ferry"
    end

    test "return correct fare group when route type given (as integer)" do
      assert fare_group(0) == "bus_subway"
      assert fare_group(1) == "bus_subway"
      assert fare_group(2) == "commuter_rail"
      assert fare_group(3) == "bus_subway"
      assert fare_group(4) == "ferry"
    end
  end

  describe "to_camelcase/1" do
    test "turns a phrase with spaces into camelcased format" do
      assert to_camelcase("Capitalized With Spaces") == "capitalizedWithSpaces"
      assert to_camelcase("Capitalized") == "capitalized"
      assert to_camelcase("Sentence case") == "sentenceCase"
      assert to_camelcase("no words capitalized") == "noWordsCapitalized"
      assert to_camelcase("with_underscores") == "withUnderscores"
    end
  end

  describe "struct_name_to_string/1" do
    test "turns a module name atom into an underscored string" do
      assert struct_name_to_string(CMS.Partial.Paragraph.CustomHTML) == "custom_html"
    end

    test "turns a module struct into an underscored string" do
      assert struct_name_to_string(%CMS.Partial.Paragraph.CustomHTML{}) == "custom_html"
    end
  end

  describe "fa/2" do
    test "creates the HTML for a FontAwesome icon" do
      expected = ~s(<i aria-hidden="true" class="notranslate fa fa-arrow-right "></i>)

      result = fa("arrow-right")

      assert result |> safe_to_string() == expected
    end

    test "when optional attributes are included" do
      expected =
        ~s(<i aria-hidden="true" class="notranslate fa fa-arrow-right foo" title="title"></i>)

      result = fa("arrow-right", class: "foo", title: "title")

      assert result |> safe_to_string() == expected
    end

    test "when font family is included" do
      expected = ~s(<i aria-hidden="true" class="notranslate fas fa-arrow-right "></i>)

      result = fa("arrow-right", font_family: "fas")

      assert result |> safe_to_string() == expected
    end
  end

  describe "direction_with_headsign/3" do
    test "returns the direction name and headsign when included" do
      actual = safe_to_string(html_escape(direction_with_headsign(%Route{}, 0, "headsign")))
      assert actual =~ "Outbound"
      assert actual =~ "arrow-right"
      assert actual =~ ~s(<span class="sr-only">to</span>)
      assert actual =~ "headsign"
    end

    @tag :external
    test "uses route's direction_destination if the headsign is empty" do
      route = Repo.get("1")

      actual = route |> direction_with_headsign(0, "") |> html_escape() |> safe_to_string()
      assert actual =~ "Outbound"
      assert actual =~ "arrow-right"
      assert actual =~ "Harvard"

      actual = route |> direction_with_headsign(0, []) |> html_escape() |> safe_to_string()
      assert actual =~ "Outbound"
      assert actual =~ "arrow-right"
      assert actual =~ "Harvard"
    end

    test "returns an empty value for the direction_names and direction_destinations if not included" do
      actual =
        safe_to_string(
          html_escape(
            direction_with_headsign(
              %Routes.Route{
                description: :rail_replacement_bus,
                direction_destinations: %{0 => nil, 1 => nil},
                direction_names: %{0 => "", 1 => ""},
                id: "Shuttle-NewtonHighlandsRiverside",
                long_name: "Green Line D Shuttle",
                name: "Green Line D Shuttle",
                type: 3
              },
              0,
              "Riverside (Shuttle)"
            )
          )
        )

      assert actual =~ "arrow-right"
      assert actual =~ "Riverside (Shuttle)"
    end
  end

  describe "pretty_date/2" do
    test "it is today when the date given is todays date" do
      assert pretty_date(Util.service_date()) == "Today"
    end

    test "it abbreviates the month when the date is not today" do
      date = ~D[2017-01-01]
      assert pretty_date(date) == "Jan 1"
    end

    test "it applies custom formatting if provided" do
      date = ~D[2017-01-01]
      assert pretty_date(date, :date_full) == "January 1, 2017"
    end
  end

  describe "svg/1" do
    test "wraps svg in span with icon class" do
      svg_name = "alert.svg"

      document =
        svg_name
        |> svg()
        |> safe_to_string()
        |> Floki.parse_document!()

      assert [{"span", _, _}] = Floki.find(document, ".c-svg__#{Path.rootname(svg_name)}")
    end

    test "provides fallback for unknown SVG" do
      rendered = svg("icon-massport-fake") |> safe_to_string()
      assert rendered =~ "fa"
    end
  end

  test "mode_icon/2" do
    for type <- [
          :subway,
          :commuter_rail,
          :bus,
          :logan_express,
          :massport_shuttle,
          :ferry,
          :trolley
        ],
        size <- [:default, :small] do
      assert [{"span", [{"class", class}], _}] =
               type
               |> mode_icon(size)
               |> safe_to_string()
               |> Floki.parse_fragment()
               |> elem(1)

      case type do
        :commuter_rail -> assert class == "notranslate c-svg__icon-mode-commuter-rail-#{size}"
        :logan_express -> assert class == "notranslate c-svg__icon-mode-bus-#{size}"
        :massport_shuttle -> assert class == "notranslate c-svg__icon-mode-bus-#{size}"
        other -> assert class == "notranslate c-svg__icon-mode-#{other}-#{size}"
      end
    end

    assert [{"span", [{"class", "notranslate c-svg__icon-the-ride-default"}], _}] =
             :the_ride
             |> mode_icon(:default)
             |> safe_to_string()
             |> Floki.parse_fragment()
             |> elem(1)
  end

  test "bw_circle_icon/2" do
    for type <- [0, 1, 2, 3, 4],
        size <- [:default] do
      assert [{"span", [{"class", class}], _}] =
               type
               |> bw_circle_icon(size)
               |> safe_to_string()
               |> Floki.parse_fragment()
               |> elem(1)

      if type == 0 do
        assert class == "notranslate c-svg__icon-trolley-circle-bw-#{size}"
      else
        type =
          type
          |> Route.type_atom()
          |> Atom.to_string()
          |> String.replace("_", "-")

        assert class == "notranslate c-svg__icon-#{type}-circle-bw-#{size}"
      end
    end
  end

  describe "line_icon/2" do
    test "for subway routes" do
      for id <- ["Red", "Orange", "Blue"] do
        icon =
          %Routes.Route{id: id, type: 1}
          |> line_icon(:default)
          |> safe_to_string()

        assert icon =~ "c-svg__icon-#{String.downcase(id)}-line-default"
      end
    end

    test "for green line" do
      for branch <- ["B", "C", "D", "E"] do
        icon =
          %Routes.Route{id: "Green-" <> branch, type: 0}
          |> line_icon(:default)
          |> safe_to_string()

        assert icon =~ "c-svg__icon-green-line-#{String.downcase(branch)}-default"
      end

      icon =
        %Routes.Route{id: "Green", type: 0}
        |> line_icon(:default)
        |> safe_to_string()

      assert icon =~ "c-svg__icon-green-line-default"
    end

    test "for mattapan" do
      icon =
        %Routes.Route{id: "Mattapan", type: 0}
        |> line_icon(:default)
        |> safe_to_string()

      assert icon =~ "c-svg__icon-mattapan-line-default"
    end
  end

  describe "bus_icon_pill/1" do
    test "for silver line" do
      icon =
        %Routes.Route{
          id: "742",
          long_name: "Design Center - South Station",
          name: "SL2",
          type: 3
        }
        |> bus_icon_pill
        |> safe_to_string

      assert icon =~ "u-bg--silver-line"
    end

    test "for buses" do
      icon =
        %Routes.Route{
          id: "221",
          type: 3,
          name: "221"
        }
        |> bus_icon_pill
        |> safe_to_string

      assert icon =~ "u-bg--bus"
    end
  end
end
