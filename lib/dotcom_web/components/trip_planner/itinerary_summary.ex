defmodule DotcomWeb.Components.TripPlanner.ItinerarySummary do
  @moduledoc """
  A component that renders the summary for a given itinerary
  """

  use DotcomWeb, :component

  alias OpenTripPlannerClient.Schema.{Itinerary, Route}

  attr :accessible?, :boolean
  attr :itinerary, Itinerary, required: true
  attr :summarized_legs, :list, required: true

  def itinerary_summary(assigns) do
    itinerary_fare = Dotcom.TripPlan.Fares.fare(assigns.itinerary)
    assigns = assign(assigns, :price, Fares.Format.price(itinerary_fare))

    ~H"""
    <div>
      <div class="flex flex-row mb-3 font-bold text-lg justify-between">
        <div>
          {Util.kitchen_downcase_time(@itinerary.start)} - {Util.kitchen_downcase_time(@itinerary.end)}
        </div>
        <div>
          {Util.format_minutes_duration(@itinerary.duration)}
        </div>
      </div>
      <div class="flex flex-wrap gap-1 items-center content-center mb-3">
        <%= for {summary_leg, index} <- Enum.with_index(@summarized_legs) do %>
          <.icon :if={index > 0} name="angle-right" class="font-black w-2" aria-label="to" />
          <.leg_icon {summary_leg} />
        <% end %>
      </div>
      <div class="flex flex-wrap gap-1 items-center mb-3 text-sm text-grey-dark">
        <div class="inline-flex items-center gap-0.5">
          <%= if @accessible? do %>
            <.icon type="icon-svg" name="icon-accessible-small" class="h-3 w-3 mr-0.5" /> Accessible
          <% else %>
            <.icon type="icon-svg" name="icon-not-accessible-small" class="h-4 w-4 mr-0.5" />
            May not be accessible
          <% end %>
          <.icon name="circle" class="h-0.5 w-0.5 mx-1" />
        </div>
        <div class="inline-flex items-center gap-0.5">
          <.icon name="person-walking" class="h-3 w-3" />
          {@itinerary.walk_distance} mi
        </div>
        <div :if={@price != ""} class="inline-flex items-center gap-0.5">
          <.icon name="circle" class="h-0.5 w-0.5 mx-1" />
          <.icon name="wallet" class="h-3 w-3" />
          {@price}
        </div>
      </div>
    </div>
    """
  end

  attr(:class, :string, default: "")
  attr(:routes, :list, required: true, doc: "List of %OpenTripPlannerClient.Schema.Route{}")
  attr(:walk_minutes, :integer, required: true)

  # No routes: this is a walking leg
  defp leg_icon(%{routes: [], walk_minutes: _} = assigns) do
    ~H"""
    <span
      aria-label={"#{@walk_minutes} minute walk"}
      class={[
        "flex items-center gap-1 text-sm font-semibold leading-none whitespace-nowrap py-1 px-2 rounded-full border-[1px] border-gray-light",
        @class
      ]}
    >
      <.icon name="person-walking" class="h-4 w-4" aria-hidden="true" />
      <span aria-hidden="true">{@walk_minutes} min</span>
    </span>
    """
  end

  # Group of commuter rail routes are summarized to one symbol.
  defp leg_icon(%{routes: [%Route{type: 2} | _]} = assigns) do
    ~H"""
    <.route_symbol route={List.first(@routes)} class={@class} />
    """
  end

  # No grouping when there's only one route!
  defp leg_icon(%{routes: [%Route{}]} = assigns) do
    ~H"""
    <.route_symbol route={List.first(@routes)} {assigns} />
    """
  end

  defp leg_icon(%{routes: [%Route{type: type, gtfs_id: gtfs_id} | _]} = assigns) do
    slashed? = type == 3 && String.starts_with?(gtfs_id, "mbta-ma-us")

    assigns =
      assigns
      |> assign(:slashed?, slashed?)
      |> assign(
        :grouped_classes,
        if(slashed?,
          do: "[&:not(:first-child)]:rounded-l-none [&:not(:last-child)]:rounded-r-none",
          else: "rounded-full ring-white ring-2"
        )
      )

    ~H"""
    <div class="flex items-center -space-x-0.5">
      <%= for {route, index} <- Enum.with_index(@routes) do %>
        <.route_symbol route={route} class={"#{@grouped_classes} #{zindex(index)} #{@class}"} />

        <%= if index < Kernel.length(@routes) - 1 do %>
          <%= if @slashed? do %>
            <div
              class={"bg-white -mt-0.5 w-1 h-7 #{zindex(index)} transform rotate-[17deg]"}
              aria-label="or"
            />
          <% else %>
            <span class="sr-only">or</span>
          <% end %>
        <% end %>
      <% end %>
    </div>
    """
  end

  defp leg_icon(assigns) do
    _ =
      inspect(assigns)
      |> Sentry.capture_message(tags: %{feature: "Trip Planner"})

    ~H"""
    <span></span>
    """
  end

  defp zindex(index) do
    "z-#{50 - index * 10}"
  end
end
