defmodule DotcomWeb.Live.UpcomingDeparturesLive do
  @moduledoc """
  Displays information about upcoming departures for a given route, direction, and stop, updating in real-time.
  """

  use DotcomWeb, :live_view

  import Dotcom.Utils.Diff, only: [minutes_to_localized_minutes: 1]
  import Dotcom.Utils.ServiceDateTime, only: [service_date: 0]
  import Dotcom.Utils.Time, only: [format!: 2]
  import DotcomWeb.RouteComponents, only: [lined_list: 1, lined_list_item: 1]

  alias DotcomWeb.Components.Departures
  alias Phoenix.{LiveView, LiveView.AsyncResult}

  @date_time Application.compile_env!(:dotcom, :date_time_module)
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @upcoming_departures_module Application.compile_env!(:dotcom, :upcoming_departures_module)

  @impl LiveView
  def mount(_not_mounted_at_router, session, socket) do
    %{
      "route_id" => route_id,
      "direction_id" => direction_id,
      "stop_id" => stop_id
    } = session

    {:ok,
     socket
     |> assign(:direction_id, direction_id)
     |> assign(:route_id, route_id)
     |> assign(:stop_id, stop_id)
     |> assign_new(:route, fn -> @routes_repo.get(route_id) end)
     |> assign_new(:stop, fn -> @stops_repo.get(stop_id) end)
     |> assign_new(:should_refresh?, fn -> true end)
     |> assign_new(:loaded_upcoming_trips, fn -> %{} end)
     |> assign_new(:last_trip_time, fn assigns ->
       if assigns.route.type in [0, 1] do
         @schedules_repo.by_route_ids([route_id],
           direction_id: direction_id,
           stop_ids: [assigns.stop.id],
           date: service_date()
         )
         |> List.last(%{})
         |> Map.get(:time)
       end
     end)
     |> assign(:departures, AsyncResult.loading())
     |> subscribe_to_upcoming_departures()}
  end

  @impl LiveView
  def render(assigns) do
    ~H"""
    <section
      id={"upcoming-#{@route.id}-#{@direction_id}-#{@stop.id}-section"}
      phx-hook="PageVisibility"
    >
      <div class="hidden phx-error:block">
        <.callout data-test="u_d:error">
          {~t(There was a problem loading upcoming departures)}
        </.callout>
      </div>
      <div class="block phx-error:hidden">
        <.async_result :let={departures} assign={@departures}>
          <:loading>
            <div data-test="u_d:async_loading" class="mt-lg mb-md flex justify-center">
              <.spinner aria_label={~t"Loading upcoming departures"} />
            </div>
          </:loading>
          <:failed :let={_fail}>
            <.callout data-test="u_d:async_failed">
              {~t(There was a problem loading upcoming departures)}
            </.callout>
          </:failed>
          <section data-test="u_d:async_success">
            <.upcoming_departures_section
              stop={@stop}
              loaded_upcoming_trips={@loaded_upcoming_trips}
              upcoming_departures={departures}
              route={@route}
              last_trip_time={@last_trip_time}
            />
          </section>
        </.async_result>
      </div>
    </section>
    """
  end

  @impl LiveView
  def terminate(_reason, socket) do
    socket.assigns
    |> Map.take([:route_id, :direction_id, :stop_id])
    |> Dotcom.UpcomingDepartures.unsubscribe()
  end

  @impl LiveView
  def handle_event(
        "open_upcoming_trip",
        %{"stop-sequence" => stop_sequence, "trip-id" => trip_id},
        socket
      ) do
    {:noreply,
     socket
     |> assign_trip_details(trip_id, String.to_integer(stop_sequence))}
  end

  def handle_event("visibility_change", %{"state" => state}, socket) do
    {
      :noreply,
      socket
      |> assign(:should_refresh?, state == "visible")
      |> subscribe_to_upcoming_departures()
    }
  end

  def handle_event(_, _, socket), do: {:noreply, socket}

  @impl LiveView
  def handle_info(:refresh_upcoming_departures, socket) do
    {:noreply, refresh_upcoming_trip_details(socket)}
  end

  def handle_info({:upcoming_departures, upcoming_departures}, socket) do
    {:noreply,
     socket
     |> update(:departures, &AsyncResult.ok(&1, upcoming_departures))
     |> refresh_upcoming_trip_details()}
  end

  def handle_info(
        %Phoenix.Socket.Broadcast{event: "upcoming_departures", payload: upcoming_departures},
        socket
      ) do
    case upcoming_departures do
      :terminated ->
        {:noreply, assign(socket, :departures, AsyncResult.failed(%AsyncResult{}, :terminated))}

      upcoming_departures ->
        {:noreply,
         socket
         |> update(:departures, &AsyncResult.ok(&1, upcoming_departures))
         |> refresh_upcoming_trip_details()}
    end
  end

  defp assign_trip_details(socket, trip_id, stop_sequence) do
    now = @date_time.now()
    stop_id = socket.assigns.stop.id

    trip_details =
      @upcoming_departures_module.trip_details(%{
        now: now,
        stop_id: stop_id,
        stop_sequence: stop_sequence,
        trip_id: trip_id
      })

    socket
    |> update(:loaded_upcoming_trips, fn loaded_upcoming_trips ->
      Map.put(loaded_upcoming_trips, {trip_id, stop_sequence}, AsyncResult.ok(trip_details))
    end)
  end

  defp subscribe_to_upcoming_departures(socket) do
    if connected?(socket) do
      params =
        socket.assigns
        |> Map.take([:route_id, :direction_id, :stop_id])

      if socket.assigns.should_refresh? do
        Dotcom.UpcomingDepartures.subscribe(params)
      else
        Dotcom.UpcomingDepartures.unsubscribe(params)
      end
    end

    socket
  end

  defp schedule_refresh_upcoming_departures(pid) do
    # Refresh every second
    Process.send_after(pid, :refresh_upcoming_departures, 5000)
  end

  defp refresh_upcoming_trip_details(socket) do
    _ = if socket.assigns.should_refresh?, do: schedule_refresh_upcoming_departures(self())

    trip_ids_and_stop_seqs = Map.keys(socket.assigns.loaded_upcoming_trips)

    Enum.reduce(trip_ids_and_stop_seqs, socket, fn {trip_id, stop_sequence}, s ->
      s |> assign_trip_details(trip_id, stop_sequence)
    end)
  end

  attr :upcoming_departures, :any,
    required: true,
    doc: "Output of Dotcom.UpcomingDepartures.upcoming_departures/1"

  attr :last_trip_time, DateTime, required: false
  attr :loaded_upcoming_trips, :map, required: true
  attr :no_realtime, :boolean
  attr :route, Routes.Route, required: true
  attr :stop, Stops.Stop, required: true

  def upcoming_departures_section(
        %{upcoming_departures: {:before_service, upcoming_departure}} =
          assigns
      ) do
    assigns = assigns |> assign(:upcoming_departure, upcoming_departure)

    ~H"""
    <div class="w-full flex items-center border-xs border-gray-lightest py-3 px-2 gap-2">
      <.upcoming_departure_heading upcoming_departure={@upcoming_departure} />
    </div>
    <.attached_callout>
      {~t"Predicted departure times aren’t available yet, but they’ll appear here before the scheduled first trip."}
    </.attached_callout>
    """
  end

  def upcoming_departures_section(%{upcoming_departures: :service_ended} = assigns) do
    ~H"""
    <.callout>{~t"Service ended"}</.callout>
    """
  end

  def upcoming_departures_section(%{upcoming_departures: :no_service} = assigns) do
    ~H"""
    <.callout>{~t"No service today"}</.callout>
    """
  end

  def upcoming_departures_section(%{upcoming_departures: :no_realtime} = assigns) do
    ~H"""
    <.callout>{~t"There are currently no realtime departures available."}</.callout>
    """
  end

  def upcoming_departures_section(
        %{upcoming_departures: {:no_realtime, upcoming_departures}} = assigns
      ) do
    assigns = assign(assigns, :upcoming_departures, upcoming_departures)

    ~H"""
    <.attached_callout>
      {~t"There are currently no realtime departures available. Scheduled departures are shown below."}
    </.attached_callout>
    <.upcoming_departures_section
      stop={@stop}
      loaded_upcoming_trips={@loaded_upcoming_trips}
      upcoming_departures={@upcoming_departures}
      route={@route}
      last_trip_time={@last_trip_time}
      no_realtime
    />
    """
  end

  def upcoming_departures_section(assigns) do
    ~H"""
    <.mbta_go_cta
      :if={!Map.has_key?(assigns, :no_realtime)}
      route_type_atom={Routes.Route.type_atom(@route)}
    />
    <.upcoming_departures_table
      stop_id={@stop.id}
      upcoming_departures={@upcoming_departures |> Enum.take(5)}
      loaded_upcoming_trips={@loaded_upcoming_trips}
    />
    <.remaining_service
      loaded_upcoming_trips={@loaded_upcoming_trips}
      remaining_departures={@upcoming_departures |> Enum.drop(5)}
      route={@route}
      route_type={@route.type}
      stop_id={@stop.id}
      last_trip_time={@last_trip_time}
    />
    """
  end

  attr :loaded_upcoming_trips, Phoenix.LiveView.AsyncResult
  attr :stop_id, :string
  attr :upcoming_departures, :list

  defp upcoming_departures_table(assigns) do
    ~H"""
    <div class="divide-y-xs divide-gray-lightest border-xs border-gray-lightest">
      <.unstyled_accordion
        :for={upcoming_departure <- @upcoming_departures}
        phx-click="open_upcoming_trip"
        phx-value-trip-id={upcoming_departure.trip_id}
        phx-value-stop-sequence={upcoming_departure.stop_sequence}
        id={"upcoming-departure-#{upcoming_departure.trip_id}-#{upcoming_departure.stop_sequence}"}
        summary_class="flex items-center border-gray-lightest py-3 px-2 gap-2 group-open:bg-gray-lightest hover:bg-brand-primary-lightest group-open:hover:bg-brand-primary-lightest"
      >
        <:heading>
          <.upcoming_departure_heading upcoming_departure={upcoming_departure} />
        </:heading>
        <:content>
          <.trip_details_wrapper
            route={upcoming_departure.route}
            trip_details={
              Map.get(
                @loaded_upcoming_trips,
                {upcoming_departure.trip_id, upcoming_departure.stop_sequence},
                AsyncResult.loading()
              )
            }
          />
        </:content>
      </.unstyled_accordion>
    </div>
    """
  end

  attr :upcoming_departure, Dotcom.UpcomingDepartures.UpcomingDeparture, required: true

  defp upcoming_departure_heading(assigns) do
    ~H"""
    <Departures.departure_heading route={@upcoming_departure.route}>
      <:headsign>
        <div class="flex gap-x-sm gap-y-xs flex-wrap items-center">
          {@upcoming_departure.headsign}
          <.badge :if={@upcoming_departure.last_trip?} class="bg-charcoal-80 text-nowrap text-sm">
            {~t"Last"}
          </.badge>
        </div>
      </:headsign>

      <:additional_info :if={@upcoming_departure.trip_name}>
        {@upcoming_departure.trip_name}
        <span :if={!is_nil(@upcoming_departure.platform_name)} aria-hidden="true">
          &bull;
        </span>
        {@upcoming_departure.platform_name}
      </:additional_info>

      <:additional_info :if={
        @upcoming_departure.vehicle_name &&
          @upcoming_departure.route.type == 4
      }>
        <i>{@upcoming_departure.vehicle_name}</i>
      </:additional_info>

      <:time>
        <div class="flex flex-col items-end">
          <div class="inline-flex gap-xs flex-nowrap items-center">
            <.prediction_time_display arrival_status={@upcoming_departure.arrival_status} />
            <.vehicle_crowding crowding={@upcoming_departure.crowding} />
          </div>
          <.prediction_substatus_display arrival_substatus={@upcoming_departure.arrival_substatus} />
        </div>
      </:time>
    </Departures.departure_heading>
    """
  end

  attr :trip_details, AsyncResult, required: true
  attr :route, Routes.Route, required: true

  defp trip_details_wrapper(assigns) do
    ~H"""
    <.async_result :let={trip_details} assign={@trip_details}>
      <:loading>
        <div class="mt-lg mb-md flex justify-center">
          <.spinner aria_label={~t"Loading trip details"} />
        </div>
      </:loading>
      <:failed>
        <.callout>{~t(There was a problem loading trip details)}</.callout>
      </:failed>

      <.trip_details trip_details={trip_details} route={@route} />
    </.async_result>
    """
  end

  attr :trip_details, Dotcom.UpcomingDepartures.UpcomingTripDetails, required: true
  attr :route, Routes.Route, required: true

  defp trip_details(assigns) do
    ~H"""
    <.lined_list>
      <.lined_list_item
        route={@route}
        variant="mode"
        stop_pin?={@trip_details.stop == nil}
      >
        <div class="grow font-medium">
          <.vehicle_label
            vehicle_info={@trip_details.vehicle_info}
            route={@route}
          />
        </div>
        <div :if={@trip_details.vehicle_info.departure_time}>
          <Departures.formatted_time time={@trip_details.vehicle_info.departure_time} />
        </div>
      </.lined_list_item>
      <details
        :if={Enum.count(@trip_details.stops_before) > 0}
        class="group/details"
      >
        <summary class="cursor-pointer bg-charcoal-90">
          <.lined_list_item
            background="charcoal-90"
            class="group-open/details:hidden"
            route={@route}
            variant="squiggle"
          >
            <div class="grow">
              <span class="text-[0.75rem] underline">
                {~t"Show more stops"}
              </span>
            </div>
            <div class="shrink-0">
              <.icon name="chevron-down" class="h-3 w-3" />
            </div>
          </.lined_list_item>
          <.lined_list_item
            background="charcoal-90"
            class="hidden group-open/details:flex"
            route={@route}
            variant="none"
          >
            <div class="grow">
              <span class="text-[0.75rem] underline">
                {~t"Show fewer stops"}
              </span>
            </div>
            <div class="shrink-0">
              <.icon name="chevron-down" class="h-3 w-3 rotate-180" />
            </div>
          </.lined_list_item>
        </summary>
        <.other_stop
          :for={other_stop <- @trip_details.stops_before}
          background="charcoal-90"
          class="border-t-xs border-gray-lightest bg-charcoal-90"
          other_stop={other_stop}
          route={@route}
        />
      </details>

      <.other_stop
        :if={@trip_details.stop}
        highlight
        other_stop={@trip_details.stop}
        route={@route}
      />
      <.other_stop
        :for={other_stop <- @trip_details.stops_after}
        other_stop={other_stop}
        route={@route}
      />
    </.lined_list>
    """
  end

  attr :vehicle_info, Dotcom.ScheduleFinder.TripDetails.VehicleInfo, required: true
  attr :route, Routes.Route, required: true

  defp vehicle_label(assigns) do
    ~H"""
    <div class="font-normal text-charcoal-30 text-sm">
      <span :if={@vehicle_info.status != :in_transit} class="sr-only">
        {Routes.Route.vehicle_name(@route)}
      </span>
      {vehicle_status_message(@vehicle_info.status)}
    </div>
    <Departures.stop_label
      stop_name={@vehicle_info.stop_name}
      platform_name={@vehicle_info.platform_name}
    />
    <.vehicle_crowding
      crowding={crowding(@vehicle_info)}
      show_label?
    />
    """
  end

  defp vehicle_status_message(:scheduled_to_depart), do: ~t"Scheduled to depart"
  defp vehicle_status_message(:waiting_to_depart), do: ~t"Waiting to depart"
  defp vehicle_status_message(:in_transit), do: ~t"Next stop"
  defp vehicle_status_message(:incoming), do: ~t"Approaching"
  defp vehicle_status_message(:stopped), do: ~t"Now at"
  defp vehicle_status_message(:location_unavailable), do: ~t"Location unavailable"
  defp vehicle_status_message(:finishing_another_trip), do: ~t"Finishing another trip"

  defp crowding(%Dotcom.ScheduleFinder.TripDetails.VehicleInfo{crowding: crowding}), do: crowding
  defp crowding(_), do: nil

  attr :crowding, :atom
  attr :show_label?, :boolean, default: false

  defp vehicle_crowding(%{show_label?: true} = assigns) do
    ~H"""
    <div :if={@crowding} class="flex gap-xs text-sm flex-nowrap items-center">
      <.crowding_icon class="size-4" crowding={@crowding} aria-hidden />
      <div class="font-normal text-charcoal-30">{crowding_message(@crowding)}</div>
    </div>
    """
  end

  defp vehicle_crowding(assigns) do
    ~H"""
    <.crowding_icon :if={@crowding} crowding={@crowding} aria-label={crowding_message(@crowding)} />
    """
  end

  attr :class, :string, default: ""
  attr :crowding, :atom
  attr :rest, :global

  defp crowding_icon(assigns) do
    ~H"""
    <.icon
      type="icon-svg"
      name="icon-crowding"
      class={"c-icon__crowding c-icon__crowding--#{@crowding} #{@class}"}
      {@rest}
    />
    """
  end

  defp crowding_message(:not_crowded), do: ~t"Not crowded"
  defp crowding_message(:some_crowding), do: ~t"Some crowding"
  defp crowding_message(:crowded), do: ~t"Crowded"
  defp crowding_message(_), do: ""

  attr :background, :string, default: "white", values: ["white", "charcoal-90"]
  attr :class, :string, default: ""
  attr :route, Routes.Route, required: true
  attr :other_stop, :any, required: true
  attr :highlight, :boolean, default: false

  defp other_stop(assigns) do
    ~H"""
    <.lined_list_item
      background={@background}
      route={@route}
      class={@class}
      stop_pin?={@highlight}
      variant={if @other_stop.cancelled?, do: "cancelled", else: "default"}
    >
      <div class={["grow", @highlight && "font-bold", @other_stop.cancelled? && "line-through"]}>
        <Departures.stop_label
          stop_name={@other_stop.stop_name}
          platform_name={@other_stop.platform_name}
        />
      </div>
      <div class="ml-auto flex flex-col items-end">
        <div class={[@highlight && "font-bold"]}>
          <.trip_stop_time cancelled?={@other_stop.cancelled?} time={@other_stop.time} />
        </div>
      </div>
    </.lined_list_item>
    """
  end

  defp trip_stop_time(%{cancelled?: true} = assigns) do
    ~H"""
    <div class="block text-sm flex items-center gap-0.5">
      <.icon aria-hidden type="icon-svg" name="icon-cancelled-default" class="size-3" /> {~t(Skipped)}
    </div>
    """
  end

  defp trip_stop_time(%{time: {:time, time}} = assigns) do
    assigns = assigns |> assign(:time, time)

    ~H"""
    <Departures.formatted_time time={@time} />
    """
  end

  defp trip_stop_time(%{time: {:status, status}} = assigns) do
    assigns = assigns |> assign(:status, status)

    ~H"""
    <span>{@status}</span>
    """
  end

  defp prediction_time_display(%{arrival_status: {:scheduled, time}} = assigns) do
    assigns = assigns |> assign(:time, time)

    ~H"""
    <Departures.formatted_time time={@time} />
    """
  end

  defp prediction_time_display(%{arrival_status: {:first_scheduled, time}} = assigns) do
    assigns = assigns |> assign(:time, time)

    ~H"""
    <strong>
      <Departures.formatted_time time={@time} />
    </strong>
    """
  end

  defp prediction_time_display(%{arrival_status: {status, time}} = assigns)
       when status in [:cancelled, :skipped] do
    assigns = assigns |> assign(:time, time)

    ~H"""
    <span class="line-through">
      <Departures.formatted_time time={@time} />
    </span>
    """
  end

  defp prediction_time_display(%{arrival_status: {:status, status}} = assigns) do
    assigns = assigns |> assign(:status, status)

    ~H"""
    <.realtime_display>
      {@status}
    </.realtime_display>
    """
  end

  defp prediction_time_display(%{arrival_status: {:time, time}} = assigns) do
    assigns = assigns |> assign(:time, time)

    ~H"""
    <.realtime_display>
      <Departures.formatted_time time={@time} />
    </.realtime_display>
    """
  end

  defp prediction_time_display(assigns),
    do: ~H"""
    <.realtime_display>
      {realtime_text(@arrival_status)}
    </.realtime_display>
    """

  slot :inner_block

  defp realtime_display(assigns) do
    ~H"""
    <span class="font-bold text-nowrap">
      <.icon
        type="icon-svg"
        name="icon-realtime-tracking"
        class="size-3"
      />
      {render_slot(@inner_block)}
    </span>
    """
  end

  defp realtime_text({:arrival_minutes, minutes}),
    do: minutes_to_localized_minutes(minutes)

  defp realtime_text({:departure_minutes, minutes}),
    do: minutes_to_localized_minutes(minutes)

  defp realtime_text(:arriving), do: ~t"Arriving"
  defp realtime_text(:boarding), do: ~t"Boarding"
  defp realtime_text(:now), do: ~t"Now"

  defp prediction_substatus_display(%{arrival_substatus: nil} = assigns), do: ~H""

  defp prediction_substatus_display(%{arrival_substatus: {:delayed_from, time}} = assigns) do
    assigns =
      assigns
      |> assign(:time, time)
      |> assign(:readout_time, time |> format!(:hour_12_minutes))

    ~H"""
    <span class="text-xs line-through" aria-label={"Delayed from #{@readout_time}"}>
      <Departures.formatted_time time={@time} />
    </span>
    """
  end

  defp prediction_substatus_display(%{arrival_substatus: {:early_from, time}} = assigns) do
    assigns =
      assigns
      |> assign(:time, time)
      |> assign(:readout_time, time |> format!(:hour_12_minutes))

    ~H"""
    <span class="text-xs line-through" aria-label={"Early; Originally scheduled at #{@readout_time}"}>
      <Departures.formatted_time time={@time} />
    </span>
    """
  end

  defp prediction_substatus_display(%{arrival_substatus: {:status, status}} = assigns) do
    assigns = assigns |> assign(:status, status)

    ~H"""
    <span class="text-xs">{@status}</span>
    """
  end

  defp prediction_substatus_display(%{arrival_substatus: :scheduled_sr_only} = assigns) do
    ~H"""
    <span class="sr-only">{~t"Scheduled"}</span>
    """
  end

  defp prediction_substatus_display(assigns) do
    ~H"""
    <div class="flex shrink-0 gap-1 items-center">
      <.substatus_icon arrival_substatus={@arrival_substatus} />
      <span class="text-xs">{substatus_text(@arrival_substatus)}</span>
    </div>
    """
  end

  defp substatus_text(:on_time), do: ~t"On Time"
  defp substatus_text(:scheduled), do: ~t"Scheduled"
  defp substatus_text(:cancelled), do: ~t"Cancelled"
  defp substatus_text(:skipped), do: ~t"Stop Skipped"
  defp substatus_text(text), do: text

  defp substatus_icon(%{arrival_substatus: substatus} = assigns)
       when substatus in [:cancelled, :skipped],
       do: ~H"""
       <.icon aria-hidden type="icon-svg" name="icon-cancelled-default" class="size-3" />
       """

  defp substatus_icon(assigns), do: ~H""

  defp show_last_service?(%{
         remaining_departures: remaining_departures,
         last_trip_time: last_trip_time
       })
       when remaining_departures != [] do
    last_departure = remaining_departures |> Enum.at(-1)

    has_last_trip? =
      !is_nil(
        remaining_departures
        |> Enum.find(nil, fn departure -> departure |> Map.get(:last_trip?, nil) end)
      )

    last_departure_time = last_departure.time

    if is_nil(last_departure_time) do
      true
    else
      if (not is_nil(last_trip_time) and DateTime.after?(last_departure_time, last_trip_time)) or
           DateTime.before?(last_trip_time, @date_time.now()) or
           has_last_trip? do
        false
      else
        true
      end
    end
  end

  defp show_last_service?(_) do
    true
  end

  defp remaining_service(%{route_type: route_type} = assigns) when route_type in [0, 1] do
    if show_last_service?(assigns) do
      ~H"""
      <.attached_callout :if={@last_trip_time}>
        {gettext("Scheduled service continues until %{end_of_service}",
          end_of_service: format!(@last_trip_time, :hour_12_minutes)
        )}
      </.attached_callout>
      """
    else
      ~H""
    end
  end

  defp remaining_service(%{remaining_departures: []} = assigns), do: ~H""

  defp remaining_service(assigns) do
    assigns =
      assigns
      |> assign(:remaining_departures_count, Enum.count(assigns.remaining_departures))

    ~H"""
    <details class="group/remaining-service">
      <summary class="cursor-pointer group/remaining-service-summary">
        <.attached_callout>
          <span>
            {ngettext(
              "1 trip later today",
              "%{count} trips later today",
              @remaining_departures_count,
              count: @remaining_departures_count
            )}
          </span>
          <span class="ml-auto text-brand-primary group-hover/remaining-service-summary:underline group-open/remaining-service:hidden">
            {~t"Show"}
          </span>
          <span class="ml-auto text-brand-primary group-hover/remaining-service-summary:underline hidden group-open/remaining-service:block">
            {~t"Hide"}
          </span>
        </.attached_callout>
      </summary>
      <.upcoming_departures_table
        loaded_upcoming_trips={@loaded_upcoming_trips}
        stop_id={@stop_id}
        upcoming_departures={@remaining_departures}
      />
    </details>
    """
  end

  slot :inner_block

  defp attached_callout(assigns) do
    ~H"""
    <div class="flex justify-center bg-gray-lightest w-full px-2 py-3 font-medium text-sm text-center leading-tight">
      {render_slot(@inner_block)}
    </div>
    """
  end
end
