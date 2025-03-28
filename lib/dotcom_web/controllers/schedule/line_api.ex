defmodule DotcomWeb.ScheduleController.LineApi do
  @moduledoc """
  Provides JSON endpoints for retrieving line diagram data.
  """

  alias Stops.RouteStop
  use DotcomWeb, :controller

  require Logger

  alias Dotcom.TransitNearMe
  alias DotcomWeb.Plugs.DateInRating
  alias DotcomWeb.ScheduleController.{Green, Predictions, VehicleLocations, VehicleTooltips}
  alias DotcomWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias Stops.Stop
  alias Vehicles.Vehicle

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @typep simple_vehicle :: %{
           id: String.t(),
           headsign: String.t() | nil,
           status: String.t(),
           trip_name: String.t() | nil,
           crowding: Vehicle.crowding() | nil,
           tooltip: String.t()
         }

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => route_id, "direction_id" => direction_id_str}) do
    direction_id = String.to_integer(direction_id_str)

    case LineHelpers.get_route(route_id) do
      {:ok, route} ->
        conn =
          conn
          |> assign(:route, route)
          |> assign(:direction_id, direction_id)
          |> assign_alerts(filter_by_direction?: true)

        branch_route_stops =
          LineHelpers.get_branch_route_stops(
            route,
            direction_id,
            conn.query_params["route_pattern"]
          )

        branch_route_stop_ids =
          branch_route_stops
          |> Enum.flat_map(fn rs ->
            rs
            |> Map.get(:stops)
            |> Enum.map(& &1.id)
          end)
          |> MapSet.new()

        other_route_stops =
          @stops_repo.by_route(route.id, direction_id)
          |> Enum.reject(&MapSet.member?(branch_route_stop_ids, &1.id))
          |> Enum.map(&RouteStop.build_route_stop(&1, route))
          |> Enum.map(&RouteStop.fetch_connections/1)

        {stop_tree, route_stop_lists} =
          LineHelpers.get_stop_tree_or_lists(branch_route_stops, route.type)

        json(
          conn,
          %{
            other_route_stops: other_route_stops,
            route_stop_lists: route_stop_lists,
            stop_tree: stop_tree
          }
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
    case LineHelpers.get_route(route_id) do
      {:ok, route} ->
        conn =
          conn
          |> assign(:route, route)
          |> assign(:direction_id, String.to_integer(direction_id))
          |> assign_vehicle_tooltips([])

        payload =
          do_realtime(
            route_id,
            direction_id,
            conn.assigns.date,
            conn.assigns.date_time,
            conn.assigns.vehicle_tooltips
          )

        conn
        |> put_resp_content_type("application/json")
        |> send_resp(200, payload)

      :not_found ->
        return_invalid_arguments_error(conn)
    end
  end

  def realtime(conn, _params) do
    return_invalid_arguments_error(conn)
  end

  defp do_realtime(route_id, direction_id, date, now, tooltips) do
    headsigns_by_stop =
      TransitNearMe.time_data_for_route_by_stop(
        route_id,
        String.to_integer(direction_id),
        date: date,
        now: now
      )

    if Map.keys(headsigns_by_stop) == [] do
      Logger.warning("No headsigns for route #{route_id} and direction #{direction_id}")
    end

    tooltips_by_stop =
      tooltips
      |> Map.values()
      |> Enum.group_by(&group_tooltips_by_stop/1)

    combined_data_by_stop =
      Map.keys(headsigns_by_stop)
      |> Stream.concat(Map.keys(tooltips_by_stop))
      |> Stream.uniq()
      |> Stream.map(fn stop_id ->
        if Map.get(headsigns_by_stop, stop_id) == nil do
          Logger.warning("No headsigns for stop #{stop_id} on route #{route_id}")
        end

        {stop_id,
         %{
           headsigns: Map.get(headsigns_by_stop, stop_id, []),
           vehicles: Map.get(tooltips_by_stop, stop_id, []) |> Enum.map(&simple_vehicle_map(&1))
         }}
      end)
      |> Enum.into(%{})

    Jason.encode!(combined_data_by_stop)
  end

  defp group_tooltips_by_stop(tooltip) do
    case @stops_repo.get_parent(tooltip.vehicle.stop_id) do
      %Stop{id: id} -> id
      _ -> nil
    end
  end

  @spec simple_vehicle_map(VehicleTooltip.t()) :: simple_vehicle
  defp simple_vehicle_map(
         %VehicleTooltip{
           vehicle: %Vehicle{
             id: id,
             status: status,
             crowding: crowding
           },
           trip: trip
         } = tooltip
       ) do
    tooltip_text = VehicleHelpers.tooltip(tooltip)

    case trip do
      nil ->
        %{id: id, status: status, tooltip: tooltip_text}

      %Schedules.Trip{headsign: headsign, name: name} ->
        %{
          id: id,
          headsign: headsign,
          status: status,
          trip_name: name,
          crowding: crowding,
          tooltip: tooltip_text
        }
    end
  end

  # Somewhat roundabout quick way of getting vehicles via the existing
  # DotcomWeb.ScheduleController.VehicleTooltips plug, which requires various
  # other bits of data supplied by numerous preceding plugs.
  @spec assign_vehicle_tooltips(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  defp assign_vehicle_tooltips(%Plug.Conn{assigns: %{route: %{id: "Green"}}} = conn, opts) do
    conn
    |> DateInRating.call(opts)
    |> Green.vehicle_locations(VehicleLocations.init(opts))
    |> Green.predictions(opts)
    |> VehicleTooltips.call(opts)
  end

  defp assign_vehicle_tooltips(conn, opts) do
    conn
    |> DateInRating.call(opts)
    |> VehicleLocations.call(VehicleLocations.init(opts))
    |> Predictions.call(Predictions.init(opts))
    |> VehicleTooltips.call(opts)
  end
end
