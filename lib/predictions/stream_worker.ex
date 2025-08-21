defmodule Predictions.StreamSupervisor.Worker do
  @moduledoc "Each request to the streaming predictions"
  use Supervisor

  alias Predictions.Store
  alias Predictions.StreamTopic

  def start_link({keys, filters}, name) do
    Supervisor.start_link(__MODULE__, {keys, filters}, name: name)
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
  @doc "The `filters` argument is a string representing the filter parameters of
  the resultant API call e.g. 'filter[route]=CR-Foxboro&filter[direction_id]=0'"
  def init({keys, filters}) do
    sses_stream_name = sses_stream_name(filters)
    api_stream_name = :"predictions_api_stream_#{filters}"
    prediction_stream_name = :"predictions_data_stream_#{filters}"

    Supervisor.init(
      [
        {ServerSentEventStage, sses_opts(filters)},
        {MBTA.Api.Stream, name: api_stream_name, subscribe_to: sses_stream_name},
        {Predictions.Stream,
         name: prediction_stream_name, subscribe_to: api_stream_name, clear_keys: keys}
      ],
      strategy: :rest_for_one
    )
  end

  defp sses_opts(filters) do
    path =
      "/predictions?#{filters}&fields[prediction]=status,departure_time,arrival_time,direction_id,schedule_relationship,stop_sequence&include=route,trip,trip.occupancies,stop&fields[route]=long_name,short_name,type&fields[trip]=direction_id,headsign,name,bikes_allowed&fields[stop]=platform_code"

    sses_opts =
      MBTA.Api.Stream.build_options(
        name: sses_stream_name(filters),
        path: path
      )

    sses_opts
  end

  defp sses_stream_name(filters),
    do: :"predictions_sses_stream_#{filters}"
end
