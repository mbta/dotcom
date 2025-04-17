defmodule DotcomWeb.Components.TripPlanner.Results do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.{ItineraryDetail, ItinerarySummary}

  alias OpenTripPlannerClient.ItineraryGroup
  alias OpenTripPlannerClient.Schema.Itinerary

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
        data-test={"results:itinerary_group:selected:#{@results.itinerary_group_selection}"}
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

  # When an itinerary group is selected, show a list of group summaries, each
  # optionally displaying a tag and description of alternate times
  defp itinerary_panel(%{results: %{itinerary_group_selection: nil}} = assigns) do
    ~H"""
    <.itinerary_groups indexed_groups={Enum.with_index(@results.itinerary_groups)} />
    """
  end

  # When an itinerary group is selected, show a summary & details for the
  # default selected itinerary from that group, along with buttons for selecting
  # from all available times in the group
  defp itinerary_panel(assigns) do
    itinerary_group =
      Enum.at(assigns.results.itinerary_groups, assigns.results.itinerary_group_selection)

    itinerary = itinerary_group.itineraries |> Enum.at(assigns.results.itinerary_selection)

    assigns = %{
      accessible?: Itinerary.accessible?(itinerary),
      all_times: ItineraryGroup.all_times(itinerary_group),
      itinerary: itinerary,
      itinerary_selection: assigns.results.itinerary_selection,
      time_label: if(itinerary_group.time_key == :end, do: "Arrive by", else: "Depart at"),
      summarized_legs: ItineraryGroup.leg_summaries(itinerary_group)
    }

    ~H"""
    <div data-test={"itinerary_detail:selected:#{@itinerary_selection}"}>
      <.itinerary_summary
        itinerary={@itinerary}
        summarized_legs={@summarized_legs}
        accessible?={@accessible?}
      />
      <div :if={Enum.count(@all_times) > 1}>
        <hr class="border-gray-lighter" />
        <p class="text-sm mb-2 mt-3">{@time_label}</p>
        <div id="itinerary-detail-departure-times" class="flex flex-wrap gap-2">
          <.button
            :for={{time, index} <- Enum.with_index(@all_times)}
            type="button"
            class={if(@itinerary_selection == index, do: "bg-brand-primary-lightest")}
            size="small"
            variant="secondary"
            phx-click="select_itinerary"
            phx-value-index={index}
            data-test={"itinerary_detail:#{index}"}
          >
            {Util.kitchen_downcase_time(time)}
          </.button>
        </div>
      </div>
      <.itinerary_detail itinerary={@itinerary} />
    </div>
    """
  end

  attr(:indexed_groups, :list, required: true, doc: "Indexed list of `%ItineraryGroup{}`")

  defp itinerary_groups(assigns) do
    assigns =
      assign(assigns, %{
        summarized_groups:
          Enum.map(assigns.indexed_groups, fn {group, index} ->
            itinerary = ItineraryGroup.representative_itinerary(group)

            {%{
               accessible?: Itinerary.accessible?(itinerary),
               alternatives_text: ItineraryGroup.alternatives_text(group),
               tag: itinerary[:tag],
               representative_itinerary: itinerary,
               summarized_legs: ItineraryGroup.leg_summaries(group)
             }, index}
          end)
      })

    ~H"""
    <div class="flex flex-col gap-4">
      <div
        :for={{group, index} <- @summarized_groups}
        class="border border-solid border-gray-lighter p-4"
        phx-click="select_itinerary_group"
        phx-value-index={index}
        data-test={"results:itinerary_group:#{index}"}
      >
        <div
          :if={group.tag}
          class="whitespace-nowrap leading-none font-bold font-heading text-sm uppercase bg-brand-primary-darkest text-white px-3 py-2 mb-3 -ml-4 -mt-4 rounded-br-lg w-min"
        >
          {Phoenix.Naming.humanize(group.tag)}
        </div>
        <.itinerary_summary
          accessible?={group.accessible?}
          summarized_legs={group.summarized_legs}
          itinerary={group.representative_itinerary}
        />
        <div class="flex justify-end items-center">
          <div :if={group.alternatives_text} class="grow text-sm text-grey-dark">
            {group.alternatives_text}
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
end
