defmodule Dotcom.UpcomingDepartures.Server do
  @moduledoc """
  Worker process that manages fetching upcoming departures and broadcasting them via PubSub for a given route/direction/stop.
  """

  require Logger

  use GenServer, restart: :transient

  alias Dotcom.Utils.ServiceDateTime

  @refresh_interval_ms 5000
  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]
  @upcoming_departures_module Application.compile_env!(:dotcom, :upcoming_departures_module)

  def start_link(params) do
    GenServer.start_link(__MODULE__, params, name: {:global, params})
  end

  @impl GenServer
  def init(params) do
    %{route_id: route_id, direction_id: direction_id, stop_id: stop_id} = params
    route = @routes_repo.get(route_id)

    base_predicted_schedules =
      [route_id]
      |> @schedules_repo.by_route_ids(
        direction_id: direction_id,
        date: ServiceDateTime.service_date(),
        stop_ids: [stop_id]
      )
      |> PredictedSchedule.Collection.new()

    departures_fn = fn ->
      get_predicted_schedules(base_predicted_schedules, route_id, direction_id, stop_id)
      |> @upcoming_departures_module.upcoming_departures(%{route: route})
    end

    send(self(), :refresh)

    topic = Dotcom.UpcomingDepartures.topic_name(params)
    Logger.notice("Starting server for #{topic}.")

    {:ok, %{departures_fn: departures_fn, topic: topic}}
  end

  defp get_predicted_schedules(base_predicted_schedules, route_id, direction_id, stop_id) do
    @predictions_repo.all(
      route: route_id,
      direction_id: direction_id,
      include_terminals: true,
      discard_past_subway_predictions: false
    )
    |> Enum.filter(&(&1.stop.id == stop_id))
    |> Enum.reduce(base_predicted_schedules, fn prediction, collection ->
      PredictedSchedule.Collection.put_prediction(collection, prediction)
    end)
    |> PredictedSchedule.Collection.to_list()
  end

  @impl GenServer
  def handle_info(:refresh, %{topic: topic} = state) do
    case topic_subscriber_count(topic) do
      0 ->
        Logger.notice("No more subscribers for #{topic}, closing server.")
        {:stop, :normal, state}

      count ->
        Logger.notice("Sending departures for #{topic} to #{count} subscribers")
        :ok = DotcomWeb.Endpoint.broadcast(topic, "upcoming_departures", state.departures_fn.())
        _ = Process.send_after(self(), :refresh, @refresh_interval_ms)

        {:noreply, state}
    end
  end

  def handle_info(_, state), do: {:noreply, state}

  @impl GenServer
  def handle_cast({:subscribe, caller_pid}, state) do
    Logger.notice("subscribing #{inspect(caller_pid)} to #{state.topic}")
    send(caller_pid, {:upcoming_departures, state.departures_fn.()})
    {:noreply, state}
  end

  @impl GenServer
  def terminate(_reason, state) do
    :ok = DotcomWeb.Endpoint.broadcast(state.topic, "upcoming_departures", :terminated)
  end

  defp topic_subscriber_count(topic) do
    case DotcomWeb.Presence.list(topic) do
      %{"upcoming_departures" => %{metas: list}} -> Enum.count(list)
      _other -> 0
    end
  end
end
