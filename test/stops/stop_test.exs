defmodule Stops.StopTest do
  use ExUnit.Case

  import Stops.Stop

  test "accessibility_known?/1 returns true if accessibilty isn't unknown" do
    refute accessibility_known?(%Stops.Stop{accessibility: ["unknown"]})
  end

  test "accessible?/1 returns true if accessible" do
    assert accessible?(%Stops.Stop{accessibility: ["accessible"]})
    refute accessible?(%Stops.Stop{})
  end

  test "has_zone?/1 returns true if there is a zone" do
    assert has_zone?(%Stops.Stop{zone: "1A"})
    refute has_zone?(%Stops.Stop{})
    refute has_zone?(%Stops.Stop{zone: nil})
  end
end
