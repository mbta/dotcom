import Config

config :elixir, ansi_enabled: true

config :dotcom, :aws_client, AwsClient.Behaviour

config :dotcom, :cms_api_module, CMS.Api

config :dotcom, :httpoison, HTTPoison

config :dotcom, :mbta_api_module, MBTA.Api

config :dotcom, :location_service, LocationService

config :dotcom, :repo_modules,
  predictions: Predictions.Repo,
  route_patterns: RoutePatterns.Repo,
  routes: Routes.Repo,
  stops: Stops.Repo

config :dotcom, :predictions_phoenix_pub_sub, Predictions.Phoenix.PubSub
config :dotcom, :predictions_pub_sub, Predictions.PubSub
config :dotcom, :predictions_store, Predictions.Store

config :dotcom, :redis, Dotcom.Cache.Multilevel.Redis
config :dotcom, :redix, Redix
config :dotcom, :redix_pub_sub, Redix.PubSub

config :dotcom, :otp_module, OpenTripPlannerClient
config :dotcom, :req_module, Req

config :sentry,
  filter: Dotcom.SentryFilter,
  json_library: Poison

for config_file <- Path.wildcard("config/{deps,dotcom}/*.exs") do
  import_config("../#{config_file}")
end

import_config "#{config_env()}.exs"
