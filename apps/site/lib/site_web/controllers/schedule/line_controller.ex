defmodule SiteWeb.ScheduleController.LineController do
  use SiteWeb, :controller
  alias Phoenix.HTML
  alias Plug.Conn
  alias Routes.{Group, Route}
  alias Services.Repo, as: ServicesRepo
  alias Services.Service
  alias Site.ScheduleNote
  alias SiteWeb.{ScheduleView, ViewHelpers}

  import SiteWeb.ScheduleController.LineApi, only: [update_route_stop_data: 3]

  plug(SiteWeb.Plugs.Route)
  plug(SiteWeb.Plugs.DateInRating)
  plug(:tab_name)
  plug(SiteWeb.ScheduleController.RoutePdfs)
  plug(SiteWeb.ScheduleController.Defaults)
  plug(:alerts)
  plug(SiteWeb.ScheduleController.AllStops)
  plug(SiteWeb.ScheduleController.RouteBreadcrumbs)
  plug(SiteWeb.ScheduleController.HoursOfOperation)
  plug(SiteWeb.ScheduleController.Holidays)
  plug(SiteWeb.ScheduleController.VehicleLocations)
  plug(SiteWeb.ScheduleController.Predictions)
  plug(SiteWeb.ScheduleController.VehicleTooltips)
  plug(SiteWeb.ScheduleController.Line)
  plug(SiteWeb.ScheduleController.CMS)
  plug(:channel_id)

  def show(conn, _) do
    conn
    |> assign(:meta_description, route_description(conn.assigns.route))
    |> assign(:disable_turbolinks, true)
    |> put_view(ScheduleView)
    |> await_assign_all_default(__MODULE__)
    |> assign_schedule_page_data()
    |> render("show.html", [])
  end

  def line_diagram_api(conn, _) do
    conn
    |> put_view(ScheduleView)
    |> render("_stop_list.html", layout: false)
  end

  def assign_schedule_page_data(conn) do
    assign(
      conn,
      :schedule_page_data,
      %{
        connections: group_connections(conn.assigns.connections),
        pdfs:
          ScheduleView.route_pdfs(conn.assigns.route_pdfs, conn.assigns.route, conn.assigns.date),
        teasers:
          HTML.safe_to_string(
            ScheduleView.render(
              "_cms_teasers.html",
              Map.merge(conn.assigns, %{
                teaser_class: "m-schedule-page__teaser",
                news_class: "m-schedule-page__news"
              })
            )
          ),
        hours: HTML.safe_to_string(ScheduleView.render("_hours_of_op.html", conn.assigns)),
        fares:
          Enum.map(ScheduleView.single_trip_fares(conn.assigns.route), fn {title, price} ->
            %{title: title, price: price}
          end),
        fare_link: ScheduleView.route_fare_link(conn.assigns.route),
        holidays: conn.assigns.holidays,
        route: Route.to_json_safe(conn.assigns.route),
        services: services(conn.assigns.route.id, Util.service_date()),
        schedule_note: ScheduleNote.new(conn.assigns.route),
        stops: simple_stop_map(conn),
        direction_id: conn.assigns.direction_id,
        route_patterns: conn.assigns.route_patterns,
        shape_map: conn.assigns.shape_map,
        line_diagram:
          Enum.map(conn.assigns.all_stops, fn stop ->
            update_route_stop_data(stop, conn.assigns.alerts, conn.assigns.date)
          end)
      }
    )
  end

  # If we have two services A and B with the same type and typicality,
  # with the date range from A's start to A's end a subset of the date
  # range from B's start to B's end, either A is in the list of services
  # erroneously (for example, in the case of the 39 in the fall 2019
  # rating), or A represents a special service that's not a holiday (for
  # instance, the Thanksgiving-week extra service to Logan on the SL1 in
  # the fall 2019 rating).
  #
  # However, in neither of these cases do we want to show service A. In the
  # first case, we don't want to show A because it's erroneous, and in the
  # second case, we don't want to show A for parity with the paper/PDF
  # schedules, in which these special services are not generally called
  # out.

  @spec dedup_similar_services([Service.t()]) :: [Service.t()]
  def dedup_similar_services(services) do
    services
    |> Enum.group_by(&{&1.type, &1.typicality})
    |> Enum.flat_map(fn {_, service_group} ->
      service_group
      |> Enum.reject(fn service ->
        Enum.any?(service_group, fn other_service ->
          other_service != service &&
            Date.compare(other_service.start_date, service.start_date) != :gt &&
            Date.compare(other_service.end_date, service.end_date) != :lt
        end)
      end)
    end)
  end

  @spec dedup_identical_services([Service.t()]) :: [Service.t()]
  def dedup_identical_services(services) do
    services
    |> Enum.group_by(fn %{start_date: start_date, end_date: end_date, valid_days: valid_days} ->
      {start_date, end_date, valid_days}
    end)
    |> Enum.map(fn {_key, [service | _rest]} ->
      service
    end)
  end

  @spec services(Routes.Route.id_t(), Date.t()) :: [Service.t()]
  def services(route_id, service_date, services_by_route_id_fn \\ &ServicesRepo.by_route_id/1) do
    route_id
    |> services_by_route_id_fn.()
    |> dedup_identical_services()
    |> dedup_similar_services()
    |> Enum.reject(&(&1.name == "Weekday (no school)"))
    |> Enum.reject(&(Date.compare(&1.end_date, service_date) == :lt))
    |> Enum.sort_by(&sort_services_by_date/1)
    |> Enum.map(&Map.put(&1, :service_date, service_date))
  end

  def sort_services_by_date(%Service{typicality: :typical_service, type: :weekday} = service) do
    {1, Date.to_string(service.start_date)}
  end

  def sort_services_by_date(%Service{} = service) do
    {2, Date.to_string(service.start_date)}
  end

  @spec simple_stop_map(%Conn{}) :: map
  defp simple_stop_map(conn) do
    current_direction = Integer.to_string(conn.assigns.direction_id)
    opposite_direction = reverse_direction(current_direction)

    Map.new()
    |> Map.put(current_direction, simple_stop_list(conn.assigns.all_stops_from_shapes))
    |> Map.put(
      opposite_direction,
      simple_stop_list(conn.assigns.reverse_direction_all_stops_from_shapes)
    )
  end

  def add_zones_to_stops(stops) do
    stops
    |> Enum.map(fn stop -> Map.put(stop, :zone, Zones.Repo.get(stop.id)) end)
    |> Enum.map(&simple_stop/1)
  end

  # Must be strings for mapping to JSON
  def reverse_direction("0"), do: "1"
  def reverse_direction("1"), do: "0"

  def simple_stop_list(all_stops) do
    all_stops |> Enum.map(&simple_stop/1) |> Enum.uniq_by(& &1.id)
  end

  def simple_stop(%{
        id: id,
        name: name,
        closed_stop_info: closed_stop_info,
        zone: zone
      }) do
    closed_stop? = if closed_stop_info == nil, do: false, else: true

    %{
      id: id,
      name: name,
      is_closed: closed_stop?,
      zone: zone
    }
  end

  def simple_stop(
        {_,
         %{
           id: id,
           name: name,
           closed_stop_info: closed_stop_info,
           zone: zone,
           route: %{type: type}
         }}
      ) do
    closed_stop? = if closed_stop_info == nil, do: false, else: true
    zone = if type == 2, do: zone, else: nil

    %{
      id: id,
      name: name,
      is_closed: closed_stop?,
      zone: zone
    }
  end

  defp tab_name(conn, _), do: assign(conn, :tab, "line")

  defp alerts(conn, _), do: assign_alerts(conn, filter_by_direction?: true)

  defp channel_id(conn, _) do
    assign(conn, :channel, "vehicles:#{conn.assigns.route.id}:#{conn.assigns.direction_id}")
  end

  defp group_connections(connections) do
    connections
    |> Enum.group_by(&Route.type_atom/1)
    |> Enum.sort_by(&Group.sorter/1)
    |> Enum.map(fn {group, routes} ->
      %{
        group_name: ViewHelpers.mode_name(group),
        routes:
          routes
          |> Enum.sort_by(&connection_sorter/1)
          |> Enum.map(&%{route: Route.to_json_safe(&1), direction_id: nil})
      }
    end)
  end

  defp route_description(route) do
    case Route.type_atom(route) do
      :bus ->
        bus_description(route)

      :subway ->
        line_description(route)

      _ ->
        "MBTA #{ScheduleView.route_header_text(route)} stops and schedules, including maps, " <>
          "parking and accessibility information, and fares."
    end
  end

  defp bus_description(%{id: route_number} = route) do
    "MBTA #{bus_type(route)} route #{route_number} stops and schedules, including maps, real-time updates, " <>
      "parking and accessibility information, and connections."
  end

  defp line_description(route) do
    "MBTA #{route.name} #{route_type(route)} stations and schedules, including maps, real-time updates, " <>
      "parking and accessibility information, and connections."
  end

  defp bus_type(route),
    do: if(Route.silver_line?(route), do: "Silver Line", else: "bus")

  defp connection_sorter(%Route{id: id} = route) do
    # force silver line to top of list
    if Route.silver_line?(route) do
      "000" <> id
    else
      case Integer.parse(id) do
        {number, _} when number < 10 -> "00" <> id
        {number, _} when number < 100 -> "0" <> id
        _ -> id
      end
    end
  end

  defp route_type(route) do
    route
    |> Route.type_atom()
    |> Route.type_name()
  end
end
