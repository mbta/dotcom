defmodule DotcomWeb.Components.TripPlanner.LegToSegmentHelperTest do
  @moduledoc false

  use ExUnit.Case, async: true

  alias Dotcom.TripPlan.{Leg, PersonalDetail, TransitDetail}
  alias DotcomWeb.Components.TripPlanner.LegToSegmentHelper

  test "works for a typical walking-transit-walking itinerary" do
    assert [
             {:walking_segment, _},
             {:transit_segment, _},
             {:walking_segment, _}
           ] =
             LegToSegmentHelper.legs_to_segments([
               %Leg{mode: %PersonalDetail{}},
               %Leg{mode: %TransitDetail{}},
               %Leg{mode: %PersonalDetail{}}
             ])
  end
end
