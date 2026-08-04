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
