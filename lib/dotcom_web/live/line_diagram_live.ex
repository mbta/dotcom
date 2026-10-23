defmodule DotcomWeb.LineDiagramLive do
  @moduledoc """
  The primary view for looking up stops, maps, and schedules for a particular line
  """

  use DotcomWeb, :live_view
  require Logger

  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @map_config Application.compile_env(:mbta_metro, :map)
  @vehicles_repo Application.compile_env!(:dotcom, :repo_modules)[:vehicles]

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

  alias DotcomWeb.Hooks.SyncUrlParam
  alias DotcomWeb.PartialView.{HeaderTab, HeaderTabs}
  import DotcomWeb.Components.FareCard, only: [fare_card: 1]

  import DotcomWeb.Components.VariantPicker, only: [variant_picker: 1, variant_picker?: 1]

  import DotcomWeb.Components.ScheduleHeaderComponents, only: [route_header: 1]

  import DotcomWeb.ModeView, only: [mode_fare_card: 1]

  import DotcomWeb.ScheduleView,
    only: [
      header_class: 1,
      route_feature_badge: 1,
      route_tab_class: 1,
      route_pdf_link: 3
    ]

  import DotcomWeb.Views.Helpers.AlertHelpers, only: [alert_badge: 1]
  import DotcomWeb.Schedule.Defaults, only: [default_direction_id: 1]

  on_mount DotcomWeb.Hooks.AssignRoute
  on_mount {DotcomWeb.Hooks.Breadcrumbs, :schedule_page}

  on_mount {SyncUrlParam,
            %{
              param: "variant",
              assign: :selected_variant,
              event: "set_variant",
              event_key: "option",
              validate: &__MODULE__.valid_variant?/2
            }}

  @impl true
  def mount(params, _session, socket) do
    route = socket.assigns.route
    route_id = route.id

    direction_id =
      params
      |> Map.get("schedule_direction", %{
        "direction_id" =>
          default_direction_id(%{
            assigns: %{route: route, date_time: @date_time_module.now()}
          })
          |> Integer.to_string()
      })
      |> Map.get("direction_id")
      |> String.to_integer()

    tab_params = %{"schedule_direction[direction_id]": direction_id}

    guides_for_this_route =
      @guides |> Enum.filter(fn guide -> route.type in guide.modes end)

    vehicle_topic = "vehicles-v2:#{route_id}:#{direction_id}"

    _ =
      if connected?(socket) do
        Phoenix.PubSub.subscribe(Dotcom.PubSub, vehicle_topic)
      end

    {:ok,
     socket
     |> assign(:map_config, @map_config)
     |> assign(:direction_id, direction_id)
     |> assign(:vehicle_topic, vehicle_topic)
     |> assign_new(:vehicle_icons, fn ->
       route_id
       |> @vehicles_repo.route(direction_id: direction_id)
       |> Map.new(&{&1.id, to_vehicle_marker(&1, route)})
     end)
     |> assign(:route_id, route_id)
     |> assign(:route, route)
     |> assign_route_patterns()
     |> assign_route_stops()
     |> assign_route_data()
     |> assign(:tab, "new_line")
     |> assign(:tab_params, tab_params)
     |> assign_new(:date, &@date_time_module.now/0)
     |> assign_fare_card()
     |> assign_pdfs()
     |> assign(:guides, guides_for_this_route)
     |> assign(:search_phrase, "")}
  end

  @impl true
  def handle_params(params, _uri, socket) do
    {:noreply,
     socket
     |> update(:direction_id, fn current_direction ->
       case Map.get(params, "direction_id") do
         "0" -> 0
         "1" -> 1
         _ -> current_direction
       end
     end)
     |> apply_if_param_changed(:direction_id, &apply_direction_change/1)
     |> apply_if_param_changed(:selected_variant, &apply_variant_change/1)
     |> assign_route_data()}
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
    {:noreply, socket |> assign_vehicle_icons(event, payload.data) |> assign(:move_map, false)}
  end

  @impl true
  def handle_async("route_pdfs", {:ok, route_pdfs}, socket) do
    {:noreply, assign(socket, :route_pdfs, route_pdfs)}
  end

  def handle_async("route_pdfs", {:exit, reason}, socket) do
    Logger.warning(
      "module=#{__MODULE__} Error fetching schedule PDFs for route #{socket.assigns.route_id}: #{inspect(reason)}"
    )

    {:noreply, assign(socket, :route_pdfs, [])}
  end

  def handle_async("fare_card", {:ok, fare_card}, socket) when fare_card != [] do
    {:noreply, assign(socket, :fare_card, fare_card)}
  end

  def handle_async("fare_card", _, socket) do
    Logger.warning(
      "module=#{__MODULE__} Error fetching fare card for route #{socket.assigns.route_id}, using default []"
    )

    {:noreply, assign(socket, :fare_card, [])}
  end

  defp apply_if_param_changed(socket, param, func) do
    if changed?(socket, param) do
      func.(socket)
    else
      socket
    end
  end

  def valid_variant?(variant, %{assigns: %{route_patterns: route_patterns}}) do
    Enum.any?(route_patterns, &(&1.id == variant))
  end

  defp apply_direction_change(socket) do
    %{route_id: route_id, direction_id: direction_id} = socket.assigns
    vehicle_topic = "vehicles-v2:#{route_id}:#{direction_id}"

    _ =
      if connected?(socket) do
        Phoenix.PubSub.unsubscribe(Dotcom.PubSub, socket.assigns.vehicle_topic)
        Phoenix.PubSub.subscribe(Dotcom.PubSub, vehicle_topic)
      end

    socket
    |> assign(:vehicle_topic, vehicle_topic)
    |> assign_vehicle_icons(
      "reset",
      @vehicles_repo.route(route_id, direction_id: direction_id)
    )
    |> assign_route_patterns()
    |> assign_route_stops()
  end

  defp apply_variant_change(socket) do
    socket
    |> update(:selected_route_patterns, fn _, assigns ->
      %{route_patterns: all_route_patterns, selected_variant: id} = assigns

      case Enum.find(all_route_patterns, &(&1.id == id)) do
        nil ->
          all_route_patterns

        selected ->
          [selected]
      end
    end)
  end

  def assign_vehicle_icons(socket, "remove", vehicle_ids) do
    update(socket, :vehicle_icons, &Map.drop(&1, vehicle_ids))
  end

  def assign_vehicle_icons(socket, "reset", vehicles) do
    vehicles
    |> Map.new(&{&1.id, to_vehicle_marker(&1, socket.assigns.route)})
    |> then(&assign(socket, :vehicle_icons, &1))
  end

  # add or update
  def assign_vehicle_icons(socket, _, vehicles) do
    updated_vehicles =
      Map.new(vehicles, &{&1.id, to_vehicle_marker(&1, socket.assigns.route)})

    update(socket, :vehicle_icons, &Map.merge(&1, updated_vehicles))
  end

  defp to_vehicle_marker(vehicle, route) do
    %{stops: _, vehicle_info: vehicle_info} =
      Dotcom.ScheduleFinder.TripDetails.trip_details(%{
        predicted_schedules: [],
        trip_vehicle: vehicle
      })

    popup = vehicle_popup(%{route: route, vehicle_info: vehicle_info, vehicle: vehicle})

    %{
      coordinates: [vehicle.longitude, vehicle.latitude],
      type: "icon-svg",
      name: "icon-vehicle-bordered-expanded",
      class: "size-6 cursor-pointer",
      popup: popup,
      rotation: vehicle.bearing || "0"
    }
  end

  def vehicle_popup(assigns) do
    ~H"""
    <div :if={@route.type == 4} class="italic">{@vehicle_info.vehicle_name}</div>
    <div :if={@route.type == 2} class="italic">
      {gettext("Train %{train_no}", %{train_no: @vehicle.trip_id |> String.split("-") |> Enum.at(2)})}
    </div>
    <DotcomWeb.Live.UpcomingDeparturesLive.vehicle_label
      route={@route}
      vehicle_info={@vehicle_info}
      classes="text-white mr-2"
      crowding_classes="text-white"
      white_bg?={true}
    />
    """
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
    assigns =
      assign(
        assigns,
        :show_variant_picker?,
        variant_picker?(assigns.route) and length(assigns.route_patterns) > 1
      )

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
          scrollamount="2"
          scrolldelay="60"
        >
          &#x1F6A7; Under Construction &#x1F6A7;
        </marquee>
        <div class="m-schedule-direction mb-4">
          <div class="m-schedule-direction__direction">
            {Routes.Route.direction_name(@route, @direction_id)}
          </div>
          <div
            :if={@show_variant_picker?}
            class="-ml-[0.375rem]"
          >
            <.variant_picker
              route={@route}
              route_patterns={@route_patterns}
              selected_variant={@selected_variant}
            />
          </div>
          <div
            :if={!@show_variant_picker?}
            class="m-schedule-direction__route-pattern"
          >
            {Routes.Route.direction_destination(@route, @direction_id)}
          </div>
          <.link
            :if={Routes.Route.direction_name(@route, 1 - @direction_id)}
            id="direction-filter"
            patch={~p"/schedules/#{@route.id}/line_new?direction_id=#{1 - @direction_id}"}
            class="m-schedule-direction__button btn btn-primary"
            replace
          >
            <.icon
              type="icon-svg"
              aria-hidden
              name="icon-change-direction"
              class="size-4 mr-0.5 fill-current"
            />
            {~t(Change Direction)}
          </.link>
        </div>
        <.map
          map_config={@map_config}
          route_patterns={@route_patterns}
          map_lines={@map_lines}
          map_icons={@map_icons}
          vehicle_icons={Map.values(@vehicle_icons)}
          move_map={@move_map}
        />
        <div class="m-schedule-diagram__filter c-form__input-container">
          <form>
            <input
              class="c-form__input"
              type="text"
              phx-change="search"
              phx-submit="search"
              name="search"
              placeholder={~t(Search for a station)}
            />
          </form>
        </div>
        <div class="m-schedule-diagram my-4">
          <ol>
            <li
              :for={stop <- @stops}
              class={search_class(stop, @search_phrase) <> " m-schedule-diagram__stop border-xs border-gray-lightest"}
            >
              <.stop_card stop={stop} />
            </li>
          </ol>
        </div>
      </div>
      <div class="col-md-5 gap-[32px] flex flex-col">
        <marquee
          style="font-size:1cm;filter: drop-shadow(2px 4px 6px orange);"
          scrollamount="2"
          scrolldelay="60"
        >
          &#x26A0;&#xFE0F; Watch your step &#x26A0;&#xFE0F;
        </marquee>
        <.route_pdf_sidebar_content route_pdfs={@route_pdfs} date={@date} route={@route} />
        <div style="container-type: inline-size;" class="w-full">
          <.fare_card fare_card={@fare_card} route={@route} />
        </div>
        <.guides guides={@guides} />
      </div>
    </div>
    """
  end

  defp search_class(stop, search_phrase) do
    if(String.length(search_phrase) > 0 and !String.contains?(stop.name, search_phrase)) do
      "hidden"
    else
      ""
    end
  end

  def handle_event("search", %{"search" => search}, socket) do
    {:noreply, assign(socket, search_phrase: search)}
  end

  # re-fit the map to the newly selected variant or direction
  defp assign_route_data(socket) do
    socket
    |> assign_stops()
    |> assign_map_attributes()
    |> assign(:move_map, true)
  end

  defp assign_route_patterns(%{assigns: %{route: route, direction_id: direction_id}} = socket) do
    route_patterns =
      route.id
      |> maybe_use_green_line_id()
      |> @route_patterns_repo.by_route_id(
        direction_id: direction_id,
        include: "representative_trip.shape,representative_trip.stops"
      )
      |> filter_unwanted_route_patterns(route)

    socket
    |> assign(:route_patterns, route_patterns)
    |> assign(:selected_route_patterns, route_patterns)
  end

  defp maybe_use_green_line_id("Green-" <> _), do: "Green"
  defp maybe_use_green_line_id(route_id), do: route_id

  defp filter_unwanted_route_patterns(route_patterns, route)
       when route.id in ["Boat-F6", "Boat-F7"] do
    route_patterns
    |> Enum.reject(&(&1.route_id == "Boat-F8"))
  end

  # Use canonical route patterns where available!
  defp filter_unwanted_route_patterns(route_patterns, %{type: type}) when type in [0, 1, 2] do
    Enum.reject(route_patterns, &(!&1.canonical))
  end

  # avoid showing route patterns from multi-route trips that are primarily
  # assigned to another route
  defp filter_unwanted_route_patterns(route_patterns, %{type: 3} = route) do
    Enum.reject(route_patterns, &(&1.route_id != route.id))
  end

  defp filter_unwanted_route_patterns(route_patterns, _route), do: route_patterns

  defp assign_route_stops(socket) do
    stops_by_id =
      socket.assigns.route_patterns
      |> Enum.flat_map(& &1.stop_ids)
      |> Enum.uniq()
      |> Map.new(&{&1, @stops_repo.get(&1)})

    assign(socket, :stops_by_id, stops_by_id)
  end

  defp assign_stops(
         %{assigns: %{selected_route_patterns: selected_route_patterns, stops_by_id: stops_by_id}} =
           socket
       ) do
    stops =
      selected_route_patterns
      |> Stream.flat_map(& &1.stop_ids)
      |> Stream.uniq()
      |> Stream.map(&Map.fetch!(stops_by_id, &1))
      |> Enum.to_list()

    socket |> assign(:stops, stops)
  end

  defp assign_map_attributes(socket) do
    socket
    |> assign_map_lines()
    |> assign_map_icons()
  end

  defp assign_map_lines(
         %{assigns: %{route: route, selected_route_patterns: selected_route_patterns}} = socket
       ) do
    map_line_shapes =
      selected_route_patterns
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
      |> Enum.map(&(&1 |> Map.merge(%{width: 6, color: "#000000"})))

    map_lines_with_route_colors =
      map_line_shapes
      |> Enum.map(&(&1 |> Map.merge(%{width: 4, color: "##{route.color}"})))

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
          class: "size-3 cursor-pointer",
          popup:
            socket.assigns
            |> assign(:stop, &1)
            |> stop_popup()
        }
      )

    socket
    |> assign(:map_icons, map_icons)
  end

  defp stop_popup(assigns) do
    ~H"""
    <div class="popup-title">{@stop.name}</div>

    <div class="popup-link">
      <a href={
        ~p"/departures/?route_id=#{@route.id}&direction_id=#{@direction_id}&stop_id=#{@stop.id}"
      }>
        {~t(View Schedule)}
      </a>
    </div>
    """
  end

  defp stop_card(assigns) do
    ~H"""
    <section class="m-schedule-diagram__content">
      <.link navigate={~p"/stops/#{@stop.id}"}>
        <h4 class="m-schedule-diagram__stop-link notranslate">
          {@stop.name}
        </h4>
      </.link>
    </section>
    """
  end

  defp assign_fare_card(%{assigns: %{route: route}} = socket) do
    socket
    |> assign(:fare_card, [])
    |> start_async("fare_card", fn ->
      route
      |> Routes.Route.type_atom()
      |> mode_fare_card()
      |> DotcomWeb.PartialView.paragraph(%Plug.Conn{query_params: %{}})
    end)
  end

  defp assign_pdfs(%{assigns: %{route_id: route_id, date: date}} = socket) do
    socket
    |> assign(:route_pdfs, [])
    |> start_async("route_pdfs", fn ->
      Dotcom.RoutePdfs.fetch_and_choose_pdfs(route_id, date)
    end)
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
      move_map={@move_map}
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
      <img
        src={Util.site_path(:static_url, [guide.image])}
        class="w-[380px] rounded-sm mb-[8px]"
        loading="lazy"
        alt=""
      />
      <div>{guide.title}</div>
    </a>
    """
  end
end
