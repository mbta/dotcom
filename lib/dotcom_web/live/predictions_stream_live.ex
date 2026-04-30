defmodule DotcomWeb.PredictionsStreamLive do
  @moduledoc """
  A page that shows stuff about predictions streaming
  """

  use DotcomWeb, :live_view

  import DotcomWeb.PlaygroundComponents,
    only: [
      direction_banner: 1,
      direction_picker_or: 1,
      route_banner: 1,
      route_picker_or: 1,
      stop_banner: 1,
      stop_picker_or: 1
    ]

  alias Dotcom.Playground.PredictionsManager
  alias Phoenix.LiveView

  @impl LiveView
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:routes, Routes.Repo.all())
     |> assign(:subscribed?, false)
     |> assign(:predictions_list_by_snapshot, [])
     |> assign(:predictions_map_by_events, %{})
     |> assign(:predictions_list_by_events, [])
     |> assign(:prediction_events, [])}
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
    <.route_picker_or route={@route} routes={@routes}>
      <.route_banner route={@route} />

      <.direction_picker_or route={@route} direction_id={@direction_id}>
        <.direction_banner route={@route} direction_id={@direction_id} />

        <.stop_picker_or
          stop={@stop}
          stops={@stops}
        >
          <.stop_banner stop={@stop} />

          <div class="container">
            <div class="grid grid-cols-3 gap-4 w-full">
              <div>
                <h3>Predictions by Snapshot</h3>
                <div class="h-[40rem] overflow-scroll">
                  <.predictions_panel predictions={@predictions_list_by_snapshot} />
                </div>
              </div>

              <div>
                <h3>Predictions by Events</h3>
                <div class="h-[40rem] overflow-scroll">
                  <.predictions_panel predictions={@predictions_list_by_events} />
                </div>
              </div>

              <div>
                <h3>Events</h3>
                <div class="h-[40rem] overflow-scroll">
                  <.events_panel prediction_events={@prediction_events} />
                </div>
              </div>
            </div>
          </div>
        </.stop_picker_or>
      </.direction_picker_or>
    </.route_picker_or>

    <div class="container mt-4">
      <div class="flex gap-2">
        <span>Connection Status</span>
        <.icon :if={@subscribed?} name="check" class="size-5" />
        <.icon :if={!@subscribed?} name="xmark" class="size-5" />
      </div>
    </div>
    """
  end

  defp predictions_panel(assigns) do
    ~H"""
    <div class="flex flex-col w-full border-x-xs border-b-xs border-gray-lightest">
      <div
        :for={prediction <- @predictions}
        class="p-2 border-t-xs border-gray-lightest"
      >
        <div class="flex flex-col">
          <span class="font-bold">{prediction.trip.id}</span>

          <span>{format(prediction.arrival_time)} / {format(prediction.departure_time)}</span>

          <span :if={prediction.schedule_relationship}>{prediction.schedule_relationship}</span>
        </div>
        <details>
          <summary>Raw</summary>
          <pre>{inspect prediction, pretty: true, limit: :infinity}</pre>
        </details>
      </div>
    </div>
    """
  end

  defp events_panel(assigns) do
    ~H"""
    <div class="flex flex-col w-full border-x-xs border-b-xs border-gray-lightest">
      <div :for={event <- @prediction_events} class="p-2 border-t-xs border-gray-lightest">
        <div class="group">
          <div :for={{event_type, item} <- event} class="flex gap-2">
            <span class="font-bold">{event_type}</span>
            <span :if={event_type != "reset"}>{item.trip.id}</span>
          </div>
        </div>
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
  def handle_info({:predictions_update, %{events: events, predictions: predictions}}, socket) do
    prediction_events = socket.assigns.prediction_events

    {:noreply,
     socket
     |> assign(:prediction_events, [events | prediction_events])
     |> assign(
       :predictions_list_by_snapshot,
       predictions |> Enum.sort_by(&(&1.arrival_time || &1.departure_time))
     )
     |> apply_prediction_events(events)}
  end

  @impl LiveView
  def terminate(_reason, socket) do
    unsubscribe_from_predictions(socket)
    :ok
  end

  defp apply_prediction_events(socket, events) do
    new_predictions =
      events |> Enum.reduce(socket.assigns.predictions_map_by_events, &apply_prediction_event/2)

    socket
    |> assign(:predictions_map_by_events, new_predictions)
    |> assign(
      :predictions_list_by_events,
      new_predictions |> Map.values() |> Enum.sort_by(&(&1.arrival_time || &1.departure_time))
    )
  end

  defp apply_prediction_event({"reset", predictions}, _predictions_map) do
    predictions
    |> Enum.group_by(&{&1.trip.id, &1.stop_sequence})
    |> Map.new(fn {key, [value | _]} -> {key, value} end)
  end

  defp apply_prediction_event({event_type, prediction}, predictions_map)
       when event_type in ["add", "update"] do
    predictions_map
    |> Map.put({prediction.trip.id, prediction.stop_sequence}, prediction)
  end

  defp apply_prediction_event({"remove", prediction}, predictions_map) do
    predictions_map |> Map.delete({prediction.trip.id, prediction.stop_sequence})
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

  defp subscribe_to_predictions(socket) do
    direction_id = socket.assigns.direction_id
    route_id = socket.assigns.route_id
    stop_id = socket.assigns.stop_id

    params = %{route: route_id, direction_id: direction_id, stop: stop_id}

    PredictionsManager.subscribe(params)

    socket |> assign(:subscribed?, true)
  end

  defp unsubscribe_from_predictions(socket) do
    PredictionsManager.unsubscribe()

    socket
    |> assign(:subscribed?, false)
    |> assign(:predictions_list_by_snapshot, [])
    |> assign(:predictions_map_by_events, [])
    |> assign(:predictions_list_by_events, %{})
    |> assign(:prediction_events, [])
  end

  defp format(nil), do: ""

  defp format(datetime) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "h:mm:ss a")

    string
  end
end
