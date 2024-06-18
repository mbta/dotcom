defmodule Leaflet.MapData.PolylineTest do
  use ExUnit.Case, async: true

  import Test.Support.Factories.RoutePatterns.RoutePattern

  alias Leaflet.MapData.Polyline

  setup do
    route_pattern =
      build(:route_pattern,
        representative_trip_polyline: "gfsaGvlaqL[Ek@Ck@A[?]BU?sAH"
      )

    %{route_pattern: route_pattern}
  end

  describe "new/2" do
    test "turns a polyline into a struct", %{route_pattern: route_pattern} do
      assert %Polyline{color: color, positions: positions} =
               Polyline.new(route_pattern, color: "#FF0000")

      assert color == "#FF0000"
      assert [first | _] = positions
      assert first == [42.37428, -71.119]
    end

    test "makes polyline with default options", %{route_pattern: route_pattern} do
      assert %Polyline{color: color, positions: positions} = Polyline.new(route_pattern)

      assert color == "#000000"
      assert [first | _] = positions
      assert first == [42.37428, -71.119]
    end
  end
end
