import Config

# Include referrer in Logster request log
config :logster, :allowed_headers, ["referer"]

if config_env() == :prod do
  # Do not print debug messages in production
  config :logger,
    level: :info,
    handle_sasl_reports: true,
    backends: [:console]

  config :logger, :console,
    level: :info,
    format: "$dateT$time [$level]$levelpad node=$node $metadata$message\n",
    metadata: [:ip, :mbta_id, :request_id]
end

if config_env() == :dev do
  config :logger, truncate: :infinity

  config :logger, :console,
    format: "$date $time [$level] $metadata$message\n",
    level: :notice,
    metadata: [:ip, :mbta_id, :request_id]
end

if config_env() == :test do
  config :logger, level: :notice
end
