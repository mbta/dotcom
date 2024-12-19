defmodule Dotcom.TripPlan.Map do
  @moduledoc """
  Handles generating the maps displayed within the TripPlan Controller
  """

  alias Dotcom.TripPlan.{Leg, NamedPosition, TransitDetail}
  alias Leaflet.{MapData, MapData.Marker}
  alias Leaflet.MapData.Polyline, as: LeafletPolyline
  alias Routes.Route
  alias Util.Position

  @type t :: MapData.t()

  def initial_map_data do
    {630, 400}
    |> MapData.new(14)
  end

  @doc """
  Returns the static map data and source URL
  Accepts a function that will return either a
  Route or nil when given a route_id
  """
  @spec itinerary_map([Leg.t()]) :: t
  def itinerary_map(itinerary) do
    markers =
      itinerary
      |> markers_for_legs()
      |> Enum.with_index()
      |> Enum.map(fn {marker, idx} -> %{marker | id: "marker-#{idx}"} end)

    paths = Enum.map(itinerary, &build_leg_path(&1))

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
      color: Map.get(polyline, :color),
      coordinates: Map.get(polyline, :positions, []) |> invert_coordinates(),
      width: Map.get(polyline, :weight, 4)
    }
  end

  @spec build_leg_path(Leg.t()) :: LeafletPolyline.t()
  defp build_leg_path(leg) do
    color = leg_color(leg)
    path_weight = if Leg.transit?(leg), do: 5, else: 1

    leg.polyline
    |> extend_to_endpoints(leg)
    |> LeafletPolyline.new(color: color, weight: path_weight)
  end

  @spec extend_to_endpoints(String.t(), Leg.t()) :: String.t()
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

  @spec markers_for_legs([Leg.t()]) :: [Marker.t()]
  defp markers_for_legs(legs) do
    leg_count = Enum.count(legs)

    legs
    |> Enum.zip(Stream.iterate(0, &(&1 + 2)))
    |> Enum.flat_map(&build_marker_for_leg(&1, leg_count))
  end

  @spec build_marker_for_leg({Leg.t(), non_neg_integer}, non_neg_integer) :: [
          Marker.t()
        ]
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

  @spec build_marker_for_leg_position(NamedPosition.t(), map) :: Marker.t()
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
  @spec stop_icon_name(index_map) :: String.t()
  def stop_icon_name(%{current: idx, start: idx}), do: "map-pin-a"
  def stop_icon_name(%{current: idx, end: idx}), do: "map-pin-b"
  def stop_icon_name(%{}), do: "dot-mid"

  @doc """
  Atom representing the size to use for the icon.
  Used by javascript to generate the full SVG.
  """
  @spec stop_icon_size(String.t()) :: map | nil
  def stop_icon_size("map-pin-a"), do: nil
  def stop_icon_size("map-pin-b"), do: nil
  def stop_icon_size(_), do: %{icon_size: [22, 22], icon_anchor: [0, 0]}

  @spec leg_color(Leg.t()) :: String.t()
  defp leg_color(%Leg{mode: %TransitDetail{route: %Route{color: color}}})
       when not is_nil(color) do
    "#" <> color
  end

  defp leg_color(_) do
    "#000000"
  end

  @spec tooltip_for_position(NamedPosition.t()) :: String.t()
  defp tooltip_for_position(%NamedPosition{name: name, stop: nil}), do: name
  defp tooltip_for_position(%NamedPosition{stop: %Stops.Stop{name: name}}), do: name

  @spec z_index(map) :: 0 | 1
  def z_index(%{current: idx, start: idx}), do: 100
  def z_index(%{current: idx, end: idx}), do: 100
  def z_index(%{}), do: 0
end
