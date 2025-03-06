defmodule Dotcom.StopPlaceIdsTest do
  use ExUnit.Case

  import Dotcom.StopPlaceIds

  describe "stop_place_id/1" do
    test "returns a string when the id exists" do
      # Exercise/Verify
      assert stop_place_id("1") |> is_binary()
    end

    test "returns nil when the id does not exist" do
      # Exercise/Verify
      assert stop_place_id("FOOBARBAZ") |> is_nil()
    end
  end
end
