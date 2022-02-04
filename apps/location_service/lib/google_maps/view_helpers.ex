defmodule GoogleMaps.ViewHelpers do
  @moduledoc """
  Helpers for the Google Maps API.
  """

  @doc """
  Use a stop marker for bus-only stops, station marker otherwise
  """
  @spec marker_for_routes([map] | map) :: String.t() | nil
  def marker_for_routes([]) do
    "map-station-marker"
  end

  def marker_for_routes([route | _]) do
    do_marker_for_routes(route)
  end

  def marker_for_routes(route) do
    do_marker_for_routes(route)
  end

  def do_marker_for_routes(route) do
    if route.group_name == :bus do
      "map-stop-marker"
    else
      "map-station-marker"
    end
  end
end
