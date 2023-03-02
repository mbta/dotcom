defmodule V3Api.TripsTest do
  use ExUnit.Case

  alias V3Api.Trips

  describe "by_route/1" do
    test "gets the trip by route_id" do
      %JsonApi{data: [%JsonApi.Item{} = trip]} = Trips.by_id("747")
      assert trip.id == "747"
    end
  end
end
