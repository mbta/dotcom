defmodule DotcomWeb.Components.LiveComponents.TripPlannerResultsSection do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :live_component

  import DotcomWeb.Components.TripPlanner.{ItineraryDetail, ItinerarySummary}

  @impl true
  def mount(socket) do
    {:ok, socket |> assign(:expanded_itinerary_index, nil)}
  end

  @impl true
  def render(assigns) do
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
        <%= inspect(@error) %>
      </div>
      <.async_result :let={results} assign={@results}>
        <div
          :if={results && @expanded_itinerary_index}
          class="row-start-1 col-start-1 h-min w-full p-4"
        >
          <button
            type="button"
            phx-click="set_expanded_itinerary_index"
            phx-value-index="nil"
            phx-target={@myself}
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
          @expanded_itinerary_index == nil && "hidden md:block"
        ]}
        config={@map_config}
        pins={[@from, @to]}
      />

      <.async_result :let={results} assign={@results}>
        <div :if={results} class="w-full p-4 row-start-2 col-start-1">
          <.itinerary_panel
            results={results}
            details_index={@expanded_itinerary_index}
            target={@myself}
          />
        </div>
      </.async_result>
    </section>
    """
  end

  defp itinerary_panel(%{details_index: nil} = assigns) do
    ~H"""
    <div
      :for={{%{summary: summary}, index} <- Enum.with_index(@results)}
      class="border border-solid m-4 p-4"
    >
      <div
        :if={summary.tag}
        class="whitespace-nowrap leading-none font-bold font-heading text-sm uppercase bg-brand-primary-darkest text-white px-3 py-2 mb-3 -ml-4 -mt-4 rounded-br-lg w-min"
      >
        <%= summary.tag %>
      </div>
      <.itinerary_summary summary={summary} />
      <div class="flex justify-end items-center">
        <div :if={Enum.count(summary.next_starts) > 0} class="grow text-sm text-grey-dark">
          Similar trips depart at <%= Enum.map(summary.next_starts, &format_datetime_short/1)
          |> Enum.join(", ") %>
        </div>
        <button
          class="btn-link font-semibold underline"
          phx-click="set_expanded_itinerary_index"
          phx-target={@target}
          phx-value-index={index}
        >
          Details
        </button>
      </div>
    </div>
    """
  end

  defp itinerary_panel(%{results: results, details_index: details_index} = assigns) do
    result = results |> Enum.at(details_index)

    assigns =
      assigns
      |> assign(:itineraries, result |> Map.get(:itineraries))
      |> assign(:summary, result |> Map.get(:summary))

    ~H"""
    <div class="mt-30">
      <div class="border-b-[1px] border-gray-lighter">
        <.itinerary_summary summary={@summary} />
      </div>

      <.itinerary_detail :for={itinerary <- @itineraries} itinerary={itinerary} />
    </div>
    """
  end

  defp itinerary_panel(assigns) do
    inspect(assigns) |> Sentry.capture_message(tags: %{feature: "Trip Planner"})

    ~H"""
    <div>Error loading planned trips</div>
    """
  end

  @impl true
  def handle_event("set_expanded_itinerary_index", %{"index" => index_str}, socket) do
    index =
      case Integer.parse(index_str) do
        {index, ""} -> index
        _ -> nil
      end

    {:noreply, socket |> assign(:expanded_itinerary_index, index)}
  end

  defp format_datetime_short(datetime) do
    Timex.format!(datetime, "%-I:%M", :strftime)
  end
end
