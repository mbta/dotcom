defmodule DotcomWeb.Components.TripPlanner.ItinerarySummary do
  @moduledoc """
  A component that renders the summary for a given itinerary
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.RouteIcons, only: [otp_route_icon: 1]

  import Dotcom.TripPlan.Helpers,
    only: [
      agency_name?: 2,
      mbta_shuttle?: 1,
      route_line_name: 1,
      route_name: 1
    ]

  import Dotcom.TripPlan.Fares, only: [fare: 1]

  import DotcomWeb.Components.TripPlanner.Helpers,
    only: [
      formatted_time_range: 2,
      meters_to_localized_miles: 1,
      minutes_to_localized_minutes: 1,
      seconds_to_localized_minutes: 1
    ]

  import MbtaMetro.Components.SystemIcons, only: [mode_icon: 1, stacked_route_icon: 1]

  alias OpenTripPlannerClient.Schema.{Itinerary, Route}

  attr :class, :string, default: ""
  attr :itinerary, Itinerary, required: true
  attr :show_accessible, :boolean, default: false
  attr :summarized_legs, :list, doc: "If not provided, will be derived from the itinerary"

  def itinerary_summary(assigns) do
    itinerary_fare = fare(assigns.itinerary)

    assigns =
      assign(assigns, :price, Fares.Format.price(itinerary_fare))
      |> assign(
        :duration,
        assigns.itinerary
        |> Map.get(:duration)
        |> seconds_to_localized_minutes()
      )
      |> assign(
        :distance,
        assigns.itinerary
        |> Map.get(:walk_distance)
        |> meters_to_localized_miles()
      )
      |> assign(:accessible?, Itinerary.accessible?(assigns.itinerary))
      |> assign_new(:summarized_legs, fn -> Itinerary.summary(assigns.itinerary) end)

    ~H"""
    <div class={@class}>
      <div class="flex flex-row mb-3 font-bold text-lg justify-between">
        <div>
          {formatted_time_range(@itinerary.start, @itinerary.end)}
        </div>
        <div>
          {@duration}
        </div>
      </div>
      <div class="flex flex-wrap gap-1 items-center content-center mb-3">
        <%= for {summary_leg, index} <- Enum.with_index(@summarized_legs) do %>
          <.icon :if={index > 0} name="angle-right" class="font-black w-2" aria-label={~t"to"} />
          <.leg_icon {summary_leg} />
        <% end %>
      </div>
      <div class="flex flex-wrap gap-1 items-center text-sm text-grey-dark">
        <div :if={@show_accessible} class="inline-flex items-center gap-0.5">
          <%= if @accessible? do %>
            <.icon type="icon-svg" name="icon-accessible-light" class="h-4.5 mr-0.5" aria-hidden />
            {~t(Accessible)}
          <% else %>
            <.icon type="icon-svg" name="icon-not-accessible-light" class="h-4.5 mr-0.5" aria-hidden />
            {~t(Not accessible)}
          <% end %>
          <.icon name="circle" class="h-0.5 w-0.5 mx-1" aria-hidden />
        </div>
        <div class="inline-flex items-center gap-0.5">
          <.icon name="person-walking" class="h-4 w-4" aria-label={~t("Walking distance")} />
          {@distance}
        </div>
        <div :if={@price != ""} class="inline-flex items-center gap-0.5">
          <.icon name="circle" class="h-0.5 w-0.5 mx-1" aria-hidden />
          <.icon type="icon-svg" name="icon-fares-default" class="h-4 w-4" />
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
      aria-label={"#{@walk_minutes}" <> ~t" minute walk"}
      class={[
        "flex items-center gap-1 text-sm font-semibold leading-none whitespace-nowrap py-1 px-2 rounded-full border-[1px] border-gray-light",
        @class
      ]}
    >
      <.icon name="person-walking" class="h-4 w-4" aria-hidden="true" />
      <span aria-hidden="true">{minutes_to_localized_minutes(@walk_minutes)}</span>
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

  # figure out if we're showing a group of buses or group of rail lines
  defp leg_icon(assigns) do
    lines =
      assigns.routes
      |> Enum.map(&route_line_name/1)
      |> Enum.reject(&is_nil/1)
      |> Enum.uniq()

    if length(lines) > 0 do
      assigns = assign(assigns, :lines, lines)

      ~H"""
      <.stacked_route_icon lines={@lines} class={@class} />
      """
    else
      names =
        assigns.routes
        |> Enum.map(&route_name/1)
        |> Enum.uniq()

      assigns = assign(assigns, :names, names)

      ~H"""
      <.stacked_route_icon names={@names} class={@class} />
      """
    end
  end
end
