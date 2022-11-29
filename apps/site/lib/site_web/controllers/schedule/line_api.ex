defmodule SiteWeb.ScheduleController.LineApi do
  @moduledoc "Provides JSON endpoints for retrieving line diagram data."
  use SiteWeb, :controller

  alias Site.TransitNearMe
  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias Vehicles.Vehicle

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

        stop_tree =
          branch_route_stops
          |> Enum.map(&Enum.map(&1.stops, fn route_stop -> {route_stop.id, route_stop} end))
          |> UnrootedPolytree.from_lists()

        json(
          conn,
          %{stop_tree: stop_tree}
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

        cache_key = {route_id, direction_id, conn.assigns.date}

        payload =
          ConCache.get_or_store(:line_diagram_realtime_cache, cache_key, fn ->
            do_realtime(
              route_id,
              direction_id,
              conn.assigns.date,
              conn.assigns.date_time,
              conn.assigns.vehicle_tooltips
            )
          end)

        conn
        |> put_resp_content_type("application/json")
        |> send_resp(200, payload)

      :not_found ->
        return_invalid_arguments_error(conn)
    end
  end

  defp do_realtime(route_id, direction_id, date, now, tooltips) do
    headsigns_by_stop =
      TransitNearMe.time_data_for_route_by_stop(
        route_id,
        String.to_integer(direction_id),
        date: date,
        now: now
      )

    tooltips_by_stop =
      tooltips
      |> Map.values()
      |> Enum.group_by(& &1.vehicle.stop_id)

    combined_data_by_stop =
      Map.keys(headsigns_by_stop)
      |> Stream.concat(Map.keys(tooltips_by_stop))
      |> Stream.uniq()
      |> Stream.map(fn stop_id ->
        {stop_id,
         %{
           headsigns: Map.get(headsigns_by_stop, stop_id, []),
           vehicles: Map.get(tooltips_by_stop, stop_id, []) |> Enum.map(&simple_vehicle_map(&1))
         }}
      end)
      |> Enum.into(%{})

    Jason.encode!(combined_data_by_stop)
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
  # SiteWeb.ScheduleController.VehicleTooltips plug, which requires various
  # other bits of data supplied by numerous preceding plugs.
  @spec assign_vehicle_tooltips(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  defp assign_vehicle_tooltips(%Plug.Conn{assigns: %{route: %{id: "Green"}}} = conn, opts) do
    conn
    |> SiteWeb.Plugs.DateInRating.call(opts)
    |> SiteWeb.ScheduleController.Green.vehicle_locations(
      SiteWeb.ScheduleController.VehicleLocations.init(opts)
    )
    |> SiteWeb.ScheduleController.Green.predictions(
      SiteWeb.ScheduleController.Predictions.init(opts)
    )
    |> SiteWeb.ScheduleController.VehicleTooltips.call(opts)
  end

  defp assign_vehicle_tooltips(conn, opts) do
    conn
    |> SiteWeb.Plugs.DateInRating.call(opts)
    |> SiteWeb.ScheduleController.VehicleLocations.call(
      SiteWeb.ScheduleController.VehicleLocations.init(opts)
    )
    |> SiteWeb.ScheduleController.Predictions.call(
      SiteWeb.ScheduleController.Predictions.init(opts)
    )
    |> SiteWeb.ScheduleController.VehicleTooltips.call(opts)
  end
end
