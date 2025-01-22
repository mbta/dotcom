defmodule Dotcom.TripPlan.MapTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Map

  alias Leaflet.MapData

  describe "initial_map_data/0" do
    test "gives the initial map data" do
      expected = %MapData{
        default_center: %{latitude: 42.360718, longitude: -71.05891},
        height: 400,
        markers: [],
        polylines: [],
        tile_server_url: "",
        width: 630,
        zoom: 14
      }

      assert initial_map_data() == expected
    end
  end
end
