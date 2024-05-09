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
          metrics: metrics(),
          token: telemetry_metrics_splunk_config[:token],
          url: telemetry_metrics_splunk_config[:url]
        ]
      }
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  defp metrics do
    [
      Metrics.last_value("vm.memory.total", unit: :byte),
      Metrics.last_value("vm.total_run_queue_lengths.total"),
      Metrics.last_value("vm.total_run_queue_lengths.cpu"),
      Metrics.last_value("vm.system_counts.process_count")
    ]
  end
end
