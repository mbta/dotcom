defmodule Predictions.PredictionsPubSub do
  @moduledoc """
  Allow channels to subscribe to prediction streams, which are collected into an
  ETS table keyed by prediction ID, route ID, stop ID, direction ID, trip ID,
  and vehicle ID for easy retrieval.
  """

  use GenServer

  alias Predictions.{Prediction, Store, StreamTopic, StreamSupervisor}

  @broadcast_interval_ms Application.compile_env!(:predictions, [:broadcast_interval_ms])
  @subscribers :prediction_subscriptions_registry

  @type registry_value :: {Store.fetch_keys(), binary()}
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
  @spec subscribe(String.t(), GenServer.server()) :: [Prediction.t()] | {:error, term()}
  def subscribe(topic, server \\ __MODULE__) do
    with %StreamTopic{} = stream_topic <- StreamTopic.new(topic) do
      :ok = StreamTopic.start_streams(stream_topic)

      {registry_key, predictions} = GenServer.call(server, {:subscribe, stream_topic})

      for key <- StreamTopic.registration_keys(stream_topic) do
        Registry.register(@subscribers, registry_key, key)
      end

      predictions
    else
      {:error, _} = error ->
        error
    end
  end

  # Server

  @impl GenServer
  def init(opts) do
    subscribe_fn = Keyword.get(opts, :subscribe_fn, &Phoenix.PubSub.subscribe/2)
    subscribe_fn.(Predictions.PubSub, "predictions")
    broadcast_timer(50)
    {:ok, %{}}
  end

  @impl GenServer
  def handle_call(
        {:subscribe, stream_filter},
        {from_pid, _ref},
        state
      ) do
    registry_key = self()

    # Let us detect when the calling process goes down, and save the associated
    # API params for easier lookup
    Process.monitor(from_pid)
    new_state = Map.put_new(state, from_pid, stream_filter)

    predictions =
      stream_filter
      |> Map.get(:fetch_keys)
      |> Store.fetch()

    {:reply, {registry_key, predictions}, new_state}
  end

  @impl GenServer
  def handle_info(:broadcast, state) do
    registry_key = self()

    Registry.dispatch(@subscribers, registry_key, fn entries ->
      entries
      |> Enum.uniq_by(fn {pid, {fetch_keys, _}} ->
        {pid, fetch_keys}
      end)
      |> Enum.each(&send_data/1)
    end)

    {:noreply, state}
  end

  def handle_info(:timed_broadcast, state) do
    send(self(), :broadcast)
    broadcast_timer()
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
    {%Predictions.StreamTopic{streams: streams}, new_state} = Map.pop(state, caller_pid)

    Enum.each(streams, fn stream ->
      # Here we can check if there are other subscribers for the associated key.
      # If there are no other subscribers remaining, we stop the associated
      # predictions data stream.
      if no_other_subscribers?(stream, caller_pid) do
        StreamSupervisor.stop_stream(stream)
      end
    end)

    {:noreply, new_state}
  end

  # find registrations for this filter from processes other than the indicated pid
  defp no_other_subscribers?(stream, pid_to_omit) do
    registry_key = self()
    pattern = {registry_key, :"$2", {:_, stream}}
    guards = [{:"=/=", :"$2", pid_to_omit}]
    body = [true]
    Registry.select(@subscribers, [{pattern, guards, body}]) == []
  end

  @spec send_data({pid, registry_value()}) :: broadcast_message()
  defp send_data({pid, {fetch_keys, _}}) do
    new_predictions = fetch_keys |> Store.fetch()
    send(pid, {:new_predictions, new_predictions})
  end

  defp broadcast_timer(interval \\ @broadcast_interval_ms) do
    Process.send_after(self(), :timed_broadcast, interval)
  end
end
