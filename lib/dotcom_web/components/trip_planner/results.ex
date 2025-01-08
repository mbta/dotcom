defmodule DotcomWeb.Components.TripPlanner.Results do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.{ItineraryDetail, ItinerarySummary}

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

  defp itinerary_panel(%{results: %{itinerary_group_selection: nil}} = assigns) do
    ~H"""
    <div class="flex flex-col gap-4">
      <div
        :for={{%{summary: summary}, index} <- Enum.with_index(@results.itinerary_groups)}
        class="border border-solid border-gray-lighter p-4"
        phx-click="select_itinerary_group"
        phx-value-index={index}
      >
        <div
          :if={summary.tag}
          class="whitespace-nowrap leading-none font-bold font-heading text-sm uppercase bg-brand-primary-darkest text-white px-3 py-2 mb-3 -ml-4 -mt-4 rounded-br-lg w-min"
        >
          {summary.tag}
        </div>
        <.itinerary_summary summary={summary} />
        <div class="flex justify-end items-center">
          <div :if={Enum.count(summary.next_starts) > 0} class="grow text-sm text-grey-dark">
            Similar {if(Enum.count(summary.next_starts) == 1,
              do: "trip departs",
              else: "trips depart"
            )} at {Enum.map(
              summary.next_starts,
              &Timex.format!(&1, "%-I:%M", :strftime)
            )
            |> Enum.join(", ")}
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

  defp itinerary_panel(assigns) do
    itinerary_group =
      Enum.at(assigns.results.itinerary_groups, assigns.results.itinerary_group_selection)

    assigns = %{
      summary: itinerary_group.summary,
      results: assigns.results
    }

    ~H"""
    <div>
      <.itinerary_summary summary={@summary} />
      <.itinerary_detail results={@results} />
    </div>
    """
  end
end
