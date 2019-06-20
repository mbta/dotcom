defmodule SiteWeb.ModeController do
  use SiteWeb, :controller

  alias Content.Teaser
  alias Plug.Conn
  alias PredictedSchedule.Display
  alias Site.TransitNearMe
  alias SiteWeb.{Mode}
  alias Routes.{Route}
  plug(SiteWeb.Plugs.RecentlyVisited)
  plug(SiteWeb.Plug.Mticket)
  plug(:require_google_maps)

  defdelegate subway(conn, params), to: Mode.SubwayController, as: :index
  defdelegate bus(conn, params), to: Mode.BusController, as: :index
  defdelegate ferry(conn, params), to: Mode.FerryController, as: :index
  defdelegate commuter_rail(conn, params), to: Mode.CommuterRailController, as: :index

  def index(conn, %{"route" => route_id} = params) when is_binary(route_id) do
    # redirect from old /schedules?route=ID to new /schedules/ID
    new_path = schedule_path(conn, :show, route_id, Map.delete(params, "route"))
    redirect(conn, to: new_path)
  end

  def index(conn, _params) do
    conn
    |> async_assign_default(:alerts, fn -> Alerts.Repo.all(conn.assigns.date_time) end, [])
    |> async_assign_default(:green_routes, fn -> green_routes() end)
    |> async_assign_default(:grouped_routes, fn -> filtered_grouped_routes([:bus]) end)
    |> assign(:breadcrumbs, [Breadcrumb.build("Schedules & Maps")])
    |> assign(:home, false)
    |> assign(:guides, guides())
    |> assign(
      :meta_description,
      "Schedule information for MBTA subway, bus, Commuter Rail, and ferry in the Greater Boston region, " <>
        "including real-time updates and arrival predictions."
    )
    |> await_assign_all_default(__MODULE__)
    |> render("index.html")
  end

  @spec predictions_api(Conn.t(), map) :: Conn.t()
  def predictions_api(conn, %{
        "id" => route_id,
        "origin_stop" => origin_stop,
        "direction_id" => direction_id
      }) do
    now = conn.assigns.date_time

    schedules =
      route_id
      |> PredictedSchedule.get(origin_stop, direction_id: direction_id, now: now)
      |> Enum.map(&TransitNearMe.build_time_map(&1, now: now))
      |> Enum.map(&route_with_prediction(&1, route_id))
      |> Enum.take(2)

    json(conn, schedules)
  end

  def route_with_prediction({pred_sched, time_map}, route_id) do
    trip = PredictedSchedule.trip(pred_sched)

    %{
      headsign: Display.headsign(pred_sched),
      train_number: trip && trip.name,
      route: Route.to_json_safe(Routes.Repo.get(route_id)),
      prediction: time_map
    }
  end

  def json_safe_routes(pred_or_sched) do
    Map.update!(pred_or_sched, :route, fn route -> Route.to_json_safe(route) end)
  end

  defp require_google_maps(conn, _) do
    assign(conn, :requires_google_maps?, true)
  end

  @spec guides :: [Teaser.t()]
  defp guides do
    [type: :page, topic: "guides", sidebar: 1]
    |> Content.Repo.teasers()
    |> Enum.map(&utm_url/1)
  end

  @spec utm_url(Teaser.t()) :: Teaser.t()
  defp utm_url(%Teaser{} = teaser) do
    url = UrlHelpers.build_utm_url(teaser, source: "all-hub", type: "sidebar")
    %{teaser | path: url}
  end
end
