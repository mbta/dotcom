defmodule DotcomWeb.ScheduleController.AlertsController do
  @moduledoc """
  Used in the alerts tab on schedule pages.
  """

  use Dotcom.Gettext.Sigils
  use DotcomWeb, :controller

  import DotcomWeb.Schedule.{Defaults, RouteBreadcrumbs}

  alias DotcomWeb.{Plugs, ScheduleView}
  alias Routes.Route

  plug(DotcomWeb.Plugs.Route)
  plug(:assign_defaults)
  plug(:alerts)
  plug(:alerts_by_timeframe)
  plug(:assign_breadcrumbs)
  plug(:tab_name)

  # The alert timeframe filter is being phased out of schedule pages
  # Adjust this as we update more route alert page layouts
  @route_types_without_timeframes [0, 1, 2]

  def show(conn, _) do
    mode =
      conn
      |> Map.get(:assigns, %{})
      |> Map.get(:route)
      |> Routes.Route.type_atom()

    conn
    |> assign(:meta_description, route_description(conn.assigns.route))
    |> assign(:mode, mode)
    |> put_view(ScheduleView)
    |> render("show.html", [])
  end

  defp tab_name(conn, _), do: assign(conn, :tab, "alerts")

  defp alerts(conn, _), do: assign_alerts(conn, filter_by_direction?: false)

  def route_description(route) do
    gettext(
      "Alerts for MBTA %{description}",
      description: do_route_description(Route.type_atom(route), route)
    )
  end

  defp do_route_description(:bus, %{id: route_number} = route) do
    "#{bus_type(route)} route #{route_number}"
  end

  defp do_route_description(:subway, route) do
    "#{route.name} #{route_type(route)}"
  end

  defp do_route_description(_, route) do
    ScheduleView.route_header_text(route)
  end

  defp bus_type(route) do
    if Route.silver_line?(route), do: "Silver Line", else: ~t"bus"
  end

  defp route_type(route) do
    route
    |> Route.type_atom()
    |> Route.type_name()
  end

  defp alerts_by_timeframe(
         %{
           assigns: %{route: %Route{type: route_type, id: route_id}},
           params: %{"alerts_timeframe" => _} = params
         } =
           conn,
         _
       )
       when route_type in @route_types_without_timeframes do
    new_path = conn |> alerts_path(:show, route_id, params |> Map.drop(["alerts_timeframe"]))
    conn |> redirect(to: new_path)
  end

  defp alerts_by_timeframe(conn, _) do
    Plugs.AlertsByTimeframe.call(conn, [])
  end
end
