defmodule SiteWeb.ScheduleController.LineApi do
  @moduledoc "Provides JSON endpoints for retrieving line diagram data."
  use SiteWeb, :controller

  alias Alerts.Match
  alias Alerts.Stop, as: AlertsStop
  alias Routes.Route
  alias Site.TransitNearMe
  alias SiteWeb.ScheduleController.Line.DiagramFormat
  alias SiteWeb.ScheduleController.Line.DiagramHelpers
  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias Stops.Repo, as: StopsRepo
  alias Stops.RouteStop
  alias Vehicles.Vehicle

  import SiteWeb.StopController, only: [json_safe_alerts: 2]

  @typep simple_vehicle :: %{
           id: String.t(),
           headsign: String.t() | nil,
           status: String.t(),
           trip_name: String.t() | nil,
           crowding: Vehicle.crowding() | nil,
           tooltip: String.t()
         }

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => route_id, "direction_id" => direction_id}) do
    case LineHelpers.get_route(route_id) do
      {:ok, route} ->
        conn =
          conn
          |> assign(:route, route)
          |> assign(:direction_id, String.to_integer(direction_id))
          |> assign_alerts(filter_by_direction?: true)

        line_data = get_line_data(route, String.to_integer(direction_id))

        json(
          conn,
          update_route_stop_data(line_data, conn.assigns.alerts, conn.assigns.date_time)
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

  @spec get_line_data(Route.t(), LineHelpers.direction_id()) :: [
          DiagramHelpers.stop_with_bubble_info()
        ]
  defp get_line_data(route, direction_id) do
    route_stops = LineHelpers.get_route_stops(route.id, direction_id, &StopsRepo.by_route/3)
    basic_shapes = LineHelpers.get_shapes_by_direction(route.id, route.type, direction_id)
    static_branches = LineHelpers.get_branches(basic_shapes, route_stops, route, direction_id)
    diagram_direction = RouteStop.reverse_direction_for_ferry(route.id, direction_id)
    DiagramHelpers.build_stop_list(static_branches, diagram_direction)
  end

  @doc """
  Builds a dataset for the line diagram from line_data, alerts, and the current
  datetime.
  * Selects alerts to associate with each stop based on stop_id and datetime
  * Creates a stop_data map to encode information relating to the stop on the
    diagram itself - branch name, stop/line/terminus/merge, and whether it needs
    to show a disruption
  """
  @spec update_route_stop_data(
          [
            DiagramHelpers.stop_with_bubble_info()
          ],
          [Alerts.Alert.t()],
          DateTime.t()
        ) :: [DiagramFormat.line_diagram_stop()]
  def update_route_stop_data(all_stops, alerts, date) do
    Enum.map(all_stops, fn stop ->
      compose_route_stop_data(stop, alerts, date)
    end)
    |> DiagramFormat.do_stops_list_with_disruptions(date)
    |> json_safe_route_stop_data(date)
  end

  @spec compose_route_stop_data(any, any, DateTime.t()) :: any
  defp compose_route_stop_data({data, %RouteStop{id: stop_id} = route_stop}, alerts, date) do
    %{
      alerts:
        alerts
        |> Enum.filter(&Match.any_time_match?(&1, date))
        |> AlertsStop.match(stop_id),
      route_stop: route_stop,
      stop_data:
        Enum.map(data, fn {key, value} -> %{branch: key, type: value, has_disruption?: false} end)
    }
  end

  @spec json_safe_route_stop_data([DiagramFormat.line_diagram_stop()], DateTime.t()) :: [
          DiagramFormat.line_diagram_stop()
        ]
  defp json_safe_route_stop_data(all_stops, date) do
    all_stops
    |> Enum.map(fn %{alerts: alerts, route_stop: route_stop} = stop_map ->
      %{
        stop_map
        | alerts: json_safe_alerts(alerts, date),
          route_stop: RouteStop.to_json_safe(route_stop)
      }
    end)
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
