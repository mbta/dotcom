{:ok, _} = Application.ensure_all_started(:bypass)

# Ensure tzdata is up to date
{:ok, _} = Application.ensure_all_started(:tzdata)
_ = Tzdata.ReleaseUpdater.poll_for_update()

# Avoid starting unneeded background processing during tests
System.put_env("USE_SERVER_SENT_EVENTS", "false")
System.put_env("WARM_CACHES", "false")

Application.ensure_all_started(:ex_machina)
Application.ensure_all_started(:mox)
Mox.defmock(OpenTripPlannerClient.Mock, for: OpenTripPlannerClient.Behaviour)

# Ensure the deps are all started
Application.ensure_all_started(:dotcom)

ExUnitSummary.start(:normal, %ExUnitSummary.Config{filter_results: :failed, print_delay: 100})
ExUnit.configure(exclude: [external: true])
ExUnit.configure(formatters: [ExUnit.CLIFormatter, ExUnitSummary.Formatter])

ExUnit.start(capture_log: true)
