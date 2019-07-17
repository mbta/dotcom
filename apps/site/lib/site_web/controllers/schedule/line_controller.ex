defmodule SiteWeb.ScheduleController.LineController do
  use SiteWeb, :controller
  alias Fares.Format
  alias Phoenix.HTML
  alias Routes.{Group, Route}
  alias Services.Service
  alias Site.{BaseFare, ScheduleNote}
  alias SiteWeb.{ScheduleView, ViewHelpers}
  import SiteWeb.ViewHelpers, only: [cms_static_page_path: 2]

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
    conn =
      conn
      |> assign(:meta_description, route_description(conn.assigns.route))
      |> assign(:disable_turbolinks, true)
      |> put_view(ScheduleView)
      |> await_assign_all_default(__MODULE__)

    if Laboratory.enabled?(conn, :schedule_redesign) do
      conn
      |> assign_schedule_page_data()
      |> render("show.html", [])
    else
      render(conn, "show.html", [])
    end
  end

  @spec get_schedules(binary, any, any) :: %{by_trip: map, trip_order: [any]}
  def get_schedules(route_id, date, direction_id) do
    services =
      [route_id]
      |> Schedules.Repo.by_route_ids(date: date, direction_id: direction_id)
      |> Enum.map(&Map.update!(&1, :route, fn route -> Route.to_json_safe(route) end))

    ordered_trips = services |> Enum.sort_by(& &1.time) |> Enum.map(& &1.trip.id) |> Enum.uniq()

    services_by_trip =
      services
      |> Enum.group_by(& &1.trip.id)

    services_by_trip_with_fare =
      services_by_trip
      |> Stream.map(fn {trip_id, service} -> {trip_id, fares_for_service(service)} end)
      |> Stream.map(fn {trip_id, service} -> {trip_id, duration_for_service(service)} end)
      |> Stream.map(fn {trip_id, service} -> {trip_id, formatted_time(service)} end)
      |> Enum.into(%{})

    %{by_trip: services_by_trip_with_fare, trip_order: ordered_trips}
  end

  def fares_for_service(schedules) do
    origin = List.first(schedules)

    schedules
    |> Enum.map(
      &Map.merge(
        &1,
        fares_for_service(origin.route, origin.stop.id, &1.stop.id)
      )
    )
  end

  def duration_for_service(schedules) do
    first = List.first(schedules).time
    last = List.last(schedules).time
    %{schedules: schedules, duration: Timex.diff(last, first, :minutes)}
  end

  def formatted_time(%{schedules: schedules, duration: duration}) do
    time_formatted_schedules =
      schedules
      |> Enum.map(&Map.update!(&1, :time, fn time -> Timex.format!(time, "{0h12}:{m} {AM}") end))

    %{schedules: time_formatted_schedules, duration: duration}
  end

  @spec fares_for_service(map, String.t(), String.t()) :: map
  def fares_for_service(route, origin, destination) do
    %{
      price: route |> BaseFare.base_fare(origin, destination) |> Format.price(),
      fare_link:
        fare_link(
          Route.type_atom(route.type),
          origin,
          destination
        )
    }
  end

  def fare_link(:bus, _origin, _destination) do
    cms_static_page_path(SiteWeb.Endpoint, "/fares/bus-fares")
  end

  def fare_link(:subway, _origin, _destination) do
    cms_static_page_path(SiteWeb.Endpoint, "/fares/subway-fares")
  end

  def fare_link(:commuter_rail, origin, destination) do
    fare_path(SiteWeb.Endpoint, :show, :commuter_rail, %{
      origin: origin,
      destination: destination
    })
  end

  def fare_link(:ferry, origin, destination) do
    fare_path(SiteWeb.Endpoint, :show, :ferry, %{
      origin: origin,
      destination: destination
    })
  end

  def schedules_for_service(route_id, services) do
    services
    |> Enum.map(&{&1.start_date, &1.id})
    |> Enum.flat_map(fn {date, service_id} ->
      [{date, service_id, 0}, {date, service_id, 1}]
    end)
    |> Task.async_stream(fn {date, service_id, direction_id} ->
      {service_id, direction_id, get_schedules(route_id, date, direction_id)}
    end)
    |> Enum.reduce(%{}, fn {:ok, {service_id, direction_id, schedules}}, acc ->
      Map.put(acc, "#{service_id}-#{direction_id}", schedules)
    end)
  end

  def assign_schedule_page_data(conn) do
    service_date = Util.service_date()
    services = Services.Repo.by_route_id(conn.assigns.route.id)

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
        services:
          services
          |> Enum.sort_by(&sort_services_by_date/1)
          |> Enum.map(&Map.put(&1, :service_date, service_date)),
        schedule_note: ScheduleNote.new(conn.assigns.route),
        stops: simple_stop_list(conn.assigns.all_stops),
        direction_id: conn.assigns.direction_id,
        route_patterns: conn.assigns.route_patterns,
        shape_map: conn.assigns.shape_map
      }
    )
  end

  def sort_services_by_date(%Service{typicality: :typical_service, type: :weekday} = service) do
    {1, Date.to_string(service.start_date)}
  end

  def sort_services_by_date(%Service{} = service) do
    {2, Date.to_string(service.start_date)}
  end

  @spec simple_stop_list(Stops.Repo.stops_response()) :: [%{id: String.t(), name: String.t()}]
  defp simple_stop_list(all_stops) do
    Enum.map(all_stops, fn {_,
                            %{
                              id: id,
                              name: name,
                              closed_stop_info: closed_stop_info,
                              zone: zone,
                              route: %{type: type}
                            }} ->
      closed_stop? = if closed_stop_info == nil, do: false, else: true
      zone = if type == 2, do: zone, else: nil

      %{
        id: id,
        name: name,
        is_closed: closed_stop?,
        zone: zone
      }
    end)
  end

  defp tab_name(conn, _), do: assign(conn, :tab, "line")

  defp alerts(conn, _), do: assign_alerts(conn, [])

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
