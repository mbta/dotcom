defmodule GoogleMaps.MapData.MarkerTest do
  use ExUnit.Case
  import GoogleMaps.MapData.Marker
  alias GoogleMaps.MapData.Marker

  @boston_commons %Marker{
    latitude: 42.355041,
    longitude: -71.066065,
    icon: nil,
    visible?: true
  }

  @public_garden %Marker{
    latitude: 42.354153,
    longitude: -71.070547,
    icon: nil,
    visible?: false
  }

  describe "new/1" do
    test "creates a new marker object with correct lat/lng" do
      marker = Marker.new(123.4, 1235.6)
      assert marker.latitude == 123.4
      assert marker.longitude == 1235.6
    end

    test "creates marker with default options" do
      marker = Marker.new(1.0, 2.0)
      assert marker.visible?
      refute marker.icon
      assert marker.size == :mid
    end

    test "creates marker with given options" do
      marker = Marker.new(1.0, 2.0, visible?: false, size: :tiny, icon: "icon_url")
      refute marker.visible?
      assert marker.icon == "icon_url"
      assert marker.size == :tiny
    end
  end

  describe "format_static_marker/1" do
    test "returns formatted latitude and longitude" do
      assert format_static_marker(@boston_commons) == "42.355041,-71.066065"
      assert format_static_marker(@public_garden) == "42.354153,-71.070547"
    end
  end
end
