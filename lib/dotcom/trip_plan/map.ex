defmodule Dotcom.TripPlan.Map do
  alias Leaflet.{MapData, MapData.Marker}
  alias Leaflet.MapData.Polyline, as: LeafletPolyline
  alias Routes.Route
  alias TripPlan.{Leg, NamedPosition, TransitDetail}
  alias Util.Position

  @type t :: MapData.t()
  @type route_mapper :: (String.t() -> Route.t() | nil)
  @type stop_mapper :: (String.t() -> Stops.Stop.t() | nil)

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @default_opts [
    route_mapper: &Routes.Repo.get/1,
    stop_mapper: {@stops_repo, :get_parent, 1}
  ]

  @moduledoc """
  Handles generating the maps displayed within the TripPlan Controller
  """

  def initial_map_data do
    {630, 400}
    |> MapData.new(14)
  end

  # Maps for results
  @doc """
  Returns the static map data and source URL
  Accepts a function that will return either a
  Route or nil when given a route_id
  """
  @spec itinerary_map([Leg.t()], Keyword.t()) :: t
  def itinerary_map(itinerary, opts \\ []) do
    itinerary_map_data(itinerary, Keyword.merge(@default_opts, opts))
  end

  @spec itinerary_map_data([Leg.t()], Keyword.t()) :: MapData.t()
  defp itinerary_map_data(itinerary, opts) do
    markers =
      itinerary
      |> markers_for_legs(opts)
      |> Enum.with_index()
      |> Enum.map(fn {marker, idx} -> %{marker | id: "marker-#{idx}"} end)

    paths = Enum.map(itinerary, &build_leg_path(&1, opts[:route_mapper]))

    {600, 600}
    |> MapData.new()
    |> MapData.add_markers(markers)
    |> MapData.add_polylines(paths)
  end

  @spec build_leg_path(Leg.t(), route_mapper) :: LeafletPolyline.t()
  defp build_leg_path(leg, route_mapper) do
    color = leg_color(leg, route_mapper)
    path_weight = if Leg.transit?(leg), do: 5, else: 1

    leg.polyline
    |> extend_to_endpoints(leg)
    |> LeafletPolyline.new(color: color, weight: path_weight)
  end

  @spec extend_to_endpoints(String.t(), Leg.t()) :: String.t()
  defp extend_to_endpoints(polyline, %{from: from, to: to})
       when is_map(from) and is_map(to) do
    from = {Position.longitude(from), Position.latitude(from)}
    to = {Position.longitude(to), Position.latitude(to)}

    polyline
    |> Polyline.decode()
    |> (fn line -> Enum.concat([[from], line, [to]]) end).()
    |> Polyline.encode()
  end

  defp extend_to_endpoints(_polyline, _leg) do
    ""
  end

  @spec markers_for_legs([Leg.t()], Keyword.t()) :: [Marker.t()]
  defp markers_for_legs(legs, opts) do
    leg_count = Enum.count(legs)

    legs
    |> Enum.zip(Stream.iterate(0, &(&1 + 2)))
    |> Enum.flat_map(&build_marker_for_leg(&1, opts, leg_count))
  end

  @spec build_marker_for_leg({Leg.t(), non_neg_integer}, Keyword.t(), non_neg_integer) :: [
          Marker.t()
        ]
  defp build_marker_for_leg({leg, idx}, opts, leg_count) do
    leg_positions = [{leg.from, idx}, {leg.to, idx + 1}]

    leg_positions
    |> Enum.reject(fn {position, _n} -> is_nil(position) end)
    |> build_markers_for_leg_positions(opts[:stop_mapper], leg_count)
  end

  defp build_markers_for_leg_positions(positions_with_indicies, stop_mapper, leg_count) do
    for {position, index} <- positions_with_indicies do
      build_marker_for_leg_position(position, stop_mapper, %{
        start: 0,
        current: index,
        end: 2 * leg_count - 1
      })
    end
  end

  @spec build_marker_for_leg_position(NamedPosition.t(), stop_mapper, map) :: Marker.t()
  defp build_marker_for_leg_position(leg_position, stop_mapper, indexes) do
    icon_name = stop_icon_name(indexes)

    opts = [
      icon: icon_name,
      icon_opts: stop_icon_size(icon_name),
      tooltip: tooltip_for_position(leg_position, stop_mapper),
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

  @spec leg_color(Leg.t(), route_mapper) :: String.t()
  defp leg_color(%Leg{mode: %TransitDetail{route_id: route_id}}, route_mapper) do
    with route <- route_mapper.(route_id), do: "#" <> route.color
  end

  defp leg_color(_leg, _route_mapper) do
    "#000000"
  end

  @spec tooltip_for_position(NamedPosition.t(), stop_mapper) :: String.t()
  defp tooltip_for_position(%NamedPosition{stop_id: nil, name: name}, _stop_mapper) do
    name
  end

  defp tooltip_for_position(%NamedPosition{stop_id: stop_id} = position, stop_mapper) do
    case stop_mapper.(stop_id) do
      nil -> position.name
      stop -> stop.name
    end
  end

  @spec z_index(map) :: 0 | 1
  def z_index(%{current: idx, start: idx}), do: 100
  def z_index(%{current: idx, end: idx}), do: 100
  def z_index(%{}), do: 0
end
