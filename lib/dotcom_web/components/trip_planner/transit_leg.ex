defmodule DotcomWeb.Components.TripPlanner.TransitLeg do
  @moduledoc """
  A transit leg of a trip.
  Includes styling for the traversed route & a list of intermediate stops.
  """

  use Phoenix.Component

  import DotcomWeb.Components.RouteSymbols, only: [route_symbol: 1]
  import DotcomWeb.Components.TripPlanner.Place
  import MbtaMetro.Components.Icon, only: [icon: 1]
  import Routes.Route, only: [is_external?: 1, is_shuttle?: 1]

  alias Dotcom.TripPlan.TransitDetail
  alias Routes.Route

  @doc """
  Renders a transit leg.

  Must be given a `leg` and a list of `alerts`
  """

  attr :alerts, :list, default: []
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
          <.leg_summary leg={@leg} alerts={@alerts} />
          <.leg_details leg={@leg} />
        <% else %>
          <details class="group">
            <summary class="flex cursor-pointer list-none gap-2 relative">
              <.leg_summary leg={@leg} alerts={@alerts} />
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
    |> Route.to_naive()
    |> Route.icon_atom()
    |> CSSHelpers.atom_to_class()
    |> then(&"border-#{&1}")
  end

  defp leg_line_class(_), do: ""

  defp leg_summary(assigns) do
    assigns =
      assigns
      |> assign(:stops_count, Enum.count(assigns.leg.mode.intermediate_stops) + 1)
      |> assign(:headsign, headsign(assigns.leg.mode))

    ~H"""
    <div class="gap-x-1 py-2 grid grid-rows-2 grid-cols-[min-content_auto] pl-4">
      <.route_symbol route={@leg.mode.route} />
      <span class="font-semibold">{@headsign}</span>
      <div class="text-sm col-start-2 row-start-2">
        <.ride_message mode={@leg.mode} />
        <span class="font-semibold">{@stops_count} {Inflex.inflect("stop", @stops_count)}</span>
      </div>
      <%= if @alerts do %>
        <div :for={alert <- @alerts} class="col-start-2 mb-2 mr-4">
          <.alert alert={alert} />
        </div>
      <% end %>
    </div>
    """
  end

  # Massport trips might not have headsigns, so use the route names instead
  defp headsign(%{route: %Route{} = route}) when is_external?(route) do
    route_name(route)
  end

  defp headsign(%{trip: %{headsign: headsign}}) when not is_nil(headsign) do
    headsign
  end

  defp headsign(_), do: nil

  defp ride_message(%{mode: %{route: %Route{} = route}} = assigns)
       when is_external?(route) do
    assigns =
      assigns
      |> assign(:vehicle_name, vehicle_name(route))

    ~H"""
    Ride the {@vehicle_name}
    """
  end

  defp ride_message(%{mode: %{route: route, trip: trip}} = assigns) do
    assigns =
      assigns
      |> assign(:route_name, route_name(route))
      |> assign(:train_number, train_number(trip))
      |> assign(:vehicle_name, vehicle_name(route))

    ~H"""
    Ride the {@route_name} {if @train_number, do: "Train #{@train_number}", else: @vehicle_name}
    """
  end

  # Returns the name of the route for the given row.
  # If there is an external agency name, we use the long name.
  # If it is a bus, we use the short name.
  # For all others, we use the long name.
  defp route_name(%Route{} = route) when is_external?(route),
    do: route.long_name

  defp route_name(%Route{name: name, type: 3})
       when is_binary(name),
       do: name

  defp route_name(%Route{long_name: long_name})
       when is_binary(long_name),
       do: long_name

  defp route_name(%Route{name: name}), do: name
  defp route_name(_), do: nil

  defp train_number(%Schedules.Trip{name: name}) when not is_nil(name), do: name
  defp train_number(_), do: nil

  defp vehicle_name(%Route{} = route) when is_shuttle?(route) do
    "shuttle bus"
  end

  defp vehicle_name(%Route{} = route) do
    route
    |> Route.vehicle_name()
    |> String.downcase()
  end

  defp vehicle_name(nil), do: nil

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

  defp alert(assigns) do
    ~H"""
    <details class="group">
      <summary class="flex items-center gap-2 mb-1">
        <.icon name="triangle-exclamation" class="w-4 h-4" />
        {Phoenix.Naming.humanize(@alert.effect)}
        <span class="group-open:hidden btn-link text-sm">Show Details</span>
        <span class="hidden group-open:inline btn-link text-sm">Hide Details</span>
      </summary>
      <div class="bg-white p-2 text-sm">
        {@alert.header}
      </div>
    </details>
    """
  end
end
