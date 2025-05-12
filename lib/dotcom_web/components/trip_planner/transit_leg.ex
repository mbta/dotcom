defmodule DotcomWeb.Components.TripPlanner.TransitLeg do
  @moduledoc """
  A transit leg of a trip.
  Includes styling for the traversed route & a list of intermediate stops.
  """

  use DotcomWeb, :component

  import Dotcom.TripPlan.Helpers
  import DotcomWeb.Components.TripPlanner.{Place, RouteIcons}
  import MbtaMetro.Components.Icon, only: [icon: 1]

  alias Dotcom.TripPlan.Alerts
  alias OpenTripPlannerClient.Schema.{Leg, LegTime, Route, Trip}

  @doc """
  Renders a transit leg.

  Must be given a `leg` and a list of `alerts`
  """

  attr :alerts, :list, default: []
  attr :leg, Leg, required: true

  def transit_leg(assigns) do
    assigns =
      assigns
      |> assign(:alerts, Alerts.by_mode_and_stops(assigns.alerts, assigns.leg))

    ~H"""
    <div class="bg-gray-bordered-background rounded-lg p-3">
      <.transit_place
        show_leg_line
        place={@leg.from}
        time={LegTime.time(@leg.start)}
        route={@leg.route}
        alerts={@alerts.from}
      />

      <div class="flex items-stretch gap-x-2">
        <div class="flex flex-col items-center">
          <div class="w-5"></div>
          <div class={["w-1 flex-grow", leg_line_class(@leg.route)]}></div>
        </div>
        <%= if Enum.count(@leg.intermediate_stops) == 0 do %>
          <div class="w-full py-5">
            <.leg_summary leg={@leg} alerts={@alerts.route} />
            <.leg_details leg={@leg} />
          </div>
        <% else %>
          <details class="w-full py-5 group/stops">
            <summary class="flex items-start cursor-pointer">
              <.leg_summary leg={@leg} alerts={@alerts.route} />
              <.icon
                name="chevron-down"
                class="ml-auto shrink-0 w-4 h-4 fill-brand-primary group-open/stops:rotate-180"
              />
            </summary>
            <.leg_details leg={@leg} />
          </details>
        <% end %>
      </div>

      <.transit_place
        place={@leg.to}
        time={LegTime.time(@leg.end)}
        route={@leg.route}
        alerts={@alerts.to}
      />
    </div>
    """
  end

  attr :place, :any, required: true
  attr :time, :any, required: true
  attr :route, :any, required: true
  attr :alerts, :list, required: true
  attr :show_leg_line, :boolean, default: false

  defp transit_place(assigns) do
    ~H"""
    <div>
      <.place
        time={@time}
        name={@place.stop.name}
        accessible={@place.stop.wheelchair_boarding == :POSSIBLE}
        url={@place.stop.url}
      >
        <:icon>
          <.transit_leg_icon route={@route} />
          <div :if={@show_leg_line} class={["w-1 flex-grow", leg_line_class(@route)]}></div>
        </:icon>
      </.place>
      <div class="flex items-stretch gap-x-3">
        <div class="flex flex-col items-center">
          <div class="w-5"></div>
          <div :if={@show_leg_line} class={["w-1 flex-grow", leg_line_class(@route)]}></div>
        </div>
        <div>
          <.alert :for={alert <- @alerts} alert={alert} />
        </div>
      </div>
    </div>
    """
  end

  defp leg_line_class(route) when agency_name?(route, "Massport") do
    "bg-massport"
  end

  defp leg_line_class(route) when agency_name?(route, "Logan Express") do
    "bg-logan-express-#{route_name(route)}"
  end

  defp leg_line_class(%Route{short_name: name} = route) when mbta_shuttle?(route) do
    %Routes.Route{id: name |> String.split(" ") |> List.first()}
    |> Routes.Route.icon_atom()
    |> CSSHelpers.atom_to_class()
    |> route_background_class()
  end

  defp leg_line_class(%Route{type: 2}), do: "bg-commuter-rail"
  defp leg_line_class(%Route{type: 4}), do: "bg-ferry"

  defp leg_line_class(route) do
    case mbta_id(route) do
      "Green-" <> _ ->
        "bg-green-line"

      other ->
        %Routes.Route{id: other, type: route.type}
        |> Routes.Route.icon_atom()
        |> CSSHelpers.atom_to_class()
        |> route_background_class()
    end
  end

  defp route_background_class("bus") do
    "bg-brand-bus"
  end

  defp route_background_class(route) do
    "bg-#{route}"
  end

  defp transit_leg_icon(%{route: %Route{mode: :BUS}} = assigns) do
    ~H"""
    <.icon type="icon-svg" class="shrink-0 h-5 w-5" name="icon-stop-default" />
    """
  end

  defp transit_leg_icon(%{} = assigns) do
    ~H"""
    <.icon type="icon-svg" class="shrink-0 h-5 w-5" name="icon-circle-t-default" />
    """
  end

  defp alert(assigns) do
    ~H"""
    <details class="group/alert">
      <summary>
        <.icon name="triangle-exclamation" class="h-3 w-3" />
        <span class="text-sm">
          {Phoenix.Naming.humanize(@alert.effect)}
        </span>
        <span class="text-xs btn-link cursor-pointer group-open/alert:hidden">Show Details</span>
        <span class="text-xs btn-link cursor-pointer hidden group-open/alert:inline">
          Hide Details
        </span>
      </summary>
      <div class="bg-white mt-1 px-5 py-4 text-sm">
        {@alert.header}
      </div>
    </details>
    """
  end

  defp leg_summary(assigns) do
    assigns =
      assigns
      |> assign(:stops_count, Enum.count(assigns.leg.intermediate_stops) + 1)
      |> assign(:headsign, headsign(assigns.leg))

    ~H"""
    <div class="flex items-start gap-sm">
      <div class="h-6 w-max-content shrink-0 flex items-center justify-start">
        <.otp_route_icon route={@leg.route} class="shrink-0" />
      </div>
      <div class="flex flex-col">
        <span class="font-bold">{@headsign}</span>
        <span class="text-sm">
          <.ride_message route={@leg.route} trip={@leg.trip} />
          <span class="font-semibold">
            {@stops_count} {Inflex.inflect("stop", @stops_count)}
          </span>
        </span>
        <.alert :for={alert <- @alerts} alert={alert} />
      </div>
    </div>
    """
  end

  defp headsign(%{route: route, trip: %Trip{trip_headsign: headsign}})
       when not is_nil(headsign) do
    if agency_name?(route, "MBTA") do
      headsign
    else
      route_name(route) <> " to #{Recase.to_name(headsign)}"
    end
  end

  # Massport trips might not have headsigns, so use the route labels instead
  defp headsign(%{route: %Route{} = route}) when not agency_name?(route, "MBTA") do
    route_label(route)
  end

  defp headsign(_), do: nil

  defp ride_message(%{route: route, trip: trip} = assigns) do
    assigns =
      assigns
      |> assign(:route_name, route_name(route))
      |> assign(:train_number, if(route.mode == :RAIL, do: trip.trip_short_name))
      |> assign(:vehicle_name, vehicle_name(route))

    ~H"""
    Ride the {@route_name} {if @train_number, do: "Train #{@train_number}", else: @vehicle_name}
    """
  end

  defp vehicle_name(%Route{mode: mode}) when mode in [:TRAM, :SUBWAY], do: "train"

  defp vehicle_name(%Route{mode: mode}) when is_atom(mode) do
    mode
    |> Atom.to_string()
    |> String.downcase()
  end

  defp leg_details(assigns) do
    ~H"""
    <ul class="w-full m-0 pl-0 flex flex-col divide-y divide-gray-lightest">
      <li
        :for={stop <- @leg.intermediate_stops}
        class="inline-flex items-center gap-x-2 py-2 relative"
      >
        <.icon name="circle" class="h-1.5 w-1.5 absolute -left-[1.3125rem] fill-white" />
        {stop.name}
      </li>
    </ul>
    """
  end
end
