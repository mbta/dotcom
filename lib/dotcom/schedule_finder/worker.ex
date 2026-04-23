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

  def subscribe(args) do
    caller = self()
    # get upcoming departure updates later
    ScheduleFinder.WorkerSubscribers.subscribe(args, caller)
    # return latest upcoming departures immediately
    get(args)
  end

  def unsubscribe(args) do
    caller = self()
    ScheduleFinder.WorkerSubscribers.unsubscribe(args, caller)
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

defmodule ScheduleFinder.WorkerSubscribers do
  use GenServer

  # We can dispatch pretty frequently, because ScheduleFinder.Worker.get/1
  # handles avoiding excessive duplicative computation within a narrow timeframe
  @broadcast_interval_ms 1000
  @callers_table :departure_subscribers

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @impl GenServer
  def init(_) do
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

  def subscribe(args, caller_pid) do
    args = Enum.sort(args)
    :ets.insert(@callers_table, {args, caller_pid})
  end

  def unsubscribe(args, caller_pid) do
    args = Enum.sort(args)
    :ets.delete_object(@callers_table, {args, caller_pid})
  end

  @impl GenServer
  def handle_info(:timed_broadcast, state) do
    send(self(), :broadcast)
    broadcast_timer()
    {:noreply, state}
  end

  def handle_info(:broadcast, state) do
    for args <- subscribed_args() do
      departures = ScheduleFinder.Worker.get(args)

      args
      |> pids_for_args()
      |> Enum.each(fn pid ->
        # uhhh send it
        send(pid, {:new_departures, departures})
      end)
    end

    {:noreply, state, :hibernate}
  end

  defp pids_for_args(args) do
    :ets.lookup_element(@callers_table, args, 2)
  end

  defp subscribed_args do
    @callers_table
    |> :ets.match({:"$1", :_})
    |> Enum.map(fn [arg] -> arg end)
    |> Enum.uniq()
  end

  defp broadcast_timer(interval \\ @broadcast_interval_ms) do
    Process.send_after(self(), :timed_broadcast, interval)
  end
end
