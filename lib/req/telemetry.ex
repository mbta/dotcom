defmodule Req.Telemetry do
  @moduledoc """
  """

  use Supervisor

  alias Telemetry.Metrics

  def start_link(arg) do
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)
  end

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
      },
      {
        :telemetry_poller,
        measurements: measurements(), period: :timer.seconds(60), init_delay: :timer.seconds(5)
      },
      {Req.Stats, %{}}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  defp measurements do
    [
      {Req.Stats, :dispatch_stats, []}
    ]
  end

  defp metrics do
    [
      Metrics.last_value("req.request.count"),
      Metrics.last_value("req.request.avg")
    ]
  end
end
