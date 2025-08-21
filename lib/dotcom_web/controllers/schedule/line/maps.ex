defmodule DotcomWeb.ScheduleController.Line.Maps do
  @moduledoc """
  Handles Map information for the line controller
  """

  alias Dotcom.MapHelpers
  alias Leaflet.{MapData, MapData.Marker, MapData.Polyline}
  alias RoutePatterns.RoutePattern
  alias Stops.{Repo, Stop}

  @doc """
  Returns a tuple {String.t, MapData.t} where the first element
  is the url for the static map, and the second element is the MapData
  struct used to build the dynamic map
  """
  def map_data(%Routes.Route{type: 4}, _, _), do: {MapHelpers.image(:ferry), nil}

  def map_data(
        route,
        route_patterns,
        vehicle_tooltips
      ) do
    dynamic_data = dynamic_map_data(route.color, route_patterns, vehicle_tooltips)
    {nil, dynamic_data}
  end

  defp dynamic_map_data(
         color,
         route_patterns,
         vehicle_tooltips
       ) do
    stop_ids =
      if is_list(route_patterns) do
        Enum.flat_map(route_patterns, fn %{stop_ids: stop_ids} -> stop_ids end)
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

  defp build_stop_marker(id) do
    stop = Repo.get(id)
    # Only build the stop marker if the api returned a value
    if stop, do: do_build_stop_marker(stop)
  end

  defp do_build_stop_marker(%Stop{id: id, latitude: lat, longitude: lng, name: name}) do
    Marker.new(lat, lng, id: id, icon: "stop-circle-bordered-expanded", tooltip_text: name)
  end

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

  defp dynamic_paths(color, route_patterns, vehicle_polylines) do
    route_paths =
      Enum.filter(route_patterns, &(!is_nil(&1.representative_trip_polyline)))
      |> Enum.map(&Polyline.new(&1, color: color, weight: 4))

    vehicle_paths = Enum.map(vehicle_polylines, &Polyline.new(&1, color: color, weight: 2))
    route_paths ++ vehicle_paths
  end
end
