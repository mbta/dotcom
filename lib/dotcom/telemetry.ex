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
      Metrics.last_value("vm.memory.total", unit: {:byte, :kilobyte}),
      Metrics.last_value("vm.memory.processes", unit: {:byte, :kilobyte}),
      Metrics.last_value("vm.memory.atom", unit: {:byte, :kilobyte}),
      Metrics.last_value("vm.memory.binary", unit: {:byte, :kilobyte}),
      Metrics.last_value("vm.memory.code", unit: {:byte, :kilobyte}),
      Metrics.last_value("vm.memory.ets", unit: {:byte, :kilobyte}),
      Metrics.last_value("vm.total_run_queue_lengths.total"),
      Metrics.last_value("vm.total_run_queue_lengths.cpu"),
      Metrics.last_value("vm.system_counts.process_count"),
      Metrics.summary("phoenix.router_dispatch.stop.duration",
        tags: [:controller_action],
        tag_values: &tag_controller_action/1,
        unit: {:native, :millisecond}
      )
    ]
  end

  # Extracts controller#action from route dispatch
  defp tag_controller_action(%{plug: plug, plug_opts: plug_opts}) when is_atom(plug_opts) do
    %{controller_action: "#{inspect(plug)}##{plug_opts}"}
  end

  defp tag_controller_action(%{plug: plug}) do
    %{controller_action: inspect(plug)}
  end
end
