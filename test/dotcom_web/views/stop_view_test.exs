defmodule DotcomWeb.StopViewTest do
  use ExUnit.Case
  use DotcomWeb.ConnCase

  alias Phoenix.HTML
  alias DotcomWeb.StopView
  alias Stops.Stop

  describe "feature_icons/1" do
    test "returns list of featured icons" do
      [red_icon, access_icon | _] =
        StopView.feature_icons(%DetailedStop{features: [:red_line, :access]})

      assert HTML.safe_to_string(red_icon) =~ "icon-red-line"
      assert HTML.safe_to_string(access_icon) =~ "icon-access"
    end
  end

  describe "stop_feature_icon" do
    test "sets a default size" do
      green = StopView.stop_feature_icon(:"Green-B")

      assert HTML.safe_to_string(green) =~ "default"
    end
  end

  describe "_detailed_stop_list.html" do
    test "renders a list of stops", %{conn: conn} do
      stops = [
        %DetailedStop{stop: %Stop{name: "Alewife", id: "place-alfcl"}},
        %DetailedStop{stop: %Stop{name: "Davis", id: "place-davis"}},
        %DetailedStop{stop: %Stop{name: "Porter", id: "place-porter"}}
      ]

      html =
        "_detailed_stop_list.html"
        |> StopView.render(detailed_stops: stops, conn: conn)
        |> HTML.safe_to_string()

      assert [alewife, davis, porter] = Floki.find(html, ".stop-btn")
      assert Floki.text(alewife) =~ "Alewife"
      assert Floki.text(davis) =~ "Davis"
      assert Floki.text(porter) =~ "Porter"
    end
  end

  describe "_search_bar.html" do
    test "renders a search bar", %{conn: conn} do
      stops = [
        %DetailedStop{stop: %Stop{name: "Alewife", id: "place-alfcl"}},
        %DetailedStop{stop: %Stop{name: "Davis", id: "place-davis"}},
        %DetailedStop{stop: %Stop{name: "Porter", id: "place-porter"}}
      ]

      html =
        "_search_bar.html"
        |> StopView.render(stop_info: stops, conn: conn)
        |> HTML.safe_to_string()

      assert [{"div", _, _}] = Floki.find(html, ".c-search-bar")
    end
  end
end
