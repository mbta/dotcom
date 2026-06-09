defmodule Dotcom.UpcomingDepartures.Server do
  @moduledoc """
  Worker process that manages fetching upcoming departures and broadcasting them via PubSub for a given route/direction/stop.
  """

  require Logger

  use GenServer, restart: :transient

  @refresh_interval_ms 5000
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @upcoming_departures_module Application.compile_env!(:dotcom, :upcoming_departures_module)

  def start_link(params) do
    GenServer.start_link(__MODULE__, params, name: {:global, params})
  end

  @impl GenServer
  def init(params) do
    %{route_id: route_id, direction_id: direction_id, stop_id: stop_id} = params
    route = @routes_repo.get(route_id)

    departures_fn = fn ->
      @upcoming_departures_module.upcoming_departures(%{
        direction_id: direction_id,
        route: route,
        stop_id: stop_id
      })
    end

    send(self(), :refresh)

    topic = Dotcom.UpcomingDepartures.topic_name(params)
    Logger.notice("Starting server for #{topic}.")

    {:ok, %{departures_fn: departures_fn, topic: topic}}
  end

  @impl GenServer
  def handle_info(:refresh, %{topic: topic} = state) do
    case topic_subscriber_count(topic) do
      0 ->
        Logger.notice("No more subscribers for #{topic}, closing server.")
        {:stop, :normal, state}

      count ->
        Logger.notice("Sending departures for #{topic} to #{count} subscribers")
        :ok = DotcomWeb.Endpoint.broadcast(topic, "upcoming_departures", state.departures_fn.())
        _ = Process.send_after(self(), :refresh, @refresh_interval_ms)

        {:noreply, state}
    end
  end

  def handle_info(_, state), do: {:noreply, state}

  @impl GenServer
  def handle_cast({:subscribe, caller_pid}, state) do
    Logger.notice("subscribing #{inspect(caller_pid)} to #{state.topic}")
    send(caller_pid, {:upcoming_departures, state.departures_fn.()})
    {:noreply, state}
  end

  @impl GenServer
  def terminate(_reason, state) do
    :ok = DotcomWeb.Endpoint.broadcast(state.topic, "upcoming_departures", :terminated)
  end

  defp topic_subscriber_count(topic) do
    case DotcomWeb.Presence.list(topic) do
      %{"upcoming_departures" => %{metas: list}} -> Enum.count(list)
      _other -> 0
    end
  end
end
