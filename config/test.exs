import Config

config :dotcom, :aws, ExAws.Mock

config :dotcom, :cache, Dotcom.Cache.TestCache

config :dotcom, :httpoison, HTTPoison.Mock

config :dotcom, :cms_api_module, CMS.Api.Static
config :dotcom, :mbta_api_module, MBTA.Api.Mock

config :dotcom, :repo_modules,
  predictions: Predictions.Repo.Mock,
  route_patterns: RoutePatterns.Repo.Mock,
  stops: Stops.Repo.Mock

config :dotcom, :redis, Dotcom.Redis.Mock
config :dotcom, :redix, Dotcom.Redix.Mock
config :dotcom, :redix_pub_sub, Dotcom.Redix.PubSub.Mock

config :dotcom, :req_module, Req.Mock

config :dotcom, :trip_plan_feedback_cache, Dotcom.Cache.TestCache

# Let test requests get routed through the :secure pipeline
config :dotcom, :secure_pipeline,
  force_ssl: [
    host: nil,
    rewrite_on: [:x_forwarded_proto]
  ]
