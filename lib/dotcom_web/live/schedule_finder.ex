defmodule DotcomWeb.Live.ScheduleFinder do
  use DotcomWeb, :live_view

  alias DotcomWeb.Components.ScheduleFinder
  alias Phoenix.LiveView

  @mobile_app_backend_host Application.compile_env(:dotcom, :mobile_app_backend_host)

  defmodule Departure do
    defstruct [
      :id,
      :headsign,
      :status,
      :display_value,
      :live?,
      :replaced_time,
      :effect,
      :override,
      :code,
      :crowding
    ]
  end

  @impl LiveView
  def mount(_, _session, socket) do
    socket =
      socket
      |> assign_new(:all_routes, fn -> Routes.Repo.all() end)
      |> assign_new(:mobile_app_backend_url, fn -> "https://#{@mobile_app_backend_host}" end)
      |> stream_configure(:departures, dom_id: & &1.id)
      |> stream(:departures, [])

    {:ok, socket}
  end

  @impl Phoenix.LiveView
  def handle_params(params, _uri, socket) do
    {:noreply, assign_initial(params, socket)}
  end

  @impl Phoenix.LiveView
  def handle_event("fsd", %{"departures" => departures}, socket) do
    {:noreply,
     stream(socket, :departures, Enum.map(departures, &display/1), reset: true, limit: 5)}
  end

  @impl Phoenix.LiveView
  def handle_info(other, socket) do
    IO.inspect(other, label: "other info")
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

  defp make_departure(%{"tileId" => id, "format" => format} = tile) do
    %Departure{
      id: id,
      crowding: crowding_level(tile),
      headsign: headsign(tile),
      live?: if(is_map(format), do: Map.has_key?(format, "predictedTime")),
      status: if(is_map(format), do: Map.get(format, "status"))
    }
  end

  # A special override value
  defp display(%{"format" => %{"text" => text}} = tile) do
    make_departure(tile)
    |> Map.put(:display_value, text)
  end

  # "Arriving", "Now", "Boarding", etc
  defp display(%{"format" => %{"code" => code}} = tile) do
    make_departure(tile)
    |> Map.put(:display_value, code)
  end

  # These are skipped or cancelled
  defp display(%{"format" => %{"bypassed" => t}} = tile) do
    make_departure(tile)
    |> Map.put(:replaced_time, format_time(t))
  end

  # These are disruptions
  defp display(%{"format" => %{"effect" => effect}} = tile) do
    make_departure(tile)
    |> Map.put(:effect, effect)
  end

  defp display(%{"format" => %{"minutes" => m}} = tile) do
    make_departure(tile)
    |> Map.put(:display_value, "#{m} min")
  end

  defp display(%{"format" => %{"scheduledTime" => t, "predictionTime" => pt}} = tile) do
    make_departure(tile)
    |> Map.put(:replaced_time, format_time(t))
    |> Map.put(:display_value, format_time(pt))
  end

  defp display(%{"format" => %{"scheduledTime" => t}} = tile) do
    make_departure(tile)
    |> Map.put(:display_value, format_time(t))
  end

  defp display(%{"format" => %{"predictionTime" => t}} = tile) do
    make_departure(tile)
    |> Map.put(:display_value, format_time(t))
  end

  defp display(%{"format" => other} = tile) do
    IO.inspect(other, label: "other format!")

    make_departure(tile)
    |> Map.put(:display_value, "other")
  end

  defp format_time(dt) when is_binary(dt) do
    {:ok, t, _} = DateTime.from_iso8601(dt)
    format_time(t)
  end

  defp format_time(dt) do
    dt
    |> DateTime.shift_zone!("America/New_York")
    |> Timex.format!("{h12}:{m} {AM}")
  end

  defp crowding_level(%{"tripId" => trip_id}) do
    case Vehicles.Repo.trip(trip_id) do
      %Vehicles.Vehicle{crowding: crowding} ->
        crowding

      _ ->
        nil
    end
  end

  defp headsign(%{"tripId" => trip_id, "headsign" => headsign}) do
    if(headsign, do: headsign, else: schedule_headsign(trip_id))
  end

  defp schedule_headsign(trip_id) do
    with %{stop_headsign: headsign} when not is_nil(headsign) <-
           Schedules.Repo.schedule_for_trip(trip_id, []) do
      headsign
    else
      _ ->
        trip_headsign(trip_id)
    end
  end

  defp trip_headsign(trip_id) do
    with %{headsign: headsign} when not is_nil(headsign) <- Schedules.Repo.trip(trip_id) do
      headsign
    else
      _ ->
        nil
    end
  end
end
