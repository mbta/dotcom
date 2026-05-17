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
    %{parsed_events: parsed_events, predictions: new_predictions} =
      events |> Enum.reduce(%{predictions: predictions, parsed_events: []}, &handle_event/2)

    send(
      publish_to,
      {:predictions_update,
       %{
         predictions: new_predictions |> Map.values(),
         events: parsed_events |> Enum.reverse()
       }}
    )

    {:noreply, [], %{state | predictions: new_predictions}}
  end

  defp handle_event(%Event{event: "reset", data: data}, %{
         predictions: _predictions,
         parsed_events: parsed_events
       }) do
    new_predictions =
      data
      |> JsonApi.parse()
      |> then(fn %JsonApi{data: data} -> data end)
      |> Map.new(fn %JsonApi.Item{id: id} = item -> {id, StreamParser.parse(item)} end)

    %{
      parsed_events: [{"reset", Map.values(new_predictions)} | parsed_events],
      predictions: new_predictions
    }
  end

  defp handle_event(%Event{event: event_type, data: data}, %{
         predictions: predictions,
         parsed_events: parsed_events
       })
       when event_type in ["add", "update"] do
    {id, prediction} =
      data
      |> JsonApi.parse()
      |> then(fn %JsonApi{data: data} -> data end)
      |> then(fn [%JsonApi.Item{id: id} = item] -> {id, StreamParser.parse(item)} end)

    %{
      parsed_events: [{event_type, prediction} | parsed_events],
      predictions: Map.put(predictions, id, prediction)
    }
  end

  defp handle_event(%Event{event: "remove", data: data}, %{
         predictions: predictions,
         parsed_events: parsed_events
       }) do
    id =
      data
      |> JsonApi.parse()
      |> then(fn %JsonApi{data: data} -> data end)
      |> then(fn [%JsonApi.Item{id: id}] -> id end)

    %{
      parsed_events: [{"remove", Map.get(predictions, id)} | parsed_events],
      predictions: Map.delete(predictions, id)
    }
  end

  defp handle_event(%Event{event: event_type, data: data}, %{
         predictions: predictions,
         parsed_events: parsed_events
       }) do
    %{
      parsed_events: [{event_type, data |> JsonApi.parse()} | parsed_events],
      predictions: predictions
    }
  end
end
