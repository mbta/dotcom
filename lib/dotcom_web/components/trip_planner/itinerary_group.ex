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
    <div class="itinerary-group m-3 mt-0 p-3 border-solid border-1 border-indigo-200">
      <div class="itinerary-group-legs">
        <ol class="list-decimal">
          <%= for variation <- @group do %>
            <li class="itinerary-group-leg">
              <h6>
                DEPARTURE TIME
                <span class="text-small text-slate-500">
                  <%= format_datetime(variation.departure) %>
                </span>
              </h6>
              <ul class="list-none">
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
            </li>
          <% end %>
        </ol>
      </div>
    </div>
    """
  end

  defp format_datetime(datetime) do
    Timex.format!(datetime, "%-I:%M %p", :strftime)
  end
end
