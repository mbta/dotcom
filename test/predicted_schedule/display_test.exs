defmodule PredictedSchedule.DisplayTest do
  use ExUnit.Case, async: true
  import PredictedSchedule.Display

  describe "do_time_difference/4" do
    @base_time ~N[2017-01-01T12:00:00]

    test "difference above threshold" do
      actual =
        do_time_difference(
          Timex.shift(@base_time, minutes: 30),
          Timex.shift(@base_time, minutes: 28),
          fn _time -> "format time" end,
          1
        )

      assert actual == "format time"
    end

    test "difference below threshold" do
      actual =
        do_time_difference(
          Timex.shift(@base_time, minutes: 30),
          Timex.shift(@base_time, minutes: 28),
          fn _time -> "format time" end
        )

      assert actual == ["2 min"]
    end
  end
end
