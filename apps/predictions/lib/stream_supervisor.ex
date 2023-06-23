defmodule Predictions.StreamSupervisor do
  @moduledoc """
  DynamicSupervisor managing streams of predictions from the API.
  """
  import Predictions.PredictionsPubSub, only: [table_keys: 1]
  use DynamicSupervisor

  @spec start_link(keyword()) :: Supervisor.on_start()
  def start_link(opts), do: DynamicSupervisor.start_link(__MODULE__, opts, name: __MODULE__)

  @impl DynamicSupervisor
  def init(_) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  @spec ensure_stream_is_started(String.t()) :: {:ok, pid()} | :bypassed
  def ensure_stream_is_started(keys),
    do: ensure_stream_is_started(keys, System.get_env("USE_SERVER_SENT_EVENTS"))

  defp ensure_stream_is_started(_keys, "false"), do: :bypassed

  defp ensure_stream_is_started(keys, _) do
    case lookup(keys) do
      nil ->
        start_stream(keys)

      pid ->
        {:ok, pid}
    end
  end

  @spec lookup(String.t()) :: pid() | nil
  defp lookup(key) do
    case Registry.lookup(:prediction_streams_registry, key) do
      [{_pid, sses_pid}] ->
        if Process.alive?(sses_pid), do: sses_pid

      _ ->
        nil
    end
  end

  @spec start_stream(String.t()) :: {:ok, pid()}
  defp start_stream(keys) do
    with {:ok, sses_pid} <-
           DynamicSupervisor.start_child(
             __MODULE__,
             {ServerSentEventStage, sses_opts(keys)}
           ),
         api_stream_name <- api_stream_name(keys),
         sses_stream_name <- sses_stream_name(keys),
         prediction_stream_name <- prediction_stream_name(keys),
         {:ok, _api_stream_pid} <-
           DynamicSupervisor.start_child(
             __MODULE__,
             {V3Api.Stream, name: api_stream_name, subscribe_to: sses_stream_name}
           ),
         {:ok, _predictions_stream_pid} <-
           DynamicSupervisor.start_child(
             __MODULE__,
             {Predictions.Stream, name: prediction_stream_name, subscribe_to: api_stream_name}
           ) do
      Registry.register(:prediction_streams_registry, keys, sses_pid)
      {:ok, sses_pid}
    else
      {:error, {:already_started, pid}} ->
        {:ok, pid}
    end
  end

  # Parses the argument from the channel name, expecting a name formatted with
  # `:` delimiters and `=` separators, e.g.
  # `route=Red:direction_id=1:stop=place-sstat`
  @spec sses_opts(String.t()) :: Keyword.t()
  defp sses_opts(keys) do
    filters =
      table_keys(keys)
      |> Enum.map(fn {k, v} -> "filter[#{k}]=#{v}&" end)
      |> Enum.join()

    path =
      "/predictions?#{filters}fields[prediction]=status,departure_time,arrival_time,direction_id,schedule_relationship,stop_sequence&include=route,trip,trip.occupancies,stop&fields[route]=long_name,short_name,type&fields[trip]=direction_id,headsign,name,bikes_allowed&fields[stop]=platform_code"

    sses_opts =
      V3Api.Stream.build_options(
        name: sses_stream_name(keys),
        path: path
      )

    sses_opts
  end

  @spec sses_stream_name(String.t()) :: atom()
  defp sses_stream_name(keys),
    do: :"predictions_sses_stream_#{keys}"

  @spec api_stream_name(String.t()) :: atom()
  defp api_stream_name(keys),
    do: :"predictions_api_stream_#{keys}"

  @spec prediction_stream_name(String.t()) :: atom()
  defp prediction_stream_name(keys),
    do: :"predictions_data_stream_#{keys}"
end
