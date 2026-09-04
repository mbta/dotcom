defmodule DotcomWeb.LineDiagramLive do
  @moduledoc """
  The primary view for looking up stops, maps, and schedules for a particular line
  """

  use DotcomWeb, :live_view
  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  alias DotcomWeb.PartialView.{HeaderTab, HeaderTabs}

  import DotcomWeb.Components.ScheduleHeaderComponents, only: [route_header: 1]

  import DotcomWeb.ScheduleView,
    only: [
      header_class: 1,
      route_header_description: 1,
      route_feature_badge: 1,
      route_tab_class: 1
    ]

  import DotcomWeb.Views.Helpers.AlertHelpers, only: [alert_badge: 1]

  def mount(params, _session, socket) do
    route_id = params |> Map.get("route_id")
    route = @routes_repo.get(route_id)
    route_patterns = @route_patterns_repo.by_route_id(route_id)

    direction_id =
      params |> Map.get("schedule_direction", %{direction_id: 0}) |> Map.get("direction_id")

    tab_params = %{"schedule_direction[direction_id]": direction_id}

    {:ok,
     socket
     |> assign(:direction_id, direction_id)
     |> assign(:route_patterns, route_patterns)
     |> assign(:route_id, route_id)
     |> assign(:route, route)
     |> assign(:tab, "new_line")
     |> assign(:tab_params, tab_params)}
  end

  def make_link(assigns, page, add_params? \\ false) do
    path = "/schedules/#{assigns.route.id}/#{page}"
    params = URI.encode_query(assigns.tab_params)

    if add_params? do
      "#{path}?#{params}"
    else
      path
    end
  end

  def header_tabs(%{route: route} = assigns) do
    route = route
    info_link = make_link(assigns, "line")
    line_path = make_link(assigns, "line_new")
    timetable_link = make_link(assigns, "timetable", true)
    alerts_link = make_link(assigns, "alerts")
    alert_count = @alerts_repo.by_route_ids([route.id], @date_time_module.now()) |> Enum.count()

    tabs = [
      %HeaderTab{
        id: "alerts",
        name: ~t"Alerts",
        href: alerts_link,
        badge: alert_count |> alert_badge()
      }
    ]

    tabs =
      if assigns |> Map.get(:line_diagram, false) do
        [
          %HeaderTab{
            id: "new_line",
            name: ~t"Schedules & Maps (new)",
            href: line_path
          }
          | tabs
        ]
      else
        tabs
      end

    tabs =
      case route.type do
        n when n in [2, 4] ->
          [
            %HeaderTab{id: "timetable", name: ~t"Timetable", href: timetable_link},
            %HeaderTab{id: "line", name: ~t"Schedule & Maps", href: info_link} | tabs
          ]

        _ ->
          [
            %HeaderTab{id: "line", name: ~t"Schedules & Maps", href: info_link} | tabs
          ]
      end

    HeaderTabs.render_tabs(tabs, selected: assigns.tab, tab_class: route_tab_class(route))
  end

  def render(assigns) do
    ~H"""
    <div class={"schedule__header #{ header_class(@route) }"}>
      <div class="schedule__header-container">
        <.route_header route={@route} />
        {route_header_description(@route)}
        {route_feature_badge(@route)}
        <div class="schedule__header-tabs">{header_tabs(assigns)}</div>
      </div>
    </div>
    <div class="container">
      <div class="col-md-7">
        <marquee
          style="font-size:1cm;filter: drop-shadow(2px 4px 6px orange);"
          scrollamount="16"
          scrolldelay="60"
        >
          🚧 Under Construction 🚧
        </marquee>
      </div>
      <div class="col-md-5">
        <marquee
          style="font-size:1cm;filter: drop-shadow(2px 4px 6px orange);"
          scrollamount="16"
          scrolldelay="60"
        >
          ⚠️ Watch Your Step ⚠️
        </marquee>
      </div>
    </div>
    """
  end
end
