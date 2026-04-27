defmodule Dotcom.Playground.PredictionsBroadcasterStage do
  use GenStage

  alias Predictions.StreamParser
  alias ServerSentEventStage.Event

  def start_link(opts) do
    GenStage.start_link(__MODULE__, opts, name: opts |> Keyword.get(:name))
  end

  def terminate(_reason, _state), do: :ok

  def init(opts) do
    subscribe_to = opts |> Keyword.get(:subscribe_to)
    publish_to = opts |> Keyword.get(:publish_to)

    {:consumer, %{publish_to: publish_to, predictions: %{}}, subscribe_to: [subscribe_to]}
  end

  def handle_events(
        events,
        _from,
        %{publish_to: publish_to, predictions: predictions} = state
      ) do
    parsed_events =
      events
      |> Enum.map(&parse_event/1)

    # |> dbg()

    new_predictions =
      Enum.reduce(parsed_events, predictions, fn
        {:reset, predictions}, _predictions ->
          predictions |> index_by(& &1.id)

        {event_type, prediction}, predictions when event_type in [:add, :update] ->
          predictions |> Map.put(prediction.id, prediction)

        {:remove, prediction}, predictions ->
          predictions |> Map.delete(prediction.id)

        _, _ ->
          predictions
      end)

    send(
      publish_to,
      {:predictions_update, %{predictions: new_predictions, events: parsed_events}}
    )

    {:noreply, [], %{state | predictions: new_predictions}}
  end

  defp parse_event(%Event{event: "reset", data: data}) do
    {:reset,
     data
     |> JsonApi.parse()
     |> then(fn %JsonApi{data: data} -> data end)
     |> Enum.map(&StreamParser.parse/1)}
  end

  defp parse_event(%Event{event: "add", data: data}), do: {:add, to_prediction(data)}
  defp parse_event(%Event{event: "update", data: data}), do: {:update, to_prediction(data)}

  defp parse_event(%Event{event: "remove", data: data}) do
    {:update, to_prediction(data)}
  end

  defp parse_event(%Event{event: event_type, data: _data}) do
    {:unknown, event_type}
  end

  defp parse_event(%Event{event: event_type}), do: {:unknown, event_type}

  defp to_prediction(data) do
    data
    |> JsonApi.parse()
    |> then(fn %JsonApi{data: data} -> data end)
    |> Enum.map(&StreamParser.parse/1)
    |> then(fn [prediction] -> prediction end)
  end

  defp index_by(enum, fun) do
    enum
    |> Enum.group_by(fun)
    |> Map.new(fn {key, [value | _]} -> {key, value} end)
  end
end
