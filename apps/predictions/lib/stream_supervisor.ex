defmodule Predictions.StreamSupervisor do
  @moduledoc """
  DynamicSupervisor managing streams of predictions from the API.
  """
  use DynamicSupervisor
  alias Predictions.StreamSupervisor.Worker

  @streams :prediction_streams_registry

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

      stream_pid ->
        {:ok, stream_pid}
    end
  end

  @spec lookup(String.t()) :: pid() | nil
  defp lookup(key) do
    case Registry.lookup(@streams, key) do
      [{stream_pid, _}] -> stream_pid
      _ -> nil
    end
  end

  @spec start_stream(String.t()) :: {:ok, pid()}
  defp start_stream(key) do
    DynamicSupervisor.start_child(
      __MODULE__,
      %{
        id: Worker,
        start: {Worker, :start_link, [key, via_tuple(key)]},
        restart: :transient,
        type: :worker
      }
    )
  end

  defp via_tuple(key) do
    {:via, Registry, {@streams, key}}
  end

  @spec stop_stream(String.t()) :: :ok
  def stop_stream(key) do
    case lookup(key) do
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
