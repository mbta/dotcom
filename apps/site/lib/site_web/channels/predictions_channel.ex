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
  def join("predictions:" <> route_id, _message, socket) do
    predictions_subscribe_fn =
      Application.get_env(
        :site,
        :predictions_subscribe_fn,
        &PredictionsPubSub.subscribe/1
      )

    predictions = predictions_subscribe_fn.(route_id)

    {:ok, %{predictions: predictions}, socket}
  end

  @impl Channel
  @spec handle_info({:new_predictions, [Prediction.t()]}, Socket.t()) :: {:noreply, Socket.t()}
  def handle_info({:new_predictions, predictions}, socket) do
    :ok = push(socket, "predictions", %{predictions: predictions})
    {:noreply, socket}
  end
end
