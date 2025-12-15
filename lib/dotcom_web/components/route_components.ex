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

  slot :inner_block

  @doc """
  Creates a bordered list featuring a styled route diagram-esque line running
  along the left side, with a large dot aligned with each list item. The line
  color is informed by the given `%Route{}`.
  """
  def lined_list(assigns) do
    ~H"""
    <div class="divide-y-[1px] divide-gray-lightest border-t-xs border-gray-lightest [&>*:first-child_.top]:invisible [&>*:last-child_.bottom]:invisible">
      {render_slot(@inner_block)}
    </div>
    """
  end

  attr :route, Route, required: true
  attr :class, :string, default: ""
  attr :variant, :string, default: "default", values: ["default", "mode", "none"]
  slot :inner_block, doc: "Content for each item"

  def lined_list_item(assigns) do
    ~H"""
    <div class={"p-sm gap-sm flex justify-between items-center #{@class}"}>
      <div
        class="w-6 shrink-0 self-stretch flex justify-center relative outline-xs outline-red"
        style="margin-block: calc(-1 * (var(--spacing-sm) + 1px));"
      >
        <div class="w-1 z-10 shrink-0 flex flex-col self-stretch">
          <div class={"#{route_to_class(@route)} grow top"} />
          <div class={"#{route_to_class(@route)} grow bottom"} />
        </div>
        <.lined_list_marker variant={@variant} route={@route} />
      </div>

      {render_slot(@inner_block)}
    </div>
    """
  end

  attr :route, Route, required: true
  attr :variant, :string, default: "default", values: ["default", "mode", "none"]

  defp lined_list_marker(%{variant: "none"} = assigns) do
    ~H""
  end

  defp lined_list_marker(%{variant: "mode"} = assigns) do
    mode = assigns.route |> Route.type_atom() |> atom_to_class()
    line_name = assigns.route |> Route.icon_atom() |> atom_to_class()

    assigns =
      assign(assigns, %{
        line_name: line_name,
        mode: mode
      })

    ~H"""
    <SystemIcons.mode_icon
      aria-hidden
      line={@line_name}
      mode={@mode}
      class="absolute top-0 bottom-0 left-0 right-0 z-20 m-auto"
    />
    <div />
    """
  end

  defp lined_list_marker(assigns) do
    ~H"""
    <div class={[
      "#{route_to_class(@route)}",
      "absolute top-0 bottom-0 left-0 right-0 z-20 m-auto",
      "size-3.5 rounded-full rounded-full border-xs border-[#00000026]"
    ]} />
    """
  end
end
