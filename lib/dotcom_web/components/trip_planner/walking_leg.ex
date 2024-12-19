defmodule DotcomWeb.Components.TripPlanner.WalkingLeg do
  @moduledoc """
  A walking leg of a trip.
  Includes a summary of the walk (time and distance) and a list of steps.
  """

  use Phoenix.Component

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
    <div class="px-3">
      <div class="flex items-stretch gap-x-2">
        <div class="flex flex-col items-center">
          <div class="w-5"></div>
          <div class={["w-0.5 flex-grow bg-black"]}></div>
        </div>

        <details class="border-y border-x-0 border-gray-lightest my-3 w-full group">
          <summary class="flex w-full gap-x-3.5 py-3">
            <.icon name="person-walking" class="shrink-0 w-4 h-6 fill-black" />
            <div class="flex flex-col text-sm">
              <div class="font-medium">Walk</div>
              <div>
                {@leg.duration} min, {@leg.distance} mi
              </div>
            </div>
            <.icon
              name="chevron-down"
              class="ml-auto shrink-0 w-4 h-4 fill-brand-primary group-open:rotate-180"
            />
          </summary>
          <.list class="m-0">
            <:item :for={step <- @leg.mode.steps}>
              <span class="text-sm">
                {Step.walk_summary(step)}
              </span>
            </:item>
          </.list>
        </details>
      </div>
    </div>
    """
  end
end
