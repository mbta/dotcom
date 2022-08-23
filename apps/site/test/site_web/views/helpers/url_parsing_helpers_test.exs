defmodule SiteWeb.Views.Helpers.AlertHelpersTest do
  use SiteWeb.ConnCase, async: true
  import SiteWeb.Views.Helpers.URLParsingHelpers

  describe "get_full_url/1" do
    test "should return the url parsed from the text" do
      text =
        "The Orange Line shutdown (9 PM, August 19 - September 18) overlaps with Green Line closures. Learn more and see alternative travel options at MBTA.com/BBT2022"

      assert get_full_url(text) == "https://MBTA.com/BBT2022"
    end

    test "should return nil if there is no url in the parsed text" do
      text =
        "The Orange Line shutdown (9 PM, August 19 - September 18) overlaps with Green Line closures. Learn more and see alternative travel options at"

      assert get_full_url(text) == nil
    end
  end
end
