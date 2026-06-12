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
      Telemetry.Stats.record_stat(state, host, path, status, duration)
    end)
  end

  @doc """
  Dispatches the aggregated stats to the `[:req, :request]` telemetry event.

  Resets the Agent state after dispatching the stats.
  """
  def dispatch_stats do
    Agent.get(__MODULE__, & &1)
    |> Telemetry.Stats.dispatch_stats([:req, :request], :host)

    Agent.update(__MODULE__, fn _ -> %{} end)
  end

  defp strip_filename(path) do
    no_slash = Regex.replace(~r/\/$/, path, "")
    Regex.replace(~r/[\w|-]+\.\w+/, no_slash, "")
  end
end
