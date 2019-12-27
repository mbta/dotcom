defmodule SiteWeb.ScheduleController.Line.Maps do
  alias GoogleMaps.MapData, as: GoogleMapData
  alias GoogleMapData.Marker, as: GoogleMarker
  alias GoogleMapData.Path
  alias Leaflet.{MapData, MapData.Marker, MapData.Polyline}
  alias Stops.{RouteStops, RouteStop, Repo, Stop}
  alias Routes.{Shape, Route}
  alias Site.MapHelpers
  alias Site.MapHelpers.Markers

  @moduledoc """
  Handles Map information for the line controller
  """

  def map_img_src(_, _, %Routes.Route{type: 4}) do
    MapHelpers.image(:ferry)
  end

  def map_img_src({route_stops, _shapes}, polylines, %{color: route_color} = _route) do
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

  @spec build_stop_marker(RouteStop.t()) :: Marker.t()
  defp build_stop_marker(%RouteStop{id: id}) do
    id
    |> Repo.get()
    |> do_build_stop_marker()
  end

  @spec do_build_stop_marker(Stop.t()) :: Marker.t()
  defp do_build_stop_marker(%Stop{id: id, latitude: lat, longitude: lng, name: name}) do
    Marker.new(lat, lng, id: id, icon: "stop-circle-bordered-expanded", tooltip_text: name)
  end

  @spec dynamic_map_data(
          String.t(),
          [Shape.t()],
          {[RouteStop.t()], any},
          {[String.t()], VehicleHelpers.tooltip_index()} | {any, nil}
        ) :: MapData.t()
  def dynamic_map_data(
        color,
        map_shapes,
        {route_stops, _shapes},
        {_vehicle_polylines, vehicle_tooltips}
      ) do
    {stop_markers, all_markers} = dynamic_markers(route_stops, vehicle_tooltips)

    paths = dynamic_paths("#" <> color, map_shapes, [])

    {600, 600}
    |> MapData.new(16)
    |> MapData.add_markers(all_markers)
    |> MapData.add_stop_markers(stop_markers)
    |> MapData.add_polylines(paths)
    |> Map.put(:tile_server_url, Application.fetch_env!(:site, :tile_server_url))
  end

  @spec dynamic_markers([RouteStop.t()], VehicleHelpers.tooltip_index() | nil) ::
          {[Marker.t()], [Marker.t()]}
  defp dynamic_markers(route_stops, nil) do
    stop_markers = Enum.map(route_stops, &build_stop_marker/1)
    {stop_markers, stop_markers}
  end

  defp dynamic_markers(route_stops, tooltip_index) do
    vehicle_markers = build_vehicle_markers(tooltip_index)
    stop_markers = Enum.map(route_stops, &build_stop_marker/1)
    {stop_markers, stop_markers ++ vehicle_markers}
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
        tooltip_text:
          vt
          |> VehicleHelpers.tooltip()
          |> Floki.text()
      )
    end)
  end

  @spec dynamic_paths(String.t(), [Shape.t()], [Shape.t()]) :: [Polyline.t()]
  defp dynamic_paths(color, route_polylines, vehicle_polylines) do
    route_paths = Enum.map(route_polylines, &Polyline.new(&1, color: color, weight: 4))
    vehicle_paths = Enum.map(vehicle_polylines, &Polyline.new(&1, color: color, weight: 2))
    route_paths ++ vehicle_paths
  end

  @doc """
  Returns a tuple {String.t, MapData.t} where the first element
  is the url for the static map, and the second element is the MapData
  struct used to build the dynamic map
  """
  def map_data(route, map_route_stops, [], []) do
    map_shapes = map_polylines(map_route_stops, route)
    static_data = map_img_src(map_route_stops, [], route)
    dynamic_data = dynamic_map_data(route.color, map_shapes, map_route_stops, {nil, nil})
    {static_data, dynamic_data}
  end

  def map_data(route, map_route_stops, vehicle_polylines, vehicle_tooltips) do
    map_shapes = map_polylines(map_route_stops, route)

    static_data =
      map_img_src(
        map_route_stops,
        Enum.flat_map(map_shapes, &PolylineHelpers.condense([&1.polyline])),
        route
      )

    vehicle_data = {vehicle_polylines, vehicle_tooltips}
    dynamic_data = dynamic_map_data(route.color, map_shapes, map_route_stops, vehicle_data)
    {static_data, dynamic_data}
  end

  @spec map_polylines({any, [Routes.Shape.t()]}, Route.t()) :: [Shape.t()]
  defp map_polylines(_, %Routes.Route{type: 4}), do: []

  defp map_polylines({_stops, shapes}, _), do: shapes

  @doc "Returns the stops that should be displayed on the map"
  @spec map_stops([RouteStops.t()], {[Shape.t()], [Shape.t()]}, Route.id_t()) ::
          {[Stops.Stop.t()], [Shape.t()]}
  def map_stops(branches, {route_shapes, _active_shapes}, "Green") do
    {do_map_stops(branches), route_shapes}
  end

  def map_stops(branches, {_route_shapes, active_shapes}, _route_id) do
    {do_map_stops(branches), active_shapes}
  end

  @spec do_map_stops([RouteStops.t()]) :: [RouteStop.t()]
  defp do_map_stops(branches) do
    branches
    |> Enum.flat_map(& &1.stops)
    |> Enum.uniq_by(& &1.id)
  end
end
