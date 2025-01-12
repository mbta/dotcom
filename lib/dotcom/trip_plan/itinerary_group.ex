defmodule Dotcom.TripPlan.ItineraryGroup do
  @moduledoc """
  A single group of related itineraries
  """

  alias Dotcom.TripPlan.Itinerary

  defstruct [:itineraries, :representative_index, :representative_time, :summary]

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
          walk_distance: float()
        }

  # 3maybe add whether the times are deparutures or arrivsls
  # maybe options text belongs there
  @type t :: %__MODULE__{
          itineraries: [Itinerary.t()],
          representative_index: non_neg_integer(),
          representative_time: :start | :stop,
          summary: summary()
        }

  def options_text(%__MODULE__{itineraries: []}), do: nil
  def options_text(%__MODULE__{itineraries: [_single]}), do: nil

  def options_text(
        %__MODULE__{representative_index: representative_index, representative_time: time_key} =
          group
      ) do
    {_, other_times} =
      group
      |> all_times()
      |> List.pop_at(representative_index)

    phrase = options_phrase(time_key == :stop, Enum.count(other_times))

    formatted_times =
      other_times
      |> Enum.map(&Timex.format!(&1, "%-I:%M", :strftime))
      |> Enum.join(", ")

    "Similar #{phrase} #{formatted_times}"
  end

  defp options_phrase(true, 1), do: "trip arrives by"
  defp options_phrase(true, _), do: "trips arrive by"
  defp options_phrase(false, 1), do: "trip departs at"
  defp options_phrase(_, _), do: "trips depart at"

  def all_times(%__MODULE__{itineraries: itineraries, representative_time: time_key}) do
    Enum.map(itineraries, &Map.get(&1, time_key))
  end
end
