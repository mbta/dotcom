defmodule DotcomWeb.StopViewTest do
  use DotcomWeb.ConnCase
  use ExUnit.Case

  alias DotcomWeb.StopView
  alias Phoenix.HTML
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

      document =
        "_detailed_stop_list.html"
        |> StopView.render(detailed_stops: stops, conn: conn)
        |> HTML.safe_to_string()
        |> Floki.parse_document!()

      assert [alewife, davis, porter] = Floki.find(document, ".stop-btn")
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
        |> HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert html =~ "c-search-bar__autocomplete"
    end
  end
end
