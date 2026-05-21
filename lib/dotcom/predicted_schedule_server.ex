defmodule Dotcom.PredictedScheduleServer do
  @moduledoc """
  New and improved...
  """
  import Dotcom.Utils.DateTime, only: [now: 0]
  import Dotcom.Utils.ServiceDateTime, only: [service_date: 0]

  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  use GenServer

  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]

  @registry Dotcom.PredictionsRegistry

  @type collection_key :: {Trip.id_t(), Stop.id_t(), non_neg_integer()}
  @type collection :: %{collection_key() => PredictedSchedule.t()}
  @type direction_id_t :: 0 | 1

  @doc """
  Kicks off a GenServer which fetches and merges schedules and predictions for a given route-direction pairing.

  The process is restarted only if it terminates abnormally.
  """
  @spec start(Route.id_t(), direction_id_t()) :: DynamicSupervisor.on_start_child()
  def start(route_id, direction_id) do
    # possibly: manually register callers, so we can check them later.
    child_spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [route_id, direction_id]},
      restart: :transient
    }

    DynamicSupervisor.start_child(Dotcom.PredictedSchedulesManager, child_spec)
  end

  # TODO actually terminate so it doesn't go on fooorrrever
  # Check registry to see how many have called it??
  # def stop(route_id, direction_id) do
  #   with {:ok, pid} <- lookup_server_pid(route_id, direction_id) do
  #     GenServer.stop(pid)
  #   end
  # end

  @spec start_link(Route.id_t(), direction_id_t()) :: GenServer.on_start()
  def start_link(route_id, direction_id) do
    GenServer.start_link(__MODULE__, {route_id, direction_id},
      name: {:via, Registry, {@registry, [route_id, direction_id]}}
    )
  end

  # It'd be nice to return something when it times out, instead of EXIT
  @spec for_stop(Route.id_t(), direction_id_t(), Stop.id_t()) :: [PredictedSchedule.t()]
  def for_stop(route_id, direction_id, stop_id) do
    with {:ok, pid} <- lookup_server_pid(route_id, direction_id) do
      GenServer.call(pid, {:by_stop, stop_id})
    end
  end

  @spec for_trip(Route.id_t(), direction_id_t(), Trip.id_t()) :: [PredictedSchedule.t()]
  def for_trip(route_id, direction_id, trip_id) do
    with {:ok, pid} <- lookup_server_pid(route_id, direction_id) do
      GenServer.call(pid, {:by_trip, trip_id})
    end
  end

  defp lookup_server_pid(route_id, direction_id) do
    case Registry.lookup(@registry, [route_id, direction_id]) do
      [{pid, _}] -> {:ok, pid}
      _ -> {:error, :not_started}
    end
  end

  # TODO - timer to switch service date & re-initialize schdeules
  @impl GenServer
  def init({route_id, direction_id}) do
    initial_state = %{
      route_id: route_id,
      direction_id: direction_id,
      collection: %{},
      last_prediction_update: nil
    }

    {:ok, initial_state, {:continue, :init_schedules}}
  end

  # @impl GenServer
  # def terminate(reason, state) do
  #   # Might be closed when no one's watching
  #   :ok
  # end

  @impl GenServer
  def handle_continue(:init_schedules, state) do
    new_state =
      @schedules_repo.by_route_ids([state.route_id],
        direction_id: state.direction_id,
        date: service_date()
      )
      |> Stream.map(&{collection_key(&1), %{schedule: &1}})
      |> reconcile(state)

    {:noreply, new_state, {:continue, :update_predictions}}
  end

  def handle_continue(:update_predictions, state) do
    {:noreply, update_predictions(state)}
  end

  @impl GenServer
  def handle_call({:by_stop, stop_id}, _from, state) do
    state = update_predictions(state)

    ps_for_stop =
      state
      |> predicted_schedules_by_stop()
      |> Map.get(stop_id, [])

    {:reply, ps_for_stop, state}
  end

  def handle_call({:by_trip, trip_id}, _from, state) do
    state = update_predictions(state)

    ps_for_trip =
      state
      |> predicted_schedules_by_trip()
      |> Map.get(trip_id, [])

    {:reply, ps_for_trip, state}
  end

  defp predicted_schedules_by_trip(%{collection: collection}) do
    collection
    |> Enum.group_by(
      fn {{trip_id, _, _}, _} -> trip_id end,
      fn {_, ps} -> ps end
    )
  end

  defp predicted_schedules_by_stop(%{collection: collection}) do
    collection
    |> Enum.group_by(
      fn {{_, _, _}, ps} -> PredictedSchedule.stop(ps) |> Map.get(:id) end,
      fn {_, ps} -> ps end
    )
  end

  defp update_predictions(%{last_prediction_update: datetime} = state) do
    now = now()
    state = Map.update!(state, :collection, &prune_past_trips(&1, now))

    if is_nil(datetime) or DateTime.diff(now, datetime, :second) > 5 do
      state = Map.put(state, :last_prediction_update, now)

      @predictions_repo.all(
        route: state.route_id,
        direction_id: state.direction_id,
        include_terminals: true,
        discard_past_subway_predictions: false
      )
      |> Stream.reject(&is_nil(&1.trip))
      |> Stream.map(&{collection_key(&1), %{prediction: &1}})
      |> reconcile(state)
    else
      state
    end
  end

  defp prune_past_trips(collection, now) do
    collection
    |> Map.reject(fn {_key, ps} ->
      cond do
        PredictedSchedule.trip(ps) == nil ->
          true

        PredictedSchedule.display_time(ps) == nil ->
          true

        true ->
          ps
          |> PredictedSchedule.display_time()
          |> DateTime.diff(now, :minute) <= -5
      end
    end)
  end

  defp reconcile(objects, state) do
    state
    |> Map.update!(:collection, fn collection ->
      Enum.reduce(objects, collection, fn {key, object}, current_collection ->
        Map.update(
          current_collection,
          key,
          struct(PredictedSchedule, object),
          &struct(&1, object)
        )
      end)
    end)
  end

  defp collection_key(%{
         platform_stop_id: platform_stop_id,
         stop_sequence: stop_sequence,
         trip: %Trip{id: trip_id}
       }) do
    {trip_id, platform_stop_id, stop_sequence}
  end
end
