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
      id = Faker.String.base64(5)
      config = "basic-config"

      html =
        render_component(&algolia_autocomplete/1, %{
          id: id,
          config_type: config
        })

      assert html =~ ~s(<div class="c-search-bar__autocomplete-results"></div>)

      assert html =~
               ~s(<div class="c-search-bar__autocomplete" data-placeholder="Search for routes, info, and more" data-config="#{config}"></div>)

      assert html =~ ~s(<div id="#{id}" phx-hook="AlgoliaAutocomplete" phx-update="ignore">)
    end
  end
end
