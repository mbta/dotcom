defmodule HubStops do
  @moduledoc """
  Represents a list of Hub Stops
  """

  alias Routes.Route

  @commuter_hubs [
    {"place-sstat", "/images/stops/south_station",
     "Entrances to Red Line and Commuter Rail outside South Station"},
    {"place-north", "/images/stops/north_station_commuter",
     "People walking by train departure board inside North Station"},
    {"place-bbsta", "/images/stops/back_bay", "Lobby inside Back Bay station"}
  ]
  @red_line_hubs [
    {"place-sstat", "/images/stops/south_station",
     "Entrances to Red Line and Commuter Rail outside South Station"},
    {"place-pktrm", "/images/stops/park_street",
     "Entrance to Green and Red Lines outside Park Street"},
    {"place-dwnxg", "/images/stops/downtown_crossing",
     "Entrance to Orange and Red Lines outside Downtown Crossing"}
  ]
  @green_line_hubs [
    {"place-north", "/images/stops/north_station_green",
     "People walking towards Green Line train inside North Station"},
    {"place-pktrm", "/images/stops/park_street",
     "Entrance to Green and Red Lines outside Park Street"},
    {"place-gover", "/images/stops/government_center",
     "Entrance to Blue and Green Lines outside Government Center"}
  ]
  @orange_line_hubs [
    {"place-north", "/images/stops/north_station",
     "People waiting as orange line train arrives inside North Station"},
    {"place-bbsta", "/images/stops/back_bay", "Lobby inside Back Bay station"},
    {"place-rugg", "/images/stops/ruggles", "Entrance to Ruggles station"}
  ]
  @blue_line_hubs [
    {"place-state", "/images/stops/state_street",
     "Blue Line subway platform inside State Street"},
    {"place-wondl", "/images/stops/wonderland", "Exterior of Wonderland station"},
    {"place-aport", "/images/stops/airport", "Blue Line train departing Airport station"}
  ]

  @hub_map %{
    "Red" => @red_line_hubs,
    "Blue" => @blue_line_hubs,
    "Green" => @green_line_hubs,
    "Orange" => @orange_line_hubs
  }

  @doc """
  Returns a list of HubStops for the given mode that are
  found in the given list of DetailedStopGroup's
  """
  def mode_hubs(:commuter_rail, route_stop_pairs) do
    all_mode_stops = Enum.flat_map(route_stop_pairs, fn {_route, stops} -> stops end)

    @commuter_hubs
    |> Enum.map(&build_hub_stop(&1, all_mode_stops))
  end

  def mode_hubs(_mode, _route_stop_pairs) do
    []
  end

  @doc """
  Returns a map of %{route_id -> HubStopList} which represents all
  the hubstops for all routes found in the given list of DetailedStopGroup
  """
  def route_hubs(route_stop_pairs) do
    Map.new(route_stop_pairs, &do_from_stop_info/1)
  end

  defp do_from_stop_info({%Route{id: route_id}, detailed_stops})
       when route_id in ["Red", "Blue", "Green", "Orange"] do
    hub_stops =
      @hub_map
      |> Map.get(route_id)
      |> Task.async_stream(&build_hub_stop(&1, detailed_stops))
      |> Enum.map(fn {:ok, hub_stop} -> hub_stop end)

    {route_id, hub_stops}
  end

  defp do_from_stop_info({%Route{id: route_id}, _}), do: {route_id, []}

  defp build_hub_stop({stop_id, path, alt_text}, detailed_stops) do
    %HubStop{
      detailed_stop: Enum.find(detailed_stops, &(&1.stop.id == stop_id)),
      image: path,
      alt_text: alt_text
    }
  end
end
