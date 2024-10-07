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
      <% [first | rest] = @group %>
      <div class="text-slate-800 font-bold">Group with <%= Enum.count(@group) %> options</div>
      <.accordion id="itinerary_group">
        <:heading>
          <%= format_datetime_full(first.departure) %> — <%= format_datetime_full(first.arrival) %>
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
          <%= if Enum.count(rest) > 0, do: "Similar trips depart at:" %>
          <span :for={alternative <- rest}>
            <%= format_datetime_short(alternative.departure) %>
          </span>
        </:content>
      </.accordion>
    </div>
    """
  end

  defp format_datetime_full(datetime) do
    Timex.format!(datetime, "%-I:%M %p", :strftime)
  end

  defp format_datetime_short(datetime) do
    Timex.format!(datetime, "%-I:%M", :strftime)
  end
end
