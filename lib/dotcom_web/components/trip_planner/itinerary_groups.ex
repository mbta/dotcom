defmodule DotcomWeb.Components.TripPlanner.ItineraryGroups do
  @moduledoc """
  A component to render a list of itinerary groups.
  """

  use Phoenix.Component

  import DotcomWeb.Components.TripPlanner.ItineraryGroup, only: [itinerary_group: 1]

  attr :groups, :list

  @doc """
  Renders a list of itinerary groups.
  """
  def itinerary_groups(assigns) do
    ~H"""
    <div class="itinerary-groups">
      <%= for group <- @groups do %>
        <.itinerary_group group={group} />
      <% end %>
    </div>
    """
  end
end
