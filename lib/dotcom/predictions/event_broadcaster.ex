defmodule Dotcom.Predictions.EventBroadcaster do
  @moduledoc """
  Receives events from the streaming V3 API /predictions endpoint
  """
  use GenStage

  alias Predictions.{Prediction, StreamParser}
  alias ServerSentEventStage.Event

  def start_link(opts) do
    GenStage.start_link(__MODULE__, opts, name: opts |> Keyword.get(:name))
  end

  @impl GenStage
  def terminate(_reason, _state), do: :ok

  @impl GenStage
  def init(opts) do
    subscribe_to = opts |> Keyword.get(:subscribe_to)
    publish_to = opts |> Keyword.get(:publish_to)

    {:consumer, %{publish_to: publish_to, predictions: %{}}, subscribe_to: [subscribe_to]}
  end

  @impl GenStage
  def handle_events([%Event{event: "error"}], _from, state) do
    {:stop, :normal, state}
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
    new_predictions = parse_prediction_data(data) |> Map.new()

    %{
      parsed_events: [{"reset", Map.values(new_predictions)} | parsed_events],
      predictions: new_predictions
    }
  end

  defp handle_event(
         %Event{event: event_type, data: data},
         %{
           predictions: predictions,
           parsed_events: parsed_events
         } = state
       )
       when event_type in ["add", "update"] do
    case parse_prediction_data(data) do
      [] ->
        state

      [{id, prediction}] ->
        %{
          parsed_events: [{event_type, prediction} | parsed_events],
          predictions: Map.put(predictions, id, prediction)
        }
    end
  end

  defp handle_event(
         %Event{event: "remove", data: data},
         %{
           predictions: predictions,
           parsed_events: parsed_events
         } = state
       ) do
    id =
      data
      |> JsonApi.parse()
      |> then(fn %JsonApi{data: data} -> data end)
      |> then(fn [%JsonApi.Item{id: id}] -> id end)

    case Map.get(predictions, id) do
      nil ->
        state

      prediction_to_remove ->
        %{
          parsed_events: [{"remove", prediction_to_remove} | parsed_events],
          predictions: Map.delete(predictions, id)
        }
    end
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

  defp parse_prediction_data(json_api_data) do
    with %JsonApi{data: data} <- JsonApi.parse(json_api_data) do
      data
      |> Stream.map(fn %JsonApi.Item{id: id} = item ->
        check_tripless_prediction(id, StreamParser.parse(item))
      end)
      |> Stream.reject(fn item -> item == :error end)
      |> Enum.to_list()
    end
  end

  defp check_tripless_prediction(_, %Prediction{trip: nil}), do: :error
  defp check_tripless_prediction(id, parsed), do: {id, parsed}
end
