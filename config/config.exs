import Config

config :elixir, ansi_enabled: true

config :dotcom, :httpoison, HTTPoison

config :dotcom, :redis, Dotcom.Cache.Multilevel.Redis
config :dotcom, :redix, Redix
config :dotcom, :redix_pub_sub, Redix.PubSub

config :dotcom, :mbta_api, MBTA.Api

for config_file <- Path.wildcard("config/{deps,dotcom}/*.exs") do
  import_config("../#{config_file}")
end

import_config "#{config_env()}.exs"
