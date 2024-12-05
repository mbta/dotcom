defmodule DotcomWeb.Components.TripPlanner.WalkingLeg do
  @moduledoc false

  use Phoenix.Component

  import MbtaMetro.Components.Accordion, only: [accordion: 1]
  import MbtaMetro.Components.Icon, only: [icon: 1]
  import MbtaMetro.Components.List, only: [list: 1]

  alias OpenTripPlannerClient.Schema.Step

  def walking_leg(assigns) do
    ~H"""
    <.accordion id={@leg.polyline}>
      <:heading>
        <.icon name="person-walking" class="w-5 h-5 mr-6 fill-black" />
        <div class="text-black">
          <div class="text-md">
            Walk
          </div>
          <div class="text-sm">
            <%= @leg.duration %> min, <%= @leg.distance %> mi
          </div>
        </div>
      </:heading>
      <:content>
        <.list class="w-full m-0 ps-0">
          <:item :for={step <- @leg.mode.steps}>
            <span class="text-sm">
              <%= Step.walk_summary(step) %>
            </span>
          </:item>
        </.list>
      </:content>
    </.accordion>
    """
  end
end