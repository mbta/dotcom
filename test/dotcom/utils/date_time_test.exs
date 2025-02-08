defmodule Dotcom.Utils.DateTimeTest do
  use ExUnit.Case

  import Dotcom.Utils.DateTime
  import ExUnit.CaptureLog

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
end
