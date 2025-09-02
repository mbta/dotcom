defmodule Dotcom.TripPlan.Loops do
  @moduledoc """

  """

  @doc """

  """
  def merge_loop_legs(itinerary_groups) do
    itinerary_groups
    |> Enum.map(&join_itinerary_group_loops/1)
  end

  defp join_itinerary_group_loops(itinerary_group) do
    itinerary_group
    |> Map.update(:itineraries, [], &join_itineraries_loops/1)
  end

  defp join_itineraries_loops(itineraries) do
    itineraries
    |> Enum.map(&join_itinerary_loops/1)
  end

  defp join_itinerary_loops(itinerary) do
    itinerary
    |> Map.update(:legs, [], &join_leg_loops/1)
  end

  defp join_leg_loops([]), do: []

  defp join_leg_loops([first]), do: [first]

  defp join_leg_loops(legs) do
    Enum.reduce(legs, [], fn curr, acc ->
      if curr.interline_with_previous_leg do
        last = List.last(acc)
        all_but_last = if length(acc) === 1, do: [], else: Enum.slice(acc, -1, 1)

        all_but_last ++ [merge_legs(last, curr)]
      else
        acc ++ [curr]
      end
    end)
  end

  defp merge_legs(first, second) do
    second
    |> Map.merge(first)
    |> Map.put(:to, Map.get(second, :to))
    |> Map.put(:end, Map.get(second, :end))
    |> Map.put(:distance, Map.get(first, :distance, 0.0) + Map.get(second, :distance, 0.0))
    |> Map.put(:duration, Map.get(first, :duration, 0.0) + Map.get(second, :duration, 0.0))
    |> Map.put(
      :intermediate_stops,
      Map.get(first, :intermediate_stops, []) ++ Map.get(second, :intermediate_stops, [])
    )
  end
end
