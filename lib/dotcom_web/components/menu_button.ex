defmodule DotcomWeb.Components.MenuButton do
  @moduledoc """
  Accessible menu button (WAI-ARIA APG "Menu Button" pattern) where one item
  is the active/selected choice.

  Items are `role="menuitemradio"` with `aria-checked`, so screen readers
  announce e.g. "Newest first, checked, 1 of 3". The active item is server
  state: pass `active` on whichever item is current and LiveView re-renders
  `aria-checked` when it changes.

  Keyboard behavior and focus are handled client-side by the `MenuButton`
  hook (assets/ts/phoenix-hooks/menu-button.ts).

  Give each item a unique `value` so focus can follow the same option across
  LiveView patches. Item slots should contain non-interactive content; the
  component owns focus and activation.

  Tab closes the menu and moves forward; Shift+Tab closes it and returns to
  the trigger. Typing searches option labels, with a 500ms pause resetting
  the search. Focus follows the option value across patches, falling back
  to a nearby surviving option when that value is removed.

  ## Example

      <.menu_button id="sort-menu">
        <:label>Sort</:label>
        <:item event="sort" value="newest" active={@sort == "newest"}>Newest first</:item>
        <:item event="sort" value="oldest" active={@sort == "oldest"}>Oldest first</:item>
        <:item event="sort" value="title" active={@sort == "title"} separator_before>Title A–Z</:item>
      </.menu_button>

      @impl true
      def handle_event("sort", %{"option" => sort}, socket),
        do: {:noreply, assign(socket, sort: sort)}
  """
  use DotcomWeb, :component

  attr :id, :string, required: true, doc: "unique DOM id (needed by the hook)"
  slot :label, required: true, doc: "visible button content"
  slot :separator, required: false, doc: "visible separating element"
  attr :class, :string, default: nil

  slot :item, required: true do
    attr :event, :string, required: true, doc: "LiveView event pushed when the item is chosen"
    attr :value, :any, required: true, doc: "unique option value sent as the \"option\" param"
    attr :active, :boolean, doc: "marks this item as the current choice (aria-checked)"
    attr :separator_before, :boolean, doc: "render a separator above this item"
  end

  def menu_button(assigns) do
    ~H"""
    <div id={@id} phx-hook="MenuButton" class={["relative inline-block", @class]}>
      <button
        type="button"
        id={"#{@id}-button"}
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls={"#{@id}-menu"}
        class="flex gap-xs items-center bg-white"
      >
        {render_slot(@label)}
        <.icon name="caret-down" class="size-4" />
      </button>

      <ul
        id={"#{@id}-menu"}
        role="menu"
        aria-labelledby={"#{@id}-button"}
        hidden
        class="absolute left-0 top-full z-10 mt-1 w-max min-w-[min(12rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] max-h-[min(24rem,50vh)] overflow-y-auto whitespace-normal break-words rounded-md bg-white text-sm shadow-[0_0_3px_2px_rgba(0,0,0,0.2)] list-none p-0"
      >
        <%= for item <- @item do %>
          <li :if={item[:separator_before]} role="separator">{render_slot(@separator)}</li>
          <li
            role="menuitemradio"
            tabindex="-1"
            aria-checked={to_string(item[:active] == true)}
            phx-click={item.event}
            phx-value-option={item.value}
            class="group cursor-pointer aria-checked:bg-brand-primary-lightest hover:bg-gray-lightest focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px] first:rounded-t-md last:rounded-b-md"
          >
            {render_slot(item)}
          </li>
        <% end %>
      </ul>
    </div>
    """
  end
end
