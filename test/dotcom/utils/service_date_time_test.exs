defmodule Dotcom.Utils.ServiceDateTimeTest do
  use ExUnit.Case
  use ExUnitProperties

  import Dotcom.Utils.ServiceDateTime

  import Test.Support.Factories.Utils.DateTime
  import Test.Support.Factories.Utils.ServiceDateTime

  describe "service_rollover_time/0" do
    test "returns a time for the service rollover time" do
      # Exercise/Verify
      assert %Time{} = service_rollover_time()
    end
  end

  describe "service_date/1" do
    property "returns 'today' when the date_time is between the start of service and midnight" do
      # Setup
      check all(date_time <- date_time_generator(:before_midnight)) do
        beginning_of_service_day = beginning_of_service_day(date_time)
        end_of_day = Timex.end_of_day(date_time)

        date_time_generator =
          time_range_date_time_generator({beginning_of_service_day, end_of_day})

        check all(service_date_time <- date_time_generator) do
          # Exercise
          service_date = service_date(service_date_time)

          # Verify
          assert same_wall_date?(date_time, service_date)
        end
      end
    end

    property "returns 'yesterday' when the date_time is between midnight and the end of service" do
      # Setup
      check all(date_time <- date_time_generator(:after_midnight)) do
        beginning_of_day = Timex.end_of_day(date_time) |> Timex.shift(microseconds: 1)
        end_of_service_day = end_of_service_day(date_time)

        date_time_generator =
          time_range_date_time_generator({beginning_of_day, end_of_service_day})

        check all(service_date_time <- date_time_generator) do
          yesterday = service_date_time |> Timex.shift(days: -1)

          # Exercise
          service_date = service_date(date_time)

          # Verify
          assert same_wall_date?(yesterday, service_date)
        end
      end
    end
  end

  describe "beginning_of_next_service_day/1" do
    property "the beginning of the next service day is the same 'day' as the end of the current service day" do
      check all(date_time <- date_time_generator()) do
        # Setup
        end_of_service_day = end_of_service_day(date_time)

        # Exercise
        beginning_of_next_service_day = beginning_of_next_service_day(date_time)

        # Verify
        assert same_wall_date?(end_of_service_day, beginning_of_next_service_day)
      end
    end
  end

  describe "beginning_of_service_day/1" do
    property "the beginning of the service day is always 3am" do
      check all(date_time <- date_time_generator()) do
        # Exercise
        beginning_of_service_day = beginning_of_service_day(date_time)

        # Verify
        assert same_wall_time?(beginning_of_service_day, ~T[03:00:00])
      end
    end
  end

  describe "end_of_service_day/1" do
    property "the end of the service day is always 2:59:59..am" do
      check all(date_time <- date_time_generator()) do
        # Exercise
        end_of_service_day = end_of_service_day(date_time)

        # Verify
        assert same_wall_time?(end_of_service_day, ~T[02:59:59])
      end
    end
  end

  describe "in_range?/2" do
    test "returns true when the date_time is the start of the range" do
      date_time = random_date_time()

      range = {date_time, nil}

      assert in_range?(range, date_time)
    end

    test "returns true when the date_time is the end of the range" do
      date_time = random_date_time()

      range = {nil, date_time}

      assert in_range?(range, date_time)
    end

    property "returns true when the date_time is within the range" do
      # Setup
      check all(date_time <- date_time_generator()) do
        start = Timex.shift(date_time, years: -1)
        stop = Timex.shift(date_time, years: 1)

        range = {start, stop}

        # Exercise / Verify
        assert in_range?(range, date_time)
      end
    end

    property "returns false when the date_time is not within the range" do
      # Setup
      check all(date_time <- date_time_generator()) do
        start = Timex.shift(date_time, seconds: 1)
        stop = Timex.shift(start, years: 1)

        range = {start, stop}

        # Exercise / Verify
        refute in_range?(range, date_time)
      end
    end
  end

  describe "service_today?/1" do
    test "returns true when the date_time is in today's service" do
      # Setup
      today = service_range_day() |> random_time_range_date_time()

      # Exercise / Verify
      assert service_today?(today)
    end
  end

  describe "service_this_week?/1" do
    test "returns true when the date_time is in this week's service" do
      # Setup
      {_, end_of_current_service_week} = service_range_current_week()
      beginning_of_next_service_day = beginning_of_next_service_day()

      service_range_date_time =
        random_time_range_date_time({end_of_current_service_week, beginning_of_next_service_day})

      # Exercise / Verify
      assert service_this_week?(service_range_date_time)
    end
  end

  describe "service_next_week?/1" do
    test "returns true when the date_time is in next week's service" do
      # Setup
      next_week = service_range_following_week() |> random_time_range_date_time()

      # Exercise / Verify
      assert service_next_week?(next_week)
    end
  end

  describe "service_later?/1" do
    test "returns true when the date_time is after next week's service" do
      # Setup
      later = service_range_later() |> random_time_range_date_time()

      # Exercise / Verify
      assert service_later?(later)
    end
  end
end
