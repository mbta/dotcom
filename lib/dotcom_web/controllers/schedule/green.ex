defmodule DotcomWeb.ScheduleController.Green do
  @moduledoc """
    Alternate controller for Green Line schedules
  """
  use DotcomWeb, :controller

  import DotcomWeb.ControllerHelpers,
    only: [call_plug: 2, call_plug_with_opts: 3, assign_alerts: 2]

  import UrlHelpers, only: [update_url: 2]

  alias DotcomWeb.ScheduleController.LineController
  alias DotcomWeb.ScheduleController.Predictions
  alias DotcomWeb.ScheduleController.VehicleLocations
  alias DotcomWeb.ScheduleView

  plug(:route)
  plug(DotcomWeb.Plugs.DateInRating)
  plug(DotcomWeb.ScheduleController.DatePicker)
  plug(:assign_alerts)
  plug(DotcomWeb.Plugs.AlertsByTimeframe)
  plug(DotcomWeb.ScheduleController.Defaults)
  plug(:stops_on_routes)
  plug(:validate_direction)
  plug(:vehicle_locations)
  plug(:predictions)
  plug(DotcomWeb.ScheduleController.VehicleTooltips)
  plug(DotcomWeb.ScheduleController.Journeys)
  plug(:validate_journeys)
  plug(DotcomWeb.ScheduleController.RouteBreadcrumbs)
  plug(DotcomWeb.ScheduleController.ScheduleError)
  plug(:route_pdfs)
  plug(:channels)

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @task_timeout 10_000

  def show(%Plug.Conn{query_params: %{"tab" => "alerts"}} = conn, _params), do: alerts(conn, [])

  def show(conn, _params), do: line(conn, [])

  def alerts(conn, _params) do
    conn
    |> assign(:tab, "alerts")
    |> put_view(ScheduleView)
    |> render("show.html", [])
  end

  def line(conn, _params) do
    conn
    |> assign(:tab, "line")
    |> assign(
      :meta_description,
      "MBTA Green Line trolley stations and schedules, including maps, real-time updates, " <>
        "parking and accessibility information, and connections."
    )
    |> call_plug(DotcomWeb.ScheduleController.Holidays)
    |> call_plug(DotcomWeb.ScheduleController.Line)
    |> call_plug(DotcomWeb.ScheduleController.CMS)
    |> await_assign_all_default(__MODULE__)
    |> put_view(ScheduleView)
    |> LineController.assign_schedule_page_data()
    |> render("show.html", [])
  end

  def route(conn, _params) do
    assign(conn, :route, @routes_repo.green_line())
  end

  def stops_on_routes(%Plug.Conn{assigns: %{direction_id: direction_id, date: date}} = conn, _opts) do
    assign(conn, :stops_on_routes, GreenLine.stops_on_routes(direction_id, date))
  end

  def predictions(conn, _opts) do
    {predictions, vehicle_predictions} =
      if Predictions.should_fetch_predictions?(conn) do
        predictions_stream =
          conn
          |> conn_with_branches()
          |> Task.async_stream(
            fn conn ->
              Predictions.predictions(conn)
            end,
            timeout: @task_timeout,
            on_timeout: :kill_task
          )

        vehicle_predictions =
          Predictions.vehicle_predictions(conn)

        {flat_map_results(predictions_stream), vehicle_predictions}
      else
        {[], []}
      end

    conn
    |> assign(:predictions, predictions)
    |> assign(:vehicle_predictions, vehicle_predictions)
  end

  def vehicle_locations(conn, opts) do
    vehicle_locations =
      conn
      |> conn_with_branches()
      |> Task.async_stream(
        fn conn ->
          call_plug_with_opts(conn, VehicleLocations, opts).assigns.vehicle_locations
        end,
        timeout: @task_timeout
      )
      |> Enum.reduce(%{}, fn {:ok, result}, acc -> Map.merge(result, acc) end)

    assign(conn, :vehicle_locations, vehicle_locations)
  end

  @doc """

  If we built an empty journey list, but we had predictions for the
  origin, then redirect the user away from their selected destination so they
  at least get partial results.

  """
  def validate_journeys(%{assigns: %{destination: nil}} = conn, []) do
    conn
  end

  def validate_journeys(%{assigns: %{journeys: %JourneyList{journeys: [_ | _]}}} = conn, []) do
    conn
  end

  def validate_journeys(conn, []) do
    origin_predictions = Enum.find(conn.assigns.predictions, &(&1.stop.id == conn.assigns.origin.id))

    if is_nil(origin_predictions) do
      conn
    else
      url = UrlHelpers.update_url(conn, destination: nil)

      conn
      |> redirect(to: url)
      |> halt()
    end
  end

  defp conn_with_branches(conn) do
    Enum.map(GreenLine.branch_ids(), fn route_id ->
      %{
        conn
        | assigns: %{conn.assigns | route: @routes_repo.get(route_id)},
          params: Map.put(conn.params, "route", route_id)
      }
    end)
  end

  defp flat_map_results(results) do
    Enum.flat_map(results, &flat_map_ok/1)
  end

  @spec flat_map_ok({:ok, [value] | error} | error) :: [value]
        when error: {:error, any}, value: any
  defp flat_map_ok({:ok, values}) when is_list(values), do: values

  defp flat_map_ok(_) do
    []
  end

  defp validate_direction(%{assigns: %{origin: origin, destination: destination, direction_id: direction_id}} = conn, _)
       when not is_nil(origin) and not is_nil(destination) do
    {stops, _map} = conn.assigns.stops_on_routes

    stops = Enum.reverse(stops)

    if Util.ListHelpers.find_first(stops, origin, destination) == destination do
      conn
      |> redirect(to: update_url(conn, direction_id: 1 - direction_id))
      |> halt()
    else
      conn
    end
  end

  defp validate_direction(conn, _), do: conn

  defp route_pdfs(%{assigns: %{date: date}} = conn, _) do
    pdfs = Dotcom.RoutePdfs.fetch_and_choose_pdfs("Green", date)
    assign(conn, :route_pdfs, pdfs)
  end

  defp channels(conn, _) do
    assign(conn, :channel, "vehicles:Green:#{conn.assigns.direction_id}")
  end
end
