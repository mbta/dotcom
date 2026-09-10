import Config

# Include referrer in Logster request log
config :logster,
  headers: ["referer"],
  formatter: :string

if config_env() == :prod do
  # Do not print debug messages in production
  config :logger,
    level: :info,
    handle_sasl_reports: true

  config :logger, :default_formatter,
    format: "$dateT$time [$level]$levelpad node=$node $metadata$message\n",
    metadata: [:ip, :mbta_id, :request_id]

  # Drop aggressively and early to prevent the message queue from growing large.
  # Also enable terminating overloaded handlers based on memory or queue length.
  # https://www.erlang.org/docs/28/apps/kernel/logger_chapter.html#overload_protection
  config :logger, :default_handler,
    config: [
      # default
      sync_mode_qlen: 10,
      # lower than default of 200
      drop_mode_qlen: 50,
      # lower than default of 1000
      flush_qlen: 200,
      # changed from false
      overload_kill_enable: true,
      # lower than default of 20_000
      overload_kill_qlen: 500,
      # default
      overload_kill_mem_size: 3_000_000
    ]
end

if config_env() == :dev do
  config :logger, :default_formatter,
    format: "$date $time [$level] $metadata$message\n",
    metadata: [:ip, :mbta_id, :request_id]

  config :logger, level: :notice
end

if config_env() == :test do
  config :logger, level: :notice
end
