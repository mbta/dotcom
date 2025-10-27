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
    keys
    |> predictions_for_keys()
    |> Enum.map(& &1.id)
    |> Enum.each(&:ets.delete(__MODULE__, &1))
  end

  @impl Behaviour
  def fetch(keys) do
    predictions_for_keys(keys)
  end

  @impl Behaviour
  def update({:remove, prediction_ids}) do
    Enum.each(prediction_ids, &:ets.delete(__MODULE__, &1))
  end

  def update({event, predictions}) do
    if event in [:add, :update] and length(predictions) > 0 do
      :ets.insert(__MODULE__, Enum.map(predictions, &to_record/1))
    end

    :ok
  end

  # Server
  @impl GenServer
  def init(_) do
    _ =
      :ets.new(__MODULE__, [
        :public,
        :named_table,
        {:write_concurrency, true},
        {:read_concurrency, true}
      ])

    periodic_delete()
    {:ok, %{}}
  end

  @impl GenServer
  def handle_info(:periodic_delete, state) do
    now = Util.now() |> DateTime.to_unix()

    # delete predictions with a time earlier than a minute ago
    :ets.select_delete(__MODULE__, [
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
    {:noreply, state}
  end

  @spec predictions_for_keys(Behaviour.fetch_keys()) :: [Prediction.t()]
  defp predictions_for_keys(opts) do
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

    :ets.select(__MODULE__, [{match_pattern, [], [:"$1"]}])
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
