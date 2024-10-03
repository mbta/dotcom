defmodule DotcomWeb.Components.TripPlanner.ItineraryGroup do
  @moduledoc """
  A component to render an itinerary group.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.Leg

  attr :group, :map

  @doc """
  Renders a single itinerary group.
  """
  def itinerary_group(assigns) do
    ~H"""
    <div class="mb-3 p-2 border border-2 border-slate-200">
      <div class="text-slate-800 font-bold">Group with <%= Enum.count(@group) %> options</div>
      <.accordion :for={{variation, index} <- Enum.with_index(@group)} open={index === 0}>
        <:heading>
          <%= format_datetime(variation.departure) %> — <%= format_datetime(variation.arrival) %>
        </:heading>
        <:content>
          <div :for={leg <- variation.legs}>
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

  defp format_datetime(datetime) do
    Timex.format!(datetime, "%-I:%M %p", :strftime)
  end
end
