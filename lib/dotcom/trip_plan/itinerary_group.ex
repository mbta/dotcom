defmodule Dotcom.TripPlan.ItineraryGroups do
  alias Dotcom.TripPlan.{Itinerary, Leg, PersonalDetail}

  @doc """
  Group itineraries by unique legs.

  A unique leg is defined as a leg that has a unique combination of mode, from, and to.
  But, this does not include walking legs that are less than 0.2 miles.
  """
  @spec from_itineraries([Itinerary.t()]) :: [
          %{departure: DateTime.t(), arrival: DateTime.t(), legs: [Leg.t()]}
        ]
  def from_itineraries(itineraries) do
    itineraries
    |> Enum.group_by(&unique_legs_to_hash/1)
    |> Enum.map(&group_departures/1)
    |> Enum.reject(&Enum.empty?(&1))
  end

  defp unique_legs_to_hash(legs) do
    legs
    |> Enum.reject(&short_walking_leg?/1)
    |> Enum.map(&unique_leg_to_tuple/1)
    |> :erlang.phash2()
  end

  defp unique_leg_to_tuple(%Leg{mode: %PersonalDetail{}} = leg) do
    {:WALK, leg.from.name, leg.to.name}
  end

  defp unique_leg_to_tuple(%Leg{mode: %{route: route}} = leg) do
    {Routes.Route.type_atom(route.type), leg.from.name, leg.to.name}
  end

  defp group_departures({_, group}) do
    group
    |> Enum.uniq_by(&itinerary_to_hash/1)
    |> Enum.map(fn group ->
      %{
        departure: group.start,
        arrival: group.stop,
        legs: group.legs
      }
    end)
  end

  defp itinerary_to_hash(itinerary) do
    itinerary
    |> Map.get(:legs)
    |> Enum.reject(&short_walking_leg?/1)
    |> Enum.map(&combined_leg_to_tuple/1)
    |> :erlang.phash2()
  end

  defp short_walking_leg?(%Leg{mode: %PersonalDetail{}} = leg) do
    leg.distance <= 0.2
  end

  defp short_walking_leg?(_), do: false

  defp combined_leg_to_tuple(%Leg{mode: %PersonalDetail{}} = leg) do
    unique_leg_to_tuple(leg)
  end

  defp combined_leg_to_tuple(%Leg{mode: %{route: route}} = leg) do
    {route.id, leg.from.name, leg.to.name}
  end
end
