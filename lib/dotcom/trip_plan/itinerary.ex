defmodule Dotcom.TripPlan.Itinerary do
  @moduledoc """
  A trip at a particular time.

  An Itinerary is a single trip, with the legs being the different types of
  travel. Itineraries are separate even if they use the same modes but happen
  at different times of day.
  """

  alias Dotcom.TripPlan.Leg
  alias Fares.Fare

  @derive {Jason.Encoder, except: [:passes]}
  @enforce_keys [:start, :stop]
  defstruct [
    :duration,
    :generalized_cost,
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
          generalized_cost: non_neg_integer(),
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

  @spec transit_legs(t()) :: [Leg.t()]
  def transit_legs(%__MODULE__{legs: legs}), do: Enum.filter(legs, &Leg.transit?/1)
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
