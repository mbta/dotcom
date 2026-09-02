defmodule DotcomWeb.LineDiagramLive do
  @moduledoc """
  The primary view for looking up stops, maps, and schedules for a particular line
  """

  use DotcomWeb, :live_view
  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  import DotcomWeb.ScheduleView,
    only: [
      header_class: 1,
      route_header_text: 1,
      route_header_description: 1,
      route_feature_badge: 1,
      route_header_tabs: 1
    ]

  def mount(params, _session, socket) do
    route_id = params |> Map.get("route_id")
    direction_id = params |> Map.get("direction_id", "1")
    route_patterns = @route_patterns_repo.by_route_id(route_id)
    route = @routes_repo.get(route_id)
    dbg(socket, limit: :infinity)

    {:ok,
     socket
     |> assign(:direction_id, direction_id)
     |> assign(:route_patterns, route_patterns)
     |> assign(:route_id, route_id)
     |> assign(:route, route)}
  end

  def render(assigns) do
    ~H"""
    <div class={"schedule__header #{ header_class(@route) }"}>
      <div class="schedule__header-container">
        <h1 class="schedule__route-name notranslate">{route_header_text(@route)}</h1>
        {route_header_description(@route)}
        {route_feature_badge(@route)}
        <div class="schedule__header-tabs">{}</div>
      </div>
    </div>

    <marquee style="font-size:2cm" scrollamount="16" scrolldelay="60">
      🚧 Under Construction 🚧
    </marquee>
    """
  end
end
