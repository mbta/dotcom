import Config

config :dotcom, :cache, Dotcom.Cache.TestCache
config :dotcom, :redis, Dotcom.Redis.Mock
config :dotcom, :redix, Dotcom.Redix.Mock
config :dotcom, :redix_pub_sub, Dotcom.Redix.PubSub.Mock
config :dotcom, :trip_plan_feedback_cache, Dotcom.Cache.TestCache

config :dotcom, :httpoison, HTTPoison.Mock

config :dotcom, :mbta_api, MBTA.Api.Mock
