defmodule Dotcom.TripPlan.LegToSegmentHelperTest do
  @moduledoc false

  use ExUnit.Case, async: true

  alias Dotcom.TripPlan.Leg
  alias Dotcom.TripPlan.LegToSegmentHelper
  alias Dotcom.TripPlan.PersonalDetail
  alias Dotcom.TripPlan.TransitDetail

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

  test "does not prepend location if the first segment is transit" do
    assert [
             {:transit_segment, _},
             {:walking_segment, _},
             {:location_segment, _}
           ] =
             LegToSegmentHelper.legs_to_segments([
               %Leg{mode: %TransitDetail{}},
               %Leg{mode: %PersonalDetail{}}
             ])
  end

  test "does not append location if the last segment is transit" do
    assert [
             {:location_segment, _},
             {:walking_segment, _},
             {:transit_segment, _}
           ] =
             LegToSegmentHelper.legs_to_segments([
               %Leg{mode: %PersonalDetail{}},
               %Leg{mode: %TransitDetail{}}
             ])
  end

  test "works if there is just one transit leg" do
    assert [
             {:transit_segment, _}
           ] =
             LegToSegmentHelper.legs_to_segments([
               %Leg{mode: %TransitDetail{}}
             ])
  end
end
