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

  @spec update(atom, [Prediction.t()]) :: :ok
  def update(event, predictions) do
    GenServer.cast(__MODULE__, {event, predictions})
  end

  # Server
  @impl GenServer
  def init(opts) do
    table = :ets.new(Keyword.get(opts, :name, __MODULE__), [:public])
    {:ok, table}
  end

  @impl true
  def handle_cast({event, predictions}, table) when event in [:add, :update, :reset] do
    :ets.insert(table, Enum.map(predictions, &to_record/1))

    {:noreply, table}
  end

  def handle_cast({:remove, predictions}, table) do
    Logger.info("Remove predictions event: #{inspect(Enum.map(predictions, & &1.id))}")

    for id <- Enum.map(predictions, & &1.id) do
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

  @spec predictions_for_keys(:ets.table(), fetch_keys) :: [Prediction.t()]
  defp predictions_for_keys(table, opts) do
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

  defp to_record(
         %Prediction{
           id: id,
           route: route,
           stop: stop,
           direction_id: direction,
           trip: trip,
           vehicle_id: vehicle_id
         } = prediction
       ) do
    {
      id,
      if(route, do: route.id),
      if(stop, do: stop.id),
      direction,
      if(trip, do: trip.id),
      vehicle_id,
      prediction
    }
  end
end
