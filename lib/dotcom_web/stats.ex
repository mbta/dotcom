defmodule DotcomWeb.Stats do
  @moduledoc """
  This Agent attaches to telemetry events emitted by Phoenix and aggregates them.
  """

  use Agent

  @doc """
  Starts the Agent and attaches to `[:phoenix, :router_dispatch, :stop]` telemetry events.
  """
  def start_link(initial_value \\ %{}) do
    :telemetry.attach(
      "phoenix-router_dispatch-stop",
      [:phoenix, :router_dispatch, :stop],
      &__MODULE__.handle_event/4,
      nil
    )

    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end

  @doc """
  Handles telemetry events and aggregates them by path and status.
  """
  def handle_event(_name, measurement, metadata, _config) do
    method = metadata.conn.method
    path = metadata.route
    status = metadata.conn.status
    duration = measurement[:duration]

    Agent.update(__MODULE__, fn state ->
      if Kernel.get_in(state, [method, path, status]) do
        Kernel.update_in(state, [method, path, status], &(&1 ++ [duration]))
      else
        Kernel.put_in(state, [Access.key(method, %{}), Access.key(path, %{}), status], [duration])
      end
    end)
  end

  @doc """
  Dispatches the aggregated stats to the `[:phoenix, :router_dispatch, :stop]` telemetry event.

  Resets the Agent state after dispatching the stats.
  """
  def dispatch_stats() do
    Enum.each(Agent.get(__MODULE__, & &1), &dispatch_method/1)

    Agent.update(__MODULE__, fn _ -> %{} end)
  end

  defp dispatch_method({method, stats}) do
    Enum.each(stats, fn {path, statuses} ->
      Enum.each(statuses, fn {status, durations} ->
        dispatch_stat(method, path, status, durations)
      end)
    end)
  end

  defp dispatch_stat(method, path, status, durations) do
    count = Enum.count(durations)

    avg =
      durations
      |> Enum.sum()
      |> Kernel.div(count)
      |> System.convert_time_unit(:native, :millisecond)

    :telemetry.execute([:dotcom_web, :request], %{count: count, avg: avg}, %{
      method: method,
      path: path,
      status: status
    })
  end
end
