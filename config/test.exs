import Config

config :dotcom, :cache, Dotcom.Cache.TestCache
config :dotcom, :redis, Redis.Mock
config :dotcom, :redix, Redix.Mock
config :dotcom, :redix_pub_sub, Redix.PubSub.Mock
config :dotcom, :trip_plan_feedback_cache, Dotcom.Cache.TestCache

config :dotcom, :mbta_api, MBTA.Api.Mock
