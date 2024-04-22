defmodule MBTA.Api.Stats do
  @moduledoc """
  This Agent attaches to telemetry events emitted by Finch and aggregates them by path and status.
  """

  use Agent

  @doc """
  Starts the Agent and attaches to `[:finch, :recv, :stop]` telemetry events.
  """
  def start_link(initial_value \\ %{}) do
    :telemetry.attach("finch-recv-stop", [:finch, :recv, :stop], &__MODULE__.handle_event/4, nil)

    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end

  @doc """
  Handles telemetry events and aggregates them by path and status.
  """
  def handle_event(_name, measurement, metadata, _config) do
    path = path_to_atom(metadata.request.path)
    status = status_to_atom(metadata.status)
    duration = measurement[:duration]

    Agent.update(__MODULE__, fn state ->
      if Kernel.get_in(state, [path, status]) do
        Kernel.update_in(state, [path, status], &(&1 ++ [duration]))
      else
        Kernel.put_in(state, [Access.key(path, %{}), status], [duration])
      end
    end)
  end

  @doc """
  Dispatches the aggregated stats to the `[:mbta_api, :request]` telemetry event.

  Resets the Agent state after dispatching the stats.
  """
  def dispatch_stats() do
    Enum.each(Agent.get(__MODULE__, & &1), &dispatch_path/1)

    Agent.update(__MODULE__, fn _ -> %{} end)
  end

  defp dispatch_path({path, stats}) do
    Enum.each(stats, fn {status, durations} ->
      dispatch_stat(path, status, durations)
    end)
  end

  defp dispatch_stat(path, status, durations) do
    count = Enum.count(durations)

    avg =
      durations
      |> Enum.sum()
      |> Kernel.div(count)

    :telemetry.execute([:mbta_api, :request], %{count: count, avg: avg}, %{
      path: path,
      status: status
    })
  end

  defp path_to_atom(path) do
    path
    |> String.replace(~r{^/|/$}, "")
    |> String.replace(~r{/}, "_")
    |> String.to_atom()
  end

  defp status_to_atom(status) do
    status
    |> Integer.to_string()
    |> String.to_atom()
  end
end
