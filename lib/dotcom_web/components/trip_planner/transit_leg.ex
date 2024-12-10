defmodule DotcomWeb.Components.TripPlanner.TransitLeg do
  @moduledoc """
  A transit leg of a trip.
  Includes styling for the traversed route & a list of intermediate stops.
  """

  use Phoenix.Component

  import DotcomWeb.Components.RouteSymbols, only: [route_symbol: 1]
  import DotcomWeb.Components.TripPlanner.Place
  import MbtaMetro.Components.Icon, only: [icon: 1]

  alias Dotcom.TripPlan.TransitDetail
  alias Routes.Route

  @doc """
  Renders a transit leg.

  Must be given a `leg`
  """

  attr :leg, :any, required: true

  def transit_leg(assigns) do
    ~H"""
    <div class="bg-gray-bordered-background">
      <.place
        place={@leg.from}
        time={@leg.start}
        route={if(match?(%TransitDetail{}, @leg.mode), do: @leg.mode.route)}
      />
      <div class={"bg-gray-bordered-background ml-5 border-l-8 #{leg_line_class(@leg.mode.route)}"}>
        <%= if Enum.count(@leg.mode.intermediate_stops) < 2 do %>
          <.leg_summary leg={@leg} />
          <.leg_details leg={@leg} />
        <% else %>
          <details class="group">
            <summary class="flex cursor-pointer list-none gap-2 relative">
              <.leg_summary leg={@leg} />
              <.icon
                name="chevron-up"
                class="group-open:rotate-180 w-4 h-4 absolute top-3 right-3 fill-brand-primary"
              />
            </summary>
            <.leg_details leg={@leg} />
          </details>
        <% end %>
      </div>
      <.place
        place={@leg.to}
        time={@leg.stop}
        route={if(match?(%TransitDetail{}, @leg.mode), do: @leg.mode.route)}
      />
    </div>
    """
  end

  defp leg_line_class(%Route{external_agency_name: "Massport"}) do
    "border-massport"
  end

  defp leg_line_class(%Route{external_agency_name: "Logan Express", name: name}) do
    "border-logan-express-#{name}"
  end

  defp leg_line_class(%Route{} = route) do
    route
    |> Routes.Route.icon_atom()
    |> CSSHelpers.atom_to_class()
    |> then(&"border-#{&1}")
  end

  defp leg_line_class(_), do: ""

  defp leg_summary(assigns) do
    assigns = assign(assigns, :stops_count, Enum.count(assigns.leg.mode.intermediate_stops) + 1)

    ~H"""
    <div class="gap-x-1 py-2 grid grid-rows-2 grid-cols-[min-content_max-content] pl-4">
      <.route_symbol route={@leg.mode.route} />
      <span class="font-semibold">{@leg.mode.trip_id}</span>
      <div class="text-sm col-start-2 row-start-2">
        Ride the {route_name(@leg.mode.route)}
        <span class="font-semibold">{@stops_count} {Inflex.inflect("stop", @stops_count)}</span>
      </div>
    </div>
    """
  end

  # Returns the name of the route for the given row.
  # If there is an external agency name, we use the long name.
  # If it is a bus, we use the short name.
  # For all others, we use the long name.
  defp route_name(%Route{external_agency_name: agency, long_name: long_name})
       when is_binary(agency) and is_binary(long_name),
       do: long_name

  defp route_name(%Route{name: name, type: 3})
       when is_binary(name),
       do: "#{name} bus"

  defp route_name(%Route{long_name: long_name})
       when is_binary(long_name),
       do: long_name

  defp route_name(%Route{name: name}), do: name
  defp route_name(_), do: nil

  defp leg_details(assigns) do
    ~H"""
    <ul class="w-full m-0 pl-4 flex flex-col divide-y divide-gray-lighter">
      <li
        :for={stop <- @leg.mode.intermediate_stops}
        class="inline-flex items-center gap-x-2 py-2 relative"
      >
        <.icon name="circle" class="w-2 h-2 absolute -left-6 fill-white" />
        {stop.name}
      </li>
    </ul>
    """
  end
end
