defmodule DotcomWeb.Components.TripPlanner.Leg do
  @moduledoc """
  Renders information about an itinerary's leg, going from one place to another via either transit or walking.
  """

  use DotcomWeb, :component

  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias DotcomWeb.ViewHelpers
  alias Dotcom.TripPlan.{PersonalDetail, TransitDetail}
  alias OpenTripPlannerClient.Schema.Step
  alias Stops.Stop

  attr :from, :any
  attr :to, :any
  attr :start_time, :any
  attr :end_time, :any
  attr :mode, :any

  def leg(assigns) do
    ~H"""
    <div class="bg-zinc-100 border-solid border-zinc-300 p-3 m-1">
      <div class="flex items-center justify-between">
        <strong><%= @from.name %></strong>
        <span><%= format_time(@start_time) %></span>
      </div>
      <div>
        <.mode mode={@mode} />
      </div>
      <div class="flex items-center justify-between">
        <strong><%= @to.name %></strong>
        <span><%= format_time(@end_time) %></span>
      </div>
    </div>
    """
  end

  defp format_time(datetime), do: Timex.format!(datetime, "%-I:%M %p", :strftime)

  attr :mode, :any

  def mode(assigns) do
    case assigns.mode do
      %PersonalDetail{} ->
        ~H"""
        <.walking_steps steps={assigns.mode.steps} />
        """

      %TransitDetail{} ->
        ~H"""
        <.transit
          route={assigns.mode.route}
          trip_id={assigns.mode.trip_id}
          stops={assigns.mode.intermediate_stops}
        />
        """
    end
  end

  def transit(assigns) do
    ~H"""
    <div class="text-lg">
      <%= ViewHelpers.line_icon(@route, :default) %> (<%= @route.name %>) on trip <%= @trip_id %>
    </div>
    <ul class="list-decimal">
      <li :for={stop <- @stops} class="text-sm text-zinc-500">
        <%= stop.name %> <%= if Stop.accessible?(stop),
          do: SvgIconWithCircle.svg_icon_with_circle(%SvgIconWithCircle{icon: :access}) %>
      </li>
    </ul>
    """
  end

  def walking_steps(assigns) do
    ~H"""
    <ul class="list-decimal">
      <li :for={step <- @steps} class="text-sm text-zinc-500">
        <%= Step.walk_summary(step) %>
      </li>
    </ul>
    """
  end
end
