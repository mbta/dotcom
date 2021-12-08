defmodule SiteWeb.TimeHelpersTest do
  use ExUnit.Case, async: true
  import Mock
  import SiteWeb.TimeHelpers

  describe "format_date/1" do
    test "parses the date and returns a string" do
      assert format_date(~N[2017-01-15T12:00:00]) == "January 15, 2017"
    end
  end

  describe "format_prediction_time/4" do
    @now ~N[2021-11-11T12:34:58]
    @predicted_time_nearest Timex.shift(@now, seconds: 27)
    @predicted_time_near Timex.shift(@now, seconds: 57)
    @predicted_time_far Timex.shift(@now, minutes: 7)

    test "commuter rail - parses the time and returns a string" do
      assert format_prediction_time(@predicted_time_nearest, :commuter_rail, @now) == "12:35 PM"
      assert format_prediction_time(@predicted_time_near, :commuter_rail, @now) == "12:35 PM"
      assert format_prediction_time(@predicted_time_far, :commuter_rail, @now) == "12:41 PM"
    end

    test "subway - parses the time and returns a string" do
      assert format_prediction_time(@predicted_time_nearest, :subway, @now) == "arriving"
      assert format_prediction_time(@predicted_time_near, :subway, @now) == "arriving"
      assert format_prediction_time(@predicted_time_far, :subway, @now) == "7 min"
    end

    test "bus - parses the time and returns a string" do
      assert format_prediction_time(@predicted_time_nearest, :bus, @now) == "arriving"
      assert format_prediction_time(@predicted_time_near, :bus, @now) == "1 min"
      assert format_prediction_time(@predicted_time_far, :bus, @now) == "7 min"
    end
  end

  describe "format_time/1" do
    test "parses the time and returns a string" do
      assert format_time(~N[2017-01-15T12:00:00]) == "12 PM"
      assert format_time(~N[2017-01-15T12:09:00]) == "12:09 PM"
    end
  end

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

      assert actual == "2 min"
    end
  end

  describe "format_schedule_time/1" do
    test "parses the time and returns a string" do
      assert format_schedule_time(~N[2017-01-15T12:00:00]) == "12:00 PM"
    end
  end

  describe "displayed_time/1" do
    @scheduled_time ~N[2017-01-15T12:09:20]
    @near_prediction ~N[2017-01-15T12:09:58]
    @far_prediction ~N[2017-01-15T12:16:02]

    test "formats the predicted time according to mode" do
      with_mock Util, [:passthrough], now: fn -> ~N[2017-01-15T12:09:00] end do
        assert displayed_time(@near_prediction, @scheduled_time, :bus) == "1 min"

        assert displayed_time(@near_prediction, @scheduled_time, :subway) ==
                 "arriving"

        assert displayed_time(@near_prediction, @scheduled_time, :commuter_rail) ==
                 "12:09 PM"

        assert displayed_time(@far_prediction, @scheduled_time, :bus) == "7 min"

        assert displayed_time(@far_prediction, @scheduled_time, :subway) ==
                 "7 min"

        assert displayed_time(@far_prediction, @scheduled_time, :commuter_rail) ==
                 "12:16 PM"
      end
    end

    test "formats the fallback time if no predicted time" do
      with_mock Util, [:passthrough], now: fn -> ~N[2017-01-15T12:09:00] end do
        assert displayed_time(nil, @scheduled_time, :bus) == "12:09 PM"

        assert displayed_time(nil, @scheduled_time, :subway) ==
                 "12:09 PM"

        assert displayed_time(nil, @scheduled_time, :commuter_rail) ==
                 "12:09 PM"
      end
    end
  end
end
