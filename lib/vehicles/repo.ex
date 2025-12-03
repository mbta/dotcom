defmodule Vehicles.Repo do
  @moduledoc """
  Repository for Vehicles. Vehicles are updated via server-sent events in Vehicles.Stream.
  This module listens to that stream and updates the local cache (ETS table) when things change,
  and also has public functions for retrieving vehicles from the cache.
  """

  use GenServer
  alias Vehicles.Vehicle
  alias Vehicles.Repo.Behaviour

  @behaviour Behaviour

  @impl Behaviour
  def route(route_id, opts \\ []) do
    direction_id =
      case Keyword.fetch(opts, :direction_id) do
        {:ok, dir} -> dir
        :error -> :_
      end

    opts
    |> Keyword.get(:name, __MODULE__)
    |> :ets.select([{{:_, route_id, direction_id, :_, :"$1"}, [], [:"$1"]}])
  end

  @impl Behaviour
  def trip(trip_id, opts \\ []) do
    opts
    |> Keyword.get(:name, __MODULE__)
    |> :ets.select([{{:_, :_, :_, trip_id, :"$1"}, [], [:"$1"]}])
    |> case do
      [%Vehicle{} = vehicle] ->
        vehicle

      [] ->
        nil

      [%Vehicle{} | _] = vehicles ->
        # Trips can sometimes get "overloaded" with vehicles, i.e. when running extra service.
        # For simplicity's sake, our repo always returns a single vehicle for a trip.
        # We sort by vehicle id to ensure that all servers will return the same vehicle.
        # See https://github.com/mbta/dotcom/pull/2753 for further details.
        [vehicle | _] = Enum.sort_by(vehicles, fn %{id: id} -> id end)
        vehicle
    end
  end

  @impl Behaviour
  def all(opts \\ []) do
    opts
    |> Keyword.get(:name, __MODULE__)
    |> :ets.select([{{:_, :_, :_, :_, :"$1"}, [], [:"$1"]}])
  end

  def sync_send(genserver, {event, data}) do
    # used by tests to send events to the cache
    GenServer.call(genserver, {event, data})
  end

  #
  # GenServer internal methods
  #

  def start_link(opts) do
    opts = Keyword.put_new(opts, :name, __MODULE__)
    GenServer.start_link(__MODULE__, opts, name: Keyword.fetch!(opts, :name))
  end

  @impl GenServer
  def init(opts) do
    ets =
      opts
      |> Keyword.fetch!(:name)
      |> :ets.new([:named_table, :protected])

    pubsub_fn = Keyword.get(opts, :pubsub_fn, &Phoenix.PubSub.subscribe/2)
    _ = pubsub_fn.(Vehicles.PubSub, "vehicles")

    {:ok, %{ets: ets}}
  end

  @impl GenServer
  def handle_call({event, data}, _from, state) do
    {:noreply, state} = handle_info({event, data}, state)
    {:reply, :ok, state}
  end

  @impl GenServer
  def handle_info({:reset, vehicles}, state) do
    _ = :ets.delete_all_objects(state.ets)
    [] = :ets.tab2list(state.ets)
    _ = add_vehicles(vehicles, state.ets)
    {:noreply, state}
  end

  def handle_info({:add, [%Vehicle{} = vehicle]}, state) do
    _ = add_vehicles([vehicle], state.ets)
    {:noreply, state}
  end

  def handle_info({:update, [%Vehicle{} = vehicle]}, %{ets: ets} = state) do
    _ = add_vehicles([vehicle], ets)
    {:noreply, state}
  end

  def handle_info({:remove, [<<id::binary>>]}, %{ets: ets} = state) do
    _ = :ets.delete(ets, id)
    {:noreply, state}
  end

  @spec add_vehicles([Vehicle.t()], atom) :: true
  defp add_vehicles(vehicles, tab) when is_list(vehicles) do
    items =
      for vehicle <- vehicles do
        {
          vehicle.id,
          vehicle.route_id,
          vehicle.direction_id,
          vehicle.trip_id,
          vehicle
        }
      end

    :ets.insert(tab, items)
  end
end
