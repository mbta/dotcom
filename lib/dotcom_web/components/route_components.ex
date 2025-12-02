defmodule DotcomWeb.RouteComponents do
  @moduledoc """
  Render components directly from `Route.Route` structs.
  Needs to be consolidated with, or possibly replace, the `RouteSymbols` module.
  """
  use DotcomWeb, :component

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
end
