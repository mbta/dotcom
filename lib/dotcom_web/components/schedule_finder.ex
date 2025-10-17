defmodule DotcomWeb.Components.ScheduleFinder do
  @moduledoc """
  Components for the schedule finder
  """

  use DotcomWeb, :component

  alias DotcomWeb.Live.ScheduleFinder.Departure

  attr :route_id, :string, required: true
  attr :direction_id, :string, required: true

  def route_banner(assigns) do
    route = Routes.Repo.get(assigns.route_id)

    assigns =
      assign(assigns, %{
        route: route,
        route_css_class: route_css_class(route)
      })

    ~H"""
    <div class={[@route_css_class, "-mx-md p-md"]}>
      <div>{@route.name}</div>
      <div>
        <.icon name="arrow-right" aria-hidden="true" class="w-3 h-3 fill-current" />
        {@route.direction_names[@direction_id]} towards
        <strong>{@route.direction_destinations[@direction_id]}</strong>
      </div>
    </div>
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

  attr :stop_id, :string, required: true

  def stop_banner(assigns) do
    stop = Stops.Repo.get(assigns.stop_id)

    assigns =
      assign(assigns, %{
        stop_name: stop.name
      })

    ~H"""
    <div class="bg-gray-lightest -mx-md p-md">
      <strong>{@stop_name}</strong>
    </div>
    """
  end

  attr :route_id, :string, required: true
  attr :direction_id, :string, required: true
  attr :stop_id, :string, required: true

  def alerts(assigns) do
    ~H""
  end

  attr :departure, Departure, required: true

  def upcoming_departure(%{departure: %{effect: effect}} = assigns) when not is_nil(effect) do
    ~H"""
    <div class="flex justify-between items-center" {@rest}>
      <div>{@departure.headsign}</div>
      <div class="inline-flex items-center gap-xs tabular">
        <.icon name="exclamation-triangle" class="w-5 h-5 fill-current" aria-hidden="true" />
        {@departure.effect}
      </div>
    </div>
    """
  end

  def upcoming_departure(assigns) do
    ~H"""
    <div class="flex justify-between items-center">
      <div>{@departure.headsign}</div>
      <div>
        <div class="inline-flex items-center gap-xs tabular-nums">
          <.live_icon :if={@departure.live?} />
          <span :if={@departure.replaced_time} class="strikethrough">
            {@departure.replaced_time}
          </span>
          {@departure.display_value}
          <span :if={@departure.crowding}>
            {@departure.crowding}
          </span>
        </div>
        <div :if={@departure.status}>{@departure.status}</div>
      </div>
    </div>
    """
  end

  defp live_icon(assigns) do
    ~H"""
    <.icon
      name="wifi"
      aria-label="Live"
      class="w-5 h-5 fill-brand-primary -rotate-45"
    />
    """
  end

  def daily_schedule(assigns) do
    assigns =
      assign(
        assigns,
        :schedules,
        Schedules.Repo.by_route_ids([assigns.route_id],
          direction_id: assigns.direction_id,
          stop_ids: assigns.stop_id
        )
      )

    ~H"""
    <h2>Daily Schedules</h2>
    <div class="grid grid-cols-1 divide-y-[1px] divide-gray-lightest border-[1px]">
      <div :for={schedule <- @schedules} class="p-sm flex justify-between items-center">
        <div>{headsign(schedule)}</div>
        <div class="tabular-nums">{format_time(schedule.time)}</div>
      </div>
    </div>
    """
  end

  defp headsign(%Schedules.Schedule{stop_headsign: stop_headsign, trip: trip}) do
    if(stop_headsign, do: stop_headsign, else: trip.headsign)
  end

  defp format_time(dt) do
    dt
    |> DateTime.shift_zone!("America/New_York")
    |> Timex.format!("{h12}:{m} {AM}")
  end
end
