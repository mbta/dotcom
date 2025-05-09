defmodule MapHelpersTest do
  use DotcomWeb.ConnCase, async: true

  import Dotcom.MapHelpers
  import Test.Support.EnvHelpers, only: [reassign_env: 3]

  setup do
    reassign_env(:dotcom, :is_prod_env?, true)
  end

  describe "map_pdf_url/1" do
    test "returns a URL string" do
      map_types = [:subway, :ferry, :bus, :commuter_rail]

      for map_type <- map_types do
        assert map_type |> map_pdf_url() |> is_binary()
        refute map_type == ""
      end
    end
  end

  describe "thumbnail/1" do
    test "returns a map image url for the subway" do
      assert thumbnail(:subway) ==
               static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-subway.jpg")
    end

    test "returns a map image url for the bus" do
      assert thumbnail(:bus) ==
               static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-bus-system.jpg")
    end

    test "returns a map image url for the commuter rail" do
      assert thumbnail(:commuter_rail) ==
               static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-commuter-rail.jpg")
    end

    test "returns a map image url for the commuter rail zones" do
      assert thumbnail(:commuter_rail_zones) ==
               static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-fare-zones.jpg")
    end

    test "returns a map image url for the ferry" do
      assert thumbnail(:ferry) ==
               static_url(DotcomWeb.Endpoint, "/images/map-thumbnail-ferry.jpg")
    end
  end
end
