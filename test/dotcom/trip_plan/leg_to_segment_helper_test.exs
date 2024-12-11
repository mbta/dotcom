defmodule Dotcom.TripPlan.LegToSegmentHelperTest do
  @moduledoc false

  use ExUnit.Case, async: true

  alias Dotcom.TripPlan.LegToSegmentHelper
  alias Dotcom.TripPlan.{Leg, PersonalDetail, TransitDetail}

  test "works for a typical walking-transit-walking itinerary and puts a location on either end" do
    assert [
             {:location_segment, _},
             {:walking_segment, _},
             {:transit_segment, _},
             {:walking_segment, _},
             {:location_segment, _}
           ] =
             LegToSegmentHelper.legs_to_segments([
               %Leg{mode: %PersonalDetail{}},
               %Leg{mode: %TransitDetail{}},
               %Leg{mode: %PersonalDetail{}}
             ])
  end
end
