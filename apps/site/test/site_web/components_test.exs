defmodule SiteWeb.ComponentsTest do
  @moduledoc false
  use ExUnit.Case
  import Phoenix.LiveViewTest
  import SiteWeb.Components

  describe "algolia_autocomplete" do
    test "raises an error without search type" do
      assert_raise RuntimeError,
                   "Nothing to search! Please enable at least one search type.",
                   fn ->
                     render_component(
                       &algolia_autocomplete/1,
                       %{id: "test1"}
                     )
                   end
    end

    test "raises an error without required ID" do
      assert_raise KeyError,
                   fn ->
                     render_component(&algolia_autocomplete/1, %{locations: true})
                   end
    end

    test "renders with AlgoliaAutocomplete hook and appropriate data attributes" do
      assert render_component(
               &algolia_autocomplete/1,
               %{id: "testID", locations: true, algolia_indexes: [:stops, :routes]}
             ) ==
               ~s(<div phx-hook="AlgoliaAutocomplete" data-turbolinks-permanent id="testID" class="c-search-bar__autocomplete" data-locations data-algolia="routes,stops"></div>)
    end
  end
end
