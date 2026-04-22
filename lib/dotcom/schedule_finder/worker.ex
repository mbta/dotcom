defmodule ScheduleFinder.Worker do
  @moduledoc """
  A process for handling fetching and storing Upcoming Departures
  """

  use GenServer, restart: :transient
  import Dotcom.Utils.DateTime, only: [now: 0]
  alias Dotcom.ScheduleFinder.UpcomingDepartures

  @stale_seconds_max 30

  @type option ::
          {:route_id, Routes.Route.id_t()}
          | {:direction_id, 0 | 1}
          | {:stop_id, Stops.Stop.id_t()}
  @type options :: [option()]

  @doc """
  Create a new worker. One will be started for each unique route/direction/stop.
  """
  @spec start(options()) :: DynamicSupervisor.on_start_child()
  def start(args) do
    DeparturesSupervisor
    |> DynamicSupervisor.start_child({__MODULE__, args})
  end

  @doc """
  If the worker for the given route/direction/stop isn't started, this will start it. Returns the latest upcoming departures.
  """
  @spec get(options()) :: UpcomingDepartures.result()
  def get(args) do
    args
    |> get_or_start_worker_pid()
    |> GenServer.call(:get)
  end

  @spec start_link(options()) :: GenServer.on_start()
  def start_link(args) do
    GenServer.start_link(__MODULE__, args, name: registry_name(args))
  end

  @impl GenServer
  def init(args) do
    now = now()

    # Get current value to eventually save in GenServer state
    Task.async(fn ->
      {now, args, get_departures(args, now)}
    end)

    {:ok, {now, args, nil}}
  end

  @impl GenServer
  def handle_call(:get, from, {updated_at, args, departures} = state) do
    now = now()
    not_stale? = DateTime.diff(now, updated_at, :second) <= @stale_seconds_max

    if not_stale? and not is_nil(departures) do
      # Reply now with current value
      {:reply, departures, state}
    else
      # Reply async with newly-fetched value
      Task.async(fn ->
        departures = get_departures(args, now)
        :ok = GenServer.reply(from, departures)
        {now, args, departures}
      end)

      {:noreply, state}
    end
  end

  def handle_call(_, _, state), do: {:noreply, state}

  @impl GenServer
  # Handle the Task.async/1 result
  def handle_info({ref, new_state}, _state) when is_reference(ref) do
    {:noreply, new_state}
  end

  def handle_info(_, state), do: {:noreply, state}

  defp get_departures(opts, now) do
    UpcomingDepartures.upcoming_departures(%{
      direction_id: opts[:direction_id],
      now: now,
      route_id: opts[:route_id],
      stop_id: opts[:stop_id]
    })
  end

  defp registry_name(args) do
    args
    |> Enum.sort()
    |> Enum.map_join("&", fn {k, v} -> "#{k}:#{v}" end)
    |> then(&{:via, Registry, {DeparturesRegistry, &1}})
  end

  defp get_or_start_worker_pid(args) do
    pid =
      args
      |> registry_name()
      |> GenServer.whereis()

    if is_pid(pid) do
      pid
    else
      case start(args) do
        {:ok, pid} -> pid
        {:error, {:already_started, pid}} -> pid
      end
    end
  end
end
