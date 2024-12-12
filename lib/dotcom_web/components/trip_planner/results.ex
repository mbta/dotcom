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
        <button type="button" class="btn-link">
          <span class="flex flex-row items-center">
            <.icon class="fill-brand-primary h-4 mr-2" name="chevron-left" />
            <span class="font-medium">View All Options</span>
          </span>
        </button>
      </div>
      <div :if={Enum.count(@results.itinerary_groups) > 0} class="w-full p-4 row-start-2 col-start-1">
        <div
          :if={@results.itinerary_group_selection != nil}
          class="row-start-1 col-start-1 h-min w-full p-4"
        >
          <button type="button" phx-click="reset_itinerary_group" class="btn-link">
            <span class="flex flex-row items-center">
              <.icon class="fill-brand-primary h-4 mr-2" name="chevron-left" />
              <span class="font-medium">View All Options</span>
            </span>
          </button>
        </div>
        <.itinerary_panel results={@results} />
      </div>
    </section>
    """
  end

  defp itinerary_panel(%{results: %{itinerary_group_selection: nil}} = assigns) do
    ~H"""
    <div
      :for={{%{summary: summary}, index} <- Enum.with_index(@results.itinerary_groups)}
      class="border border-solid m-4 p-4"
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
          Similar trips depart at {Enum.map(
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
    <div class="mt-30">
      <div class="border-b-[1px] border-gray-lighter">
        <.itinerary_summary summary={@summary} />
        <.itinerary_detail results={@results} />
      </div>
    </div>
    """
  end
end
