defmodule SiteWeb.PredictionsChannel do
  @moduledoc """
  Channel allowing clients to subscribe to streams of predictions.
  """
  use SiteWeb, :channel
  require Routes.Route
  alias Routes.Route
  alias Phoenix.{Channel, Socket}
  alias Predictions.{Prediction, PredictionsPubSub}

  @impl Channel
  @spec join(topic :: binary(), payload :: Channel.payload(), socket :: Socket.t()) ::
          {:ok, %{predictions: [Prediction.t()]}, Socket.t()} | {:error, map()}
  def join("predictions:" <> topic, _message, socket) do
    predictions_subscribe_fn =
      Application.get_env(
        :dotcom,
        :predictions_subscribe_fn,
        &PredictionsPubSub.subscribe/1
      )

    case predictions_subscribe_fn.(topic) do
      {:error, _reason} ->
        {:error,
         %{
           message: "Cannot subscribe to predictions for #{topic}."
         }}

      predictions ->
        {:ok, %{predictions: filter_new(predictions)}, socket}
    end
  end

  @impl Channel
  def terminate(_, socket) do
    GenServer.cast(Predictions.PredictionsPubSub, {:closed_channel, socket.channel_pid})
  end

  @impl Channel
  @spec handle_info({:new_predictions, [Prediction.t()]}, Socket.t()) :: {:noreply, Socket.t()}
  def handle_info({:new_predictions, predictions}, socket) do
    :ok = push(socket, "data", %{predictions: filter_new(predictions)})
    {:noreply, socket}
  end

  defp filter_new(predictions) do
    predictions
    # remove predictions with no trip information
    |> Enum.reject(&is_nil(&1.trip))
    # remove skipped and cancelled schedules on subway
    |> Enum.reject(fn %Prediction{schedule_relationship: sr, route: %Route{type: type, id: id}} ->
      Route.subway?(type, id) and sr in [:skipped, :cancelled]
    end)
    # remove past predictions
    |> Enum.filter(&is_in_future?/1)
    # remove predictions from terminal stops
    |> Enum.reject(&is_at_terminal_stop?/1)
  end

  defp is_in_future?(%Prediction{time: %DateTime{} = dt}),
    do: Util.time_is_greater_or_equal?(dt, Util.now())

  defp is_in_future?(%Prediction{
         schedule_relationship: sr,
         stop_sequence: seq,
         time: nil,
         trip: %Schedules.Trip{id: trip_id}
       })
       when sr in [:skipped, :cancelled] do
    case Schedules.Repo.schedule_for_trip(trip_id, stop_sequence: seq) do
      [%Schedules.Schedule{time: %DateTime{} = dt}] ->
        Util.time_is_greater_or_equal?(dt, Util.now())

      _ ->
        false
    end
  end

  defp is_in_future?(_), do: false

  defp is_at_terminal_stop?(%Prediction{
         arrival_time: arrival,
         departure_time: departure,
         stop_sequence: seq,
         trip: %Schedules.Trip{id: trip_id}
       }) do
    case Schedules.Repo.schedule_for_trip(trip_id, stop_sequence: seq) do
      [%Schedules.Schedule{last_stop?: is_last_stop}] ->
        is_last_stop

      [] ->
        # This is a prediction without a schedule. Predictions for terminal
        # stops likely have an arrival time but no departure
        arrival && is_nil(departure)

      _ ->
        false
    end
  end
end
