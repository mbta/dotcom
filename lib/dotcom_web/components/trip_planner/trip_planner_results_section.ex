defmodule DotcomWeb.Components.TripPlanner.TripPlannerResultsSection do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.{ItineraryDetail, ItinerarySummary}

  alias Dotcom.TripPlan

  def trip_planner_results_section(
        %{itinerary_selection: itinerary_selection, results: itinerary_results} = assigns
      ) do
    assigns =
      if itinerary_results.result && itinerary_selection != :summary do
        {:detail,
         %{itinerary_group_index: itinerary_group_index, itinerary_index: itinerary_index}} =
          itinerary_selection

        itinerary =
          Enum.at(itinerary_results.result, itinerary_group_index).itineraries
          |> Enum.at(itinerary_index)

        itinerary_map = TripPlan.Map.itinerary_map(itinerary)
        lines = TripPlan.Map.get_lines(itinerary_map)
        points = TripPlan.Map.get_points(itinerary_map)

        assign(assigns, %{lines: lines, points: points})
      else
        assign(assigns, %{lines: [], points: []})
      end

    ~H"""
    <section class={[
      "flex flex-col",
      "md:grid md:grid-rows-[min-content_1fr]",
      @results.result == nil && "md:grid-cols-[1fr]",
      @results.result != nil && "md:grid-cols-[1fr_1fr]",
      "w-full",
      "border border-solid border-slate-400"
    ]}>
      <div :if={@error} class="w-full p-4 text-rose-400">
        {inspect(@error)}
      </div>
      <.async_result :let={results} assign={@results}>
        <div
          :if={results && @itinerary_selection != :summary}
          class="row-start-1 col-start-1 h-min w-full p-4"
        >
          <button
            type="button"
            phx-click="set_itinerary_group_index"
            phx-value-index="nil"
            class="btn-link"
          >
            <span class="flex flex-row items-center">
              <.icon class="fill-brand-primary h-4 mr-2" name="chevron-left" />
              <span class="font-medium">View All Options</span>
            </span>
          </button>
        </div>
      </.async_result>

      <.live_component
        module={MbtaMetro.Live.Map}
        id="trip-planner-map"
        class={[
          "h-64 md:h-96 w-full",
          "relative overflow-none row-span-2",
          @itinerary_selection == :summary && "hidden md:block"
        ]}
        config={@map_config}
        lines={@lines}
        pins={[@from, @to]}
        points={@points}
      />

      <.async_result :let={results} assign={@results}>
        <div :if={results} class="w-full p-4 row-start-2 col-start-1">
          <.itinerary_panel results={results} itinerary_selection={@itinerary_selection} />
        </div>
      </.async_result>
    </section>
    """
  end

  defp itinerary_panel(
         %{
           results: results,
           itinerary_selection:
             {:detail,
              %{
                itinerary_group_index: itinerary_group_index,
                itinerary_index: itinerary_index
              }}
         } = assigns
       ) do
    %{itineraries: itineraries, summary: summary} = results |> Enum.at(itinerary_group_index)

    assigns =
      assigns
      |> assign(:itineraries, itineraries)
      |> assign(:summary, summary)
      |> assign(:itinerary_index, itinerary_index)

    ~H"""
    <div class="mt-30">
      <div class="border-b-[1px] border-gray-lighter">
        <.itinerary_summary summary={@summary} />
      </div>

      <.itinerary_detail
        itineraries={@itineraries}
        selected_itinerary_detail_index={@itinerary_index}
      />
    </div>
    """
  end

  defp itinerary_panel(assigns) do
    ~H"""
    <div
      :for={{%{summary: summary}, index} <- Enum.with_index(@results)}
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
          Similar trips depart at {Enum.map(summary.next_starts, &format_datetime_short/1)
          |> Enum.join(", ")}
        </div>
        <button
          class="btn-link font-semibold underline"
          phx-click="set_itinerary_group_index"
          phx-value-index={index}
        >
          Details
        </button>
      </div>
    </div>
    """
  end

  defp format_datetime_short(datetime) do
    Timex.format!(datetime, "%-I:%M", :strftime)
  end
end
