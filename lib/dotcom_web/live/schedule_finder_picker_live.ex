defmodule DotcomWeb.ScheduleFinderPickerLive do
  @moduledoc """
  A page that allows us to easily navigate to the new Schedule Finder page
  """

  use DotcomWeb, :live_view

  import DotcomWeb.PreviewComponents,
    only: [
      direction_banner: 1,
      direction_picker_or: 1,
      route_banner: 1,
      route_picker_or: 1,
      stop_banner: 1,
      stop_picker_or: 1
    ]

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
     |> assign_stop(stop_id)}
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

          <div class="container flex items-center justify-content-center py-8 px-2">
            <.link
              navigate={
                ~p"/departures?route_id=#{@route_id}&direction_id=#{@direction_id}&stop_id=#{@stop_id}"
              }
              target="_blank"
              class="bg-gray-lightest text-black font-bold p-2 rounded"
            >
              See Departures Page
            </.link>
          </div>
        </.stop_picker_or>
      </.direction_picker_or>
    </.route_picker_or>
    """
  end

  @impl LiveView
  def handle_event("clear-route", _params, socket) do
    {:noreply, socket |> push_patch(to: ~p"/preview/schedule-finder-picker")}
  end

  def handle_event("clear-direction", _params, socket) do
    route_id = socket.assigns.route_id

    params = %{route_id: route_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/schedule-finder-picker?#{params}")}
  end

  def handle_event("clear-stop", _params, socket) do
    route_id = socket.assigns.route_id
    direction_id = socket.assigns.direction_id

    params = %{route_id: route_id, direction_id: direction_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/schedule-finder-picker?#{params}")}
  end

  def handle_event("select-direction", %{"direction-id" => direction_id}, socket) do
    route_id = socket.assigns.route_id

    params = %{route_id: route_id, direction_id: direction_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/schedule-finder-picker?#{params}")}
  end

  def handle_event("select-route", %{"route-id" => route_id}, socket) do
    params = %{route_id: route_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/schedule-finder-picker?#{params}")}
  end

  def handle_event("select-stop", %{"stop-id" => stop_id}, socket) do
    route_id = socket.assigns.route_id
    direction_id = socket.assigns.direction_id

    params = %{route_id: route_id, direction_id: direction_id, stop_id: stop_id}
    {:noreply, socket |> push_patch(to: ~p"/preview/schedule-finder-picker?#{params}")}
  end

  @impl LiveView
  def terminate(_reason, _socket) do
    :ok
  end
end
