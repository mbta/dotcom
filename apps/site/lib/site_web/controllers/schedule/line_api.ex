defmodule SiteWeb.ScheduleController.LineApi do
  @moduledoc "Provides JSON endpoints for retrieving line diagram data."
  use SiteWeb, :controller

  alias Alerts.Stop, as: AlertsStop
  alias Routes.Route
  alias Schedules.Repo, as: SchedulesRepo
  alias Site.TransitNearMe
  alias SiteWeb.ScheduleController.Line.DiagramHelpers
  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias Stops.Repo, as: StopsRepo
  alias Stops.RouteStop
  alias Vehicles.Repo, as: VehiclesRepo
  alias Vehicles.Vehicle

  import SiteWeb.StopController, only: [json_safe_alerts: 2]

  @typep simple_vehicle :: %{
           id: String.t(),
           headsign: String.t() | nil,
           status: String.t(),
           trip_name: String.t() | nil
         }

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
  """
  @spec realtime(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def realtime(conn, %{"id" => route_id, "direction_id" => direction_id} = query_params) do
    # We added this since we made some alterations to the corresponding
    # frontend code, and we only want to service requests from the latest
    # version of said code
    if query_params["v"] == "2" do
      cache_key = {route_id, direction_id, conn.assigns.date}

      payload =
        ConCache.get_or_store(:line_diagram_realtime_cache, cache_key, fn ->
          do_realtime(route_id, direction_id, conn.assigns.date, conn.assigns.date_time)
        end)

      conn
      |> put_resp_content_type("application/json")
      |> send_resp(200, payload)
    else
      json(conn, %{})
    end
  end

  defp do_realtime(route_id, direction_id, date, now) do
    headsigns_by_stop =
      TransitNearMe.time_data_for_route_by_stop(
        route_id,
        String.to_integer(direction_id),
        date: date,
        now: now
      )

    vehicles_by_stop =
      route_id
      |> expand_route_id()
      |> Stream.flat_map(&VehiclesRepo.route(&1, direction_id: String.to_integer(direction_id)))
      |> Stream.map(&update_vehicle_with_parent_stop(&1))
      |> Enum.group_by(& &1.stop_id)

    combined_data_by_stop =
      Map.keys(headsigns_by_stop)
      |> Stream.concat(Map.keys(vehicles_by_stop))
      |> Stream.uniq()
      |> Stream.map(fn stop_id ->
        {stop_id,
         %{
           headsigns: Map.get(headsigns_by_stop, stop_id, []),
           vehicles: Map.get(vehicles_by_stop, stop_id, []) |> Enum.map(&simple_vehicle_map(&1))
         }}
      end)
      |> Enum.into(%{})

    Jason.encode!(combined_data_by_stop)
  end

  @spec update_route_stop_data({any, RouteStop.t()}, any, DateTime.t()) :: map()
  def update_route_stop_data({data, %RouteStop{id: stop_id} = map}, alerts, date) do
    %{
      alerts: alerts |> AlertsStop.match(stop_id) |> json_safe_alerts(date),
      route_stop: RouteStop.to_json_safe(map),
      stop_data: Enum.map(data, fn {key, value} -> %{branch: key, type: value} end)
    }
  end

  @spec expand_route_id(Route.id_t()) :: [Route.id_t()]
  defp expand_route_id("Green"), do: GreenLine.branch_ids()
  defp expand_route_id(route_id), do: [route_id]

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

  @spec simple_vehicle_map(Vehicle.t()) :: simple_vehicle
  defp simple_vehicle_map(%Vehicle{id: id, status: status, trip_id: trip_id}) do
    case SchedulesRepo.trip(trip_id) do
      nil ->
        %{id: id, status: status}

      %{headsign: headsign, name: name} ->
        %{
          id: id,
          headsign: headsign,
          status: status,
          trip_name: name
        }
    end
  end

  @spec update_vehicle_with_parent_stop(Vehicle.t()) :: Vehicle.t()
  defp update_vehicle_with_parent_stop(vehicle) do
    case StopsRepo.get_parent(vehicle.stop_id) do
      nil -> vehicle
      parent_stop -> %{vehicle | stop_id: parent_stop.id}
    end
  end
end
