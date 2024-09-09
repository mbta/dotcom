defmodule DotcomWeb.Components.TripPlanner.ItineraryGroup do
  @moduledoc """
  A component to render an itinerary group.
  """

  use Phoenix.Component

  alias TripPlan.{Leg, PersonalDetail, TransitDetail}

  attr :group, :map

  @doc """
  Renders a single itinerary group.
  """
  def itinerary_group(assigns) do
    ~H"""
    <div class="itinerary-group tw-m-3 tw-p-3 tw-border-solid tw-border-1 tw-border-indigo-200">
      <div class="itinerary-group-legs">
        <ol>
          <%= for variation <- @group do %>
            <li class="itinerary-group-leg">
              <h6>
                DEPARTURE TIME
                <span class="tw-text-small tw-text-slate-500">
                  <%= format_datetime(variation.departure) %>
                </span>
              </h6>
              <h6>DIRECTIONS</h6>
              <ul>
                <%= for leg <- variation.legs do %>
                  <li>
                    <%= leg_to_string(leg) %>
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

  defp leg_to_string(%Leg{mode: %PersonalDetail{}} = leg) do
    "WALK #{leg.distance} MILES FROM #{leg.from.name} TO #{leg.to.name}"
  end

  defp leg_to_string(%Leg{mode: %TransitDetail{mode: "BUS"} = mode} = leg) do
    "TAKE THE #{mode.route.id} BUS FROM #{leg.from.name} TO #{leg.to.name}"
  end

  defp leg_to_string(%Leg{mode: %TransitDetail{mode: _} = mode} = leg) do
    "TAKE THE #{mode.route.long_name} #{mode.mode} FROM #{leg.from.name} TO #{leg.to.name}"
  end

  defp leg_to_string(%Leg{mode: %struct{}}) do
    Sentry.capture_message("Missing leg type %s", interpolation_parameters: [struct])

    "UNKNOWN #{struct}"
  end
end
