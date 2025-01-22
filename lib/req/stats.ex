defmodule Req.Stats do
  @moduledoc """
  This Agent attaches to telemetry events emitted by Finch (used by Req) and aggregates them by host, path, and status.
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
  Handles telemetry events and aggregates them by host, path, and status.
  """
  def handle_event(_name, measurement, metadata, _config) do
    host = metadata.request.host
    path = strip_filename(metadata.request.path)
    status = metadata.status
    duration = measurement[:duration]

    Agent.update(__MODULE__, fn state ->
      if Kernel.get_in(state, [host, path, status]) do
        Kernel.update_in(state, [host, path, status], &(&1 ++ [duration]))
      else
        Kernel.put_in(state, [Access.key(host, %{}), Access.key(path, %{}), status], [duration])
      end
    end)
  end

  @doc """
  Dispatches the aggregated stats to the `[:req, :request]` telemetry event.

  Resets the Agent state after dispatching the stats.
  """
  def dispatch_stats do
    Enum.each(Agent.get(__MODULE__, & &1), &dispatch_host/1)

    Agent.update(__MODULE__, fn _ -> %{} end)
  end

  defp dispatch_host({host, stats}) do
    Enum.each(stats, fn {path, statuses} ->
      Enum.each(statuses, fn {status, durations} ->
        dispatch_stat(host, path, status, durations)
      end)
    end)
  end

  defp dispatch_stat(host, path, status, durations) do
    count = Enum.count(durations)

    avg =
      durations
      |> Enum.sum()
      |> Kernel.div(count)
      |> System.convert_time_unit(:native, :millisecond)

    :telemetry.execute([:req, :request], %{count: count, avg: avg}, %{
      host: host,
      path: path,
      status: status
    })
  end

  defp strip_filename(path) do
    path
    |> then(&Regex.replace(~r/\/$/, &1, ""))
    |> then(&Regex.replace(~r/[\w|-]+\.\w+/, &1, ""))
  end
end
