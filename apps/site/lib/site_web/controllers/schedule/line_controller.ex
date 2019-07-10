defmodule SiteWeb.ScheduleController.LineController do
  use SiteWeb, :controller
  alias Phoenix.HTML
  alias Routes.{Group, Route}
  alias Services.Service
  alias Site.ScheduleNote
  alias SiteWeb.{ScheduleView, ViewHelpers}

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
    # credo:disable-for-next-line
    IO.inspect(date, label: "get schedules date")

    {time, _result} =
      :timer.tc(fn ->
        Schedules.Repo.by_route_ids([route_id], date: date, direction_id: direction_id)
      end)

    # credo:disable-for-next-line
    IO.inspect(time, label: "time for schedules repo")

    services =
      Enum.map(
        Schedules.Repo.by_route_ids([route_id], date: date, direction_id: direction_id),
        &Map.update!(&1, :route, fn route -> Route.to_json_safe(route) end)
      )

    services_by_trip =
      services
      |> Enum.map(&Map.update!(&1, :time, fn time -> Timex.format!(time, "{0h12}:{m} {AM}") end))
      |> Enum.group_by(& &1.trip.id)

    ordered_trips = services |> Enum.sort_by(& &1.time) |> Enum.map(& &1.trip.id) |> Enum.uniq()
    %{by_trip: services_by_trip, trip_order: ordered_trips}
  end

  def schedules_for_service(route_id, services) do
    {time, result} =
      :timer.tc(fn ->
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
      end)

    # credo:disable-for-next-line
    IO.inspect(time, label: "get schedules_for_service")
    result
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
        service_schedules: schedules_for_service(conn.assigns.route.id, services),
        schedule_note: ScheduleNote.new(conn.assigns.route),
        stops: simple_stop_list(conn.assigns.all_stops),
        direction_id: conn.assigns.direction_id
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
