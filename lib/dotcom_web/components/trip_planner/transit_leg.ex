defmodule DotcomWeb.Components.TripPlanner.TransitLeg do
  @moduledoc """
  A transit leg of a trip.
  Includes styling for the traversed route & a list of intermediate stops.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.RouteSymbols, only: [route_symbol: 1]
  import DotcomWeb.Components.TripPlanner.Place
  import MbtaMetro.Components.Icon, only: [icon: 1]
  import Routes.Route, only: [is_external?: 1, is_shuttle?: 1]

  alias Dotcom.TripPlan.{Alerts, TransitDetail}
  alias Routes.Route
  alias Stops.Stop

  @doc """
  Renders a transit leg.

  Must be given a `leg` and a list of `alerts`
  """

  attr :alerts, :list, default: []
  attr :leg, :any, required: true

  def transit_leg(assigns) do
    assigns =
      assigns
      |> assign(:alerts, Alerts.by_mode_and_stops(assigns.alerts, assigns.leg))

    ~H"""
    <div class="bg-gray-bordered-background rounded-lg p-3">
      <.transit_place
        show_leg_line
        place={@leg.from}
        time={@leg.start}
        route={if(match?(%TransitDetail{}, @leg.mode), do: @leg.mode.route)}
        alerts={@alerts.from}
      />

      <div class="flex items-stretch gap-x-2">
        <div class="flex flex-col items-center">
          <div class="w-5"></div>
          <div class={["w-1 flex-grow", leg_line_class(@leg.mode.route)]}></div>
        </div>
        <%= if Enum.count(@leg.mode.intermediate_stops) == 0 do %>
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
        time={@leg.stop}
        route={if(match?(%TransitDetail{}, @leg.mode), do: @leg.mode.route)}
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
        accessible={!is_nil(@place.stop) and Stop.accessible?(@place.stop)}
        url={stop_url(@route, @place.stop)}
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

  defp stop_url(_, %Stop{} = stop) when is_nil(stop.id), do: nil

  defp stop_url(%Route{external_agency_name: nil}, %Stop{} = stop) do
    ~p"/stops/#{stop}"
  end

  defp stop_url(_, _), do: nil

  defp leg_line_class(%Route{external_agency_name: "Massport"}) do
    "bg-massport"
  end

  defp leg_line_class(%Route{external_agency_name: "Logan Express", name: name}) do
    "bg-logan-express-#{name}"
  end

  defp leg_line_class(%Route{name: name} = route) when is_shuttle?(route) do
    %Route{id: name |> String.split(" ") |> List.first()}
    |> Route.icon_atom()
    |> CSSHelpers.atom_to_class()
    |> route_background_class()
  end

  defp leg_line_class(%Route{} = route) do
    route
    |> Route.to_naive()
    |> Route.icon_atom()
    |> CSSHelpers.atom_to_class()
    |> route_background_class()
  end

  defp route_background_class("bus") do
    "bg-brand-bus"
  end

  defp route_background_class(route) do
    "bg-#{route}"
  end

  defp transit_leg_icon(assigns) do
    name =
      case Route.vehicle_name(assigns.route) do
        "Bus" -> "icon-stop-default"
        _ -> "icon-circle-t-default"
      end

    assigns = assigns |> assign(:name, name)

    ~H"""
    <.icon type="icon-svg" class="shrink-0 h-5 w-5" name={@name} />
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
      |> assign(:stops_count, Enum.count(assigns.leg.mode.intermediate_stops) + 1)
      |> assign(:headsign, headsign(assigns.leg))

    ~H"""
    <div class="flex items-start">
      <div class="h-6 w-[2.375rem] shrink-0 flex items-center justify-start">
        <.route_symbol
          class="shrink-0"
          route={@leg.mode.route}
          size={route_symbol_size(@leg.mode.route)}
        />
      </div>

      <div class="flex flex-col">
        <span class="font-bold">{@headsign}</span>
        <span class="text-sm">
          <.ride_message mode={@leg.mode} />
          <span class="font-semibold">
            {@stops_count} {Inflex.inflect("stop", @stops_count)}
          </span>
        </span>
        <.alert :for={alert <- @alerts} alert={alert} />
      </div>
    </div>
    """
  end

  defp route_symbol_size(%Route{type: 3} = route) when not is_external?(route), do: "small"
  defp route_symbol_size(_), do: "default"

  defp headsign(%{stop_headsign: stop_headsign}) when not is_nil(stop_headsign) do
    stop_headsign
  end

  # Massport trips might not have headsigns, so use the route names instead
  defp headsign(%{mode: %{route: %Route{} = route}}) when is_external?(route) do
    route_name(route)
  end

  defp headsign(%{mode: %{trip: %{headsign: headsign}}}) when not is_nil(headsign) do
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
    <ul class="w-full m-0 pl-0 flex flex-col divide-y divide-gray-lightest">
      <li
        :for={stop <- @leg.mode.intermediate_stops}
        class="inline-flex items-center gap-x-2 py-2 relative"
      >
        <.icon name="circle" class="h-1.5 w-1.5 absolute -left-[1.3125rem] fill-white" />
        {stop.name}
      </li>
    </ul>
    """
  end
end
