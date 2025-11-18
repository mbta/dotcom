defmodule DotcomWeb.Live.ScheduleFinder do
  @moduledoc """
  The primary view for looking up schedules, predictions, and relevant alerts
  for a given route/direction/stop.
  """

  use DotcomWeb, :live_view

  import DotcomWeb.Components.ScheduleFinder

  alias DotcomWeb.Components.Prototype
  alias Phoenix.LiveView

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @impl LiveView
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign_new(:route, fn -> nil end)
     |> assign_new(:direction_id, fn -> nil end)
     |> assign_new(:stop, fn -> nil end)}
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
    """
  end

  @impl Phoenix.LiveView
  def handle_params(%{"direction_id" => direction, "route_id" => route} = params, _uri, socket) do
    {direction_id, _} = Integer.parse(direction)

    {:noreply,
     socket
     |> assign(:route, @routes_repo.get(route))
     |> assign(:direction_id, direction_id)
     |> assign_stop(params)}
  end

  defp assign_stop(socket, params) do
    stop_id = Map.get(params, "stop")
    assign(socket, :stop, if(stop_id, do: @stops_repo.get(stop_id)))
  end
end
