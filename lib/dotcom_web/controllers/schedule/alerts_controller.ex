defmodule DotcomWeb.ScheduleController.AlertsController do
  @moduledoc """
  Used in the alerts tab on schedule pages.
  """

  use DotcomWeb, :controller

  alias DotcomWeb.{Plugs, ScheduleView}
  alias Routes.Route

  plug(DotcomWeb.Plugs.Route)
  plug(DotcomWeb.ScheduleController.Defaults)
  plug(:alerts)
  plug(:alerts_by_timeframe)
  plug(DotcomWeb.ScheduleController.RouteBreadcrumbs)
  plug(:tab_name)

  def show(conn, _) do
    conn
    |> assign(:meta_description, route_description(conn.assigns.route))
    |> put_view(ScheduleView)
    |> render("show.html", [])
  end

  defp tab_name(conn, _), do: assign(conn, :tab, "alerts")

  defp alerts(conn, _), do: assign_alerts(conn, filter_by_direction?: false)

  def route_description(route) do
    "Alerts for MBTA #{do_route_description(Route.type_atom(route), route)}"
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

  defp bus_type(route),
    do: if(Route.silver_line?(route), do: "Silver Line", else: "bus")

  defp route_type(route) do
    route
    |> Route.type_atom()
    |> Route.type_name()
  end

  # The alert timeframe filter is being phased out of schedule pages
  # Adjust this condition as we update more route alert page layouts
  defp alerts_by_timeframe(%{assigns: %{route: %Route{id: route_id}}} = conn, _) do
    if route_id in Dotcom.Routes.subway_route_ids() do
      conn
    else
      Plugs.AlertsByTimeframe.call(conn, [])
    end
  end
end
