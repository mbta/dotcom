defmodule SiteWeb.TimeHelpersTest do
  use ExUnit.Case, async: true

  import SiteWeb.TimeHelpers

  describe "format_date/1" do
    test "parses the date and returns a string" do
      assert format_date(~N[2017-01-15T12:00:00]) == "January 15, 2017"
    end
  end

  describe "format_time/1" do
    test "parses the time and returns a string" do
      assert format_time(~N[2017-01-15T12:00:00]) == "12 PM"
      assert format_time(~N[2017-01-15T12:09:00]) == "12:09 PM"
    end
  end

  describe "format_schedule_time/1" do
    test "parses the time and returns a string" do
      assert format_schedule_time(~N[2017-01-15T12:00:00]) == "12:00 PM"
    end
  end
end
