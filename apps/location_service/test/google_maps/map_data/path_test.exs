defmodule GoogleMaps.MapData.PathTest do
  use ExUnit.Case
  import GoogleMaps.MapData.Path
  alias GoogleMaps.MapData.Path

  @path %Path{
    weight: 4,
    color: "fff",
    polyline: "Polyline"
  }

  describe "new/1" do
    test "creates path with given polyline and default params" do
      path = new("polyline")
      assert path.polyline == "polyline"
    end

    test "creates path with given weight and color" do
      path = new("polyline", color: "blue", weight: 8)
      assert path.color == "blue"
      assert path.weight == 8
    end

    test "creates path with given dotted value" do
      path = new("polyline", color: "blue", weight: 8, dotted?: true)
      assert path.dotted?
    end

    test "creates path with defaults" do
      path = new("polyline")
      assert path.color == ""
      assert path.weight == 5
      refute path.dotted?
    end
  end

  describe "format_static_path/1" do
    test "formats a path" do
      expected = "weight:4|color:0xfffFF|enc:Polyline"
      assert format_static_path(@path) == expected
    end
  end
end
