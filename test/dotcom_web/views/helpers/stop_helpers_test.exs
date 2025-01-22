defmodule DotcomWeb.Views.Helpers.StopHelpersTest do
  use ExUnit.Case, async: true

  import DotcomWeb.Views.Helpers.StopHelpers

  @disabled_list [{"id1", "text1"}, {"id2", "text2"}]

  describe "capitalized_disabled_text/2" do
    test "given a matching id in disabled_list" do
      stop = %Stops.Stop{id: "id2", closed_stop_info: nil}
      assert capitalized_disabled_text(@disabled_list, stop) == "Text2"
    end

    test "given a non-matching id in disabled_list" do
      stop = %Stops.Stop{id: "unknown", closed_stop_info: nil}
      assert capitalized_disabled_text(@disabled_list, stop) == nil
    end
  end
end
