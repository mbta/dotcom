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

  describe "plan/3" do
    test "returns {:ok, itineraries} from the api" do
      {:ok, from} = geocode("from")
      {:ok, to} = geocode("to")
      opts = [depart_at: ~N[2017-07-06T19:20:00]]
      assert {:ok, itineraries} = plan(from, to, opts)
      assert [%TripPlan.Itinerary{}] = itineraries
      assert_received {:planned_trip, {^from, ^to, received_opts}, {:ok, ^itineraries}}
      assert received_opts[:depart_at] == opts[:depart_at]
    end
  end

  describe "stops_nearby/1" do
    test "returns {:ok, locations} from the api" do
      assert {:ok, nearby} = stops_nearby({42.365518, -71.009120})
      assert Enum.all?(nearby, fn location -> match?(%NamedPosition{}, location) end)
    end
  end
end
