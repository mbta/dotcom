defmodule DotcomWeb.PredictionsChannel do
  @moduledoc """
  Channel allowing clients to subscribe to streams of predictions.
  """

  use DotcomWeb, :channel

  require Routes.Route

  import Dotcom.Utils.DateTime, only: [now: 0]

  alias Routes.Route
  alias Phoenix.{Channel, Socket}
  alias Predictions.{Prediction, StreamSupervisor, StreamTopic}

  @broadcast_interval_ms Application.compile_env!(:dotcom, [:predictions_broadcast_interval_ms])
  @predictions_store Application.compile_env!(:dotcom, [:predictions_store])

  @impl Channel
  @spec handle_info({:new_predictions, [Prediction.t()]}, Socket.t()) :: {:noreply, Socket.t()}
  def handle_info({:new_predictions, fetch_keys}, socket) do
    Process.send_after(self(), {:new_predictions, fetch_keys}, @broadcast_interval_ms)
    :ok = push(socket, "data", %{predictions: new_predictions(fetch_keys)})
    {:noreply, socket}
  end

  @impl Channel
  @spec join(topic :: binary(), payload :: Channel.payload(), socket :: Socket.t()) ::
          {:ok, %{predictions: [Prediction.t()]}, Socket.t()} | {:error, map()}
  def join("predictions:" <> topic, _message, socket) do
    subscriber = self()

    case StreamTopic.new(topic) do
      {:error, reason} ->
        {:error,
         %{
           message: "Cannot subscribe to predictions for #{topic}: #{inspect(reason)}"
         }}

      %StreamTopic{fetch_keys: fetch_keys, streams: streams} ->
        for stream <- streams do
          StreamSupervisor.ensure_stream_is_started(stream, subscriber)
        end

        Process.send_after(subscriber, {:new_predictions, fetch_keys}, @broadcast_interval_ms)
        {:ok, %{predictions: new_predictions(fetch_keys)}, socket}
    end
  end

  @impl Channel
  def terminate(_, socket), do: StreamSupervisor.remove_subscriber(socket.channel_pid)

  defp new_predictions(fetch_keys) do
    fetch_keys
    |> @predictions_store.fetch()
    |> Enum.reject(fn prediction ->
      no_trip?(prediction) ||
        missing_departure_time?(prediction) ||
        skipped_or_cancelled_subway?(prediction) ||
        departure_exists_in_past?(prediction)
    end)
  end

  defp no_trip?(prediction), do: is_nil(prediction.trip)

  # Used to filter out predictions that have no departure time. This is common
  # when shuttles are being used at non-terminal stops and at terminal stops.
  # However, cancelled/skipped predictions are expected to have nil
  # departure_times, so don't flag those.
  defp missing_departure_time?(prediction) do
    is_nil(prediction.departure_time) and
      prediction.schedule_relationship not in [:cancelled, :skipped]
  end

  # Filter out all cancelled/skipped predictions if it's for subway
  defp skipped_or_cancelled_subway?(prediction) do
    Route.subway?(prediction.route.type, prediction.route.id) &&
      prediction.schedule_relationship in [:cancelled, :skipped]
  end

  # For predictions which have a departure time, filter out ones that are past
  defp departure_exists_in_past?(%{departure_time: nil}), do: false

  defp departure_exists_in_past?(%{departure_time: departure_time}) do
    Timex.before?(departure_time, now())
  end
end
