defmodule DotcomWeb.Components.Timetable do
  @moduledoc """
  A timetable component
  """

  use DotcomWeb, :component

  import DotcomWeb.ScheduleView, only: [render: 2, timetable_crowding_description: 1]

  import DotcomWeb.ScheduleView.Timetable,
    only: [cell_flag_class: 1, cell_via_class: 1, ferry?: 1, stop_row_class: 1, stop_tooltip: 2]

  import DotcomWeb.ViewHelpers, only: [break_text_at_slash: 1, svg: 1]
  import MbtaMetro.Components.Icon

  def timetable(assigns) do
    ~H"""
    <div id="timetable" class="m-timetable__table-container" data-sticky-container>
      <table
        class="m-timetable__table"
        aria-label={"#{@direction_name} #{~t(timetable for)} #{@route.name}, #{@formatted_date}"}
      >
        <tr class="js-timetable-train-labels">
          <th
            scope="col"
            class="m-timetable__cell m-timetable__cell--gray m-timetable__cell--first-column m-timetable__cell--first-column-header"
            data-absolute
          >
            <div class="m-timetable__row-header">{~t(Stops)}</div>
          </th>
          <td class="hidden-no-js">
            <div class="m-timetable__row-header"></div>
          </td>
          <%= for {schedule, index} <- Enum.with_index(@header_schedules) do %>
            <%= content_tag :th, [scope: "col", class: "m-timetable__header-cell", data: if index == assigns[:offset] do [scroll: [to: true]] end] do %>
              <span class="sr-only left-0">{~t(Trip)}</span>
              <span>{schedule.trip.name}</span>
            <% end %>
          <% end %>
        </tr>
        <%= if not ferry?(@route) do %>
          <tr>
            <th
              scope="row"
              class="m-timetable__cell m-timetable__cell--gray m-timetable__cell--first-column m-timetable__cell--first-column-header m-timetable__bike-icon-spacer"
              data-absolute
            >
              <div class="m-timetable__row-header">
                <span class="sr-only">{~t(Bicycles Allowed?)}</span>
                {# this icon is set to visibility: hidden by CSS;
                # it's needed to keep the absolutely positioned
                # header cell height consistent with the cells
                # that have icons in them.
                svg("icon-bikes-default.svg")}
              </div>
            </th>
            <td class="hidden-no-js">
              <div class="m-timetable__row-header"></div>
            </td>
            <%= for schedule <- @header_schedules do %>
              <td class="m-timetable__header-cell">
                <%= if get_in(schedule, [Access.key(:trip, %{}), Access.key(:bikes_allowed?, false)]) do %>
                  {content_tag(:span, svg("icon-bikes-default.svg"),
                    data: [toggle: "tooltip"],
                    title: ~t(Bicycles allowed),
                    class: "bicycles-allowed-icon",
                    aria_hidden: "true"
                  )}
                  <div class="sr-only">{~t(Bicycles allowed)}</div>
                <% else %>
                  <div class="sr-only">{~t(Bicycles not allowed)}</div>
                <% end %>
                <.tooltip
                  :if={
                    !is_nil(get_in(schedule, [Access.key(:trip, %{}), Access.key(:occupancy, nil)]))
                  }
                  title={timetable_crowding_description(schedule.trip.occupancy)}
                  placement={:top}
                >
                  <.icon
                    type="icon-svg"
                    name="icon-crowding"
                    class={"c-svg__icon c-icon__crowding c-icon__crowding--#{schedule.trip.occupancy} monochrome"}
                    aria-hidden="true"
                  />
                </.tooltip>
              </td>
            <% end %>
          </tr>
        <% end %>
        <%= for {stop, idx} <- @header_stops do %>
          <% cell_background =
            if rem(idx, 2) == 0 do
              "white"
            else
              "gray"
            end %>
          <%= content_tag :tr, [class: stop_row_class(idx)] do %>
            <%= content_tag :th, [
              scope: "row",
              data: [absolute: true],
              class: "js-tt-stop-name m-timetable__cell--first-column m-timetable__cell m-timetable__cell--" <>
                cell_background
            ] do %>
              <div class="m-timetable__row-header m-timetable__stop-name notranslate">
                <%= link to: ~p"/stops/#{stop.id}", class: "m-timetable__stop-link" do %>
                  {break_text_at_slash(stop.name)}
                <% end %>
                <div class="m-timetable__stop-icons">
                  <%= if length(stop.parking_lots) > 0 do %>
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

                  <%= if Stops.Stop.accessible?(stop) do %>
                    <.tooltip title={~t(Accessible)} placement={:top}>
                      <.icon
                        type="icon-svg"
                        name="icon-accessible-default"
                        class="size-4 fill-brand-primary"
                        aria-hidden="true"
                      />
                    </.tooltip>
                  <% else %>
                    <%= if Stops.Stop.accessibility_known?(stop) do %>
                      <span class="sr-only">{~t(Not accessible)}</span>
                    <% else %>
                      <span class="sr-only">{~t(May not be accessible)}</span>
                    <% end %>
                  <% end %>

                  <%= if Alerts.Stop.match(@alerts, stop.id, route: @route.id, time: @date, direction_id: @direction_id) != [] do %>
                    <.tooltip title={~t(Service alert or delay)} placement={:top}>
                      <.icon name="triangle-exclamation" class="h-4 w-4" aria-hidden="true" />
                    </.tooltip>
                  <% end %>
                </div>
              </div>
            <% end %>
            <td class="js-tt-cell hidden-no-js" style="padding-left: 0.5rem">
              <div class="m-timetable__row-header"></div>
            </td>
            <%= if assigns[:use_pdf_schedules?] do %>
              <td
                :for={trip <- Enum.at(@timetable_schedules, idx)}
                class="js-tt-cell m-timetable__cell px-lg"
              >
                {trip.time}
              </td>
            <% end %>
            <%= for schedule <- @header_schedules, !assigns[:use_pdf_schedules?] do %>
              <% trip_id = schedule.trip.id
              trip_schedule = @trip_schedules[{trip_id, stop.id} || %{}]
              track_change = @track_changes[{trip_id, stop.id} || nil]
              tooltip = stop_tooltip(trip_schedule, track_change)
              full_trip_message = @trip_messages[{schedule.trip.name}]
              trip_message = @trip_messages[{schedule.trip.name, stop.id}]
              tooltip_attrs = [html: "true", toggle: "tooltip"] %>
              <%= content_tag :td, [
                class: "js-tt-cell m-timetable__cell" <> cell_flag_class(trip_schedule) <> cell_via_class(trip_message),
                id: "#{stop.name}-#{trip_id}-tooltip",
                data: if tooltip do tooltip_attrs ++ [stop: raw(tooltip)] else tooltip_attrs end,
                title: if tooltip do raw(tooltip) end
              ] do %>
                <%= if trip_message do %>
                  <div class="sr-only">{full_trip_message}</div>
                  <div aria-hidden="true">{trip_message}</div>
                <% else %>
                  {render(
                    "_timetable_schedule.html",
                    Map.merge(assigns, %{
                      trip_schedule: trip_schedule,
                      stop: stop,
                      track_change: track_change
                    })
                  )}
                <% end %>
              <% end %>
            <% end %>
          <% end %>
        <% end %>
      </table>
    </div>
    """
  end
end
