defmodule DotcomWeb.Live.UpcomingDepartures do
  use DotcomWeb, :live_view

  import Dotcom.Utils.DateTime, only: [now: 0]

  alias Dotcom.Departure
  alias DotcomWeb.Components.ScheduleFinder
  alias Phoenix.LiveView

  @predictions_pub_sub Application.compile_env!(:dotcom, :predictions_pub_sub)

  @impl LiveView
  def mount(_, session, socket) do
    socket =
      case session do
        %{"direction_id" => direction_id, "route_id" => route_id, "stop_id" => stop_id} ->
          _ = subscribe_predictions(stop_id)

          socket
          |> stream_configure(:upcoming_departures, dom_id: &PredictedSchedule.id/1)
          |> assign_new(:route_id, fn -> route_id end)
          |> assign_new(:direction_id, fn -> direction_id end)
          |> assign_new(:stop_id, fn -> stop_id end)
          |> assign_new(:route, fn -> Routes.Repo.get(route_id) end)
          |> assign_new(
            :schedules,
            fn ->
              Schedules.Repo.by_route_ids([route_id],
                direction_id: direction_id,
                stop_ids: stop_id
              )
            end
          )

        _ ->
          socket
      end

    {:ok, stream(socket, :upcoming_departures, [])}
  end

  @impl LiveView
  def handle_info({:new_predictions, predictions}, socket) do
    opts = Map.take(socket.assigns, [:route, :direction_id, :stop_id, :schedules])

    {:noreply,
     stream(socket, :upcoming_departures, get_next_departures(
       predictions,
       opts
     ), limit: 5, reset: true)}
  end

  def handle_info(:tick, socket) do
    {:noreply, assign(socket, now: now())}
  end

  def handle_info(_, socket) do
    {:noreply, socket}
  end

  defp get_next_departures(predictions, opts) do
    route = Map.fetch!(opts, :route)
    direction_id = Map.fetch!(opts, :direction_id)
    stop_id = Map.fetch!(opts, :stop_id)
    schedules = Map.fetch!(opts, :schedules)

    predictions
    |> Enum.reject(&is_nil(&1.time))
    |> DotcomWeb.PredictionsChannel.filter_new()
    |> Enum.filter(fn prediction ->
      prediction.route.id == route.id && prediction.stop.id == stop_id &&
        prediction.direction_id == direction_id
    end)
    |> PredictedSchedule.group(schedules)
    |> PredictedSchedule.filter_predicted_schedules(now())
  end

  defp subscribe_predictions(stop_id) do
    _ = @predictions_pub_sub.unsubscribe()
    _ = @predictions_pub_sub.subscribe("stop:#{stop_id}")
  end
end
