defmodule Dotcom.Playground.PredictionAggregatorStage do
  use GenStage

  def start_link(opts) do
    dbg("Start aggregator")
    name = opts |> Keyword.get(:name)
    dbg(name)

    dbg(opts)

    result = GenStage.start_link(__MODULE__, opts, name: name)
    dbg(result)
    result
  end

  # def stop(pid) do
  #   GenStage.stop(pid)
  # end

  def terminate(reason, _state) do
    dbg("Terminate")
    dbg(reason)
    :ok
  end

  def init(opts) do
    dbg("Aggregator begins #{inspect(opts)}")

    subscribe_to = opts |> Keyword.get(:subscribe_to)

    {:consumer, %{}, subscribe_to: [subscribe_to]}
  end

  def handle_events(events, _from, state) do
    dbg("Aggregate!")
    dbg(events)
    {:noreply, [], state}
  end
end
