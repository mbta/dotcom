defmodule DotcomWeb.Components.TripPlanner.Map do

  use DotcomWeb, :component

  alias Dotcom.TripPlan

  @config Application.compile_env!(:mbta_metro, :map)

  def map(assigns) do
    assigns =
      assigns
      |> assign(:config, @config)
      |> assign(:lines, results_to_lines(assigns.results))
      |> assign(:pins, input_form_to_pins(assigns.input_form))
      |> assign(:points, results_to_points(assigns.results))

    ~H"""
    <.live_component
      module={MbtaMetro.Live.Map}
      id="trip-planner-map"
      class="h-64 md:h-96 w-full"
      config={@config}
      lines={@lines}
      pins={@pins}
      points={@pins}
    />
    """
  end

  defp to_geojson(%{longitude: longitude, latitude: latitude}) do
    [longitude, latitude]
  end

  defp to_geojson(_) do
    []
  end

  defp input_form_to_pins(%{changes: %{from: from, to: to}}) do
    [to_geojson(from.changes), to_geojson(to.changes)]
  end

  defp input_form_to_pins(%{changes: %{from: from}}) do
    [to_geojson(from.changes)]
  end

  defp input_form_to_pins(%{changes: %{to: to}}) do
    [[], to_geojson(to.changes)]
  end

  defp input_form_to_pins(_), do: []

  defp results_to_lines(%Phoenix.LiveView.AsyncResult{ok?: false}), do: []

  defp results_to_lines(%Phoenix.LiveView.AsyncResult{result: %{itinerary_group_selection: nil}}), do: []

  defp results_to_lines(%Phoenix.LiveView.AsyncResult{result: %{itinerary_groups: []}}), do: []

  defp results_to_lines(%Phoenix.LiveView.AsyncResult{result: result}) do
    result.itinerary_groups
    |> Enum.at(result.itinerary_group_selection)
    |> TripPlan.Map.itinerary_map()
    |> TripPlan.Map.get_lines()
  end

  defp results_to_lines(_), do: []

  defp results_to_points(%Phoenix.LiveView.AsyncResult{ok?: false}), do: []

  defp results_to_points(%Phoenix.LiveView.AsyncResult{result: %{itinerary_group_selection: nil}}), do: []

  defp results_to_points(%Phoenix.LiveView.AsyncResult{result: %{itinerary_groups: []}}), do: []

  defp results_to_points(%Phoenix.LiveView.AsyncResult{result: result}) do
    result.itinerary_groups
    |> Enum.at(result.itinerary_group_selection)
    |> TripPlan.Map.itinerary_map()
    |> TripPlan.Map.get_points()
  end

  defp results_to_points(_), do: []
end
