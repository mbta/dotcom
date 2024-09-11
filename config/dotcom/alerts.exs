import Config

config :dotcom, alerts_bus_stop_change_bucket: "bus-stop-change/local_development"

config :dotcom, alerts_api_mfa: {MBTA.Api.Alerts, :all, []}

if config_env() == :test do
  config :dotcom,
    alerts_api_mfa: {JsonApi, :empty, []}
end
