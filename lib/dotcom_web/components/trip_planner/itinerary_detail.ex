defmodule DotcomWeb.Components.TripPlanner.ItineraryDetail do
  @moduledoc """
  A component to render an itinerary in detail..
  """
  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.Leg

  alias Dotcom.TripPlan.PersonalDetail

  def itinerary_detail(assigns) do
    assigns =
      assign(
        assigns,
        :all_routes,
        assigns.itinerary.legs
        |> Enum.reject(&match?(%PersonalDetail{}, &1.mode))
        |> Enum.map(& &1.mode.route)
      )

    ~H"""
    <details class="mt-4">
      <summary class="border border-2 border-brand-primary px-3 py-2 flex items-center hover:border-brand-primary-darkest hover:bg-gray-lighter">
        Depart at <%= Timex.format!(@itinerary.start, "%-I:%M%p", :strftime) %>
        <.route_symbol :for={route <- @all_routes} route={route} class="ml-2" />
      </summary>
      <div :for={leg <- @itinerary.legs}>
        <.leg
          start_time={leg.start}
          end_time={leg.stop}
          from={leg.from}
          to={leg.to}
          mode={leg.mode}
          realtime={leg.realtime}
          realtime_state={leg.realtime_state}
        />
      </div>
    </details>
    """
  end
end
