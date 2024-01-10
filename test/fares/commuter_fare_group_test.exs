defmodule CommuterFareGroupTest do
  use ExUnit.Case, async: true

  alias Fares.CommuterFareGroup

  describe "sort_fares/2" do
    test "zone 1 is less than zone 2" do
      fare_one = %CommuterFareGroup{name: {:zone, "1"}}
      fare_two = %CommuterFareGroup{name: {:zone, "2"}}
      assert CommuterFareGroup.sort_fares(fare_one, fare_two) == true
      assert CommuterFareGroup.sort_fares(fare_two, fare_one) == false
    end

    test "zone 1 is less than interzone 1" do
      fare_one = %CommuterFareGroup{name: {:zone, "1"}}
      fare_two = %CommuterFareGroup{name: {:interzone, "1"}}
      assert CommuterFareGroup.sort_fares(fare_one, fare_two) == true
      assert CommuterFareGroup.sort_fares(fare_two, fare_one) == false
    end

    test "zone 1A is less than zone 1" do
      fare_one = %CommuterFareGroup{name: {:zone, "1"}}
      fare_two = %CommuterFareGroup{name: {:zone, "1A"}}
      assert CommuterFareGroup.sort_fares(fare_one, fare_two) == false
      assert CommuterFareGroup.sort_fares(fare_two, fare_one) == true
    end

    test "zone 1 comes before interzone 2" do
      fare_one = %CommuterFareGroup{name: {:zone, "1"}}
      fare_two = %CommuterFareGroup{name: {:interzone, "2"}}
      assert CommuterFareGroup.sort_fares(fare_one, fare_two) == true
      assert CommuterFareGroup.sort_fares(fare_two, fare_one) == false
    end

    test "zone 10 comes after zone 2" do
      fare_one = %CommuterFareGroup{name: {:zone, "10"}}
      fare_two = %CommuterFareGroup{name: {:zone, "2"}}
      assert CommuterFareGroup.sort_fares(fare_one, fare_two) == false
      assert CommuterFareGroup.sort_fares(fare_two, fare_one) == true
    end
  end
end
