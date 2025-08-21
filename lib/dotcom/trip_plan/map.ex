defmodule Dotcom.TripPlan.Map do
  @moduledoc """
  Handles generating the maps displayed within the TripPlan Controller
  """

  import Dotcom.TripPlan.Helpers, only: [route_color: 1]

  alias Leaflet.{MapData, MapData.Marker}
  alias Leaflet.MapData.Polyline, as: LeafletPolyline
  alias OpenTripPlannerClient.Schema.{Itinerary, Leg, Place, Stop}
  alias Util.Position

  @type t :: MapData.t()

  @doc """
  Returns the static map data and source URL
  Accepts a function that will return either a
  Route or nil when given a route_id
  """
  def itinerary_map(itinerary) do
    markers =
      itinerary
      |> markers_for_legs()
      |> Enum.with_index()
      |> Enum.map(fn {marker, idx} -> %{marker | id: "marker-#{idx}"} end)

    paths = Enum.map(itinerary.legs, &build_leg_path(&1))

    {600, 600}
    |> MapData.new()
    |> MapData.add_markers(markers)
    |> MapData.add_polylines(paths)
  end

  @doc """
  Given an `itinerary_map`, convert the polylines to lines (for maplibre-gl-js).

  This involves changing some key names and inverting lat/long to long/lat.
  """
  def get_lines(itinerary_map) do
    itinerary_map
    |> Map.get(:polylines, [])
    |> Enum.map(&polyline_to_line/1)
  end

  @doc """
  Given an `itinerary_map`, convert the markers to points (for maplibre-gl-js).

  This just gets the longitude and latitude from each marker.
  """
  def get_points(itinerary_map) do
    itinerary_map
    |> Map.get(:markers, [])
    |> Enum.map(&marker_to_point/1)
    |> Enum.reject(&is_nil/1)
  end

  defp invert_coordinates(coordinates) do
    coordinates
    |> Enum.map(&invert_coordinate/1)
    |> Enum.reject(&is_nil/1)
  end

  defp invert_coordinate([a, b]), do: [b, a]

  defp invert_coordinate(_), do: nil

  defp marker_to_point(%{longitude: longitude, latitude: latitude}) do
    [longitude, latitude]
  end

  defp marker_to_point(_), do: nil

  defp polyline_to_line(polyline) do
    %{
      color: Map.get(polyline, :color, "#000000"),
      coordinates: Map.get(polyline, :positions, []) |> invert_coordinates(),
      width: Map.get(polyline, :weight, 4)
    }
  end

  defp build_leg_path(leg) do
    path_weight = if leg.transit_leg, do: 5, else: 1

    leg.leg_geometry.points
    |> extend_to_endpoints(leg)
    |> LeafletPolyline.new(color: route_color(leg.route), weight: path_weight)
  end

  defp extend_to_endpoints(polyline, _leg) when not is_binary(polyline), do: ""

  defp extend_to_endpoints(polyline, %{from: from, to: to})
       when is_map(from) and is_map(to) do
    from = {Position.longitude(from), Position.latitude(from)}
    to = {Position.longitude(to), Position.latitude(to)}

    polyline
    |> Polyline.decode()
    |> Kernel.then(fn line -> Enum.concat([[from], line, [to]]) end)
    |> Polyline.encode()
  end

  defp extend_to_endpoints(_polyline, _leg), do: ""

  defp markers_for_legs(%Itinerary{legs: legs}) do
    leg_count = Enum.count(legs)

    legs
    |> Enum.zip(Stream.iterate(0, &(&1 + 2)))
    |> Enum.flat_map(&build_marker_for_leg(&1, leg_count))
  end

  defp build_marker_for_leg({leg, idx}, leg_count) do
    leg_positions = [{leg.from, idx}, {leg.to, idx + 1}]

    leg_positions
    |> Enum.reject(fn {position, _n} -> is_nil(position) end)
    |> build_markers_for_leg_positions(leg_count)
  end

  defp build_markers_for_leg_positions(positions_with_indicies, leg_count) do
    for {position, index} <- positions_with_indicies do
      build_marker_for_leg_position(position, %{
        start: 0,
        current: index,
        end: 2 * leg_count - 1
      })
    end
  end

  defp build_marker_for_leg_position(leg_position, indexes) do
    icon_name = stop_icon_name(indexes)

    opts = [
      icon: icon_name,
      icon_opts: stop_icon_size(icon_name),
      tooltip: tooltip_for_position(leg_position),
      z_index: z_index(indexes)
    ]

    leg_position
    |> Position.latitude()
    |> Marker.new(Position.longitude(leg_position), opts)
  end

  @type index_map :: %{
          required(:current) => integer,
          required(:start) => integer,
          required(:end) => integer
        }

  @doc """
  Simplified name for the icon type; used by javascript to fetch the full SVG.
  """
  def stop_icon_name(%{current: idx, start: idx}), do: "map-pin-a"
  def stop_icon_name(%{current: idx, end: idx}), do: "map-pin-b"
  def stop_icon_name(%{}), do: "dot-mid"

  @doc """
  Atom representing the size to use for the icon.
  Used by javascript to generate the full SVG.
  """
  def stop_icon_size("map-pin-a"), do: nil
  def stop_icon_size("map-pin-b"), do: nil
  def stop_icon_size(_), do: %{icon_size: [22, 22], icon_anchor: [0, 0]}

  defp tooltip_for_position(%Place{name: name, stop: nil}), do: name
  defp tooltip_for_position(%Place{stop: %Stop{name: name}}), do: name

  def z_index(%{current: idx, start: idx}), do: 100
  def z_index(%{current: idx, end: idx}), do: 100
  def z_index(%{}), do: 0
end
