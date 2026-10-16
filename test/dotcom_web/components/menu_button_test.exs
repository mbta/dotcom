defmodule DotcomWeb.Components.MenuButtonTest do
  use ExUnit.Case, async: true

  import Phoenix.Component
  import Phoenix.LiveViewTest
  import DotcomWeb.Components.MenuButton

  describe "menu_button/1" do
    test "renders an accessible selection menu with the documented payload" do
      html = render_component(&example/1, %{}) |> Floki.parse_fragment!()

      assert Floki.find(html, "#sort-menu[phx-hook='MenuButton']") != []

      assert Floki.find(
               html,
               "#sort-menu-button[aria-haspopup='menu'][aria-expanded='false'][aria-controls='sort-menu-menu']"
             ) != []

      assert Floki.find(html, "#sort-menu-menu[role='menu'][hidden]") != []
      assert Floki.find(html, "#sort-menu-menu[aria-labelledby='sort-menu-button']") != []
      assert Floki.find(html, "#sort-menu-button") |> Floki.text() =~ "Sort"

      items = Floki.find(html, "[role='menuitemradio']")
      assert length(items) == 2
      assert Floki.attribute(items, "tabindex") == ["-1", "-1"]
      assert Floki.attribute(items, "aria-checked") == ["true", "false"]
      assert Floki.attribute(items, "phx-click") == ["sort", "sort"]
      assert Floki.attribute(items, "phx-value-option") == ["newest", "oldest"]
      assert Floki.find(html, "[role='separator']") |> Floki.text() == "Other sorting"
    end

    test "provides focus styling and viewport-constrained sizing" do
      html = render_component(&example/1, %{}) |> Floki.parse_fragment!()
      classes = Floki.find(html, "[role='menuitemradio']") |> Floki.attribute("class")

      assert Enum.all?(classes, &String.contains?(&1, "focus-visible:outline-2"))
      assert Enum.all?(classes, &String.contains?(&1, "aria-checked:bg-brand-primary-lightest"))

      menu_class = Floki.find(html, "[role='menu']") |> Floki.attribute("class") |> hd()
      assert menu_class =~ "max-w-[calc(100vw-2rem)]"
      assert menu_class =~ "max-h-[min(24rem,50vh)]"
      assert menu_class =~ "overflow-y-auto"
      refute menu_class =~ "min-w-[30rem]"
    end
  end

  defp example(assigns) do
    ~H"""
    <.menu_button id="sort-menu">
      <:label>Sort</:label>
      <:separator>Other sorting</:separator>
      <:item event="sort" value="newest" active>Newest first</:item>
      <:item event="sort" value="oldest" separator_before>Oldest first</:item>
    </.menu_button>
    """
  end
end
