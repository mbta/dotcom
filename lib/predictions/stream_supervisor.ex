defmodule Predictions.StreamSupervisor do
  @moduledoc """
  DynamicSupervisor managing streams of predictions from the API.
  """

  use DynamicSupervisor

  alias Predictions.Store
  alias Predictions.StreamSupervisor.Worker
  alias Predictions.StreamTopic

  @streams :prediction_streams_registry
  @subscribers :prediction_subscriptions_table

  @spec start_link(keyword()) :: Supervisor.on_start()
  def start_link(opts), do: DynamicSupervisor.start_link(__MODULE__, opts, name: __MODULE__)

  @impl DynamicSupervisor
  def init(_) do
    _ =
      :ets.new(@subscribers, [
        :public,
        :bag,
        :named_table,
        {:write_concurrency, true},
        {:read_concurrency, true}
      ])

    DynamicSupervisor.init(strategy: :one_for_one)
  end

  @spec ensure_stream_is_started({Store.fetch_keys(), StreamTopic.filter_params()}, pid()) ::
          {:ok, pid()} | :bypassed
  def ensure_stream_is_started(args, subscriber),
    do: ensure_stream_is_started(args, subscriber, System.get_env("USE_SERVER_SENT_EVENTS"))

  defp ensure_stream_is_started(_, _, "false"), do: :bypassed

  defp ensure_stream_is_started({_, filters} = stream, subscriber, _) do
    {:ok, pid} =
      case lookup(filters) do
        nil -> start_stream(stream)
        stream_pid -> {:ok, stream_pid}
      end

    :ets.insert(@subscribers, {subscriber, pid, stream})
    {:ok, pid}
  end

  @spec lookup(StreamTopic.filter_params()) :: pid() | nil
  defp lookup(filters) do
    case Registry.lookup(@streams, filters) do
      [{stream_pid, _}] -> stream_pid
      _ -> nil
    end
  end

  @spec start_stream({Store.fetch_keys(), StreamTopic.filter_params()}) :: {:ok, pid()}
  defp start_stream({_, filters} = stream) do
    DynamicSupervisor.start_child(
      __MODULE__,
      {Worker, [stream, {:via, Registry, {@streams, filters}}]}
    )
  end

  def remove_subscriber(pid) do
    affected_subscriptions = :ets.lookup(@subscribers, pid)
    :ets.delete(@subscribers, pid)

    if is_list(affected_subscriptions) && length(affected_subscriptions) > 0 do
      affected_subscriptions
      |> Enum.uniq_by(fn {_, _, stream} -> stream end)
      |> Enum.each(fn {_, _, stream} -> maybe_close_stream(stream, pid) end)
    end
  end

  defp maybe_close_stream({_, filters} = stream, pid) do
    if :ets.select(@subscribers, [
         {{:"$1", :_, stream}, [{:"=/=", :"$1", pid}], [:"$_"]}
       ]) == [] do
      stop_stream(filters)
    end
  end

  @spec stop_stream(String.t()) :: :ok
  defp stop_stream(filters) do
    case lookup(filters) do
      pid when is_pid(pid) ->
        DynamicSupervisor.terminate_child(
          __MODULE__,
          pid
        )

      _ ->
        :ok
    end
  end
end
