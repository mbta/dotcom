defmodule DotcomWeb.TransitNearMeController do
  use DotcomWeb, :controller

  alias Dotcom.TransitNearMe
  alias DotcomWeb.PartialView.FullscreenError
  alias DotcomWeb.TransitNearMeController.Location
  alias Leaflet.MapData
  alias Leaflet.MapData.Marker
  alias Plug.Conn
  alias Stops.Stop

  def index(conn, _params) do
    conn
    |> assign_location()
    |> assign_stops()
    |> assign_map_data()
    |> flash_if_error()
    |> case do
      :error ->
        render_500(conn)

      %Conn{} = loaded_conn ->
        render(loaded_conn, "index.html", breadcrumbs: [Breadcrumb.build("Transit Near Me")])
    end
  end

  defp assign_location(conn) do
    assign(conn, :location, Location.get(conn.params))
  end

  defp assign_stops(%{assigns: %{location: {:ok, [location | _]}}} = conn) do
    data = TransitNearMe.build(location, [])

    case data do
      {:stops, {:error, _}} -> :error
      _ -> assign(conn, :stops_json, data)
    end
  end

  defp assign_stops(conn) do
    assign(conn, :stops_json, %{stops: []})
  end

  def assign_map_data(:error) do
    :error
  end

  def assign_map_data(conn) do
    markers = Enum.map(conn.assigns.stops_json.stops, &build_stop_marker(&1))

    map_data =
      {630, 400}
      |> MapData.new(14)
      |> MapData.add_markers(markers)
      |> Map.put(:tile_server_url, Application.fetch_env!(:dotcom, :tile_server_url))
      |> add_location_marker(conn.assigns)

    assign(conn, :map_data, map_data)
  end

  def build_stop_marker(%Stop{id: id, latitude: latitude, longitude: longitude} = stop) do
    Marker.new(
      latitude,
      longitude,
      id: id,
      icon: marker_for_routes(stop.type),
      tooltip: nil
    )
  end

  def build_stop_marker(marker) do
    Marker.new(
      marker.stop.latitude,
      marker.stop.longitude,
      id: marker.stop.id,
      icon: marker_for_routes(marker.stop.type),
      tooltip: nil
    )
  end

  @doc """
  Use a stop marker for bus-only stops, station marker otherwise
  """
  @spec marker_for_routes(atom) :: String.t()
  def marker_for_routes(:station), do: "map-station-marker"
  def marker_for_routes(_), do: "map-stop-marker"

  def add_location_marker(map_data, %{location: {:ok, [%LocationService.Address{} | _]}} = assigns) do
    {:ok, [%{latitude: latitude, longitude: longitude, formatted: formatted} | _]} =
      assigns.location

    marker =
      Marker.new(
        latitude,
        longitude,
        id: "current-location",
        icon: "current-location-marker",
        tooltip: formatted,
        size: [25, 25]
      )

    MapData.add_marker(map_data, marker)
  end

  def add_location_marker(map_data, _) do
    map_data
  end

  @spec flash_if_error(Conn.t() | :error) :: Conn.t() | :error
  def flash_if_error(:error) do
    :error
  end

  def flash_if_error(%Conn{assigns: %{stops_json: %{stops: []}, location: {:ok, _}}} = conn) do
    put_flash(
      conn,
      :info,
      %FullscreenError{
        heading: "No MBTA service nearby",
        body:
          "There doesn't seem to be any stations found near the given address. Please try a different address to continue."
      }
    )
  end

  def flash_if_error(%Conn{assigns: %{location: {:error, :zero_results}}} = conn) do
    put_flash(
      conn,
      :info,
      %FullscreenError{heading: "We’re sorry", body: "We are unable to locate that address."}
    )
  end

  def flash_if_error(%Conn{assigns: %{location: {:error, _}}} = conn) do
    put_flash(
      conn,
      :info,
      %FullscreenError{
        heading: "We’re sorry",
        body: "There was an error locating that address. Please try again."
      }
    )
  end

  def flash_if_error(conn), do: conn
end
