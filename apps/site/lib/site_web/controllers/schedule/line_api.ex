defmodule SiteWeb.ScheduleController.LineApi do
  @moduledoc """
    API for retrieving line diagram data
  """
  use SiteWeb, :controller

  alias Alerts.Stop
  alias SiteWeb.ScheduleController.Line.DiagramHelpers
  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias Stops.Repo, as: StopsRepo
  alias Stops.RouteStop

  import SiteWeb.StopController, only: [json_safe_alerts: 2]

  plug(:alerts)

  @type query_param :: String.t() | nil
  @type direction_id :: 0 | 1

  defp alerts(conn, _), do: assign_alerts(conn, [])

  def show(conn, %{
        "id" => route_id,
        "direction_id" => direction_id
      }) do
    line_data =
      get_line_data(conn, route_id, String.to_integer(direction_id), %{
        stops_by_route_fn: &StopsRepo.by_route/3
      })

    json(
      conn,
      Enum.map(line_data, fn stop ->
        update_route_stop_data(stop, conn.assigns.alerts, conn.assigns.date)
      end)
    )
  end

  def get_line_data(conn, route_id, direction_id, deps) do
    route = LineHelpers.get_route(route_id)
    variant = conn.query_params["variant"]
    route_shapes = LineHelpers.get_route_shapes(route.id, direction_id)
    route_stops = LineHelpers.get_route_stops(route.id, direction_id, deps.stops_by_route_fn)
    active_shapes = LineHelpers.get_active_shapes(route_shapes, route, variant)
    filtered_shapes = LineHelpers.filter_route_shapes(route_shapes, active_shapes, route)
    branches = LineHelpers.get_branches(filtered_shapes, route_stops, route, direction_id)
    DiagramHelpers.build_stop_list(branches, direction_id)
  end

  def update_route_stop_data({data, %RouteStop{id: stop_id} = map}, alerts, date) do
    %{
      stop_data: Enum.map(data, fn {key, value} -> %{branch: key, type: value} end),
      route_stop: RouteStop.to_json_safe(map),
      alerts: alerts |> Stop.match(stop_id) |> json_safe_alerts(date)
    }
  end
end
