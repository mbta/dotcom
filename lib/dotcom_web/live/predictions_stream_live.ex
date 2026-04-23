defmodule DotcomWeb.PredictionsStreamLive do
  @moduledoc """
  A page that shows stuff about predictions streaming
  """

  use DotcomWeb, :live_view

  alias Dotcom.Playground.PredictionsConsumerStage
  alias Dotcom.Playground.UpcomingDeparturesPubsub
  alias Phoenix.LiveView
  alias ServerSentEventStage.Event

  @impl LiveView
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:routes, Routes.Repo.all())
     |> assign(:subscribed?, false)
     |> assign(:predictions, %{})
     |> assign(:predictions_list, [])}
  end

  @impl LiveView
  def handle_params(params, _uri, socket) do
    route_id = Map.get(params, "route_id")

    direction_id =
      params
      |> Map.get("direction_id")
      |> case do
        nil -> nil
        str when is_binary(str) -> String.to_integer(str)
      end

    stop_id = Map.get(params, "stop_id")

    {:noreply,
     socket
     |> assign_route(route_id)
     |> assign_direction(direction_id)
     |> assign_stop(stop_id)
     |> subscribe_or_unsubscribe_to_predictions()}
  end

  defp assign_route(socket, nil) do
    socket
    |> assign(:route_id, nil)
    |> assign(:route, nil)
  end

  defp assign_route(socket, route_id) do
    socket
    |> assign(:route_id, route_id)
    |> assign(:route, Routes.Repo.get(route_id))
  end

  defp assign_direction(socket, nil) do
    socket
    |> assign(:direction_id, nil)
    |> assign(:stops, nil)
  end

  defp assign_direction(socket, direction_id) do
    stops =
      Stops.Repo.by_route(socket.assigns.route_id, direction_id)

    socket
    |> assign(:direction_id, direction_id)
    |> assign(:stops, stops)
  end

  defp assign_stop(socket, nil) do
    socket
    |> assign(:stop_id, nil)
    |> assign(:stop, nil)
  end

  defp assign_stop(socket, stop_id) do
    socket
    |> assign(:stop_id, stop_id)
    |> assign(:stop, Stops.Repo.get(stop_id))
  end

  @impl LiveView
  def render(assigns) do
    ~H"""
    <.route_picker_or_route_page
      routes={@routes}
      route={@route}
      direction_id={@direction_id}
      predictions={@predictions}
      stop={@stop}
      stops={@stops}
    />
    <div class="container mt-4">
      <div class="flex gap-2">
        <span>Connection Status</span>
        <.icon :if={@subscribed?} name="check" class="size-5" />
        <.icon :if={!@subscribed?} name="xmark" class="size-5" />
      </div>
    </div>
    """
  end

  defp route_picker_or_route_page(%{route: route} = assigns) when route != nil do
    ~H"""
    <.route_page
      route={@route}
      direction_id={@direction_id}
      stop={@stop}
      stops={@stops}
      predictions={@predictions}
    />
    """
  end

  defp route_picker_or_route_page(assigns) do
    ~H"""
    <div class="container"><.route_picker routes={@routes} /></div>
    """
  end

  defp route_picker(assigns) do
    ~H"""
    <div class="flex gap-2 flex-wrap">
      <button
        :for={route <- @routes}
        class="p-2 rounded opacity-75 hover:opacity-100"
        style={"background-color: ##{route.color}; color: #{text_color(route)};"}
        phx-click="select-route"
        phx-value-route-id={route.id}
      >
        {route.name}
      </button>
    </div>
    """
  end

  defp route_page(assigns) do
    ~H"""
    <div
      class="w-full py-4"
      style={"background-color: ##{@route.color}; color: #{text_color(@route)}; fill: #{text_color(@route)};"}
    >
      <div class="container">
        <div class="flex items-center">
          <span class="text-2xl font-bold">{@route.name}</span>
          <div phx-click="clear-route" class="ml-auto cursor-pointer opacity-75 hover:opacity-100">
            <.icon class="size-5" name="circle-xmark" />
          </div>
        </div>
      </div>
    </div>
    <.direction_picker_or_route_direction_page
      route={@route}
      direction_id={@direction_id}
      stop={@stop}
      stops={@stops}
      predictions={@predictions}
    />
    """
  end

  defp direction_picker_or_route_direction_page(%{direction_id: direction_id} = assigns)
       when direction_id != nil do
    ~H"""
    <.route_direction_page
      route={@route}
      direction_id={@direction_id}
      stop={@stop}
      stops={@stops}
      predictions={@predictions}
    />
    """
  end

  defp direction_picker_or_route_direction_page(assigns) do
    ~H"""
    <div class="mt-4 container">
      <.direction_picker route={@route} />
    </div>
    """
  end

  defp direction_picker(assigns) do
    ~H"""
    <div class="w-full flex gap-2 justify-around">
      <button
        :for={
          direction_id <-
            @route.direction_names
            |> Stream.reject(fn {_, name} -> is_nil(name) end)
            |> Stream.map(fn {id, _} -> id end)
        }
        class="bg-gray-lightest opacity-75 hover:opacity-100 p-2 rounded"
        phx-click="select-direction"
        phx-value-direction-id={direction_id}
      >
        {direction_description(@route, direction_id)}
      </button>
    </div>
    """
  end

  defp route_direction_page(assigns) do
    ~H"""
    <div class="w-full py-4 bg-gray-lightest">
      <div class="container">
        <div class="flex items-center">
          <span class="text-lg font-bold">{direction_description(@route, @direction_id)}</span>
          <div phx-click="clear-direction" class="ml-auto cursor-pointer opacity-75 hover:opacity-100">
            <.icon class="size-5" name="circle-xmark" />
          </div>
        </div>
      </div>
    </div>
    <.stop_picker_or_route_direction_stop_page stop={@stop} stops={@stops} predictions={@predictions} />
    """
  end

  defp stop_picker_or_route_direction_stop_page(%{stop: stop} = assigns) when stop != nil do
    ~H"""
    <div class="w-full py-4 bg-charcoal-10 text-white">
      <div class="container">
        <div class="flex items-center">
          <div class="flex flex-col">
            <span class="text-lg font-bold">{@stop.name}</span>
            <span class="text-md">{@stop.id}</span>
          </div>
          <div
            phx-click="clear-stop"
            class="ml-auto fill-white cursor-pointer opacity-75 hover:opacity-100"
          >
            <.icon class="size-5" name="circle-xmark" />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="flex flex-col w-full">
        <div
          :for={prediction <- @predictions |> Map.values() |> Enum.sort_by(& &1.arrival_time)}
          class="p-2 border-t-xs border-gray-lightest"
        >
          <span>{prediction.arrival_time}</span>
          <details>
            <summary>Raw</summary>
            <pre>{inspect prediction, pretty: true}</pre>
          </details>
        </div>
      </div>
    </div>
    """
  end

  defp stop_picker_or_route_direction_stop_page(assigns) do
    ~H"""
    <.stop_picker stops={@stops} />
    """
  end

  defp stop_picker(assigns) do
    ~H"""
    <div class="container">
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          :for={stop <- @stops}
          class="bg-charcoal-10 p-2 rounded text-white opacity-75 hover:opacity-100"
          phx-click="select-stop"
          phx-value-stop-id={stop.id}
        >
          {stop.name}
        </button>
      </div>
    </div>
    """
  end

  @impl LiveView
  def handle_event("clear-route", _params, socket) do
    {:noreply, socket |> push_patch(to: ~p"/preview/predictions-stream")}
  end

  def handle_event("clear-direction", _params, socket) do
    route_id = socket.assigns.route_id

    params = %{route_id: route_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/predictions-stream?#{params}")}
  end

  def handle_event("clear-stop", _params, socket) do
    route_id = socket.assigns.route_id
    direction_id = socket.assigns.direction_id

    params = %{route_id: route_id, direction_id: direction_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/predictions-stream?#{params}")}
  end

  def handle_event("select-direction", %{"direction-id" => direction_id}, socket) do
    route_id = socket.assigns.route_id

    params = %{route_id: route_id, direction_id: direction_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/predictions-stream?#{params}")}
  end

  def handle_event("select-route", %{"route-id" => route_id}, socket) do
    params = %{route_id: route_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/predictions-stream?#{params}")}
  end

  def handle_event("select-stop", %{"stop-id" => stop_id}, socket) do
    route_id = socket.assigns.route_id
    direction_id = socket.assigns.direction_id

    params = %{route_id: route_id, direction_id: direction_id, stop_id: stop_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/predictions-stream?#{params}")}
  end

  @impl LiveView
  def handle_info({:prediction_events, events}, socket) do
    {:noreply, socket |> update_assigned_predictions(events)}
  end

  def update_assigned_predictions(socket, events) do
    new_predictions = Enum.reduce(events, socket.assigns.predictions, &handle_prediction_event/2)

    socket |> assign(:predictions, new_predictions)
  end

  def handle_prediction_event(%Event{event: event_type, data: data}, predictions) do
    data
    |> JSON.decode()
    |> case do
      {:ok, parsed_data} -> handle_prediction_event(event_type, parsed_data, predictions)
      _ -> predictions
    end
  end

  def handle_prediction_event("reset", data, _predictions) do
    data
    |> Stream.map(&to_prediction/1)
    |> Enum.group_by(& &1.id)
    |> Map.new(fn {id, [pred]} -> {id, pred} end)
  end

  def handle_prediction_event(event_type, data, predictions)
      when event_type in ["update", "add"] do
    prediction = to_prediction(data)
    predictions |> Map.put(prediction.id, prediction)
  end

  def handle_prediction_event("remove", data, predictions) do
    %{"id" => prediction_id, "type" => "prediction"} = data

    predictions |> Map.delete(prediction_id)
  end

  defp to_prediction(data) do
    %{
      "attributes" => %{
        "arrival_time" => arrival_time,
        "arrival_uncertainty" => _arrival_uncertainty,
        "departure_time" => _departure_time,
        "departure_uncertainty" => _departure_uncertainty,
        "direction_id" => _direction_id,
        "last_trip" => _last_trip,
        "revenue" => _revenue,
        "schedule_relationship" => _schedule_relationship,
        "status" => _status,
        "stop_sequence" => stop_sequence,
        "trip_headsign" => _trip_headsign,
        "update_type" => _update_type
      },
      "id" => id,
      "relationships" => %{
        "route" => %{"data" => %{"id" => _route_id, "type" => "route"}},
        "stop" => %{"data" => %{"id" => stop_id, "type" => "stop"}},
        "trip" => %{"data" => %{"id" => trip_id, "type" => "trip"}}
        # "vehicle" => %{"data" => %{"id" => _vehicle_id, "type" => "vehicle"}}
      },
      "type" => "prediction"
    } = data

    stop = Stops.Repo.get(stop_id)

    %{
      arrival_time: arrival_time,
      id: id,
      raw: data,
      stop_id: stop.id,
      stop_name: stop.name,
      stop_sequence: stop_sequence,
      trip_id: trip_id
    }
  end

  @impl LiveView
  def terminate(reason, socket) do
    unsubscribe_from_predictions(socket)
    :ok
  end

  defp direction_description(route, direction_id) do
    "#{route.direction_names[direction_id]} towards #{route.direction_destinations[direction_id]}"
  end

  defp text_color(route) do
    if(route.type == 3 and not String.contains?(route.name, "SL"), do: "black", else: "white")
  end

  defp subscribe_or_unsubscribe_to_predictions(
         %{
           assigns: %{
             direction_id: direction_id,
             route_id: route_id,
             stop_id: stop_id
           }
         } = socket
       )
       when direction_id != nil and route_id != nil and stop_id != nil do
    if connected?(socket) do
      subscribe_to_predictions(socket)
    else
      socket
    end
  end

  defp subscribe_or_unsubscribe_to_predictions(socket) do
    unsubscribe_from_predictions(socket)
  end

  defp subscribe_to_predictions(%{assigns: %{sses_pid: sses_pid}} = socket)
       when sses_pid != nil do
    socket
  end

  defp subscribe_to_predictions(socket) do
    direction_id = socket.assigns.direction_id
    route_id = socket.assigns.route_id
    stop_id = socket.assigns.stop_id

    params = %{route: route_id, direction_id: direction_id, stop: stop_id}
    pid = self()

    UpcomingDeparturesPubsub.subscribe(params)

    query = URI.encode_query(params)

    url = "#{base_url()}/predictions?#{query}"

    {:ok, sses_pid} = ServerSentEventStage.start_link(url: url, headers: headers())
    {:ok, consumer_stage_pid} = PredictionsConsumerStage.start_link(self())

    GenStage.sync_subscribe(consumer_stage_pid, to: sses_pid)

    socket
    |> assign(:subscribed?, true)
    |> assign(:sses_pid, sses_pid)
    |> assign(:consumer_stage_pid, consumer_stage_pid)
  end

  defp unsubscribe_from_predictions(
         %{assigns: %{sses_pid: sses_pid, consumer_stage_pid: consumer_stage_pid}} = socket
       )
       when sses_pid != nil do
    UpcomingDeparturesPubsub.unsubscribe()

    PredictionsConsumerStage.stop(consumer_stage_pid)
    GenStage.stop(sses_pid)

    socket
    |> assign(:subscribed?, false)
    |> assign(:sses_pid, nil)
    |> assign(:consumer_stage_pid, nil)
  end

  defp unsubscribe_from_predictions(socket) do
    socket
  end

  defp base_url() do
    Application.get_env(:dotcom, :mbta_api)[:base_url]
  end

  defp headers() do
    Application.get_env(:dotcom, :mbta_api)[:headers]
  end
end
