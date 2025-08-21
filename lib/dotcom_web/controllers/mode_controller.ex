defmodule DotcomWeb.ModeController do
  @moduledoc false

  use DotcomWeb, :controller

  alias CMS.{Partial.Teaser, Repo}
  alias DotcomWeb.Mode
  alias Routes.Route

  plug(DotcomWeb.Plugs.RecentlyVisited)
  plug(DotcomWeb.Plug.Mticket)

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

  def json_safe_routes(pred_or_sched) do
    Map.update!(pred_or_sched, :route, fn route -> Route.to_json_safe(route) end)
  end

  defp guides do
    [type: [:page], topic: "guides", sidebar: 1]
    |> Repo.teasers()
    |> Enum.map(&utm_url/1)
  end

  defp utm_url(%Teaser{} = teaser) do
    url = UrlHelpers.build_utm_url(teaser, source: "all-hub", type: "sidebar")
    %{teaser | path: url}
  end
end
