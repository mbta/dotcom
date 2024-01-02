defmodule GoogleMaps.MapDataTest do
  use ExUnit.Case
  import GoogleMaps.MapData
  alias GoogleMaps.MapData
  alias GoogleMaps.MapData.{Marker, Path, Layers}

  @markers [
    %Marker{
      latitude: 42.355041,
      longitude: -71.066065,
      icon: "marker1",
      visible?: true
    },
    %Marker{
      latitude: 42.354153,
      longitude: -71.070547,
      icon: "marker2",
      visible?: true
    },
    %Marker{
      latitude: 42.354153,
      longitude: -71.070547,
      icon: "marker2",
      visible?: true
    }
  ]

  @paths [
    %Path{
      weight: 7,
      color: "#fff",
      polyline: "thick polyline"
    },
    %Path{
      weight: 2,
      color: "#b727",
      polyline: "thin polyline"
    }
  ]

  @map_data %MapData{
    height: 200,
    width: 300,
    markers: @markers,
    paths: @paths,
    dynamic_options: %{streetViewControl: true, mapTypeControl: true}
  }

  describe "new/1" do
    test "creates new map data with given dimensions" do
      new_map = new({300, 400})
      assert new_map.width == 300
      assert new_map.height == 400
      assert new_map.scale == 1
      assert new_map.zoom == nil
    end

    test "creates new map with given zoom and scale" do
      new_map = new({300, 400}, 19, 2)
      assert new_map.zoom == 19
      assert new_map.scale == 2
    end
  end

  describe "Adding markers" do
    @base_marker Marker.new(0, 0)
    @base_map {300, 400} |> new() |> add_marker(@base_marker)

    test "add_marker/2" do
      marker = Marker.new(1, 2)
      marker_map = add_marker(@base_map, marker)
      assert marker_map.markers == [marker | [@base_marker]]
    end

    test "add_markers/2" do
      markers = [Marker.new(3, 4), Marker.new(5, 6)]
      marker_map = add_markers(@base_map, markers)
      assert marker_map.markers == Enum.concat([@base_marker], markers)
    end
  end

  describe "Adding paths" do
    @base_path Path.new("base polyline")
    @base_map {300, 400} |> new() |> add_path(@base_path)

    test "add_path/2" do
      path = Path.new("polyline1")
      path_map = add_path(@base_map, path)
      assert path_map.paths == [path | [@base_path]]
    end

    test "add_paths/2" do
      paths = [Path.new("polyline1"), Path.new("polyline2")]
      paths_map = add_paths(@base_map, paths)
      assert paths_map.paths == Enum.concat([@base_path], paths)
    end
  end

  describe "adding layers" do
    test "add_layers/2" do
      assert @base_map.layers.transit == false
      assert add_layers(@base_map, %Layers{transit: true}).layers.transit == true
    end
  end

  describe "disable_map_type_controls/1" do
    test "sets streetViewControl and mapTypeControl to false" do
      map = {100, 100} |> MapData.new() |> MapData.disable_map_type_controls()
      refute map.dynamic_options.streetViewControl
      refute map.dynamic_options.mapTypeControl
    end

    test "overrides existing dynamic_options" do
      map = MapData.disable_map_type_controls(@map_data)
      refute map.dynamic_options.streetViewControl
      refute map.dynamic_options.mapTypeControl
    end
  end

  describe "static_query/1" do
    @hidden_markers Enum.map(@markers, &%{&1 | visible?: false})

    test "Returns correct size param" do
      query = static_query(@map_data)
      assert Keyword.get(query, :size) == "300x200"
    end

    test "groups markers by icons" do
      single_marker = {:markers, "anchor:center|icon:marker1|42.355041,-71.066065"}

      multiple_markers =
        {:markers, "anchor:center|icon:marker2|42.354153,-71.070547|42.354153,-71.070547"}

      markers = @map_data |> static_query() |> Enum.filter(fn {key, _val} -> key == :markers end)
      assert List.first(markers) == multiple_markers
      assert Enum.at(markers, 1) == single_marker
    end

    test "contains center param when no visible markers are given" do
      hidden_marker_map = %{@map_data | markers: @hidden_markers}
      query = static_query(hidden_marker_map)
      assert Keyword.get(query, :center) == "42.355041,-71.066065"
    end

    test "does not return hidden markers" do
      hidden_marker_map = %{@map_data | markers: @hidden_markers}
      query = static_query(hidden_marker_map)
      refute Keyword.get(query, :markers)
    end
  end
end
