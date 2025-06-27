defmodule Stops.StopTest do
  use ExUnit.Case

  import Stops.Stop

  test "accessibility_known?/1 returns true if accessibilty isn't unknown" do
    refute %Stops.Stop{accessibility: ["unknown"]} |> accessibility_known?()
  end

  test "accessible?/1 returns true if accessible" do
    assert %Stops.Stop{accessibility: ["accessible"]} |> accessible?()
    refute %Stops.Stop{} |> accessible?()
  end
end
