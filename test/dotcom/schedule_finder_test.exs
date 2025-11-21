defmodule Dotcom.ScheduleFinderTest do
  use ExUnit.Case, async: true

  import Dotcom.ScheduleFinder

  describe "daily_departures/4" do
    test "requests schedules"
    test "omits schedules that don't pick up passengers"
    test "returns departures"
  end

  describe "next_arrivals/3" do
    test "requests schedules"
    test "omits schedules before the given stop_sequence"
    test "returns arrivals"
  end

  describe "subway_groups/3" do
    test "returns route, destination, departures"
    test "if on the Southbound Red Line branches, adjusts destination accordingly"
  end
end
