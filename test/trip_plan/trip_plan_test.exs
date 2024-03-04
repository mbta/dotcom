defmodule TripPlanTest do
  use ExUnit.Case, async: true
  import TripPlan
  alias TripPlan.NamedPosition

  describe "geocode/1" do
    test "returns {:ok, position} from the geocoder" do
      assert {:ok, position} = geocode("address")
      assert %NamedPosition{} = position
      assert_received {:geocoded_address, "address", {:ok, ^position}}
    end
  end
end
