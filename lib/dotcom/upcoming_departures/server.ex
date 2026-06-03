defmodule Dotcom.UpcomingDepartures.Server do
  @moduledoc """
  Worker process that manages fetching upcoming departures and broadcasting them via PubSub for a given route/direction/stop.
  """

  require Logger

  use GenServer, restart: :transient

  @refresh_interval_ms 5000
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @upcoming_departures_module Application.compile_env!(:dotcom, :upcoming_departures_module)

  def start(topic) do
    GenServer.start(__MODULE__, topic, name: {:global, topic})
  end

  @impl GenServer
  def init(topic) do
    [_departures, route_id, direction_id, stop_id] = String.split(topic, ":")
    route = @routes_repo.get(route_id)
    direction_id = String.to_integer(direction_id)

    departures_fn = fn ->
      @upcoming_departures_module.upcoming_departures(%{
        direction_id: direction_id,
        route: route,
        stop_id: stop_id
      })
    end

    send(self(), :refresh)

    {:ok, %{departures_fn: departures_fn, topic: topic, subscribers: MapSet.new([])}}
  end

  @impl GenServer
  def handle_info(:refresh, state) do
    :ok = DotcomWeb.Endpoint.broadcast(state.topic, "upcoming_departures", state.departures_fn.())
    _ = Process.send_after(self(), :refresh, @refresh_interval_ms)
    {:noreply, state}
  end

  def handle_info(_, state), do: {:noreply, state}

  @impl GenServer
  def handle_cast({:subscribe, caller_pid}, state) do
    Logger.notice("subscribing #{inspect(caller_pid)} to #{state.topic}")
    new_state = add_subscriber(caller_pid, state)
    send(caller_pid, {:subscribed, state.departures_fn.()})
    {:noreply, new_state}
  end

  def handle_cast({:unsubscribe, caller_pid}, state) do
    Logger.notice("removing #{inspect(caller_pid)} from #{state.topic}")
    new_state = remove_subscriber(caller_pid, state)

    # if there are no more subscribers, stop the worker
    if subscriber_count(new_state) == 0 do
      {:stop, :normal, new_state}
    else
      {:noreply, new_state}
    end
  end

  @impl GenServer
  def terminate(_reason, state) do
    :ok = DotcomWeb.Endpoint.broadcast(state.topic, "upcoming_departures", :terminated)
  end

  defp add_subscriber(caller_pid, state) do
    Map.update(state, :subscribers, MapSet.new(), &MapSet.put(&1, caller_pid))
  end

  defp remove_subscriber(caller_pid, state) do
    Map.update(state, :subscribers, MapSet.new(), &MapSet.delete(&1, caller_pid))
  end

  defp subscriber_count(state) do
    Map.get(state, :subscribers, MapSet.new()) |> MapSet.size()
  end
end
