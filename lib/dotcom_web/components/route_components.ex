defmodule DotcomWeb.RouteComponents do
  @moduledoc """
  Render components directly from `Route.Route` structs.
  Needs to be consolidated with, or possibly replace, the `RouteSymbols` module.
  """
  use DotcomWeb, :component

  import CSSHelpers

  alias MbtaMetro.Components.SystemIcons
  alias Routes.Route

  attr :rest, :global
  attr :route, Route, required: true
  attr :size, :string, default: "default", values: ["default", "small"]

  def route_icon(%{route: %Route{type: 2}} = assigns) do
    ~H"""
    <SystemIcons.mode_icon mode="commuter-rail" size={@size} {@rest} />
    """
  end

  def route_icon(%{route: %Route{type: 4}} = assigns) do
    ~H"""
    <SystemIcons.mode_icon mode="ferry" size={@size} {@rest} />
    """
  end

  def route_icon(%{route: %Route{id: route_id}} = assigns) do
    case line_name(route_id) do
      nil ->
        ~H"""
        <SystemIcons.route_icon name={@route.name} size={@size} {@rest} />
        """

      line_name ->
        assigns = assign(assigns, :line, line_name)

        ~H"""
        <SystemIcons.route_icon line={@line} size={@size} {@rest} />
        """
    end
  end

  defp line_name(route_id) do
    case route_id do
      "Mattapan" -> "mattapan-line"
      "Red" -> "red-line"
      "Green" -> "green-line"
      "Green-" <> branch -> "green-line-#{String.downcase(branch)}"
      "Blue" -> "blue-line"
      "Orange" -> "orange-line"
      _ -> nil
    end
  end

  attr :route, Route, required: true
  attr :list_items, :list, default: []
  slot :list_item, doc: "Content for each item"

  @doc """
  Creates a bordered list featuring a styled route diagram-esque line running
  along the left side, with a large dot aligned with each list item. The line
  color is informed by the given `%Route{}`.
  """
  def lined_list(assigns) do
    ~H"""
    <div class="divide-y-[1px] divide-gray-lightest border-t-xs border-gray-lightest [&>*:first-child_.top]:invisible [&>*:last-child_.bottom]:invisible">
      <div :for={item <- @list_items} class="pr-7 pl-5 py-sm gap-md flex justify-between items-center">
        <div
          class="w-1 z-10 shrink-0 flex flex-col self-stretch"
          style="margin-block: calc(-1 * (var(--spacing-sm) + 1px));"
        >
          <div class={"#{route_to_class(@route)} grow top"} />
          <div class={"#{route_to_class(@route)} grow bottom"} />
        </div>
        <div
          class={"#{route_to_class(@route)} size-3.5 shrink-0 rounded-full border-xs border-[#00000026] z-20"}
          style="margin-left: calc(-1.75rem + 3px);"
        />
        {render_slot(@list_item, item)}
      </div>
    </div>
    """
  end
end
