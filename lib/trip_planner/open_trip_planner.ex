defmodule TripPlanner.OpenTripPlanner do
  @moduledoc """
  Makes requests to OpenTripPlanner via the OpenTripPlannerClient library, and
  parses the result.
  """

  alias Dotcom.TripPlanner.Parser

  alias OpenTripPlannerClient.ItineraryTag.{
    EarliestArrival,
    LeastWalking,
    MostDirect,
    ShortestTrip
  }

  alias TripPlan.NamedPosition

  @otp_module Application.compile_env!(:dotcom, :otp_module)

  @doc """
  Requests to OpenTripPlanner's /plan GraphQL endpoint and parses the response..
  """
  @spec plan(NamedPosition.t(), NamedPosition.t(), Keyword.t()) ::
          OpenTripPlannerClient.Behaviour.plan_result()
  def plan(%NamedPosition{} = from, %NamedPosition{} = to, opts) do
    with from <- NamedPosition.to_keywords(from),
         to <- NamedPosition.to_keywords(to),
         opts <- Keyword.put_new(opts, :tags, tags(opts)) do
      @otp_module.plan(from, to, opts)
      |> parse()
    end
  end

  def tags(opts) do
    if Keyword.has_key?(opts, :arrive_by) do
      [ShortestTrip, MostDirect, LeastWalking]
    else
      [EarliestArrival, MostDirect, LeastWalking]
    end
  end

  defp parse({:error, _} = error), do: error

  defp parse({:ok, itineraries}) do
    {:ok, Enum.map(itineraries, &Parser.parse/1)}
  end

  # TODO: Move all of these functions to a more appropriate module.

  @doc """
  Group itineraries by unique legs.

  A unique leg is defined as a leg that has a unique combination of mode, from, and to.
  But, this does not include walking legs that are less than 0.2 miles.
  """
  def group(itineraries) do
    itineraries
    |> Enum.group_by(&unique_legs_to_hash/1)
    |> Enum.map(&group_departures/1)
    |> Enum.reject(&Enum.empty?(&1))
  end

  defp group_departures({_, group}) do
    group
    |> Enum.uniq_by(&itinerary_to_hash/1)
    |> Enum.map(fn group ->
      %{
        departure: group.start,
        legs: group.legs
      }
    end)
  end

  defp combined_leg_to_tuple(%TripPlan.Leg{mode: %TripPlan.PersonalDetail{}} = leg) do
    unique_leg_to_tuple(leg)
  end

  defp combined_leg_to_tuple(%TripPlan.Leg{mode: %{route: route}} = leg) do
    {route.id, leg.from.name, leg.to.name}
  end

  defp itinerary_to_hash(itinerary) do
    itinerary
    |> Map.get(:legs)
    |> Enum.reject(&short_walking_leg?/1)
    |> Enum.map(&combined_leg_to_tuple/1)
    |> :erlang.phash2()
  end

  defp short_walking_leg?(%TripPlan.Leg{mode: %TripPlan.PersonalDetail{}} = leg) do
    leg.distance <= 0.2
  end

  defp short_walking_leg?(_), do: false

  defp unique_legs_to_hash(legs) do
    legs
    |> Enum.reject(&short_walking_leg?/1)
    |> Enum.map(&unique_leg_to_tuple/1)
    |> :erlang.phash2()
  end

  defp unique_leg_to_tuple(%TripPlan.Leg{mode: %TripPlan.PersonalDetail{}} = leg) do
    {"WALK", leg.from.name, leg.to.name}
  end

  defp unique_leg_to_tuple(%TripPlan.Leg{mode: %{route: route}} = leg) do
    {Routes.Route.type_atom(route.type), leg.from.name, leg.to.name}
  end
end
