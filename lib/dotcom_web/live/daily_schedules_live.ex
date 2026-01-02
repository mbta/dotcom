defmodule DotcomWeb.DailySchedulesLive do
  @moduledoc """
  A simple basic-auth gated page to explore what kinds of daily schedules are actually available for the routes we serve.
  """

  use DotcomWeb, :live_view

  alias Phoenix.LiveView

  @impl LiveView
  def mount(_params, _session, socket) do
    {
      :ok,
      socket
    }
  end

  @impl true
  def handle_params(params, _uri, socket) do
    {:noreply, socket |> assign(:route_id, params |> Map.get("route_id", "1"))}
  end

  @impl true
  def handle_event("change-route", %{"route_id" => route_id}, socket) do
    new_path = socket |> live_path(__MODULE__, %{"route_id" => route_id})
    {:noreply, socket |> push_patch(to: new_path)}
  end

  @impl true
  def render(%{route_id: route_id} = assigns) do
    services = Services.Repo.by_route_id(route_id)

    daily_schedules =
      services
      |> Enum.flat_map(fn svc ->
        svc
        |> Services.Service.all_valid_dates_for_service()
        |> Enum.map(&{&1, svc})
      end)
      |> Enum.group_by(fn {date, _svc} -> date end)
      |> Enum.map(fn {date, list} ->
        {date, list |> Enum.map(fn {_date, svc} -> svc end) |> Enum.sort_by(& &1.id)}
      end)
      |> Enum.sort_by(fn {date, _svc_list} -> date end, &Date.before?/2)
      |> Enum.group_by(fn {_date, svc_list} -> svc_list end)
      |> Enum.map(fn {svc_list, date_tuples} ->
        %{
          services: svc_list,
          dates: date_tuples |> Enum.map(fn {date, _svc_list} -> date end)
        }
      end)
      |> Enum.map(&add_holiday_status/1)
      |> Enum.map(&add_title/1)
      |> Enum.sort_by(& &1.title)

    {holiday_schedules, non_holiday_schedules} = daily_schedules |> Enum.split_with(& &1.holiday?)

    assigns =
      assigns
      |> assign(:route_id, route_id)
      |> assign(:daily_schedules, daily_schedules)
      |> assign(:holiday_schedules, holiday_schedules)
      |> assign(:non_holiday_schedules, non_holiday_schedules)

    ~H"""
    <h1>Daily Schedules</h1>

    <.route_changer selected_route_id={@route_id} />

    <h2>Regular Schedules</h2>
    <.daily_schedule :for={schedule <- @non_holiday_schedules} schedule={schedule} />

    <h2>Holiday Schedules</h2>
    <.daily_schedule :for={schedule <- @holiday_schedules} schedule={schedule} />
    """
  end

  defp add_holiday_status(schedule) do
    schedule
    |> Map.put(:holiday?, schedule.services |> Enum.any?(&(&1.typicality == :holiday_service)))
  end

  defp add_title(schedule) do
    schedule
    |> Map.put(:title, title(schedule))
  end

  defp title(schedule) do
    days_of_week = schedule.dates |> Enum.map(&Date.day_of_week/1) |> MapSet.new()
    date_set = schedule.dates |> MapSet.new()

    [
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2025-11-27]])) end, "Thanksgiving"},
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2025-11-28]])) end,
       "Day After Thanksgiving"},
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2025-11-11]])) end, "Veterans Day"},
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2025-12-25]])) end, "Christmas Day"},
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2025-12-31]])) end, "New Year's Eve"},
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2026-01-01]])) end, "New Year's Day"},
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2025-12-25], ~D[2026-01-01]])) end,
       "Christmas and New Year's"},
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2026-01-19]])) end,
       "Martin Luther King Jr. Day"},
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2026-02-16]])) end, "Presidents Day"},
      {fn -> MapSet.subset?(date_set, MapSet.new([~D[2026-01-19], ~D[2026-02-16]])) end,
       "Martin Luther King Jr. and Presidents' Day"},
      {fn -> MapSet.subset?(days_of_week, MapSet.new([5])) end, "Friday"},
      {fn -> MapSet.subset?(days_of_week, MapSet.new([1, 2, 3, 4])) end, "Monday - Thursday"},
      {fn -> MapSet.subset?(days_of_week, MapSet.new([1, 2, 3, 4, 5])) end, "Weekday"},
      {fn -> MapSet.subset?(days_of_week, MapSet.new([6])) end, "Saturday"},
      {fn -> MapSet.subset?(days_of_week, MapSet.new([7])) end, "Sunday"},
      {fn -> true end, "???"}
    ]
    |> Stream.filter(fn {condition_fun, _title} -> condition_fun.() end)
    |> Stream.map(fn {_condition_fun, title} -> title end)
    |> Enum.take(1)
    |> List.first()
  end

  defp daily_schedule(assigns) do
    %{services: services} = assigns.schedule
    title = services |> Enum.map(& &1.id) |> Enum.sort() |> Enum.join(", ")
    assigns = assigns |> assign(:title, title)

    ~H"""
    <details class="mt-2 mb-4 border border-brand-primary rounded-lg p-2 group/schedule">
      <summary class="flex gap-2 items-center cursor-pointer">
        <div class="font-bold">{@schedule.title}</div>
        <div class="flex gap-2 group-open/schedule:hidden">
          <div :for={svc <- @schedule.services} class="text-xs p-1 border-xs rounded">{svc.id}</div>
        </div>
        <.icon
          name="chevron-down"
          class="ml-auto h-3 w-3 group-open/schedule:rotate-180 transition-all"
        />
      </summary>

      <div class="mt-2 mb-4">
        <div class="font-bold text-xs uppercase">Services</div>
        <div class="mt-1 flex flex-wrap gap-2">
          <div :for={svc <- @schedule.services} class="text-xs border-xs rounded p-1 max-w-80">
            <div class="font-bold text-sm">{svc.id}</div>
            <div class="mt-1 grid grid-cols-2 gap-1 items-center">
              <div class="font-bold">Name</div>
              <div class="p-1 border-xs rounded">{svc.name}</div>

              <div class="font-bold">Start Date</div>
              <div class="p-1 border-xs rounded">{svc.start_date}</div>

              <div class="font-bold">End Date</div>
              <div class="p-1 border-xs rounded">{svc.end_date}</div>

              <div class="font-bold">Valid Days</div>
              <div class="flex flex-wrap gap-1">
                <div :for={day <- svc.valid_days} class="p-1 border-xs rounded">
                  {pretty_day_of_week(day)}
                </div>
              </div>

              <div class="font-bold">Typicality</div>
              <div class="p-1 border-xs rounded">{svc.typicality}</div>
            </div>

            <div class="font-bold">Added Dates</div>
            <div class="flex flex-wrap gap-1">
              <div :for={date <- svc.added_dates} class="p-1 border-xs rounded">{date}</div>
            </div>

            <div class="font-bold">Removed Dates</div>
            <div class="flex flex-wrap gap-1">
              <div :for={date <- svc.removed_dates} class="p-1 border-xs rounded">{date}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="font-bold text-xs uppercase">Active Dates</div>
        <div class="mt-1 flex flex-wrap gap-1">
          <div :for={date <- @schedule.dates} class="text-xs border-xs rounded p-1">
            {date} ({day_of_week(date)})
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="font-bold text-xs uppercase">Unique days of the week</div>
        <div class="mt-1 flex gap-2">
          <div
            :for={
              day_of_week <-
                @schedule.dates |> Enum.map(&Date.day_of_week/1) |> Enum.uniq() |> Enum.sort()
            }
            class="p-1 border-xs rounded text-xs"
          >
            {pretty_day_of_week(day_of_week)}
          </div>
        </div>
      </div>

      <details class="group/code">
        <summary class="flex items-center w-full cursor-pointer">
          <div class="text-xs font-bold uppercase">Full Schedule Data Blob</div>
          <.icon
            name="chevron-down"
            class="ml-auto h-3 w-3 group-open/code:rotate-180 transition-all"
          />
        </summary>
        <pre>{inspect @schedule, pretty: true}</pre>
      </details>
    </details>
    """
  end

  defp day_of_week(date), do: date |> Date.day_of_week() |> pretty_day_of_week()

  defp pretty_day_of_week(1), do: "Mon"
  defp pretty_day_of_week(2), do: "Tue"
  defp pretty_day_of_week(3), do: "Wed"
  defp pretty_day_of_week(4), do: "Thu"
  defp pretty_day_of_week(5), do: "Fri"
  defp pretty_day_of_week(6), do: "Sat"
  defp pretty_day_of_week(7), do: "Sun"
  defp pretty_day_of_week(_), do: "?"

  defp route_changer(assigns) do
    assigns =
      assigns
      |> assign(:bus_routes, Routes.Repo.by_type(3))

    ~H"""
    <form phx-change="change-route">
      <select class="border border-brand-primary rounded-lg p-2 bg-white" name="route_id">
        <option :for={route <- @bus_routes} selected={route.id == @selected_route_id} value={route.id}>
          {route.name}
        </option>
      </select>
    </form>
    """
  end
end
