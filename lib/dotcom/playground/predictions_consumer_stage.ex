defmodule Dotcom.Playground.PredictionsConsumerStage do
  use GenStage

  def start_link(caller_pid) do
    GenStage.start_link(__MODULE__, %{caller_pid: caller_pid})
  end

  def stop(pid) do
    GenStage.stop(pid)
  end

  def terminate(_reason, _state), do: :ok

  def init(state) do
    {:consumer, state}
  end

  def handle_events(events, _from, %{caller_pid: caller_pid} = state) do
    send(caller_pid, {:prediction_events, events})
    {:noreply, [], state}
  end
end
