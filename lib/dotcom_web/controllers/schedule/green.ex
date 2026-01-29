defmodule DotcomWeb.ScheduleController.Green do
  @moduledoc """
    Alternate controller for Green Line schedules
  """

  use Dotcom.Gettext.Sigils
  use DotcomWeb, :controller

  import DotcomWeb.ControllerHelpers,
    only: [assign_alerts: 2]

  import DotcomWeb.Schedule.{CMS, Defaults, Holidays, Line, RouteBreadcrumbs}

  alias DotcomWeb.Schedule.{Predictions, VehicleLocations}
  alias DotcomWeb.ScheduleController.LineController
  alias DotcomWeb.ScheduleView

  plug(:route)
  plug(DotcomWeb.Plugs.DateInRating)
  plug(:assign_alerts)
  plug(DotcomWeb.Plugs.AlertsByTimeframe)
  plug(:assign_defaults)
  plug(:assign_next_holidays)
  plug(:stops_on_routes)
  plug(:vehicle_locations)
  plug(:predictions)
  plug(DotcomWeb.ScheduleController.VehicleTooltips)
  plug(:assign_breadcrumbs)
  plug(DotcomWeb.ScheduleController.ScheduleError)
  plug(:route_pdfs)
  plug(:channels)
  plug(:line_direction)

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @task_timeout 10_000

  def show(%Plug.Conn{query_params: %{"tab" => "alerts"}} = conn, _params),
    do: alerts(conn, [])

  def show(conn, _params), do: line(conn, [])

  def alerts(conn, _params) do
    conn
    |> assign(:tab, "alerts")
    |> assign(:mode, :subway)
    |> put_view(ScheduleView)
    |> render("show.html", [])
  end

  def line(conn, _params) do
    conn
    |> assign(:tab, "line")
    |> assign(
      :meta_description,
      ~t"MBTA Green Line trolley stations and schedules, including maps, real-time updates, parking and accessibility information, and connections."
    )
    |> assign_content()
    |> await_assign_all_default(__MODULE__)
    |> put_view(ScheduleView)
    |> LineController.assign_schedule_page_data()
    |> render("show.html", [])
  end

  def route(conn, _params) do
    assign(conn, :route, @routes_repo.green_line())
  end

  def stops_on_routes(
        %Plug.Conn{assigns: %{direction_id: direction_id, date: date}} = conn,
        _opts
      ) do
    assign(conn, :stops_on_routes, GreenLine.stops_on_routes(direction_id, date))
  end

  def predictions(conn, _opts) do
    {predictions, vehicle_predictions} =
      conn
      |> conn_with_branches
      |> Task.async_stream(
        fn branch_conn ->
          Predictions.all_predictions(branch_conn)
        end,
        timeout: @task_timeout
      )
      |> Enum.reduce({[], []}, fn {:ok, branch_conn},
                                  {acc_predictions, acc_vehicle_predictions} ->
        {branch_conn.assigns.predictions ++ acc_predictions,
         branch_conn.assigns.vehicle_predictions ++ acc_vehicle_predictions}
      end)

    conn
    |> assign(:predictions, predictions)
    |> assign(:vehicle_predictions, vehicle_predictions)
  end

  def vehicle_locations(conn, opts) do
    vehicle_locations =
      conn
      |> conn_with_branches
      |> Task.async_stream(
        fn conn ->
          VehicleLocations.all_vehicle_locations(conn, opts).assigns.vehicle_locations
        end,
        timeout: @task_timeout
      )
      |> Enum.reduce(%{}, fn {:ok, result}, acc -> Map.merge(result, acc) end)

    assign(conn, :vehicle_locations, vehicle_locations)
  end

  defp conn_with_branches(conn) do
    GreenLine.branch_ids()
    |> Enum.map(fn route_id ->
      %{
        conn
        | assigns: %{conn.assigns | route: @routes_repo.get(route_id)},
          params: Map.put(conn.params, "route", route_id)
      }
    end)
  end

  defp route_pdfs(%{assigns: %{date: date}} = conn, _) do
    pdfs = Dotcom.RoutePdfs.fetch_and_choose_pdfs("Green", date)
    assign(conn, :route_pdfs, pdfs)
  end

  defp channels(conn, _) do
    assign(conn, :channel, "vehicles:Green:#{conn.assigns.direction_id}")
  end
end
