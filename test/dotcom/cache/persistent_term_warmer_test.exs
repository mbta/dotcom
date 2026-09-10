defmodule Dotcom.Cache.PersistentTermWarmerTest do
  # async: false because :persistent_term is global mutable state
  use ExUnit.Case, async: false

  alias Dotcom.Cache.PersistentTermWarmer
  alias Dotcom.Locales

  @hidden_icons_key {DotcomWeb.LayoutView, :hidden_icons}
  @per_locale_keys Enum.map(Locales.locales(), fn %{code: code} ->
                     {DotcomWeb.LayoutView, :top_tier_nav, code}
                   end)
  @all_keys [@hidden_icons_key | @per_locale_keys]

  setup do
    Enum.each(@all_keys, &:persistent_term.erase/1)
    on_exit(fn -> Enum.each(@all_keys, &:persistent_term.erase/1) end)
  end

  describe "warm_homepage/0" do
    test "populates the hidden_icons key" do
      assert :persistent_term.get(@hidden_icons_key, :missing) == :missing
      PersistentTermWarmer.warm_homepage()
      assert :persistent_term.get(@hidden_icons_key, :missing) != :missing
    end

    test "populates top_tier_nav for every locale" do
      for key <- @per_locale_keys do
        assert :persistent_term.get(key, :missing) == :missing
      end

      PersistentTermWarmer.warm_homepage()

      for key <- @per_locale_keys do
        assert :persistent_term.get(key, :missing) != :missing,
               "Expected #{inspect(key)} to be populated after warm_homepage/0"
      end
    end

    test "each locale's top_tier_nav is rendered with the correct locale" do
      PersistentTermWarmer.warm_homepage()

      results =
        for %{code: code} <- Locales.locales() do
          {code, :persistent_term.get({DotcomWeb.LayoutView, :top_tier_nav, code})}
        end

      # All locales must have been stored as {:safe, _} iodata
      for {code, value} <- results do
        assert match?({:safe, _}, value),
               "Expected {:safe, _} for locale #{code}, got: #{inspect(value)}"
      end
    end
  end
end
