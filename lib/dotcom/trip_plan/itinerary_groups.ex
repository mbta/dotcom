defmodule Dotcom.TripPlan.ItineraryGroups do
  @moduledoc """
  Group itineraries by unique legs.

  A unique leg is defined as a leg that has a unique combination of mode, from, and to.
  But, this does not include walking legs that are less than 0.2 miles.
  """

  alias Dotcom.TripPlan.{Itinerary, Leg, PersonalDetail, TransitDetail}
  alias OpenTripPlannerClient.ItineraryTag

  @type summarized_leg :: %{
          routes: [Routes.Route.t()],
          walk_minutes: non_neg_integer()
        }
  @type summary :: %{
          accessible?: boolean() | nil,
          duration: non_neg_integer(),
          first_start: DateTime.t(),
          first_stop: DateTime.t(),
          next_starts: [DateTime.t()],
          summarized_legs: [summarized_leg()],
          tag: String.t(),
          total_cost: non_neg_integer(),
          walk_distance: float()
        }

  @spec from_itineraries([Itinerary.t()]) :: [
          %{itineraries: [Itinerary.t()], summary: summary()}
        ]
  def from_itineraries(itineraries) do
    itineraries
    |> Enum.group_by(&unique_legs_to_hash/1)
    |> Enum.map(&group_departures/1)
    |> Enum.reject(&Enum.empty?(&1))
    |> Enum.sort_by(fn
      %{itineraries: [%{tag: tag} | _] = _} ->
        Enum.find_index(ItineraryTag.tag_priority_order(), &(&1 == tag))

      _ ->
        -1
    end)
  end

  defp unique_legs_to_hash(%Itinerary{legs: legs}) do
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

  defp group_departures({_hash, grouped_itineraries}) do
    summarized_legs =
      grouped_itineraries
      |> Enum.map(& &1.legs)
      |> Enum.zip_with(&Function.identity/1)
      |> Enum.map(fn legs ->
        legs
        |> Enum.uniq_by(&combined_leg_to_tuple/1)
        |> Enum.map(&to_summarized_leg/1)
        |> Enum.reduce(%{walk_minutes: 0, routes: []}, &summarize_legs/2)
      end)
      |> remove_short_intermediate_walks()

    summary =
      grouped_itineraries
      |> Enum.map(fn itinerary ->
        itinerary
        |> Map.take([:start, :stop, :tag, :duration, :accessible?, :walk_distance])
        |> Map.put(
          :total_cost,
          DotcomWeb.TripPlanView.get_one_way_total_by_type(itinerary, :highest_one_way_fare)
        )
      end)
      |> summarize_itineraries()
      |> Map.put(:summarized_legs, summarized_legs)

    %{itineraries: ItineraryTag.sort_tagged(grouped_itineraries), summary: summary}
  end

  defp remove_short_intermediate_walks(summarized_legs) do
    summarized_legs
    |> Enum.with_index()
    |> Enum.reject(fn {leg, index} ->
      index > 0 && index < Kernel.length(summarized_legs) - 1 &&
        (leg.routes == [] && leg.walk_minutes < 5)
    end)
    |> Enum.map(&elem(&1, 0))
  end

  defp summarize_itineraries(itinerary_maps) do
    # for most of the summary we can reflect the first itinerary
    [
      %{
        tag: tag,
        accessible?: accessible,
        total_cost: total_cost,
        duration: duration,
        walk_distance: walk_distance,
        stop: first_stop
      }
      | _
    ] = itinerary_maps

    [first_start | next_starts] = Enum.map(itinerary_maps, & &1.start)

    %{
      first_start: first_start,
      first_stop: first_stop,
      next_starts: next_starts,
      tag: if(tag, do: Atom.to_string(tag) |> String.replace("_", " ")),
      duration: duration,
      accessible?: accessible,
      walk_distance: walk_distance,
      total_cost: total_cost
    }
  end

  defp summarize_legs(%{walk_minutes: new}, %{walk_minutes: old} = summary) do
    %{summary | walk_minutes: new + old}
  end

  defp summarize_legs(
         %{route: route},
         %{routes: old_routes} = summary
       ) do
    # should probably sort by sort_order, but the route data returned by OTP don't have sort orders! (yet?)
    routes = [route | old_routes] |> Enum.sort_by(& &1.name)
    %{summary | routes: routes}
  end

  defp to_summarized_leg(%Leg{mode: %PersonalDetail{}, duration: duration}) do
    %{walk_minutes: duration}
  end

  defp to_summarized_leg(%Leg{mode: %TransitDetail{route: route}}) do
    %{route: route}
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
