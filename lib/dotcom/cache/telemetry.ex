defmodule Dotcom.Cache.Telemetry do
  @moduledoc """
  This supervisor establishes a connection between the telemetry_poller and the `TelemetryMetricsSplunk` reporter.
  Cache stats are emitted by every level of `Dotcom.Cache.Multilevel`.
  We poll for them every minute.
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
      }
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  defp measurements do
    [
      {Dotcom.Cache.Multilevel.Local, :dispatch_stats, []},
      {Dotcom.Cache.Multilevel.Publisher, :dispatch_stats, []},
      {Dotcom.Cache.Multilevel.Redis, :dispatch_stats, []}
    ]
  end

  defp metrics do
    [
      Metrics.last_value("dotcom.cache.multilevel.l1.stats.hits"),
      Metrics.last_value("dotcom.cache.multilevel.l1.stats.misses"),
      Metrics.last_value("dotcom.cache.multilevel.l2.stats.hits"),
      Metrics.last_value("dotcom.cache.multilevel.l2.stats.misses"),
      Metrics.last_value("dotcom.cache.multilevel.l3.stats.evictions")
    ]
  end
end
