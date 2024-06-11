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
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop
  alias Vehicles.Vehicle

  @type fetch_keys :: [
          prediction_id: Prediction.id_t(),
          route: Route.id_t(),
          stop: Stop.id_t(),
          direction: 0 | 1,
          trip: Trip.id_t(),
          vehicle_id: Vehicle.id_t()
        ]

  @spec start_link(Keyword.t()) :: GenServer.on_start()
  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @spec fetch(fetch_keys) :: [Prediction.t()]
  def fetch(keys) do
    GenServer.call(__MODULE__, {:fetch, keys})
  end

  @spec update({atom, [Prediction.t()]}) :: :ok
  def update({event, predictions}) do
    GenServer.cast(__MODULE__, {event, predictions})
  end

  @doc "Deletes predictions associated with the input fetch keys, e.g. clear([route: 'Red', direction: 1])"
  @spec clear(fetch_keys) :: :ok
  def clear(keys) do
    GenServer.cast(__MODULE__, {:remove, Enum.map(fetch(keys), & &1.id)})
  end

  # Server
  @impl GenServer
  def init(opts) do
    table = :ets.new(Keyword.get(opts, :name, __MODULE__), [:public])
    periodic_delete()
    {:ok, table}
  end

  @impl true
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

  @impl true
  def handle_call({:fetch, keys}, _from, table) do
    predictions = predictions_for_keys(table, keys)
    {:reply, predictions, table}
  end

  @impl true
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

  @spec predictions_for_keys(:ets.table(), fetch_keys) :: [Prediction.t()]
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
