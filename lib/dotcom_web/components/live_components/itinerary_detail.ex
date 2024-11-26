defmodule DotcomWeb.Components.LiveComponents.ItineraryDetail do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :live_component

  import DotcomWeb.Components.TripPlanner.Leg

  alias Dotcom.TripPlan.PersonalDetail

  @impl true
  def mount(socket) do
    {:ok, socket |> assign(:selected_trip_index, 0)}
  end

  @impl true
  def render(%{itineraries: itineraries, selected_trip_index: selected_trip_index} = assigns) do
    assigns =
      assigns
      |> assign(:selected_itinerary, Enum.at(itineraries, selected_trip_index))
      |> assign(:border_classes, "border border-brand-primary rounded")
      |> assign(:layout_classes, "px-2.5 py-1.5 mr-2")
      |> assign(:text_classes, "text-brand-primary text-lg")

    ~H"""
    <div>
      <p>Depart at</p>
      <div class="flex">
        <.depart_at_button
          :for={{itinerary, index} <- Enum.with_index(@itineraries)}
          active={@selected_trip_index == index}
          phx-click="set_selected_trip_index"
          phx-value-trip-index={index}
          phx-target={@myself}
        >
          <%= Timex.format!(itinerary.start, "%-I:%M%p", :strftime) %>
        </.depart_at_button>
      </div>
      <.specific_itinerary_detail itinerary={@selected_itinerary} />
    </div>
    """
  end

  attr :active, :boolean
  attr :rest, :global
  slot :inner_block

  defp depart_at_button(%{active: active} = assigns) do
    background_class = if active, do: "bg-brand-primary-lightest", else: "bg-transparent"
    assigns = assign(assigns, :background_class, background_class)

    ~H"""
    <button
      type="button"
      class={[
        "border border-brand-primary rounded px-2.5 py-1.5 mr-2 text-brand-primary text-lg",
        "hover:bg-brand-primary-lightest #{@background_class}"
      ]}
      {@rest}
    >
      <%= render_slot(@inner_block) %>
    </button>
    """
  end

  defp specific_itinerary_detail(assigns) do
    assigns =
      assign(
        assigns,
        :all_routes,
        assigns.itinerary.legs
        |> Enum.reject(&match?(%PersonalDetail{}, &1.mode))
        |> Enum.map(& &1.mode.route)
      )

    ~H"""
    <div class="mt-4">
      <div>
        Depart at <%= Timex.format!(@itinerary.start, "%-I:%M%p", :strftime) %>
        <.route_symbol :for={route <- @all_routes} route={route} class="ml-2" />
      </div>
      <div :for={leg <- @itinerary.legs}>
        <.leg
          start_time={leg.start}
          end_time={leg.stop}
          from={leg.from}
          to={leg.to}
          mode={leg.mode}
          realtime={leg.realtime}
          realtime_state={leg.realtime_state}
        />
      </div>
    </div>
    """
  end

  @impl true
  def handle_event("set_selected_trip_index", %{"trip-index" => index_str}, socket) do
    {index, ""} = Integer.parse(index_str)

    {:noreply, socket |> assign(:selected_trip_index, index)}
  end
end
