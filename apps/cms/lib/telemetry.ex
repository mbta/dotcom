defmodule CMS.Telemetry do
  use Supervisor

  import Telemetry.Metrics, only: [last_value: 2]

  def start_link(arg) do
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)
  end

  def init(_arg) do
    children = [
      {:telemetry_poller, measurements: periodic_measurements(), period: 30_000},
      {TelemetryMetricsStatsd, metrics: metrics()}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  defp metrics do
    [
      last_value("cms.repo.stats.hits", []),
      last_value("cms.repo.stats.misses", [])
    ]
  end

  defp periodic_measurements do
    [
      {CMS.Repo, :dispatch_stats, []}
    ]
  end
end
