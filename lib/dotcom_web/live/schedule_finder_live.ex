defmodule DotcomWeb.ScheduleFinderLive do
  @moduledoc """
  The primary view for looking up schedules, predictions, and relevant alerts
  for a given route/direction/stop.
  """

  use DotcomWeb, :live_view

  import CSSHelpers
  import DotcomWeb.Components.Alerts
  import Dotcom.Utils.ServiceDateTime, only: [service_date: 0]
  import DotcomWeb.RouteComponents, only: [lined_list: 1, lined_list_item: 1]

  alias Dotcom.ScheduleFinder.ServiceGroup
  alias DotcomWeb.Components.Departures
  alias DotcomWeb.Live.UpcomingDeparturesLive
  alias DotcomWeb.RouteComponents
  alias MbtaMetro.Components.SystemIcons
  alias Phoenix.{LiveView, LiveView.AsyncResult}
  alias Routes.Route
  alias Stops.Stop

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @schedule_finder Application.compile_env!(:dotcom, :schedule_finder_module)
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @impl LiveView
  # If no params are passed, forward the user to the schedule page
  def mount(params, _session, socket) when params == %{} do
    {:ok, push_navigate(socket, to: ~p"/schedules")}
  end

  # Assigns are already set!
  def mount(_params, _session, %{assigns: %{route: route}} = socket) when not is_nil(route) do
    {:ok, socket}
  end

  # Compute all the things
  def mount(params, _session, socket) do
    case validate_params(params) do
      {:ok, %{route: route, stop: stop, direction_id: direction_id}} ->
        service_groups = ServiceGroup.for_route(route.id, service_date())
        all_services = Enum.flat_map(service_groups, & &1.services)
        selected_service = Enum.find(all_services, %{}, &(&1.now_date || &1.next_date))

        {
          :ok,
          socket
          |> subscribe_to_alerts()
          |> assign_new(:route, fn -> route end)
          |> assign_page_title(route)
          |> assign_new(:vehicle_name, fn -> Route.vehicle_name(route) end)
          |> assign_new(:direction_id, fn -> direction_id end)
          |> assign_new(:stop, fn -> stop end)
          |> assign_new(:alerts, fn -> [] end)
          |> assign_new(:service_groups, fn -> service_groups end)
          |> assign_new(:loaded_trips, fn -> %{} end)
          |> assign_new(:selected_service_name, fn -> Map.get(selected_service, :label, "") end)
          |> assign_new(:service_today?, fn ->
            Enum.any?(all_services, &(!is_nil(&1.now_date)))
          end)
          |> assign_new(:daily_schedule_date, fn assigns ->
            # Current date if there's service today, next available service date otherwise... or current date if there's no service at all!
            if assigns.service_today? do
              service_date()
            else
              Map.get(selected_service, :next_date, service_date())
            end
          end)
          |> assign_alerts()
          |> assign_departures()
        }

      _ ->
        # Raising this error will render the 404 page
        raise DotcomWeb.NotFoundError
    end
  end

  @impl LiveView
  def terminate(_, _) do
    # stop listening for new alerts
    _ = Alerts.Cache.Store.unsubscribe()
  end

  @impl LiveView
  def render(assigns) do
    ~H"""
    <.route_banner route={@route} direction_id={@direction_id} />
    <.stop_banner stop={@stop} />
    <div
      class="container"
      id={"#{@route.id}-#{@direction_id}-#{@stop.id}-schedule-finder"}
      phx-hook="PageVisibility"
    >
      <div class="flex flex-col gap-y-xl max-w-xl mx-auto mt-xl">
        <.alert_banner alerts={@alerts} />
        <section>
          <h2 class="mt-0 mb-md">{~t"Upcoming Departures"}</h2>
          <%= if @service_today? do %>
            {live_render(@socket, UpcomingDeparturesLive,
              id: "upcoming-#{@route.id}-#{@direction_id}-#{@stop.id}",
              session: %{
                "route_id" => @route.id,
                "direction_id" => @direction_id,
                "stop_id" => @stop.id
              }
            )}
          <% else %>
            <.callout>{~t(No service today)}</.callout>
          <% end %>
        </section>
        <section>
          <h2 class="mt-0 mb-md">{~t(Daily Schedules)}</h2>
          <.service_picker
            id={"service-picker-#{@route.id}"}
            selected_service_name={@selected_service_name}
            service_groups={@service_groups}
          />
          <.async_result :let={departures} assign={@departures}>
            <:loading>
              <div class="mt-lg mb-md flex justify-center" data-test="departures_loading">
                <.spinner aria_label={~t"Loading schedules for selected service"} />
              </div>
            </:loading>
            <:failed :let={_fail}>
              <.error_container data-test="departures_error">
                {~t"There was a problem loading schedules"}
              </.error_container>
            </:failed>
            <%= if length(departures) > 0 do %>
              <%= if @route.type in [0, 1] do %>
                <div
                  :for={
                    {route, destination, times} <-
                      get_subway_groups(departures, @direction_id, @stop.id)
                  }
                  class="mt-lg mb-md"
                  data-test="subway_group"
                >
                  <.subway_destination route={route} destination={destination} />
                  <.first_last times={times} vehicle_name={@vehicle_name} />
                </div>
              <% else %>
                <.first_last
                  times={Enum.map(departures, & &1.time)}
                  vehicle_name={@vehicle_name}
                />
                <.departures_table departures={departures} loaded_trips={@loaded_trips} />
              <% end %>
            <% else %>
              <.callout data-test="no_service">
                {no_service_message(@service_groups, @route, @stop)}
              </.callout>
            <% end %>
          </.async_result>
        </section>
      </div>
    </div>
    """
  end

  @impl LiveView
  def handle_event(
        "open_trip",
        %{"schedule_id" => schedule_id, "stop_sequence" => stop_sequence, "trip" => trip_id},
        socket
      ) do
    date = socket.assigns.daily_schedule_date
    loaded_trips = socket.assigns.loaded_trips

    if Map.get(loaded_trips, schedule_id) do
      {:noreply, socket}
    else
      socket =
        update(socket, :loaded_trips, &Map.put(&1, schedule_id, AsyncResult.loading()))

      {stop_sequence, _} = Integer.parse(stop_sequence)
      GenServer.cast(self(), {:get_next, {schedule_id, [trip_id, stop_sequence, date]}})
      {:noreply, socket}
    end
  end

  def handle_event("select_service", %{"selected_service" => selected_service_label}, socket) do
    send(self(), %{selected_service: selected_service_label})

    {:noreply,
     socket
     |> assign(:departures, AsyncResult.loading())}
  end

  def handle_event(_, _, socket), do: {:noreply, socket}

  @impl Phoenix.LiveView
  def handle_cast({:get_next, {schedule_id, args}}, socket) do
    {:noreply,
     socket
     |> update(:loaded_trips, fn loaded_trips ->
       result =
         case Kernel.apply(@schedule_finder, :next_arrivals, args) do
           {:ok, arrivals} -> AsyncResult.ok(arrivals)
           error -> AsyncResult.failed(error, :reason)
         end

       Map.put(loaded_trips, schedule_id, result)
     end)}
  end

  @impl LiveView
  def handle_info(%{event: "alerts_updated"}, socket) do
    {:noreply, assign_alerts(socket)}
  end

  def handle_info(%{selected_service: selected_service_label}, socket) do
    {:noreply,
     socket
     |> assign_service(selected_service_label)
     |> assign_departures()}
  end

  def handle_info(_, socket), do: {:noreply, socket}

  defp subscribe_to_alerts(socket) do
    if connected?(socket) do
      _ = Alerts.Cache.Store.subscribe()
      socket
    else
      socket
    end
  end

  defp validate_params(%{
         "direction_id" => direction,
         "route_id" => route_id,
         "stop_id" => stop_id
       }) do
    with {direction_id, _} when direction_id in [0, 1] <- Integer.parse(direction),
         %Route{} = route <- @routes_repo.get(route_id),
         %Stop{} = stop <- @stops_repo.get(stop_id) do
      {:ok, %{route: route, stop: stop, direction_id: direction_id}}
    else
      _ ->
        :error
    end
  end

  defp validate_params(_), do: :error

  defp assign_page_title(assigns, %{name: long_name}) do
    assigns |> assign(:page_title, long_name <> " | " <> ~t(Departures) <> " | " <> ~t(MBTA))
  end

  defp assign_alerts(%{assigns: %{stop: stop}} = socket) when not is_nil(stop) do
    route = socket.assigns.route

    direction = socket.assigns.direction_id

    alerts =
      @schedule_finder.current_alerts(stop, route)
      |> Enum.filter(fn %{informed_entity: %{direction_id: direction_id}} ->
        Enum.any?([nil, direction], &(&1 in direction_id))
      end)

    assign(socket, :alerts, alerts)
  end

  defp assign_alerts(socket), do: assign(socket, :alerts, [])

  defp assign_departures(socket) do
    route_id = socket.assigns.route.id
    direction_id = socket.assigns.direction_id
    date = socket.assigns.daily_schedule_date
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

  defp assign_service(socket, selected_service_label) do
    selected_dated_service =
      socket.assigns.service_groups
      |> Enum.flat_map(& &1.services)
      |> Enum.find(&(&1.label == selected_service_label))

    daily_schedule_date =
      selected_dated_service.last_service_date

    socket
    |> assign(:selected_service_name, selected_service_label)
    |> assign(:daily_schedule_date, daily_schedule_date)
  end

  defp get_departures(route_id, direction_id, stop_id, date) do
    case @schedule_finder.daily_departures(route_id, direction_id, stop_id, date) do
      {:ok, departures} -> {:ok, %{departures: departures}}
      error -> error
    end
  end

  defp get_subway_groups(departures, direction_id, stop_id) do
    @schedule_finder.subway_groups(departures, direction_id, stop_id)
  end

  # Schedule Finder components =================================================

  attr :alerts, :list, required: true

  defp alert_banner(%{alerts: []} = assigns) do
    ~H""
  end

  defp alert_banner(assigns) do
    ~H"""
    <.alert_status_group alerts={@alerts} />
    """
  end

  attr :route, Route, required: true
  attr :direction_id, :string, required: true

  def route_banner(assigns) do
    mode = assigns.route |> Route.type_atom() |> atom_to_class()
    line_name = assigns.route |> Route.icon_atom() |> atom_to_class()

    assigns =
      assign(assigns, %{
        line_name: line_name,
        mode: mode
      })

    ~H"""
    <div data-test={"route_banner:#{@route.id}"} class={route_to_background_class(@route)}>
      <.link
        class="block text-current hover:text-current focus:text-current hover:no-underline active:no-underline focus:no-underline"
        patch={~p"/schedules/#{@route.id}?schedule_direction[direction_id]=#{@direction_id}"}
      >
        <div class="font-heading p-md">
          <div class="max-w-xl mx-auto flex flex-col gap-sm">
            <div class="flex items-center gap-xs font-bold">
              <SystemIcons.mode_icon
                aria-hidden
                line={@line_name}
                mode={@mode}
                class={"shrink-0 -ml-xs #{route_to_background_class(@route)}"}
              />
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
          </div>
        </div>
      </.link>
    </div>
    """
  end

  attr :id, :string, required: true
  attr :service_groups, :list, required: true
  attr :selected_service_name, :string, default: ""

  defp service_picker(assigns) do
    ~H"""
    <form
      :if={length(@service_groups) > 0}
      phx-change="select_service"
      class="mb-lg"
      id="service-picker-form"
    >
      <label for={@id} class="sr-only">
        {~t(Choose a schedule type from the available options)}
      </label>
      <select id={@id} class="mbta-input w-full" name="selected_service" phx-update="ignore">
        <%= for service_group <- @service_groups do %>
          <optgroup label={service_group.group_label}>
            <option
              :for={service <- service_group.services}
              value={service.label}
              selected={service.now_date || service.next_date}
            >
              {service.label} {if(service.now_date, do: " (#{~t(Now)})")}
            </option>
          </optgroup>
        <% end %>
      </select>
      <output
        for="service-picker"
        name="Schedules for selected service type"
        role="status"
        class="sr-only"
      >
        {@selected_service_name}
      </output>
    </form>
    """
  end

  attr :stop, Stop

  def stop_banner(assigns) do
    ~H"""
    <div :if={@stop} data-test={"stop_banner:#{@stop.id}"} class="bg-gray-lightest">
      <.link
        class="block text-black hover:text-black focus:text-black hover:no-underline active:no-underline focus:no-underline"
        patch={~p"/stops/#{@stop}"}
      >
        <div class="font-heading p-md">
          <div class="max-w-xl mx-auto flex items-center gap-xs">
            <.icon
              type="icon-svg"
              aria-hidden
              data-test={["stop_banner_icon:", if(@stop.station?, do: "station", else: "stop")]}
              name={if(@stop.station?, do: "mbta-logo", else: "icon-stop-default")}
              class="size-5 fill-current"
            />
            <span class="notranslate grow font-bold">{@stop.name}</span>
            <.icon aria-hidden name="arrow-up-right-from-square" class="size-4 fill-current" />
          </div>
        </div>
      </.link>
    </div>
    """
  end

  attr :times, :list, required: true
  attr :vehicle_name, :string, required: true

  defp first_last(%{times: [first, _second | _] = times} = assigns) do
    assigns =
      assigns
      |> assign(:first, first)
      |> assign(:last, List.last(times))

    ~H"""
    <div class="bg-cobalt-90 p-3 flex justify-between">
      <div :if={@first}>
        {gettext("First %{vehicle}", vehicle: String.downcase(@vehicle_name))}:
        <strong>
          <Departures.formatted_time time={@first} />
        </strong>
      </div>
      <div :if={@last}>
        {gettext("Last %{vehicle}", vehicle: String.downcase(@vehicle_name))}:
        <strong class="no-wrap">
          <Departures.formatted_time time={@last} />
          <sup :if={next_day?(@first, @last)} aria-hidden="true">+1</sup>
          <span :if={next_day?(@first, @last)} class="sr-only">{~t(the next morning)}</span>
        </strong>
      </div>
    </div>
    """
  end

  defp first_last(assigns), do: ~H""

  defp next_day?(%DateTime{} = first, %DateTime{} = second) do
    Date.after?(second, first)
  end

  defp next_day?(_, _), do: false

  attr :departures, :list, required: true
  attr :loaded_trips, :map, required: true

  defp departures_table(assigns) do
    ~H"""
    <div
      class="grid grid-cols-1 divide-y-xs divide-gray-lightest border-xs border-gray-lightest"
      data-test="departures_table"
    >
      <.unstyled_accordion
        :for={departure <- @departures}
        summary_class="flex items-center gap-sm hover:bg-brand-primary-lightest px-sm py-3"
        phx-click="open_trip"
        phx-value-schedule_id={departure.schedule_id}
        phx-value-stop_sequence={departure.stop_sequence}
        phx-value-trip={departure.trip_id}
      >
        <:heading>
          <Departures.departure_heading route={departure.route}>
            <:headsign>
              <div class="flex gap-x-sm gap-y-xs flex-wrap">
                {departure.headsign}
                <.badge
                  :if={departure.time_desc == "School days only"}
                  class="bg-charcoal-80 text-nowrap text-sm"
                >
                  {~t"School days only"}
                </.badge>
              </div>
            </:headsign>

            <:additional_info :if={departure.route.type == 2 && departure.trip_name}>
              {~t(Train)} {departure.trip_name}
            </:additional_info>

            <:time><Departures.formatted_time time={departure.time} /></:time>
          </Departures.departure_heading>
        </:heading>
        <:content>
          <.async_result
            :let={arrivals}
            assign={Map.get(@loaded_trips, departure.schedule_id, AsyncResult.loading())}
          >
            <:loading>
              <div class="p-lg text-gray">{~t"Loading arrivals..."}</div>
            </:loading>
            <:failed :let={_fail}>
              <.error_container>
                {~t"There was a problem loading arrivals"}
              </.error_container>
            </:failed>
            <.lined_list :if={arrivals}>
              <.lined_list_item
                :for={{arrival, index} <- Enum.with_index(arrivals)}
                route={departure.route}
                class={if(index == 0, do: "font-bold")}
                stop_pin?={index == 0}
              >
                <DotcomWeb.Components.Departures.stop_label
                  stop_name={arrival.stop_name}
                  platform_name={arrival.platform_name}
                />

                <Departures.formatted_time time={arrival.time} />
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

  defp no_service_message(service_groups, route, stop) do
    route_name =
      if(route.type == 3 && not Route.silver_line?(route),
        do: gettext("Route %{route}", route: route.name),
        else: route.name
      )

    if service_groups == [] do
      gettext("There is currently no scheduled %{route_name}.", route_name: route_name)
    else
      gettext("There is no scheduled %{route} service at %{stop} for this time period.",
        route: route_name,
        stop: stop.name
      )
    end
  end
end
