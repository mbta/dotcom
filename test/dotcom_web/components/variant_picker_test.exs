defmodule DotcomWeb.Components.VariantPickerTest do
  use ExUnit.Case, async: true

  import Phoenix.Component
  import Phoenix.LiveViewTest
  import DotcomWeb.Components.VariantPicker

  alias Test.Support.Factories

  defp pattern(attrs) do
    Factories.RoutePatterns.RoutePattern.build(:route_pattern, attrs)
  end

  defp bus_route, do: Factories.Routes.Route.build(:route, %{id: "1", type: 3})
  defp green_route, do: Factories.Routes.Route.build(:route, %{id: "Green", type: 0})

  defp render_picker(assigns) do
    assigns = Map.put_new(assigns, :selected_variant, nil)

    render_component(&example/1, assigns) |> Floki.parse_fragment!()
  end

  defp example(assigns) do
    ~H"""
    <.variant_picker
      route={@route}
      route_patterns={@route_patterns}
      selected_variant={@selected_variant}
    />
    """
  end

  defp item_text(html, option) do
    html
    |> Floki.find(~s|li[phx-value-option="#{option}"]|)
    |> Floki.text()
    |> String.replace(~r/\s+/, " ")
    |> String.trim()
  end

  describe "variant_picker?/1" do
    test "is true for the Green Line and its branches" do
      assert variant_picker?(green_route())
      assert variant_picker?(Factories.Routes.Route.build(:route, %{id: "Green-B", type: 0}))
    end

    test "is true for buses" do
      assert variant_picker?(bus_route())
    end

    test "is false for other routes" do
      refute variant_picker?(Factories.Routes.Route.build(:route, %{id: "Red", type: 1}))

      refute variant_picker?(
               Factories.Routes.Route.build(:route, %{id: "CR-Providence", type: 2})
             )
    end
  end

  describe "trigger label" do
    defp trigger_text(html),
      do: html |> Floki.find("#variant-menu-button") |> Floki.text() |> String.trim()

    test "describes no selection" do
      assert trigger_text(render_picker(%{route: green_route(), route_patterns: []})) =~
               "All branches"

      assert trigger_text(render_picker(%{route: bus_route(), route_patterns: []})) =~
               "All variants"
    end

    test "uses the headsign of the selected pattern" do
      patterns = [pattern(%{id: "a", headsign: "Harvard", typicality: 1})]

      html =
        render_picker(%{route: bus_route(), route_patterns: patterns, selected_variant: "a"})

      assert trigger_text(html) =~ "Harvard"
    end

    test "shows the branch icon and headsign for a selected Green Line branch" do
      patterns = [pattern(%{id: "b", route_id: "Green-B", headsign: "Boston College"})]

      html =
        render_picker(%{route: green_route(), route_patterns: patterns, selected_variant: "b"})

      assert trigger_text(html) =~ "Boston College"
      assert Floki.find(html, "#variant-menu-button svg, #variant-menu-button img") != []
    end
  end

  describe "variant_picker/1 for buses" do
    setup do
      common = pattern(%{id: "common", headsign: "Harvard", typicality: 1})

      less_common =
        pattern(%{
          id: "less",
          headsign: "Dudley",
          typicality: 2,
          name: "Origin-Dudley",
          time_desc: nil
        })

      uncommon =
        pattern(%{
          id: "rare",
          headsign: "Garage",
          typicality: 4,
          name: "Depot-Garage",
          time_desc: "Early mornings"
        })

      [patterns: [common, less_common, uncommon]]
    end

    test "renders an all variants option plus one item per pattern", %{patterns: patterns} do
      html = render_picker(%{route: bus_route(), route_patterns: patterns})

      assert Floki.find(html, "#variant-menu[phx-hook='MenuButton']") != []
      assert Floki.find(html, "li[role='menuitemradio']") |> length() == 4
      assert Floki.find(html, "li:not([phx-value-option])") |> Floki.text() =~ "All variants"
    end

    test "describes each pattern", %{patterns: patterns} do
      html = render_picker(%{route: bus_route(), route_patterns: patterns})

      assert item_text(html, "common") =~ "typical route"
      assert item_text(html, "less") =~ "from Origin, less common route"
      assert item_text(html, "rare") =~ "Early mornings from Depot"
    end

    test "separates uncommon patterns from the rest", %{patterns: patterns} do
      html = render_picker(%{route: bus_route(), route_patterns: patterns})

      assert Floki.find(html, "li[role='separator']") |> length() == 1
    end

    test "marks the selected pattern as checked", %{patterns: patterns} do
      html =
        render_picker(%{route: bus_route(), route_patterns: patterns, selected_variant: "less"})

      assert Floki.find(html, ~s|li[phx-value-option="less"][aria-checked="true"]|) != []
      assert Floki.find(html, ~s|li[phx-value-option="common"][aria-checked="false"]|) != []
    end

    test "marks all variants as checked when nothing is selected", %{patterns: patterns} do
      html = render_picker(%{route: bus_route(), route_patterns: patterns})

      assert Floki.find(html, ~s|li:not([phx-value-option])[aria-checked="true"]|) != []
    end

    test "omits the separator when there are no uncommon patterns" do
      html =
        render_picker(%{
          route: bus_route(),
          route_patterns: [pattern(%{id: "a", typicality: 1})]
        })

      assert Floki.find(html, "li[role='separator']") == []
    end
  end

  describe "variant_picker/1 for the Green Line" do
    test "renders an all branches option and a branch icon item per pattern" do
      patterns = [
        pattern(%{id: "b", route_id: "Green-B", headsign: "Boston College", sort_order: 1}),
        pattern(%{id: "e", route_id: "Green-E", headsign: "Heath Street", sort_order: 2})
      ]

      html = render_picker(%{route: green_route(), route_patterns: patterns})

      assert Floki.find(html, "li[role='menuitemradio']") |> length() == 3
      assert Floki.find(html, "li[role='separator']") == []
      assert Floki.find(html, "li:not([phx-value-option])") |> Floki.text() =~ "All branches"
      assert item_text(html, "b") =~ "Boston College"
      assert item_text(html, "e") =~ "Heath Street"
    end
  end
end
