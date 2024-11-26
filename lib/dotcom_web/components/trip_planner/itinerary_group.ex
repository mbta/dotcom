defmodule DotcomWeb.Components.TripPlanner.ItineraryGroup do
  @moduledoc """
  A component to render an itinerary group.
  """
  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.ItinerarySummary

  attr(:summary, :map, doc: "ItineraryGroups.summary()", required: true)
  attr(:itineraries, :list, doc: "List of %Dotcom.TripPlan.Itinerary{}", required: true)

  attr(:index, :integer,
    doc: "Index into the full list where this itinerary group sits",
    required: true
  )

  attr :target, :string, doc: "The target that should receive events", required: true

  attr :details_click_event, :string,
    doc: "The event that fires when 'Details' is clicked",
    required: true

  @doc """
  Renders a single itinerary group.
  """
  def itinerary_group(assigns) do
    ~H"""
    <div class="border border-solid m-4 p-4">
      <div
        :if={@summary.tag}
        class="whitespace-nowrap leading-none font-bold font-heading text-sm uppercase bg-brand-primary-darkest text-white px-3 py-2 mb-3 -ml-4 -mt-4 rounded-br-lg w-min"
      >
        <%= @summary.tag %>
      </div>
      <.itinerary_summary summary={@summary} />
      <div class="flex justify-end items-center">
        <div :if={Enum.count(@summary.next_starts) > 0} class="grow text-sm text-grey-dark">
          Similar trips depart at <%= Enum.map(@summary.next_starts, &format_datetime_short/1)
          |> Enum.join(", ") %>
        </div>
        <button
          class="btn-link font-semibold underline"
          phx-click={@details_click_event}
          phx-target={@target}
          phx-value-index={@index}
        >
          Details
        </button>
      </div>
    </div>
    """
  end

  attr(:class, :string, default: "")
  attr(:routes, :list, required: true, doc: "List of %Routes.Route{}")
  attr(:walk_minutes, :integer, required: true)

  defp format_datetime_short(datetime) do
    Timex.format!(datetime, "%-I:%M", :strftime)
  end
end
