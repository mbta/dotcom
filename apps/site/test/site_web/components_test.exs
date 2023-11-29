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
      assert """
             <div phx-hook="AlgoliaAutocomplete" data-turbolinks-permanent id="testID">
               <div class="c-search-bar__autocomplete" data-locations data-algolia="routes,stops" data-placeholder="Search for routes, info, and more"></div>
               <div class="c-search-bar__autocomplete-results"></div>
             </div>
             """ =~
               render_component(
                 &algolia_autocomplete/1,
                 %{id: "testID", locations: true, algolia_indexes: [:stops, :routes]}
               )
    end

    test "can indicate a state change listener by name" do
      assert """
             <div phx-hook="AlgoliaAutocomplete" data-turbolinks-permanent id="test_with_listener">
               <div class="c-search-bar__autocomplete" data-locations data-placeholder="Search for routes, info, and more" data-state-change-listener="nav"></div>
               <div class="c-search-bar__autocomplete-results"></div>
             </div>
             """ =~
               render_component(
                 &algolia_autocomplete/1,
                 %{id: "test_with_listener", locations: true, state_change_listener: "nav"}
               )
    end
  end
end
