defmodule DotcomWeb.Components.LiveComponents.TripPlannerResultsSection do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :live_component

  import DotcomWeb.Components.TripPlanner.{ItineraryDetail, ItinerarySummary}
  import DotcomWeb.Components.TripPlanner.ItineraryGroup, only: [itinerary_group: 1]

  @impl true
  def mount(socket) do
    {:ok, socket |> assign(:expanded_itinerary_index, nil)}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <section class="flex w-full border border-solid border-slate-400">
      <div :if={@error} class="w-full p-4 text-rose-400">
        <%= inspect(@error) %>
      </div>
      <.async_result :let={results} assign={@results}>
        <div :if={results} class="w-full p-4">
          <.itinerary_panel
            results={results}
            details_index={@expanded_itinerary_index}
            target={@myself}
          />
        </div>
      </.async_result>
      <.map
        map_config={@map_config}
        from={@from}
        to={@to}
      />
    </section>
    """
  end

  defp itinerary_panel(%{details_index: nil} = assigns) do
    ~H"""
    <.itinerary_group
      :for={{result, index} <- Enum.with_index(@results)}
      index={index}
      details_click_event="set_expanded_itinerary_index"
      target={@target}
      {result}
    />
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
      <button
        type="button"
        phx-click="set_expanded_itinerary_index"
        phx-value-index="nil"
        phx-target={@target}
        class="btn-link"
      >
        <p class="flex flex-row items-center">
          <.icon class="fill-brand-primary h-4 mr-2" name="chevron-left" />
          <span class="font-medium">View All Options</span>
        </p>
      </button>

      <div class="border-b-[1px] border-gray-lighter">
        <.itinerary_summary summary={@summary} />
      </div>

      <.itinerary_detail :for={itinerary <- @itineraries} itinerary={itinerary} />
    </div>
    """
  end

  defp map(assigns) do
    ~H"""
    <.live_component
      module={MbtaMetro.Live.Map}
      id="trip-planner-map"
      class="h-96 w-full relative overflow-none"
      config={@map_config}
      pins={[@from, @to]}
    />
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
end
