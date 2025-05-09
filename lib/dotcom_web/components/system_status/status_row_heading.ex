defmodule DotcomWeb.Components.SystemStatus.StatusRowHeading do
  @moduledoc """
  Renders a status as a readable version of that status, along with an
  optional prefix and a route pill for the given route ID's.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.RouteSymbols, only: [subway_route_pill: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]
  import DotcomWeb.Components.SystemStatus.StatusIcon, only: [status_icon: 1]

  attr :hide_route_pill, :boolean, default: false
  attr :plural, :boolean, default: false
  attr :prefix, :string, default: nil
  attr :route_ids, :list, required: true
  attr :status, :atom, required: true

  def status_row_heading(assigns) do
    ~H"""
    <div class="grid items-center grid-cols-[min-content_min-content_auto] items-center grow">
      <.top_padding hide_route_pill={@hide_route_pill} />

      <.heading
        hide_route_pill={@hide_route_pill}
        plural={@plural}
        prefix={@prefix}
        route_ids={@route_ids}
        status={@status}
      />

      <.bottom_padding hide_route_pill={@hide_route_pill} />
    </div>
    """
  end

  defp bottom_padding(assigns) do
    ~H"""
    <div class="h-3"></div>
    <div class="h-3"></div>
    <div class="h-3"></div>
    """
  end

  defp heading(assigns) do
    ~H"""
    <div class={["flex items-center pl-1 pr-2", @hide_route_pill && "opacity-0"]} data-route-pill>
      <.subway_route_pill class="group-hover/row:ring-brand-primary-lightest" route_ids={@route_ids} />
    </div>

    <div class="pr-2 flex items-center">
      <.status_icon status={@status} />
    </div>

    <div class="grow flex items-center">
      <.status_label status={@status} prefix={@prefix} plural={@plural} />
    </div>
    """
  end

  defp top_padding(assigns) do
    ~H"""
    <div class={["h-3", !@hide_route_pill && "border-t-xs border-gray-lightest"]}></div>
    <div class={["h-3", "border-t-xs border-gray-lightest"]}></div>
    <div class={["h-3", "border-t-xs border-gray-lightest"]}></div>
    """
  end
end
