defmodule DotcomWeb.Components.TripPlanner.ItineraryDetail do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.StartOrEndPlace
  import DotcomWeb.Components.TripPlanner.TransitLeg, only: [transit_leg: 1]
  import DotcomWeb.Components.TripPlanner.WalkingLeg, only: [walking_leg: 1]

  alias Dotcom.TripPlan.LegToSegmentHelper
  alias Dotcom.TripPlan.Alerts

  def itinerary_detail(assigns) do
    assigns =
      assigns
      |> assign_new(:alerts, fn -> Alerts.from_itinerary(assigns.itinerary) end)
      |> assign(:segments, LegToSegmentHelper.legs_to_segments(assigns.itinerary.legs))

    ~H"""
    <div class="mt-4">
      <div :for={segment <- @segments}>
        <.segment segment={segment} alerts={@alerts} />
      </div>
    </div>
    """
  end

  defp segment(%{segment: {:location_segment, %{time: time, place: place}}} = assigns) do
    assigns =
      assigns
      |> assign(:time, time)
      |> assign(:place, place)

    ~H"""
    <.start_or_end_place place={@place} time={@time} />
    """
  end

  defp segment(%{segment: {:walking_segment, leg}} = assigns) do
    assigns = assign(assigns, :leg, leg)

    ~H"""
    <.walking_leg leg={@leg} />
    """
  end

  defp segment(%{segment: {:transit_segment, leg}} = assigns) do
    assigns = assign(assigns, :leg, leg)

    ~H"""
    <.transit_leg leg={@leg} alerts={Alerts.filter_for_leg(@alerts, @leg)} />
    """
  end
end
