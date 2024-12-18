defmodule DotcomWeb.Components.TripPlanner.ItineraryDetail do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.Place
  import DotcomWeb.Components.TripPlanner.TransitLeg, only: [transit_leg: 1]
  import DotcomWeb.Components.TripPlanner.WalkingLeg, only: [walking_leg: 1]

  alias Dotcom.TripPlan.LegToSegmentHelper
  alias Dotcom.TripPlan.Alerts

  def itinerary_detail(assigns) do
    itinerary_group =
      Enum.at(assigns.results.itinerary_groups, assigns.results.itinerary_group_selection || 0)

    itinerary = Enum.at(itinerary_group.itineraries, assigns.results.itinerary_selection || 0)

    assigns = %{
      itinerary: itinerary,
      itinerary_selection: assigns.results.itinerary_selection,
      itineraries: itinerary_group.itineraries
    }

    ~H"""
    <div>
      <.depart_at_buttons itineraries={@itineraries} itinerary_selection={@itinerary_selection} />
      <.specific_itinerary_detail itinerary={@itinerary} />
    </div>
    """
  end

  defp depart_at_buttons(assigns) do
    ~H"""
    <div :if={Enum.count(@itineraries) > 1}>
      <p class="text-sm mb-2 mt-3">Depart at</p>
      <div id="itinerary-detail-departure-times" class="flex flex-wrap gap-2">
        <.depart_at_button
          :for={{itinerary, index} <- Enum.with_index(@itineraries)}
          active={@itinerary_selection == index}
          phx-click="select_itinerary"
          phx-value-index={index}
        >
          {Timex.format!(itinerary.start, "%-I:%M%p", :strftime)}
        </.depart_at_button>
      </div>
    </div>
    """
  end

  attr :active, :boolean
  attr :rest, :global
  slot :inner_block

  defp depart_at_button(%{active: active} = assigns) do
    background_class = if active, do: "bg-brand-primary-lightest", else: "bg-transparent"
    assigns = assign(assigns, :background_class, background_class)

    ~H"""
    <button
      type="button"
      class={[
        "border border-brand-primary rounded px-2.5 py-1.5 text-brand-primary text-lg",
        "hover:bg-brand-primary-lightest #{@background_class}"
      ]}
      {@rest}
    >
      {render_slot(@inner_block)}
    </button>
    """
  end

  defp specific_itinerary_detail(assigns) do
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
    <.place place={@place} time={@time} />
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
