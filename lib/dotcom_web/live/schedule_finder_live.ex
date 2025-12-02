defmodule DotcomWeb.ScheduleFinderLive do
  @moduledoc """
  The primary view for looking up schedules, predictions, and relevant alerts
  for a given route/direction/stop.
  """

  alias Dotcom.ScheduleFinder.UpcomingDepartures
  use DotcomWeb, :live_view

  import CSSHelpers

  alias Dotcom.ScheduleFinder.UpcomingDepartures.UpcomingDeparture
  alias DotcomWeb.Components.Prototype
  alias DotcomWeb.RouteComponents
  alias MbtaMetro.Components.SystemIcons
  alias Phoenix.LiveView
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
     |> assign_new(:now, fn -> @date_time.now() end)}
  end

  @impl LiveView
  def render(assigns) do
    ~H"""
    <Prototype.route_stop_picker
      selected_route={@route}
      selected_direction_id={@direction_id}
    />
    <.route_banner route={@route} direction_id={@direction_id} />
    <.stop_banner stop={@stop} />

    <.upcoming_departures_table
      :if={@stop}
      now={@now}
      route={@route}
      stop_id={@stop.id}
      upcoming_departures={@upcoming_departures}
    />
    """
  end

  @impl Phoenix.LiveView
  def handle_params(%{"direction_id" => direction, "route_id" => route} = params, _uri, socket) do
    {direction_id, _} = Integer.parse(direction)

    {:noreply,
     socket
     |> assign(:route, @routes_repo.get(route))
     |> assign(:direction_id, direction_id)
     |> assign_stop(params)
     |> assign_upcoming_departures()}
  end

  @impl Phoenix.LiveView
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
    <h1>Upcoming Departures</h1>
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
          <details class="group/details">
            <summary class="cursor-pointer flex gap-2 items-center px-2 border-xs border-charcoal-80 border-b-0">
              <div class="relative self-stretch w-6 shrink-0">
                <div class={"#{route_to_class(@route)} absolute -top-[0.0625rem] left-1/2 -translate-x-1/2 w-1 z-10 h-3/4"} />
                <div class={"#{route_to_class(@route)} absolute -bottom-[0.0625rem] left-1/2 -translate-x-1/2 w-1 z-10 h-3/4"} />
              </div>
              <div class="py-2">
                {Enum.count(upcoming_departure.trip_details.stops_before)} Stops Away
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
        {Timex.format!(@other_stop.time, "{h12}:{m} {AM}")}
      </div>
    </div>
    """
  end

  defp arrival_time_display(%UpcomingDeparture{arrival_status: {:arrival_minutes, minutes}}),
    do: "#{minutes} min"

  defp arrival_time_display(%UpcomingDeparture{arrival_status: {:departure_minutes, minutes}}),
    do: "#{minutes} min"

  defp arrival_time_display(%UpcomingDeparture{arrival_status: :approaching}), do: "Approaching"
  defp arrival_time_display(%UpcomingDeparture{arrival_status: :arriving}), do: "Arriving"
  defp arrival_time_display(%UpcomingDeparture{arrival_status: :boarding}), do: "Boarding"

  defp arrival_time_display(%UpcomingDeparture{arrival_status: {:past_due, seconds}}),
    do: "#{-seconds} Seconds Past Due"

  defp trip_details_header_text(%UpcomingDeparture{arrival_status: {:arrival_minutes, minutes}}),
    do: "Arriving in #{minutes} min"

  defp trip_details_header_text(%UpcomingDeparture{arrival_status: {:departure_minutes, minutes}}),
    do: "Departing in #{minutes} min"

  defp trip_details_header_text(upcoming_departure),
    do: "Now #{arrival_time_display(upcoming_departure)}"
end
