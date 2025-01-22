defmodule Dotcom.TripPlan.Itinerary do
  @moduledoc """
  A trip at a particular time.

  An Itinerary is a single trip, with the legs being the different types of
  travel. Itineraries are separate even if they use the same modes but happen
  at different times of day.
  """

  alias Dotcom.TripPlan.Leg
  alias Dotcom.TripPlan.NamedPosition
  alias Dotcom.TripPlan.TransitDetail
  alias Fares.Fare
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  @derive {Jason.Encoder, except: [:passes]}
  @enforce_keys [:start, :stop]
  defstruct [
    :duration,
    :start,
    :stop,
    :passes,
    :tag,
    :walk_distance,
    legs: [],
    accessible?: false
  ]

  @type t :: %__MODULE__{
          duration: non_neg_integer(),
          start: DateTime.t(),
          stop: DateTime.t(),
          legs: [Leg.t()],
          accessible?: boolean | nil,
          passes: passes(),
          walk_distance: float(),
          tag: OpenTripPlannerClient.ItineraryTag.tag()
        }

  @type passes :: %{
          base_month_pass: Fare.t(),
          recommended_month_pass: Fare.t(),
          reduced_month_pass: Fare.t()
        }

  @spec destination(t) :: NamedPosition.t()
  def destination(%__MODULE__{legs: legs}) do
    List.last(legs).to
  end

  @spec transit_legs(t()) :: [Leg.t()]
  def transit_legs(%__MODULE__{legs: legs}), do: Enum.filter(legs, &Leg.transit?/1)

  @doc "Return a list of all the route IDs used for this Itinerary"
  @spec route_ids(t) :: [Route.id_t()]
  def route_ids(%__MODULE__{legs: legs}) do
    flat_map_over_legs(legs, &Leg.route_id/1)
  end

  @doc "Return a list of all the trip IDs used for this Itinerary"
  @spec trip_ids(t) :: [Trip.id_t()]
  def trip_ids(%__MODULE__{legs: legs}) do
    flat_map_over_legs(legs, &Leg.trip_id/1)
  end

  @doc "Return a list of {route ID, trip ID} pairs for this Itinerary"
  @spec route_trip_ids(t) :: [{Route.id_t(), Trip.id_t()}]
  def route_trip_ids(%__MODULE__{legs: legs}) do
    flat_map_over_legs(legs, &Leg.route_trip_ids/1)
  end

  @doc "Returns a list of all the named positions for this Itinerary"
  @spec positions(t) :: [NamedPosition.t()]
  def positions(%__MODULE__{legs: legs}) do
    Enum.flat_map(legs, &[&1.from, &1.to])
  end

  @doc "Return a list of all the stop IDs used for this Itinerary"
  @spec stop_ids(t) :: [Trip.id_t()]
  def stop_ids(%__MODULE__{} = itinerary) do
    itinerary
    |> positions()
    |> Enum.map(& &1.stop.id)
    |> Enum.uniq()
  end

  @doc "Total walking distance over all legs, in meters"
  @spec walking_distance(t) :: float
  def walking_distance(itinerary) do
    itinerary
    |> Enum.map(&Leg.walking_distance/1)
    |> Enum.sum()
    |> Float.round(2)
  end

  @doc "Return a lost of all of the "
  @spec intermediate_stop_ids(t) :: [Stop.id_t()]
  def intermediate_stop_ids(itinerary) do
    itinerary
    |> Enum.flat_map(&leg_intermediate/1)
    |> Enum.reject(&is_nil/1)
    |> Enum.uniq()
  end

  defp flat_map_over_legs(legs, mapper) do
    for leg <- legs, {:ok, value} <- leg |> mapper.() |> List.wrap() do
      value
    end
  end

  defp leg_intermediate(%Leg{mode: %TransitDetail{intermediate_stops: stops}}) do
    stops
    |> Enum.reject(&is_nil/1)
    |> Enum.map(& &1.id)
  end

  defp leg_intermediate(_) do
    []
  end
end

defimpl Enumerable, for: Dotcom.TripPlan.Itinerary do
  alias Dotcom.TripPlan.Leg

  def count(_itinerary) do
    {:error, __MODULE__}
  end

  def member?(_itinerary, %Leg{}) do
    {:error, __MODULE__}
  end

  def member?(_itinerary, _other) do
    {:ok, false}
  end

  def reduce(%{legs: legs}, acc, fun) do
    Enumerable.reduce(legs, acc, fun)
  end

  def slice(_itinerary) do
    {:error, __MODULE__}
  end
end
