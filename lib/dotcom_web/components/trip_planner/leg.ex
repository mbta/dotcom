defmodule DotcomWeb.Components.TripPlanner.Leg do
  @moduledoc """
  Renders information about an itinerary's leg, going from one place to another via either transit or walking.
  """

  use DotcomWeb, :component

  alias Dotcom.TripPlan.{PersonalDetail, TransitDetail}
  alias OpenTripPlannerClient.Schema.Step
  alias Stops.Stop

  attr(:from, :any)
  attr(:to, :any)
  attr(:start_time, :any)
  attr(:end_time, :any)
  attr(:mode, :any)
  attr(:realtime, :boolean)
  attr(:realtime_state, :string)

  def leg(assigns) do
    assigns =
      assign(
        assigns,
        :realtime_class,
        if(assigns.realtime,
          do: "bg-emerald-100 border-emerald-600 border-4",
          else: "bg-zinc-100 border-zinc-300"
        )
      )

    ~H"""
    <div class={"border-solid #{@realtime_class} p-3 m-1"}>
      <div class="flex items-center justify-between">
        <strong>{@from.name}</strong>
        <span>{format_time(@start_time)}</span>
      </div>
      <div>
        <p :if={@realtime_state}>Realtime data: {@realtime_state}</p>
        <.mode mode={@mode} />
      </div>
      <div class="flex items-center justify-between">
        <strong>{@to.name}</strong>
        <span>{format_time(@end_time)}</span>
      </div>
    </div>
    """
  end

  defp format_time(datetime), do: Timex.format!(datetime, "%-I:%M %p", :strftime)

  attr(:mode, :any)

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
      <.route_symbol route={@route} /> ({@route.name}) on trip {@trip_id}
    </div>
    <ul class="list-decimal">
      <li :for={stop <- @stops} class="text-sm text-zinc-500">
        {stop.name}
        <div :if={Stop.accessible?(stop)} class="inline-flex items-center gap-0.5">
          <.icon
            type="icon-svg"
            name="icon-accessible-small"
            class="h-3 w-3 mr-0.5"
            aria-hidden="true"
          /> Accessible
        </div>
      </li>
    </ul>
    """
  end

  def walking_steps(assigns) do
    ~H"""
    <ul class="list-decimal">
      <li :for={step <- @steps} class="text-sm text-zinc-500">
        {Step.walk_summary(step)}
      </li>
    </ul>
    """
  end
end
