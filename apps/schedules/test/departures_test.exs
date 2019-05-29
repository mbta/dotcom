defmodule Schedules.DeparturesTest do
  use ExUnit.Case, async: true

  alias Schedules.Departures
  alias Schedules.Schedule

  @time ~N[2017-02-28 12:00:00]
  @schedules [
    %Schedule{time: @time},
    %Schedule{time: Timex.shift(@time, hours: 1)},
    %Schedule{time: Timex.shift(@time, hours: 2)}
  ]

  describe "first_and_last_departures/1" do
    test "returns the first and last departures of the day" do
      departures = Departures.first_and_last_departures(@schedules)
      assert departures.first_departure == List.first(@schedules).time
      assert departures.last_departure == List.last(@schedules).time
    end
  end
end
