defmodule Dotcom.TripPlan.LegToSegmentHelper do
  @moduledoc """
  A simple algorithm to convert legs as returned by Open Trip Planner
  into segments to be displayed by our trip planner tool.
  """

  alias Dotcom.TripPlan.{PersonalDetail, TransitDetail}

  def legs_to_segments(legs) do
    legs
    |> raw_convert_to_segments()
    |> prepend_start_location()
    |> append_end_location()
  end

  defp raw_convert_to_segments(legs) do
    Enum.map(legs, &to_segment/1)
  end

  defp to_segment(%{mode: %PersonalDetail{}} = leg) do
    {:walking_segment, leg}
  end

  defp to_segment(%{mode: %TransitDetail{}} = leg) do
    {:transit_segment, leg}
  end

  defp prepend_start_location([{_, leg} | _] = segments) do
    [
      {:location_segment, %{time: leg.start, place: leg.from}}
      | segments
    ]
  end

  defp append_end_location([{_, leg} = last_segment]) do
    [last_segment, {:location_segment, %{time: leg.stop, place: leg.to}}]
  end

  defp append_end_location([first_segment | rest_of_segments]) do
    [first_segment | append_end_location(rest_of_segments)]
  end
end
