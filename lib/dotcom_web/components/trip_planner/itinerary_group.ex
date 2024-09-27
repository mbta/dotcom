defmodule DotcomWeb.Components.TripPlanner.ItineraryGroup do
  @moduledoc """
  A component to render an itinerary group.
  """

  use Phoenix.Component

  import DotcomWeb.Components.TripPlanner.Leg

  attr :group, :map

  @doc """
  Renders a single itinerary group.
  """
  def itinerary_group(assigns) do
    ~H"""
    <div class="mb-3 p-2 bg-slate-700">
      <div class="text-slate-100">Group with <%= Enum.count(@group) %> options</div>
      <%= for variation <- @group do %>
        <div class="mb-1 p-1 bg-indigo-100">
          <div class="text-2xl">
            <%= format_datetime(variation.departure) %> — <%= format_datetime(variation.arrival) %>
          </div>
          <ul class="list-none p-0">
            <%= for leg <- variation.legs do %>
              <li>
                <.leg
                  start_time={leg.start}
                  end_time={leg.stop}
                  from={leg.from}
                  to={leg.to}
                  mode={leg.mode}
                />
              </li>
            <% end %>
          </ul>
        </div>
      <% end %>
    </div>
    """
  end

  defp format_datetime(datetime) do
    Timex.format!(datetime, "%-I:%M %p", :strftime)
  end
end
