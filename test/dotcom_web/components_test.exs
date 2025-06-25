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

    test "defaults to placeholder for aria-label" do
      placeholder = Faker.App.name()

      html =
        render_component(&algolia_autocomplete/1, %{
          id: Faker.String.base64(5),
          config_type: "basic-config",
          placeholder: placeholder
        })

      assert html =~ ~s(<search aria-label="#{placeholder}")
    end

    test "uses custom aria-label" do
      placeholder = Faker.App.name()
      label = Faker.Beer.brand()

      html =
        render_component(&algolia_autocomplete/1, %{
          id: Faker.String.base64(5),
          config_type: "basic-config",
          placeholder: placeholder,
          "aria-label": label
        })

      assert html =~ ~s(<search aria-label="#{label}")
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

  describe "bordered_container" do
    test "renders header and content with a divider line" do
      assigns = %{
        title: Faker.Lorem.sentence(1..3),
        content: Faker.Lorem.sentence(3..5)
      }

      str =
        rendered_to_string(~H"""
        <.bordered_container>
          <:heading>
            <span>{assigns.title}</span>
          </:heading>
          {assigns.content}
        </.bordered_container>
        """)

      assert str =~ assigns.title
      assert str =~ assigns.content

      assert Floki.parse_fragment!(str)
             |> Floki.find("hr")
             |> Enum.count()
    end

    test "optionally hides the dividing line" do
      assigns = %{
        title: Faker.Lorem.sentence(1..3),
        content: Faker.Lorem.sentence(3..5)
      }

      str =
        rendered_to_string(~H"""
        <.bordered_container hide_divider>
          <:heading>
            <span>{assigns.title}</span>
          </:heading>
          {assigns.content}
        </.bordered_container>
        """)

      assert str =~ assigns.title
      assert str =~ assigns.content

      assert Floki.parse_fragment!(str)
             |> Floki.find("hr") == []
    end
  end

  describe "tooltip" do
    test "sets up basic tooltip" do
      assigns = %{
        title: Faker.Lorem.sentence(2),
        placement: Faker.Util.pick([:left, :right, :top, :bottom]),
        content: Faker.App.name()
      }

      tooltip =
        rendered_to_string(~H"""
        <.tooltip title={assigns.title} placement={assigns.placement}>
          {assigns.content}
        </.tooltip>
        """)
        |> Floki.parse_fragment!()

      assert Floki.attribute(tooltip, "data-toggle") == ["tooltip"]
      assert Floki.attribute(tooltip, "data-placement") == ["#{assigns.placement}"]
      assert Floki.attribute(tooltip, "title") == ["#{assigns.title}"]
      assert Floki.text(tooltip) =~ assigns.content
    end
  end
end
