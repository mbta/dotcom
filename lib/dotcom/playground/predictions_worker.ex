defmodule Dotcom.Playground.PredictionsWorker do
  use GenServer

  # Client
  def subscribe(caller_pid, params) do
    GenServer.start_link(__MODULE__, params, name: process_name(params))
    |> case do
      {:ok, pid} ->
        dbg("New Subscription #{inspect(pid)}")
        pid

      {:error, {:already_started, pid}} ->
        dbg("Existing Subscription #{inspect(pid)}")
        pid
    end
    |> GenServer.cast({:subscribe, caller_pid})
  end

  def unsubscribe(caller_pid, params) do
    params
    |> process_name()
    |> GenServer.whereis()
    |> GenServer.cast({:unsubscribe, caller_pid})
  end

  # Server
  def init(params) do
    {:ok, %{params: params, subscribers: MapSet.new()}}
  end

  def terminate(_reason, state) do
    dbg("TERMINATE #{inspect(state)}")
    :ok
  end

  def handle_cast({:subscribe, pid}, %{params: params, subscribers: subscribers} = state) do
    dbg("SUBSCRIBE #{inspect(pid)} TO #{inspect(params)}")

    new_subscribers =
      subscribers
      |> MapSet.put(pid)
      |> dbg()

    {:noreply, %{state | subscribers: new_subscribers}}
  end

  def handle_cast({:unsubscribe, pid}, %{params: params, subscribers: subscribers} = state) do
    dbg("UNSUBSCRIBE #{inspect(pid)} FROM #{inspect(params)}")

    new_subscribers =
      subscribers
      |> MapSet.delete(pid)
      |> dbg()

    new_state = %{state | subscribers: new_subscribers}

    if Enum.empty?(new_subscribers) do
      {:stop, :normal, new_state}
    else
      {:noreply, new_state}
    end
  end

  defp process_name(params) do
    {:global, {:predictions, params}}
  end
end
