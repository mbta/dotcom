defmodule MapHelpersTest do
  use SiteWeb.ConnCase, async: true
  alias Routes.Route
  import Site.MapHelpers
  import SiteWeb.ViewHelpers, only: [cms_static_page_path: 2]

  describe "map_pdf_url/1" do
    test "returns the map link for subway" do
      assert map_pdf_url(:subway) ==
               cms_static_page_path(
                 SiteWeb.Endpoint,
                 "/subway-map"
               )
    end

    test "returns the map link for ferry" do
      assert map_pdf_url(:ferry) ==
               cms_static_page_path(SiteWeb.Endpoint, "/ferry-map")
    end

    test "returns the bus map for bus" do
      assert map_pdf_url(:bus) ==
               cms_static_page_path(
                 SiteWeb.Endpoint,
                 "/bus-map"
               )
    end

    test "returns the map link for commuter rail" do
      assert map_pdf_url(:commuter_rail) ==
               cms_static_page_path(
                 SiteWeb.Endpoint,
                 "/cr-map"
               )
    end
  end

  describe "thumbnail/1" do
    test "returns a map image url for the subway" do
      assert thumbnail(:subway) ==
               static_url(SiteWeb.Endpoint, "/images/map-thumbnail-subway.jpg")
    end

    test "returns a map image url for the bus" do
      assert thumbnail(:bus) ==
               static_url(SiteWeb.Endpoint, "/images/map-thumbnail-bus-system.jpg")
    end

    test "returns a map image url for the commuter rail" do
      assert thumbnail(:commuter_rail) ==
               static_url(SiteWeb.Endpoint, "/images/map-thumbnail-commuter-rail.jpg")
    end

    test "returns a map image url for the commuter rail zones" do
      assert thumbnail(:commuter_rail_zones) ==
               static_url(SiteWeb.Endpoint, "/images/map-thumbnail-fare-zones.jpg")
    end

    test "returns a map image url for the ferry" do
      assert thumbnail(:ferry) == static_url(SiteWeb.Endpoint, "/images/map-thumbnail-ferry.jpg")
    end
  end

  describe "route_map_color/1" do
    test "correct color is returned for each route" do
      assert route_map_color(%Route{type: 3}) == "FFCE0C"
      assert route_map_color(%Route{type: 2}) == "A00A78"
      assert route_map_color(%Route{id: "Blue"}) == "0064C8"
      assert route_map_color(%Route{id: "Red"}) == "FF1428"
      assert route_map_color(%Route{id: "Mattapan"}) == "FF1428"
      assert route_map_color(%Route{id: "Orange"}) == "FF8200"
      assert route_map_color(%Route{id: "Green"}) == "428608"
      assert route_map_color(%Route{id: "OTHER"}) == "000000"
    end
  end

  describe "map_stop_icon_path" do
    test "returns correct path when size is not :mid" do
      assert map_stop_icon_path(:tiny) =~ "000000-dot"
    end

    test "returns correct path when size is :mid" do
      assert map_stop_icon_path(:mid) =~ "000000-dot-mid"
    end

    test "returns correct path when 'filled' is specified and size" do
      assert map_stop_icon_path(:mid, true) == "000000-dot-filled-mid"
    end

    test "returns orrect path when 'filled' is true" do
      assert map_stop_icon_path(:tiny, true) == "000000-dot-filled"
    end
  end
end
