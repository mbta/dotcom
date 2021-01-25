defmodule Leaflet.MapData.PolylineTest do
  use ExUnit.Case, async: true
  alias Leaflet.MapData.Polyline

  @routes_repo_api Application.get_env(:routes, :routes_repo_api)

  describe "new/2" do
    test "turns a polyline into a struct" do
      assert [shape | _] = @routes_repo_api.get_shapes("Red", direction_id: 0)

      assert %Polyline{color: color, positions: positions} = Polyline.new(shape, color: "#FF0000")

      assert color == "#FF0000"
      assert [first | _] = positions
      assert first == [42.39615, -71.14208]
    end
  end
end
