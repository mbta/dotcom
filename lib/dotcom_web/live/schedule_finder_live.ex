defmodule DotcomWeb.ScheduleFinderLive do
  @moduledoc """
  The primary view for looking up schedules, predictions, and relevant alerts
  for a given route/direction/stop.
  """

  use DotcomWeb, :live_view

  import CSSHelpers
  import Dotcom.ScheduleFinder
  import Dotcom.Utils.ServiceDateTime, only: [service_date: 0]
  import Dotcom.Utils.Time, only: [format!: 2]

  alias Dotcom.ScheduleFinder.FutureArrival
  alias DotcomWeb.Components.Prototype
  alias DotcomWeb.RouteComponents
  alias MbtaMetro.Components.SystemIcons
  alias Phoenix.{LiveView, LiveView.AsyncResult}
  alias Routes.Route
  alias Stops.Stop

  @predictions_pub_sub Application.compile_env!(:dotcom, :predictions_pub_sub)
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @timezone Application.compile_env!(:dotcom, :timezone)

  @impl LiveView
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign_new(:route, fn -> nil end)
     |> assign_new(:direction_id, fn -> nil end)
     |> assign_new(:stop, fn -> nil end)
     |> assign_new(:predictions, fn -> nil end)
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
    <h2>Streamed Predictions</h2>
    <div :for={p <- @predictions} :if={@predictions} class="flex justify-between">
      <span>{p.trip.headsign}</span>
      <strong>
        <.formatted_time time={p.time} />
      </strong>
    </div>
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
     |> subscribe_to_predictions(socket.assigns.stop)
     |> assign_departures()}
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

  @impl LiveView
  def handle_info({:new_predictions, predictions}, socket) do
    {:noreply, assign_predictions(socket, predictions)}
  end

  def handle_info(_, socket), do: {:noreply, socket}

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

  defp assign_stop(socket, params) do
    stop_id = Map.get(params, "stop")
    assign(socket, :stop, if(stop_id, do: @stops_repo.get(stop_id)))
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

  defp subscribe_to_predictions(socket, old_stop) do
    stop = socket.assigns.stop

    if stop && stop.id && stop != old_stop do
      # unsub from whatever prior stop..
      @predictions_pub_sub.unsubscribe()
      topic = "stop:#{stop.id}"

      case @predictions_pub_sub.subscribe(topic) do
        {:error, _} ->
          assign(socket, :predictions, nil)

        predictions ->
          assign_predictions(socket, predictions)
      end
    else
      socket
    end
  end

  defp assign_predictions(socket, predictions) do
    route_id = socket.assigns.route.id
    direction_id = socket.assigns.direction_id
    # add stop_sequence to this filtering, probably

    predictions
    |> DotcomWeb.PredictionsChannel.filter_new()
    |> Enum.filter(&(&1.route.id == route_id && &1.direction_id == direction_id))
    |> Enum.sort_by(& &1.time, DateTime)
    |> Enum.take(5)
    |> then(&assign(socket, :predictions, &1))
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
    assigns = assign(assigns, :time, ensure_timezone(assigns.time))

    ~H"""
    <time datetime={@time} class="tabular-nums whitespace-nowrap">
      {format!(@time, :hour_12_minutes)}
    </time>
    """
  end

  defp ensure_timezone(time) do
    DateTime.shift_zone!(time, @timezone)
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
end
