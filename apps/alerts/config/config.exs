import Config

config :alerts, api_mfa: {V3Api.Alerts, :all, []}

config :alerts, bus_stop_change_bucket: nil

import_config "#{config_env()}.exs"
