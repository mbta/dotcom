defmodule SiteWeb.ScheduleController.LineApi do
  @moduledoc "Provides JSON endpoints for retrieving line diagram data."
  use SiteWeb, :controller

  alias Alerts.Stop, as: AlertsStop
  alias Routes.Route
  alias SiteWeb.ScheduleController.Line.DiagramHelpers
  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias Stops.Repo, as: StopsRepo
  alias Stops.RouteStop

  import SiteWeb.StopController, only: [json_safe_alerts: 2]

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => route_id, "direction_id" => direction_id}) do
    line_data =
      get_line_data(
        route_id,
        String.to_integer(direction_id),
        conn.query_params["variant"],
        !Laboratory.enabled?(conn, :old_line_diagram)
      )

    conn =
      conn
      |> assign(:route, LineHelpers.get_route(route_id))
      |> assign(:direction_id, direction_id)
      |> assign_alerts(filter_by_direction?: true)

    json(
      conn,
      Enum.map(line_data, fn stop ->
        update_route_stop_data(stop, conn.assigns.alerts, conn.assigns.date)
      end)
    )
  end

  @doc """
  Provides predictions and vehicle information for a given route and direction, organized by stop.
  The line diagram polls this endpoint for its real-time data.

  Currently disabled due to performance issues.
  """
  @spec realtime(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def realtime(conn, _params) do
    json(conn, %{})
  end

  @spec update_route_stop_data({any, RouteStop.t()}, any, DateTime.t()) :: map()
  def update_route_stop_data({data, %RouteStop{id: stop_id} = map}, alerts, date) do
    %{
      alerts: alerts |> AlertsStop.match(stop_id) |> json_safe_alerts(date),
      route_stop: RouteStop.to_json_safe(map),
      stop_data: Enum.map(data, fn {key, value} -> %{branch: key, type: value} end)
    }
  end

  @spec get_line_data(Route.id_t(), LineHelpers.direction_id(), Route.branch_name(), boolean()) ::
          [DiagramHelpers.stop_with_bubble_info()]
  defp get_line_data(route_id, direction_id, variant, redesign_enabled?) do
    route = LineHelpers.get_route(route_id)
    route_shapes = LineHelpers.get_route_shapes(route.id, direction_id)
    route_stops = LineHelpers.get_route_stops(route.id, direction_id, &StopsRepo.by_route/3)
    active_shapes = LineHelpers.get_active_shapes(route_shapes, route, variant)
    filtered_shapes = LineHelpers.filter_route_shapes(route_shapes, active_shapes, route)
    branches = LineHelpers.get_branches(filtered_shapes, route_stops, route, direction_id)

    DiagramHelpers.build_stop_list(branches, direction_id, redesign_enabled?)
  end
end
