defmodule DotcomWeb.Components.NewTimetable do
  @moduledoc """
  A new timetable component
  """

  use DotcomWeb, :component

  alias Dotcom.Timetables

  attr :id, :string, required: true
  attr :timetable, Timetables.Timetable, required: true
  attr :direction_name, :string, required: true
  attr :route, Routes.Route, required: true

  def timetable(assigns) do
    assigns =
      assigns
      |> assign(:offset, Timetables.first_unfinished_trip_index(assigns.timetable, assigns.now))
      |> assign(:earlier_button_id, "#{assigns.id}-button-earlier")
      |> assign(:later_button_id, "#{assigns.id}-button-later")

    ~H"""
    <div
      class="w-full overflow-x-auto border-xs border-gray-lighter"
      id={@id}
      phx-hook="TimetableScrollBar"
      data-earlier-button-id={@earlier_button_id}
      data-later-button-id={@later_button_id}
    >
      <div class="w-full flex sticky left-0" aria-hidden="true">
        <div class={"bg-gray-bordered-background #{header_column_classes()} shrink-0 border-r-xs border-gray-lighter relative"}>
          <.shadow class="translate-x-[0.0625rem]" />
        </div>

        <div class="grow bg-brand-primary-lightest-contrast p-2 grid grid-cols-[max-content,_auto,max-content]">
          <div class="justify-self-start">
            <.scroll_button id={@earlier_button_id} scroll_direction={-1} timetable_id={@id}>
              <.icon class="size-3.5" name="angle-left" />
              <span class="hidden sm:block">
                {gettext("Earlier %{vehicle_name}", vehicle_name: vehicle_name(@route))}
              </span>
            </.scroll_button>
          </div>
          <div class="justify-self-center self-center font-bold">{vehicle_name(@route)}</div>
          <div class="justify-self-end">
            <.scroll_button id={@later_button_id} scroll_direction={1} timetable_id={@id}>
              <span class="hidden sm:block">
                {gettext("Later %{vehicle_name}", vehicle_name: vehicle_name(@route))}
              </span>
              <.icon class="size-3.5" name="angle-right" />
            </.scroll_button>
          </div>
        </div>
      </div>
      <table aria-label={
        gettext("%{direction_name} timetable for %{route_name}, %{formatted_date}",
          direction_name: @direction_name,
          formatted_date: @formatted_date,
          route_name: @route.name
        )
      }>
        <thead :if={!ferry?(@route)} class="h-10">
          <tr>
            <th class="bg-gray-bordered-background sticky left-0 relative">
              <div class="border-r-xs border-gray-lighter w-full h-10"></div>
              <.shadow />
            </th>
            <th
              :for={trip <- @timetable.trips}
              class="bg-brand-primary-lightest-contrast p-2"
              scope="col"
            >
              <div class="flex justify-content-center" aria-label={"Train #{trip.name}"}>
                {trip.name}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr :for={row <- @timetable.rows} class="even:bg-gray-bordered-background odd:bg-white">
            <th
              class="sticky left-0"
              style="background-color: inherit;"
            >
              <div class={"#{header_column_classes()} px-2 py-1 font-medium #{font_size_classes()} border-r-xs border-gray-lighter flex gap-2"}>
                <.link navigate={~p"/stops/#{row.stop.id}"} class="mr-auto">{row.stop.name}</.link>
                <div class="flex items-center gap-0.5">
                  <%= if length(row.stop.parking_lots) > 0 do %>
                    <.tooltip title={~t(Parking available)} placement={:top}>
                      <.icon
                        name="square-parking"
                        class="size-4 fill-gray-light"
                        aria-hidden="true"
                      />
                    </.tooltip>
                  <% else %>
                    <span class="sr-only">{~t(No parking)}</span>
                  <% end %>

                  <%= if Stops.Stop.accessible?(row.stop) do %>
                    <.tooltip title={~t(Accessible)} placement={:top}>
                      <.icon
                        type="icon-svg"
                        name="icon-accessible-default"
                        class="size-4 fill-brand-primary"
                        aria-hidden="true"
                      />
                    </.tooltip>
                  <% else %>
                    <%= if Stops.Stop.accessibility_known?(row.stop) do %>
                      <span class="sr-only">{~t(Not accessible)}</span>
                    <% else %>
                      <span class="sr-only">{~t(May not be accessible)}</span>
                    <% end %>
                  <% end %>
                </div>
              </div>
              <.shadow />
            </th>
            <td
              :for={{cell, index} <- Enum.with_index(row.cells)}
              class="px-4 border-r-xs last:border-r-0 border-gray-lighter"
              data-scroll-to={index == @offset}
            >
              <div class={"flex justify-content-end #{font_size_classes()}"}>
                <time datetime={cell.time} class="tabular-nums whitespace-nowrap">
                  {format!(cell.time)}
                </time>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    """
  end

  attr :id, :string, required: true
  attr :scroll_direction, :integer, required: true, values: [-1, 1]
  attr :timetable_id, :string, required: true
  slot :inner_block

  defp scroll_button(assigns) do
    ~H"""
    <!--
    These buttons default to hidden because they rely on
    Javascript, which means that if Javascript is disabled, it
    doesn't make sense to show them. If Javascript is enabled,
    then the `TimetableScroll` hook removes the hidden class.
    -->
    <button
      aria-hidden="true"
      class="border-xs border-brand-primary bg-white px-2 py-1 rounded hidden disabled:opacity-50"
      id={@id}
      data-timetable-id={@timetable_id}
      data-scroll-direction={@scroll_direction}
      phx-hook="TimetableScroll"
    >
      <div class="flex items-center font-bold text-sm text-brand-primary fill-brand-primary border-brand-primary enabled:hover:cursor enabled:hover:text-brand-primary-darkest enabled:hover:fill-brand-primary-darkest enabled:hover:border-brand-primary-darkest">
        {render_slot(@inner_block)}
      </div>
    </button>
    """
  end

  attr :class, :string, default: ""

  defp shadow(assigns) do
    ~H"""
    <span class={"block absolute top-0 -right-1 h-full w-1 opacity-70 bg-gradient-to-r from-gray-lighter #{@class}"} />
    """
  end

  defp font_size_classes() do
    "text-sm md:text-md"
  end

  defp header_column_classes() do
    "w-36 sm:w-44 md:w-52"
  end

  defp ferry?(route), do: Routes.Route.type_atom(route) == :ferry

  defp format!(nil), do: ""
  defp format!(time), do: Dotcom.Utils.Time.format!(time, :hour_12_minutes)

  defp vehicle_name(route), do: Routes.Route.vehicle_name(route, plural: true)
end
