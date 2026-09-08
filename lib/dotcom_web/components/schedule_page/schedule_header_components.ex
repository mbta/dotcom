defmodule DotcomWeb.Components.ScheduleHeaderComponents do
  @moduledoc """
  Components for the shared header for the schedule pages (line, timetable, and route-level alerts pages).
  """

  use DotcomWeb, :component

  import DotcomWeb.ViewHelpers, only: [break_text_at_slash: 1]

  alias Routes.Route

  def route_header(assigns) do
    ~H"""
    <h1 class={["schedule__route-name notranslate", route_header_font_size(@route)]}>
      <div class="flex flex-wrap gap-1 items-center">
        <.route_header_icon route={@route} />
        <span class="leading-tight">
          {@route |> route_header_text() |> break_text_at_slash()}
        </span>
      </div>
    </h1>
    """
  end

  defp route_header_text(%Route{type: 3, name: name} = route) do
    if Route.silver_line?(route) do
      if route.id == "746" do
        "Silver Line Waterfront"
      else
        "Silver Line #{name}"
      end
    else
      if route.long_name == "" do
        ~t"Bus Route"
      else
        route.long_name
      end
    end
  end

  defp route_header_text(%Route{name: name}), do: name

  defp route_header_font_size(%Route{type: 3} = route) do
    if Route.silver_line?(route) do
      "text-2xl sm:text-[2.5rem]"
    else
      "text-xl sm:text-[1.75rem]"
    end
  end

  defp route_header_font_size(_), do: "text-2xl sm:text-[2.5rem]"

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
      ~H"""
      <.bus_route_sign route_name={@route.name} />
      """
    end
  end

  defp route_header_icon(%{route: %Route{type: 4}} = assigns) do
    ~H"""
    <.header_icon class="mr-1" name="icon-ferry-default" />
    """
  end

  defp route_header_icon(assigns), do: ~H""

  attr :route_name, :string, required: true

  defp bus_route_sign(assigns) do
    ~H"""
    <div class="bus-route-sign mr-1 sm:mr-1.5">
      {@route_name}
    </div>
    """
  end

  attr :class, :string, default: ""
  attr :name, :string, required: true

  defp header_icon(assigns) do
    ~H"""
    <.icon
      aria-hidden
      class={"fill-current size-8 sm:size-10 shrink-0 #{@class}"}
      type="icon-svg"
      name={@name}
    />
    """
  end
end
