defmodule CMS.Telemetry.ReporterTest do
  use ExUnit.Case, async: true

  import ExUnit.CaptureLog

  test "the hit rate gets logged" do
    CMS.Telemetry.Reporter.start_link(
      metrics: [Telemetry.Metrics.last_value("cms.cache.stats.updates")]
    )

    assert capture_log(fn ->
             :telemetry.execute([:cms, :cache, :stats], %{hits: 99, misses: 1})
           end) =~ "hit_rate=0.99"
  end

  test "cache command exceptions get logged" do
    CMS.Telemetry.Reporter.start_link(metrics: [])

    assert capture_log(fn ->
             :telemetry.execute([:cms, :cache, :command, :exception], %{duration: 0}, %{
               kind: :error,
               reason: %Redix.ConnectionError{reason: :closed}
             })
           end) =~ "cms.cache.command.exception kind=error reason=closed"
  end
end
