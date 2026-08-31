defmodule DotcomWeb.LineDiagramLive do
  @moduledoc """
  The primary view for looking up stops, maps, and schedules for a particular line
  """

  use DotcomWeb, :live_view
  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]

  def mount(params, _session, socket) do
    route_id = params |> Map.get("route_id", "Red")
    direction_id = params |> Map.get("direction_id", "1")
    route_patterns = @route_patterns_repo.by_route_id(route_id)

    {:ok,
     socket
     |> assign(:direction_id, direction_id)
     |> assign(:route_patterns, route_patterns)
     |> assign(:route_id, route_id)}
  end

  def render(assigns) do
    dbg(assigns)

    ~H"""
    <marquee style="font-size:2cm" scrollamount="16" scrolldelay="60">
      Hello World
    </marquee>
    """
  end
end
