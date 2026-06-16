defmodule DotcomWeb.Stats do
  @moduledoc """
  This GenServer attaches to telemetry events emitted by Phoenix and aggregates them by path and status.
  """

  use GenServer

  @doc """
  Starts the GenServer.
  """
  def start_link(_initial_value \\ %{}) do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  @doc """
  Dispatches the aggregated stats.
  """
  def dispatch_stats do
    GenServer.call(__MODULE__, :dispatch_stats)
  end

  @doc """
  Attaches to the Phoenix telemetry events.
  """
  def init(_) do
    :telemetry.attach(
      "phoenix-router_dispatch-stop",
      [:phoenix, :router_dispatch, :stop],
      &__MODULE__.handle_event/4,
      nil
    )

    Telemetry.Stats.new_table(__MODULE__)

    {:ok, nil}
  end

  @doc """
  Handles synchronous call to dispatch and reset the stats.
  """
  def handle_call(:dispatch_stats, _from, state) do
    Telemetry.Stats.dispatch_stats(__MODULE__, [:dotcom_web, :request], :method)
    {:reply, :ok, state}
  end

  @doc """
  Handles telemetry events and aggregates them by path and status directly in the ETS table.
  """
  def handle_event(_name, measurement, metadata, _config) do
    method = metadata.conn.method
    path = metadata.route
    status = metadata.conn.status
    duration = measurement[:duration]

    Telemetry.Stats.record_stat(__MODULE__, method, path, status, duration)
  end
end
