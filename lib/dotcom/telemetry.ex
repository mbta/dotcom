defmodule Dotcom.Telemetry do
  @moduledoc """
  This Supervisor establishes sends vm stats to the `TelemetryMetricsSplunk` reporter.
  No polling occurs as these metrics are emitted regularly anyway.
  """

  use Supervisor

  alias Telemetry.Metrics

  @doc """
  Starts the supervisor.
  """
  def start_link(arg) do
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)
  end

  @doc """
  Initializes the supervisor.
  """
  def init(_arg) do
    telemetry_metrics_splunk_config = Application.get_env(:dotcom, :telemetry_metrics_splunk)

    children = [
      {
        TelemetryMetricsSplunk,
        [
          finch: Telemetry.Finch,
          index: telemetry_metrics_splunk_config[:index],
          metrics: metrics(),
          token: telemetry_metrics_splunk_config[:token],
          url: telemetry_metrics_splunk_config[:url]
        ]
      }
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  def metrics do
    [
      Metrics.last_value("vm.memory.total",
        description: "Total Allocated Memory KB",
        unit: {:byte, :megabyte}
      ),
      Metrics.last_value("vm.total_run_queue_lengths.total", description: "Run Queue (Total)"),
      Metrics.last_value("vm.total_run_queue_lengths.cpu", description: "Run Queue (CPU)"),
      Metrics.last_value("vm.system_counts.process_count", description: "Process Count")
    ]
  end
end
