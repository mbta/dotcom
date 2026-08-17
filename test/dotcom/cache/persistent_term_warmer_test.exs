defmodule Dotcom.Cache.PersistentTermWarmerTest do
  # async: false because :persistent_term is global mutable state
  use ExUnit.Case, async: false

  alias Dotcom.Cache.PersistentTermWarmer

  @hidden_icons_key {DotcomWeb.LayoutView, :hidden_icons}

  describe "warm_homepage/0" do
    test "populates the hidden_icons key" do
      assert :persistent_term.get(@hidden_icons_key, :missing) == :missing
      PersistentTermWarmer.warm_homepage()
      assert :persistent_term.get(@hidden_icons_key, :missing) != :missing
    end
  end
end
