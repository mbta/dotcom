defmodule DotcomWeb.Components.TripPlanner.ItineraryDetail do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.StartOrEndPlace
  import DotcomWeb.Components.TripPlanner.TransitLeg, only: [transit_leg: 1]
  import DotcomWeb.Components.TripPlanner.WalkingLeg, only: [walking_leg: 1]

  alias Dotcom.TripPlan.{Alerts, LegToSegmentHelper}
  alias OpenTripPlannerClient.Schema.Itinerary

  attr :itinerary, Itinerary, required: true

  def itinerary_detail(assigns) do
    dtx_note? =
      dtx_subway_transfer?(assigns.itinerary.legs) and
        !is_nil(assigns.itinerary.accessibility_score)

    assigns =
      assigns
      |> assign_new(:alerts, fn -> Alerts.from_itinerary(assigns.itinerary) end)
      |> assign(:segments, LegToSegmentHelper.legs_to_segments(assigns.itinerary.legs))
      |> assign(:dtx_note?, dtx_note?)

    ~H"""
    <div class="mt-4">
      <.cta
        :if={@dtx_note?}
        style="background-color: #fff5bf"
        icon="triangle-exclamation"
        icon_type="solid"
      >
        {gettext(
          "Wheelchair-accessible transfers at Downtown Crossing may require <strong>exiting the fare gates.</strong> See station personnel to avoid paying an additional fare."
        )
        |> Phoenix.HTML.raw()}
      </.cta>
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

  def dtx_subway_transfer?(segments) do
    dtx_index = segments |> Enum.find_index(fn segment -> dtx_transfer?(segment) end)

    if !is_nil(dtx_index) and dtx_index > 0 and dtx_index < Enum.count(segments) - 1 do
      dtx_subway?(segments |> Enum.at(dtx_index - 1)) and
        dtx_subway?(segments |> Enum.at(dtx_index + 1))
    else
      false
    end
  end

  def dtx_transfer?(segment) do
    segment.from.stop.parent_station.gtfs_id == "mbta-ma-us:place-dwnxg" and
      segment.to.stop.parent_station.gtfs_id == "mbta-ma-us:place-dwnxg"
  end

  def dtx_subway?(segment) do
    (segment.from.stop.parent_station.gtfs_id == "mbta-ma-us:place-dwnxg" or
       segment.to.stop.parent_station.gtfs_id == "mbta-ma-us:place-dwnxg") and
      segment.mode == :SUBWAY
  end
end
