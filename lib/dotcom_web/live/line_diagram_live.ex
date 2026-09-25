defmodule DotcomWeb.LineDiagramLive do
  @moduledoc """
  The primary view for looking up stops, maps, and schedules for a particular line
  """

  use DotcomWeb, :live_view
  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @map_config Application.compile_env(:mbta_metro, :map)

  @guides [
    %{
      title: ~t(Subway Beginner's Guide),
      image:
        "/sites/default/files/styles/max_2600x2600/public/media/2018-12/Subway-Wordless-for-homepage-revised-2018-12-11.png",
      link: "/guides/subway-guide",
      modes: [0, 1]
    },
    %{
      title: ~t(Bus Beginner's Guide),
      image:
        "/sites/default/files/styles/max_2600x2600/public/media/2018-12/Guides-Bus-Singleword-revised-2018-12-11.png",
      link: "/guides/bus-guide",
      modes: [3]
    },
    %{
      title: ~t(Commuter Rail Beginner's Guide),
      image:
        "/sites/default/files/styles/max_2600x2600/public/media/2018-11/Guides-Commuter-HomepageWordless.png",
      link: "/guides/commuter-rail-guide",
      modes: [2]
    },
    %{
      title: ~t(Ferry Beginner's Guide),
      image:
        "/sites/default/files/styles/max_2600x2600/public/media/2019-09/ferry-v2-wordless-for-homepage.png",
      link: "/guides/ferry-guide",
      modes: [4]
    },
    %{
      title: ~t(Subway Access Guide),
      image:
        "/sites/default/files/styles/max_2600x2600/public/Accessibility/govt-center-press-access-button.jpg",
      link: "/accessibility/subway-guide",
      modes: [0, 1]
    },
    %{
      title: ~t(Bus Access Guide),
      image:
        "/sites/default/files/styles/max_2600x2600/public/projects/betterbus/bus-pulling-up-route-43.jpg",
      link: "/accessibility/bus-guide",
      modes: [3]
    },
    %{
      title: ~t(Commuter Rail Access Guide),
      image:
        "/sites/default/files/styles/max_2600x2600/public/media/2018-07/cr-level-boarding-platform.jpg",
      link: "/accessibility/commuter-rail-guide",
      modes: [2]
    },
    %{
      title: ~t(Ferry Access Guide),
      image:
        "/sites/default/files/styles/max_2600x2600/public/media/2018-07/mbta-ferry-boarding-with-wmd.jpg",
      link: "/accessibility/ferry-guide",
      modes: [4]
    }
  ]

  alias DotcomWeb.PartialView.{HeaderTab, HeaderTabs}

  import DotcomWeb.Components.ScheduleHeaderComponents, only: [route_header: 1]

  import DotcomWeb.ScheduleView,
    only: [
      header_class: 1,
      route_feature_badge: 1,
      route_tab_class: 1,
      route_pdf_link: 3
    ]

  import DotcomWeb.Views.Helpers.AlertHelpers, only: [alert_badge: 1]

  on_mount DotcomWeb.Hooks.AssignRoute
  on_mount {DotcomWeb.Hooks.Breadcrumbs, :schedule_page}

  @impl true
  def mount(params, _session, socket) do
    route = socket.assigns.route
    route_id = route.id

    direction_id =
      params |> Map.get("schedule_direction", %{"direction_id" => 1}) |> Map.get("direction_id")

    tab_params = %{"schedule_direction[direction_id]": direction_id}

    guides_for_this_route =
      @guides |> Enum.filter(fn guide -> route.type in guide.modes end)

    vehicle_topic = "vehicles-v2:#{route_id}:#{direction_id}"

    if connected?(socket) do
      Phoenix.PubSub.subscribe(Dotcom.PubSub, vehicle_topic)
    end

    {:ok,
     socket
     |> assign(:map_config, @map_config)
     |> assign(:direction_id, direction_id)
     |> assign(:vehicle_topic, vehicle_topic)
     |> assign(:vehicle_icons, %{})
     |> assign_route_data()
     |> assign(:route_id, route_id)
     |> assign(:route, route)
     |> assign(:tab, "new_line")
     |> assign(:tab_params, tab_params)
     |> assign_new(:date, &@date_time_module.now/0)
     |> assign_pdfs()
     |> assign(:guides, guides_for_this_route)}
  end

  @impl true
  def terminate(_, socket) do
    # stop listening for new vehicles
    _ = Phoenix.PubSub.unsubscribe(Dotcom.PubSub, socket.assigns.vehicle_topic)
  end

  @impl true
  def handle_info(
        %Phoenix.Socket.Broadcast{topic: "vehicles-v2:" <> _, event: event, payload: payload},
        socket
      ) do
    {:noreply, socket |> assign_vehicle_icons(event, payload.data)}
  end

  def assign_vehicle_icons(socket, "remove", vehicle_ids) do
    update(socket, :vehicle_icons, &Map.drop(&1, vehicle_ids))
  end

  def assign_vehicle_icons(socket, "reset", vehicles) do
    vehicles
    |> Map.new(&{&1.id, to_vehicle_marker(&1)})
    |> then(&assign(socket, :vehicle_icons, &1))
  end

  # add or update
  def assign_vehicle_icons(socket, _, vehicles) do
    updated_vehicles = Map.new(vehicles, &{&1.id, to_vehicle_marker(&1)})
    update(socket, :vehicle_icons, &Map.merge(&1, updated_vehicles))
  end

  defp to_vehicle_marker(vehicle) do
    %{
      coordinates: [vehicle.longitude, vehicle.latitude],
      type: "icon-svg",
      name: "icon-vehicle-bordered-expanded",
      class: "size-6"
    }
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

  @impl true
  def render(assigns) do
    ~H"""
    <div class={"schedule__header #{ header_class(@route) }"}>
      <div class="schedule__header-container">
        <.route_header route={@route} />
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
        <.map
          map_config={@map_config}
          route_patterns={@route_patterns}
          map_lines={@map_lines}
          map_icons={@map_icons}
          vehicle_icons={Map.values(@vehicle_icons)}
        />
      </div>
      <div class="col-md-5 gap-[32px] flex flex-col">
        <marquee
          style="font-size:1cm;filter: drop-shadow(2px 4px 6px orange);"
          scrollamount="16"
          scrolldelay="60"
        >
          ⚠️ Watch Your Step ⚠️
        </marquee>
        <.route_pdf_sidebar_content route_pdfs={@route_pdfs} date={@date} route={@route} />
        <.guides guides={@guides} />
      </div>
    </div>
    """
  end

  defp assign_route_data(socket) do
    socket
    |> assign_route_patterns()
    |> assign_stops()
    |> assign_map_attributes()
  end

  defp assign_route_patterns(%{assigns: %{route: route, direction_id: direction_id}} = socket) do
    route_patterns =
      @route_patterns_repo.by_route_id(route.id,
        direction_id: direction_id,
        include: "representative_trip.shape,representative_trip.stops"
      )
      |> Enum.filter(&(&1.typicality == 1))
      |> filter_unwanted_route_patterns(route.id)

    socket
    |> assign(:route_patterns, route_patterns)
  end

  defp filter_unwanted_route_patterns(route_patterns, route_id)
       when route_id in ["Boat-F6", "Boat-F7"] do
    route_patterns
    |> Enum.reject(&(&1.route_id == "Boat-F8"))
  end

  defp filter_unwanted_route_patterns(route_patterns, _route_id), do: route_patterns

  defp assign_stops(%{assigns: %{route_patterns: route_patterns}} = socket) do
    stops =
      route_patterns
      |> Stream.flat_map(& &1.stop_ids)
      |> Stream.uniq()
      |> Stream.map(&@stops_repo.get/1)
      |> Enum.to_list()

    socket |> assign(:stops, stops)
  end

  defp assign_map_attributes(socket) do
    socket
    |> assign_map_lines()
    |> assign_map_icons()
  end

  defp assign_map_lines(%{assigns: %{route: route, route_patterns: route_patterns}} = socket) do
    map_line_shapes =
      route_patterns
      |> Enum.map(fn route_pattern ->
        %{
          coordinates:
            route_pattern.representative_trip_polyline
            |> Polyline.decode()
            |> Enum.map(fn {lng, lat} -> [lng, lat] end)
        }
      end)

    map_lines_outlines =
      map_line_shapes
      |> Enum.map(&(&1 |> Map.merge(%{width: 6, color: "\#000000"})))

    map_lines_with_route_colors =
      map_line_shapes
      |> Enum.map(&(&1 |> Map.merge(%{width: 4, color: "\##{route.color}"})))

    map_lines = map_lines_outlines ++ map_lines_with_route_colors

    socket
    |> assign(:map_lines, map_lines)
  end

  defp assign_map_icons(%{assigns: %{stops: stops}} = socket) do
    map_icons =
      stops
      |> Enum.map(
        &%{
          coordinates: [&1.longitude, &1.latitude],
          type: "icon-svg",
          name: "icon-stop-circle-bordered-expanded",
          class: "size-3"
        }
      )

    socket
    |> assign(:map_icons, map_icons)
  end

  defp assign_pdfs(%{assigns: %{route_id: route_id, date: date}} = socket) do
    pdfs =
      Dotcom.RoutePdfs.fetch_and_choose_pdfs(
        route_id,
        date
      )

    socket |> assign(:route_pdfs, pdfs)
  end

  defp map(assigns) do
    ~H"""
    <.live_component
      module={DotcomWeb.Components.Map}
      id="line-diagram-map"
      class="h-96 w-full"
      config={@map_config}
      lines={@map_lines}
      icons={@map_icons ++ @vehicle_icons}
    />
    """
  end

  defp route_pdf_sidebar_content(assigns) do
    ~H"""
    <div :if={!Enum.empty?(@route_pdfs)}>
      <h2 class="text-xl">{~t(Printable Schedules)}</h2>
      <div class="p-1 flex items-center pb-1">
        {route_pdf_link(@route_pdfs, @route, @date)}
      </div>
    </div>
    """
  end

  def guides(assigns) do
    ~H"""
    <a
      :for={guide <- @guides}
      href={guide.link}
      class="text-black text-lg font-bold"
    >
      <img src={guide.image} class="w-[380px] rounded-sm mb-[8px]" alt="" />
      <div>{guide.title}</div>
    </a>
    """
  end
end
