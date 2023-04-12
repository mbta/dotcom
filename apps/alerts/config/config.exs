import Config

config :alerts, api_mfa: {V3Api.Alerts, :all, []}

import_config "#{config_env()}.exs"
