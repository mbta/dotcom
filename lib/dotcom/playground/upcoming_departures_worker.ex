defmodule Dotcom.Playground.UpcomingDeparturesWorker do
  use GenServer

  alias Dotcom.Playground.PredictionsManager

  # Client
  def subscribe(caller_pid, params) do
    GenServer.start_link(__MODULE__, params, name: process_name(params))
    |> case do
      {:ok, pid} ->
        pid

      {:error, {:already_started, pid}} ->
        pid
    end
    |> GenServer.cast({:subscribe, caller_pid})
  end

  def unsubscribe(caller_pid, params) do
    params
    |> process_name()
    |> GenServer.whereis()
    |> GenServer.cast({:unsubscribe, caller_pid})
  end

  # Server
  def init(%{route: route, stop: stop, direction_id: direction_id} = params) do
    PredictionsManager.subscribe(params)

    predicted_schedules =
      Schedules.Repo.by_route_ids([route],
        direction_id: direction_id,
        stop_ids: [stop]
      )
      |> Map.new(fn s ->
        {{s.trip.id, s.stop_sequence}, %PredictedSchedule{schedule: s, prediction: nil}}
      end)

    {:ok,
     %{
       params: params,
       predictions: :loading,
       predicted_schedules_init: predicted_schedules,
       predicted_schedules: :loading,
       subscribers: MapSet.new()
     }}
  end

  def terminate(_reason, %{params: _params}) do
    PredictionsManager.unsubscribe()
  end

  def handle_cast(
        {:subscribe, pid},
        %{subscribers: subscribers} = state
      ) do
    new_subscribers = subscribers |> MapSet.put(pid)

    publish(%{state | subscribers: [pid]})

    {:noreply, %{state | subscribers: new_subscribers}}
  end

  def handle_cast({:unsubscribe, pid}, %{subscribers: subscribers} = state) do
    new_subscribers = subscribers |> MapSet.delete(pid)

    new_state = %{state | subscribers: new_subscribers}

    if Enum.empty?(new_subscribers) do
      {:stop, :normal, new_state}
    else
      {:noreply, new_state}
    end
  end

  def handle_info(
        {:predictions_update, %{events: events}},
        state
      ) do
    new_state =
      events
      |> Enum.reduce(state, &apply_prediction_event/2)
      |> publish()

    {:noreply, new_state}
  end

  defp apply_prediction_event(
         {"reset", predictions},
         %{predicted_schedules_init: predicted_schedules} = state
       ) do
    new_predicted_schedules =
      predictions
      |> Enum.reduce(predicted_schedules, &add_prediction_to_predicted_schedules/2)

    %{state | predicted_schedules: {:ok, new_predicted_schedules}}
  end

  defp apply_prediction_event(
         {event_type, prediction},
         %{predicted_schedules: {:ok, predicted_schedules}} = state
       )
       when event_type in ["add", "update"] do
    new_predicted_schedules =
      add_prediction_to_predicted_schedules(prediction, predicted_schedules)

    %{state | predicted_schedules: {:ok, new_predicted_schedules}}
  end

  defp apply_prediction_event(
         {"remove", prediction},
         %{predicted_schedules: {:ok, predicted_schedules}} = state
       ) do
    new_predicted_schedules =
      remove_prediction_from_predicted_schedules(prediction, predicted_schedules)

    %{state | predicted_schedules: {:ok, new_predicted_schedules}}
  end

  defp add_prediction_to_predicted_schedules(prediction, predicted_schedules) do
    predicted_schedules
    |> Map.update(
      {prediction.trip.id, prediction.stop_sequence},
      %PredictedSchedule{prediction: prediction},
      fn %PredictedSchedule{} = ps ->
        %PredictedSchedule{ps | prediction: prediction}
      end
    )
  end

  defp remove_prediction_from_predicted_schedules(prediction, predicted_schedules) do
    key = {prediction.trip.id, prediction.stop_sequence}
    ps = predicted_schedules |> Map.get(key)

    if ps.schedule do
      predicted_schedules |> Map.put(key, %{ps | prediction: nil})
    else
      predicted_schedules |> Map.delete(key)
    end
  end

  defp publish(
         %{subscribers: subscribers, predicted_schedules: {:ok, predicted_schedules}} = state
       ) do
    subscribers
    |> Enum.each(fn pid ->
      send(
        pid,
        {:upcoming_departures_update,
         %{
           predicted_schedules:
             predicted_schedules
             |> Map.values()
             |> Enum.sort_by(&PredictedSchedule.display_time/1, DateTime)
         }}
      )
    end)

    state
  end

  defp publish(state), do: state

  defp process_name(params) do
    {:global, {:upcoming_departures, params}}
  end
end
