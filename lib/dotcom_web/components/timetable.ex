defmodule DotcomWeb.Components.Timetable do
  @moduledoc """
  A timetable component
  """

  use DotcomWeb, :component

  import DotcomWeb.ScheduleView, only: [timetable_crowding_description: 1]

  import DotcomWeb.ScheduleView.Timetable,
    only: [cell_flag_class: 1, cell_via_class: 1, ferry?: 1, stop_row_class: 1, stop_tooltip: 2]

  import DotcomWeb.ViewHelpers,
    only: [break_text_at_slash: 1, fa: 1, format_schedule_time: 1, svg: 1]

  import MbtaMetro.Components.Icon

  def linear_timetable(assigns) do
    ~H"""
    <div class="m-timetable__header hidden-no-js">
      <div class="m-timetable__cell m-timetable__cell--gray m-timetable__cell--first-column m-timetable__cell--first-column-header m-timetable__row-header--empty">
      </div>
      <div class="m-timetable__col-headers" aria-hidden="true">
        <% # only show scroll controllers if we have 2 or more schedules %>
        <%= if @trip_count >= 2 do %>
          <span class="m-timetable__trains-label">
            {Routes.Route.vehicle_name(@route) <> "s"}
          </span>
          <button
            class="m-timetable__scroll-btn m-timetable__scroll-btn--left btn btn-outline-primary btn-sm"
            data-scroll="earlier"
          >
            {fa("angle-left m-timetable__scroll-btn-arrow")} {~t(Earlier)} {Routes.Route.vehicle_name(
              @route
            ) <> "s"}
          </button>
          <button
            class="m-timetable__scroll-btn m-timetable__scroll-btn--right btn btn-outline-primary btn-sm"
            data-scroll="later"
          >
            {~t(Later)} {Routes.Route.vehicle_name(@route) <> "s"} {fa(
              "angle-right m-timetable__scroll-btn-arrow"
            )}
          </button>
        <% end %>
      </div>
    </div>
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
          <th
            :for={{schedule, index} <- Enum.with_index(@header_schedules)}
            class="m-timetable__header-cell"
            data-scroll-to={index == @offset}
            scope="col"
          >
            <span class="sr-only left-0">{~t(Trip)}</span>
            <span>{schedule.trip.name}</span>
          </th>
        </tr>

        <tr :if={!ferry?(@route)}>
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

          <td :for={schedule <- @header_schedules} class="m-timetable__header-cell">
            <%= if get_in(schedule, [Access.key(:trip, %{}), Access.key(:bikes_allowed?, false)]) do %>
              <span
                aria-hidden="true"
                class="bicycles-allowed-icon"
                data-toggle="tooltip"
                title
                data-original-title={~t"Bicycles allowed"}
              >
                {svg("icon-bikes-default.svg")}
              </span>
              <div class="sr-only">{~t(Bicycles allowed)}</div>
            <% else %>
              <div class="sr-only">{~t(Bicycles not allowed)}</div>
            <% end %>
            <.tooltip
              :if={!is_nil(get_in(schedule, [Access.key(:trip, %{}), Access.key(:occupancy, nil)]))}
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
        </tr>

        <tr :for={{stop, idx} <- @header_stops} class={stop_row_class(idx)}>
          <.stop_header_cell
            cell_background={cell_background(idx)}
            stop={stop}
          />

          <td class="js-tt-cell hidden-no-js" style="padding-left: 0.5rem">
            <div class="m-timetable__row-header"></div>
          </td>
          <%= for schedule <- @header_schedules do %>
            <.timetable_cell_wrapper
              id={"#{stop.name}-#{schedule.trip.id}-tooltip"}
              stop={stop}
              trip_schedule={@trip_schedules[{schedule.trip.id, stop.id}]}
              track_change={@track_changes[{schedule.trip.id, stop.id}]}
              full_trip_message={@trip_messages[{schedule.trip.name}]}
              trip_message={@trip_messages[{schedule.trip.name, stop.id}]}
            />
          <% end %>
        </tr>
      </table>
    </div>
    """
  end

  # Note: This component is currently only used for ferry
  # timetables. The intent is to migrate other timetables to also use
  # this component, and to deprecate the `<.linear_timetable />` one.
  # `<.linear_timetable />` has a section that only renders
  # `:if={!ferry?(@route)}`, which means that that section will need
  # to be added here before we can use this for non-ferry routes.
  def timetable(assigns) do
    ~H"""
    <div class="m-timetable__header hidden-no-js">
      <div class="m-timetable__cell m-timetable__cell--gray m-timetable__cell--first-column m-timetable__cell--first-column-header m-timetable__row-header--empty">
      </div>
      <div class="m-timetable__col-headers" aria-hidden="true">
        <% # only show scroll controllers if we have 2 or more schedules %>
        <%= if @trip_count >= 2 do %>
          <span class="m-timetable__trains-label">
            {Routes.Route.vehicle_name(@route) <> "s"}
          </span>
          <button
            class="m-timetable__scroll-btn m-timetable__scroll-btn--left btn btn-outline-primary btn-sm"
            data-scroll="earlier"
          >
            {fa("angle-left m-timetable__scroll-btn-arrow")} {~t(Earlier)} {Routes.Route.vehicle_name(
              @route
            ) <> "s"}
          </button>
          <button
            class="m-timetable__scroll-btn m-timetable__scroll-btn--right btn btn-outline-primary btn-sm"
            data-scroll="later"
          >
            {~t(Later)} {Routes.Route.vehicle_name(@route) <> "s"} {fa(
              "angle-right m-timetable__scroll-btn-arrow"
            )}
          </button>
        <% end %>
      </div>
    </div>
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
          <th
            :for={{trip, index} <- Enum.with_index(@timetable.trips)}
            class="m-timetable__header-cell"
            data-scroll-to={index == @offset}
            scope="col"
          >
            <span class="sr-only left-0">{~t(Trip)}</span>
            <span>{trip.name}</span>
          </th>
        </tr>

        <tr
          :for={{row, idx} <- Enum.with_index(@timetable.rows)}
          class={stop_row_class(idx)}
        >
          <.stop_header_cell
            cell_background={cell_background(idx)}
            stop={row.stop}
          />
          <td class="js-tt-cell hidden-no-js" style="padding-left: 0.5rem">
            <div class="m-timetable__row-header"></div>
          </td>
          <td
            :for={cell <- row.cells}
            class="js-tt-cell m-timetable__cell px-lg"
          >
            {cell.time}
          </td>
        </tr>
      </table>
    </div>
    """
  end

  defp stop_header_cell(assigns) do
    ~H"""
    <th
      scope="row"
      data-absolute
      class={[
        "js-tt-stop-name m-timetable__cell--first-column",
        "m-timetable__cell m-timetable__cell--#{@cell_background}"
      ]}
    >
      <div class="m-timetable__row-header m-timetable__stop-name notranslate">
        <.link navigate={~p"/stops/#{@stop.id}"} class="m-timetable__stop-link">
          {break_text_at_slash(@stop.name)}
        </.link>
        <div class="m-timetable__stop-icons">
          <%= if length(@stop.parking_lots) > 0 do %>
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

          <%= if Stops.Stop.accessible?(@stop) do %>
            <.tooltip title={~t(Accessible)} placement={:top}>
              <.icon
                type="icon-svg"
                name="icon-accessible-default"
                class="size-4 fill-brand-primary"
                aria-hidden="true"
              />
            </.tooltip>
          <% else %>
            <%= if Stops.Stop.accessibility_known?(@stop) do %>
              <span class="sr-only">{~t(Not accessible)}</span>
            <% else %>
              <span class="sr-only">{~t(May not be accessible)}</span>
            <% end %>
          <% end %>
        </div>
      </div>
    </th>
    """
  end

  defp timetable_cell_wrapper(assigns) do
    ~H"""
    <% tooltip = stop_tooltip(@trip_schedule, @track_change) %>
    <td
      class={"js-tt-cell m-timetable__cell" <> cell_flag_class(@trip_schedule) <> cell_via_class(@trip_message)}
      id={@id}
      data-html="true"
      data-toggle="tooltip"
      data-stop={tooltip && raw(tooltip)}
      title={tooltip && raw(tooltip)}
    >
      <%= if @trip_message do %>
        <div class="sr-only">{@full_trip_message}</div>
        <div aria-hidden="true">{@trip_message}</div>
      <% else %>
        <.timetable_cell
          trip_schedule={@trip_schedule}
          stop={@stop}
          track_change={@track_change}
        />
      <% end %>
    </td>
    """
  end

  defp timetable_cell(assigns) do
    ~H"""
    <%= if @trip_schedule do %>
      <span class="m-timetable__schedule">
        <span class="m-timetable__left-icons">
          <span class="m-timetable__track-change-icon">
            <%= if @track_change != nil do %>
              <i
                class="track-change-icon notranslate fa fa-shuffle no-margin-right"
                aria-hidden="true"
              />
              <span class="sr-only">{~t"Track Change"}</span>
            <% else %>
              &nbsp;
            <% end %>
          </span>
          <span class="m-timetable__flag-icon">
            <%= if @trip_schedule.flag? do %>
              <span aria-hidden="true">{svg("icon-flag-stop-default.svg")}</span>
              <span class="sr-only">{~t"Flag Stop"}</span>
            <% else %>
              <%= if @trip_schedule.early_departure? do %>
                <span aria-hidden="true">{svg("icon-early-departure-stop-default.svg")}</span>
                <span class="sr-only">{~t"Early Departure"}</span>
              <% else %>
                &nbsp;
              <% end %>
            <% end %>
          </span>
        </span>
        <span>
          {format_schedule_time(@trip_schedule.time)}
        </span>
      </span>
    <% else %>
      <span class="sr-only">{~t(Does not stop at)} {@stop.name}</span>
    <% end %>
    """
  end

  defp cell_background(idx) do
    if rem(idx, 2) == 0 do
      "white"
    else
      "gray"
    end
  end
end
