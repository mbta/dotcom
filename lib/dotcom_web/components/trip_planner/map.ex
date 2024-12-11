defmodule DotcomWeb.Components.TripPlanner.Map do

  use DotcomWeb, :component

  alias Dotcom.TripPlan.Map

  @config Application.compile_env!(:mbta_metro, :map)

  def map(assigns) do
    assigns =
      assigns
      |> assign(:config, @config)
      |> assign(:pins, input_form_to_pins(assigns.input_form))
      |> IO.inspect()

    ~H"""
    <.live_component
      module={MbtaMetro.Live.Map}
      id="trip-planner-map"
      class="h-64 md:h-96 w-full"
      config={@config}
      pins={@pins}
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

  defp input_form_to_pins(foo) do
    []
  end

  defp results_to_lines(%{itinerary_group_selection: nil}), do: []

  defp results_to_lines(%{itinerary_groups: itinerary_groups}), do: []

  defp results_to_lines(%{itinerary_groups: []}), do: []

  defp results_to_points(%{itinerary_group_selection: nil}), do: []

  defp results_to_points(%{itinerary_groups: itinerary_groups}), do: []

  defp results_to_points(%{itinerary_groups: []}), do: []
end
