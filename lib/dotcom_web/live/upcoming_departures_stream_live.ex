defmodule DotcomWeb.UpcomingDeparturesStreamLive do
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

  alias Dotcom.Playground.UpcomingDeparturesManager
  alias Phoenix.LiveView

  @impl LiveView
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:routes, Routes.Repo.all())
     |> assign(:subscribed?, false)}
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
     |> subscribe_or_unsubscribe_to_upcoming_departures()}
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

        <.stop_picker_or stop={@stop} stops={@stops}>
          <.stop_banner stop={@stop} />

          <div class="container mt-4">
            Much like your departures, this page is upcoming!
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

  @impl LiveView
  def handle_event("clear-route", _params, socket) do
    {:noreply, socket |> push_patch(to: ~p"/preview/upcoming-departures-stream")}
  end

  def handle_event("clear-direction", _params, socket) do
    route_id = socket.assigns.route_id

    params = %{route_id: route_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/upcoming-departures-stream?#{params}")}
  end

  def handle_event("clear-stop", _params, socket) do
    route_id = socket.assigns.route_id
    direction_id = socket.assigns.direction_id

    params = %{route_id: route_id, direction_id: direction_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/upcoming-departures-stream?#{params}")}
  end

  def handle_event("select-direction", %{"direction-id" => direction_id}, socket) do
    route_id = socket.assigns.route_id

    params = %{route_id: route_id, direction_id: direction_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/upcoming-departures-stream?#{params}")}
  end

  def handle_event("select-route", %{"route-id" => route_id}, socket) do
    params = %{route_id: route_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/upcoming-departures-stream?#{params}")}
  end

  def handle_event("select-stop", %{"stop-id" => stop_id}, socket) do
    route_id = socket.assigns.route_id
    direction_id = socket.assigns.direction_id

    params = %{route_id: route_id, direction_id: direction_id, stop_id: stop_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/upcoming-departures-stream?#{params}")}
  end

  @impl LiveView
  def terminate(_reason, socket) do
    unsubscribe_from_upcoming_departures(socket)
    :ok
  end

  defp subscribe_or_unsubscribe_to_upcoming_departures(
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
      subscribe_to_upcoming_departures(socket)
    else
      socket
    end
  end

  defp subscribe_or_unsubscribe_to_upcoming_departures(socket) do
    unsubscribe_from_upcoming_departures(socket)
  end

  defp subscribe_to_upcoming_departures(socket) do
    direction_id = socket.assigns.direction_id
    route_id = socket.assigns.route_id
    stop_id = socket.assigns.stop_id

    params = %{route: route_id, direction_id: direction_id, stop: stop_id}

    UpcomingDeparturesManager.subscribe(params)

    socket |> assign(:subscribed?, true)
  end

  defp unsubscribe_from_upcoming_departures(socket) do
    UpcomingDeparturesManager.unsubscribe()

    socket |> assign(:subscribed?, false)
  end
end
