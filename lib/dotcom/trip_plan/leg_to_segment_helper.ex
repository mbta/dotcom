defmodule Dotcom.TripPlan.LegToSegmentHelper do
  @moduledoc """
  A simple algorithm to convert legs as returned by Open Trip Planner
  into segments to be displayed by our trip planner tool.
  """

  alias OpenTripPlannerClient.Schema.{Leg, LegTime}

  def legs_to_segments(legs) do
    legs
    |> raw_convert_to_segments()
    |> prepend_start_location()
    |> append_end_location()
  end

  defp raw_convert_to_segments(legs) do
    Enum.map(legs, &to_segment/1)
  end

  defp to_segment(%Leg{transit_leg: false} = leg) do
    {:walking_segment, leg}
  end

  defp to_segment(%Leg{transit_leg: true} = leg) do
    {:transit_segment, leg}
  end

  defp prepend_start_location([{:transit_segment, _} | _] = segments) do
    segments
  end

  defp prepend_start_location([{_, leg} | _] = segments) do
    [
      {:location_segment, %{time: LegTime.time(leg.start), place: leg.from}}
      | segments
    ]
  end

  defp append_end_location([{:transit_segment, _} = last_segment]) do
    [last_segment]
  end

  defp append_end_location([{_, leg} = last_segment]) do
    [last_segment, {:location_segment, %{time: LegTime.time(leg.end), place: leg.to}}]
  end

  defp append_end_location([first_segment | rest_of_segments]) do
    [first_segment | append_end_location(rest_of_segments)]
  end
end
