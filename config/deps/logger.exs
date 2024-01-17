import Config

# Configures Elixir's Logger
config :logger, :console,
  format: "$date $time $metadata[$level] $message\n",
  metadata: [:request_id]

# Include referrer in Logster request log
config :logster, :allowed_headers, ["referer"]

if config_env() == :prod do
  # Do not print debug messages in production
  config :logger,
    level: :notice,
    handle_sasl_reports: true,
    backends: [:console]

  config :logger, :console,
    level: :notice,
    format: "$dateT$time [$level]$levelpad node=$node $metadata$message\n",
    metadata: [:request_id, :ip]
end

if config_env() == :dev do
  # Do not include metadata nor timestamps in development logs
  config :logger, :console, format: "[$level] $message\n"

  config :logger,
    level: :notice,
    colors: [enabled: true]
end

if config_env() == :test do
  config :logger, level: :notice
end
