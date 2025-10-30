defmodule DotcomWeb.Components.ScheduleFinder do
  @moduledoc """
  Components for the schedule finder
  """

  use DotcomWeb, :component

  alias Dotcom.Departure
  alias MbtaMetro.Components.SystemIcons

  attr :route, Routes.Route, required: true
  attr :direction_id, :string, required: true

  def route_banner(assigns) do
    assigns =
      assign(assigns, %{
        mode: Routes.Route.type_atom(assigns.route) |> Atom.to_string() |> String.replace("_", "-"),
        route_css_class: route_css_class(assigns.route)
      })

    ~H"""
    <a class={[@route_css_class, "-mx-md p-md block"]} href={~p"/schedules/#{@route.id}"}>
      <div class="flex items-center gap-xs font-bold -ml-xs">
        <SystemIcons.mode_icon mode={@mode} class="shrink-0 fill-current" />
        {@route.name}
        <.icon name="arrow-up-right-from-square" class="size-4 fill-current justify-self-end" />
      </div>
      <div class="flex items-center gap-xs">
        <.icon name="arrow-right" aria-hidden="true" class="size-4 fill-current mr-xs" />
        <span>
          {@route.direction_names[@direction_id]} towards
          <strong>{@route.direction_destinations[@direction_id]}</strong>
        </span>
      </div>
    </a>
    """
  end

  defp route_css_class(%Routes.Route{type: 3} = route) do
    if(Routes.Route.silver_line?(route),
      do: "bg-silver-line text-white",
      else: "bg-brand-bus text-black"
    )
  end

  defp route_css_class(%Routes.Route{type: 2}), do: "bg-commuter-rail text-white"
  defp route_css_class(%Routes.Route{type: 4}), do: "bg-ferry text-white"
  defp route_css_class(%Routes.Route{id: "Green" <> _}), do: "bg-green-line text-white"
  defp route_css_class(%Routes.Route{id: "Mattapan"}), do: "bg-red-line text-white"
  defp route_css_class(%Routes.Route{id: id}), do: "bg-#{String.downcase(id)}-line text-white"

  attr :crowding, :atom, required: true
  def crowding_icon(%{crowding: nil} = assigns), do: ~H""
  def crowding_icon(assigns) do
    ~H"""
    <.icon type="icon-svg" name="icon-crowding" class={"size-4 c-icon__crowding c-icon__crowding--#{@crowding}"} />
    """
  end

  attr :stop_id, :string, required: true

  def stop_banner(assigns) do
    stop = Stops.Repo.get(assigns.stop_id)

    assigns =
      assign(assigns, %{
        stop_name: stop.name
      })

    ~H"""
    <a
      class="bg-gray-lightest -mx-md p-md flex items-center justify-between text-current font-bold"
      href={~p"/stops/#{@stop_id}"}
    >
      {@stop_name}
      <.icon name="arrow-up-right-from-square" class="size-4 fill-current" />
    </a>
    """
  end

  attr :route_id, :string, required: true
  attr :direction_id, :string, required: true
  attr :stop_id, :string, required: true

  def alerts(assigns) do
    ~H""
  end

  attr :route, Routes.Route, required: true
  attr :direction_id, :string, required: true
  attr :stop_id, :string, required: true
  def daily_schedule(assigns) do
    assigns =
      assign(
        assigns,
        :schedules,
        Schedules.Repo.by_route_ids([assigns.route.id],
          direction_id: assigns.direction_id,
          stop_ids: assigns.stop_id
        )
      )
      |> assign(:vehicle_name, Routes.Route.vehicle_name(assigns.route))

    ~H"""
    <h2>Daily Schedules</h2>
    <div class="bg-cobalt-90 p-md flex justify-between">
      <div>First {@vehicle_name}: {List.first(@schedules) |> Map.get(:time) |> format_time()}</div>
      <div>Last {@vehicle_name}: {List.last(@schedules) |> Map.get(:time) |> format_time()}</div>
    </div>
    <div class="grid grid-cols-1 divide-y-[1px] divide-gray-lightest border-[1px]">
      <.trip_row :for={schedule <- @schedules} schedule={schedule} route={@route}>
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-sm">
          <DotcomWeb.Components.RouteSymbols.route_symbol route={@route} />
          <div>
            {headsign(schedule)}
            <div :if={@route.type == 2}>
              Train {schedule.trip.name}
            </div>
          </div>
        </div>
        <div class="tabular-nums">{format_time(schedule.time)}</div>
      </div>
      </.trip_row>
    </div>
    """
  end

  defp headsign(%Schedules.Schedule{stop_headsign: stop_headsign, trip: trip}) do
    if(stop_headsign, do: stop_headsign, else: trip.headsign)
  end

  def format_time(dt) do
      dt
      |> DateTime.shift_zone!("America/New_York")
      |> Timex.format!("{h12}:{m} {AM}")
  end

  def countdown(dt) do
    diff = DateTime.diff(dt, Dotcom.Utils.DateTime.now(), :second)

    if diff <= 0 do
      "Now"
    else
      Dotcom.Utils.Diff.seconds_to_localized_minutes(diff)
    end
  end

  attr :schedule, Schedules.Schedule, required: true
  attr :route, Routes.Route, required: true
  slot :inner_block
  def trip_row(assigns) do
    ~H"""
    <.accordion variant="multiselect">
      <:heading>
        {render_slot(@inner_block)}
      </:heading>
      <:content>
        <div class="p-sm flex justify-between items-center" :for={trip_schedule <- Schedules.Repo.schedule_for_trip(@schedule.trip.id) |> Enum.filter(& &1.stop_sequence >= @schedule.stop_sequence)}>
          <div class="notranslate">{trip_schedule.stop.name}</div>
          <div class="tabular-nums">{format_time(trip_schedule.time)}</div>
        </div>
      </:content>
    </.accordion>
    """
  end
end
