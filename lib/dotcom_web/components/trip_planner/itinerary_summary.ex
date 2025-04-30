defmodule DotcomWeb.Components.TripPlanner.ItinerarySummary do
  @moduledoc """
  A component that renders the summary for a given itinerary
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.RouteIcons
  import Dotcom.TripPlan.Helpers
  import Dotcom.TripPlan.Fares, only: [fare: 1]
  import MbtaMetro.Components.SystemIcons, only: [mode_icon: 1, stacked_route_icon: 1]

  alias OpenTripPlannerClient.Schema.{Itinerary, Route}

  attr :accessible?, :boolean
  attr :itinerary, Itinerary, required: true
  attr :summarized_legs, :list, required: true

  def itinerary_summary(assigns) do
    itinerary_fare = fare(assigns.itinerary)

    assigns =
      assign(assigns, :price, Fares.Format.price(itinerary_fare))
      |> assign(
        :duration,
        assigns.itinerary
        |> itinerary_duration_minutes()
        |> Util.format_minutes_duration()
      )

    ~H"""
    <div>
      <div class="flex flex-row mb-3 font-bold text-lg justify-between">
        <div>
          {Util.kitchen_downcase_time(@itinerary.start)} - {Util.kitchen_downcase_time(@itinerary.end)}
        </div>
        <div>
          {@duration}
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
          {itinerary_distance_miles(@itinerary)} mi
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
    <.mode_icon mode="commuter-rail" class={@class} />
    """
  end

  # No grouping when there's only one route!
  defp leg_icon(%{routes: [%Route{}]} = assigns) do
    ~H"""
    <.otp_route_icon route={List.first(@routes)} class={@class} />
    """
  end

  defp leg_icon(%{routes: [first_route | _]} = assigns)
       when mbta_shuttle?(first_route) or not agency_name?(first_route, "MBTA") do
    # if multiple shuttles with same name, remove extras
    assigns = assign(assigns, :routes, Enum.uniq_by(assigns.routes, &route_name/1))

    ~H"""
    <.otp_route_icon :for={route <- @routes} route={route} class={@class} />
    """
  end

  defp leg_icon(assigns) do
    lines = Enum.map(assigns.routes, &route_line_name/1) |> Enum.reject(&is_nil/1) |> Enum.uniq()

    case lines do
      [] ->
        assigns = assign(assigns, :names, Enum.map(assigns.routes, &route_name/1) |> Enum.uniq())

        ~H"""
        <.stacked_route_icon names={@names} class={@class} />
        """

      lines ->
        assigns = assign(assigns, :lines, lines)

        ~H"""
        <.stacked_route_icon lines={@lines} class={@class} />
        """
    end
  end
end
