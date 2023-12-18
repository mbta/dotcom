defmodule CMS.Telemetry.ReporterTest do
  use ExUnit.Case, async: true

  import ExUnit.CaptureLog

  test "the hit rate gets logged" do
    CMS.Telemetry.Reporter.start_link(
      metrics: [Telemetry.Metrics.last_value("cms.repo.stats.updates")]
    )

    assert capture_log(fn ->
             :telemetry.execute([:cms, :repo, :stats], %{hits: 99, misses: 1})
           end) =~ "hit_rate=0.99"
  end
end
