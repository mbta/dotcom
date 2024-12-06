defmodule DotcomWeb.Components.TripPlanner.WalkingLeg do
  @moduledoc """
  A walking leg of a trip.
  Includes a summary of the walk (time and distance) and a list of steps.
  """

  use Phoenix.Component

  import MbtaMetro.Components.Accordion, only: [accordion: 1]
  import MbtaMetro.Components.Icon, only: [icon: 1]
  import MbtaMetro.Components.List, only: [list: 1]

  alias OpenTripPlannerClient.Schema.Step

  @doc """
  Renders a walking leg.

  Must be given a `leg` with a:
    - `distance` (float) in miles
    - `duration` (integer) in minutes
    - `mode` with a list of `steps` (list of `Step` structs)
  """

  attr :leg, :map, required: true

  def walking_leg(assigns) do
    ~H"""
    <div class="ml-6 py-1 border-l-2 border-black pl-4">
      <hr class="my-1 border-t-solid border-slate-300" />
      <.accordion>
        <:heading>
          <.icon name="person-walking" class="w-5 h-5 mr-1 fill-black" />
          <div class="text-black">
            <div class="text-base">
              Walk
            </div>
            <div class="text-sm">
              {@leg.duration} min, {@leg.distance} mi
            </div>
          </div>
        </:heading>
        <:content>
          <.list class="w-full m-0 ps-0">
            <:item :for={step <- @leg.mode.steps}>
              <span class="text-sm">
                {Step.walk_summary(step)}
              </span>
            </:item>
          </.list>
        </:content>
      </.accordion>
      <hr class="my-1 border-t-solid border-slate-300" />
    </div>
    """
  end
end
