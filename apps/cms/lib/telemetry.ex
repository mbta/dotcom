defmodule CMS.Telemetry do
  use Supervisor

  alias Telemetry.Metrics

  def start_link(arg) do
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)
  end

  def init(_arg) do
    children = [
      {:telemetry_poller, measurements: periodic_measurements(), period: 30_000},
      {CMS.Telemetry.Reporter, metrics: [Metrics.last_value("cms.repo.stats.updates")]},
      {TelemetryMetricsStatsd, metrics: metrics()}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  defp metrics do
    [
      Metrics.last_value("cms.repo.stats.hits"),
      Metrics.last_value("cms.repo.stats.misses")
    ]
  end

  defp periodic_measurements do
    [
      {CMS.Repo, :dispatch_stats, []}
    ]
  end
end
