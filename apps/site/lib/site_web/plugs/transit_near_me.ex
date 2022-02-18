defmodule SiteWeb.Plugs.TransitNearMe do
  @moduledoc """
  Plug for the TransitNearMe page.
  """
  @behaviour Plug
  import Plug.Conn
  import Phoenix.Controller, only: [put_flash: 3]
  alias GoogleMaps.Geocode
  alias Plug.Conn
  alias Routes.{Group, Repo, Route}
  alias Stops.{Nearby, Stop}

  defmodule Options do
    @moduledoc """
    Struct for the TransitNearMe plug.
    """
    defstruct geocode_fn: &LocatonService.Geocode.geocode/1,
              reverse_geocode_fn: &LocationService.ReverseGeocode.reverse_geocode/2,
              nearby_fn: &Nearby.nearby_with_varying_radius_by_mode/1,
              routes_by_stop_fn: &Repo.by_stop/1
  end

  @impl true
  def init(opts) do
    Options
    |> struct!(opts)
    |> Map.from_struct()
  end

  @impl true
  def call(%{assigns: %{stops_with_routes: stops_with_routes}} = conn, _options)
      when is_list(stops_with_routes) do
    conn
    |> flash_if_error()
  end

  # Used when latitude and longitude are given, bypasses the geocoding call
  def call(%{params: %{"latitude" => latitude, "longitude" => longitude}} = conn, options) do
    location =
      {:ok,
       [
         %LocationService.Address{
           latitude: String.to_float(latitude),
           longitude: String.to_float(longitude),
           formatted: Geocode.formatted_address(conn.params, options)
         }
       ]}

    stops_with_routes = calculate_stops_with_routes(location, options)
    do_call(conn, stops_with_routes, location)
  end

  def call(%{params: %{"location" => %{"address" => address}}} = conn, options) do
    location = options.geocode_fn.(address)

    stops_with_routes = calculate_stops_with_routes(location, options)

    do_call(conn, stops_with_routes, location)
  end

  def call(conn, _options) do
    do_call(conn, [], "")
  end

  defp do_call(conn, stops_with_routes, location) do
    conn
    |> assign(:stops_with_routes, stops_with_routes)
    |> assign_address(location)
    |> assign(:requires_location_service?, true)
    |> flash_if_error()
  end

  @doc """
    Retrieves stops close to a location and parses into the correct configuration
  """
  @spec get_stops_nearby(Geocode.t(), Conn.t()) :: [Stop.t()]
  def get_stops_nearby({:ok, [location | _]}, nearby_fn) do
    nearby_fn.(location)
  end

  def get_stops_nearby({:error, _error_code}, _nearby_fn) do
    []
  end

  @spec stops_with_routes([Stop.t()], Geocode.t(), (String.t() -> [Route.t()])) :: [
          %{stop: Stop.t(), distance: String.t(), routes: [Group.t()]}
        ]
  def stops_with_routes(stops, {:ok, [location | _]}, routes_by_stop_fn) do
    stops
    |> Task.async_stream(fn stop ->
      %{
        stop: stop,
        distance: Util.Distance.haversine(stop, location),
        routes: stop.id |> routes_by_stop_fn.() |> get_route_groups
      }
    end)
    |> Enum.map(fn {:ok, map} -> map end)
  end

  def stops_with_routes([], {:error, _}, _), do: []

  defp calculate_stops_with_routes(location, options) do
    location
    |> get_stops_nearby(options.nearby_fn)
    |> stops_with_routes(location, options.routes_by_stop_fn)
  end

  @spec get_route_groups([Route.t()]) :: [Group.t()]
  def get_route_groups(route_list) do
    route_list
    |> Enum.group_by(&Route.type_atom/1)
    |> Keyword.new()
    |> separate_subway_lines
    |> Keyword.delete(:subway)
  end

  @doc """
    Returns the grouped routes list with subway lines elevated to the top level, eg:

      separate_subway_lines([commuter: [_], bus: [_], subway: [orange_line, red_line])
      # =>   [commuter: [commuter_lines], bus: [bus_lines], orange: [orange_line], red: [red_line]]

  """
  @spec separate_subway_lines([Group.t()]) :: [
          {Route.gtfs_route_type() | Route.subway_lines_type(), [Route.t()]}
        ]
  def separate_subway_lines(routes) do
    routes
    |> Keyword.get(:subway, [])
    |> Enum.reduce(routes, &subway_reducer/2)
  end

  @spec subway_reducer(Route.t(), [Group.t()]) :: [
          {Route.subway_lines_type(), [Route.t()]}
        ]
  defp subway_reducer(%Route{id: id, type: 1} = route, routes) do
    Keyword.put(routes, id |> Kernel.<>("_line") |> String.downcase() |> String.to_atom(), [route])
  end

  defp subway_reducer(%Route{name: "Green" <> _} = route, routes) do
    Keyword.put(routes, :green_line, [Route.to_naive(route)])
  end

  defp subway_reducer(%Route{id: "Mattapan"} = route, routes) do
    Keyword.put(routes, :mattapan_trolley, [route])
  end

  @spec address(GoogleMaps.Geocode.t()) :: String.t()
  def address({:ok, [%{formatted: address} | _]}) do
    address
  end

  def address(_), do: ""

  def assign_address(conn, {:ok, [%{} = location | _]}) do
    conn
    |> assign(:tnm_address, location.formatted)
    |> assign(:location, location)
  end

  def assign_address(conn, {:error, _reason}) do
    conn
    |> assign(:tnm_address, "")
    |> assign(
      :tnm_address_error,
      "The address you've listed appears to be invalid. Please try a new address to continue."
    )
  end

  def assign_address(conn, _) do
    conn
    |> assign(:tnm_address, "")
    |> assign(:location, nil)
  end

  @spec flash_if_error(Conn.t()) :: Conn.t()
  def flash_if_error(%Plug.Conn{assigns: %{stops_with_routes: [], tnm_address: address}} = conn)
      when address != "" do
    put_flash(
      conn,
      :info,
      "There doesn't seem to be any stations found near the given address. Please try a different address to continue."
    )
  end

  def flash_if_error(%Plug.Conn{assigns: %{tnm_address_error: error}} = conn) when error != nil do
    put_flash(conn, :info, error)
  end

  def flash_if_error(conn), do: conn
end
