defmodule DotcomWeb.ComponentsTest do
  @moduledoc false
  use ExUnit.Case
  import Phoenix.LiveViewTest
  import DotcomWeb.Components

  describe "algolia_autocomplete" do
    test "raises an error without required ID" do
      assert_raise KeyError,
                   fn ->
                     render_component(&algolia_autocomplete/1, %{})
                   end
    end

    test "renders with AlgoliaAutocomplete hook and appropriate data attributes" do
      assert """
             <div id="testID" phx-hook="AlgoliaAutocomplete">
               <div class="c-search-bar__autocomplete" data-placeholder="Search for routes, info, and more" data-config="basic-config"></div>
               <div class="c-search-bar__autocomplete-results"></div>
             </div>
             """ =~
               render_component(
                 &algolia_autocomplete/1,
                 %{
                   id: "testID",
                   config_type: "basic-config"
                 }
               )
    end
  end
end
