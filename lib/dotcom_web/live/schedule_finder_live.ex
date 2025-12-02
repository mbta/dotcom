defmodule DotcomWeb.ScheduleFinderLive do
  @moduledoc """
  The primary view for looking up schedules, predictions, and relevant alerts
  for a given route/direction/stop.
  """

  use DotcomWeb, :live_view

  import CSSHelpers
  import Dotcom.ScheduleFinder
  import Dotcom.Utils.Diff, only: [seconds_to_localized_minutes: 1]
  import Dotcom.Utils.ServiceDateTime, only: [service_date: 0]
  import Dotcom.Utils.Time, only: [format!: 2]

  alias Dotcom.ScheduleFinder.FutureArrival
  alias Dotcom.ScheduleFinder.UpcomingDepartures
  alias Dotcom.ScheduleFinder.UpcomingDepartures.UpcomingDeparture
  alias DotcomWeb.Components.Prototype
  alias DotcomWeb.RouteComponents
  alias MbtaMetro.Components.SystemIcons
  alias Phoenix.{LiveView, LiveView.AsyncResult}
  alias Routes.Route
  alias Stops.Stop

  @date_time Application.compile_env!(:dotcom, :date_time_module)
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @impl LiveView
  def mount(_params, _session, socket) do
    schedule_refresh()

    {:ok,
     socket
     |> assign_new(:route, fn -> nil end)
     |> assign_new(:direction_id, fn -> nil end)
     |> assign_new(:stop, fn -> nil end)
     |> assign_new(:upcoming_departures, fn -> [] end)
     |> assign_new(:now, fn -> @date_time.now() end)
     |> assign_new(:loaded_trips, fn -> %{} end)
     |> assign_new(:date, fn -> nil end)}
  end

  @impl LiveView
  def render(assigns) do
    assigns =
      assigns
      |> assign(:vehicle_name, if(assigns.route, do: Route.vehicle_name(assigns.route)))

    ~H"""
    <Prototype.route_stop_picker
      selected_route={@route}
      selected_direction_id={@direction_id}
    />
    <.route_banner route={@route} direction_id={@direction_id} />
    <.stop_banner stop={@stop} />

    <h2>{~t"Upcoming Departures"}</h2>
    <.upcoming_departures_table
      :if={@stop}
      now={@now}
      route={@route}
      stop_id={@stop.id}
      upcoming_departures={@upcoming_departures |> Enum.take(5)}
    />

    <h2 class="flex justify-between">
      {~t(Daily Schedules)}<mark>{@date}</mark>
    </h2>
    <.async_result :let={departures} :if={@stop} assign={@departures}>
      <:loading>Loading daily schedules...</:loading>
      <:failed :let={fail}>
        <.error_container title={inspect(fail)}>
          {~t"There was a problem loading schedules"}
        </.error_container>
      </:failed>
      <%= if departures do %>
        <%= if @route.type in [0, 1] do %>
          <div
            :for={{route, destination, times} <- subway_groups(departures, @direction_id, @stop.id)}
            class="mt-lg mb-md"
          >
            <.subway_destination route={route} destination={destination} />
            <.first_last times={times} vehicle_name={@vehicle_name} />
            <.subway_headways times={times} />
          </div>
        <% else %>
          <.first_last
            times={Enum.map(departures, & &1.time)}
            vehicle_name={@vehicle_name}
          />
          <.departures_table departures={departures} route={@route} loaded_trips={@loaded_trips} />
        <% end %>
      <% end %>
    </.async_result>
    """
  end

  @impl LiveView
  def handle_params(%{"direction_id" => direction, "route_id" => route} = params, _uri, socket) do
    {direction_id, _} = Integer.parse(direction)

    {:noreply,
     socket
     |> assign(:route, @routes_repo.get(route))
     |> assign(:direction_id, direction_id)
     |> assign(:date, Map.get(params, "date", today()))
     |> assign_stop(params)
     |> assign_departures()
     |> assign_upcoming_departures()}
  end

  @impl LiveView
  def handle_event(
        "open_trip",
        %{"schedule_id" => schedule_id, "stop_sequence" => stop_sequence, "trip" => trip_id},
        socket
      ) do
    date = socket.assigns.date
    loaded_trips = socket.assigns.loaded_trips

    if Map.get(loaded_trips, schedule_id) do
      {:noreply, socket}
    else
      socket =
        update(socket, :loaded_trips, &Map.put(&1, schedule_id, AsyncResult.loading()))

      GenServer.cast(self(), {:get_next, {schedule_id, [trip_id, stop_sequence, date]}})
      {:noreply, socket}
    end
  end

  def handle_event(_, _, socket), do: {:noreply, socket}

  @impl Phoenix.LiveView
  def handle_cast({:get_next, {schedule_id, args}}, socket) do
    {:noreply,
     socket
     |> update(:loaded_trips, fn loaded_trips ->
       result =
         case Kernel.apply(Dotcom.ScheduleFinder, :next_arrivals, args) do
           {:ok, arrivals} -> AsyncResult.ok(arrivals)
           error -> AsyncResult.failed(error, :reason)
         end

       Map.put(loaded_trips, schedule_id, result)
     end)}
  end

  @impl LiveView
  def handle_info(:refresh, socket) do
    schedule_refresh()

    {:noreply,
     socket
     |> assign(:now, @date_time.now())
     |> assign_upcoming_departures()}
  end

  defp schedule_refresh() do
    # Refresh every second
    Process.send_after(self(), :refresh, 1000)
  end

  defp assign_stop(socket, params) do
    stop_id = Map.get(params, "stop")
    assign(socket, :stop, if(stop_id, do: @stops_repo.get(stop_id)))
  end

  defp assign_upcoming_departures(%{assigns: %{stop: %Stop{id: stop_id}, now: now}} = socket) do
    route_id = socket.assigns.route.id
    direction_id = socket.assigns.direction_id
    stop_id = stop_id

    socket
    |> assign(
      :upcoming_departures,
      UpcomingDepartures.upcoming_departures(%{
        direction_id: direction_id,
        now: now,
        route_id: route_id,
        stop_id: stop_id
      })
    )
  end

  defp assign_upcoming_departures(socket) do
    socket |> assign(:upcoming_departures, [])
  end

  defp today, do: service_date() |> format!(:iso_date)

  defp assign_departures(socket) do
    route_id = socket.assigns.route.id
    direction_id = socket.assigns.direction_id
    date = socket.assigns.date
    stop = socket.assigns.stop

    if stop do
      assign_async(
        socket,
        :departures,
        fn ->
          get_departures(route_id, direction_id, stop.id, date)
        end,
        reset: true
      )
    else
      assign(socket, :departures, AsyncResult.ok([]))
    end
  end

  defp get_departures(route_id, direction_id, stop_id, date) do
    case daily_departures(route_id, direction_id, stop_id, date) do
      {:ok, departures} -> {:ok, %{departures: departures}}
      error -> error
    end
  end

  # Schedule Finder components =================================================

  attr :route, Route, required: true
  attr :direction_id, :string, required: true

  defp route_banner(assigns) do
    mode = assigns.route |> Route.type_atom() |> atom_to_class()
    line_name = assigns.route |> Route.icon_atom() |> atom_to_class()

    assigns =
      assign(assigns, %{
        line_name: line_name,
        mode: mode
      })

    ~H"""
    <div class={[route_to_class(@route), "font-heading p-md"]}>
      <.link
        class="text-current flex flex-col gap-sm hover:no-underline active:no-underline focus:text-current hover:text-current"
        patch={~p"/schedules/#{@route}"}
      >
        <div class="flex items-center gap-xs font-bold">
          <SystemIcons.mode_icon aria-hidden line={@line_name} mode={@mode} class="shrink-0 -ml-xs" />
          <span class="grow notranslate">{@route.name}</span>
          <.icon
            name="arrow-up-right-from-square"
            aria-hidden
            class="size-4 fill-current justify-self-end"
          />
        </div>
        <div class="flex items-center gap-xs">
          <.icon name="arrow-right" aria-hidden class="size-4 mr-xs fill-current" />
          <span>
            {@route.direction_names[@direction_id]}
            <%= if @route.id != "Green" do %>
              {~t"towards"}
              <strong class="notranslate">{@route.direction_destinations[@direction_id]}</strong>
            <% end %>
          </span>
        </div>
      </.link>
    </div>
    """
  end

  attr :stop, Stop

  defp stop_banner(assigns) do
    ~H"""
    <.link
      :if={@stop}
      class="bg-gray-lightest p-md flex items-center gap-xs text-black hover:no-underline active:no-underline focus:text-black hover:text-black"
      patch={~p"/stops/#{@stop}"}
    >
      <.icon
        type="icon-svg"
        aria-hidden
        name={if(@stop.station?, do: "mbta-logo", else: "icon-stop-default")}
        class="size-5 fill-current"
      />
      <span class="notranslate grow font-bold font-heading">{@stop.name}</span>
      <.icon aria-hidden name="arrow-up-right-from-square" class="size-4 fill-current" />
    </.link>
    """
  end

  attr :times, :list, required: true
  attr :vehicle_name, :string, required: true

  defp first_last(%{times: [first | _] = times} = assigns) do
    assigns =
      assigns
      |> assign(:first, first)
      |> assign(:last, List.last(times))

    ~H"""
    <div class="bg-cobalt-90 p-3 flex justify-between">
      <div :if={@first}>
        {gettext("First %{vehicle}", vehicle: @vehicle_name)}:
        <strong>
          <.formatted_time time={@first} />
        </strong>
      </div>
      <div :if={@last}>
        {gettext("Last %{vehicle}", vehicle: @vehicle_name)}:
        <strong>
          <.formatted_time time={@last} />
          <sup :if={next_day?(@first, @last)}>+1</sup>
        </strong>
      </div>
    </div>
    """
  end

  defp first_last(assigns), do: ~H""

  defp next_day?(%DateTime{day: first}, %DateTime{day: second}) do
    second > first
  end

  defp next_day?(_, _), do: false

  defp formatted_time(assigns) do
    ~H"""
    <time datetime={@time} class="tabular-nums whitespace-nowrap">
      {format!(@time, :hour_12_minutes)}
    </time>
    """
  end

  attr :route, Route, required: true
  attr :departures, :list, required: true
  attr :loaded_trips, :map, required: true

  defp departures_table(assigns) do
    ~H"""
    <div class="grid grid-cols-1 divide-y-[1px] divide-gray-lightest border-[1px] border-gray-lightest">
      <.unstyled_accordion
        :for={departure <- @departures}
        summary_class="flex items-center gap-sm hover:bg-brand-primary-lightest p-sm"
        phx-click="open_trip"
        phx-value-schedule_id={departure.schedule_id}
        phx-value-stop_sequence={departure.stop_sequence}
        phx-value-trip={departure.trip_id}
      >
        <:heading>
          <div class="flex items-center gap-sm w-full">
            <RouteComponents.route_icon route={@route} size="small" />
            <div>
              {departure.headsign}
              <div :if={@route.type == 2 && departure.trip_name} class="text-sm">
                {~t(Train)} {departure.trip_name}
              </div>
            </div>
          </div>
          <.formatted_time time={departure.time} />
        </:heading>
        <:content>
          <div class="divide-y-[1px] divide-gray-lightest border-t border-gray-lightest [&>*:first-child_.top]:invisible [&>*:last-child_.bottom]:invisible">
            <.async_result
              :let={arrivals}
              assign={Map.get(@loaded_trips, departure.schedule_id, AsyncResult.loading())}
            >
              <:loading>
                <div class="p-lg text-gray">Loading arrivals...</div>
              </:loading>
              <:failed :let={fail}>
                <.error_container title={inspect(fail)}>
                  {~t"There was a problem loading arrivals"}
                </.error_container>
              </:failed>
              <.arrival_row
                :for={arrival <- arrivals}
                :if={arrivals}
                route={@route}
                arrival={arrival}
              />
            </.async_result>
          </div>
        </:content>
      </.unstyled_accordion>
    </div>
    """
  end

  attr :arrival, FutureArrival, required: true
  attr :route, Route, required: true

  defp arrival_row(assigns) do
    ~H"""
    <div class="pr-7 pl-5 py-sm gap-md flex justify-between items-center">
      <div
        class="w-[6px] z-10 shrink-0 flex flex-col self-stretch"
        style="margin-block: calc(-1 * (var(--spacing-sm) + 1px));"
      >
        <div class={"#{route_to_class(@route)} grow top"} />
        <div class={"#{route_to_class(@route)} grow bottom"} />
      </div>
      <div
        class={"#{route_to_class(@route)} size-3.5 shrink-0 rounded-full border-xs border-[#00000026] z-20"}
        style="margin-left: calc(-1.75rem + 2px);"
      />
      <div class="notranslate grow">
        <div>{@arrival.stop_name}</div>
        <div :if={@arrival.platform_name} class="text-sm">
          {@arrival.platform_name}
        </div>
      </div>
      <.formatted_time time={@arrival.time} />
    </div>
    """
  end

  attr :destination, :string, required: true
  attr :route, Route, required: true

  defp subway_destination(assigns) do
    ~H"""
    <div class="flex gap-sm text-lg font-bold font-heading mb-3">
      <RouteComponents.route_icon route={@route} />
      {gettext("to %{destination}", destination: @destination)}
    </div>
    """
  end

  attr :times, :list, required: true

  defp subway_headways(assigns) do
    ~H"""
    <div class="bg-cobalt-90 p-3 mt-sm">
      {headway_range(@times)}
    </div>
    """
  end

  # later: just use hardcoded times
  defp headway_range(times) do
    {min, max} =
      times
      |> Stream.chunk_every(2)
      |> Stream.filter(&(length(&1) == 2))
      |> Stream.map(fn [t1, t2] -> DateTime.diff(t2, t1, :minute) end)
      |> Enum.min_max(fn -> {nil, nil} end)

    gettext("Trains depart every %{min} to %{max} minutes", %{min: min, max: max})
  end

  attr :now, DateTime
  attr :route, Route
  attr :stop_id, :string
  attr :upcoming_departures, :list

  defp upcoming_departures_table(assigns) do
    mode = assigns.route |> Route.type_atom() |> atom_to_class()
    line_name = assigns.route |> Route.icon_atom() |> atom_to_class()

    assigns =
      assign(assigns, %{
        line_name: line_name,
        mode: mode
      })

    ~H"""
    <div class="border-b-xs border-charcoal-80">
      <.unstyled_accordion
        :for={upcoming_departure <- @upcoming_departures}
        id={"upcoming-departure-#{upcoming_departure.trip_id}"}
        summary_class="flex items-center border-xs border-charcoal-80 border-b-0 py-3 px-2 gap-2 group-open:bg-charcoal-80 hover:bg-brand-primary-lightest group-open:hover:bg-brand-primary-lightest"
      >
        <:heading>
          <div class="w-full flex gap-2">
            <RouteComponents.route_icon size="small" route={@route} />
            <div>{upcoming_departure.headsign}</div>
            <div class="ml-auto font-bold">
              <.icon type="icon-svg" name="icon-realtime-tracking" />
              {arrival_time_display(upcoming_departure)}
            </div>
          </div>
        </:heading>
        <:content>
          <div class="px-2 border-xs border-charcoal-80 border-b-0 flex gap-2 items-center">
            <div class="relative flex items-center self-stretch">
              <div class={"#{route_to_class(@route)} absolute -bottom-[0.0625rem] left-1/2 -translate-x-1/2 w-1 z-10 h-3/4"} />

              <SystemIcons.mode_icon aria-hidden line={@line_name} mode={@mode} class="shrink-0 z-20" />
            </div>

            <div class="py-2">{trip_details_header_text(upcoming_departure)}</div>
          </div>
          <details
            :if={Enum.count(upcoming_departure.trip_details.stops_before) > 0}
            class="group/details"
          >
            <summary class="cursor-pointer flex gap-2 items-center px-2 border-xs border-charcoal-80 border-b-0">
              <div class="relative self-stretch w-6 shrink-0">
                <div class={"#{route_to_class(@route)} absolute -top-[0.0625rem] left-1/2 -translate-x-1/2 w-1 z-10 h-3/4"} />
                <div class={"#{route_to_class(@route)} absolute -bottom-[0.0625rem] left-1/2 -translate-x-1/2 w-1 z-10 h-3/4"} />
              </div>
              <div class="py-2">
                {ngettext(
                  "1 Stop Away",
                  "%{count} Stops Away",
                  Enum.count(upcoming_departure.trip_details.stops_before)
                )}
              </div>
              <div class="shrink-0">
                <.icon name="chevron-down" class="h-3 w-3 group-open/details:rotate-180" />
              </div>
            </summary>
            <.other_stop
              :for={other_stop <- upcoming_departure.trip_details.stops_before}
              other_stop={other_stop}
              route={@route}
              stop_id={@stop_id}
            />
          </details>
          <div class="[&>*:last-child_.bottom-route-line]:invisible">
            <.other_stop
              other_stop={upcoming_departure.trip_details.stop}
              route={@route}
              stop_id={@stop_id}
            />
            <.other_stop
              :for={other_stop <- upcoming_departure.trip_details.stops_after}
              other_stop={other_stop}
              route={@route}
              stop_id={@stop_id}
            />
          </div>
        </:content>
      </.unstyled_accordion>
    </div>
    """
  end

  defp other_stop(assigns) do
    ~H"""
    <div class="px-2 border-xs border-charcoal-80 border-b-0 flex gap-2 items-center">
      <div class="self-stretch relative w-6 shrink-0 flex items-center justify-center">
        <div class={"#{route_to_class(@route)} absolute -top-[0.0625rem] left-1/2 -translate-x-1/2 w-1 z-10 h-1/2 top-route-line"} />
        <div class={"#{route_to_class(@route)} absolute -bottom-[0.0625rem] left-1/2 -translate-x-1/2 w-1 z-10 h-1/2 bottom-route-line"} />
        <div class={"#{route_to_class(@route)} size-3.5 rounded-full border-xs border-[#00000026] z-20"} />
      </div>
      <div class={["py-2", @stop_id == @other_stop.stop_id && "font-bold"]}>
        {@other_stop.stop_name}
      </div>
      <div class={["ml-auto", @stop_id == @other_stop.stop_id && "font-bold"]}>
        {format!(@other_stop.time, :hour_12_minutes)}
      </div>
    </div>
    """
  end

  defp arrival_time_display(%UpcomingDeparture{arrival_status: {:arrival_seconds, seconds}}),
    do: "#{seconds_to_localized_minutes(seconds)}"

  defp arrival_time_display(%UpcomingDeparture{arrival_status: {:departure_seconds, seconds}}),
    do: "#{seconds_to_localized_minutes(seconds)}"

  defp arrival_time_display(%UpcomingDeparture{arrival_status: :approaching}), do: ~t"Approaching"
  defp arrival_time_display(%UpcomingDeparture{arrival_status: :arriving}), do: ~t"Arriving"
  defp arrival_time_display(%UpcomingDeparture{arrival_status: :boarding}), do: ~t"Boarding"

  defp arrival_time_display(%UpcomingDeparture{arrival_status: {:past_due, seconds}}),
    do: "#{-seconds} Seconds Past Due"

  defp trip_details_header_text(%UpcomingDeparture{arrival_status: {:arrival_seconds, seconds}}),
    do: "Arriving in #{seconds_to_localized_minutes(seconds)}"

  defp trip_details_header_text(%UpcomingDeparture{arrival_status: {:departure_seconds, seconds}}),
    do: "Departing in #{seconds_to_localized_minutes(seconds)}"

  defp trip_details_header_text(upcoming_departure),
    do: "Now #{arrival_time_display(upcoming_departure)}"
end
