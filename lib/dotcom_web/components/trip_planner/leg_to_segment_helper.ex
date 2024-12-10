defmodule DotcomWeb.Components.TripPlanner.LegToSegmentHelper do
  alias Dotcom.TripPlan.{PersonalDetail, TransitDetail}

  def legs_to_segments(legs) do
    Enum.map(legs, &to_segment/1)
  end

  defp to_segment(%{mode: %PersonalDetail{}} = leg) do
    {:walking_segment, leg}
  end

  defp to_segment(%{mode: %TransitDetail{}} = leg) do
    {:transit_segment, leg}
  end
end
