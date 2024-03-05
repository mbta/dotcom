defmodule Dotcom.Cache.Telemetry.ReporterTest do
  use ExUnit.Case, async: true

  import ExUnit.CaptureLog

  test "the hit rate gets logged" do
    Dotcom.Cache.Telemetry.Reporter.start_link(
      metrics: [Telemetry.Metrics.last_value("dotcom.cache.multilevel.l1.stats.updates")]
    )

    assert capture_log(fn ->
             :telemetry.execute(
               [:dotcom, :cache, :multilevel, :l1, :stats],
               %{hits: 99, misses: 1},
               %{cache: Dotcom.Cache.Multilevel.Local}
             )
           end) =~ "hit_rate=0.99"
  end

  test "cache command exceptions get logged" do
    Dotcom.Cache.Telemetry.Reporter.start_link(metrics: [])

    assert capture_log(fn ->
             :telemetry.execute(
               [:dotcom, :cache, :multilevel, :l2, :command, :exception],
               %{duration: 0},
               %{
                 kind: :error,
                 reason: %Redix.ConnectionError{reason: :closed}
               }
             )
           end) =~ "dotcom.cache.multilevel.l2.command.exception kind=error reason=closed"
  end
end
