defmodule DotcomWeb.StopController do
  @moduledoc """
  Page for display of information about in individual stop or station.
  """

  use DotcomWeb, :controller

  alias Alerts.Repo, as: AlertsRepo
  alias Alerts.Stop, as: AlertsStop
  alias Dotcom.TransitNearMe
  alias Leaflet.MapData.Polyline
  alias Plug.Conn
  alias RoutePatterns.RoutePattern
  alias Routes.{Group, Route}
  alias Services.Service
  alias Stops.Stop
  alias Util.AndOr

  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @type routes_map_t :: %{
          group_name: atom,
          routes: [route_with_directions]
        }

  plug(:alerts)
  plug(DotcomWeb.Plugs.AlertsByTimeframe)

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
    |> assign(:mattapan, mattapan)
    |> assign(:mode, mode_atom)
    |> assign(:breadcrumbs, [Breadcrumb.build("Stations")])
    |> await_assign_all_default(__MODULE__)
    |> render("index.html")
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => stop_id}) do
    stop =
      stop_id
      |> URI.decode_www_form()
      |> @stops_repo.get()

    if stop do
      if @stops_repo.has_parent?(stop) do
        conn
        |> redirect(to: stop_path(conn, :show, @stops_repo.get_parent(stop)))
        |> halt()
      else
        routes_by_stop = @routes_repo.by_stop(stop_id, include: "stop.connecting_stops")
        accessible? = accessible?(stop)

        conn
        |> assign(:breadcrumbs, breadcrumbs(stop, routes_by_stop))
        |> meta_description(stop, routes_by_stop)
        |> render("show.html", %{
          stop: stop,
          routes_by_stop: routes_by_stop,
          accessible?: accessible?
        })
      end
    else
      check_cms_or_404(conn)
    end
  end

  @spec get(Conn.t(), map) :: Conn.t()
  def get(conn, %{"id" => stop_id}) do
    json(conn, @stops_repo.get(stop_id))
  end

  @spec grouped_route_patterns(Conn.t(), map) :: Conn.t()
  def grouped_route_patterns(conn, %{"id" => stop_id}) do
    json(conn, route_patterns_by_route_and_headsign(stop_id))
  end

  @type headsign_info :: %{
          required(:direction_id) => 0 | 1,
          required(:route_patterns) => [RoutePattern.t()]
        }
  @type by_route_and_headsign :: %{Route.id_t() => %{String.t() => headsign_info}}
  @spec route_patterns_by_route_and_headsign(Stop.id_t()) :: by_route_and_headsign()
  defp route_patterns_by_route_and_headsign(stop_id) do
    stop_id
    |> @route_patterns_repo.by_stop_id()
    |> Stream.reject(&ends_at?(&1, stop_id))
    |> Stream.reject(&exclusively_drop_offs?(&1, stop_id))
    |> Enum.group_by(& &1.route_id)
    |> Enum.map(&with_headsign_groups/1)
    |> Map.new()
  end

  defp with_headsign_groups({route_id, route_patterns}),
    do: {route_id, with_headsign_groups(route_patterns)}

  defp with_headsign_groups(route_patterns) do
    route_patterns
    |> Enum.group_by(& &1.headsign)
    |> Enum.map(&with_annotation/1)
    |> Map.new()
  end

  defp with_annotation({headsign, route_patterns}),
    do: {headsign, with_annotation(route_patterns)}

  @spec with_annotation([RoutePattern.t()]) :: headsign_info
  defp with_annotation(headsign_route_patterns) do
    [%RoutePattern{direction_id: direction_id} | _] = headsign_route_patterns

    %{
      direction_id: direction_id,
      route_patterns:
        headsign_route_patterns
        |> Enum.reject(&not_serving_today?/1)
        |> Enum.map(&add_polyline/1)
    }
  end

  @spec not_serving_today?(RoutePattern.t()) :: boolean()
  # Canonical route patterns don't serve any date! Just ignore in this case
  defp not_serving_today?(%RoutePattern{typicality: :canonical}), do: false

  defp not_serving_today?(%RoutePattern{route_id: route_id})
       when is_binary(route_id) do
    case Services.Repo.by_route_id(route_id) do
      [%Service{} | _] = services ->
        services
        |> Enum.reject(&(&1.id === "canonical"))
        |> Enum.filter(&Service.serves_date?(&1, Timex.today()))
        |> Enum.empty?()

      _ ->
        false
    end
  end

  defp not_serving_today?(_), do: false

  defp ends_at?(%RoutePattern{stop_ids: stop_ids}, stop_id) when is_list(stop_ids) do
    with last_stop_id <- List.last(stop_ids),
         %Stop{child_ids: child_ids} <- @stops_repo.get(stop_id) do
      last_stop_id == stop_id || last_stop_id in child_ids
    else
      _ ->
        false
    end
  end

  defp ends_at?(_route_pattern, _stop_id), do: false

  defp exclusively_drop_offs?(
         %RoutePattern{route_id: route_id, direction_id: direction_id},
         stop_id
       ) do
    case Schedules.Repo.by_route_ids([route_id], direction_id: direction_id, stop_ids: stop_id) do
      [%Schedules.Schedule{} | _] = schedules ->
        # pickup_type=1 indicates that the schedule has no pickup available
        Enum.all?(schedules, &(&1.pickup_type == 1))

      _ ->
        false
    end
  end

  defp add_polyline(%RoutePattern{representative_trip_polyline: nil} = route_pattern),
    do: route_pattern

  defp add_polyline(%RoutePattern{route_id: route_id} = route_pattern) do
    route = @routes_repo.get(route_id)
    polyline = Polyline.new(route_pattern, color: "#" <> route.color, weight: 4)
    Map.put(route_pattern, :representative_trip_polyline, polyline)
  end

  @spec api(Conn.t(), map) :: Conn.t()
  def api(conn, %{"id" => stop_id}) do
    routes_by_stop = @routes_repo.by_stop(stop_id)
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
      Breadcrumb.build("Stations", stop_path(DotcomWeb.Endpoint, :show, breadcrumb_tab)),
      Breadcrumb.build(name)
    ]
  end

  defp breadcrumbs_for_station_type(_, name) do
    [Breadcrumb.build(name)]
  end

  @spec meta_description(Conn.t(), Stop.t(), [Route.t()]) :: Conn.t()
  defp meta_description(conn, stop, routes),
    do:
      assign(
        conn,
        :meta_description,
        "Station serving MBTA #{lines(routes)} lines#{location(stop)}."
      )

  @spec lines([Route.t()]) :: iolist
  defp lines(routes) do
    routes
    |> Enum.map(&(&1.type |> Route.type_atom() |> Route.type_name()))
    |> Enum.uniq()
    |> AndOr.join(:and)
  end

  @spec location(Stop.t()) :: String.t()
  defp location(stop) do
    if stop.address && stop.address != "" do
      " at #{stop.address}"
    else
      ""
    end
  end

  # A stop is accessible if it is labeled as accessible in GTFS or it doesn't have a parent stop and it serves a bus route.
  defp accessible?(stop) do
    routes = @routes_repo.by_stop(stop.id)

    Enum.member?(stop.accessibility, "accessible") ||
      (is_nil(stop.parent_id) && Enum.any?(routes, &(&1.type === 3)))
  end
end
