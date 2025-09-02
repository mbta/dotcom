defmodule Dotcom.TripPlan.Loops do
  @moduledoc """
  Accommodate loop legs in itineraries.
  """

  @doc """
  Merge the loop legs of every itinerary in every itinerary group in a list of itinerary groups.
  """
  def merge_itinerary_groups_loop_legs(itinerary_groups) do
    itinerary_groups
    |> Enum.map(&merge_itinerary_group_loop_legs/1)
  end

  # Given a single itinerary group, merge the loop legs in every itinerary in that group.
  defp merge_itinerary_group_loop_legs(itinerary_group) do
    itinerary_group
    |> Map.update(:itineraries, [], &merge_itineraries_loop_legs/1)
  end

  # Given a list of itineraries, merge loop legs in every itinerary.
  defp merge_itineraries_loop_legs(itineraries) do
    itineraries
    |> Enum.map(&merge_itinerary_loop_legs/1)
  end

  # Given an itinerary, merge the loop legs.
  defp merge_itinerary_loop_legs(itinerary) do
    itinerary
    |> Map.update(:legs, [], &merge_loop_legs/1)
  end

  # Merge the loop legs in a list of legs.
  # If the list is empty, return an empty list.
  defp merge_loop_legs([]), do: []

  # If the list only has one element, return the list.
  defp merge_loop_legs([first]), do: [first]

  # If the list has more than one leg, check for `interline_with_previous_leg`.
  # If true, merge the leg with the previous leg.
  # If false, do nothing.
  defp merge_loop_legs(legs) do
    Enum.reduce(legs, [], &merge_loop_legs_reducer/2)
  end

  # Helper function for `merge_leg_loops/1`.
  defp merge_loop_legs_reducer(curr, acc) do
    if curr.interline_with_previous_leg do
      last = if length(acc) === 0, do: curr, else: List.last(acc)
      all_but_last = if length(acc) === 1, do: [], else: Enum.slice(acc, -1, 1)

      all_but_last ++ [merge_legs(last, curr)]
    else
      acc ++ [curr]
    end
  end

  # Merge two legs by predominately keeping the data from the first.
  # The `from` comes from the first. The `to` comes from the second.
  # Distance, duration, and stops are combinations of the two legs.
  defp merge_legs(first, second) do
    second
    |> Map.merge(first)
    |> Map.put(:to, Map.get(second, :to))
    |> Map.put(:end, Map.get(second, :end))
    |> Map.put(:distance, Map.get(first, :distance, 0.0) + Map.get(second, :distance, 0.0))
    |> Map.put(:duration, Map.get(first, :duration, 0.0) + Map.get(second, :duration, 0.0))
    |> Map.put(:intermediate_stops, merge_stops(first, second))
    |> Map.put(:leg_geometry, merge_leg_geometry(first, second))
  end

  # Merge the intermediate stops of the first leg with the intermediate stops of the second leg.
  # But, insert the actual stop of the first leg in between thus making it an intermediate stop.
  defp merge_stops(first, second) do
    first_intermediate_stops = Map.get(first, :intermediate_stops, [])
    second_intermediate_stops = Map.get(second, :intermediate_stops, [])

    first_stop_name = Kernel.get_in(first, [:to, :name]) || ""
    first_stop = %OpenTripPlannerClient.Schema.IntermediateStop{name: first_stop_name}

    first_intermediate_stops ++ [first_stop] ++ second_intermediate_stops
  end

  # Decode, combine, and encode the polylines of two legs.
  defp merge_leg_geometry(first, second) do
    first_leg_polyline =
      (Kernel.get_in(first, [:leg_geometry, :points]) || [])
      |> Leaflet.MapData.Polyline.new()
      |> Map.get(:positions)
      |> Enum.map(&invert_coordinates/1)

    second_leg_polyline =
      (Kernel.get_in(second, [:leg_geometry, :points]) || [])
      |> Leaflet.MapData.Polyline.new()
      |> Map.get(:positions)
      |> Enum.map(&invert_coordinates/1)

    combined_polyline =
      Polyline.encode(first_leg_polyline ++ second_leg_polyline)

    %OpenTripPlannerClient.Schema.Geometry{
      points: combined_polyline,
      length: nil
    }
  end

  # Invert the coordinates to fit Polyline's requirements.
  defp invert_coordinates([lat, lon]) do
    {lon, lat}
  end
end
