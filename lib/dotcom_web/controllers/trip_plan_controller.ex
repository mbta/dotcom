defmodule DotcomWeb.TripPlanController do
  @moduledoc """
  Controller for trip plans.
  """

  use DotcomWeb, :controller

  require Logger

  alias Dotcom.TripPlan.{ItineraryRowList, Query, RelatedLink}
  alias Dotcom.TripPlan.Map, as: TripPlanMap
  alias Routes.Route
  alias TripPlan.{Itinerary, Leg, NamedPosition, PersonalDetail, TransitDetail}

  @location_service Application.compile_env!(:dotcom, :location_service)

  @type route_map :: %{optional(Route.id_t()) => Route.t()}
  @type route_mapper :: (Route.id_t() -> Route.t() | nil)

  plug(:assign_initial_map)
  plug(:breadcrumbs)
  plug(:modes)
  plug(:wheelchair)
  plug(:meta_description)
  plug(:assign_params)

  def index(conn, %{"plan" => %{"to" => _to, "from" => _fr} = plan}) do
    conn
    |> assign(:expanded, conn.query_params["expanded"])
    |> render_plan(plan)
  end

  def index(conn, _params) do
    render(conn, :index)
  end

  def from(conn, %{"plan" => _plan} = params) do
    redirect(conn, to: trip_plan_path(conn, :index, Map.delete(params, "address")))
  end

  def from(conn, %{
        "address" => address
      }) do
    if String.match?(address, ~r/^(\-?\d+(\.\d+)?),(\-?\d+(\.\d+)?),.*$/) do
      [latitude, longitude, name] = String.split(address, ",", parts: 3)
      # Avoid extra geocode call, just use these coordinates
      destination = %TripPlan.NamedPosition{
        latitude: String.to_float(latitude),
        longitude: String.to_float(longitude),
        name: name,
        stop: nil
      }

      do_from(conn, destination)
    else
      updated_address = check_address(address)

      case @location_service.geocode(updated_address) do
        {:ok, [geocoded_from | _]} ->
          do_from(conn, NamedPosition.new(geocoded_from))

        _ ->
          # redirect to the initial index page
          redirect(conn, to: trip_plan_path(conn, :index))
      end
    end
  end

  defp do_from(conn, destination) do
    # build a default query with a pre-filled 'from' field:
    query = %Query{
      from: destination,
      to: {:error, :unknown},
      time: {:error, :unknown}
    }

    now = Util.now()

    # build map information for a single leg with the 'from' field:
    map_data =
      TripPlanMap.itinerary_map([
        %Leg{
          from: destination,
          to: nil,
          mode: %PersonalDetail{},
          start: now,
          stop: now
        }
      ])

    %{markers: [marker]} = map_data
    from_marker = %{marker | id: "B"}
    map_info_for_from_destination = %{map_data | markers: [from_marker]}

    conn
    |> assign(:query, query)
    |> assign(:map_data, map_info_for_from_destination)
    |> render(:index)
  end

  def to(conn, %{"plan" => _plan} = params) do
    redirect(conn, to: trip_plan_path(conn, :index, Map.delete(params, "address")))
  end

  def to(conn, %{
        "address" => address
      }) do
    if String.match?(address, ~r/^(\-?\d+(\.\d+)?),(\-?\d+(\.\d+)?),.*$/) do
      [latitude, longitude, name] = String.split(address, ",", parts: 3)
      # Avoid extra geocode call, just use these coordinates
      destination = %TripPlan.NamedPosition{
        latitude: String.to_float(latitude),
        longitude: String.to_float(longitude),
        name: name,
        stop: nil
      }

      do_to(conn, destination)
    else
      updated_address = check_address(address)

      case @location_service.geocode(updated_address) do
        {:ok, [geocoded_to | _]} ->
          do_to(conn, NamedPosition.new(geocoded_to))

        _ ->
          # redirect to the initial index page
          redirect(conn, to: trip_plan_path(conn, :index))
      end
    end
  end

  defp do_to(conn, destination) do
    # build a default query with a pre-filled 'to' field:
    query = %Query{
      to: destination,
      time: {:error, :unknown},
      from: {:error, :unknown}
    }

    now = Util.now()

    # build map information for a single leg with the 'to' field:
    map_data =
      TripPlanMap.itinerary_map([
        %Leg{
          from: nil,
          to: destination,
          mode: %PersonalDetail{},
          start: now,
          stop: now
        }
      ])

    %{markers: [marker]} = map_data
    to_marker = %{marker | id: "B"}
    map_info_for_to_destination = %{map_data | markers: [to_marker]}

    conn
    |> assign(:query, query)
    |> assign(:map_data, map_info_for_to_destination)
    |> render(:index)
  end

  defp assign_params(conn, _) do
    conn
    |> assign(:chosen_date_time, conn.params["plan"]["date_time"])
    |> assign(:chosen_time, conn.params["plan"]["time"])
  end

  @spec check_address(String.t()) :: String.t()
  defp check_address(address) do
    # address can be a String containing "lat,lon" so we check for that case

    [lat, lon] =
      case String.split(address, ",", parts: 2) do
        [lat, lon] -> [lat, lon]
        _ -> ["error", "error"]
      end

    if Float.parse(lat) == :error || Float.parse(lon) == :error do
      address
    else
      {parsed_lat, _} = Float.parse(lat)
      {parsed_lon, _} = Float.parse(lon)

      case @location_service.reverse_geocode(parsed_lat, parsed_lon) do
        {:ok, [first | _]} ->
          first.formatted

        _ ->
          "#{lat}, #{lon}"
      end
    end
  end

  defp get_route(link) do
    if is_bitstring(link.text) do
      link.text
    else
      link.text |> List.to_string()
    end
  end

  defp filter_duplicate_links(related_links) do
    Enum.map(related_links, fn x -> Enum.uniq_by(x, fn y -> get_route(y) end) end)
  end

  @spec render_plan(Plug.Conn.t(), map) :: Plug.Conn.t()
  defp render_plan(conn, plan_params) do
    query =
      Query.from_query(
        plan_params,
        now: conn.assigns.date_time,
        end_of_rating: Map.get(conn.assigns, :end_of_rating, Schedules.Repo.end_of_rating())
      )

    itineraries =
      query
      |> Query.get_itineraries()

    itinerary_row_lists = itinerary_row_lists(itineraries, plan_params)

    conn
    |> render(
      query: query,
      itineraries: itineraries,
      plan_error: MapSet.to_list(query.errors),
      routes: Enum.map(itineraries, &routes_for_itinerary(&1)),
      itinerary_maps: Enum.map(itineraries, &TripPlanMap.itinerary_map(&1)),
      related_links:
        filter_duplicate_links(Enum.map(itineraries, &RelatedLink.links_for_itinerary(&1))),
      itinerary_row_lists: itinerary_row_lists
    )
  end

  @spec itinerary_row_lists([Itinerary.t()], map) :: [ItineraryRowList.t()]
  defp itinerary_row_lists(itineraries, plan) do
    Enum.map(itineraries, &ItineraryRowList.from_itinerary(&1, to_and_from(plan)))
  end

  @spec assign_initial_map(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def assign_initial_map(conn, _opts) do
    conn
    |> assign(:map_data, TripPlanMap.initial_map_data())
  end

  @spec modes(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  def modes(%Plug.Conn{params: %{"plan" => %{"modes" => modes}}} = conn, _) do
    assign(
      conn,
      :modes,
      Map.new(modes, fn {mode, active?} -> {String.to_existing_atom(mode), active? === "true"} end)
    )
  end

  def modes(%Plug.Conn{} = conn, _) do
    assign(
      conn,
      :modes,
      %{subway: true, bus: true, commuter_rail: true, ferry: true}
    )
  end

  @spec breadcrumbs(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  defp breadcrumbs(conn, _) do
    assign(conn, :breadcrumbs, [Breadcrumb.build("Trip Planner")])
  end

  @spec wheelchair(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  def wheelchair(%Plug.Conn{params: %{"plan" => plan_params}} = conn, _) do
    assign(conn, :wheelchair, get_in(plan_params, ["wheelchair"]) === "true")
  end

  # Initialize to checked state for trip plan accessibility
  def wheelchair(%Plug.Conn{} = conn, _) do
    assign(conn, :wheelchair, true)
  end

  @spec routes_for_itinerary(Itinerary.t()) :: [Route.t()]
  defp routes_for_itinerary(itinerary) do
    itinerary.legs
    |> Enum.filter(&match?(%TransitDetail{}, &1.mode))
    |> Enum.map(& &1.mode.route)
  end

  @spec to_and_from(map) :: [to: String.t() | nil, from: String.t() | nil]
  def to_and_from(plan) do
    [to: Map.get(plan, "to"), from: Map.get(plan, "from")]
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
