defmodule Dotcom.Utils.DateTimeTest do
  use ExUnit.Case

  import Dotcom.Utils.DateTime

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

    end

    test "chooses the later time when given an ambiguous date_time" do

    end

    test "logs the reason and returns `now` when given an error tuple" do

    end

    test "logs the input and returns `now` as a fallback" do

    end
  end
end
