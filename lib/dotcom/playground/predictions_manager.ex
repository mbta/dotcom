defmodule Dotcom.Playground.PredictionsManager do
  use GenServer

  alias Dotcom.Playground.PredictionsWorker

  # Client
  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def subscribe(params) do
    GenServer.cast(__MODULE__, {:subscribe, self(), params})
  end

  def unsubscribe() do
    GenServer.cast(__MODULE__, {:unsubscribe, self()})
  end

  # Server
  def init(opts) do
    {:ok, opts}
  end

  def handle_cast({:subscribe, pid, params}, state) do
    PredictionsWorker.subscribe(pid, params)

    {:noreply, state |> Map.put(pid, params)}
  end

  def handle_cast({:unsubscribe, pid}, state) do
    case state do
      %{^pid => params} -> PredictionsWorker.unsubscribe(pid, params)
      _ -> nil
    end

    {:noreply, state |> Map.delete(pid)}
  end
end
