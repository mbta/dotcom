defmodule Schedules.FrequencyListTest do
  use ExUnit.Case, async: true

  alias Schedules.FrequencyList
  alias Schedules.Schedule

  @time ~N[2017-02-28 12:00:00]
  @schedules [
    %Schedule{time: @time},
    %Schedule{time: Timex.shift(@time, hours: 1)},
    %Schedule{time: Timex.shift(@time, hours: 2)}
  ]

  describe "build_frequency_list/1" do
    test "no_service is returned without schedules" do
      frequency_list = FrequencyList.build_frequency_list([])
      assert frequency_list.frequencies == []
      assert frequency_list.departures == :no_service
    end

    test "first and last departures are returned with a FrequencyList" do
      frequency_list = FrequencyList.build_frequency_list(@schedules)
      assert frequency_list.departures.first_departure == List.first(@schedules).time
      assert frequency_list.departures.last_departure == List.last(@schedules).time
    end
  end

  describe "reduce/3" do
    test "reducing the FrequencyList is the same as reducing the list of frequencies on it" do
      frequency_list = FrequencyList.build_frequency_list(@schedules)

      assert Enum.reduce(frequency_list, [], fn frequency, list ->
               [frequency.max_headway | list]
             end) ==
               Enum.reduce(frequency_list.frequencies, [], fn frequency, list ->
                 [frequency.max_headway | list]
               end)
    end
  end
end
