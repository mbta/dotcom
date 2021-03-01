defmodule SiteWeb.ScheduleController.TripViewController do
  @moduledoc """
  Plug builder for the tripView Schedule tab
  """
  use SiteWeb, :controller
  alias Routes.Route

  plug(SiteWeb.Plugs.Route)
  plug(SiteWeb.Plugs.DateInRating)
  plug(:tab_name)
  plug(SiteWeb.ScheduleController.RoutePdfs)
  plug(SiteWeb.ScheduleController.Core)
  plug(SiteWeb.ScheduleController.Schedules)
  plug(SiteWeb.ScheduleController.Journeys)
  plug(SiteWeb.ScheduleController.TripInfo)
  plug(SiteWeb.ScheduleController.ScheduleError)
  plug(:zone_map)

  def show(%{assigns: %{route: %Route{type: 2, id: route_id}}, query_params: params} = conn, _) do
    redirect(conn, to: timetable_path(conn, :show, route_id, params))
  end

  def show(%{assigns: %{route: %Route{id: route_id}}, query_params: query_params} = conn, _) do
    redirect(conn, to: line_path(conn, :show, route_id, Map.delete(query_params, "tab")))
  end

  defp zone_map(%{assigns: %{route: %Route{type: 2}, all_stops: all_stops}} = conn, _) do
    assign(conn, :zone_map, Map.new(all_stops, &{&1.id, &1.zone}))
  end

  defp zone_map(conn, _), do: conn

  defp tab_name(conn, _), do: assign(conn, :tab, "trip-view")
end
