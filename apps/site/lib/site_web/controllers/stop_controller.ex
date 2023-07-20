defmodule SiteWeb.StopController do
  @moduledoc """
  Page for display of information about in individual stop or station.
  """
  use SiteWeb, :controller
  alias Alerts.Alert
  alias Alerts.Repo, as: AlertsRepo
  alias Alerts.Stop, as: AlertsStop
  alias Plug.Conn
  alias Site.JsonHelpers
  alias Routes.{Group, Route}
  alias Site.TransitNearMe
  alias SiteWeb.AlertView
  alias Stops.{Repo, Stop}

  plug(:alerts)
  plug(SiteWeb.Plugs.AlertsByTimeframe)

  @type routes_map_t :: %{
          group_name: atom,
          routes: [route_with_directions]
        }

  def index(conn, _params) do
    redirect(conn, to: stop_path(conn, :show, :subway))
  end

  def show(conn, %{"id" => mode}) when mode in ["subway", "commuter-rail", "ferry"] do
    mode_atom = Route.type_atom(mode)
    {mattapan, stop_info} = get_stop_info()

    conn
    |> async_assign_default(:mode_hubs, fn -> HubStops.mode_hubs(mode_atom, stop_info) end, [])
    |> async_assign_default(:route_hubs, fn -> HubStops.route_hubs(stop_info) end, [])
    |> assign(:stop_info, stop_info)
    |> assign(:requires_location_service?, true)
    |> assign(:mattapan, mattapan)
    |> assign(:mode, mode_atom)
    |> assign(:breadcrumbs, [Breadcrumb.build("Stations")])
    |> await_assign_all_default(__MODULE__)
    |> render("index.html")
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => stop_id}) do
    conn
    |> render("show-redesign.html", %{
      stop_id: stop_id,
      routes_by_stop: Routes.Repo.by_stop(stop_id, include: "stop.connecting_stops")
    })
  end

  @spec get(Conn.t(), map) :: Conn.t()
  def get(conn, %{"id" => stop_id}) do
    json(conn, Repo.get(stop_id))
  end

  @spec api(Conn.t(), map) :: Conn.t()
  def api(conn, %{"id" => stop_id}) do
    routes_by_stop = Routes.Repo.by_stop(stop_id)
    grouped_routes = grouped_routes(routes_by_stop)
    routes_map = routes_map(grouped_routes, stop_id, conn.assigns.date_time)
    json_safe_routes = json_safe_routes(routes_map)
    json(conn, json_safe_routes)
  end

  @doc "Redirect users who type in a URL with a slash to the correct URL"
  def stop_with_slash_redirect(conn, %{"path" => path}) do
    real_id = Enum.join(path, "/")

    conn
    |> redirect(to: stop_path(conn, :show, real_id))
    |> halt
  end

  @spec get_stop_info :: {DetailedStopGroup.t(), [DetailedStopGroup.t()]}
  defp get_stop_info do
    [:subway, :commuter_rail, :ferry]
    |> Task.async_stream(&DetailedStopGroup.from_mode/1)
    |> Enum.flat_map(fn {:ok, stops} -> stops end)
    |> separate_mattapan()
  end

  # Separates mattapan from stop_info list
  @spec separate_mattapan([DetailedStopGroup.t()]) ::
          {DetailedStopGroup.t(), [DetailedStopGroup.t()]}
  defp separate_mattapan(stop_info) do
    case Enum.find(stop_info, fn {route, _stops} -> route.id == "Mattapan" end) do
      nil -> {nil, stop_info}
      mattapan -> {mattapan, List.delete(stop_info, mattapan)}
    end
  end

  @spec grouped_routes([Route.t()]) :: [{Route.gtfs_route_type(), [Route.t()]}]
  defp grouped_routes(routes) do
    routes
    |> Enum.sort_by(& &1.sort_order)
    |> Enum.group_by(&Route.type_atom/1)
    |> Enum.sort_by(&Group.sorter/1)
  end

  @spec routes_map([{Route.gtfs_route_type(), [Route.t()]}], Stop.id_t(), DateTime.t()) :: [
          routes_map_t
        ]
  def routes_map(grouped_routes, stop_id, now) do
    Enum.map(grouped_routes, fn {group, routes} ->
      %{
        group_name: group,
        routes: schedules_for_routes(routes, stop_id, now)
      }
    end)
  end

  @type route_with_directions :: %{
          required(:route) => Route.t(),
          required(:directions) => [TransitNearMe.direction_data()]
        }
  @spec schedules_for_routes([Route.t()], Stop.id_t(), DateTime.t()) :: [
          route_with_directions | nil
        ]
  defp schedules_for_routes(routes, stop_id, now),
    do: Enum.map(routes, &schedules_for_route(&1, stop_id, now))

  @spec schedules_for_route(Route.t(), Stop.id_t(), DateTime.t()) :: route_with_directions | nil
  defp schedules_for_route(%Route{} = route, stop_id, now) do
    directions =
      route.id
      |> PredictedSchedule.get(stop_id, now: now)
      |> TransitNearMe.get_direction_map(now: now)
      |> filter_headsigns()

    %{
      route: route,
      directions: directions
    }
  end

  @spec filter_headsigns([TransitNearMe.direction_data()]) :: [TransitNearMe.direction_data()]
  defp filter_headsigns(directions) do
    Enum.map(directions, fn direction ->
      if any_headsign_includes_predictions?(direction) do
        %{
          direction_id: direction.direction_id,
          headsigns: Enum.filter(direction.headsigns, &includes_predictions?/1)
        }
      else
        direction
      end
    end)
  end

  @spec any_headsign_includes_predictions?(TransitNearMe.direction_data()) :: boolean
  defp any_headsign_includes_predictions?(%{headsigns: headsigns}),
    do: Enum.any?(headsigns, &includes_predictions?/1)

  defp any_headsign_includes_predictions?(_direction_with_no_headsigns), do: false

  @spec includes_predictions?(TransitNearMe.headsign_data()) :: boolean
  defp includes_predictions?(%{times: times}), do: Enum.any?(times, &(&1.prediction != nil))

  defp alerts(%{assigns: %{alerts: alerts}} = conn, _opts) do
    assign(conn, :all_alerts_count, length(alerts))
  end

  defp alerts(%{path_params: %{"id" => id}} = conn, _opts) do
    stop_id = URI.decode_www_form(id)

    alerts =
      conn.assigns.date_time
      |> AlertsRepo.all()
      |> AlertsStop.match(stop_id)

    conn
    |> assign(:alerts, alerts)
    |> assign(:all_alerts_count, length(alerts))
  end

  defp alerts(conn, _opts) do
    assign(conn, :alerts, AlertsRepo.all(conn.assigns.date_time))
  end

  @spec json_safe_alerts([Alert.t()], DateTime.t()) :: [map]
  def json_safe_alerts(alerts, date) do
    Enum.map(alerts, &JsonHelpers.stringified_alert(&1, date))
  end

  @type json_safe_routes :: %{
          required(:group_name) => atom,
          required(:routes) => map
        }
  @spec json_safe_routes([routes_map_t]) :: [json_safe_routes]
  defp json_safe_routes(routes_map) do
    Enum.map(routes_map, fn group_and_routes ->
      safe_routes = Enum.map(group_and_routes.routes, &json_safe_route_with_directions(&1))

      %{
        group_name: group_and_routes.group_name,
        routes: safe_routes
      }
    end)
  end

  @spec json_safe_route_with_directions(route_with_directions) :: map
  defp json_safe_route_with_directions(%{route: route, directions: directions}) do
    %{
      route: Route.to_json_safe(route),
      directions: directions
    }
  end

  def alerts_tab(conn, date) do
    stop = conn.assigns.stop

    %{
      all: %{
        alerts: json_safe_alerts(conn.assigns.alerts, date),
        empty_message: IO.iodata_to_binary(AlertView.no_alerts_message(stop, true, nil))
      },
      upcoming: %{
        alerts: json_safe_alerts(conn.assigns.upcoming_alerts, date),
        empty_message: IO.iodata_to_binary(AlertView.no_alerts_message(stop, true, :upcoming))
      },
      current: %{
        alerts: json_safe_alerts(conn.assigns.current_alerts, date),
        empty_message: IO.iodata_to_binary(AlertView.no_alerts_message(stop, true, :current))
      },
      initial_selected: conn.assigns.alerts_timeframe
    }
  end

  @spec breadcrumbs(Stop.t(), [Route.t()]) :: [Util.Breadcrumb.t()]
  def breadcrumbs(%Stop{name: name}, []) do
    breadcrumbs_for_station_type(nil, name)
  end

  def breadcrumbs(%Stop{station?: true, name: name}, routes) do
    routes
    |> Enum.min_by(& &1.type)
    |> Route.path_atom()
    |> breadcrumbs_for_station_type(name)
  end

  def breadcrumbs(%Stop{name: name}, _routes) do
    breadcrumbs_for_station_type(nil, name)
  end

  defp breadcrumbs_for_station_type(breadcrumb_tab, name)
       when breadcrumb_tab in ~w(subway commuter-rail ferry)a do
    [
      Breadcrumb.build("Stations", stop_path(SiteWeb.Endpoint, :show, breadcrumb_tab)),
      Breadcrumb.build(name)
    ]
  end

  defp breadcrumbs_for_station_type(_, name) do
    [Breadcrumb.build(name)]
  end

  def get_facilities(conn, %{"stop_id" => stop_id}) do
    res =
      [{"stop", stop_id}]
      |> V3Api.Facilities.filter_by()

    case res do
      {:error, _x} ->
        json(conn, res)

      _ ->
        json(conn, res.data)
    end
  end
end
