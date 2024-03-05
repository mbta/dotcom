defmodule DotcomWeb.ScheduleController.LineApi do
  @moduledoc """
  Provides JSON endpoints for retrieving line diagram data.
  """

  use DotcomWeb, :controller
  use Nebulex.Caching.Decorators

  alias Dotcom.TransitNearMe
  alias DotcomWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias Vehicles.Vehicle

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.minutes(1)

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

        {stop_tree, route_stop_lists} =
          LineHelpers.get_stop_tree_or_lists(branch_route_stops, route.type)

        json(
          conn,
          %{stop_tree: stop_tree, route_stop_lists: route_stop_lists}
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

  @decorate cacheable(
              cache: @cache,
              key:
                Dotcom.Cache.KeyGenerator.generate(__MODULE__, :do_realtime, [
                  route_id,
                  direction_id,
                  date
                ]),
              on_error: :nothing,
              opts: [ttl: @ttl]
            )
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
  # DotcomWeb.ScheduleController.VehicleTooltips plug, which requires various
  # other bits of data supplied by numerous preceding plugs.
  @spec assign_vehicle_tooltips(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  defp assign_vehicle_tooltips(%Plug.Conn{assigns: %{route: %{id: "Green"}}} = conn, opts) do
    conn
    |> DotcomWeb.Plugs.DateInRating.call(opts)
    |> DotcomWeb.ScheduleController.Green.vehicle_locations(
      DotcomWeb.ScheduleController.VehicleLocations.init(opts)
    )
    |> DotcomWeb.ScheduleController.Green.predictions(
      DotcomWeb.ScheduleController.Predictions.init(opts)
    )
    |> DotcomWeb.ScheduleController.VehicleTooltips.call(opts)
  end

  defp assign_vehicle_tooltips(conn, opts) do
    conn
    |> DotcomWeb.Plugs.DateInRating.call(opts)
    |> DotcomWeb.ScheduleController.VehicleLocations.call(
      DotcomWeb.ScheduleController.VehicleLocations.init(opts)
    )
    |> DotcomWeb.ScheduleController.Predictions.call(
      DotcomWeb.ScheduleController.Predictions.init(opts)
    )
    |> DotcomWeb.ScheduleController.VehicleTooltips.call(opts)
  end
end
