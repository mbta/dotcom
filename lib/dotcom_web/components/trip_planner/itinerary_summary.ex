defmodule DotcomWeb.Components.TripPlanner.ItinerarySummary do
  @moduledoc """
  A component that renders the summary for a given itinerary
  """

  use DotcomWeb, :component

  attr :summary, :map, required: true

  def itinerary_summary(assigns) do
    ~H"""
    <div>
      <div class="flex flex-row mb-3 font-bold text-lg justify-between">
        <div>
          {format_datetime_full(@summary.start)} - {format_datetime_full(@summary.stop)}
        </div>
        <div>
          {@summary.duration} min
        </div>
      </div>
      <div class="flex flex-wrap gap-1 items-center content-center mb-3">
        <%= for {summary_leg, index} <- Enum.with_index(@summary.summarized_legs) do %>
          <.icon :if={index > 0} name="angle-right" class="font-black w-2" />
          <.leg_icon {summary_leg} />
        <% end %>
      </div>
      <div class="flex flex-wrap gap-1 items-center mb-3 text-sm text-grey-dark">
        <div class="inline-flex items-center gap-0.5">
          <%= if @summary.accessible? do %>
            <.icon type="icon-svg" name="icon-accessible-small" class="h-3 w-3 mr-0.5" /> Accessible
          <% else %>
            <.icon type="icon-svg" name="icon-not-accessible-small" class="h-4 w-4 mr-0.5" />
            May not be accessible
          <% end %>
          <.icon name="circle" class="h-0.5 w-0.5 mx-1" />
        </div>
        <div class="inline-flex items-center gap-0.5">
          <.icon name="person-walking" class="h-3 w-3" />
          {@summary.walk_distance} mi
        </div>
        <% price = Fares.Format.price(@summary.total_cost) %>
        <div :if={price != ""} class="inline-flex items-center gap-0.5">
          <.icon name="circle" class="h-0.5 w-0.5 mx-1" />
          <.icon name="wallet" class="h-3 w-3" />
          {price}
        </div>
      </div>
    </div>
    """
  end

  attr(:class, :string, default: "")
  attr(:routes, :list, required: true, doc: "List of %Routes.Route{}")
  attr(:walk_minutes, :integer, required: true)

  # No routes: this is a walking leg
  defp leg_icon(%{routes: [], walk_minutes: _} = assigns) do
    ~H"""
    <span class={[
      "flex items-center gap-1 text-sm font-semibold leading-none whitespace-nowrap py-1 px-2 rounded-full border-[1px] border-gray-light",
      @class
    ]}>
      <.icon name="person-walking" class="h-4 w-4" />
      <span>{@walk_minutes} min</span>
    </span>
    """
  end

  # Group of commuter rail routes are summarized to one symbol.
  defp leg_icon(%{routes: [%Routes.Route{type: 2} | _]} = assigns) do
    ~H"""
    <.route_symbol route={List.first(@routes)} class={@class} />
    """
  end

  # No grouping when there's only one route!
  defp leg_icon(%{routes: [%Routes.Route{}]} = assigns) do
    ~H"""
    <.route_symbol route={List.first(@routes)} {assigns} />
    """
  end

  defp leg_icon(
         %{routes: [%Routes.Route{type: type, external_agency_name: agency} | _]} = assigns
       ) do
    slashed? = type == 3 && is_nil(agency)

    assigns =
      assigns
      |> assign(:slashed?, slashed?)
      |> assign(
        :grouped_classes,
        if(slashed?,
          do: "[&:not(:first-child)]:rounded-l-none [&:not(:last-child)]:rounded-r-none",
          else: "rounded-full ring-white ring-2"
        )
      )

    ~H"""
    <div class="flex items-center -space-x-0.5">
      <%= for {route, index} <- Enum.with_index(@routes) do %>
        <.route_symbol route={route} class={"#{@grouped_classes} #{zindex(index)} #{@class}"} />

        <div
          :if={@slashed? and index < Kernel.length(@routes) - 1}
          class={"bg-white -mt-0.5 w-1 h-7 #{zindex(index)} transform rotate-[17deg]"}
        >
        </div>
      <% end %>
    </div>
    """
  end

  defp leg_icon(assigns) do
    inspect(assigns) |> Sentry.capture_message(tags: %{feature: "Trip Planner"})

    ~H"""
    <span></span>
    """
  end

  defp zindex(index) do
    "z-#{50 - index * 10}"
  end

  defp format_datetime_full(datetime) do
    Timex.format!(datetime, "%-I:%M%p", :strftime) |> String.downcase()
  end
end
