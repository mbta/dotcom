defmodule Dotcom.Playground.PredictionBroadcaster do
  use GenServer

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: opts |> Keyword.get(:name))
  end

  def init(opts) do
    dbg(opts)
    {:ok, %{}}
  end

  def handle_info(
        {:predictions, predictions},
        state
      ) do
    dbg(predictions)
    {:noreply, state}
  end
end
