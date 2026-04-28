defmodule Dotcom.Playground.PredictionsWorker do
  alias Dotcom.Playground.PredictionsSupervisor
  use GenServer

  # Client
  def subscribe(caller_pid, params) do
    GenServer.start_link(__MODULE__, params, name: process_name(params))
    |> case do
      {:ok, pid} ->
        pid

      {:error, {:already_started, pid}} ->
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
    PredictionsSupervisor.start_link(%{params: params, publish_to: self()})

    {:ok, %{params: params, subscribers: MapSet.new()}}
  end

  def terminate(_reason, %{params: params}) do
    PredictionsSupervisor.stop(%{params: params})
  end

  def handle_cast({:subscribe, pid}, %{params: params, subscribers: subscribers} = state) do
    new_subscribers =
      subscribers
      |> MapSet.put(pid)

    {:noreply, %{state | subscribers: new_subscribers}}
  end

  def handle_cast({:unsubscribe, pid}, %{params: params, subscribers: subscribers} = state) do
    new_subscribers =
      subscribers
      |> MapSet.delete(pid)

    new_state = %{state | subscribers: new_subscribers}

    if Enum.empty?(new_subscribers) do
      {:stop, :normal, new_state}
    else
      {:noreply, new_state}
    end
  end

  def handle_info({:predictions_update, data}, %{subscribers: subscribers} = state) do
    subscribers |> Enum.each(&send(&1, {:predictions_update, data}))

    {:noreply, state}
  end

  defp process_name(params) do
    {:global, {:predictions, params}}
  end
end
