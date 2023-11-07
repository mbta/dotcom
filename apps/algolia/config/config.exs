import Config

config :algolia, :config,
  app_id: {:system, "ALGOLIA_APP_ID"},
  search: {:system, "ALGOLIA_SEARCH_KEY"},
  write: {:system, "ALGOLIA_WRITE_KEY"}

config :algolia, :repos,
  stops: Stops.Api,
  routes: Routes.Repo

config :algolia, :indexes, [
  Algolia.Stops,
  Algolia.Routes
]

config :algolia, :track_clicks?, false

config :algolia, :index_suffix, "_test"

config :algolia, :http_pool, :algolia_http_pool

import_config "#{config_env()}.exs"
