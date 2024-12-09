defmodule DotcomWeb.Components.TripPlanner.ItineraryDetail do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.Leg, only: [leg: 1]
  import DotcomWeb.Components.TripPlanner.WalkingLeg, only: [walking_leg: 1]

  alias Dotcom.TripPlan.PersonalDetail

  def itinerary_detail(
        %{
          itineraries: itineraries,
          selected_itinerary_detail_index: selected_itinerary_detail_index
        } = assigns
      ) do
    assigns =
      assign(assigns, :selected_itinerary, Enum.at(itineraries, selected_itinerary_detail_index))

    ~H"""
    <div>
      <.depart_at_buttons
        selected_itinerary_detail_index={@selected_itinerary_detail_index}
        itineraries={@itineraries}
        target={@target}
      />
      <.specific_itinerary_detail itinerary={@selected_itinerary} />
    </div>
    """
  end

  attr :itineraries, :list
  attr :selected_itinerary_detail_index, :integer
  attr :target, :string

  defp depart_at_buttons(assigns) do
    ~H"""
    <div :if={Enum.count(@itineraries) > 1}>
      <p class="text-sm mb-2 mt-3">Depart at</p>
      <div class="flex">
        <.depart_at_button
          :for={{itinerary, index} <- Enum.with_index(@itineraries)}
          active={@selected_itinerary_detail_index == index}
          phx-click="set_itinerary_index"
          phx-value-trip-index={index}
        >
          {Timex.format!(itinerary.start, "%-I:%M%p", :strftime)}
        </.depart_at_button>
      </div>
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
      {render_slot(@inner_block)}
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
        Depart at {Timex.format!(@itinerary.start, "%-I:%M%p", :strftime)}
        <.route_symbol :for={route <- @all_routes} route={route} class="ml-2" />
      </div>
      <div :for={leg <- @itinerary.legs}>
        <%= if match?(%PersonalDetail{}, leg.mode) do %>
          <.walking_leg leg={leg} />
        <% else %>
          <.leg
            start_time={leg.start}
            end_time={leg.stop}
            from={leg.from}
            to={leg.to}
            mode={leg.mode}
            realtime={leg.realtime}
            realtime_state={leg.realtime_state}
          />
        <% end %>
      </div>
    </div>
    """
  end
end
