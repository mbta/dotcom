defmodule SiteWeb.StopController do
  @moduledoc """
  Page for display of information about in individual stop or station.
  """
  use SiteWeb, :controller
  alias Alerts.Alert
  alias Alerts.Match
  alias Alerts.Repo, as: AlertsRepo
  alias Alerts.Stop, as: AlertsStop
  alias Plug.Conn
  alias Fares.{RetailLocations, RetailLocations.Location}
  alias Leaflet.MapData.Polyline
  alias Site.JsonHelpers
  alias Routes.{Group, Route}
  alias RoutePatterns.RoutePattern
  alias Services.Service
  alias Site.TransitNearMe
  alias SiteWeb.AlertView
  alias SiteWeb.PartialView.HeaderTab
  alias SiteWeb.StopController.{CuratedStreetView, StopMap}
  alias SiteWeb.StopView.Parking
  alias SiteWeb.ViewHelpers
  alias SiteWeb.Views.Helpers.AlertHelpers
  alias Stops.{Nearby, Repo, Stop}
  alias Util.AndOr

  plug(:alerts)
  plug(SiteWeb.Plugs.AlertsByTimeframe)

  @distance_tenth_of_a_mile 0.002
  @nearby_stop_limit 3

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
  def show(conn, %{"id" => stop_id} = params) do
    if !Laboratory.enabled?(conn, :old_stops_redesign) do
      # TODO: Render relevant template with relevant data!
      # SHOULD return a Plug.Conn, via a template. See:
      # https://hexdocs.pm/phoenix/Phoenix.Controller.html#render/2
      # https://hexdocs.pm/phoenix/Phoenix.Controller.html#render/3

      stop =
        stop_id
        |> URI.decode_www_form()
        |> Repo.get()

      if stop do
        if Repo.has_parent?(stop) do
          conn
          |> redirect(to: stop_path(conn, :show, Repo.get_parent(stop)))
          |> halt()
        else
          routes_by_stop = Routes.Repo.by_stop(stop_id, include: "stop.connecting_stops")

          conn
          |> assign(:breadcrumbs, breadcrumbs(stop, routes_by_stop))
          |> meta_description(stop, routes_by_stop)
          |> render("show-redesign.html", %{
            stop_id: stop_id,
            routes_by_stop: routes_by_stop
          })
        end
      else
        check_cms_or_404(conn)
      end
    else
      # no cover
      show_old(conn, params)
    end
  end

  @spec show_old(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show_old(%Plug.Conn{query_params: query_params} = conn, %{"id" => stop}) do
    stop =
      stop
      |> URI.decode_www_form()
      |> Repo.get()

    if stop do
      if Repo.has_parent?(stop) do
        conn
        |> redirect(to: stop_path(conn, :show, Repo.get_parent(stop)))
        |> halt()
      else
        routes_by_stop = Routes.Repo.by_stop(stop.id)
        grouped_routes = grouped_routes(routes_by_stop)
        routes_map = routes_map(grouped_routes, stop.id, conn.assigns.date_time)
        json_safe_routes = json_safe_routes(routes_map)

        {:ok, routes_with_direction} =
          Nearby.merge_routes(stop.id, &Routes.Repo.by_stop_and_direction/2)

        json_safe_route_with_direction =
          routes_with_direction
          |> Enum.sort_by(fn %{route: route} ->
            {Group.sorter({Route.type_atom(route), nil}), route.sort_order}
          end)
          |> Enum.map(&%{route: Route.to_json_safe(&1.route), direction_id: &1.direction_id})

        all_alerts =
          routes_by_stop
          |> Enum.map(& &1.id)
          |> Alerts.Repo.by_route_ids(conn.assigns.date_time)

        routes_and_alerts =
          routes_by_stop
          |> Map.new(fn route ->
            entity = %Alerts.InformedEntity{route_type: route.type, route: route.id}

            alerts =
              all_alerts
              |> Enum.filter(&(Match.match([&1], entity) == [&1]))
              |> Enum.filter(&Match.any_time_match?(&1, conn.assigns.date_time))
              |> json_safe_alerts(conn.assigns.date_time)

            {route.id, alerts}
          end)

        conn
        |> assign(:disable_turbolinks, true)
        |> alerts(stop)
        |> assign(:stop, stop)
        |> assign(:routes, json_safe_routes)
        |> assign(:routes_with_direction, json_safe_route_with_direction)
        |> assign(:routes_and_alerts, routes_and_alerts)
        |> assign(:zone_number, stop.zone)
        |> assign(:breadcrumbs, breadcrumbs(stop, routes_by_stop))
        |> assign(:tab, tab_value(query_params["tab"]))
        |> async_assign_default(
          :retail_locations,
          fn ->
            stop
            |> RetailLocations.get_nearby()
            |> Enum.map(&format_retail_location/1)
          end,
          []
        )
        |> async_assign_default(
          :suggested_transfers,
          fn ->
            nearby_stops(stop)
          end,
          []
        )
        |> assign(:map_data, StopMap.map_info(stop, routes_map))
        |> assign_stop_page_data()
        |> await_assign_all_default(__MODULE__)
        |> combine_stop_data()
        |> meta_description(stop, routes_by_stop)
        |> render("show.html")
      end
    else
      check_cms_or_404(conn)
    end
  end

  @spec tab_value(String.t() | nil) :: String.t()
  defp tab_value("alerts"), do: "alerts"
  defp tab_value(_), do: "info"

  @spec get(Conn.t(), map) :: Conn.t()
  def get(conn, %{"id" => stop_id}) do
    json(conn, Repo.get(stop_id))
  end

  @spec grouped_route_patterns(Conn.t(), map) :: Conn.t()
  def grouped_route_patterns(conn, %{"id" => stop_id}) do
    json(conn, route_patterns_by_route_and_headsign(stop_id))
  end

  @type by_route_and_headsign :: %{Route.id_t() => %{String.t() => [RoutePattern.t()]}}
  @spec route_patterns_by_route_and_headsign(Stop.id_t()) :: by_route_and_headsign()
  defp route_patterns_by_route_and_headsign(stop_id) do
    stop_id
    |> RoutePatterns.Repo.by_stop_id()
    |> Enum.reject(&not_serving_today?/1)
    |> Enum.reject(&ends_at?(&1, stop_id))
    |> Enum.map(&add_polyline/1)
    |> Enum.group_by(& &1.route_id)
    |> Enum.map(fn {k, v} -> {k, Enum.group_by(v, & &1.headsign)} end)
    |> Map.new()
  end

  @spec not_serving_today?(RoutePattern.t()) :: boolean()
  # Canonical route patterns don't serve any date! Just ignore in this case
  defp not_serving_today?(%RoutePattern{typicality: :canonical}), do: false

  defp not_serving_today?(%RoutePattern{route_id: route_id})
       when is_binary(route_id) do
    case Services.Repo.by_route_id(route_id) do
      [%Service{} | _] = services ->
        services
        |> Enum.filter(&Service.serves_date?(&1, Timex.today()))
        |> Enum.empty?()

      _ ->
        false
    end
  end

  defp not_serving_today?(_), do: false

  defp ends_at?(%RoutePattern{stop_ids: stop_ids}, stop_id) when is_list(stop_ids) do
    with last_stop_id <- List.last(stop_ids),
         %Stop{child_ids: child_ids} <- Stops.Repo.get(stop_id) do
      last_stop_id == stop_id || last_stop_id in child_ids
    else
      _ ->
        false
    end
  end

  defp ends_at?(_route_pattern, _stop_id), do: false

  defp add_polyline(%RoutePattern{representative_trip_polyline: nil} = route_pattern),
    do: route_pattern

  defp add_polyline(%RoutePattern{route_id: route_id} = route_pattern) do
    route = Routes.Repo.get(route_id)
    polyline = Polyline.new(route_pattern, color: "#" <> route.color, weight: 4)
    Map.put(route_pattern, :representative_trip_polyline, polyline)
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

  @spec nearby_stops(Stop.t()) :: [
          %{
            stop: Stop.t(),
            distance: float,
            routes_with_direction: [Nearby.route_with_direction()]
          }
        ]
  defp nearby_stops(%{latitude: latitude, longitude: longitude}) do
    %{latitude: latitude, longitude: longitude}
    |> Nearby.nearby_with_routes(@distance_tenth_of_a_mile, limit: @nearby_stop_limit)
    |> Enum.map(fn %{routes_with_direction: routes_with_direction} = nearby_stops ->
      %{
        nearby_stops
        | routes_with_direction:
            routes_with_direction
            |> Enum.sort_by(& &1.route.sort_order)
            |> Enum.map(fn %{route: route} = route_with_direction ->
              %{route_with_direction | route: JsonHelpers.stringified_route(route)}
            end)
      }
    end)
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

  @spec assign_stop_page_data(Conn.t()) :: Conn.t()
  defp assign_stop_page_data(
         %{
           assigns: %{
             stop: stop,
             routes: routes,
             routes_with_direction: routes_with_direction,
             routes_and_alerts: routes_and_alerts,
             alerts: alerts,
             all_alerts_count: all_alerts_count,
             zone_number: zone_number,
             tab: tab,
             date: date
           }
         } = conn
       ) do
    assign(conn, :stop_page_data, %{
      stop: %{stop | parking_lots: Enum.map(stop.parking_lots, &Parking.parking_lot(&1))},
      street_view_url: CuratedStreetView.url(stop.id),
      routes: routes,
      routes_with_direction: routes_with_direction,
      routes_and_alerts: routes_and_alerts,
      tabs: [
        %HeaderTab{
          id: "info",
          name: "Station Info",
          href: stop_path(conn, :show, stop.id)
        },
        %HeaderTab{
          id: "alerts",
          name: "Alerts",
          class: "header-tab--alert",
          href: stop_path(conn, :show, stop.id, tab: "alerts"),
          badge: AlertHelpers.alert_badge(all_alerts_count)
        }
      ],
      tab: tab,
      alerts_tab: alerts_tab(conn, date),
      zone_number: zone_number,
      alerts: json_safe_alerts(alerts, date)
    })
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

  @spec format_retail_location({Location.t(), float}) :: %{
          distance: String.t(),
          location: Location.t()
        }
  defp format_retail_location({%Location{} = location, distance}) do
    %{
      distance: ViewHelpers.round_distance(distance),
      location: location
    }
  end

  defp combine_stop_data(conn) do
    merged_stop_data =
      conn.assigns.stop_page_data
      |> Map.put(:retail_locations, conn.assigns.retail_locations)
      |> Map.put(:suggested_transfers, conn.assigns.suggested_transfers)

    assigns =
      conn.assigns
      |> Map.put(:stop_page_data, merged_stop_data)
      |> Map.delete(:retail_locations)

    %{conn | assigns: assigns}
  end
end
