defmodule DotcomWeb.ScheduleFinderLive do
  @moduledoc """
  The primary view for looking up schedules, predictions, and relevant alerts
  for a given route/direction/stop.
  """

  use DotcomWeb, :live_view

  import CSSHelpers

  alias DotcomWeb.Components.Prototype
  alias MbtaMetro.Components.SystemIcons
  alias Phoenix.LiveView
  alias Predictions.Prediction
  alias Routes.Route
  alias Stops.Stop
  alias Vehicles.Vehicle

  @date_time Application.compile_env!(:dotcom, :date_time_module)
  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @vehicles_repo Application.compile_env!(:dotcom, :repo_modules)[:vehicles]

  defmodule UpcomingDepartureRow do
    defstruct [
      :vehicle_status,
      :predicted_time,
      :seconds_until_arrival,
      :trip_id,
      :headsign,
      :vehicle_stop_id,
      :prediction_stop_id,
      :vehicle,
      :prediction
    ]
  end

  @impl LiveView
  def mount(_params, _session, socket) do
    schedule_refresh()

    {:ok,
     socket
     |> assign_new(:route, fn -> nil end)
     |> assign_new(:direction_id, fn -> nil end)
     |> assign_new(:stop, fn -> nil end)
     |> assign_new(:predictions, fn -> [] end)
     |> assign_new(:vehicles, fn -> [] end)
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

    <.upcoming_departures_table predictions={@predictions} now={@now} vehicles={@vehicles} />
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
     |> assign_predictions()}
  end

  @impl Phoenix.LiveView
  def handle_info(:refresh, socket) do
    schedule_refresh()

    {:noreply,
     socket
     |> assign(:now, @date_time.now())
     |> assign_predictions()}
  end

  defp schedule_refresh() do
    # Refresh every second
    Process.send_after(self(), :refresh, 1000)
  end

  defp assign_stop(socket, params) do
    stop_id = Map.get(params, "stop")
    assign(socket, :stop, if(stop_id, do: @stops_repo.get(stop_id)))
  end

  defp assign_predictions(%{assigns: %{stop: %Stop{id: stop_id}}} = socket) do
    prediction_opts = [
      route: socket.assigns.route.id,
      direction_id: socket.assigns.direction_id
    ]

    # predictions = @predictions_repo.all(prediction_opts)

    predictions = @predictions_repo.all(prediction_opts) |> Enum.filter(&(&1.stop.id == stop_id))

    vehicles =
      @vehicles_repo.route(socket.assigns.route.id, direction_id: socket.assigns.direction_id)

    socket |> assign(:predictions, predictions) |> assign(:vehicles, vehicles)
  end

  defp assign_predictions(socket) do
    socket |> assign(:predictions, []) |> assign(:vehicles, [])
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

  attr :predictions, :any
  attr :now, DateTime
  attr :vehicles, :any

  defp upcoming_departures_table(assigns) do
    now = assigns.now

    rows =
      assigns.predictions
      |> Enum.map(fn prediction ->
        vehicle = prediction |> vehicle()
        predicted_time = prediction.arrival_time

        %UpcomingDepartureRow{
          # vehicle: vehicle,
          # prediction: prediction,
          trip_id: prediction.trip.id,
          headsign: prediction.trip.headsign,
          predicted_time: predicted_time,
          seconds_until_arrival: DateTime.diff(predicted_time, now, :second),
          vehicle_status: vehicle |> vehicle_status(),
          vehicle_stop_id: vehicle |> vehicle_stop_id(),
          prediction_stop_id: prediction.platform_stop_id
        }
      end)

    assigns = assigns |> assign(:rows, rows)

    ~H"""
    <.unstyled_accordion :for={row <- @rows} summary_class="flex items-center">
      <:heading>
        <div class="w-full">
          {row.headsign} - {arrival_time_display(row)} - {row.trip_id}
        </div>
      </:heading>
      <:content>
        <pre>{inspect row, pretty: true}</pre>
      </:content>
    </.unstyled_accordion>

    <h1>Vehicles</h1>

    <.unstyled_accordion :for={vehicle <- @vehicles} summary_class="flex items-center">
      <:heading>
        <div class="w-full">
          Vehicle {vehicle.id} running trip {vehicle.trip_id}
        </div>
      </:heading>
      <:content>
        <pre>{inspect vehicle, pretty: true}</pre>
      </:content>
    </.unstyled_accordion>
    """
  end

  # defp arrival_time_display(%Prediction{} = prediction, now) do
  #   case DateTime.diff(prediction.arrival_time, now, :second) do
  #     sec when sec > 60 -> "#{div(sec, 60)} min"
  #     sec when sec > 30 -> "Approaching"
  #     sec when sec > 0 -> "Arriving"
  #   end
  # end

  defp arrival_time_display(%UpcomingDepartureRow{seconds_until_arrival: seconds_until_arrival})
       when seconds_until_arrival > 60,
       do: "#{div(seconds_until_arrival, 60)} min"

  defp arrival_time_display(%UpcomingDepartureRow{seconds_until_arrival: seconds_until_arrival})
       when seconds_until_arrival > 30,
       do: "Approaching"

  defp arrival_time_display(%UpcomingDepartureRow{seconds_until_arrival: seconds_until_arrival})
       when seconds_until_arrival > 0,
       do: "Arriving"

  defp vehicle_status(%Vehicle{status: status}), do: status
  defp vehicle_status(_), do: "?"

  defp vehicle_stop_id(%Vehicle{stop_id: stop_id}), do: stop_id
  defp vehicle_stop_id(_), do: "?"

  defp vehicle(%Prediction{trip: %{id: trip_id}}) do
    @vehicles_repo.trip(trip_id)
  end
end
