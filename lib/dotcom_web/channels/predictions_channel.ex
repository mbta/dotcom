defmodule DotcomWeb.PredictionsChannel do
  @moduledoc """
  Channel allowing clients to subscribe to streams of predictions.
  """

  use DotcomWeb, :channel

  require Routes.Route

  alias Routes.Route
  alias Phoenix.{Channel, Socket}
  alias Predictions.Prediction

  @predictions_pub_sub Application.compile_env!(:dotcom, :predictions_pub_sub)

  @impl Channel
  @spec handle_info({:new_predictions, [Prediction.t()]}, Socket.t()) :: {:noreply, Socket.t()}
  def handle_info({:new_predictions, predictions}, socket) do
    :ok = push(socket, "data", %{predictions: filter_new(predictions)})

    {:noreply, socket}
  end

  @impl Channel
  @spec join(topic :: binary(), payload :: Channel.payload(), socket :: Socket.t()) ::
          {:ok, %{predictions: [Prediction.t()]}, Socket.t()} | {:error, map()}
  def join("predictions:" <> topic, _message, socket) do
    case @predictions_pub_sub.subscribe(topic) do
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
    GenServer.cast(@predictions_pub_sub, {:closed_channel, socket.channel_pid})
  end

  defp filter_new(predictions) do
    predictions
    |> Enum.reject(fn prediction ->
      no_trip?(prediction) ||
        no_departure_time?(prediction) ||
        skipped_or_cancelled?(prediction)
    end)
    |> Enum.filter(&in_future_seconds?/1)
  end

  defp no_trip?(prediction), do: is_nil(prediction.trip)

  # Used to filter out predictions that have no departure time.
  # This is common when shuttles are being used at non-terminal stops and at terminal stops.
  defp no_departure_time?(prediction), do: is_nil(prediction.departure_time)

  defp skipped_or_cancelled?(prediction) do
    Route.subway?(prediction.route.type, prediction.route.id) &&
      prediction.schedule_relationship in [:cancelled, :skipped]
  end

  defp in_future_seconds?(prediction) do
    Timex.compare(prediction.departure_time, Util.now(), :seconds) >= 0
  end
end
