defmodule SiteWeb.TransitNearMeController do
  use SiteWeb, :controller
  alias Alerts.Repo
  alias GoogleMaps.Geocode
  alias Leaflet.{MapData, MapData.Marker}
  alias Plug.Conn
  alias Site.TransitNearMe
  alias SiteWeb.PartialView.{FullscreenError}
  alias Stops.Stop

  alias SiteWeb.TransitNearMeController.{
    Location,
    StopsWithRoutes
  }

  def index(conn, _params) do
    conn
    |> assign(:requires_google_maps?, true)
    |> assign(:disable_turbolinks, true)
    |> assign_location()
    |> assign_stops_and_routes()
    |> assign_map_data()
    |> flash_if_error()
    |> case do
      :error ->
        conn
        |> put_status(:internal_server_error)
        |> put_view(SiteWeb.ErrorView)
        |> render("500.html", [])

      %Conn{} = loaded_conn ->
        render(loaded_conn, "index.html", breadcrumbs: [Breadcrumb.build("Transit Near Me")])
    end
  end

  def api(conn, _) do
    conn
    |> assign_location()
    |> assign_stops_and_routes()
    |> case do
      :error ->
        conn
        |> put_status(:internal_server_error)
        |> json(%{error: :timeout})

      %Conn{assigns: %{routes_json: routes}} ->
        json(conn, routes)
    end
  end

  defp assign_location(conn) do
    location_fn = Map.get(conn.assigns, :location_fn, &Location.get/2)

    location = location_fn.(conn.params, [])

    assign(conn, :location, location)
  end

  defp assign_stops_and_routes(%{assigns: %{location: {:ok, [location | _]}}} = conn) do
    data_fn = Map.get(conn.assigns, :data_fn, &TransitNearMe.build/2)

    # only concerned with high priority alerts
    alerts = Repo.by_priority(conn.assigns.date_time, :high)

    data = data_fn.(location, date: conn.assigns.date, now: conn.assigns.date_time)

    do_assign_stops_and_routes(conn, data, alerts)
  end

  defp assign_stops_and_routes(conn), do: do_assign_stops_and_routes(conn, {:stops, []}, nil)

  defp do_assign_stops_and_routes(%Conn{}, {_, {:error, _}}, _alerts) do
    :error
  end

  defp do_assign_stops_and_routes(conn, {:stops, []}, _alerts) do
    conn
    |> assign(:stops_json, [])
    |> assign(:routes_json, [])
  end

  defp do_assign_stops_and_routes(conn, %TransitNearMe{} = data, alerts) do
    to_json_fn = Map.get(conn.assigns, :to_json_fn, &TransitNearMe.schedules_for_routes/3)

    conn
    |> assign(:stops_json, StopsWithRoutes.stops_with_routes(data))
    |> assign(:routes_json, to_json_fn.(data, alerts, now: conn.assigns.date_time))
  end

  def assign_map_data(:error) do
    :error
  end

  def assign_map_data(conn) do
    markers =
      conn.assigns.stops_json
      |> Enum.map(&build_stop_marker(&1))

    map_data =
      {630, 400}
      |> MapData.new(14)
      |> MapData.add_markers(markers)
      |> Map.put(:tile_server_url, Application.fetch_env!(:site, :tile_server_url))
      |> add_location_marker(conn.assigns)

    assign(conn, :map_data, map_data)
  end

  def build_stop_marker(
        %{stop: %{stop: %Stop{id: id, latitude: latitude, longitude: longitude}}} = marker
      ) do
    Marker.new(
      latitude,
      longitude,
      id: id,
      icon: marker_for_routes(marker.routes),
      tooltip: nil
    )
  end

  def build_stop_marker(marker) do
    Marker.new(
      marker.stop.latitude,
      marker.stop.longitude,
      id: marker.stop.id,
      icon: marker_for_routes(marker.routes),
      tooltip: nil
    )
  end

  @doc """
  Use a stop marker for bus-only stops, station marker otherwise
  """
  @spec marker_for_routes([map]) :: String.t() | nil
  def marker_for_routes([]) do
    "map-stop-marker"
  end

  def marker_for_routes(routes) do
    if List.first(routes).group_name == :bus do
      "map-stop-marker"
    else
      "map-station-marker"
    end
  end

  def add_location_marker(map_data, %{location: {:ok, [%Geocode.Address{} | _]}} = assigns) do
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

  def flash_if_error(%Conn{assigns: %{stops_json: [], location: {:ok, _}}} = conn) do
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
