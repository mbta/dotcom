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

  describe "plan/4" do
    test "returns {:ok, itineraries} from the api" do
      {:ok, from} = geocode("from")
      {:ok, to} = geocode("to")
      connection_opts = [user_id: 1, force_otp1: false, force_otp2: false]
      opts = [depart_at: ~N[2017-07-06T19:20:00]]
      assert {:ok, itineraries} = plan(from, to, connection_opts, opts)
      assert [%TripPlan.Itinerary{}] = itineraries

      assert_received {:planned_trip, {^from, ^to, ^connection_opts, received_opts},
                       {:ok, ^itineraries}}

      assert received_opts[:depart_at] == opts[:depart_at]
    end
  end
end
