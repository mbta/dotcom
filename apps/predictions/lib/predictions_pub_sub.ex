defmodule Predictions.PredictionsPubSub do
  @moduledoc """
  Allow channels to subscribe to prediction streams, which are collected into an
  ETS table keyed by prediction ID, route ID, stop ID, direction ID, trip ID,
  and vehicle ID for easy retrieval.
  """

  use GenServer

  alias Predictions.{Prediction, StreamSupervisor}
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  @valid_filters ["route", "stop", "direction", "trip"]
  @broadcast_interval_ms Application.compile_env!(:predictions, [:broadcast_interval_ms])

  @type direction_id_t :: 0 | 1
  @type table_t :: :ets.table()
  @type state :: %{ets: table_t}
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
    Registry.register(:prediction_subscriptions_registry, registry_key, key)
    predictions
  end

  # Server

  @impl GenServer
  @spec init(keyword) :: {:ok, state}
  def init(opts) do
    table = :ets.new(:predictions_store, [:public])
    subscribe_fn = Keyword.get(opts, :subscribe_fn, &Phoenix.PubSub.subscribe/2)
    subscribe_fn.(Predictions.PubSub, "predictions")
    broadcast_timer(@broadcast_interval_ms)
    {:ok, %{ets: table}}
  end

  @impl GenServer
  def handle_call({:subscribe, keys}, _from, %{ets: table}) do
    registry_key = self()
    predictions = predictions_for_keys(table, keys)
    {:reply, {registry_key, predictions}, %{ets: table}}
  end

  @impl GenServer
  def handle_info({event, predictions}, %{ets: table}) when event in [:add, :update, :reset] do
    # inserts will overwrite existing matching prediction IDs
    _ = :ets.insert(table, Enum.map(predictions, &to_record/1))
    {:noreply, %{ets: table}}
  end

  def handle_info({:remove, predictions_to_remove}, %{ets: table}) do
    for id <- Enum.map(predictions_to_remove, & &1.id) do
      :ets.delete(table, id)
    end

    {:noreply, %{ets: table}}
  end

  def handle_info(:broadcast, state) do
    registry_key = self()

    Registry.dispatch(:prediction_subscriptions_registry, registry_key, fn entries ->
      Enum.each(entries, &send_data(&1, state))
    end)

    broadcast_timer(@broadcast_interval_ms)
    {:noreply, state}
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

  @spec predictions_for_keys(table_t(), String.t()) :: [Prediction.t()]
  def predictions_for_keys(table, keys) do
    opts = table_keys(keys)
    # turn opts into ETS match
    match_pattern = {
      Keyword.get(opts, :prediction_id, :_) || :_,
      Keyword.get(opts, :route, :_) || :_,
      Keyword.get(opts, :stop, :_) || :_,
      Keyword.get(opts, :direction, :_) || :_,
      Keyword.get(opts, :trip, :_) || :_,
      Keyword.get(opts, :vehicle_id, :_) || :_,
      :"$1"
    }

    :ets.select(table, [{match_pattern, [], [:"$1"]}])
  end

  @spec send_data({pid, String.t()}, state) :: broadcast_message()
  defp send_data({pid, keys}, %{ets: table}) do
    new_predictions = predictions_for_keys(table, keys)
    send(pid, {:new_predictions, new_predictions})
  end

  def to_record(prediction) do
    {prediction.id, prediction.route.id, prediction.stop.id,
     if(is_integer(prediction.direction_id), do: Integer.to_string(prediction.direction_id)),
     if(prediction.trip, do: prediction.trip.id, else: nil), prediction.vehicle_id, prediction}
  end

  defp broadcast_timer(interval) do
    Process.send_after(self(), :broadcast, interval)
  end
end
