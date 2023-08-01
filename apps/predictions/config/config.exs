import Config

if config_env() == :test do
  config :predictions, broadcast_interval_ms: 50
else
  config :predictions, broadcast_interval_ms: 10_000
end
