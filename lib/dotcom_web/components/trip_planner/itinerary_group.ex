defmodule DotcomWeb.Components.TripPlanner.ItineraryGroup do
  @moduledoc """
  A component to render an itinerary group.
  """

  import DotcomWeb.Components.{ModeIcons, Svg}
  alias Dotcom.TripPlan.{TransitDetail, PersonalDetail}
  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.Leg

  attr :group, :map

  @doc """
  Renders a single itinerary group.
  """
  def itinerary_group(assigns) do
    ~H"""
    <% [first | rest] = @group %>
    <% [first_leg | rest_of_legs] = first.legs %>
    <div class="border border-gray-lighter border-solid m-4 p-4">
      <div class="flex flex-row mb-3">
        <div class="font-bold text-lg mr-auto">
          <%= format_datetime_full(first.departure) %> - <%= format_datetime_full(first.arrival) %>
        </div>
        <div class="font-bold text-lg">
          <%= format_trip_duration(%{arrival: first.arrival, departure: first.departure}) %>
        </div>
      </div>
      <div class="flex flex-row items-center mb-3">
        <.leg_icon leg={first_leg} mode={first_leg.mode} class="mr-1" />
        <%= for leg <- rest_of_legs do %>
          <i class="fa-solid fa-angle-right mr-1 font-black" />
          <.leg_icon leg={leg} mode={leg.mode} class="mr-1" />
        <% end %>
      </div>
      <%= if Enum.count(rest) > 0, do: "Similar trips depart at " %>
      <span :for={alternative <- rest}>
        <%= format_datetime_short(alternative.departure) %>
      </span>
      <.accordion id="itinerary-group">
        <:heading>
          Details
        </:heading>
        <:content>
          <div :for={leg <- first.legs}>
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
        </:content>
      </.accordion>
    </div>
    """
  end

  attr :class, :string, default: ""
  attr :mode, :any, required: true
  attr :leg, :any, required: true

  defp leg_icon(%{mode: %PersonalDetail{}, leg: %{duration: duration}} = assigns) do
    assigns = assigns |> assign(:duration, duration)

    ~H"""
    <span class={[
      "flex items-center text-center p-2 rounded-full border border-solid border-gray-light h-6",
      @class
    ]}>
      <.walk_icon height="12px" class="mr-1" />
      <span class="text-sm font-semibold whitespace-nowrap"><%= @duration %> min</span>
    </span>
    """
  end

  defp leg_icon(%{mode: %TransitDetail{route: %{name: route_name} = route}} = assigns) do
    assigns =
      assigns
      |> assign(:route_name, route_name)
      |> assign(:icon_atom, Routes.Route.icon_atom(route))

    ~H"""
    <.mode_icon type={@icon_atom} route_name={@route_name} class={@class} />
    """
  end

  defp leg_icon(assigns) do
    ~H"""
    <span>Leg</span>
    """
  end

  defp format_datetime_full(datetime) do
    Timex.format!(datetime, "%-I:%M %p", :strftime)
  end

  defp format_trip_duration(%{arrival: arrival, departure: departure}) do
    minutes =
      Timex.diff(arrival, departure, :duration)
      |> Timex.Duration.to_minutes(truncate: true)

    "#{minutes} min"
  end

  defp format_datetime_short(datetime) do
    Timex.format!(datetime, "%-I:%M", :strftime)
  end
end
