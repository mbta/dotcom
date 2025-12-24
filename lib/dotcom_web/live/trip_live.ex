defmodule DotcomWeb.TripLive do
  @moduledoc """
  A LiveView for following a specific trip
  """

  use DotcomWeb, :live_view

  import CSSHelpers
  import Dotcom.Utils.Time, only: [format!: 2]
  import DotcomWeb.RouteComponents, only: [lined_list: 1, lined_list_item: 1]
  import DotcomWeb.ScheduleFinderLive, only: [route_banner: 1]

  alias Dotcom.Utils.ServiceDateTime
  alias Phoenix.LiveView

  @impl LiveView
  def mount(%{"trip_id" => trip_id}, _session, socket) do
    {:ok,
     socket
     |> assign_result(&Dotcom.Utils.DateTime.now/0)
     |> assign(:trip_id, trip_id)
     |> assign_trip_data()}
  end

  @impl LiveView
  def render(assigns) do
    schedule_refresh()

    ~H"""
    <.route_banner route={@route} direction_id={@direction_id} />

    <.trip_details trip_info={@trip_info} route={@route} />

    <.unstyled_accordion
      class="mt-5"
      summary_class="flex items-center border-gray-lightest border-xs px-2 py-3"
    >
      <:heading>
        <div class="w-full">More Details</div>
      </:heading>
      <:content>
        <div class="px-2 py-3 border-gray-lightest border-xs border-t-0">
          <div class="grid grid-cols-3 gap-2 items-center">
            <div class="font-bold">Stop</div>
            <div class="font-bold">Prediction</div>
            <div class="font-bold">Schedule</div>

            <.predicted_schedule :for={ps <- @predicted_schedules} predicted_schedule={ps} />
          </div>

          <pre>{inspect @vehicle, pretty: true}</pre>
          <pre>{inspect @trip, pretty: true}</pre>
          <pre>{inspect @route_pattern, pretty: true}</pre>
          <pre>{inspect @route, pretty: true}</pre>
          <pre>{inspect @predicted_schedules, pretty: true}</pre>
        </div>
      </:content>
    </.unstyled_accordion>
    """
  end

  defp trip_details(%{trip_info: :trip_has_ended} = assigns) do
    ~H"""
    <div class="w-full bg-gray-lightest flex items-center justify-center py-3">
      <span>This trip has ended</span>
    </div>
    """
  end

  defp trip_details(%{trip_info: {:trip, %{stops: stops, vehicle_info: vehicle_info}}} = assigns) do
    assigns =
      assigns
      |> assign(:stops, stops)
      |> assign(:vehicle_info, vehicle_info)

    ~H"""
    <.special_vehicle_label vehicle_info={@vehicle_info} route={@route} />
    <div class="border-gray-lightest border-xs border-t-0">
      <.lined_list>
        <.vehicle_row route={@route} vehicle_info={@vehicle_info} />

        <.lined_list_item :for={%{stop_name: stop_name, time: time} <- @stops} route={@route}>
          <div class="grow">{stop_name}</div>
          <div class="ml-auto">{time_to_string(time)}</div>
        </.lined_list_item>
      </.lined_list>
    </div>
    """
  end

  defp special_vehicle_label(%{vehicle_info: %{decoration: :holiday}} = assigns) do
    ~H"""
    <div class={["pb-3 flex gap-2 w-full items-center", route_to_class(@route)]}>
      <.icon type="solid" name="tree" class={"size-5 #{fill_class(@route)} ml-auto"} />
      <.icon type="solid" name="candy-cane" class={"size-5 #{fill_class(@route)}"} />
      <span class="font-bold">Holiday Train</span>
      <.icon type="solid" name="sleigh" class={"size-5 #{fill_class(@route)}"} />
      <.icon type="solid" name="snowflake" class={"size-5 #{fill_class(@route)} mr-auto"} />
    </div>
    """
  end

  defp special_vehicle_label(assigns) do
    dbg(assigns)

    ~H"""
    """
  end

  defp fill_class(route) do
    route
    |> route_to_class()
    |> case do
      "mbta-route-bus" -> "fill-black"
      _ -> "fill-white"
    end
  end

  defp vehicle_row(%{vehicle_info: nil} = assigns), do: ~H""

  defp vehicle_row(assigns) do
    ~H"""
    <.lined_list_item route={@route} variant="mode">
      <div class="grow">{vehicle_message(@vehicle_info)}</div>
    </.lined_list_item>
    """
  end

  defp vehicle_message(%{status: :in_transit, stop_name: stop_name}),
    do: "Next Stop: #{stop_name}"

  defp vehicle_message(%{status: :incoming, stop_name: stop_name}),
    do: "Approaching #{stop_name}"

  defp vehicle_message(%{status: :stopped, stop_name: stop_name}),
    do: "Now at #{stop_name}"

  defp vehicle_message(%{status: status, stop_name: stop_name}),
    do: "'#{status}' at #{stop_name}"

  defp predicted_schedule(assigns) do
    ~H"""
    <div>{PredictedSchedule.stop(@predicted_schedule).name}</div>
    <div><.time_info obj={@predicted_schedule.prediction} /></div>
    <div><.time_info obj={@predicted_schedule.schedule} /></div>
    """
  end

  defp time_info(%{obj: nil} = assigns), do: ~H""

  defp time_info(assigns) do
    ~H"""
    <div>
      <div>Arrival: {time_to_string(@obj.arrival_time)}</div>
      <div>Departure: {time_to_string(@obj.departure_time)}</div>
    </div>
    """
  end

  defp time_to_string(nil), do: ""
  defp time_to_string(time), do: format!(time, :hour_12_minutes)

  defp assign_trip_data(socket) do
    trip_id = socket.assigns.trip_id
    trip = Schedules.Repo.trip(trip_id)
    route_pattern = RoutePatterns.Repo.get(trip.route_pattern_id)
    route = Routes.Repo.get(route_pattern.route_id)

    now = socket.assigns.now

    direction_id = trip.direction_id

    predictions =
      [
        route: route.id,
        direction_id: direction_id,
        include_terminals: true
      ]
      |> Predictions.Repo.all()

    schedules =
      Schedules.Repo.by_route_ids([route.id],
        direction_id: direction_id,
        date: now |> ServiceDateTime.service_date()
      )

    predicted_schedules =
      PredictedSchedule.group(predictions, schedules)
      |> Enum.filter(&(PredictedSchedule.trip(&1).id == trip.id))

    predicted_schedules =
      predicted_schedules
      |> Enum.split_while(&(&1.schedule != nil && &1.prediction == nil))
      |> case do
        {[], list} -> list
        {list, []} -> list
        {_past, list} -> list
      end

    vehicle = Vehicles.Repo.trip(trip_id)

    trip_info = trip_info(%{predicted_schedules: predicted_schedules, now: now, vehicle: vehicle})

    socket
    |> assign(:trip, trip)
    |> assign(:direction_id, direction_id)
    |> assign(:route_pattern, route_pattern)
    |> assign(:route, route)
    |> assign(:predicted_schedules, predicted_schedules)
    |> assign(:vehicle, vehicle)
    |> assign(:trip_info, trip_info)
  end

  defp trip_info(%{predicted_schedules: []}), do: :trip_has_ended

  defp trip_info(%{predicted_schedules: predicted_schedules, now: now, vehicle: vehicle}) do
    last_stop = predicted_schedules |> List.last()

    if !PredictedSchedule.has_prediction?(last_stop) && last_stop.schedule |> has_ended?(now) do
      :trip_has_ended
    else
      vehicle_info = vehicle_info(vehicle)

      stops =
        predicted_schedules
        |> Enum.map(fn ps ->
          time =
            ps
            |> prediction_or_schedule()
            |> case do
              %{arrival_time: time} when time != nil -> time
              %{departure_time: time} -> time
            end

          stop = PredictedSchedule.stop(ps)

          %{
            stop_name: stop.name,
            stop_id: stop.id,
            time: time
          }
        end)
        |> Enum.reject(&(&1.time == nil))
        |> drop_prediction_for_current_station(vehicle_info)

      {:trip,
       %{
         stops: stops,
         vehicle_info: vehicle_info
       }}
    end
  end

  defp drop_prediction_for_current_station(stops, %{status: :stopped, stop_id: stop_id}) do
    case stops do
      [%{stop_id: ^stop_id} | remaining_stops] -> remaining_stops
      _ -> stops
    end
  end

  defp drop_prediction_for_current_station(stops, _), do: stops

  defp vehicle_info(nil), do: nil

  defp vehicle_info(vehicle) do
    stop = vehicle.stop_id |> Stops.Repo.get()
    status = vehicle.status

    %{
      decoration: vehicle_decoration(vehicle.id),
      status: status,
      stop_id: stop.parent_id || stop.id,
      stop_name: stop.name
    }
  end

  def vehicle_decoration("O-54870955"), do: :holiday
  def vehicle_decoration("G-10086"), do: :holiday
  def vehicle_decoration(_), do: nil

  defp has_ended?(%{departure_time: departure_time}, now) when departure_time != nil,
    do: DateTime.before?(departure_time, now)

  defp has_ended?(%{arrival_time: arrival_time}, now) when arrival_time != nil,
    do: DateTime.before?(arrival_time, now)

  defp prediction_or_schedule(%PredictedSchedule{prediction: prediction}) when prediction != nil,
    do: prediction

  defp prediction_or_schedule(%PredictedSchedule{schedule: schedule}), do: schedule

  @impl LiveView
  def handle_info(:refresh, socket) do
    schedule_refresh()

    {:noreply,
     socket
     |> assign_result(&Dotcom.Utils.DateTime.now/0)
     |> assign_trip_data()}
  end

  defp schedule_refresh() do
    # Refresh every second
    Process.send_after(self(), :refresh, 1000)
  end
end
