defmodule Algolia.StopsTest do
  use ExUnit.Case, async: true

  describe "&all/0" do
    test "returns a list of all stops parsed into Algolia.Stop structs" do
      stops = Algolia.Stops.all()
      assert [light_rail, heavy_rail, commuter_rail, bus, ferry] = stops
      assert %Stops.Stop{id: "place-greenline"} = light_rail
      assert %Stops.Stop{id: "place-subway"} = heavy_rail
      assert %Stops.Stop{id: "place-commuter-rail"} = commuter_rail
      assert %Stops.Stop{id: "place-bus"} = bus
      assert %Stops.Stop{id: "place-ferry"} = ferry
    end
  end
end
