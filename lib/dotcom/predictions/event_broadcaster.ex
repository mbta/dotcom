defmodule Dotcom.Predictions.EventBroadcaster do
  @moduledoc """
  Receives events from the streaming V3 API /predictions endpoint
  """
  require Logger

  use GenStage

  alias Predictions.StreamParser
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
    log_events(events)

    %{parsed_events: parsed_events, predictions: new_predictions} =
      events |> Enum.reduce(%{predictions: predictions, parsed_events: []}, &handle_event/2)

    log("")

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

  defp log_events(events) do
    log("Events Bundle Received {")
    events |> Enum.each(&log_event/1)
    log("}")
    log("")
  end

  defp log_event(%Event{event: event_type, data: data}) do
    ids =
      data
      |> JsonApi.parse()
      |> then(fn %JsonApi{data: data} -> data end)
      |> Enum.map(fn %JsonApi.Item{id: id} -> id end)
      |> Enum.join(", ")

    log("\t#{String.upcase(event_type)} - #{ids}")
  end

  defp handle_event(%Event{event: "reset", data: data}, %{
         predictions: _predictions,
         parsed_events: parsed_events
       }) do
    new_predictions = parse_prediction_data(data) |> Map.new()

    trip_ids =
      new_predictions |> Map.values() |> Enum.map(&inspect(&1.trip_id)) |> Enum.join(", ")

    log("RESET - #{trip_ids}")

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
        log("#{String.upcase(event_type)} - #{inspect(prediction.trip_id)}")

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
        log("REMOVE - No prediction tho")
        state

      prediction_to_remove ->
        log("REMOVE - #{inspect(prediction_to_remove.trip_id)}")

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
    log("#{String.upcase(event_type)} - ???")

    %{
      parsed_events: [{event_type, data |> JsonApi.parse()} | parsed_events],
      predictions: predictions
    }
  end

  defp parse_prediction_data(json_api_data) do
    with %JsonApi{data: data} <- JsonApi.parse(json_api_data) do
      data
      |> Stream.map(fn %JsonApi.Item{id: id} = item ->
        {id, StreamParser.parse(item)}
      end)
      |> Enum.to_list()
    end
  end

  defp log(message) do
    Logger.notice(message, label: "predictions")
  end
end
