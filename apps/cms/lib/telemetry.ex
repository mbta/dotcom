defmodule CMS.Telemetry do
  use Supervisor

  import Telemetry.Metrics, only: [last_value: 2]

  def start_link(arg) do
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)
  end

  def init(_arg) do
    children = [
      # Configure `:telemetry_poller` for reporting the cache stats
      {:telemetry_poller, measurements: periodic_measurements(), period: 30_000},

      # For example, we use the console reporter, but you can change it.
      # See `:telemetry_metrics` for for information.
      {Telemetry.Metrics.ConsoleReporter, metrics: metrics()}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  defp metrics do
    [
      # Nebulex Stats Metrics
      last_value("cms.repo.stats.hits", tags: [:cache]),
      last_value("cms.repo.stats.misses", tags: [:cache]),
      last_value("cms.repo.stats.writes", tags: [:cache]),
      last_value("cms.repo.stats.updates", tags: [:cache]),
      last_value("cms.repo.stats.evictions", tags: [:cache]),
      last_value("cms.repo.stats.expirations", tags: [:cache])
    ]
  end

  defp periodic_measurements do
    [
      {CMS.Repo, :dispatch_stats, []}
    ]
  end
end
