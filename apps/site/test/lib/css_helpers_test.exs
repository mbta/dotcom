defmodule CSSHelpersTest do
  use ExUnit.Case

  import CSSHelpers

  describe "string_to_class/1" do
    test "converts string to a dash delimted string" do
      assert string_to_class("Guides") == "guides"
      assert string_to_class("Senior CharlieCard Event") == "senior-charliecard-event"
      assert string_to_class("Auto-pay") == "auto-pay"
      assert string_to_class("V3 API") == "v3-api"
      assert string_to_class("commuter_rail") == "commuter-rail"
      assert string_to_class("MBTA: Policy") == "mbta-policy"
    end
  end

  describe "atom_to_class/1" do
    test "converts the atom to a dash delimited string" do
      assert atom_to_class(:the_ride) == "the-ride"
      assert atom_to_class(:subway) == "subway"
      assert atom_to_class(:commuter_rail) == "commuter-rail"
      assert atom_to_class(:has_multiple_words) == "has-multiple-words"
      assert atom_to_class([:another_example]) == "another-example"
    end
  end
end
