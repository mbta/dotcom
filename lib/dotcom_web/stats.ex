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
      Telemetry.Stats.record_stat(state, method, path, status, duration)
    end)
  end

  @doc """
  Dispatches the aggregated stats to the `[:phoenix, :router_dispatch, :stop]` telemetry event.

  Resets the Agent state after dispatching the stats.
  """
  def dispatch_stats do
    Agent.get(__MODULE__, & &1)
    |> Telemetry.Stats.dispatch_stats([:dotcom_web, :request], :method)

    Agent.update(__MODULE__, fn _ -> %{} end)
  end
end
