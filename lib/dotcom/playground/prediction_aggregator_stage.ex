defmodule Dotcom.Playground.PredictionAggregatorStage do
  use GenStage

  alias __MODULE__.Store
  alias Predictions.StreamParser
  alias ServerSentEventStage.Event

  def start_link(opts) do
    dbg("Start aggregator")
    name = opts |> Keyword.get(:name)
    dbg(name)

    dbg(opts)

    result = GenStage.start_link(__MODULE__, opts, name: name)
    dbg(result)
    result
  end

  def terminate(_reason, _state), do: :ok

  def init(opts) do
    dbg("Aggregator begins #{inspect(opts)}")

    subscribe_to = opts |> Keyword.get(:subscribe_to)
    publish_to = opts |> Keyword.get(:publish_to)

    {:consumer, %{publish_to: publish_to, predictions_store: Store.new()},
     subscribe_to: [subscribe_to]}
  end

  def handle_events(
        events,
        _from,
        %{publish_to: publish_to, predictions_store: predictions_store} = state
      ) do
    new_predictions_store = Enum.reduce(events, predictions_store, &handle_prediction_event/2)

    publish_to_pid = GenServer.whereis(publish_to)

    send(publish_to_pid, {:predictions, new_predictions_store})

    {:noreply, [], %{state | predictions_store: new_predictions_store}}
  end

  defp handle_prediction_event(%Event{event: event_type, data: data}, predictions_store) do
    dbg(event_type)
    parsed_data = JsonApi.parse(data)

    handle_parsed_prediction_event(event_type, parsed_data, predictions_store)
  end

  defp handle_parsed_prediction_event("reset", %JsonApi{data: data}, _predictions_store) do
    data
    |> Enum.map(&StreamParser.parse/1)
    |> Enum.reduce(Store.new(), &Store.add_prediction(&2, &1))
  end

  defp handle_parsed_prediction_event(event_type, _data, predictions_store) do
    dbg(event_type)
    predictions_store
  end

  defmodule Store do
    defstruct by_id: %{}, by_trip_id_and_stop_seq: %{}

    def new() do
      %__MODULE__{}
    end

    def add_prediction(
          %__MODULE__{by_id: by_id, by_trip_id_and_stop_seq: by_trip_id_and_stop_seq},
          prediction
        ) do
      %__MODULE__{
        by_id: by_id |> Map.put(prediction.id, prediction),
        by_trip_id_and_stop_seq:
          by_trip_id_and_stop_seq
          |> Map.put({prediction.trip.id, prediction.stop_sequence}, prediction)
      }
    end
  end
end
