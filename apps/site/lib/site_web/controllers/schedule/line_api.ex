defmodule SiteWeb.ScheduleController.LineApi do
  @moduledoc "Provides JSON endpoints for retrieving line diagram data."
  use SiteWeb, :controller

  alias Alerts.Match
  alias Alerts.Stop, as: AlertsStop
  alias RoutePatterns.RoutePattern
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
           trip_name: String.t() | nil,
           crowding: Vehicle.crowding() | nil
         }
  @typep line_diagram_stop :: %{
           alerts: [map],
           route_stop: map,
           stop_data: [map]
         }

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => route_id, "direction_id" => direction_id}) do
    case LineHelpers.get_route(route_id) do
      {:ok, route} ->
        conn =
          conn
          |> assign(:route, route)
          |> assign(:direction_id, direction_id)
          |> assign_alerts(filter_by_direction?: true)

        line_data =
          get_line_data(
            route,
            String.to_integer(direction_id),
            conn.query_params["route_pattern"]
          )

        json(
          conn,
          Enum.map(line_data, fn stop ->
            update_route_stop_data(stop, conn.assigns.alerts, conn.assigns.date)
          end)
          |> maybe_add_stop_disruptions()
        )

      :not_found ->
        return_invalid_arguments_error(conn)
    end
  end

  @doc """
  Provides predictions and vehicle information for a given route and direction, organized by stop.
  The line diagram polls this endpoint for its real-time data.
  """
  @spec realtime(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def realtime(conn, %{"id" => route_id, "direction_id" => direction_id}) do
    cache_key = {route_id, direction_id, conn.assigns.date}

    payload =
      ConCache.get_or_store(:line_diagram_realtime_cache, cache_key, fn ->
        do_realtime(route_id, direction_id, conn.assigns.date, conn.assigns.date_time)
      end)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, payload)
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

  @spec expand_route_id(Route.id_t()) :: [Route.id_t()]
  defp expand_route_id("Green"), do: GreenLine.branch_ids()
  defp expand_route_id(route_id), do: [route_id]

  @spec get_line_data(Route.t(), LineHelpers.direction_id(), RoutePattern.id_t() | nil) :: [
          DiagramHelpers.stop_with_bubble_info()
        ]
  defp get_line_data(route, direction_id, route_pattern_id) do
    route
    |> LineHelpers.get_branch_route_stops(direction_id, route_pattern_id)
    |> DiagramHelpers.build_stop_list(direction_id)
  end

  @spec update_route_stop_data({any, RouteStop.t()}, any, DateTime.t()) :: line_diagram_stop()
  def update_route_stop_data({data, %RouteStop{id: stop_id} = map}, alerts, date) do
    %{
      alerts:
        alerts
        |> Enum.filter(&Match.any_time_match?(&1, date))
        |> AlertsStop.match(stop_id)
        |> json_safe_alerts(date),
      route_stop: RouteStop.to_json_safe(map),
      stop_data:
        Enum.map(data, fn {key, value} -> %{branch: key, type: value, has_disruption?: false} end)
    }
  end

  @spec maybe_add_stop_disruptions([line_diagram_stop]) :: [line_diagram_stop]
  defp maybe_add_stop_disruptions(stops_list) do
    if Enum.any?(stops_list, &stop_has_disruption?(&1)) do
      do_stops_list_with_disruptions(stops_list)
    else
      stops_list
    end
  end

  @spec stop_has_disruption?(line_diagram_stop) :: boolean
  defp stop_has_disruption?(%{alerts: alerts}) do
    Enum.any?(alerts, &Alerts.Alert.is_diversion(&1))
  end

  # for each list of disrupted stops, make adjustment to the diagram based on
  # the nature of the disruption. e.g. for detour or stop/station closure we
  # modify the stop preceding it but for shuttle we don't style the final stop
  defp shift_indices_by_disruption_effect(indices, effects) do
    effect_avoids_stop? = effects -- effects -- [:stop_closure, :station_closure, :detour]

    cond do
      :shuttle in effects ->
        List.delete_at(indices, -1)

      effect_avoids_stop? && List.first(indices) > 0 ->
        [List.first(indices) - 1] ++ indices

      true ->
        indices
    end
  end

  defp get_effects_for_indexed_stops(stops_list) do
    stops_list
    |> Enum.flat_map(fn {%{alerts: alerts}, _index} ->
      Enum.map(alerts, & &1.effect)
    end)
    |> Enum.uniq()
  end

  defp add_disruption(stop) do
    Map.update(stop, :stop_data, [], fn stop_data ->
      stop_or_terminus = Kernel.length(stop_data) - 1

      stop_data
      |> List.update_at(stop_or_terminus, fn sd ->
        Map.replace!(sd, :has_disruption?, true)
      end)
    end)
  end

  defp do_stops_list_with_disruptions(stops_list) do
    disrupted_stop_indices =
      stops_list
      |> Enum.with_index()
      |> Enum.filter(&stop_has_disruption?(elem(&1, 0)))
      |> Enum.chunk_by(fn {%{alerts: alerts}, _index} ->
        alerts
        |> Enum.filter(&Alerts.Alert.is_diversion(&1))
        |> Enum.map(& &1.id)
      end)
      |> Enum.map(fn indexed_stops_list ->
        effects = get_effects_for_indexed_stops(indexed_stops_list)

        indexed_stops_list
        |> Enum.map(fn {_stop, index} -> index end)
        |> shift_indices_by_disruption_effect(effects)
      end)
      |> List.flatten()
      |> Enum.uniq()

    stops_list
    |> Enum.with_index()
    |> Enum.map(fn {stop, index} ->
      if index in disrupted_stop_indices do
        add_disruption(stop)
      else
        stop
      end
    end)
  end

  @spec simple_vehicle_map(Vehicle.t()) :: simple_vehicle
  defp simple_vehicle_map(%Vehicle{id: id, status: status, trip_id: trip_id, crowding: crowding}) do
    case SchedulesRepo.trip(trip_id) do
      nil ->
        %{id: id, status: status}

      %{headsign: headsign, name: name} ->
        %{
          id: id,
          headsign: headsign,
          status: status,
          trip_name: name,
          crowding: crowding
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
