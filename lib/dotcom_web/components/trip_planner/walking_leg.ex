defmodule DotcomWeb.Components.TripPlanner.WalkingLeg do
  @moduledoc """

  """

  use Phoenix.Component

  import MbtaMetro.Components.Accordion, only: [accordion: 1]
  import MbtaMetro.Components.Icon, only: [icon: 1]
  import MbtaMetro.Components.List, only: [list: 1]

  alias OpenTripPlannerClient.Schema.Step

  attr :leg, :map

  def walking_leg(assigns) do
    ~H"""
    <hr class="my-2 border-t-solid border-slate-200"/>
    <.accordion id={@leg.polyline}>
      <:heading>
        <.icon name="person-walking" class="w-5 h-5 mr-1 fill-black" />
        <div class="text-black">
          <div class="text-base">
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
