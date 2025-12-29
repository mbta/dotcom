defmodule DotcomWeb.UpcomingDeparturesLive do
  @moduledoc """
  A component showing upcoming departures for a route/direction/stop, updated at
  an interval.
  """
  use DotcomWeb, :live_component

  import Dotcom.ScheduleFinder.UpcomingDepartures
  import Dotcom.Utils.Diff, only: [seconds_to_localized_minutes: 1]
  import Dotcom.Utils.Time, only: [format!: 2]
  import DotcomWeb.RouteComponents, only: [lined_list: 1, lined_list_item: 1]

  alias DotcomWeb.RouteComponents
  alias Routes.Route

  @date_time Application.compile_env!(:dotcom, :date_time_module)
  @update_interval_ms 1000

  @impl Phoenix.LiveComponent
  def mount(socket) do
    {:ok,
     socket
     |> assign_new(:now_time, fn -> @date_time.now() end)
     |> assign_upcoming_departures()}
  end

  @impl Phoenix.LiveComponent
  def update(assigns, socket) do
    if connected?(socket) do
      # Triggers this very update/2 with a new now_time value!
      send_update_after(
        socket.assigns.myself,
        [id: socket.assigns.myself, now_time: @date_time.now()],
        @update_interval_ms
      )
    end

    {:ok, assign(socket, assigns) |> assign_upcoming_departures()}
  end

  @impl Phoenix.LiveComponent
  def render(assigns) do
    ~H"""
    <section>
      <%= if @now_time do %>
        <em>{gettext("Last updated at %{time}", time: updated_timestamp(@now_time))}</em>
        <.upcoming_departures_table
          now={@now_time}
          stop_id={@stop_id}
          upcoming_departures={@upcoming_departures |> Enum.take(5)}
          vehicle_name={@vehicle_name}
        />
        <.remaining_service
          route_type={@route.type}
          end_of_service="Subway end of service"
        />
      <% else %>
        {~t"Loading upcoming departures"}...
      <% end %>
    </section>
    """
  end

  defp updated_timestamp(datetime) do
    datetime
    |> Cldr.DateTime.to_string!(Dotcom.Cldr, format: "MMMM d, h:mm:ss a")
  end

  defp assign_upcoming_departures(
         %{
           assigns: %{
             direction_id: direction_id,
             route: route,
             stop_id: stop_id,
             now_time: now_time
           }
         } = socket
       ) do
    socket
    |> assign(
      :upcoming_departures,
      upcoming_departures(%{
        direction_id: direction_id,
        now: now_time,
        route: route,
        stop_id: stop_id
      })
    )
  end

  defp assign_upcoming_departures(socket) do
    assign(socket, :upcoming_departures, [])
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
    <.lined_list_item :if={@other_stop} route={@route} class={@class}>
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

  # defp end_of_service([]), do: nil

  # defp end_of_service(departures) do
  #   departures
  #   |> List.last()
  #   |> Kernel.then(& &1.time)
  #   |> format!(:hour_12_minutes)
  # end
end
