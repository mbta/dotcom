defmodule DotcomWeb.Components.ScheduleHeaderComponents do
  @moduledoc """
  Components for the shared header for the schedule pages (line, timetable, and route-level alerts pages).
  """

  use DotcomWeb, :component

  import DotcomWeb.ScheduleView, only: [route_header_text: 1]

  alias Routes.Route

  def route_header(assigns) do
    ~H"""
    <h1 class="schedule__route-name notranslate">
      <div class="flex gap-1 items-center">
        <.route_header_icon route={@route} /> <span>{route_header_text(@route)}</span>
      </div>
    </h1>
    """
  end

  defp route_header_icon(%{route: %Route{type: route_type}} = assigns)
       when route_type in [0, 1] do
    ~H"""
    <.header_icon name="icon-subway-default" />
    """
  end

  defp route_header_icon(%{route: %Route{type: 2}} = assigns) do
    ~H"""
    <.header_icon name="icon-commuter-rail-default" />
    """
  end

  defp route_header_icon(%{route: %Route{type: 3} = route} = assigns) do
    if Route.silver_line?(route) do
      ~H"""
      <.header_icon class="mr-1" name="icon-bus-default" />
      """
    else
      ~H""
    end
  end

  defp route_header_icon(%{route: %Route{type: 4}} = assigns) do
    ~H"""
    <.header_icon class="mr-1" name="icon-ferry-default" />
    """
  end

  defp route_header_icon(assigns), do: ~H""

  attr :class, :string, default: ""
  attr :name, :string, required: true

  defp header_icon(assigns) do
    ~H"""
    <.icon
      aria-hidden
      class={"fill-current size-8 shrink-0 #{@class}"}
      type="icon-svg"
      name={@name}
    />
    """
  end
end
