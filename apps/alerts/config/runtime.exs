import Config

if config_env() == :prod do
  config :alerts, bus_stop_change_bucket: System.get_env("S3_PREFIX_BUSCHANGE")
end
