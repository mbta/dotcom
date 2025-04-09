defmodule Dotcom.TripPlan.ItineraryGroups do
  @moduledoc """
  Group itineraries by unique legs.

  A unique leg is defined as a leg that has a unique combination of mode, from, and to.
  But, this does not include walking legs that are less than 0.2 miles.
  """

  import DotcomWeb.TripPlanView, only: [get_one_way_total_by_type: 2]

  alias Dotcom.TripPlan.{Itinerary, ItineraryGroup, Leg, PersonalDetail, TransitDetail}
  alias OpenTripPlannerClient.ItineraryTag

  @short_walk_threshold_minutes 5
  @max_per_group 4

  @doc """
  From a large list of itineraries, collect them into 5 groups of at most
  #{@max_per_group} itineraries each, sorting the groups in favor of tagged
  groups first
  """
  @spec from_itineraries([Itinerary.t()], Keyword.t()) :: [ItineraryGroup.t()]
  def from_itineraries(itineraries, opts \\ []) do
    itineraries
    |> Enum.group_by(&{&1.accessible?, unique_legs_to_hash(&1)})
    |> Enum.map(&elem(&1, 1))
    |> Enum.reject(&Enum.empty?/1)
    |> Enum.map(&to_group(&1, opts))
    |> Enum.sort_by(fn
      %ItineraryGroup{summary: %{tag: tag}} ->
        Enum.find_index(ItineraryTag.tag_priority_order(), &(&1 == tag))
    end)
    |> Enum.take(5)
  end

  def max_per_group, do: @max_per_group

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

  defp limit_itinerary_count(itineraries, opts) do
    if opts[:take_from_end] do
      Enum.take(itineraries, -@max_per_group)
    else
      Enum.take(itineraries, @max_per_group)
    end
  end

  # Summarize a group of chronologically-sorted itineraries, noting the
  # - representative_index: Which itinerary should represent the group? It will
  #   be either the first or final one.
  # - representative_time_key: An itinerary departs at the :start time and arrives
  #   by the :stop time. This denotes which of those is relevant to the group.
  defp to_group(grouped_itineraries, opts) do
    limited_itineraries = grouped_itineraries |> limit_itinerary_count(opts)

    representative_index =
      if(opts[:take_from_end], do: Enum.count(limited_itineraries) - 1, else: 0)

    summary =
      grouped_itineraries
      |> Enum.at(representative_index)
      |> to_summary(grouped_itineraries)

    %ItineraryGroup{
      itineraries: ItineraryTag.sort_tagged(limited_itineraries),
      representative_index: representative_index,
      representative_time_key: if(opts[:take_from_end], do: :stop, else: :start),
      summary: summary
    }
  end

  @doc """
  The itinerary summary additionally includes a fare and summarized legs
  """
  @spec to_summary(Itinerary.t(), [Itinerary.t()]) :: map()
  def to_summary(representative_itinerary, grouped_itineraries) do
    representative_itinerary
    |> to_map_with_fare()
    |> Map.put(:summarized_legs, to_summarized_legs(grouped_itineraries))
  end

  defp to_summarized_legs(itineraries) do
    itineraries
    |> to_transposed_legs()
    |> Enum.map(&aggregate_legs/1)
    |> remove_short_intermediate_walks()
  end

  defp to_transposed_legs(itineraries) do
    itineraries
    |> Enum.map(& &1.legs)
    |> Enum.zip_with(&Function.identity/1)
  end

  defp aggregate_legs(legs) do
    legs
    |> Enum.uniq_by(&combined_leg_to_tuple/1)
    |> Enum.map(&to_summarized_leg/1)
    |> Enum.reduce(%{walk_minutes: 0, routes: []}, &summarize_legs/2)
  end

  defp to_map_with_fare(itinerary) do
    itinerary
    |> Map.take([:accessible?, :duration, :start, :stop, :tag, :walk_distance])
    |> Map.put(
      :total_cost,
      get_one_way_total_by_type(itinerary, :highest_one_way_fare)
    )
  end

  defp remove_short_intermediate_walks(summarized_legs) do
    summarized_legs
    |> Enum.with_index()
    |> Enum.reject(fn {leg, index} ->
      index > 0 && index < Kernel.length(summarized_legs) - 1 &&
        (leg.routes == [] && leg.walk_minutes < @short_walk_threshold_minutes)
    end)
    |> Enum.map(fn {leg, _} -> leg end)
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
