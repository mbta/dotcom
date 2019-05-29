defmodule SiteWeb.TripPlanV1Controller do
  @moduledoc """
  Controller for trip planner
  """
  use SiteWeb, :controller
  alias GoogleMaps.{MapData, MapData.Marker}
  alias Routes.Route
  alias Site.TripPlan.{ItineraryRow, ItineraryRowList, MapV1, Query, RelatedLink}
  alias TripPlan.{Itinerary, Leg}
  alias TripPlan.NamedPosition

  plug(:require_google_maps)
  plug(:assign_initial_map)
  plug(:breadcrumbs)
  plug(:modes)
  plug(:optimize_for)
  plug(:meta_description)

  @type route_map :: %{optional(Route.id_t()) => Route.t()}
  @type route_mapper :: (Route.id_t() -> Route.t() | nil)

  def index(conn, %{"plan" => %{"to" => _to, "from" => _fr} = plan}) do
    conn
    |> assign(:expanded, conn.query_params["expanded"])
    |> render_plan(plan)
  end

  def index(conn, _params) do
    render(conn, :index)
  end

  @spec render_plan(Plug.Conn.t(), map) :: Plug.Conn.t()
  defp render_plan(conn, plan) do
    query =
      Query.from_query(
        plan,
        now: conn.assigns.date_time,
        end_of_rating: Map.get(conn.assigns, :end_of_rating, Schedules.Repo.end_of_rating())
      )

    itineraries = Query.get_itineraries(query)
    route_map = routes_for_query(itineraries)
    route_mapper = &Map.get(route_map, &1)
    itinerary_row_lists = itinerary_row_lists(itineraries, route_mapper, plan)

    conn
    |> add_initial_map_markers(query)
    |> render(
      query: query,
      plan_error: MapSet.to_list(query.errors),
      routes: Enum.map(itineraries, &routes_for_itinerary(&1, route_mapper)),
      itinerary_maps: Enum.map(itineraries, &MapV1.itinerary_map(&1, route_mapper: route_mapper)),
      related_links:
        Enum.map(itineraries, &RelatedLink.links_for_itinerary(&1, route_by_id: route_mapper)),
      itinerary_row_lists: itinerary_row_lists
    )
  end

  def require_google_maps(conn, _) do
    assign(conn, :requires_google_maps?, true)
  end

  @spec itinerary_row_lists([Itinerary.t()], route_mapper, map) :: [ItineraryRowList.t()]
  defp itinerary_row_lists(itineraries, route_mapper, plan) do
    deps = %ItineraryRow.Dependencies{route_mapper: route_mapper}
    Enum.map(itineraries, &ItineraryRowList.from_itinerary(&1, deps, to_and_from(plan)))
  end

  @spec assign_initial_map(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def assign_initial_map(conn, _opts) do
    conn
    |> assign(:initial_map_src, MapV1.initial_map_src())
    |> assign(:initial_map_data, MapV1.initial_map_data())
  end

  @doc """
  Adds markers to the initial map in the case where there was an error retrieving
  results, but at least one of the inputs resolved to an address with a lat/lng.
  """
  @spec add_initial_map_markers(Plug.Conn.t(), Query.t()) :: Plug.Conn.t()
  def add_initial_map_markers(%Plug.Conn{assigns: %{initial_map_data: map}} = conn, query) do
    map_with_markers =
      map
      |> add_initial_map_marker(query, :to)
      |> add_initial_map_marker(query, :from)

    assign(conn, :initial_map_data, map_with_markers)
  end

  @spec add_initial_map_marker(MapData.t(), Query.t(), :to | :from) :: MapData.t()
  defp add_initial_map_marker(%MapData{} = map, %Query{} = query, field)
       when field in [:to, :from] do
    query
    |> Map.get(field)
    |> do_add_initial_map_marker(map, field)
  end

  @spec do_add_initial_map_marker(
          NamedPosition.t() | {:error, atom},
          MapData.t(),
          :to | :from
        ) :: MapData.t()
  defp do_add_initial_map_marker({:error, _}, %MapData{} = map, _) do
    map
  end

  defp do_add_initial_map_marker(%NamedPosition{} = pos, %MapData{} = map, field) do
    index_map = marker_index_map(field)

    icon_name = MapV1.stop_icon_name(index_map)
    label = MapV1.stop_icon_label(index_map)

    marker =
      Marker.new(
        pos.latitude,
        pos.longitude,
        id: "marker-" <> label.text,
        icon: icon_name,
        size: MapV1.stop_icon_size(icon_name),
        label: label,
        tooltip: pos.name,
        z_index: MapV1.z_index(index_map)
      )

    MapData.add_marker(map, marker)
  end

  @spec marker_index_map(:from | :to) :: MapV1.index_map()
  defp marker_index_map(:from), do: %{start: 0, current: 0}
  defp marker_index_map(:to), do: %{current: 1, end: 1}

  @spec modes(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  def modes(%Plug.Conn{params: %{"plan" => %{"modes" => modes}}} = conn, _) do
    assign(
      conn,
      :modes,
      Map.new(modes, fn {mode, active?} -> {String.to_existing_atom(mode), active? === "true"} end)
    )
  end

  def modes(%Plug.Conn{} = conn, _) do
    assign(conn, :modes, %{})
  end

  @spec breadcrumbs(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  defp breadcrumbs(conn, _) do
    assign(conn, :breadcrumbs, [Breadcrumb.build("Trip Planner")])
  end

  @spec optimize_for(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  def optimize_for(%Plug.Conn{params: %{"plan" => %{"optimize_for" => val}}} = conn, _) do
    assign(conn, :optimize_for, val)
  end

  def optimize_for(%Plug.Conn{} = conn, _) do
    assign(conn, :optimize_for, "best_route")
  end

  @spec routes_for_query([Itinerary.t()]) :: route_map
  def routes_for_query(itineraries) do
    itineraries
    |> Enum.flat_map(&Itinerary.route_ids/1)
    |> add_additional_routes()
    |> Enum.uniq()
    |> Map.new(&{&1, get_route(&1, itineraries)})
  end

  @spec routes_for_itinerary(Itinerary.t(), route_mapper) :: [Route.t()]
  defp routes_for_itinerary(itinerary, route_mapper) do
    itinerary
    |> Itinerary.route_ids()
    |> Enum.map(route_mapper)
  end

  @spec to_and_from(map) :: [to: String.t() | nil, from: String.t() | nil]
  def to_and_from(plan) do
    [to: Map.get(plan, "to"), from: Map.get(plan, "from")]
  end

  defp add_additional_routes(ids) do
    if Enum.any?(ids, &String.starts_with?(&1, "Green")) do
      # no cover
      Enum.concat(ids, GreenLine.branch_ids())
    else
      ids
    end
  end

  defp get_route(id, itineraries) do
    case Routes.Repo.get(id) do
      %Route{} = route -> route
      nil -> get_route_from_itinerary(itineraries, id)
    end
  end

  @spec get_route_from_itinerary([Itinerary.t()], Route.id_t()) :: Route.t()
  defp get_route_from_itinerary(itineraries, id) do
    # used for non-MBTA routes that are returned by
    # OpenTripPlanner but do not exist in our repo,
    # such as Logan Express.

    %TripPlan.Itinerary{legs: legs} =
      Enum.find(itineraries, &(&1 |> Itinerary.route_ids() |> Enum.member?(id)))

    %TripPlan.Leg{
      description: description,
      mode: mode,
      long_name: long_name,
      name: name,
      type: type
    } = Enum.find(legs, &(Leg.route_id(&1) == {:ok, id}))

    %Route{
      description: description,
      id: mode.route_id,
      long_name: long_name,
      name: name,
      type: type,
      custom_route?: true
    }
  end

  defp meta_description(conn, _) do
    conn
    |> assign(
      :meta_description,
      "Plan a trip on public transit in the Greater Boston region with directions " <>
        "and suggestions based on real-time data."
    )
  end
end
