defmodule DotcomWeb.ScheduleController.LineController do
  @moduledoc "Handles the page that shows the map and line diagram for a given route."

  use Dotcom.Gettext.Sigils
  use DotcomWeb, :controller

  import DotcomWeb.Schedule.CMS, only: [assign_content: 1]
  import DotcomWeb.Schedule.Defaults, only: [assign_defaults: 2]
  import DotcomWeb.Schedule.Holidays, only: [assign_next_holidays: 2]
  import DotcomWeb.Schedule.Line, only: [line_direction: 2]
  import DotcomWeb.Schedule.RouteBreadcrumbs, only: [assign_breadcrumbs: 2]

  alias Dotcom.ScheduleNote
  alias DotcomWeb.{ScheduleView, ViewHelpers}
  alias Plug.Conn
  alias Routes.{Group, Route}
  alias Services.Service

  plug(DotcomWeb.Plugs.Route)
  plug(DotcomWeb.Plugs.DateInRating)
  plug(:tab_name)
  plug(DotcomWeb.ScheduleController.RoutePdfs)
  plug(:assign_defaults)
  plug(:alerts)
  plug(:assign_breadcrumbs)
  plug(DotcomWeb.ScheduleController.HoursOfOperation)
  plug(:assign_next_holidays)
  plug(:line_direction)
  plug(:channel_id)

  def show(conn, _) do
    conn
    |> assign(:meta_description, route_description(conn.assigns.route))
    |> put_view(ScheduleView)
    |> assign_content()
    |> await_assign_all_default(__MODULE__)
    |> assign_schedule_page_data()
    |> render("show.html", [])
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
          ScheduleView.render(
            "_cms_teasers.html",
            Map.merge(conn.assigns, %{conn: conn})
          )
          |> Phoenix.HTML.Safe.to_iodata()
          |> IO.iodata_to_binary(),
        hours:
          ScheduleView.render("_hours_of_op.html", conn.assigns)
          |> Phoenix.HTML.Safe.to_iodata()
          |> IO.iodata_to_binary(),
        fares:
          Enum.map(ScheduleView.single_trip_fares(conn.assigns.route), fn {title, price} ->
            %{title: title, price: price}
          end),
        fare_link: ScheduleView.route_fare_link(conn.assigns.route),
        holidays: conn.assigns.holidays,
        route: Route.to_json_safe(conn.assigns.route),
        schedule_note: ScheduleNote.new(conn.assigns.route),
        stops: simple_stop_map(conn),
        direction_id: conn.assigns.direction_id,
        route_patterns: conn.assigns.route_patterns,
        stop_tree: conn.assigns.stop_tree,
        route_stop_lists: conn.assigns.route_stop_lists,
        alerts: conn.assigns.alerts,
        today: conn.assigns.date_time |> DateTime.to_date() |> Date.to_iso8601(),
        service_today?:
          Dotcom.ServicePatterns.has_service?(
            date: conn.assigns.date,
            route: conn.assigns.route.id
          ),
        variant: conn.assigns.variant
      }
    )
  end

  def sort_services_by_date(%Service{typicality: :typical_service, type: :weekday} = service) do
    {1, Date.to_string(service.start_date)}
  end

  def sort_services_by_date(%Service{typicality: :typical_service, type: :weekend} = service) do
    {2, Date.to_string(service.start_date)}
  end

  def sort_services_by_date(%Service{} = service) do
    {3, Date.to_string(service.start_date)}
  end

  @spec simple_stop_map(Conn.t()) :: map
  defp simple_stop_map(conn) do
    current_direction = Integer.to_string(conn.assigns.direction_id)
    opposite_direction = reverse_direction(current_direction)

    Map.new()
    |> Map.put(
      current_direction,
      simple_stop_list(conn.assigns.all_stops_from_route)
    )
    |> Map.put(
      opposite_direction,
      simple_stop_list(conn.assigns.reverse_direction_all_stops_from_route)
    )
  end

  # Must be strings for mapping to JSON
  defp reverse_direction("0"), do: "1"
  defp reverse_direction("1"), do: "0"

  defp simple_stop_list(stops) do
    stops |> Enum.uniq_by(& &1.id) |> Enum.map(&simple_stop(&1))
  end

  defp simple_stop(%{id: id, name: name, closed_stop_info: closed_info, zone: zone}) do
    %{
      id: id,
      name: name,
      is_closed: if(is_nil(closed_info), do: false, else: true),
      zone: zone
    }
  end

  defp tab_name(conn, _), do: assign(conn, :tab, "line")

  # Since the line diagram changes direction in React without a page reload, the set of alerts we
  # show at the top of this page should not be direction-specific.
  defp alerts(conn, _), do: assign_alerts(conn, filter_by_direction?: false)

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
          |> Enum.sort_by(& &1.sort_order)
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
        gettext(
          "MBTA %{text} stops and schedules, including maps, parking and accessibility information, and fares.",
          text: ScheduleView.route_header_text(route)
        )
    end
  end

  defp bus_description(route) do
    gettext(
      "MBTA %{type} route %{name} stops and schedules, including maps, real-time updates, parking and accessibility information, and connections.",
      type: bus_type(route),
      name: route.name
    )
  end

  defp line_description(route) do
    gettext(
      "MBTA %{name} %{type} stations and schedules, including maps, real-time updates, parking and accessibility information, and connections.",
      name: route.name,
      type: route_type(route)
    )
  end

  defp bus_type(route) do
    if Route.silver_line?(route), do: "Silver Line", else: ~t"bus"
  end

  defp route_type(route) do
    route
    |> Route.type_atom()
    |> Route.type_name()
  end
end
