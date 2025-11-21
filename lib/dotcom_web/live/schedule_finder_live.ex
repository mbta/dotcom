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

  alias DotcomWeb.Components.Prototype
  alias DotcomWeb.RouteComponents
  alias MbtaMetro.Components.SystemIcons
  alias Phoenix.{LiveView, LiveView.AsyncResult}
  alias Routes.Route
  alias Stops.Stop

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @impl LiveView
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign_new(:route, fn -> nil end)
     |> assign_new(:direction_id, fn -> nil end)
     |> assign_new(:stop, fn -> nil end)
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
        <.first_last
          times={Enum.map(departures, & &1.time)}
          vehicle_name={@vehicle_name}
        />
        <.departures_table departures={departures} route={@route} />
      <% end %>
    </.async_result>
    """
  end

  @impl Phoenix.LiveView
  def handle_params(%{"direction_id" => direction, "route_id" => route} = params, _uri, socket) do
    {direction_id, _} = Integer.parse(direction)

    {:noreply,
     socket
     |> assign(:route, @routes_repo.get(route))
     |> assign(:direction_id, direction_id)
     |> assign(:date, Map.get(params, "date", today()))
     |> assign_stop(params)
     |> assign_departures()}
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
          case daily_departures(route_id, direction_id, stop.id, date) do
            {:ok, departures} -> {:ok, %{departures: departures}}
            error -> error
          end
        end,
        reset: true
      )
    else
      assign(socket, :departures, AsyncResult.ok([]))
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

  def departures_table(assigns) do
    ~H"""
    <div class="grid grid-cols-1 divide-y-[1px] divide-gray-lightest border-[1px] border-gray-lightest">
      <.unstyled_accordion
        :for={departure <- @departures}
        id={departure.schedule_id}
        summary_class="flex items-center gap-sm hover:bg-brand-primary-lightest p-sm"
      >
        <:heading>
          <div class="flex items-center gap-sm w-full">
            <RouteComponents.route_icon route={@route} />
            <div>
              {departure.headsign}
              <div :if={@route.type == 2 && departure.trip_name} class="text-sm">
                {~t(Train)} {departure.trip_name}
              </div>
            </div>
          </div>
          <.formatted_time time={departure.time} />
        </:heading>
        <:content></:content>
      </.unstyled_accordion>
    </div>
    """
  end
end
