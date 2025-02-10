defmodule Dotcom.Utils.DateTimeTest do
  use ExUnit.Case
  use ExUnitProperties

  import Dotcom.Utils.DateTime
  import ExUnit.CaptureLog
  import Test.Support.Generators.DateTime

  describe "timezone/0" do
    test "returns a valid timezone for the application" do
      # Verify/Verify
      assert timezone() |> Timex.Timezone.exists?()
    end
  end

  describe "now/0" do
    test "returns the current date_time in either EDT or EST" do
      # Exercise
      %DateTime{zone_abbr: timezone} = now()

      # Verify
      assert timezone in ["EDT", "EST"]
    end
  end

  describe "coerce_ambiguous_time/1" do
    test "returns the given date_time when given a date_time" do
      # Setup
      date_time = now()

      # Exercise/Verify
      assert %DateTime{} = coerce_ambiguous_time(date_time)
    end

    test "chooses the later time when given an ambiguous date_time" do
      # Setup
      now = now()
      later = Timex.shift(now, microseconds: 1)
      ambiguous_date_time = %Timex.AmbiguousDateTime{before: now, after: later}

      # Exercise/Verify
      assert later == coerce_ambiguous_time(ambiguous_date_time)
    end

    test "logs the reason and returns `now` when given an error tuple" do
      # Setup
      reason = Faker.Company.bullshit()
      error = {:error, reason}

      # Exercise/Verify
      assert capture_log(fn -> coerce_ambiguous_time(error) end) =~ reason
    end

    test "logs the input and returns `now` as a fallback" do
      # Exercise/Verify
      assert capture_log(fn -> coerce_ambiguous_time(nil) end) =~ "nil"
    end
  end

  describe "in_range?/2" do
    test "returns false when no actual range is given" do
      date_time = random_date_time()

      range = {nil, nil}

      refute in_range?(range, date_time)
    end

    test "defaults to false" do
      range = {:foo, :bar}

      refute in_range?(range, :baz)
    end

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
        start = Timex.shift(date_time, years: -1) |> coerce_ambiguous_time()
        stop = Timex.shift(date_time, years: 1) |> coerce_ambiguous_time()

        range = {start, stop}

        # Exercise / Verify
        assert in_range?(range, date_time)
      end
    end

    property "returns false when the date_time is not within the range" do
      # Setup
      check all(date_time <- date_time_generator()) do
        start = Timex.shift(date_time, seconds: 1) |> coerce_ambiguous_time()
        stop = Timex.shift(start, years: 1) |> coerce_ambiguous_time()

        range = {start, stop}

        # Exercise / Verify
        refute in_range?(range, date_time)
      end
    end
  end
end
