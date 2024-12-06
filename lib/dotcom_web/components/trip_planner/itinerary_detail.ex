defmodule DotcomWeb.Components.TripPlanner.ItineraryDetail do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.TransitLeg, only: [transit_leg: 1]
  import DotcomWeb.Components.TripPlanner.WalkingLeg, only: [walking_leg: 1]

  alias Routes.Route
  alias Dotcom.TripPlan.{PersonalDetail, TransitDetail}

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
      <p class="text-sm mb-2 mt-3">Depart at</p>
      <div class="flex">
        <.depart_at_button
          :for={{itinerary, index} <- Enum.with_index(@itineraries)}
          active={@selected_itinerary_detail_index == index}
          phx-click="set_itinerary_index"
          phx-value-trip-index={index}
          phx-target={@target}
        >
          {Timex.format!(itinerary.start, "%-I:%M%p", :strftime)}
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
      <div
        :for={leg <- @itinerary.legs}
        class={"my-1 #{if(match?(%TransitDetail{}, leg.mode), do: "bg-gray-bordered-background")}"}
      >
        <.place
          place={leg.from}
          time={leg.start}
          route={if(match?(%TransitDetail{}, leg.mode), do: leg.mode.route)}
        />
        <%= if match?(%PersonalDetail{}, leg.mode) do %>
          <.walking_leg leg={leg} />
        <% else %>
          <.transit_leg leg={leg} />
        <% end %>
        <.place
          place={leg.to}
          time={leg.stop}
          route={if(match?(%TransitDetail{}, leg.mode), do: leg.mode.route)}
        />
      </div>
    </div>
    """
  end

  defp place(assigns) do
    ~H"""
    <div class="bg-gray-bordered-background px-3 py-2 rounded flex flex-nowrap items-center gap-2 w-full">
      <.location_icon route={@route} class="grow-0 h-6 w-6" />
      <strong class="grow-0">{@place.name}</strong>
      <.icon
        :if={!is_nil(@place.stop) and Stops.Stop.accessible?(@place.stop)}
        type="icon-svg"
        name="icon-accessible-default"
        class="h-6 w-6 ml-0.5 grow-0"
        aria-hidden="true"
      />
      <time class="grow text-right">{format_time(@time)}</time>
    </div>
    """
  end

  defp location_icon(%{route: %Route{}} = assigns) do
    icon_name =
      if(Routes.Route.type_atom(assigns.route) in [:bus, :logan_express, :massport_shuttle],
        do: "icon-stop-default",
        else: "icon-circle-t-default"
      )

    assigns = assign(assigns, :icon_name, icon_name)

    ~H"""
    <.icon type="icon-svg" class={@class} name={@icon_name} />
    """
  end

  defp location_icon(assigns) do
    ~H"""
    <.icon class={"#{@class} fill-brand-primary"} name="location-dot" />
    """
  end

  defp format_time(datetime), do: Timex.format!(datetime, "%-I:%M %p", :strftime)
end
