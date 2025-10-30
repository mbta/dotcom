defmodule DotcomWeb.Live.ScheduleFinder do
  use DotcomWeb, :live_view

  alias DotcomWeb.Components.ScheduleFinder
  alias Phoenix.LiveView

  @impl LiveView
  def mount(_, _session, socket) do
    socket =
      socket
      |> assign_new(:all_routes, fn -> Routes.Repo.all() end)
      |> stream_configure(:departures, dom_id: & &1.id)
      |> stream(:departures, [])

    {:ok, socket}
  end

  @impl Phoenix.LiveView
  def handle_params(params, _uri, socket) do
    {:noreply, assign_initial(params, socket)}
  end

  @impl Phoenix.LiveView
  def handle_info(other, socket) do
    {:noreply, socket}
  end

  defp assign_initial(params, socket) do
    %{"direction_id" => direction, "route_id" => route} = params
    stop = Map.get(params, "stop")
    {direction_id, _} = Integer.parse(direction)

    if socket.assigns[:route_id] == route and socket.assigns[:direction_id] == direction_id do
      socket
      |> assign(:stop_id, stop)
    else
      socket
      |> assign(:stop_id, stop)
      |> assign(:route_id, route)
      |> assign(:route, Routes.Repo.get(route))
      |> assign(:direction_id, direction_id)
      |> assign_async(
        :route_stops,
        fn ->
          {:ok, %{route_stops: Stops.Repo.by_route(route, direction)}}
        end,
        reset: true
      )
    end
  end
end
