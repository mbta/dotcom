defmodule Req.Stats do
  @moduledoc """
  This GenServer attaches to telemetry events emitted by Finch (used by Req) and aggregates them by host, path, and status.
  """

  use GenServer

  @doc """
  Starts the GenServer.
  """
  def start_link(_initial_value \\ %{}) do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  @doc """
  Dispatches the aggregated stats to the `[:req, :request]` telemetry event.
  """
  def dispatch_stats do
    GenServer.call(__MODULE__, :dispatch_stats)
  end

  @doc """
  Attaches to the Req telemetry events.
  """
  def init(_) do
    :telemetry.attach("finch-recv-stop", [:finch, :recv, :stop], &__MODULE__.handle_event/4, nil)

    Telemetry.Stats.new_table(__MODULE__)

    {:ok, nil}
  end

  @doc """
  Handles synchronous call to dispatch and reset the stats.
  """
  def handle_call(:dispatch_stats, _from, state) do
    Telemetry.Stats.dispatch_stats(__MODULE__, [:req, :request], :host)
    {:reply, :ok, state}
  end

  @doc """
  Handles telemetry events and aggregates them by host, path, and status directly in the ETS table.
  """
  def handle_event(_name, measurement, metadata, _config) do
    host = metadata.request.host
    path = Path.dirname(metadata.request.path)
    status = metadata.status
    duration = measurement[:duration]

    Telemetry.Stats.record_stat(__MODULE__, host, path, status, duration)
  end
end
