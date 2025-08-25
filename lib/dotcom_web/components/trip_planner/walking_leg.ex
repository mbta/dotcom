defmodule DotcomWeb.Components.TripPlanner.WalkingLeg do
  @moduledoc """
  A walking leg of a trip.
  Includes a summary of the walk (time and distance) and a list of steps.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.Helpers, only: [walk_summary: 1]
  import MbtaMetro.Components.Icon, only: [icon: 1]
  import MbtaMetro.Components.List, only: [list: 1]

  alias OpenTripPlannerClient.Schema.Leg

  @doc """
  Renders a walking leg.
  """

  attr :leg, Leg, required: true

  def walking_leg(assigns) do
    ~H"""
    <div class="px-3">
      <div class="flex items-stretch gap-x-2">
        <div class="flex flex-col items-center">
          <div class="w-5"></div>
          <div class={["w-0.5 flex-grow bg-black"]}></div>
        </div>

        <details class="border-y border-x-0 border-gray-lightest my-3 w-full group">
          <summary class="flex w-full gap-x-3.5 py-3 cursor-pointer">
            <.icon name="person-walking" class="shrink-0 w-4 h-6 fill-black" aria-hidden="true" />
            <div class="flex flex-col text-sm">
              <div class="font-medium">{~t(Walk)}</div>
              <div>{walk_summary(@leg)}</div>
            </div>
            <.icon
              aria-hidden="true"
              name="chevron-down"
              class="ml-auto shrink-0 w-4 h-4 fill-brand-primary group-open:rotate-180"
            />
          </summary>
          <.list class="m-0">
            <:item :for={step <- @leg.steps}>
              <span class="text-sm">
                {walk_summary(step)}
              </span>
            </:item>
          </.list>
        </details>
      </div>
    </div>
    """
  end
end
