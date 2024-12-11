defmodule DotcomWeb.Components.TripPlanner.LegToSegmentHelper do
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

  defp append_end_location([{_, leg} = last_leg]) do
    [last_leg, {:location_segment, %{time: leg.stop, place: leg.to}}]
  end

  defp append_end_location([first_leg | rest_of_legs]) do
    [first_leg | append_end_location(rest_of_legs)]
  end
end
