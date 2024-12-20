# Avoid starting unneeded background processing during tests
System.put_env("USE_SERVER_SENT_EVENTS", "false")
System.put_env("WARM_CACHES", "false")

Application.ensure_all_started(:dotcom)
Application.ensure_all_started(:ex_machina)
Application.ensure_all_started(:mox)
Application.ensure_all_started(:tzdata)

ExUnit.configure(exclude: [external: true, flaky: true])
ExUnit.configure(formatters: [ExUnit.CLIFormatter, ExUnitSummary.Formatter])

ExUnit.start(capture_log: true)

ExUnitSummary.start(:normal, %ExUnitSummary.Config{filter_results: :failed, print_delay: 100})

Tzdata.ReleaseUpdater.poll_for_update()
