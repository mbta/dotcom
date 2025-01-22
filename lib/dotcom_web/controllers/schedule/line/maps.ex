defmodule DotcomWeb.ScheduleController.Line.Maps do
  @moduledoc """
  Handles Map information for the line controller
  """

  alias Dotcom.MapHelpers
  alias Leaflet.MapData
  alias Leaflet.MapData.Marker
  alias Leaflet.MapData.Polyline
  alias RoutePatterns.RoutePattern
  alias Stops.Repo
  alias Stops.Stop

  @doc """
  Returns a tuple {String.t, MapData.t} where the first element
  is the url for the static map, and the second element is the MapData
  struct used to build the dynamic map
  """
  @spec map_data(
          Route.t(),
          [RoutePattern.t()],
          VehicleHelpers.tooltip_index() | [] | nil
        ) :: {String.t(), MapData.t()}
  def map_data(%Routes.Route{type: 4}, _, _), do: {MapHelpers.image(:ferry), nil}

  def map_data(route, route_patterns, vehicle_tooltips) do
    dynamic_data = dynamic_map_data(route.color, route_patterns, vehicle_tooltips)
    {nil, dynamic_data}
  end

  @spec dynamic_map_data(
          String.t(),
          [RoutePattern.t()],
          VehicleHelpers.tooltip_index() | nil
        ) :: MapData.t()
  defp dynamic_map_data(color, route_patterns, vehicle_tooltips) do
    stop_ids =
      if is_list(route_patterns) do
        route_patterns
        |> Enum.flat_map(fn %{stop_ids: stop_ids} -> stop_ids end)
        |> Enum.uniq()
      else
        []
      end

    stop_markers =
      stop_ids
      |> Enum.map(&build_stop_marker/1)
      |> Enum.reject(&is_nil/1)

    all_markers =
      if is_list(vehicle_tooltips) do
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
        tooltip_text: VehicleHelpers.tooltip(vt)
      )
    end)
  end

  @spec dynamic_paths(String.t(), [RoutePattern.t()], [RoutePattern.t()]) :: [Polyline.t()]
  defp dynamic_paths(color, route_patterns, vehicle_polylines) do
    route_paths =
      route_patterns
      |> Enum.filter(&(!is_nil(&1.representative_trip_polyline)))
      |> Enum.map(&Polyline.new(&1, color: color, weight: 4))

    vehicle_paths = Enum.map(vehicle_polylines, &Polyline.new(&1, color: color, weight: 2))
    route_paths ++ vehicle_paths
  end
end
