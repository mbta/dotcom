defmodule SiteWeb.ScheduleController.Line.Maps do
  @moduledoc """
  Handles Map information for the line controller
  """
  require Logger

  alias GoogleMaps.MapData, as: GoogleMapData
  alias GoogleMapData.Marker, as: GoogleMarker
  alias GoogleMapData.Path
  alias Leaflet.{MapData, MapData.Marker, MapData.Polyline}
  alias Stops.{RouteStops, RouteStop, Repo, Stop}
  alias RoutePatterns.RoutePattern
  alias Routes.{Route, Shape}
  alias Site.MapHelpers
  alias Site.MapHelpers.Markers

  @doc """
  Returns a tuple {String.t, MapData.t} where the first element
  is the url for the static map, and the second element is the MapData
  struct used to build the dynamic map
  """
  @spec map_data(
          Route.t(),
          [Stops.Stop.t()],
          [Shape.t()],
          [RoutePattern.t()],
          VehicleHelpers.tooltip_index() | [] | nil
        ) :: {String.t(), MapData.t()}
  def map_data(route, [], [], route_patterns, []) do
    dynamic_data = dynamic_map_data(route.color, route_patterns, nil)
    {nil, dynamic_data}
  end

  def map_data(
        route,
        static_map_stops,
        static_map_polylines,
        route_patterns,
        vehicle_tooltips
      ) do
    static_data =
      map_img_src(
        static_map_stops,
        Enum.flat_map(static_map_polylines, &PolylineHelpers.condense([&1.polyline])),
        route
      )

    dynamic_data = dynamic_map_data(route.color, route_patterns, vehicle_tooltips)
    {static_data, dynamic_data}
  end

  @doc "Returns the stops that should be displayed on the map"
  @spec map_stops([RouteStops.t()]) :: [Stops.Stop.t()]
  def map_stops(branches) do
    branches
    |> Enum.flat_map(& &1.stops)
    |> Enum.uniq_by(& &1.id)
  end

  @spec map_img_src(any, [Shape.t()], Route.t()) :: String.t()
  defp map_img_src(_, _, %Route{type: 4}) do
    MapHelpers.image(:ferry)
  end

  defp map_img_src(route_stops, polylines, %{color: route_color} = _route) do
    markers = Enum.map(route_stops, &build_google_stop_marker/1)
    paths = Enum.map(polylines, &Path.new(&1, color: route_color))

    {600, 600}
    |> GoogleMapData.new()
    |> GoogleMapData.add_markers(markers)
    |> GoogleMapData.add_paths(paths)
    |> GoogleMaps.static_map_url()
  end

  @spec build_google_stop_marker(RouteStop.t()) :: GoogleMarker.t()
  defp build_google_stop_marker(%RouteStop{id: id, is_terminus?: is_terminus?}) do
    id
    |> Repo.get()
    |> Markers.stop(is_terminus?)
  end

  @spec dynamic_map_data(
          String.t(),
          [RoutePattern.t()],
          VehicleHelpers.tooltip_index() | nil
        ) :: MapData.t()
  defp dynamic_map_data(
         color,
         route_patterns,
         vehicle_tooltips
       ) do
    stop_ids =
      try do
        if is_list(route_patterns) do
          Enum.flat_map(route_patterns, fn %{stop_ids: stop_ids} -> stop_ids end)
          |> Enum.uniq()
        else
          []
        end
      rescue
        _error in Protocol.UndefinedError ->
          _ =
            Logger.info(
              "module=#{__MODULE__} dynamic_map_data route_patterns=#{inspect(route_patterns)}"
            )

          []
      end

    stop_markers =
      stop_ids
      |> Enum.map(&build_stop_marker/1)
      |> Enum.reject(&is_nil/1)

    all_markers =
      if vehicle_tooltips do
        stop_markers ++ build_vehicle_markers(vehicle_tooltips)
      else
        stop_markers
      end

    paths = dynamic_paths("#" <> color, route_patterns, [])

    {600, 600}
    |> MapData.new(16)
    |> MapData.add_markers(all_markers)
    |> MapData.add_stop_markers(stop_markers)
    |> MapData.add_polylines(paths)
    |> Map.put(:tile_server_url, Application.fetch_env!(:dotcom, :tile_server_url))
  end

  @spec build_stop_marker(Stop.id_t()) :: Marker.t()
  defp build_stop_marker(id) do
    stop = Repo.get(id)
    # Only build the stop marker if the api returned a value
    if stop, do: do_build_stop_marker(stop)
  end

  @spec do_build_stop_marker(Stop.t()) :: Marker.t()
  defp do_build_stop_marker(%Stop{id: id, latitude: lat, longitude: lng, name: name}) do
    Marker.new(lat, lng, id: id, icon: "stop-circle-bordered-expanded", tooltip_text: name)
  end

  @spec build_vehicle_markers(VehicleHelpers.tooltip_index()) :: [Marker.t()]
  defp build_vehicle_markers(tooltip_index) do
    # the tooltip index uses two different key formats, so
    # the Enum.reject call here is essentially just
    # deduplicating the index
    tooltip_index
    |> Enum.reject(&match?({{_trip, _id}, _tooltip}, &1))
    |> Enum.map(fn {_, vt} ->
      Marker.new(
        vt.vehicle.latitude,
        vt.vehicle.longitude,
        id: vt.vehicle.id,
        icon: "vehicle-bordered-expanded",
        rotation_angle: vt.vehicle.bearing,
        vehicle_crowding: vt.vehicle.crowding,
        tooltip_text:
          vt
          |> VehicleHelpers.tooltip()
      )
    end)
  end

  @spec dynamic_paths(String.t(), [RoutePattern.t()], [RoutePattern.t()]) :: [Polyline.t()]
  defp dynamic_paths(color, route_patterns, vehicle_polylines) do
    route_paths =
      Enum.filter(route_patterns, &(!is_nil(&1.representative_trip_polyline)))
      |> Enum.map(&Polyline.new(&1, color: color, weight: 4))

    vehicle_paths = Enum.map(vehicle_polylines, &Polyline.new(&1, color: color, weight: 2))
    route_paths ++ vehicle_paths
  end
end
