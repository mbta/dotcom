defmodule Dotcom.TripPlan.DateTimeTest do
  use ExUnit.Case, async: true

  alias Dotcom.TripPlan.Query

  @now %DateTime{
    time_zone: "America/New_York",
    utc_offset: -18_000,
    std_offset: 3_600,
    year: 2018,
    month: 8,
    day: 13,
    hour: 12,
    minute: 0,
    second: 0,
    zone_abbr: "EDT"
  }

  @end_of_rating @now |> Timex.shift(months: 3) |> DateTime.to_date()

  @date %{
    "year" => "2018",
    "month" => "8",
    "day" => "14",
    "hour" => "6",
    "minute" => "10",
    "am_pm" => "PM"
  }

  @opts [now: @now, end_of_rating: @end_of_rating]

  describe "validate/2" do
    test "sets time to %DateTime{} if date is valid and in future" do
      params = %{"date_time" => @date, "time" => "depart"}
      query = Dotcom.TripPlan.DateTime.validate(%Query{}, params, @opts)

      assert %Query{} = query
      assert {:depart_at, %DateTime{} = dt} = query.time
      assert dt.month == 8
      assert dt.day == 14
      assert dt.hour == 18
    end

    test "sets time to %DateTime{} if date is valid and within the past hour" do
      fifty_minutes_ago = %{
        "year" => "2018",
        "month" => "8",
        "day" => "13",
        "hour" => "11",
        "minute" => "10",
        "am_pm" => "AM"
      }

      params = %{"date_time" => fifty_minutes_ago, "time" => "depart"}
      query = Dotcom.TripPlan.DateTime.validate(%Query{}, params, @opts)

      assert %Query{} = query
      assert query.errors == MapSet.new()
      assert {:depart_at, %DateTime{} = dt} = query.time
      assert dt.month == 8
      assert dt.day == 13
      assert dt.hour == 11
      assert dt.minute == 10
    end

    test "adds :past date to errors if date is in the past by more than an hour" do
      params = %{"date_time" => Map.put(@date, "day", "1"), "time" => "depart"}
      query = Dotcom.TripPlan.DateTime.validate(%Query{}, params, @opts)
      assert %Query{} = query
      assert query.errors == MapSet.new([:past])
      assert {:depart_at, %DateTime{} = dt} = query.time
      assert dt.year == 2018
      assert dt.month == 8
      assert dt.day == 1
    end

    test "sets time type to :arrive_at if time param is arrive" do
      params = %{"date_time" => @date, "time" => "arrive"}
      query = Dotcom.TripPlan.DateTime.validate(%Query{}, params, @opts)

      assert %Query{} = query
      assert {:arrive_by, %DateTime{} = dt} = query.time
      assert dt.month == 8
      assert dt.day == 14
      assert dt.hour == 18
    end

    test "sets time type to :depart_at if time param is leave-now" do
      params = %{"date_time" => @date, "time" => "leave-now"}
      query = Dotcom.TripPlan.DateTime.validate(%Query{}, params, @opts)

      assert %Query{} = query
      assert {:depart_at, %DateTime{} = dt} = query.time
      assert dt.month == 8
      assert dt.day == 14
      assert dt.hour == 18
    end

    test "sets date to {:error, :invalid} if date is invalid" do
      params = %{"date_time" => Map.put(@date, "day", "invalid"), "time" => "depart"}
      query = Dotcom.TripPlan.DateTime.validate(%Query{}, params, @opts)
      assert %Query{} = query
      assert query.time == {:error, :invalid_date}
      assert query.errors == MapSet.new([:invalid_date])

      params = %{"date_time" => Map.delete(@date, "day"), "time" => "depart"}
      query = Dotcom.TripPlan.DateTime.validate(%Query{}, params, @opts)
      assert %Query{} = query
      assert query.time == {:error, :invalid_date}
      assert query.errors == MapSet.new([:invalid_date])
    end

    test "adds :too_future date to errors if date is outside of rating" do
      params = %{"date_time" => Map.put(@date, "year", "2019"), "time" => "depart"}
      query = Dotcom.TripPlan.DateTime.validate(%Query{}, params, @opts)
      assert %Query{} = query
      assert query.errors == MapSet.new([:too_future])
      assert {:depart_at, %DateTime{} = dt} = query.time
      assert dt.year == 2019
      assert dt.month == 8
      assert dt.day == 14
    end

    test "rounds dates to the next round 5 minute interval" do
      params = %{"date_time" => Map.put(@date, "minute", "23"), "time" => "depart"}
      query = Dotcom.TripPlan.DateTime.validate(%Query{}, params, @opts)
      assert %Query{} = query
      assert query.errors == MapSet.new()
      assert {:depart_at, %DateTime{} = dt} = query.time
      assert dt.year == 2018
      assert dt.month == 8
      assert dt.minute == 25
    end
  end

  describe "round_minute/1" do
    test "rounds minute of DateTime to next 5-minute interval" do
      dt = %{@now | minute: 32}
      assert %DateTime{minute: 35} = Dotcom.TripPlan.DateTime.round_minute(dt)
    end
  end
end
