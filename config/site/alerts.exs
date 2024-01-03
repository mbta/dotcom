import Config

config :site, alerts_bus_stop_change_bucket: "bus-stop-change/local_development"

config :site, alerts_api_mfa: {V3Api.Alerts, :all, []}

if config_env() == :test do
  config :site,
    alerts_api_mfa: {JsonApi, :empty, []},
    alerts_mock_aws_client: Alerts.TestExAws
end
