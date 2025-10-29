defmodule DotcomWeb.FareViewTest do
  @moduledoc false
  use ExUnit.Case, async: true

  import DotcomWeb.FareView

  @location_1 %{lat: 42.354199, lng: -71.07399}
  @location_2 %{lat: 42.34735, lng: -71.075727}

  describe "direction_map_url/2" do
    test "returns a correctly formatted url" do
      url =
        direction_map_url(
          {@location_1.lat, @location_1.lng},
          {@location_2.lat, @location_2.lng}
        )

      assert url ==
               "https://maps.google.com" <>
                 Path.join([
                   "/",
                   "maps",
                   "dir",
                   URI.encode("#{@location_1.lat},#{@location_1.lng}"),
                   URI.encode("#{@location_2.lat},#{@location_2.lng}")
                 ])
    end
  end
end
