defmodule DotcomWeb.Components.ScheduleHeaderComponents do
  @moduledoc """
  Components for the shared header for the schedule pages (line, timetable, and route-level alerts pages).
  """

  use DotcomWeb, :component

  import DotcomWeb.ViewHelpers, only: [break_text_at_slash: 1]
  import Routes.Route, only: [is_silver_line?: 1]

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

  # The text that shows up visibly on the schedule header as the
  # route's title. For subway, commuter rail, and ferry, this will be
  # the route's name. For non-silver-line bus, it'll be the route long
  # name (e.g. "Harvard Square - Nubian Station"), or "Bus Route" if
  # there isn't one. Silver Line buses get a more descriptive "Silver
  # Line"-flavored name.
  defp route_header_text(%Route{id: "746", type: 3}), do: "Silver Line Waterfront"

  defp route_header_text(%Route{type: 3, name: name} = route) when is_silver_line?(route),
    do: "Silver Line #{name}"

  defp route_header_text(%Route{type: 3, long_name: ""}), do: ~t"Bus Route"
  defp route_header_text(%Route{type: 3, long_name: long_name}), do: long_name

  defp route_header_text(%Route{name: name}), do: name

  # Non-silver-line bus routes tend to have longer names, so we use a
  # smaller font size for those.
  defp route_header_font_size(%Route{type: 3} = route) when not is_silver_line?(route),
    do: "text-xl sm:text-[1.75rem]"

  defp route_header_font_size(_), do: "text-2xl sm:text-[2.5rem]"

  # The icon that goes to the left of the title. For non-silver-line
  # bus, that icon is a route pill with the route number in it. For
  # everything else, it's a mode icon.
  #
  # NOTE: For subway, commuter rail, ferry, and silver line bus, the
  # icon is purely decorative, and is thus `aria-hidden`. For
  # non-silver-line bus, the icon has the bus route number in it,
  # which is useful information, and is thus *not* aria-hidden; it
  # *should* be included in screen reader readout.
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

  defp route_header_icon(%{route: %Route{type: 3} = route} = assigns)
       when is_silver_line?(route) do
    ~H"""
    <.header_icon class="mr-1" name="icon-bus-default" />
    """
  end

  defp route_header_icon(%{route: %Route{type: 3}} = assigns) do
    ~H"""
    <.bus_route_sign route_name={@route.name} />
    """
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
