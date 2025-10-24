defmodule Predictions.Store do
  @moduledoc """
  Server for saving and editing predictions in an ETS table. Predictions are
  added, removed, and updated by other processes via `update/2`. Predictions can
  be retrieved using `fetch/1` for any combination of values specified of
  `fetch_keys`.
  """

  use GenServer

  require Logger

  alias Predictions.Prediction
  alias Predictions.Store.Behaviour

  @behaviour Behaviour

  @spec start_link(Keyword.t()) :: GenServer.on_start()
  def start_link(_) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  @doc "Deletes predictions associated with the input fetch keys, e.g. clear([route: 'Red', direction: 1])"
  @impl Behaviour
  def clear(keys) do
    GenServer.cast(__MODULE__, {:remove, Enum.map(fetch(keys), & &1.id)})
  end

  @impl Behaviour
  def fetch(keys) do
    GenServer.call(__MODULE__, {:fetch, keys})
  end

  @impl Behaviour
  def update({event, predictions}) do
    GenServer.cast(__MODULE__, {event, predictions})
  end

  # Server
  @impl GenServer
  def init(_) do
    table = :ets.new(__MODULE__, [:public, {:write_concurrency, true}, {:read_concurrency, true}])
    periodic_delete()
    {:ok, table}
  end

  @impl GenServer
  def handle_cast({_, []}, table), do: {:noreply, table}

  def handle_cast({event, predictions}, table) when event in [:add, :update] do
    :ets.insert(table, Enum.map(predictions, &to_record/1))

    {:noreply, table}
  end

  def handle_cast({:remove, prediction_ids}, table) do
    Logger.info("Remove predictions event: #{inspect(prediction_ids)}")

    for id <- prediction_ids do
      :ets.delete(table, id)
    end

    {:noreply, table}
  end

  def handle_cast(_, table), do: {:noreply, table}

  @impl GenServer
  def handle_call({:fetch, keys}, _from, table) do
    predictions = predictions_for_keys(table, keys)
    {:reply, predictions, table}
  end

  @impl GenServer
  def handle_info(:periodic_delete, table) do
    now = Util.now() |> DateTime.to_unix()

    # delete predictions with a time earlier than a minute ago
    :ets.select_delete(table, [
      {{
         :_,
         :"$1",
         :_,
         :_,
         :_,
         :_,
         :_,
         :_
       }, [{:<, :"$1", now - 60}], [true]}
    ])

    periodic_delete()
    {:noreply, table}
  end

  @spec predictions_for_keys(:ets.table(), Behaviour.fetch_keys()) :: [Prediction.t()]
  defp predictions_for_keys(table, opts) do
    match_pattern = {
      Keyword.get(opts, :prediction_id, :_) || :_,
      :_,
      Keyword.get(opts, :route, :_) || :_,
      Keyword.get(opts, :stop, :_) || :_,
      Keyword.get(opts, :direction, :_) || :_,
      Keyword.get(opts, :trip, :_) || :_,
      Keyword.get(opts, :vehicle_id, :_) || :_,
      :"$1"
    }

    :ets.select(table, [{match_pattern, [], [:"$1"]}])
  end

  defp to_record(
         %Prediction{
           id: id,
           time: time,
           route: route,
           stop: stop,
           direction_id: direction,
           trip: trip,
           vehicle_id: vehicle_id
         } = prediction
       ) do
    {
      id,
      if(time, do: DateTime.to_unix(time)),
      if(route, do: route.id),
      if(stop, do: stop.id),
      direction,
      if(trip, do: trip.id),
      vehicle_id,
      prediction
    }
  end

  defp periodic_delete do
    Process.send_after(self(), :periodic_delete, 300_000)
  end
end
