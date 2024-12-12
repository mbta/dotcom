defmodule DotcomWeb.Components.TripPlanner.Results do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.{ItineraryDetail, ItinerarySummary}

  alias Dotcom.TripPlan

  def results(assigns) do
    ~H"""
    <section class={[
      "flex flex-col",
      "md:grid md:grid-rows-[min-content_1fr]",
      Enum.count(@results.itinerary_groups) == 0 && "md:grid-cols-[1fr]",
      Enum.count(@results.itinerary_groups) != 0 && "md:grid-cols-[1fr_1fr]",
      "w-full",
      "border border-solid border-slate-400"
    ]}>
      <div
        :if={Enum.count(@results.itinerary_groups) > 0 && @results.itinerary_selection}
        class="row-start-1 col-start-1 h-min w-full p-4"
      >
        <button
          type="button"
          class="btn-link"
        >
          <span class="flex flex-row items-center">
            <.icon class="fill-brand-primary h-4 mr-2" name="chevron-left" />
            <span class="font-medium">View All Options</span>
          </span>
        </button>
      </div>
      <div :if={Enum.count(@results.itinerary_groups) > 0} class="w-full p-4 row-start-2 col-start-1">
      </div>
    </section>
    """
  end
end
