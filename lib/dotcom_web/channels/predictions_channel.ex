defmodule DotcomWeb.PredictionsChannel do
  @moduledoc """
  Channel allowing clients to subscribe to streams of predictions.
  """

  use DotcomWeb, :channel
  use Dotcom.Gettext.Sigils

  require Routes.Route

  import Dotcom.Utils.DateTime, only: [now: 0]

  alias Routes.Route
  alias Phoenix.{Channel, Socket}
  alias Predictions.Prediction

  @predictions_pub_sub Application.compile_env!(:dotcom, :predictions_pub_sub)
  @timezone Application.compile_env!(:dotcom, :timezone)

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
  def terminate(_, _) do
    @predictions_pub_sub.unsubscribe()
  end

  defp filter_new(predictions) do
    predictions
    |> Enum.reject(fn prediction ->
      is_nil(prediction.time) ||
        no_trip?(prediction) ||
        missing_departure_time?(prediction) ||
        skipped_or_cancelled_subway?(prediction) ||
        departure_exists_in_past?(prediction)
    end)
    |> sort_and_format()
  end

  defp sort_and_format([]), do: []

  defp sort_and_format(predictions) do
    predictions
    |> Enum.sort_by(& &1.time, {:asc, DateTime})
    |> Enum.take(2)
    |> Enum.map(fn p ->
      %{
        headsign: p.trip.headsign,
        time: relative_time(p.time)
      }
    end)
  end

  defp relative_time(t) do
    t = DateTime.shift_zone!(t, @timezone)
    n = Dotcom.Utils.DateTime.now()

    case Cldr.DateTime.Interval.greatest_difference(t, n) do
      {:error, :no_practical_difference} ->
        ~t"Now"

      {:ok, :m} ->
        seconds = DateTime.diff(t, n, :second)
        Dotcom.Utils.Diff.seconds_to_localized_minutes(seconds)

      _ ->
        Dotcom.Utils.Time.format!(t, :hour_12_minutes)
    end
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
