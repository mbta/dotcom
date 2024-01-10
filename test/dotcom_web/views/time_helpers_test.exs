defmodule DotcomWeb.TimeHelpersTest do
  use ExUnit.Case, async: true

  import DotcomWeb.TimeHelpers

  describe "format_date/1" do
    test "parses the date and returns a string" do
      assert format_date(~N[2017-01-15T12:00:00]) == "January 15, 2017"
    end
  end
end
