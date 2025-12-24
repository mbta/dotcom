defmodule DotcomWeb.ScheduleFinderLive do
  @moduledoc """
  The primary view for looking up schedules, predictions, and relevant alerts
  for a given route/direction/stop.
  """

  use DotcomWeb, :live_view

  import CSSHelpers
  import DotcomWeb.Components.Alerts
  import Dotcom.ScheduleFinder
  import Dotcom.Utils.Diff, only: [seconds_to_localized_minutes: 1]
  import Dotcom.Utils.ServiceDateTime, only: [service_date: 0]
  import Dotcom.Utils.Time, only: [format!: 2]
  import DotcomWeb.RouteComponents, only: [lined_list: 1, lined_list_item: 1]

  alias Dotcom.ScheduleFinder.UpcomingDepartures
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
     |> assign_new(:alerts, fn -> [] end)
     |> assign_new(:loaded_trips, fn -> %{} end)
     |> assign_new(:date, fn -> nil end)}
  end

  @impl LiveView
  def render(assigns) do
    assigns =
      assigns
      |> assign(:vehicle_name, if(assigns.route, do: Route.vehicle_name(assigns.route)))
      |> assign(:now, @date_time.now())

    ~H"""
    <Prototype.route_stop_picker
      selected_route={@route}
      selected_direction_id={@direction_id}
    />
    <.route_banner route={@route} direction_id={@direction_id} />
    <.stop_banner stop={@stop} />
    <div class="px-3 py-xl flex flex-col gap-y-xl">
      <.alert_banner alerts={@alerts} />
      <section>
        <h2 class="mt-0 b-md">{~t"Upcoming Departures"}</h2>
        <.upcoming_departures_table
          :if={@stop}
          now={@now}
          stop_id={@stop.id}
          upcoming_departures={@upcoming_departures}
          vehicle_name={@vehicle_name}
        />
        <.remaining_service
          :if={departures = @departures.ok? && @departures.result}
          route_type={@route.type}
          end_of_service={end_of_service(departures)}
        />
      </section>
      <section>
        <h2 class="mt-0 mb-md">{~t(Daily Schedules)}</h2>
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
                :for={
                  {route, destination, times} <- subway_groups(departures, @direction_id, @stop.id)
                }
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
      </section>
    </div>
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
     |> assign_alerts()
     |> assign_departures()
     |> assign_upcoming_departures()}
  end

  # @impl LiveView
  # def terminate(_reason, socket) do
  #   ## figure out some way to close the open stream connections :/
  # end

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
     |> refresh_upcoming_departures()}
  end

  defp schedule_refresh() do
    # Refresh every second
    Process.send_after(self(), :refresh, 1000)
  end

  defp assign_stop(socket, params) do
    stop_id = Map.get(params, "stop")
    assign(socket, :stop, if(stop_id, do: @stops_repo.get(stop_id)))
  end

  defp assign_upcoming_departures(%{assigns: %{stop: %Stop{id: stop_id}}} = socket) do
    route = socket.assigns.route
    direction_id = socket.assigns.direction_id

    case Predictions.StreamTopic.new("stop:#{stop_id}") do
      %Predictions.StreamTopic{} = stream_topic ->
        :ok = Predictions.StreamTopic.start_streams(stream_topic)

        predictions =
          Predictions.Store.fetch(stop: stop_id, route: route.id, direction: direction_id)

        ud =
          UpcomingDepartures.upcoming_departures(%{
            direction_id: direction_id,
            route: route,
            stop_id: stop_id,
            predictions: predictions
          })

        socket
        |> assign(
          :upcoming_departures,
          ud
        )

      {:error, _} ->
        socket |> assign(:upcoming_departures, [])
    end
  end

  defp assign_upcoming_departures(socket) do
    socket |> assign(:upcoming_departures, [])
  end

  defp refresh_upcoming_departures(%{assigns: %{stop: %Stop{id: stop_id}}} = socket) do
    route = socket.assigns.route
    direction_id = socket.assigns.direction_id
    predictions = Predictions.Store.fetch(stop: stop_id, route: route.id, direction: direction_id)

    socket
    |> assign(
      :upcoming_departures,
      UpcomingDepartures.upcoming_departures(%{
        direction_id: direction_id,
        route: route,
        stop_id: stop_id,
        predictions: predictions
      })
    )
  end

  defp refresh_upcoming_departures(socket) do
    socket |> assign(:upcoming_departures, [])
  end

  defp today, do: service_date() |> format!(:iso_date)

  defp assign_alerts(%{assigns: %{stop: stop}} = socket) when not is_nil(stop) do
    route = socket.assigns.route
    assign(socket, :alerts, current_alerts(stop, route))
  end

  defp assign_alerts(socket), do: assign(socket, :alerts, [])

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

  attr :alerts, :list, required: true

  defp alert_banner(assigns) do
    ~H"""
    <.alert_status_group alerts={@alerts} />
    """
  end

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
        patch={~p"/schedules/#{@route}?schedule_direction[direction_id]=#{@direction_id}"}
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
          <.async_result
            :let={arrivals}
            assign={Map.get(@loaded_trips, departure.schedule_id, AsyncResult.loading())}
          >
            <:loading>
              <div class="p-lg text-gray">{~t"Loading arrivals..."}</div>
            </:loading>
            <:failed :let={fail}>
              <.error_container title={inspect(fail)}>
                {~t"There was a problem loading arrivals"}
              </.error_container>
            </:failed>
            <.lined_list :if={arrivals}>
              <.lined_list_item :for={arrival <- arrivals} route={@route}>
                <div class="notranslate grow">
                  <div>{arrival.stop_name}</div>
                  <div :if={arrival.platform_name} class="text-sm">
                    {arrival.platform_name}
                  </div>
                </div>
                <.formatted_time time={arrival.time} />
              </.lined_list_item>
            </.lined_list>
          </.async_result>
        </:content>
      </.unstyled_accordion>
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
  attr :stop_id, :string
  attr :upcoming_departures, :list
  attr :vehicle_name, :string

  defp upcoming_departures_table(assigns) do
    ~H"""
    <div class="divide-y-xs divide-gray-lightest border-xs border-gray-lightest">
      <.unstyled_accordion
        :for={upcoming_departure <- @upcoming_departures}
        id={"upcoming-departure-#{upcoming_departure.trip_id}"}
        summary_class="flex items-center border-gray-lightest py-3 px-2 gap-2 group-open:bg-gray-lightest hover:bg-brand-primary-lightest group-open:hover:bg-brand-primary-lightest"
      >
        <:heading>
          <div class="w-full flex gap-2">
            <RouteComponents.route_icon size="small" route={upcoming_departure.route} />
            <div>{upcoming_departure.headsign}</div>
            <div class="ml-auto">
              <.prediction_time_display arrival_status={upcoming_departure.arrival_status} />
            </div>
          </div>
        </:heading>
        <:content>
          <.lined_list>
            <.lined_list_item route={upcoming_departure.route} variant="mode">
              <div class="grow">Hello we are your {@vehicle_name}</div>
            </.lined_list_item>
            <details
              :if={Enum.count(upcoming_departure.trip_details.stops_before) > 0}
              class="group/details"
            >
              <summary class="cursor-pointer">
                <.lined_list_item route={upcoming_departure.route} variant="none">
                  <div class="grow">
                    {ngettext(
                      "1 Stop Away",
                      "%{count} Stops Away",
                      Enum.count(upcoming_departure.trip_details.stops_before)
                    )}
                  </div>
                  <div class="shrink-0">
                    <.icon name="chevron-down" class="h-3 w-3 group-open/details:rotate-180" />
                  </div>
                </.lined_list_item>
              </summary>
              <.other_stop
                :for={other_stop <- upcoming_departure.trip_details.stops_before}
                class="border-t-xs border-gray-lightest"
                other_stop={other_stop}
                route={upcoming_departure.route}
                stop_id={@stop_id}
              />
            </details>

            <.other_stop
              other_stop={upcoming_departure.trip_details.stop}
              route={upcoming_departure.route}
              stop_id={@stop_id}
            />
            <.other_stop
              :for={other_stop <- upcoming_departure.trip_details.stops_after}
              other_stop={other_stop}
              route={upcoming_departure.route}
              stop_id={@stop_id}
            />
          </.lined_list>
        </:content>
      </.unstyled_accordion>
    </div>
    """
  end

  attr :class, :string, default: ""
  attr :route, Route, required: true
  attr :stop_id, :string, required: true
  attr :other_stop, :any, required: true

  defp other_stop(assigns) do
    ~H"""
    <.lined_list_item route={@route} class={@class}>
      <div class={["grow", @stop_id == @other_stop.stop_id && "font-bold"]}>
        {@other_stop.stop_name}
      </div>
      <div class={["ml-auto", @stop_id == @other_stop.stop_id && "font-bold"]}>
        {format!(@other_stop.time, :hour_12_minutes)}
      </div>
    </.lined_list_item>
    """
  end

  defp prediction_time_display(%{arrival_status: {:scheduled, time}} = assigns) do
    assigns = assigns |> assign(:time, time)

    ~H"""
    <span>
      {format!(@time, :hour_12_minutes)}
    </span>
    """
  end

  defp prediction_time_display(assigns),
    do: ~H"""
    <.realtime_display text={realtime_text(@arrival_status)} />
    """

  defp realtime_display(assigns) do
    ~H"""
    <span class="font-bold">
      <.icon type="icon-svg" name="icon-realtime-tracking" />
      {@text}
    </span>
    """
  end

  defp realtime_text({:arrival_seconds, seconds}),
    do: seconds_to_localized_minutes(seconds)

  defp realtime_text({:departure_seconds, seconds}),
    do: seconds_to_localized_minutes(seconds)

  defp realtime_text(:approaching), do: ~t"Approaching"
  defp realtime_text(:arriving), do: ~t"Arriving"
  defp realtime_text(:boarding), do: ~t"Boarding"
  defp realtime_text(:now), do: ~t"Now"

  defp remaining_service(%{route_type: route_type} = assigns) when route_type in [0, 1] do
    ~H"""
    <div class="flex justify-center bg-gray-lightest w-full py-3">
      <span class="font-medium text-sm">Service Continues Until {@end_of_service}</span>
    </div>
    """
  end

  defp remaining_service(assigns) do
    ~H"""
    <details class="group">
      <summary class="flex bg-gray-lightest w-full py-3 cursor-pointer">
        <span class="px-2 font-medium text-sm">More trips later today</span>
        <span class="px-2 ml-auto font-medium text-sm text-brand-primary hover:underline group-open:hidden">
          Show
        </span>
        <span class="px-2 ml-auto font-medium text-sm text-brand-primary hover:underline hidden group-open:block">
          Hide
        </span>
      </summary>
      <div class="flex gap-2 px-2 py-3 border-gray-lightest border-xs">
        <.icon type="solid" name="person-digging" class="size-6" />
        <span>This part's not quite ready yet!</span>
      </div>
    </details>
    """
  end

  defp end_of_service([]), do: nil

  defp end_of_service(departures) do
    departures
    |> List.last()
    |> Kernel.then(& &1.time)
    |> format!(:hour_12_minutes)
  end
end
