defmodule CMS.Telemetry do
  @moduledoc """
  This supervisor establishes a connection between the telemetry_poller and our telemetry reporters.
  Cache stats are emitted by the Nebulex Redis Adapter.
  We poll for them every minute.

  Currently, they are passed to two reporters:

  The Statsd reporter will eventually be hooked up to Splunk metrics.
  For now, it does no harm to emit them even though nothing is listening.

  The custom reporter logs in a format that can be picked up in Splunk logs.
  Eventually, this should be removed.
  """

  use Supervisor

  alias Telemetry.Metrics

  def start_link(arg) do
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)
  end

  def init(_arg) do
    children = [
      {:telemetry_poller, measurements: periodic_measurements(), period: 60_000},
      {CMS.Telemetry.Reporter, metrics: reporter_metrics()},
      {TelemetryMetricsStatsd, metrics: statsd_metrics()}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  defp reporter_metrics do
    [
      Metrics.last_value("cms.cache.stats.updates")
    ]
  end

  defp statsd_metrics do
    [
      Metrics.last_value("cms.cache.stats.hits"),
      Metrics.last_value("cms.cache.stats.misses")
    ]
  end

  defp periodic_measurements do
    [
      {Application.get_env(:dotcom, :cms_cache, CMS.Cache), :dispatch_stats, []}
    ]
  end
end
