defmodule DotcomWeb.Components.TripPlanner.Results do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.{ItineraryDetail, ItinerarySummary}

  alias Dotcom.TripPlan.{ItineraryGroup, ItineraryGroups}

  def results(assigns) do
    ~H"""
    <section
      id="trip-planner-results"
      class={[
        "w-full",
        @class
      ]}
    >
      <div
        :if={Enum.count(@results.itinerary_groups) > 0 && @results.itinerary_group_selection}
        class="h-min w-full mb-3.5"
      >
        <button type="button" phx-click="reset_itinerary_group" class="btn-link">
          <span class="flex flex-row items-center">
            <.icon class="fill-brand-primary h-4 mr-2" name="chevron-left" />
            <span class="font-medium">View All Options</span>
          </span>
        </button>
      </div>
      <div class="w-full">
        <.itinerary_panel results={@results} />
      </div>
    </section>
    """
  end

  defp itinerary_panel(%{results: %{loading?: true}} = assigns) do
    ~H"""
    <div class="flex justify-center mt-4">
      <.spinner aria_label="Waiting for results" />
    </div>
    """
  end

  # So itinerary selected - shows summary of all the results
  defp itinerary_panel(%{results: %{itinerary_group_selection: nil}} = assigns) do
    ~H"""
    <div class="flex flex-col gap-4">
      <div
        :for={{group, index} <- Enum.with_index(@results.itinerary_groups)}
        class="border border-solid border-gray-lighter p-4"
        phx-click="select_itinerary_group"
        phx-value-index={index}
      >
        <div
          :if={group.summary.tag}
          class="whitespace-nowrap leading-none font-bold font-heading text-sm uppercase bg-brand-primary-darkest text-white px-3 py-2 mb-3 -ml-4 -mt-4 rounded-br-lg w-min"
        >
          {group.summary.tag}
        </div>
        <.itinerary_summary summary={group.summary} />
        <div class="flex justify-end items-center">
          <div :if={ItineraryGroup.options_text(group)} class="grow text-sm text-grey-dark">
            {ItineraryGroup.options_text(group)}
          </div>
          <button
            class="btn-link font-semibold underline"
            phx-click="select_itinerary_group"
            phx-value-index={index}
          >
            Details
          </button>
        </div>
      </div>
    </div>
    """
  end

  # Selected group!
  defp itinerary_panel(assigns) do
    group =
      Enum.at(assigns.results.itinerary_groups, assigns.results.itinerary_group_selection)

    %ItineraryGroup{itineraries: itineraries, representative_time: time_key} = group

    itinerary = Enum.at(itineraries, assigns.results.itinerary_selection)

    assigns = %{
      all_times: Enum.map(itineraries, &Map.get(&1, time_key)),
      itinerary: itinerary,
      itinerary_selection: assigns.results.itinerary_selection,
      summary: ItineraryGroups.to_summary(itinerary, [itinerary])
    }

    ~H"""
    <div>
      <.itinerary_summary summary={@summary} />
      <div :if={Enum.count(@all_times) > 1}>
        <hr class="border-gray-lighter" />
        <p class="text-sm mb-2 mt-3">Depart at or arrive by</p>
        <div id="itinerary-detail-departure-times" class="flex flex-wrap gap-2">
          <.button
            :for={{time, index} <- Enum.with_index(@all_times)}
            type="button"
            class={if(@itinerary_selection == index, do: "bg-brand-primary-lightest")}
            size="small"
            variant="secondary"
            phx-click="select_itinerary"
            phx-value-index={index}
          >
            {Timex.format!(time, "%-I:%M%p", :strftime) |> String.downcase()}
          </.button>
        </div>
      </div>
      <.itinerary_detail itinerary={@itinerary} />
    </div>
    """
  end
end
