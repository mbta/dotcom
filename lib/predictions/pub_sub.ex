defmodule Predictions.PubSub do
  @moduledoc """
  Allow channels to subscribe to prediction streams, which are collected into an
  ETS table keyed by prediction ID, route ID, stop ID, direction ID, trip ID,
  and vehicle ID for easy retrieval.

  Set up to broadcast predictions periodically, or can be broadcast on-demand.
  """

  use GenServer

  alias Predictions.{Prediction, Store, StreamSupervisor, StreamTopic}
  alias Predictions.PubSub.Behaviour

  @broadcast_interval_ms Application.compile_env!(:dotcom, [:predictions_broadcast_interval_ms])
  @predictions_phoenix_pub_sub Application.compile_env!(:dotcom, [:predictions_phoenix_pub_sub])
  @predictions_store Application.compile_env!(:dotcom, [:predictions_store])
  @subscribers :prediction_subscriptions_registry
  @callers_table :callers_by_pid

  @type registry_value :: {Store.fetch_keys(), binary()}
  @type broadcast_message :: {:new_predictions, [Prediction.t()]}

  @behaviour Behaviour

  # Client
  @spec start_link(Keyword.t()) :: GenServer.on_start()
  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @impl Behaviour
  def subscribe(topic) do
    caller_pid = self()

    case StreamTopic.new(topic) do
      %StreamTopic{fetch_keys: fetch_keys} = stream_topic ->
        :ok = StreamTopic.start_streams(stream_topic)
        new_callers = Enum.map(stream_topic.streams, &{caller_pid, elem(&1, 1)})
        :ets.insert(@callers_table, new_callers)

        for key <- StreamTopic.registration_keys(stream_topic) do
          Registry.register(@subscribers, __MODULE__, key)
        end

        @predictions_store.fetch(fetch_keys)

      {:error, _} = error ->
        error
    end
  end

  @impl Behaviour
  def unsubscribe() do
    caller_pid = self()
    Registry.unregister(@subscribers, __MODULE__)
    # Here we can check if there are other subscribers for the associated key.
    # If there are no other subscribers remaining, we stop the associated
    # predictions data stream.
    :ets.lookup(@callers_table, caller_pid)
    |> Enum.each(fn {_, filter_name} ->
      other_pids_for_filter =
        :ets.select(@callers_table, [
          {{:"$1", filter_name}, [{:"=/=", :"$1", caller_pid}], [:"$1"]}
        ])

      if other_pids_for_filter == [] do
        StreamSupervisor.stop_stream(filter_name)
      end
    end)

    :ets.delete(@callers_table, caller_pid)
  end

  # Server

  @impl GenServer
  def init(_) do
    Phoenix.PubSub.subscribe(@predictions_phoenix_pub_sub, "predictions")

    broadcast_timer(50)

    _ =
      :ets.new(@callers_table, [
        :bag,
        :public,
        :named_table,
        write_concurrency: true,
        read_concurrency: true
      ])

    {:ok, %{}}
  end

  @impl GenServer
  def handle_info(:broadcast, state) do
    :ok =
      Registry.dispatch(@subscribers, __MODULE__, fn entries ->
        entries
        |> Enum.group_by(
          fn {_, {fetch_keys, _}} -> fetch_keys end,
          fn {pid, {_, _}} -> pid end
        )
        |> Enum.each(fn {fetch_keys, pids} ->
          new_predictions = @predictions_store.fetch(fetch_keys)

          pids
          |> Enum.uniq()
          |> Enum.each(&send(&1, {:new_predictions, new_predictions}))
        end)
      end)

    {:noreply, state, :hibernate}
  end

  def handle_info(:timed_broadcast, state) do
    send(self(), :broadcast)
    broadcast_timer()
    {:noreply, state, :hibernate}
  end

  defp broadcast_timer(interval \\ @broadcast_interval_ms) do
    Process.send_after(self(), :timed_broadcast, interval)
  end
end
