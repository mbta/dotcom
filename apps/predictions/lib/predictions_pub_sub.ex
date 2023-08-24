defmodule Predictions.PredictionsPubSub do
  @moduledoc """
  Allow channels to subscribe to prediction streams, which are collected into an
  ETS table keyed by prediction ID, route ID, stop ID, direction ID, trip ID,
  and vehicle ID for easy retrieval.
  """

  use GenServer

  alias Predictions.{Prediction, Store, StreamSupervisor}

  @valid_filters ["route", "stop", "direction", "trip"]
  @broadcast_interval_ms Application.compile_env!(:predictions, [:broadcast_interval_ms])
  @subscribers :prediction_subscriptions_registry

  @type broadcast_message :: {:new_predictions, [Prediction.t()]}

  # Client

  @spec start_link() :: GenServer.on_start()
  @spec start_link(Keyword.t()) :: GenServer.on_start()
  def start_link(opts \\ []) do
    name = Keyword.get(opts, :name, __MODULE__)

    GenServer.start_link(
      __MODULE__,
      opts,
      name: name
    )
  end

  @spec subscribe(String.t()) :: [Prediction.t()]
  @spec subscribe(String.t(), GenServer.server()) :: [Prediction.t()]
  def subscribe(key, server \\ __MODULE__) do
    StreamSupervisor.ensure_stream_is_started(key)
    {registry_key, predictions} = GenServer.call(server, {:subscribe, key})
    Registry.register(@subscribers, registry_key, key)
    predictions
  end

  # Server

  @impl GenServer
  def init(opts) do
    subscribe_fn = Keyword.get(opts, :subscribe_fn, &Phoenix.PubSub.subscribe/2)
    subscribe_fn.(Predictions.PubSub, "predictions")
    broadcast_timer(@broadcast_interval_ms)
    {:ok, %{}}
  end

  @impl GenServer
  def handle_call({:subscribe, keys}, {from_pid, _ref}, state) do
    registry_key = self()

    # Let us detect when the calling process goes down, and save the associated
    # keys for easier lookup
    Process.monitor(from_pid)
    new_state = Map.put_new(state, from_pid, keys)

    predictions = keys |> table_keys() |> Store.fetch()
    {:reply, {registry_key, predictions}, new_state}
  end

  @impl GenServer
  def handle_cast({:stop_stream, key}, state) do
    # By this point, the caller_pid is no longer alive or registered/subscribed.
    # Here we can check if there are other subscribers for the associated key.
    # If there are no other subscribers remaining, we stop the associated
    # predictions data stream.
    if Registry.count_match(@subscribers, self(), key) == 0 do
      StreamSupervisor.stop_stream(key)
    end

    {:noreply, state}
  end

  @impl GenServer
  def handle_info(:broadcast, state) do
    registry_key = self()

    Registry.dispatch(@subscribers, registry_key, fn entries ->
      Enum.each(entries, &send_data(&1))
    end)

    broadcast_timer(@broadcast_interval_ms)
    {:noreply, state}
  end

  def handle_info({event, predictions}, state) do
    :ok = Store.update(event, predictions)
    {:noreply, state}
  end

  def handle_info(
        {:DOWN, parent_ref, :process, caller_pid, _reason},
        state
      ) do
    Process.demonitor(parent_ref, [:flush])
    {key, new_state} = Map.pop(state, caller_pid)
    GenServer.cast(__MODULE__, {:stop_stream, key})
    {:noreply, new_state}
  end

  @spec table_keys(String.t()) :: [
          route: Route.id_t(),
          stop: Stop.id_t(),
          direction: 0 | 1,
          trip: Trip.id_t()
        ]
  def table_keys(keys) when is_binary(keys) do
    keys
    |> String.split(":")
    |> Enum.map(&String.split(&1, "="))
    |> Enum.filter(fn key_value ->
      length(key_value) == 2 and List.first(key_value) in @valid_filters
    end)
    |> Enum.into([], fn
      ["direction", v] -> {:direction, String.to_integer(v)}
      [k, v] -> {String.to_existing_atom(k), v}
    end)
  end

  @spec send_data({pid, String.t()}) :: broadcast_message()
  defp send_data({pid, keys}) do
    new_predictions = keys |> table_keys() |> Store.fetch()
    send(pid, {:new_predictions, new_predictions})
  end

  defp broadcast_timer(interval) do
    Process.send_after(self(), :broadcast, interval)
  end
end
