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

    _ = Dotcom.ServiceDateRollover.subscribe()
    _ = Dotcom.Predictions.Manager.subscribe(self(), params)

    schedules_fn = fn date ->
      @schedules_repo.by_route_ids([route_id],
        direction_id: direction_id,
        date: date,
        stop_ids: [stop_id]
      )
    end

    predictions_fn = fn ->
      @predictions_repo.all(
        route: route_id,
        direction_id: direction_id,
        include_terminals: true,
        discard_past_subway_predictions: false
      )
      |> Enum.filter(&(&1.stop.id == stop_id))
    end

    upcoming_departures_fn = fn predicted_schedules ->
      predicted_schedules
      |> @upcoming_departures_module.upcoming_departures(%{route: route})
    end

    send(self(), :refresh)

    topic = Dotcom.UpcomingDepartures.topic_name(params)
    Logger.notice("Starting server for #{topic}.")

    base_predicted_schedules =
      ServiceDateTime.service_date()
      |> schedules_fn.()
      |> PredictedSchedule.Collection.new()

    {:ok,
     %{
       base_predicted_schedules: base_predicted_schedules,
       predictions_fn: predictions_fn,
       schedules_fn: schedules_fn,
       topic: topic,
       upcoming_departures_fn: upcoming_departures_fn
     }}
  end

  @impl GenServer
  def handle_info(:refresh, %{topic: topic} = state) do
    case topic_subscriber_count(topic) do
      0 ->
        Logger.notice("No more subscribers for #{topic}, closing server.")
        {:stop, :normal, state}

      count ->
        Logger.notice("Sending departures for #{topic} to #{count} subscribers")

        _ = Process.send_after(self(), :refresh, @refresh_interval_ms)

        {:noreply, state |> broadcast_departures()}
    end
  end

  def handle_info({:predictions_update, update}, state) do
    IO.inspect(update, label: "predictions_update")
    {:noreply, state}
  end

  def handle_info({:service_date_rollover, new_service_date}, state) do
    Logger.notice("Date change - Re-sending departures for #{state.topic}")

    {:noreply,
     state
     |> update_service_date(new_service_date)
     |> broadcast_departures()}
  end

  def handle_info(_, state), do: {:noreply, state}

  @impl GenServer
  def handle_cast({:subscribe, caller_pid}, state) do
    Logger.notice("subscribing #{inspect(caller_pid)} to #{state.topic}")
    send(caller_pid, {:upcoming_departures, upcoming_departures(state)})
    {:noreply, state}
  end

  @impl GenServer
  def terminate(_reason, state) do
    :ok = DotcomWeb.Endpoint.broadcast(state.topic, "upcoming_departures", :terminated)
  end

  defp broadcast_departures(state) do
    :ok =
      DotcomWeb.Endpoint.broadcast(
        state.topic,
        "upcoming_departures",
        upcoming_departures(state)
      )

    state
  end

  defp update_service_date(state, new_service_date) do
    base_predicted_schedules =
      new_service_date
      |> state.schedules_fn.()
      |> PredictedSchedule.Collection.new()

    %{state | base_predicted_schedules: base_predicted_schedules}
  end

  defp upcoming_departures(state) do
    state.predictions_fn.()
    |> Enum.reduce(state.base_predicted_schedules, fn prediction, collection ->
      PredictedSchedule.Collection.put_prediction(collection, prediction)
    end)
    |> PredictedSchedule.Collection.to_list()
    |> state.upcoming_departures_fn.()
  end

  defp topic_subscriber_count(topic) do
    case DotcomWeb.Presence.list(topic) do
      %{"upcoming_departures" => %{metas: list}} -> Enum.count(list)
      _other -> 0
    end
  end
end
