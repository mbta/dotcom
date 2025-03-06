defmodule Dotcom.StopPlaceIdsTest do
  use ExUnit.Case

  import Dotcom.StopPlaceIds

  describe "stop_place_id/1" do
    test "returns a place id" do
      # Exercise/Verify
      assert stop_place_id("1") > is_binary()
    end
  end
end
