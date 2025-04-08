defmodule Dotcom.TripPlan.ItineraryGroup do
  @moduledoc """
  A single group of related itineraries
  """

  alias Dotcom.TripPlan.Itinerary

  defstruct [:itineraries, :representative_index, :representative_time_key, :summary]

  @type summarized_leg :: %{
          routes: [Routes.Route.t()],
          walk_minutes: non_neg_integer()
        }

  @type summary :: %{
          accessible?: boolean() | nil,
          duration: non_neg_integer(),
          start: DateTime.t(),
          stop: DateTime.t(),
          summarized_legs: [summarized_leg()],
          tag: String.t(),
          total_cost: non_neg_integer(),
          unavailable?: boolean(),
          walk_distance: float()
        }

  @type t :: %__MODULE__{
          itineraries: [Itinerary.t()],
          representative_index: non_neg_integer(),
          representative_time_key: :start | :stop,
          summary: summary()
        }

  @doc """
  List of either start times or stop times for this group
  """
  @spec options_text(t()) :: String.t() | nil
  def options_text(%__MODULE__{itineraries: []}), do: nil
  def options_text(%__MODULE__{itineraries: [_single]}), do: nil

  def options_text(
        %__MODULE__{
          representative_index: representative_index,
          representative_time_key: start_or_stop
        } =
          group
      ) do
    other_times =
      group
      |> all_times()
      |> List.delete_at(representative_index)

    phrase = options_phrase(start_or_stop, Enum.count(other_times))

    formatted_times =
      other_times
      |> Enum.map_join(", ", &Timex.format!(&1, "%-I:%M", :strftime))

    "Similar #{phrase} #{formatted_times}"
  end

  defp options_phrase(:stop, 1), do: "trip arrives at"
  defp options_phrase(:stop, _), do: "trips arrive at"
  defp options_phrase(:start, 1), do: "trip departs at"
  defp options_phrase(_, _), do: "trips depart at"

  @doc """
  List of either start times or stop times for this group
  """
  @spec all_times(t()) :: [DateTime.t()]
  def all_times(%__MODULE__{itineraries: itineraries, representative_time_key: start_or_stop}) do
    Enum.map(itineraries, &Map.get(&1, start_or_stop))
  end
end
