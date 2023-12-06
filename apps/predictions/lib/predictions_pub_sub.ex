defmodule Predictions.PredictionsPubSub do
  @moduledoc """
  Allow channels to subscribe to prediction streams, which are collected into an
  ETS table keyed by prediction ID, route ID, stop ID, direction ID, trip ID,
  and vehicle ID for easy retrieval.

  Set up to broadcast predictions periodically, or can be broadcast on-demand.
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

    {:ok,
     %{
       callers_by_pid: %{},
       last_dispatched_by_fetch_keys: %{}
     }}
  end

  @impl GenServer
  def handle_call(
        {:subscribe, stream_filter},
        {from_pid, _ref},
        %{
          callers_by_pid: callers
        } = state
      ) do
    registry_key = self()

    # Let us detect when the calling process goes down, and save the associated
    # API params for easier lookup
    Process.monitor(from_pid)
    new_state = %{state | callers_by_pid: Map.put_new(callers, from_pid, stream_filter)}

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
      Enum.group_by(
        entries,
        fn {_, {fetch_keys, _}} -> fetch_keys end,
        fn {pid, {_, _}} -> pid end
      )
      |> Enum.each(fn {fetch_keys, pids} ->
        new_predictions = Store.fetch(fetch_keys)
        send(self(), {:dispatch, Enum.uniq(pids), fetch_keys, new_predictions})
      end)
    end)

    {:noreply, state}
  end

  def handle_info(:timed_broadcast, state) do
    send(self(), :broadcast)
    broadcast_timer()
    {:noreply, state}
  end

  def handle_info(
        {:dispatch, pids, fetch_keys, predictions},
        %{
          last_dispatched_by_fetch_keys: last_dispatched
        } = state
      ) do
    if not_last_dispatched?(last_dispatched, fetch_keys, predictions) do
      Enum.each(pids, &send(&1, {:new_predictions, predictions}))

      {:noreply,
       %{
         state
         | last_dispatched_by_fetch_keys: Map.put_new(last_dispatched, fetch_keys, predictions)
       }}
    else
      {:noreply, state}
    end
  end

  def handle_info(
        {:DOWN, parent_ref, :process, caller_pid, _reason},
        %{
          callers_by_pid: callers
        } = state
      ) do
    Process.demonitor(parent_ref, [:flush])
    {%Predictions.StreamTopic{streams: streams}, new_callers} = Map.pop(callers, caller_pid)

    Enum.each(streams, fn stream ->
      # Here we can check if there are other subscribers for the associated key.
      # If there are no other subscribers remaining, we stop the associated
      # predictions data stream.
      if no_other_subscribers?(stream, caller_pid) do
        StreamSupervisor.stop_stream(stream)
      end
    end)

    {:noreply, %{state | callers_by_pid: new_callers}}
  end

  defp not_last_dispatched?(last_dispatched, fetch_keys, predictions) do
    Map.get(last_dispatched, fetch_keys) != predictions
  end

  # find registrations for this filter from processes other than the indicated pid
  defp no_other_subscribers?(stream, pid_to_omit) do
    registry_key = self()
    pattern = {registry_key, :"$2", {:_, stream}}
    guards = [{:"=/=", :"$2", pid_to_omit}]
    body = [true]
    Registry.select(@subscribers, [{pattern, guards, body}]) == []
  end

  defp broadcast_timer(interval \\ @broadcast_interval_ms) do
    Process.send_after(self(), :timed_broadcast, interval)
  end
end
