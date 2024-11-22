defmodule DotcomWeb.Components.LiveComponents.TripPlannerResultsSection do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :live_component

  import DotcomWeb.Components.TripPlanner.ItineraryDetail
  import DotcomWeb.Components.TripPlanner.ItineraryGroup, only: [itinerary_group: 1]

  def mount(_params, _session, socket) do
    {:ok, socket}
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
          <.itinerary_panel results={results} details_index={@itinerary_details_index} />
        </div>
      </.async_result>
      <.live_component
        module={MbtaMetro.Live.Map}
        id="trip-planner-map"
        class="h-96 w-full relative overflow-none"
        config={@map_config}
        pins={[@from, @to]}
      />
    </section>
    """
  end

  defp itinerary_panel(%{results: results, details_index: details_index} = assigns) do
    case details_index do
      nil ->
        ~H"""
        <.itinerary_panel_with_all_results results={@results} />
        """

      _ ->
        assigns = assign(assigns, :result, Enum.at(results, details_index))

        ~H"""
        <.itinerary_panel_with_specific_result result={@result} />
        """
    end
  end

  defp itinerary_panel_with_all_results(assigns) do
    ~H"""
    <.itinerary_group :for={{result, index} <- Enum.with_index(@results)} index={index} {result} />
    """
  end

  defp itinerary_panel_with_specific_result(%{result: result} = assigns) do
    assigns = assign(assigns, :itineraries, Map.get(result, :itineraries))

    ~H"""
    <div class="mt-30">
      <button type="button" phx-click="show_itinerary_summary" class="btn-link">
        <p class="flex flex-row items-center">
          <.icon class="fill-brand-primary h-4 mr-2" name="chevron-left" />
          <span class="font-medium">View All Options</span>
        </p>
      </button>
      <.itinerary_detail :for={itinerary <- @itineraries} itinerary={itinerary} />
    </div>
    """
  end
end
