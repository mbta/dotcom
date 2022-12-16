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
  def join("predictions:" <> route_stop_direction, _message, socket) do
    predictions_subscribe_fn =
      Application.get_env(
        :site,
        :predictions_subscribe_fn,
        &PredictionsPubSub.subscribe/3
      )

    [route_id, stop_id, direction_id] = String.split(route_stop_direction, ":")
    predictions = predictions_subscribe_fn.(route_id, stop_id, direction_id)

    # remove old predictions
    future_predictions = Enum.filter(predictions, &is_in_future?/1)
    # immediately push current predictions to socket
    send(self(), {:new_predictions, future_predictions})
    {:ok, socket}
  end

  @impl Channel
  @spec handle_info({:new_predictions, [Prediction.t()]}, Socket.t()) :: {:noreply, Socket.t()}
  def handle_info({:new_predictions, predictions}, socket) do
    :ok = push(socket, "data", %{predictions: predictions})
    {:noreply, socket}
  end

  defp is_in_future?(%Prediction{departure_time: %DateTime{} = d}),
    do: Util.time_is_greater_or_equal?(d, Util.now())

  defp is_in_future?(_), do: false
end
