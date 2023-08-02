defmodule SiteWeb.PredictionsChannel do
  @moduledoc """
  Channel allowing clients to subscribe to streams of predictions.
  """
  use SiteWeb, :channel

  alias Phoenix.{Channel, Socket}
  alias Predictions.{Prediction, PredictionsPubSub}

  @impl Channel
  @spec join(topic :: binary(), payload :: Channel.payload(), socket :: Socket.t()) ::
          {:ok, %{predictions: [Prediction.t()]}, Socket.t()}
  def join("predictions:" <> opts, _message, socket) do
    predictions_subscribe_fn =
      Application.get_env(
        :site,
        :predictions_subscribe_fn,
        &PredictionsPubSub.subscribe/1
      )

    predictions = predictions_subscribe_fn.(opts)
    {:ok, %{predictions: filter_new(predictions)}, socket}
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
    # remove past predictions
    |> Enum.filter(&is_in_future?/1)
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
end
