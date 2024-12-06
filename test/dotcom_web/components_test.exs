defmodule DotcomWeb.ComponentsTest do
  @moduledoc false
  use ExUnit.Case

  import Phoenix.Component
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

  describe "error_container" do
    test "optionally shows a title" do
      assigns = %{
        title: Faker.Lorem.sentence(2),
        content: Faker.Lorem.sentence(4)
      }

      str =
        rendered_to_string(~H"""
        <.error_container title={assigns.title}>
          {assigns.content}
        </.error_container>
        """)

      assert str =~ assigns.title
      assert str =~ assigns.content

      assert rendered_to_string(~H"""
             <.error_container>{assigns.content}</.error_container>
             """) =~ assigns.content
    end
  end
end
