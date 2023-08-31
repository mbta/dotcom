defmodule Predictions.StreamSupervisor.Worker do
  @moduledoc "Each request to the streaming predictions"
  use Supervisor
  import Predictions.PredictionsPubSub, only: [table_keys: 1]

  @spec start_link(String.t(), Tuple.t()) :: Supervisor.on_start()
  def start_link(key, name) do
    Supervisor.start_link(__MODULE__, key, name: name)
  end

  def child_spec(opts) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, opts},
      restart: :transient,
      type: :supervisor
    }
  end

  @impl Supervisor
  def init(key) do
    sses_stream_name = sses_stream_name(key)
    api_stream_name = :"predictions_api_stream_#{key}"
    prediction_stream_name = :"predictions_data_stream_#{key}"

    Supervisor.init(
      [
        {ServerSentEventStage, sses_opts(key)},
        {V3Api.Stream, name: api_stream_name, subscribe_to: sses_stream_name},
        {Predictions.Stream, name: prediction_stream_name, subscribe_to: api_stream_name}
      ],
      strategy: :rest_for_one
    )
  end

  # Parses the argument from the channel name, expecting a name formatted with
  # `:` delimiters and `=` separators, e.g.
  # `route=Red:direction_id=1:stop=place-sstat`
  @spec sses_opts(String.t()) :: Keyword.t()
  defp sses_opts(key) do
    filters =
      table_keys(key)
      |> Enum.map(fn {k, v} -> "filter[#{k}]=#{v}&" end)
      |> Enum.join()

    path =
      "/predictions?#{filters}fields[prediction]=status,departure_time,arrival_time,direction_id,schedule_relationship,stop_sequence&include=route,trip,trip.occupancies,stop&fields[route]=long_name,short_name,type&fields[trip]=direction_id,headsign,name,bikes_allowed&fields[stop]=platform_code"

    sses_opts =
      V3Api.Stream.build_options(
        name: sses_stream_name(key),
        path: path
      )

    sses_opts
  end

  @spec sses_stream_name(String.t()) :: atom()
  defp sses_stream_name(key),
    do: :"predictions_sses_stream_#{key}"
end
