defmodule Fares.RetailLocationsTest do
  use ExUnit.Case, async: true

  alias Fares.RetailLocations.Data

  @moduletag :external

  @with_nearby %{latitude: 42.352271, longitude: -71.055242}

  describe "Fares.RetailLocations.get_nearby/1" do
    @tag fare_retail_locations: true
    test "returns retail locations near a stop" do
      locations = Fares.RetailLocations.get_nearby(@with_nearby)
      assert is_list(locations)
      assert length(locations) > 0
    end

    test "returns no more than 4 locations" do
      assert length(Fares.RetailLocations.get_nearby(@with_nearby)) == 4
    end

    test "returns the closest locations possible" do
      {_, top_distance} = @with_nearby |> Fares.RetailLocations.get_nearby() |> List.first()

      assert Data.get()
             |> Enum.map(&Map.from_struct/1)
             |> Enum.map(&Dotcom.Utils.Distance.haversine(&1, @with_nearby))
             |> Enum.sort()
             |> List.first() == top_distance
    end

    test "returns nearby sales locations given a lat and a long" do
      locations = Fares.RetailLocations.get_nearby(%{latitude: 42.352271, longitude: -71.055242})
      assert is_list(locations)
      assert length(locations) > 0
    end
  end
end
